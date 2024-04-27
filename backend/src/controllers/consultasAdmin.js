const DbSingleton = require('../db/conectiondb');
const CognitoUserBuilder = require('../models/cognitoUserBuilder');
const { AesEncryptor } = require('../models/passwordEncryptor');
const AmazonCognitoIdentity = require('amazon-cognito-identity-js');
const { saveImage } = require('./s3controller.js')
const axios = require('axios');

const { agregarContenidoArchivo } = require('../log/logs.js')
const { getCorreoUsuario } = require('../models/getUser.js')

//Credenciales de AWS
const { aws_keys_cognito, aws_keys_iam_cognito } = require('../credentials/aws_keys')
const MY_AWS = require('aws-sdk');
MY_AWS.config.update(aws_keys_iam_cognito);

const cognitoIdentityServiceProvider = new MY_AWS.CognitoIdentityServiceProvider();
const userPool = new AmazonCognitoIdentity.CognitoUserPool(aws_keys_cognito);

const db = new DbSingleton();

//Carga masiva de doctores
exports.uploadCSV = async (req, res) => {
    try {
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).json({ success: false, message: 'No files were uploaded.' });
        }

        const csvFile = req.files.file;
        const correo = req.body.correo;
        const lines = csvFile.data.toString().split('\n');

        // Iteramos sobre cada línea del archivo CSV
        for (let i = 1; i < lines.length; i++) {
            const line = lines[i].trim(); // Eliminamos espacios en blanco al principio y al final
            if (line === '') continue; // Saltamos líneas vacías

            const [nombre, apellido, fecha_nac, sexo, username, password, correo, image, rol] = line.split(',');

            const imageBase64 = await getImageBase64(image);

            const urlImagen = await saveImage(imageBase64)
            // Verificar si el correo ya existe en la base de datos
            const existingUser = await db.query('SELECT * FROM usuario WHERE correo = ?', [correo]);

            if (existingUser.length > 0) {
                console.error(`Email '${correo}' already exists in the database. Skipping user creation.`);
                continue; // Saltamos la creación de usuario si el correo ya existe
            }

            // Crear un usuario en Cognito
            const cognitoUser = new CognitoUserBuilder()
                .withName(username)
                .withEmail(correo)
                .build();

            // Insertar el usuario en la base de datos después de la creación en Cognito
            userPool.signUp(correo, password, cognitoUser.attributeList, null, async (err, result_cognito) => {
                if (err) {
                    console.error('Error creating user in Cognito whith ', correo, ": ", err.message);
                    //return res.status(500).json({ success: false, message: err.message });
                } else {
                    // Insertar el nuevo usuario en la tabla usuario
                    try {
                        const encryptor = new AesEncryptor();
                        await db.query(
                            'INSERT INTO usuario (nombre, apellido, fecha_nac, sexo, username, password, correo, image, rol) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
                            [nombre, apellido, fecha_nac, sexo, username, encryptor.encrypt(password, process.env.KEY), correo, urlImagen, rol]
                        );
                    } catch (dbError) {
                        console.error('Error inserting user into database whit ', correo, ": ", dbError);
                        //return res.status(500).json({ success: false, message: 'Error inserting user into database.' });
                    }

                }
            });
            console.log("")
        }
        agregarContenidoArchivo(correo, '/uploadCSV', "Carga masiva de doctores realizado exitosamente")
        res.status(200).json({ success: true, message: 'File uploaded successfully.' });
    } catch (error) {
        console.error('Error uploading file:', error);
        res.status(500).json({ success: false, message: 'Error uploading file.' });
    }
};

//Obtener todos los doctores
exports.getDoctor = async (req, res) => {

    try {
        const users = await db.query('SELECT id_user, nombre, apellido, fecha_nac, sexo, username, correo, rol FROM usuario WHERE rol = ?', [1]);

        const id_user = req.params.id_user;
        const correo = await getCorreoUsuario(id_user)
        // Remover la contraseña de cada usuario
        const usersWithoutPassword = users.map(user => {
            delete user.password;
            return user;
        });

        agregarContenidoArchivo(correo, '/getDoctores/:id_user', "Consulta de la lista de Doctores")
        res.status(200).json(usersWithoutPassword);
    } catch (error) {
        console.error('Error fetching users by role:', error);
        agregarContenidoArchivo("Desconocido", '/getDoctores/:id_user', "Error en el Servidor")
        res.status(500).json({ success: false, message: 'Error fetching users by role' });
    }
};

//Obtener todos los pascientes
exports.getPaciente = async (req, res) => {

    try {

        const id_user = req.params.id_user;
        const correo = await getCorreoUsuario(id_user)

        const users = await db.query('SELECT id_user, nombre, apellido, fecha_nac, sexo, username, correo, rol FROM usuario WHERE rol = ?', [2]);

        // Remover la contraseña de cada usuario
        const usersWithoutPassword = users.map(user => {
            delete user.password;
            return user;
        });

        agregarContenidoArchivo(correo, '/getUsuarios/:id_user', "Consulta de la lista de Doctores")

        res.status(200).json(usersWithoutPassword);
    } catch (error) {
        console.error('Error fetching users by role:', error);
        agregarContenidoArchivo("Desconocido", '/getUsuarios/:id_user', "Error en el Servidor")
        res.status(500).json({ success: false, message: 'Error fetching users by role' });
    }
};


//Eliminar usuario (doctor o paciente)

