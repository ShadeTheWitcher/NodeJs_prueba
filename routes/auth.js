// routes/auth.js
const express = require('express');
const router = express.Router();

// Aquí agregamos las rutas relacionadas con la autenticación
router.post('/login', (req, res) => {
  res.send('Iniciar sesión');
});

router.post('/register', (req, res) => {
  res.send('Registrar usuario');
});

module.exports = router;
