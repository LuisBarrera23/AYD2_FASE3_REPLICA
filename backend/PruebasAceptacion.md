# Pruebas de Aceptación

## forgotPassword
### Escenario 1: Solicitud de cambio de contraseña exitosa

- **Entrada:** Petición POST a `/forgotPassword` con un correo electrónico válido en el cuerpo.
- **Salida esperada:**
  - Código de estado: 200
  - Respuesta JSON: `{ success: true, message: 'Se ha enviado un código de verificación a su correo electrónico' }`

### Escenario 2: Correo electrónico inexistente

- **Entrada:** Petición POST a `/forgotPassword` con un correo electrónico que no existe.
- **Salida esperada:**
  - Código de estado: 400
  - Respuesta JSON: `{ success: false, message: 'Error al solicitar el cambio de contraseña' }` (o un mensaje de error más específico de Cognito)

## confirmPasswordReset
### Escenario 1: Confirmación de contraseña exitosa

- **Entrada:** Petición POST a `/confirmPasswordReset` con un correo electrónico, código de verificación y nueva contraseña válidos.
- **Salida esperada:**
  - Código de estado: 200
  - Respuesta JSON: `{ success: true, message: 'Contraseña restablecida correctamente' }`
- **Verificación en la base de datos:**
  - La contraseña en la base de datos para el correo electrónico proporcionado debe actualizarse con la nueva contraseña encriptada.

### Escenario 2: Código de verificación o contraseña no válidos

- **Entrada:** Petición POST a `/confirmPasswordReset` con un correo electrónico válido, pero un código de verificación o una nueva contraseña no válidos.
- **Salida esperada:**
  - Código de estado: 400
  - Respuesta JSON: `{ success: false, message: 'Error al confirmar el cambio de contraseña' }` (o un mensaje de error más específico de Cognito)

### Escenario 3: Correo electrónico inexistente

- **Entrada:** Petición POST a `/confirmPasswordReset` con un correo electrónico que no existe.
- **Salida esperada:**
  - Código de estado: 400
  - Respuesta JSON: `{ success: false, message: 'Error al confirmar el cambio de contraseña' }` (o un mensaje de error más específico de Cognito)

## getUsers (Inicio de sesión)
### Escenario 1: Inicio de sesión exitoso

- **Entrada:** Petición POST a `/login` con un correo electrónico y contraseña válidos.
- **Salida esperada:**
  - Código de estado: 200
  - Respuesta JSON: `{ success: true, user: { /* datos del usuario */ } }`

### Escenario 2: Correo electrónico o contraseña incorrectos

- **Entrada:** Petición POST a `/login` con un correo electrónico o contraseña no válidos.
- **Salida esperada:**
  - Código de estado: 404
  - Respuesta JSON: `{ success: false, message: 'Correo electrónico o contraseña incorrectos' }`

### Escenario 3: Credenciales faltantes

- **Entrada:** Petición POST a `/login` con un correo electrónico o contraseña faltantes en el cuerpo.
- **Salida esperada:** (implementar validación en el código)
  - Código de estado: 400 (o un código similar para solicitud incorrecta)
  - Respuesta JSON con un mensaje de error que indica credenciales faltantes.

## addUser
### Escenario 1: Registro de usuario exitoso

- **Entrada:** Petición POST a `/adduser` con todos los campos obligatorios (incluida una URL de imagen válida) y una contraseña que cumpla con sus requisitos de complejidad.
- **Salida esperada:**
  - Código de estado: 201
  - Respuesta JSON: `{ success: true, message: 'Usuario registrado correctamente, revise su bandeja de entrada de correo electrónico.' }`
- **Verificación en la base de datos:**
  - Se debe crear un nuevo registro de usuario con la información proporcionada en la tabla de la base de datos.
  - Se debe crear un nuevo usuario de Cognito.

### Escenario 2: Campos obligatorios faltantes

- **Entrada:** Petición POST a `/adduser` con algunos campos obligatorios faltantes (por ejemplo, nombre, correo electrónico, contraseña).
- **Salida esperada:**
  - Código de estado: 400
  - Respuesta JSON con un mensaje de error que indica campos faltantes.

## uploadCSV

### Escenario 1: Carga exitosa de usuarios

- **Entrada:** Archivo CSV con formato válido (nombre, apellido, fecha_nac, sexo, username, password, correo, rol).
- **Salida esperada:**
  - Código de estado: 200.
  - Respuesta JSON: `{ success: true, message: 'File uploaded successfully.' }`.
- **Pruebas:**
  - Verificar que se crea un usuario en Cognito y en la base de datos por cada fila válida del CSV.
  - Comprobar que se encripta la contraseña antes de guardarla en la base de datos.
  - Validar que se manejen los errores por correo electrónico duplicado (omitir la creación del usuario en la base de datos).

### Escenario 2: Archivo CSV vacío

- **Entrada:** Archivo CSV vacío o sin datos.
- **Salida esperada:**
  - Código de estado: 400.
  - Respuesta JSON: `{ success: false, message: 'No files were uploaded.' }`.
- **Pruebas:**
  - Comprobar que se verifica la existencia de un archivo en la petición.

