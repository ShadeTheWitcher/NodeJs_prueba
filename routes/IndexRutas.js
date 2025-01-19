// routes/index.js
const express = require('express');
const router = express.Router();


// Ruta para consumir la API de Pokémon
router.get('/api/pokemon/:name', async (req, res) => {
  const { name } = req.params; // Obtener el nombre del Pokémon de los parámetros de la URL
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    if (!response.ok) {
      throw new Error(`Error en la API de Pokémon: ${response.status}`);
    }

    const data = await response.json();
    res.json(data); // Devolver los datos como JSON
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//ruta para ver pokemon en view
router.get('/pokemon', async (req, res) => {
  const name = req.query.name;
  if (!name) return res.render('buscarPoke', { pokemon: null });

  const url = `https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`;
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Pokémon no encontrado');

    const data = await response.json();
    res.render('buscarPoke', {
      pokemon: {
        name: data.name,
        id: data.id,
        height: data.height,
        sprite: data.sprites.front_default,
      },
    });
  } catch (error) {
    res.render('buscarPoke', { pokemon: null });
  }
});




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
