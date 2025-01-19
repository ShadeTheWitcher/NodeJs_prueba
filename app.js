// app.js
import 'dotenv/config'; // Cargar variables de entorno
import express from 'express';
import methodOverride from 'method-override';
import path from 'path';
import routes from './routes/IndexRutas.js'; // Importar rutas centralizadas
import { fileURLToPath } from 'url';


// Configuración de rutas y directorios
const __filename = fileURLToPath(import.meta.url); // Obtener el nombre del archivo actual
const __dirname = path.dirname(__filename); // Obtener el directorio actual

const app = express();
const port = process.env.PORT || 3000;

// Usar method-override para simular métodos como DELETE y PUT en formularios HTML
app.use(methodOverride('_method'));

// Configurar el motor de vistas y el directorio personalizado para vistas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middlewares
app.use(express.json()); // Middleware para parsear JSON
app.use(express.urlencoded({ extended: true })); // Middleware para datos de formularios

// Usar las rutas centralizadas
app.use('/', routes);

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});