### Escenario 3: Error en Cognito

- **Entrada:** Archivo CSV con datos válidos.
- **Simulación:** Se produce un error durante la creación del usuario en Cognito.
- **Salida esperada:**
  - No se crea el usuario ni en Cognito ni en la base de datos.
  - Código de estado: 500.
  - Respuesta JSON: `{ success: false, message: <error message from Cognito> }`.
- **Pruebas:**
  - Inyectar un error simulado en la creación del usuario de Cognito para verificar el manejo de errores.

### Escenario 4: Error en la base de datos

- **Entrada:** Archivo CSV con datos válidos.
- **Simulación:** Se produce un error al insertar el usuario en la base de datos después de su creación en Cognito.
- **Salida esperada:**
  - Se elimina el usuario de Cognito.
  - Código de estado: 500.
  - Respuesta JSON: `{ success: false, message: <error message from database> }`.
- **Pruebas:**
  - Inyectar un error simulado en la inserción del usuario en la base de datos para verificar la eliminación del usuario en Cognito.

## getDoctor

### Escenario 1: Obtener todos los doctores

- **Entrada:** Petición GET a `/getDoctor`.
- **Salida esperada:**
  - Código de estado: 200.
  - Respuesta JSON: Arreglo de objetos con la información de los Doctores (sin contraseña).
- **Pruebas:**
  - Verificar que se consulten los usuarios con rol "Doctor" de la base de datos.
  - Comprobar que se eliminen las contraseñas de los usuarios antes de enviar la respuesta.

## getPaciente

### Escenario 1: Obtener todos los pacientes

- **Entrada:** Petición GET a `/getPaciente`.
- **Salida esperada:**
  - Código de estado: 200.
  - Respuesta JSON: Arreglo de objetos con la información de los Pacientes (sin contraseña).
- **Pruebas:** Análogas a las del escenario 1 de getDoctor.

## deleteUser

### Escenario 1: Eliminar un usuario

- **Entrada:** Petición POST a `/deleteUser` con el `id_user` del usuario a eliminar.
- **Salida esperada:**
  - Código de estado: 200.
  - Respuesta JSON: `{ success: true, message: 'User deleted from Cognito and database successfully.' }`.
- **Pruebas:**
  - Comprobar que se busca al usuario por su `id_user` en la base de datos.
  - Verificar que se elimina el usuario de Cognito.
  - Validar que se elimina el usuario de la base de datos.

### Escenario 2: Usuario no encontrado

- **Entrada:** Petición POST a `/deleteUser` con un `id_user` inexistente.
- **Salida esperada:**
  - Código de estado: 404.
  - Respuesta JSON: `{ success: false, message: 'User not found in the database' }`.
- **Pruebas:**
  - Simular una petición con un `id_user` que no exista en la base de datos.

### Escenario 3: Error en Cognito

- **Entrada:** Petición POST a `/deleteUser` con el `id_user` de un usuario existente.
- **Simulación:** Se produce un error al eliminar el usuario de Cognito.
- **Salida esperada:**
  - No se elimina el usuario de la base de datos.
  - Código de estado: 500.
  - Respuesta JSON: `{ success: false, message: 'Error deleting user from Cognito' }`.
- **Pruebas:**
  - Inyectar un error simulado en la eliminación del usuario de Cognito para verificar que no se elimina de la base de datos.

## guardarProducto

### Escenario 1: Agregar un producto

- **Entrada:** Petición POST a `/guardarProducto` con la información del producto.
- **Salida esperada:**
  - Código de estado: 201.
  - Respuesta JSON: `{ success: true, message: 'Product saved successfully' }`.
- **Pruebas:**
  - Verificar que se guardan correctamente los datos del producto en la base de datos.
  - Comprobar que se valida la existencia de todos los campos obligatorios.

### Escenario 2: Campos faltantes

- **Entrada:** Petición POST a `/guardarProducto` con algunos campos vacíos.
- **Salida esperada:**
  - Código de estado: 400.
  - Respuesta JSON: `{ success: false, message: 'All fields are required' }`.
- **Pruebas:**
  - Simular una petición con algunos campos del producto vacíos.

### Escenario 3: Error al guardar la imagen

- **Entrada:** Petición POST a `/guardarProducto` con una imagen no válida.
- **Salida esperada:**
  - Código de estado: 500.
  - Respuesta JSON: `{ success: false, message: 'Error saving the product' }`.
- **Pruebas:**
  - Simular una petición con una imagen que no se pueda procesar.

## cargaProducto

### Escenario 1: Carga masiva de productos

- **Entrada:** Archivo CSV con formato válido (nombre, descripcion, precio, stock, image).
- **Salida esperada:**
  - Código de estado: 200.
  - Respuesta JSON: `{ success: true, message: 'File uploaded successfully.' }`.
- **Pruebas:**
  - Verificar que se crea un producto en la base de datos por cada fila válida del CSV.
  - Comprobar que se manejan los errores por imagen no válida (omitir la creación del producto en la base de datos).

### Escenario 2: Error al obtener imagen

