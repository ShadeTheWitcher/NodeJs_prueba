// app.js
const express = require('express');
const dotenv = require('dotenv');
const routes = require('./routes');  // Importamos las rutas centralizadas

const app = express();
const port = process.env.PORT || 3000;

// Cargar variables de entorno
dotenv.config();

// Middleware para procesar datos JSON
app.use(express.json());

// Usar las rutas centralizadas
app.use('/', routes);  // El archivo 'routes/index.js' centraliza las rutas

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});