exports.deleteUser = async (req, res) => {
    try {
        const { id_user } = req.body;

        const userRecord = await db.query('SELECT correo FROM usuario WHERE id_user = ?', [id_user]);

        if (userRecord.length === 0) {
            console.error('User not found in the database with ID:', id_user);
            return res.status(404).json({ success: false, message: 'User not found in the database' });
        }

        const correo = userRecord[0].correo;

        // Buscar al usuario en Cognito utilizando su correo electrónico
        const params = {
            UserPoolId: aws_keys_cognito.UserPoolId,
            AttributesToGet: [],
            Filter: `email = "${correo}"`
        };

        cognitoIdentityServiceProvider.listUsers(params, function (err, data) {
            if (err) {
                console.error('Error searching for user in Cognito:', err);
                agregarContenidoArchivo(correo, '/deleteUser', "Error Delete searching for user in Cognito")
                res.status(500).json({ success: false, message: 'Error Delete searching for user in Cognito' });
            } else {
                if (data.Users.length === 0) {
                    console.error('User not found in Cognito:', correo);
                    agregarContenidoArchivo(correo, '/deleteUser', "User not found in Cognito")
                    res.status(404).json({ success: false, message: 'User not found in Cognito' });
                } else {

                    const deleteParams = {
                        UserPoolId: aws_keys_cognito.UserPoolId,
                        Username: data.Users[0].Username
                    };

                    cognitoIdentityServiceProvider.adminDeleteUser(deleteParams, async function (err, data) {
                        if (err) {
                            console.error('Error deleting user from Cognito:', err);
                            agregarContenidoArchivo(correo, '/deleteUser', "Error deleting user from Cognito")
                            res.status(500).json({ success: false, message: 'Error deleting user from Cognito' });
                        } else {
                            console.log('Successfully deleted user from Cognito:', correo);

                            try {
                                await db.query('DELETE FROM usuario WHERE correo = ?', [correo]);
                                agregarContenidoArchivo(correo, '/deleteUser', "User deleted from Cognito and database successfully.")
                                res.status(200).json({ success: true, message: 'User deleted from Cognito and database successfully.' });
                            } catch (dbError) {
                                console.error('Error deleting user from database:', dbError);
                                agregarContenidoArchivo(correo, '/deleteUser', "Error deleting user from database")
                                res.status(500).json({ success: false, message: 'Error deleting user from database' });
                            }
                        }
                    });
                }
            }
        });
    } catch (error) {
        console.error('Error deleting user:', error);
        agregarContenidoArchivo("Desconocido", '/deleteUser', "Error en el Servidor")
        res.status(500).json({ success: false, message: 'Error deleting user' });
    }
}


//Agregar producto
exports.guardarProducto = async (req, res) => {
    try {

        const { nombre, descripcion, precio, image, stock, correo } = req.body;

        // Validate if all required fields are provided
        if (!nombre || !descripcion || !precio || !image || !stock) {
            agregarContenidoArchivo(correo, '/ingresarProducto', "Es necesario llenar todos los campos")
            return res.status(400).json({ success: false, message: 'All fields are required' });
        }

        const urlImagen = await saveImage(image)

        // Insert the product into the database
        const result = await db.query('INSERT INTO producto (nombre, descripcion, precio, image, stock) VALUES (?, ?, ?, ?, ?)',
            [nombre, descripcion, precio, urlImagen, stock]);

        // Check if the product was inserted successfully
        if (result.affectedRows > 0) {
            agregarContenidoArchivo(correo, '/ingresarProducto', "Product saved successfully")
            res.status(201).json({ success: true, message: 'Product saved successfully' });
        } else {
            agregarContenidoArchivo(correo, '/ingresarProducto', "Error saving the product")
            res.status(500).json({ success: false, message: 'Error saving the product' });
        }
    } catch (error) {
        console.error('Error saving the product:', error);
        agregarContenidoArchivo("Desconocido", '/ingresarProducto', "Error en el Servidor")
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};


//MASIVO PRODUCTO
async function getImageBase64(imageUrl) {
    try {

        const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
        const imageBase64 = Buffer.from(response.data, 'binary').toString('base64');
        return imageBase64;
    } catch (error) {
        console.error('Error fetching image:', error);
        throw new Error('Error fetching image');
    }
}

exports.cargaProducto = async (req, res) => {

    try {
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).json({ success: false, message: 'No files were uploaded.' });
        }

        const csvFile = req.files.file;

        const correo=req.body.correo;


        const lines = csvFile.data.toString().split('\n');

        // Iteramos sobre cada línea del archivo CSV
        for (let i = 1; i < lines.length; i++) {
            const line = lines[i].trim(); // Eliminamos espacios en blanco al principio y al final
            if (line === '') continue; // Saltamos líneas vacías

            const [nombre, descripcion, precio, stock, image] = line.split(',');

            const imageBase64 = await getImageBase64(image);

            const urlImagen = await saveImage(imageBase64)

            // Insert the product into the database
            const result = await db.query('INSERT INTO producto (nombre, descripcion, precio, image, stock) VALUES (?, ?, ?, ?, ?)',
                [nombre, descripcion, precio, urlImagen, stock]);

            // Check if the product was inserted successfully
            if (!(result.affectedRows > 0)) {
                console.log('Error saving the product')
            }
        }
        agregarContenidoArchivo(correo, '/uploadCSV2', "Carga masiva de productos realizado exitosamente")
        res.status(200).json({ success: true, message: 'File uploaded successfully.' });
    } catch (error) {
        console.error('Error uploading file:', error);
        res.status(500).json({ success: false, message: 'Error uploading file.' });
    }

};



