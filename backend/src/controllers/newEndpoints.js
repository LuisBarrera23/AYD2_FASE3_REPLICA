const DbSingleton = require('../db/conectiondb');
const { AesEncryptor } = require('../models/passwordEncryptor');
const { saveImage } = require('./s3controller.js')

const { agregarContenidoArchivo } = require('../log/logs.js')
const { getCorreoUsuario } = require('../models/getUser.js')

const db = new DbSingleton();


exports.updateUser = async (req, res) => {
    try {
        const { id_user, nombre, apellido, username, correo, fecha_nac, sexo, newPassword, currentPassword, image, imageBool } = req.body;

        console.log(req.body)
        // Verificar si el usuario existe
        const existingUser = await db.query('SELECT * FROM usuario WHERE correo = ?', [correo]);
        if (existingUser.length === 0) {
            agregarContenidoArchivo(correo, '/updateUser', "Usuario no encontrado, datos no actualizados")
            return res.status(404).json(
                {
                    success: false,
                    message: 'User not found'
                }
            );
        }
        // Verificar si la contraseña actual coincide con la de la base de datos
        const encryptor = new AesEncryptor();
        const encryptedCurrentPassword = encryptor.encrypt(currentPassword, process.env.KEY);
        if (existingUser[0].password !== encryptedCurrentPassword) {
            agregarContenidoArchivo(correo, '/updateUser', "Contraseña Incorrecta, datos no actualizados")
            return res.status(400).json(
                {
                    success: false,
                    message: 'Current password is incorrect'
                }
            );
        }

        var urlImagen = image
        if (imageBool === true) {
            urlImagen = await saveImage(image);
        }

        const encryptedNewPassword = encryptor.encrypt(newPassword, process.env.KEY);

        const updateResult = await db.query('UPDATE usuario SET nombre = ?, apellido = ?, username = ?, fecha_nac = ?, sexo = ?, password = ?, image = ? WHERE correo = ?', [nombre, apellido, username, fecha_nac, sexo, encryptedNewPassword, urlImagen, correo]);

        if (updateResult.affectedRows > 0) {

            const updatedUser = await db.query('SELECT * FROM usuario WHERE correo = ?', [correo]);
            agregarContenidoArchivo(correo, '/updateUser', "Actualización de datos del usuario realizado de forma exitosa")
            return res.status(200).json(
                {
                    success: true,
                    message: "Your profile was successfully updated.",
                    user: updatedUser[0]
                }
            );
        } else {
            agregarContenidoArchivo(correo, '/updateUser', "Eror al actualizar los datos del usuario")
            return res.status(500).json(
                {
                    success: false,
                    message: 'Failed to update user data'
                }
            );
        }
    } catch (error) {
        console.error('Error updating user:', error);
        agregarContenidoArchivo("Desconocido", '/updateUser', "Error interno en el servidor")
        return res.status(500).json(
            {
                success: false,
                message: 'Internal Server Error'
            });
    }
};

