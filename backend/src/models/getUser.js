const DbSingleton = require('../db/conectiondb');
const db = new DbSingleton();
exports.getCorreoUsuario = async (id_usuario) => {
    try {
      
      const usuario = await db.query('SELECT correo FROM usuario WHERE id_user = ?', [id_usuario]);
      
      if (usuario.length === 0) {
       
        return "Desconocido"
      }
      
      return usuario[0].correo;
      
    } catch (error) {
      
        return "Desconocido"
    }
  };
  