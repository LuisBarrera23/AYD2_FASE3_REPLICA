## Pruebas de Regresión

### 1. Confirmar Restablecimiento de Contraseña
- **Escenario:** Se confirma el restablecimiento de contraseña mediante el método `confirmPasswordReset`.
- **Resultado esperado:** La contraseña se restablece correctamente en la base de datos después de confirmarla con el código de verificación. Se devuelve un mensaje de éxito.

### 2. Olvido de Contraseña
- **Escenario:** Se solicita restablecer la contraseña olvidada mediante el método `forgotPassword`.
- **Resultado esperado:** Se envía un código de verificación al correo electrónico del usuario para restablecer la contraseña. Se devuelve un mensaje de éxito.

### 3. Obtener Usuarios
- **Escenario:** Se intenta obtener la información de un usuario mediante el método `getUsers`.
- **Resultado esperado:** Se autentica al usuario con Cognito y luego se busca su información en la base de datos. Si el usuario existe, se devuelve su información en formato JSON con un estado de éxito. Si las credenciales son incorrectas, se devuelve un mensaje de error.

### 4. Agregar Usuario
- **Escenario:** Se agrega un nuevo usuario mediante el método `addUser`.
- **Resultado esperado:** Se registra al nuevo usuario en Cognito y luego se inserta su información en la base de datos. Se devuelve un mensaje de éxito si el registro se realiza correctamente. Si el usuario ya existe o falta algún campo requerido, se devuelve un mensaje de error.


### 5. Inicio de sesión de usuarios
- **Escenario:** Un usuario existente inicia sesión en la aplicación.
- **Resultado esperado:** El usuario inicia sesión correctamente y es redirigido a su página principal.


### 6. Actualización de perfil de usuario
- **Escenario:** Un usuario actualiza su información de perfil.
- **Resultado esperado:** La información de perfil del usuario se actualiza correctamente y se muestra correctamente en la aplicación.

### 7. Carga de archivos
- **Escenario:** Un usuario carga un archivo en la aplicación.
- **Resultado esperado:** El archivo se carga correctamente y está disponible para su uso en la aplicación.

### 8. Actualización de datos de producto
- **Escenario:** Un administrador actualiza los datos de un producto existente.
- **Resultado esperado:** Los datos del producto se actualizan correctamente y se reflejan correctamente en la base de datos y la interfaz de usuario.

### 9. Eliminación de usuarios
- **Escenario:** Un administrador elimina un usuario existente de la aplicación.
- **Resultado esperado:** El usuario se elimina correctamente de la base de datos y ya no tiene acceso a la aplicación.


## 10. Registro de usuarios
- **Escenario:** Se realiza el registro de un nuevo usuario mediante el método `uploadCSV`.
- **Resultado esperado:**El usuario se registra correctamente en la base de datos y en el servicio de Cognito.

## 11. Obtención de doctores
- **Escenario:** Se solicita obtener la lista de todos los doctores mediante el método `getDoctor`.
- **Resultado esperado:**Se obtiene correctamente la lista de doctores sin incluir la contraseña de cada usuario.

## 12. Obtención de pacientes
- **Escenario:**Se solicita obtener la lista de todos los pacientes mediante el método `getPaciente`.
- **Resultado esperado:**Se obtiene correctamente la lista de pacientes sin incluir la contraseña de cada usuario.

## 13. Eliminación de usuarios
- **Escenario:**Se elimina un usuario (doctor o paciente) mediante el método `deleteUser`.
- **Resultado esperado:**suario se elimina correctamente tanto de la base de datos como del servicio de Cognito.

## 14. Agregar producto
- **Escenario:**Se agrega un nuevo producto mediante el método `guardarProducto`.
- **Resultado esperado:**El producto se guarda correctamente en la base de datos.

## 15. Carga masiva de productos
- **Escenario:** carga un archivo CSV con información de múltiples productos mediante el método `cargaProducto`.
- **Resultado esperado:**Todos los productos del archivo CSV se cargan correctamente en la base de datos.

## 16. Actualización de datos de producto
- **Escenario:**Se actualizan los datos de un producto existente.
- **Resultado esperado:**Los datos del producto se actualizan correctamente en la base de datos.


## 17. Obtención de Citas en Espera
- **Escenario:**Se solicita obtener la lista de citas en espera mediante el método `citasEsperando`.
- **Resultado esperado:**Se obtiene correctamente la lista de citas en espera.

## 18. Agendar Cita
- **Escenario:**Se agenda una cita para un usuario mediante el método `agendarCita`.
- **Resultado esperado:**La cita se agenda correctamente y se actualiza su estado en la base de datos.

## 19. Obtención de Citas Agendadas
- **Escenario:**Se solicita obtener la lista de citas agendadas para un doctor específico mediante el método `getcitasAgendadas`.
- **Resultado esperado:**Se obtiene correctamente la lista de citas agendadas para el doctor especificado.

## 20. Atender Citas
- **Escenario:**Se marca una cita como atendida por un doctor mediante el método `atenderCitas`.
- **Resultado esperado:**La cita se marca como atendida correctamente en la base de datos y se refleja en la lista de citas para ese doctor.

### 21. Actualización de Usuario
- **Escenario:** Se actualiza la información de un usuario mediante el método `updateUser`.
- **Resultado esperado:** La información del usuario se actualiza correctamente en la base de datos y se devuelve un mensaje de éxito.

### 22. Actualización de Producto
- **Escenario:** Se actualiza la información de un producto mediante el método `updateProduct`.
- **Resultado esperado:** La información del producto se actualiza correctamente en la base de datos y se devuelve un mensaje de éxito.

### 23. Obtención de Reportes
- **Escenario:** Se solicita obtener varios reportes mediante el método `getReportes`.
- **Resultado esperado:** Se obtienen correctamente los reportes solicitados y se devuelven en formato JSON.

### 24. Realización de Compra
- **Escenario:** Se realiza una compra mediante el método `realizarCompra`.
- **Resultado esperado:** La compra se realiza correctamente, se actualiza el stock de los productos comprados y se guarda el registro de la compra en la base de datos.

### 25. Historial de Compras por Usuario
- **Escenario:** Se solicita obtener el historial de compras de un usuario mediante el método `history`.
- **Resultado esperado:** Se obtiene correctamente el historial de compras del usuario especificado y se devuelve en formato JSON.
