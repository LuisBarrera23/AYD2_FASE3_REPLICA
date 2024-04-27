
const DbSingleton = require('../db/conectiondb');
const CognitoUserBuilder = require('../models/cognitoUserBuilder');
const { AesEncryptor } = require('../models/passwordEncryptor');
const { saveImage } = require('./s3controller.js')
const AmazonCognitoIdentity = require('amazon-cognito-identity-js');
const { aws_keys_cognito } = require('../credentials/aws_keys')
const { agregarContenidoArchivo } = require('../log/logs.js')
const db = new DbSingleton();

const userPool = new AmazonCognitoIdentity.CognitoUserPool(aws_keys_cognito);

exports.confirmPasswordReset = async (req, res) => {
  try {
    const encryptor = new AesEncryptor();

    const { correo, verificationCode, newPassword } = req.body;

    const userData = {
      Username: correo,
      Pool: userPool,
    };

    const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

    cognitoUser.confirmPassword(verificationCode, newPassword, {
      onSuccess: async function () {


        try {
          const encryptedPassword = encryptor.encrypt(newPassword, process.env.KEY)
          const updateResult = await db.query('UPDATE usuario SET password = ? WHERE correo = ?', [encryptedPassword, correo]);

          if (updateResult.affectedRows > 0) {

            agregarContenidoArchivo(correo, '/confirmPasswordReset', "Cambio de contraseña exitoso")

            res.status(200).json({ success: true, message: 'Password reset successfully' });
          } else {

            agregarContenidoArchivo(correo, '/confirmPasswordReset', "Error en el cambio de contraseña exitoso")

            res.status(500).json({ success: false, message: 'Failed to update password in the database' });
          }
        } catch (updateError) {
          console.log('Error updating password in the database', updateError);

          agregarContenidoArchivo(correo, '/confirmPasswordReset', "Error al cambiar la contraseña en la base de datos")

          res.status(500).json({ success: false, message: 'Error updating password in the database' });
        }
      },
      onFailure: function (err) {

        agregarContenidoArchivo(correo, '/confirmPasswordReset', "Error en el servidor de cognito")
        res.status(400).json({ success: false, message: err.message });
      },
    });

  } catch (error) {
    console.log('Error resetting password', error);

    agregarContenidoArchivo(correo, '/confirmPasswordReset', "Error en el servidor")

    res.status(500).json({ success: false, message: 'Error resetting password' });
  }
}


exports.forgotPassword = async (req, res) => {
  try {
    const { correo } = req.body;

    const userData = {
      Username: correo,
      Pool: userPool,
    };

    const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

    cognitoUser.forgotPassword({
      onSuccess: function (data) {
        console.log('A verification code has been sent to your email');

        agregarContenidoArchivo(correo, '/forgotPassword', "Cambio de contraseña solicitado")

        res.status(200).json({ success: true, message: 'A verification code has been sent to your email' });
      },
      onFailure: function (err) {
        console.log('Error requesting password reset', err);
        agregarContenidoArchivo(correo, '/forgotPassword', "Ocurrió un error en el cambio de contraseña solicitado")

        res.status(400).json({ success: false, message: 'Failed to request password reset' });
      },
    });

  } catch (error) {
    console.log('Error requesting password reset', error);

    agregarContenidoArchivo(correo, '/forgotPassword', "Error en el servicio")
    res.status(500).json({ success: false, message: 'Error requesting password reset' });
  }
}

exports.getUsers = async (req, res) => {
  try {

    const encryptor = new AesEncryptor();

    const { correo, password } = req.body;

    const authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails({
      Username: correo,
      Password: password,
    });

    const userData = {
      Username: correo,
      Pool: userPool,
    };

    const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: async function (result) {


        const usuario = await db.query('SELECT * FROM usuario WHERE correo = ? AND password = ?', [correo, encryptor.encrypt(password, process.env.KEY)]);

        if (usuario.length > 0) {

          agregarContenidoArchivo(correo, '/login', "Login iniciado exitosamente")
          res.status(200).json({ success: true, user: usuario[0] });
        } else {

          agregarContenidoArchivo(correo, '/login', "Login Correo o contraseña incorrecto")
          res.status(404).json({ success: false, message: 'Incorrect email or password' });
        }
      },
      onFailure: function (err) {

        // Handle authentication error from Cognito
        agregarContenidoArchivo(correo, '/login', err.message)
        res.status(401).json({ success: false, message: err.message });
      },
    });

  } catch (error) {
    console.log('Error in login', error);
    agregarContenidoArchivo(correo, '/login', "Error en Login")
    res.status(500).json({ success: false, message: 'Error in login' });
  }
};

exports.addUser = async (req, res) => {
  try {
    const { nombre, apellido, fecha_nac, sexo, username, password, correo, image, rol } = req.body;

    if (!nombre || !apellido || !fecha_nac || !sexo || !username || !password || !correo || !image || !rol) {
      agregarContenidoArchivo(correo, '/adduser', "Error, es necesario llenar todos los campos ")
      return res.status(400).json({
        message: 'All fields are required',
        success: false,
      });
    }

    const existingUser = await db.query(
      'SELECT * FROM usuario WHERE username = ? OR correo = ?',
      [username, correo]
    );

    if (existingUser.length > 0) {
      agregarContenidoArchivo(correo, '/adduser', "Error, el correo o Username ya existe")
      return res.status(400).json({
        message: 'Username or email already exists.',
        success: false,
      });
    }

    const urlImagen = await saveImage(image)

    const encryptor = new AesEncryptor();

    const cognitoUser = new CognitoUserBuilder()
      .withName(username)
      .withEmail(correo)
      .build();

    userPool.signUp(correo, password, cognitoUser.attributeList, null, async (err, result_cognito) => {
      if (err) {
        agregarContenidoArchivo(correo, '/adduser', err.message)
        res.status(500).json({
          message: err.message,
          success: false,
        });
      } else {
        // Insertar el nuevo usuario en la tabla usuario después de la creación en Cognito
        const result = await db.query(
          'INSERT INTO usuario (nombre, apellido, fecha_nac, sexo, username, password, correo, image, rol) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
          [nombre, apellido, fecha_nac, sexo, username, encryptor.encrypt(password, process.env.KEY), correo, urlImagen, rol]
        );
        
        agregarContenidoArchivo(correo, '/adduser', "Usuario registrado exitosamente")
        res.status(201).json({
          message: 'Successfully registered user, please check your email inbox.',
          success: true,
        });
      }
    });
  } catch (error) {
    console.error('Error adding user:', error);
    agregarContenidoArchivo(correo, '/adduser', "Ocurrio un error en la Api")
    res.status(500).json({
      error: 'Internal Server Error',
    });
  }
};