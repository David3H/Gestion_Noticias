const { Pool } = require('pg');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });

//Se crea un pool de conexión para la base de datos
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
  idleTimeoutMillis: 30000, //tiempo de inactividad
});

//Se maneja errores que puedan ocurrir en la conexión
pool.on('error', (err, client) => {
  console.error('Error inesperado en la base de datos:', err.message);
});

module.exports = pool;