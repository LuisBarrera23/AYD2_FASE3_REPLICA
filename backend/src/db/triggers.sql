use ayd2proyecto;

-- Triggers para la tabla usuario

DELIMITER //
CREATE TRIGGER usuario_insert_trigger
AFTER INSERT ON usuario
FOR EACH ROW
BEGIN
    INSERT INTO history (fecha_hora, descripcion)
    VALUES (NOW(), CONCAT('Se ha insertado un nuevo usuario con ID: ', NEW.id_user));
END //
DELIMITER ;

DELIMITER //
CREATE TRIGGER usuario_update_trigger
AFTER UPDATE ON usuario
FOR EACH ROW
BEGIN
    INSERT INTO history (fecha_hora, descripcion)
    VALUES (NOW(), CONCAT('Se ha actualizado el usuario con ID: ', OLD.id_user));
END //
DELIMITER ;

DELIMITER //
CREATE TRIGGER usuario_delete_trigger
AFTER DELETE ON usuario
FOR EACH ROW
BEGIN
    INSERT INTO history (fecha_hora, descripcion)
    VALUES (NOW(), CONCAT('Se ha eliminado el usuario con ID: ', OLD.id_user));
END //
DELIMITER ;

-- Triggers para la tabla producto

DELIMITER //
CREATE TRIGGER producto_insert_trigger
AFTER INSERT ON producto
FOR EACH ROW
BEGIN
    INSERT INTO history (fecha_hora, descripcion)
    VALUES (NOW(), CONCAT('Se ha insertado un nuevo producto con ID: ', NEW.id_producto));
END //
DELIMITER ;

DELIMITER //
CREATE TRIGGER producto_update_trigger
AFTER UPDATE ON producto
FOR EACH ROW
BEGIN
    INSERT INTO history (fecha_hora, descripcion)
    VALUES (NOW(), CONCAT('Se ha actualizado el producto con ID: ', OLD.id_producto));
END //
DELIMITER ;

DELIMITER //
CREATE TRIGGER producto_delete_trigger
AFTER DELETE ON producto
FOR EACH ROW
BEGIN
    INSERT INTO history (fecha_hora, descripcion)
    VALUES (NOW(), CONCAT('Se ha eliminado el producto con ID: ', OLD.id_producto));
END //
DELIMITER ;

-- Triggers para la tabla cita

DELIMITER //
CREATE TRIGGER cita_insert_trigger
AFTER INSERT ON cita
FOR EACH ROW
BEGIN
    INSERT INTO history (fecha_hora, descripcion)
    VALUES (NOW(), CONCAT('Se ha insertado una nueva cita con ID: ', NEW.id_cita));
END //
DELIMITER ;

DELIMITER //
CREATE TRIGGER cita_update_trigger
AFTER UPDATE ON cita
FOR EACH ROW
BEGIN
    INSERT INTO history (fecha_hora, descripcion)
    VALUES (NOW(), CONCAT('Se ha actualizado la cita con ID: ', OLD.id_cita));
END //
DELIMITER ;

DELIMITER //
CREATE TRIGGER cita_delete_trigger
AFTER DELETE ON cita
FOR EACH ROW
BEGIN
    INSERT INTO history (fecha_hora, descripcion)
    VALUES (NOW(), CONCAT('Se ha eliminado la cita con ID: ', OLD.id_cita));
END //
DELIMITER ;

-- Triggers para la tabla compra

DELIMITER //
CREATE TRIGGER compra_insert_trigger
AFTER INSERT ON compra
FOR EACH ROW
BEGIN
    INSERT INTO history (fecha_hora, descripcion)
    VALUES (NOW(), CONCAT('Se ha insertado una nueva compra con ID: ', NEW.id_compra));
END //
DELIMITER ;

DELIMITER //
CREATE TRIGGER compra_update_trigger
AFTER UPDATE ON compra
FOR EACH ROW
BEGIN
    INSERT INTO history (fecha_hora, descripcion)
    VALUES (NOW(), CONCAT('Se ha actualizado la compra con ID: ', OLD.id_compra));
END //
DELIMITER ;

DELIMITER //
CREATE TRIGGER compra_delete_trigger
AFTER DELETE ON compra
FOR EACH ROW
BEGIN
    INSERT INTO history (fecha_hora, descripcion)
    VALUES (NOW(), CONCAT('Se ha eliminado la compra con ID: ', OLD.id_compra));
END //
DELIMITER ;
