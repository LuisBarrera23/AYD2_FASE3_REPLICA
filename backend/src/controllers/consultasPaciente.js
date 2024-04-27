
const DbSingleton = require('../db/conectiondb');
const { SuccessResponseStrategy, ResponseStrategy, listCitaStrategy } = require('../models/responseCitaStrategy');
const { SuccessResponseProductStrategy } = require('../models/responseProductStrategy');
const { agregarContenidoArchivo } = require('../log/logs.js')
const { getCorreoUsuario } = require('../models/getUser.js')

const db = new DbSingleton();

exports.addCita = async (req, res) => {
  try {
    const { id_user, descripcion, fecha } = req.body;
    const correo = await getCorreoUsuario(id_user)
    let citasList = await db.query(
      'SELECT id_cita, CONCAT(COALESCE(usuario.nombre, ""), " ", COALESCE(usuario.apellido, "")) AS doctor, descripcion, estado, fecha, hora FROM cita LEFT JOIN usuario ON cita.id_user_doctor = usuario.id_user WHERE cita.id_user_paciente = ?',
      [id_user]
    );

    const responseStrategy = new SuccessResponseStrategy();
    const response = responseStrategy.buildResponse(false, citasList);

    if (!id_user || !descripcion || !fecha) {

      agregarContenidoArchivo(correo, '/addCita', "Error se deben llenar todos los campos en la cita")

      return res.status(400).json(response);
    }

    // Verificar si el usuario existe
    const existingUser = await db.query(
      'SELECT * FROM usuario WHERE id_user = ?',
      [id_user]
    );

    if (existingUser.length === 0) {
      agregarContenidoArchivo(correo, '/addCita', "Error en crear cita, el usuario no existe")
      return res.status(400).json(response);
    }

    // Insertar la cita en la base de datos
    const result = await db.query(
      'INSERT INTO cita (id_user_paciente, descripcion, estado, fecha, hora) VALUES (?, ?, ?, ?, ?)',
      [id_user, descripcion, 0, fecha, '']
    );

    // Obtener la lista de citas solo para el id_user proporcionado
    citasList = await db.query(
      'SELECT id_cita, CONCAT(COALESCE(usuario.nombre, ""), " ", COALESCE(usuario.apellido, "")) AS doctor, descripcion, estado, fecha, hora FROM cita LEFT JOIN usuario ON cita.id_user_doctor = usuario.id_user WHERE cita.id_user_paciente = ?',
      [id_user]
    );

    const updatedResponse = responseStrategy.buildResponse(true, citasList, "xd");
    agregarContenidoArchivo(correo, '/addCita', "Cita agregado correctamente")
    res.status(201).json(updatedResponse);
  } catch (error) {
    console.error('Error adding cita:', error);
    const errorResponse = responseStrategy.buildResponse(false, [], 'Internal Server Error');
    
    agregarContenidoArchivo("Desconocido", '/addCita', "Error interno en el servidor")
    res.status(500).json(errorResponse);
  }
};

exports.getCitas = async (req, res) => {
  try {
    const id_user = req.params.id_user;
    const correo = await getCorreoUsuario(id_user)
    let citasList = await db.query(
      'SELECT id_cita, CONCAT(COALESCE(usuario.nombre, ""), " ", COALESCE(usuario.apellido, "")) AS doctor, descripcion, estado, fecha, hora FROM cita LEFT JOIN usuario ON cita.id_user_doctor = usuario.id_user WHERE cita.id_user_paciente = ?',
      [id_user]
    );

    const responseStrategy = new listCitaStrategy();
    const response = responseStrategy.buildResponse(true, citasList);

    agregarContenidoArchivo(correo, '/getCitas/:id_user', "Obteniendo citas del usuario")

    res.status(200).json(response);
    
  } catch (error) {
    console.error('Error obtaining citas:', error);
    const correo = await getCorreoUsuario(id_user)
    const errorResponse = responseStrategy.buildResponse(false, [], 'Internal Server Error');
    agregarContenidoArchivo(correo, '/getCitas/:id_user', "Error Interno en obtener citas")
    res.status(500).json(errorResponse);
  }
};

exports.cancelCita = async (req, res) => {
  try {
    const { id_cita, id_user } = req.body;
    const correo = await getCorreoUsuario(id_user)

    var citasList = await db.query(
      'SELECT id_cita, CONCAT(COALESCE(usuario.nombre, ""), " ", COALESCE(usuario.apellido, "")) AS doctor, descripcion, estado, fecha, hora FROM cita LEFT JOIN usuario ON cita.id_user_doctor = usuario.id_user WHERE cita.id_user_paciente = ?',
      [id_user]
    );

    if (!id_cita || !id_user) {
      const responseStrategy = new SuccessResponseStrategy();
      const response = responseStrategy.buildResponse(false, citasList, 'Invalid request parameters');
      agregarContenidoArchivo(correo, '/cancelCita', "Error se deben llenar todos los campos en la cancelacion de cita")
      return res.status(400).json(response);
    }

    const citaUsuario = await db.query(
      'SELECT * FROM cita WHERE id_cita = ? AND id_user_paciente = ?',
      [id_cita, id_user]
    );

    if (citaUsuario.length === 0) {
      const responseStrategy = new SuccessResponseStrategy();
      const response = responseStrategy.buildResponse(false, citasList, 'Cita not found for the specified user');

      agregarContenidoArchivo(correo, '/cancelCita', "Cita not found for the specified user")
      return res.status(404).json(response);
    }

    await db.query('UPDATE cita SET estado = 3 WHERE id_cita = ?', [id_cita]);

    citasList = await db.query(
      'SELECT id_cita, CONCAT(COALESCE(usuario.nombre, ""), " ", COALESCE(usuario.apellido, "")) AS doctor, descripcion, estado, fecha, hora FROM cita LEFT JOIN usuario ON cita.id_user_doctor = usuario.id_user WHERE cita.id_user_paciente = ?',
      [id_user]
    );

    const responseStrategy = new SuccessResponseStrategy();
    const response = responseStrategy.buildResponse(true, citasList);
    agregarContenidoArchivo(correo, '/cancelCita', "Cita cancelado exitosamente")
    res.status(200).json(response);
  } catch (error) {
    console.error('Error canceling cita:', error);
    const responseStrategy = new SuccessResponseStrategy();
    const errorResponse = responseStrategy.buildResponse(false, [], 'Internal Server Error');
    agregarContenidoArchivo("Error", '/cancelCita', "Error interno en el servidor")
    res.status(500).json(errorResponse);
  }
};

exports.getProductos = async (req, res) => {
  try {
    const productosList = await db.query('SELECT * FROM producto');

    const id_user = req.params.id_user;
    const correo = await getCorreoUsuario(id_user)

    const responseStrategy = new SuccessResponseProductStrategy();
    const response = responseStrategy.buildResponse(productosList);

    agregarContenidoArchivo(correo, '/products/:id_user', "Consulta de los productos")

    res.status(200).json(response);
  } catch (error) {
    console.error('Error obtaining productos:', error);
    const errorResponse = responseStrategy.buildResponse([]);
    agregarContenidoArchivo("Error", '/products/:id_user', "Error interno en el servidor")
    res.status(500).json(errorResponse);
  }
};