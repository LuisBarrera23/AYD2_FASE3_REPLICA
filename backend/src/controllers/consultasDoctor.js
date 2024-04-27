
const DbSingleton = require('../db/conectiondb');
const { SuccessResponseStrategy, ResponseStrategy, listCitaStrategy, listCitaEsperaStrategy } = require('../models/responseCitaStrategy');


const { agregarContenidoArchivo } = require('../log/logs.js')
const { getCorreoUsuario } = require('../models/getUser.js')

const db = new DbSingleton();

exports.citasEsperando = async (req, res) => {
  try {
    const id_user = req.params.id_user;
    const correo = await getCorreoUsuario(id_user)

    let citasList = await db.query(
      'SELECT id_cita, CONCAT(COALESCE(usuario.nombre, ""), " ", COALESCE(usuario.apellido, "")) AS paciente, descripcion, estado, fecha, hora FROM cita LEFT JOIN usuario ON cita.id_user_paciente = usuario.id_user WHERE cita.estado = 0'
    );

    const responseStrategy = new listCitaEsperaStrategy();
    const response = responseStrategy.buildResponse(true, citasList);

    agregarContenidoArchivo(correo, '/getCitasEsperando/:id_user', "Consulta de Citas en Espera")

    res.status(200).json(response);
  } catch (error) {
    console.error('Error obtaining citas:', error);
    const errorResponse = responseStrategy.buildResponse(false, [], 'Internal Server Error');
    agregarContenidoArchivo("Desconocido", '/getCitasEsperando/:id_user', "Error en el Servidor")

    res.status(500).json(errorResponse);
  }
};


exports.agendarCita = async (req, res) => {
  try {
    const { id_cita, id_user_doctor, hora } = req.body;

    const correo = await getCorreoUsuario(id_user_doctor)

    let citasList = await db.query(
      'SELECT id_cita, CONCAT(COALESCE(usuario.nombre, ""), " ", COALESCE(usuario.apellido, "")) AS paciente, descripcion, estado, fecha, hora FROM cita LEFT JOIN usuario ON cita.id_user_paciente = usuario.id_user WHERE cita.estado = 0'
    );

    if (!id_cita || !id_user_doctor || !hora) {
      const responseStrategy = new listCitaEsperaStrategy();
      const response = responseStrategy.buildResponse(false, citasList, 'Invalid request parameters');
      agregarContenidoArchivo(correo, '/agendarCita', "Invalid request parameters")
      return res.status(400).json(response);
    }

    const citaUsuario = await db.query(
      'SELECT * FROM cita WHERE id_cita = ?',
      [id_cita]
    );

    if (citaUsuario.length === 0) {
      const responseStrategy = new listCitaEsperaStrategy();
      const response = responseStrategy.buildResponse(false, citasList, 'Cita not found for the specified user');
      agregarContenidoArchivo(correo, '/agendarCita', "Cita not found for the specified user")
      return res.status(404).json(response);
    }

    await db.query('UPDATE cita SET estado = 1, id_user_doctor = ?, hora = ? WHERE id_cita = ?', [id_user_doctor, hora, id_cita]);

    citasList = await db.query(
      'SELECT id_cita, CONCAT(COALESCE(usuario.nombre, ""), " ", COALESCE(usuario.apellido, "")) AS paciente, descripcion, estado, fecha, hora FROM cita LEFT JOIN usuario ON cita.id_user_paciente = usuario.id_user WHERE cita.estado = 0'
    );

    const responseStrategy = new listCitaEsperaStrategy();
    const response = responseStrategy.buildResponse(true, citasList);
    agregarContenidoArchivo(correo, '/agendarCita', "Cita agendada exitosamente")
    res.status(200).json(response);
  } catch (error) {
    console.error('Error canceling cita:', error);
    const responseStrategy = new listCitaEsperaStrategy();
    const errorResponse = responseStrategy.buildResponse(false, [], 'Internal Server Error');
    agregarContenidoArchivo("Desconocido", '/agendarCita', "Error en el Servidor")
    res.status(500).json(errorResponse);
  }
};


