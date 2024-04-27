const request = require('supertest'); // Import supertest for testing HTTP requests
const MyApp = require('../src/myapp'); // Import your Express application

describe('POST /login', () => {
  it('debería autenticar al usuario y devolver el usuario si las credenciales son correctas', async () => {
    const response = await request(MyApp)
      .post('/login')
      .send({ correo: 'johnpabloxd123@gmail.com', password: 'Juan123.' });

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.user).toBeDefined();
  });

  it('debería devolver un mensaje de error si las credenciales son incorrectas', async () => {
    const response = await request(MyApp)
      .post('/login')
      .send({ correo: 'correo_incorrecto@example.com', password: 'contraseña_incorrecta' });

    expect(response.status).toBe(401);
    expect(response.body.success).toBe(false);

  });
});
const fs = require('fs');

// lee una imagen en base64
const rutaImagenBase64 = './test/vitaminas.png';
const imageBase64 = fs.readFileSync(rutaImagenBase64, 'base64');

// test de la ruta POST /adduser
describe('POST /adduser', () => {
    /*it('debería agregar un usuario y devolver el usuario si los datos son correctos', async () => {
        const response = await request(MyApp)
        .post('/adduser')
        //{ nombre, apellido, fecha_nac, sexo, username, password, correo,image, rol }
        .send({ nombre: 'Prueba', apellido: 'Prueba', fecha_nac: '2024-01-01', sexo:'M',username:'prueba', correo: 'xoroyar593@ekposta.com', password: 'Prueba123.', rol: '1', image: imageBase64 });
            expect(response.status).toBe(201);
            expect(response.body.success).toBe(true);

        });*/
    // ya existe el usuario
    it('debería devolver un mensaje de error si el usuario ya existe', async () => {
      const response = await request(MyApp)
        .post('/adduser')
        .send({ nombre: 'Prueba', apellido: 'Prueba', fecha_nac: '2024-01-01', sexo:'M',username:'prueba', correo: 'xoroyar593@ekposta.com', password : 'Prueba123.', rol: '1', image: imageBase64 });
        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
    });
});

// test de la ruta GET /getDoctores
describe('GET /getDoctores', () => {
    it('debería devolver un array de doctores', async () => {
        const response = await request(MyApp)
            .get('/getDoctores');
        expect(response.status).toBe(200);
        expect(response.body).toEqual(expect.any(Array));
    });
});

// test de la ruta GET /products
describe('GET /products', () => {
    it('debería devolver un array de productos', async () => {
        const response = await request(MyApp)
            .get('/products');
        expect(response.body.products).toEqual(expect.any(Array));
    });
});