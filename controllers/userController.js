//userController.js

// Importar PrismaClient
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
const prisma = new PrismaClient();

// Crear un usuario
// userController.js
const users = []; // Simulación de base de datos temporal

/**
 * Crear un nuevo usuario
 * @param {Request} req
 * @param {Response} res
 */
export const createUser = async (req, res) => {
  const { usuario, pass, correo, rol = 2 } = req.body;

  try {
    // Verificar si el usuario ya existe
    const userExists = await prisma.usuarios.findUnique({
      where: { usuario },
    });

    if (userExists) {
      return res.status(400).json({ error: 'El usuario ya existe' });
    }

    // Cifrar la contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(pass, salt);

    // Crear el usuario en la base de datos
    const newUser = await prisma.usuarios.create({
      data: {
        usuario,
        correo,
        pass: hashedPassword,
        rol,
      },
    });

    // Responder con el nuevo usuario
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ error: 'Error al crear el usuario', details: err.message });
  }
};




// Leer todos los usuarios
const getAllUsers = async (req, res) => {
  try {
    const usuarios = await prisma.usuarios.findMany();
    res.render('usersAdmin', { usuarios }); // Renderiza la vista con la lista de usuarios
  } catch (error) {
    console.error('Error al obtener los usuarios:', error);
    res.status(500).send('Error al obtener los usuarios');
  }
};

// Leer un usuario por ID
const getUserById = async (req, res) => {
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
export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { usuario, pass, role } = req.body;

  // Validar que el rol sea un número válido (1 para admin, 2 para usuario común)
  const userRole = (role === 1 || role === 2) ? role : 2; // Si no se especifica, por defecto se asigna rol 2

  try {
    const updatedUser = await prisma.usuario.update({
      where: { id: parseInt(id) },
      data: { usuario, pass, role: userRole },
    });

    res.json({ message: 'Usuario actualizado', user: updatedUser });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar usuario', details: error.message });
  }
};

// Eliminar un usuario
const deleteUser = async (req, res) => {
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

// Exportar todas las funciones como un objeto
export const UserController = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