exports.updateProduct = async (req, res) => {
    try {
        const id_product = req.params.id_product;
        const { name, description, image, price, stock, correo } = req.body;


        const existingProduct = await db.query('SELECT * FROM producto WHERE id_producto = ?', [id_product]);
        if (existingProduct.length === 0) {
            agregarContenidoArchivo(correo, '/updateProduct/:id_product', "Product not found")
            return res.status(404).json({ success: false, message: 'Product not found' });
        }

        // Actualizar los datos del producto
        const updateResult = await db.query('UPDATE producto SET nombre = ?, descripcion = ?, image = ?, precio = ?, stock = ? WHERE id_producto = ?', [name, description, image, price, stock, id_product]);

        if (updateResult.affectedRows > 0) {
            agregarContenidoArchivo(correo, '/updateProduct/:id_product', "Producto actualizado de forma exitosa")
            return res.status(200).json({ success: true, message: "Product updated successfully." });
        } else {
            agregarContenidoArchivo(correo, '/updateProduct/:id_product', "Error, no se pudo actualizar el producto")
            return res.status(500).json({ success: false, message: 'There was a problem updating the product, try again.' });
        }
    } catch (error) {
        console.error('Error updating product:', error);
        agregarContenidoArchivo("Desconocido", '/updateProduct/:id_product', "Error interno en el servidor")
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

exports.getReportes = async (req, res) => {
    try {

        const id_user = req.params.id_user;
        const correo = await getCorreoUsuario(id_user)

        // REPORTE 1: Últimos 5 usuarios registrados
        const latestUsers = await db.query('SELECT CONCAT(nombre, " ", apellido) AS name, correo AS email, username FROM usuario ORDER BY id_user DESC LIMIT 5');
        const reporte1 = latestUsers.map(user => ({
            name: user.name,
            email: user.email,
            username: user.username
        }));

        //REPORTE 2: Top de doctores con más citas atendidas

        const reporte2Query = `
             SELECT CONCAT(u.nombre, " ", u.apellido) AS name, u.correo AS email, u.username, COUNT(*) AS citas
             FROM usuario u
             INNER JOIN cita c ON u.id_user = c.id_user_doctor
             WHERE u.rol = 1 AND c.estado = 2
             GROUP BY u.id_user
             ORDER BY citas DESC
         `;
        const citasAtendidas = await db.query(reporte2Query);

        const reporte2 = citasAtendidas.map(doctor => ({
            name: doctor.name,
            email: doctor.email,
            username: doctor.username,
            citas: doctor.citas
        }));

        // REPORTE 3: Top 3 de productos con mayor stock
        const reporte3Query = `
            SELECT nombre AS name, stock
            FROM producto
            ORDER BY stock DESC
            LIMIT 3
        `;
        const topProductos = await db.query(reporte3Query);
        const reporte3 = topProductos.map(producto => ({
            name: producto.name,
            stock: producto.stock
        }));

        // REPORTE 4: Top 3 de productos con menor stock
        const reporte4Query = `
            SELECT nombre AS name, stock
            FROM producto
            ORDER BY stock ASC
            LIMIT 3
        `;
        const bottomProductos = await db.query(reporte4Query);
        const reporte4 = bottomProductos.map(producto => ({
            name: producto.name,
            stock: producto.stock
        }));

        // REPORTE 5: Top 3 de productos con mayor precio
        const reporte5Query = `
            SELECT nombre AS name, precio AS price
            FROM producto
            ORDER BY precio DESC
            LIMIT 3
        `;
        const topPrecios = await db.query(reporte5Query);
        const reporte5 = topPrecios.map(producto => ({
            name: producto.name,
            price: producto.price
        }));

        agregarContenidoArchivo(correo, '/getReportes/:id_user', "Consulta de reportes general")
        res.status(200).json({ reporte1, reporte2, reporte3, reporte4, reporte5 });
    } catch (error) {
        console.error('Error getting latest users:', error);
        agregarContenidoArchivo("Desconocido", '/getReportes/:id_user', "Error interno en el servidor")
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};


exports.realizarCompra = async (req, res) => {
    try {
        const { productos, pago, direccion, id_user, total_compra } = req.body;

        const correo = await getCorreoUsuario(id_user)

        for (const producto of productos) {
            const { id_producto, cantidad } = producto;


            const stockActual = await db.query('SELECT stock FROM producto WHERE id_producto = ?', [id_producto]);

            if (stockActual[0].stock < cantidad) {
                agregarContenidoArchivo(correo, '/comprar', "No hay suficiente stock para realizar la compra")
                return res.status(400).json({ status: false, id_compra: "", message: 'No hay suficiente stock para realizar la compra' });
            }


            const nuevoStock = stockActual[0].stock - cantidad;

            // Actualizar el stock del producto en la base de datos
            await db.query('UPDATE producto SET stock = ? WHERE id_producto = ?', [nuevoStock, id_producto]);
        }

        // Guardar el registro de la compra en la tabla de compras
        const id_compra = generateCompraID(); // Generar un ID único para la compra
        const fecha_hora = new Date(); // Obtener la fecha y hora actual

        await db.query('INSERT INTO compra (id_compra, id_user, fecha_hora, total_compra, metodo_pago, direccion) VALUES (?, ?, ?, ?, ?, ?)',
            [id_compra, id_user, fecha_hora, total_compra, pago, direccion]);

        // Enviar respuesta de éxito
        agregarContenidoArchivo(correo, '/comprar', "Compra realizada exitosamente")
        res.status(200).json({ status: true, id_compra: id_compra, message: 'Compra realizada exitosamente' });

    } catch (error) {
        console.error('Error realizando compra:', error);
        agregarContenidoArchivo("Desconocido", '/comprar', "Error interno en el servidor")
        res.status(500).json({ status: false, id_compra: id_compra, message: 'Error interno del servidor' });
    }
};

function generateCompraID() {

    var currentDate = new Date();
    var month = ('0' + (currentDate.getMonth() + 1)).slice(-2); 
    var day = ('0' + currentDate.getDate()).slice(-2); 
    var hours = ('0' + currentDate.getHours()).slice(-2); 
    var minutes = ('0' + currentDate.getMinutes()).slice(-2); 
    var seconds = ('0' + currentDate.getSeconds()).slice(-2); 

    
    return 'COM-' + month + day + hours + minutes + seconds;
}



exports.history = async (req, res) => {
    try {
        const id_user = req.params.id_user;
        const correo = await getCorreoUsuario(id_user)
        console.log(id_user)
        // Consultar todas las compras realizadas por el usuario
        const compras = await db.query('SELECT * FROM compra WHERE id_user = ?', [id_user]);

        // Mapear las compras al formato deseado
        const comprasFormateadas = compras.map(compra => ({
            id_compra: compra.id_compra,
            fecha: formatDate(compra.fecha_hora),
            hora: formatTime(compra.fecha_hora),
            metodo: compra.metodo_pago,
            direccion: compra.direccion,
            total: compra.total_compra
        }));

        // Enviar las compras formateadas como respuesta
        agregarContenidoArchivo(correo, '/getCompras/:id_user', "Consulta de historial de compras")
        res.status(200).json({ success: true, list: comprasFormateadas });
    } catch (error) {
        console.error('Error obteniendo compras por usuario:', error);
        agregarContenidoArchivo("Desconocido", '/getCompras/:id_user', "Error interno en el servidor")
        res.status(500).json({ success: false, message: 'Error interno del servidor' });
    }
};


function formatDate(date) {
    const formattedDate = new Date(date);
    return formattedDate.toISOString().split('T')[0];
}


function formatTime(date) {
    const formattedTime = new Date(date);
    return formattedTime.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
}


exports.getBitacora = async (req, res) => {
    try {
        const id_user = req.params.id_user;
        const correo = await getCorreoUsuario(id_user);
        
        // Consultar la bitácora del usuario
        const bitacora = await db.query('SELECT fecha_hora, descripcion FROM history');
        
        // Formatear los resultados
        const formattedBitacora = bitacora.map(log => ({
            fechaHora: formatDate2(log.fecha_hora),
            description: log.descripcion
        }));

        // Enviar la bitácora formateada como respuesta
        agregarContenidoArchivo(correo, '/getBitacora/:id_user', "Consulta de bitácora del usuario");
        res.status(200).json({ bitacora: formattedBitacora });
    } catch (error) {
        console.error('Error obteniendo bitácora del usuario:', error);
        agregarContenidoArchivo("Desconocido", '/getBitacora/:id_user', "Error interno en el servidor al obtener la bitácora");
        res.status(500).json({ success: false, message: 'Error interno del servidor al obtener la bitácora' });
    }
};


function formatDate2(date) {
    const formattedDate = new Date(date);
    const day = ('0' + formattedDate.getDate()).slice(-2);
    const month = ('0' + (formattedDate.getMonth() + 1)).slice(-2);
    const year = formattedDate.getFullYear();
    const hours = ('0' + formattedDate.getHours()).slice(-2);
    const minutes = ('0' + formattedDate.getMinutes()).slice(-2);
    const seconds = ('0' + formattedDate.getSeconds()).slice(-2);

    return `${day}/${month}/${year} - ${hours}:${minutes}:${seconds}`;
}


