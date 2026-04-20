const express = require('express');
const cors = require('cors');
const path = require('path');
const noticiasRoutes = require('./routes/noticiasRoutes');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const app = express();

// Middlewares globales
app.use(cors()); //manejo de cors para las peticiones
app.use(express.json());
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads'))); //url para mostrar las imagenes

// Cargar rutas
app.use('/api/noticias', noticiasRoutes);

// Iniciar el servidor en un puerto por defecto 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`La API se esta ejecutando en http://localhost:${PORT}`);
});