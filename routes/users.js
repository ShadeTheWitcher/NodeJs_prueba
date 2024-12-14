// routes/users.js
const express = require('express');
const router = express.Router();

// Aquí agregamos las rutas relacionadas con los usuarios
router.get('/', (req, res) => {
  res.send('Lista de usuarios');
});

router.post('/', (req, res) => {
  res.send('Crear nuevo usuario');
});

module.exports = router;
