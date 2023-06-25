import request from "supertest";
import server from "../index"; // -> server = app

describe("Operaciones CRUD de cafes", () => {

    test('Obteniendo respuesta de GET /cafes un código 200 OK', async () => {
        const response = await request(server).get('/cafes').send();
        const status = response.statusCode;
        expect(status).toBe(200);// Comprueba que la respuesta sea un código 200
    })
    test('Obteniendo respuesta de GET /cafes un tipo de dato arreglo', async () => {
        const { body } = await request(server).get('/cafes').send();
        const cafe = body;
        //console.log(cafe);
        expect(cafe).toBeInstanceOf(Array);// Comprueba si es una instancia de Array/Arreglo
    })
    test('Obteniendo respuesta de GET /cafes no vacío', async () => {
        const { body } = await request(server).get('/cafes').send();
        const cafe = body;
        expect(cafe.length).toBeGreaterThan(0); // Comprobar si no está vacío
        expect(cafe[0]).toBeInstanceOf(Object); // Comprueba si la posición 0 contiene un objeto
    });
    test("Eliminando un cafe", async () => {
        const jwt = "Authorization";
        const idDeCafeAEliminar = 1;
        const { body: cafes } = await request(server).delete(`/cafes/${idDeCafeAEliminar}`).set("Authorization", jwt).send();
        const ids = await cafes.map(p => p.id);
        expect(ids).not.toContain(idDeCafeAEliminar);
    });
    test("Eliminando un cafe", async () => {
        const jwt = "Authorization";
        const idDeCafeAEliminar = 5;
        const { status } = await request(server).delete(`/cafes/${idDeCafeAEliminar}`).set("Authorization", jwt).send();
        expect(status).toBe(404);
    });
    test("Agregando un nuevo cafe", async () => {
        const nuevoCafe = { id: 5, nombre: "Cafe Test"};
        const { body: cafes, statusCode } = await request(server).post("/cafes").send(nuevoCafe);    
        expect(statusCode).toBe(201);           
        expect(cafes).toContainEqual(nuevoCafe); //Espera que el nuevo café 
    });
    test("Actualizando un café con id incorrecto devuelve status code 400", async () => {
        const idParametro = 1;
        const idPayload = 2;
        const cafeActualizado = { id: idPayload, nombre: "Cafe Actualizado" };    
        const { statusCode } = await request(server).put(`/cafes/${idParametro}`).send(cafeActualizado);
    
        expect(statusCode).toBe(400);
    });
});
