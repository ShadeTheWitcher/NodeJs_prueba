const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Crear un usuario
exports.createUser = async (req, res) => {
  const { usuario, pass } = req.body;

  try {
    const newUser = await prisma.usuarios.create({
      data: { usuario, pass },
    });

    // Redirigir a la página de usuarios, pasando el mensaje y el usuario creado
    res.render('index1', { message: 'Usuario creado', user: newUser });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear usuario', details: error.message });
  }
};



// Leer todos los usuarios
exports.getAllUsers = async (req, res) => {
  try {
    const usuarios = await prisma.usuarios.findMany();
    res.render('usersAdmin', { usuarios }); // Renderiza la vista con la lista de usuarios
  } catch (error) {
    console.error('Error al obtener los usuarios:', error);
    res.status(500).send('Error al obtener los usuarios');
  }
};

// Leer un usuario por ID
exports.getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await prisma.usuarios.findUnique({
      where: { id: parseInt(id) },
    });

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener usuario', details: error.message });
  }
};

// Actualizar un usuario
exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { usuario, pass } = req.body;

  try {
    const updatedUser = await prisma.usuarios.update({
      where: { id: parseInt(id) },
      data: { usuario, pass },
    });

    res.json({ message: 'Usuario actualizado', user: updatedUser });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar usuario', details: error.message });
  }
};

// Eliminar un usuario
exports.deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.usuarios.delete({
      where: { id: parseInt(id) }, // Convertir el id a un número entero
    });

    // Redirigir después de eliminar
    res.redirect('/'); // Redirige a la página de usuarios después de la eliminación
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar usuario', details: error.message });
  }
};