- **Entrada:** Archivo CSV con una imagen no válida en una fila.
- **Salida esperada:**
  - Se crea el producto en la base de datos sin la imagen.
  - Se registra un mensaje en la consola indicando el error al obtener la imagen.
- **Pruebas:**
  - Simular una petición con un archivo CSV que contenga una imagen no válida en una fila.


## citasEsperando

### Escenario 1: Obtener citas en espera con éxito

- **Entrada:** Petición GET a `/citasEsperando`.
- **Salida esperada:**
  - Código de estado: 200.
  - Respuesta JSON con la lista de citas en espera, incluyendo:
    - id_cita
    - paciente (nombre y apellido del paciente)
    - descripcion
    - estado
    - fecha
    - hora

## agendarCita

### Escenario 1: Agendar cita con éxito

- **Entrada:** Petición POST a `/agendarCita` con `id_cita`, `id_user_doctor` y `hora` válidos.
- **Salida esperada:**
  - Código de estado: 200.
  - Respuesta JSON con la lista actualizada de citas en espera.

### Escenario 2: Cita no encontrada

- **Entrada:** Petición POST a `/agendarCita` con un `id_cita` que no existe.
- **Salida esperada:**
  - Código de estado: 404.
  - Mensaje de error: "Cita not found for the specified user".

### Escenario 3: Parámetros de petición inválidos

- **Entrada:** Petición POST a `/agendarCita` con `id_cita`, `id_user_doctor` o `hora` faltantes.
- **Salida esperada:**
  - Código de estado: 400.
  - Mensaje de error: "Invalid request parameters".

## getcitasAgendadas

### Escenario 1: Obtener citas agendadas con éxito

- **Entrada:** Petición GET a `/getcitasAgendadas/:id_user_doctor`.
- **Salida esperada:**
  - Código de estado: 200.
  - Respuesta JSON con la lista de citas agendadas para el `id_user_doctor` especificado.

### Escenario 2: Doctor no encontrado

- **Entrada:** Petición GET a `/getcitasAgendadas/:id_user_doctor` con un `id_user_doctor` no existente.
- **Salida esperada:**
  - Código de estado: 404.
  - Mensaje de error: "Doctor not found".

## atenderCitas

### Escenario 1: Atender cita con éxito

- **Entrada:** Petición POST a `/atenderCitas` con `id_cita` y `id_user_doctor` válidos.
- **Salida esperada:**
  - Código de estado: 200.
  - Respuesta JSON con la lista actualizada de citas agendadas para el `id_user_doctor`.

### Escenario 2: Cita no encontrada

- **Entrada:** Petición POST a `/atenderCitas` con un `id_cita` que no existe.
- **Salida esperada:**
  - Código de estado: 404.
  - Mensaje de error: "Cita not found for the specified user".

### Escenario 3: Parámetros de petición inválidos

- **Entrada:** Petición POST a `/atenderCitas` con `id_cita` o `id_user_doctor` faltantes.
- **Salida esperada:**
  - Código de estado: 400.
  - Mensaje de error: "Invalid request parameters".


## updateUser

### Escenario 1: Actualización de usuario exitosa

- **Entrada:** Petición POST a `/updateUser` con datos de usuario válidos.
- **Salida esperada:**
  - Código de estado: 200 OK.
  - Respuesta JSON con el mensaje "Your profile was successfully updated." y los datos del usuario actualizados.

### Escenario 2: Usuario no encontrado

- **Entrada:** Petición POST a `/updateUser` con un correo electrónico que no existe en la base de datos.
- **Salida esperada:**
  - Código de estado: 404 Not Found.
  - Mensaje de error: "User not found".

### Escenario 3: Contraseña actual incorrecta

- **Entrada:** Petición POST a `/updateUser` con una contraseña actual incorrecta.
- **Salida esperada:**
  - Código de estado: 400 Bad Request.
  - Mensaje de error: "Current password is incorrect".

## updateProduct

### Escenario 1: Actualización de producto exitosa

- **Entrada:** Petición POST a `/updateProduct/:id_product` con datos de producto válidos.
- **Salida esperada:**
  - Código de estado: 200 OK.
  - Respuesta JSON con el mensaje "Product updated successfully.".

### Escenario 2: Producto no encontrado

- **Entrada:** Petición POST a `/updateProduct/:id_product` con un `id_product` que no existe.
- **Salida esperada:**
  - Código de estado: 404 Not Found.
  - Mensaje de error: "Product not found".

## getReportes

### Escenario 1: Obtención de reportes exitosa

- **Entrada:** Petición GET a `/getReportes`.
- **Salida esperada:**
  - Código de estado: 200 OK.
  - Respuesta JSON con los reportes generados.


## realizarCompra

### Escenario 1: Realización de compra exitosa

- **Entrada:** Petición POST a `/comprar` con datos de compra válidos.
- **Salida esperada:**
  - Código de estado: 200 OK.
  - Respuesta JSON con el mensaje "Compra realizada exitosamente".

## history

### Escenario 1: Obtención de historial de compras exitosa

- **Entrada:** Petición GET a `/getCompras/:id_user`.
- **Salida esperada:**
  - Código de estado: 200 OK.
  - Respuesta JSON con el historial de compras del usuario especificado.
