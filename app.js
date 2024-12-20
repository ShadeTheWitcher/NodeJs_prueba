// app.js
const express = require('express');
const dotenv = require('dotenv');
const routes = require('./routes/IndexRutas');  // Importamos las rutas centralizadas
const path = require('path'); //se usa para directorios personalizados
//ejemplo de directorio persolizado: app.set('views', path.join(__dirname, 'views'));
const methodOverride = require('method-override'); // Agregar esta línea


const app = express();
const port = process.env.PORT || 3000;


// Usar method-override para simular métodos como DELETE y PUT en formularios HTML
app.use(methodOverride('_method'));

//motor de vista
app.set('view engine', 'ejs');

// Cargar variables de entorno
dotenv.config();


// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Middleware para datos de formularios

// Usar las rutas centralizadas
app.use('/', routes);  // El archivo 'routes/index.js' centraliza las rutas


// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});


