// routes/index.js
const express = require('express');
const router = express.Router();

// Importar las rutas de usuarios y autenticación
const userRoutes = require('./RoutesUsers');
const authRoutes = require('./RoutesAuth');

// Definir las rutas
router.use('/users', userRoutes);  // Ruta para usuarios
router.use('/auth', authRoutes);   // Ruta para autenticación

// Ruta raíz
router.get('/', (req, res) => {
  // Pasar un valor predeterminado (null o una cadena vacía) para `message` y `user`
  res.render("index1", { message: null, user: null });
});

module.exports = router;
