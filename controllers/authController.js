//authController.js
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { createUser } from './userController.js'; // Importar createUser
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const users = []; // Simulación de base de datos temporal

// Clave secreta para firmar los tokens (debe estar en variables de entorno en producción)
const SECRET_KEY = process.env.JWT_SECRET

/**
 * Registrar un nuevo usuario
 * @param {Request} req
 * @param {Response} res
 */
export const register = async (req, res) => {
  const { usuario, pass, correo } = req.body; // Obtener datos del cuerpo de la solicitud

  // Crear un objeto con los datos del usuario
  const userData = { usuario, pass, correo, rol };

  try {
    // Crea el nuevo usuario
    const newUser = await createUser(userData); //se llama a la funcion createUser del controllador de users

    // Generar el token JWT para el usuario
    const token = jwt.sign(
      { id: newUser.id, usuario: newUser.usuario }, 
      SECRET_KEY, 
      { expiresIn: '1h' } // El token expira en 1 hora
    );

    // Responder con los datos del usuario y el token
    res.status(201).json({
      message: 'Usuario registrado',
      user: newUser,
      token, // Se incluye el token generado
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

/**
 * Iniciar sesión
 * @param {Request} req
 * @param {Response} res
 */
export const login = async (req, res) => {
  const { usuario, pass } = req.body;

  try {
    // Buscar el usuario en la base de datos con Prisma
    const user = await prisma.usuarios.findUnique({
      where: { usuario: usuario },
    });

    // Verificar si el usuario existe
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Verificar la contraseña
    const isPasswordValid = await bcrypt.compare(pass, user.pass);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Contraseña incorrecta' });
    }

    // Generar el token
    const token = jwt.sign(
      { id: user.id, usuario: user.usuario },
      SECRET_KEY,
      {
        expiresIn: '1h', // Expira en 1 hora
      }
    );

    res.status(200).json({ message: 'Inicio de sesión exitoso', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};


const viewLogin = (req, res) => {
  const error = req.query.error || null; // Si hay un error, lo tomamos de la query string
  res.render('login', { error });
};



// Exportar todas las funciones como un objeto
export const AuthController = {
  register,
  login,
  viewLogin,
  
};
