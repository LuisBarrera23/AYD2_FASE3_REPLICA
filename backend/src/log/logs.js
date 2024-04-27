const fs = require('fs');

function agregarContenidoArchivo(usuario, endpoint, contenido) {
    const fechaHoraActual = new Date();

    
    const fechaFormateada = fechaHoraActual.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' });
    const horaFormateada = fechaHoraActual.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', second: '2-digit' });

    
    const registro = `${fechaFormateada} ${horaFormateada} - Usuario: ${usuario} - Endpoint: ${endpoint} - Acción: ${contenido}, `;

   
    fs.appendFile("Logs_Backend.txt", registro, (error) => {
        if (error) {
            console.error('Hubo un error al agregar contenido al archivo:', error);
        } else {
            console.log('Registro agregado exitosamente al archivo de logs');
        }
    });
}

// Ejemplo de uso
// const usuario = "Luis Perez";
// const endpoint = "/paciente/login";
// const contenido = "Inicio de Sesión correcto";

// agregarContenidoArchivo(usuario, endpoint, contenido);


module.exports = {
    agregarContenidoArchivo
  };