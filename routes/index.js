// routes/index.js
const express = require('express');
const router = express.Router();

// Importar las rutas de usuarios y autenticación
const userRoutes = require('./users');
const authRoutes = require('./auth');

// Definir las rutas
router.use('/users', userRoutes);  // Ruta para usuarios
router.use('/auth', authRoutes);   // Ruta para autenticación

// Ruta raíz
router.get('/', (req, res) => {
  res.send('¡Bienvenido a mi API!');
});

module.exports = router;
