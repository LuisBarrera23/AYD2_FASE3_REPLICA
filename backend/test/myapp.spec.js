const request = require('supertest'); // Import supertest for testing HTTP requests
const MyApp = require('../src/myapp'); // Import your Express application
const fs = require('fs');

// lee una imagen en base64
const rutaImagenBase64 = './test/vitaminas.png';
const imageBase64 = fs.readFileSync(rutaImagenBase64, 'base64');



// Test the GET /status endpoint
describe('GET /status', () => {
  test('should return status 200 ', async () => {
    const res = await request(MyApp).get('/status').send();
    // si el status es 200
    expect(res.statusCode).toEqual(200);
    // si el body es hola
    expect(res.text).toEqual('status 200');
  });
  // otros test
});

// Test the POST /login endpoint
describe('POST /login', () => {
  test('should return status 200 and success true ', async () => {
    const res = await request(MyApp).post('/login').send({correo: "johnpabloxd123@gmail.com", password: "Juan123."});
    // si el status es 200
    expect(res.statusCode).toEqual(200);
    // si el la respuesta success: true
    expect(res.body.success).toEqual(true);
  });
});

// test GET /getDoctores endpoint
describe('GET /getDoctores', () => {
  test('should return status 200 and body == list ', async () => {
    const res = await request(MyApp).get('/getDoctores').send();
    // si el body es una lista
    expect(res.body).toEqual(expect.any(Array));

  });
});


// test POST /deleteUser endpoint
describe('POST /deleteUser', () => {
  test('should return status 200 and success true ', async () => {
    const res = await request(MyApp).post('/deleteUser').send({id_user : 1000});
    // si el la respuesta success: false
    expect(res.body.success).toEqual(false);
  });
});

// test POST /ingresarProducto endpoint
describe('POST /ingresarProducto', () => {
  test('should return status 400 and success false', async () => {
    const res = await request(MyApp).post('/ingresarProducto').send({});
    // si el la respuesta success: true
    expect(res.body.success).toEqual(false);
  });
});


// test POST /ingresarProducto endpoint
describe('POST /ingresarProducto', () => {
  test('should return status 201 and success true ', async () => {
    const res = await request(MyApp).post('/ingresarProducto').send({nombre: "productoPrueba", descripcion: "productoPreuba", precio: 50, stock: 50, image: imageBase64});
    // status 200
    expect(res.statusCode).toEqual(201);
    // si el la respuesta success: true
    expect(res.body.success).toEqual(true);
  });
});



// test GET /products endpoint
describe('GET /products', () => {
  test('should return status 200 and body == list ', async () => {
    const res = await request(MyApp).get('/products').send();
    // si el body es una lista
    expect(res.body.products).toEqual(expect.any(Array));

  });
});


// test GET /getReportes endpoint
describe('GET /getReportes', () => {
  test('should return status 200 and body == list ', async () => {
    const res = await request(MyApp).get('/getReportes').send();
    // status 200
    expect(res.statusCode).toEqual(200);
    // si el body es una lista
    expect(res.body.reporte1).toEqual(expect.any(Array));

  });
});


// test POST /updateUser endpoint
describe('PUT /updateUser', () => {
  test('should return status 200 and success true ', async () => {
    //id_user, nombre, apellido, username, correo, fecha_nac, sexo, newPassword, currentPassword, image, imageBool
    const res = await request(MyApp).put('/updateUser').send({id_user: 101, nombre: "Juan", apellido: "Garcia", username: "juan", correo: "johnpabloxd123@gmail.com", fecha_nac: "2024-03-31", sexo: "M", newPassword: "Juan123.", currentPassword: "Juan123.", image: imageBase64, imageBool: true});
    // status 200
    expect(res.statusCode).toEqual(200);
    // si el la respuesta success: true
    expect(res.body.success).toEqual(true);
  });
});

// test PUT /updateProduct/:id_product endpoint
describe('PUT /updateProduct/:id_product', () => {
  test('should return status 200 and success true ', async () => {
    //id_product, name, description, image, price, stock
    const res = await request(MyApp).put('/updateProduct/13').send({name: "productoEditado2", description: "productoEditado2", price: 50, stock: 50, image: "https://clickmica.fundaciondescubre.es/files/2017/01/Vitaminas-988x1024.png"});
    // status 200
    expect(res.statusCode).toEqual(200);
    // si el la respuesta success: true
    expect(res.body.success).toEqual(true);
  });
});
