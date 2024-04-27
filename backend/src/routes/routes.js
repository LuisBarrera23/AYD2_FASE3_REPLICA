// Import necessary modules
const express = require('express');
const router = express.Router(); // Create an Express router

const {updateUser,updateProduct, getReportes, realizarCompra, history, getBitacora}= require('../controllers/newEndpoints')

//Controllers
const { uploadCSV, getDoctor, getPaciente, deleteUser, guardarProducto, cargaProducto } = require('../controllers/consultasAdmin');
const { getUsers, addUser, forgotPassword, confirmPasswordReset } = require('../controllers/consultas');
const { addCita, getCitas, cancelCita, getProductos } = require('../controllers/consultasPaciente');
const { citasEsperando, agendarCita, getcitasAgendadas, atenderCitas } = require('../controllers/consultasDoctor');

//routers

router.post('/login', getUsers); //Log

router.post('/adduser', addUser); //log

router.post('/forgotPassword', forgotPassword); //log

router.post('/confirmPasswordReset', confirmPasswordReset); //log

router.post('/addCita', addCita); //log 

router.get('/getCitas/:id_user', getCitas); //log

router.put('/cancelCita', cancelCita); //log

router.post('/uploadCSV', uploadCSV); //log

router.get('/getDoctores/:id_user', getDoctor); //log

router.get('/getUsuarios/:id_user', getPaciente); //log

router.post('/deleteUser', deleteUser); //log

router.post('/ingresarProducto', guardarProducto); //log

router.post('/uploadCSV2', cargaProducto); //log

router.get('/getCitasEsperando/:id_user', citasEsperando ); //log

router.put('/agendarCita', agendarCita); //log

router.get('/products/:id_user', getProductos); //Log

router.get('/getCitasDoctor/:id_user_doctor', getcitasAgendadas); //log

router.put('/atenderCita', atenderCitas); //log


//New Router
router.put('/updateUser', updateUser); //log

router.put('/updateProduct/:id_product', updateProduct); //log

router.get('/getReportes/:id_user', getReportes); //log
router.post('/comprar', realizarCompra); //log

router.get('/getCompras/:id_user', history); //log

router.get('/getBitacora/:id_user', getBitacora); //log

// prueba status 200
router.get('/status', (req, res) => {
  // hola y status 200
    res.status(200).send('status 200');
});


module.exports = router;  // Export the router for use in app.js