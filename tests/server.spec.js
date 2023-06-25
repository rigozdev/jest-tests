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
        const idDeCafeAEliminar = 5; //Si cambio 'idDeCafeAEliminar' a un id que si esté contenido en arreglo fallará el test
        const { status } = await request(server).delete(`/cafes/${idDeCafeAEliminar}`).set("Authorization", jwt).send();
        expect(status).toBe(404);//Espero el error 404
    });
    test("Agregando un nuevo cafe", async () => {
        const nuevoCafe = { id: 5, nombre: "Cafe Test" };
        const { body: cafes, status } = await request(server).post("/cafes").send(nuevoCafe);
        expect(status).toBe(201);
        expect(cafes).toContainEqual(nuevoCafe); //Espera que el nuevoCafe no esté contenido dentro del arreglo cafes
    });
    test("Actualizando un café con id incorrecto devuelve status code 400", async () => {
        const idParametro = 1;//Creo parametro y payload con distinto valor
        const idPayload = 2;
        const cafeActualizado = { id: idPayload, nombre: "Cafe Actualizado" };//paso valor de payload 
        const { status } = await request(server).put(`/cafes/${idParametro}`).send(cafeActualizado);//paso valor de parametro distinto a payload
        //Se fuerza el error 400 (que no coinciden payload y parametro)
        expect(status).toBe(400);//Espero el error 400
    });
});
