-- Crear tabla usuario
CREATE TABLE usuario (
    id_user INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255),
    apellido VARCHAR(255),
    fecha_nac DATE,
    sexo VARCHAR(10),
    username VARCHAR(50),
    password TEXT,
    correo VARCHAR(255),
    image TEXT,
    rol INT
);

-- Crear tabla producto
CREATE TABLE producto (
    id_producto INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255),
    descripcion TEXT,
    precio FLOAT,
    image TEXT,
    stock INT,
    comprados INT
);

-- Crear tabla cita
CREATE TABLE cita (
    id_cita INT AUTO_INCREMENT PRIMARY KEY,
    id_user_paciente INT,
    id_user_doctor INT,
    descripcion TEXT,
    estado INT,
    fecha DATE,
    hora TIME,
    FOREIGN KEY (id_user_paciente) REFERENCES usuario(id_user),
    FOREIGN KEY (id_user_doctor) REFERENCES usuario(id_user)
);


CREATE TABLE compra (
    id_compra VARCHAR(255) PRIMARY KEY,
    id_user INT,
    fecha_hora DATETIME,
    total_compra FLOAT,
    metodo_pago VARCHAR(255),
    direccion VARCHAR(255),
    FOREIGN KEY (id_user) REFERENCES usuario(id_user)
);


CREATE TABLE history (
    id_log INT AUTO_INCREMENT PRIMARY KEY,
    fecha_hora DATETIME,
    descripcion TEXT
);