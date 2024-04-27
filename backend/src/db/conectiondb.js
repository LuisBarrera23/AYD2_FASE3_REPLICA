const mysql = require('mysql2/promise');


class DbSingleton {
  constructor() {
    if (!DbSingleton.instance) {
      this.pool = mysql.createPool({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
      });

      DbSingleton.instance = this;
    }

    return DbSingleton.instance;
  }

  async query(sql, values) {
    const connection = await this.pool.getConnection();
    try {
      const [rows, fields] = await connection.query(sql, values);
      return rows;
    } finally {
      connection.release();
    }
  }
}

module.exports = DbSingleton;