exports.getcitasAgendadas = async (req, res) => {
  try {
    const id_user_doctor = req.params.id_user_doctor;
    const correo = await getCorreoUsuario(id_user_doctor)

    let citasList = await db.query(
      'SELECT id_cita, CONCAT(COALESCE(usuario.nombre, ""), " ", COALESCE(usuario.apellido, "")) AS paciente, descripcion, estado, fecha, hora FROM cita LEFT JOIN usuario ON cita.id_user_paciente = usuario.id_user WHERE cita.id_user_doctor = ?', [id_user_doctor]
    );

    const responseStrategy = new listCitaEsperaStrategy();
    const response = responseStrategy.buildResponse(true, citasList);

    agregarContenidoArchivo(correo, '/getCitasDoctor/:id_user_doctor', "Obteniendo Lista de Citas del Doctor")
    res.status(200).json(response);
  } catch (error) {
    console.error('Error obtaining citas:', error);
    const errorResponse = responseStrategy.buildResponse(false, [], 'Internal Server Error');
    agregarContenidoArchivo("Desconocido", '/getCitasDoctor/:id_user_doctor', "Error en el Servidor")
    res.status(500).json(errorResponse);
  }
};

exports.atenderCitas = async (req, res) => {
  let responseStrategy; // Declarar aquí para que esté disponible en todo el alcance

  try {
    const { id_cita, id_user_doctor } = req.body;

    const correo = await getCorreoUsuario(id_user_doctor)

    let citasList = await db.query(
      'SELECT id_cita, CONCAT(COALESCE(usuario.nombre, ""), " ", COALESCE(usuario.apellido, "")) AS paciente, descripcion, estado, fecha, hora FROM cita LEFT JOIN usuario ON cita.id_user_paciente = usuario.id_user WHERE cita.id_user_doctor = ?',
      [id_user_doctor]
    );

    if (!id_cita || !id_user_doctor) {
      responseStrategy = new listCitaEsperaStrategy();
      const response = responseStrategy.buildResponse(false, citasList, 'Invalid request parameters');
      agregarContenidoArchivo(correo, '/atenderCita', "Invalid request parameters")
      return res.status(400).json(response);
    }

    const citaUsuario = await db.query(
      'SELECT * FROM cita WHERE id_cita = ?',
      [id_cita]
    );

    if (citaUsuario.length === 0) {
      responseStrategy = new listCitaEsperaStrategy();
      const response = responseStrategy.buildResponse(false, citasList, 'Cita not found for the specified user');
      agregarContenidoArchivo(correo, '/atenderCita', "Cita not found for the specified user")
      return res.status(404).json(response);
    }

    await db.query('UPDATE cita SET estado = 2 WHERE id_cita = ?', [id_cita]);
    citasList = await db.query(
      'SELECT id_cita, CONCAT(COALESCE(usuario.nombre, ""), " ", COALESCE(usuario.apellido, "")) AS paciente, descripcion, estado, fecha, hora FROM cita LEFT JOIN usuario ON cita.id_user_paciente = usuario.id_user WHERE cita.id_user_doctor = ?',
      [id_user_doctor]
    );

    responseStrategy = new listCitaEsperaStrategy();
    const response = responseStrategy.buildResponse(true, citasList);

    agregarContenidoArchivo(correo, '/atenderCita', "Atender cita de forma exitosa")
    res.status(200).json(response);
  } catch (error) {
    console.error('Error obtaining citas:', error);
    if (!responseStrategy) {
      responseStrategy = new listCitaEsperaStrategy();
    }
    const errorResponse = responseStrategy.buildResponse(false, [], 'Internal Server Error');
    agregarContenidoArchivo("Desconocido", '/atenderCita', "Error en el Servidor")
    res.status(500).json(errorResponse);
  }
};
