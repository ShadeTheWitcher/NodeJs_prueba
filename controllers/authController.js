const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const users = []; // Simulación de base de datos temporal

// Clave secreta para firmar los tokens (debe estar en variables de entorno en producción)
const SECRET_KEY = 'mi_secreto_super_seguro';

// Registrar un nuevo usuario
exports.register = async (req, res) => {
  const { usuario, pass } = req.body;

  // Verificar si el usuario ya existe
  const userExists = users.find(u => u.usuario === usuario);
  if (userExists) {
    return res.status(400).json({ message: 'El usuario ya existe' });
  }

  // Cifrar la contraseña
  const hashedPassword = await bcrypt.hash(pass, 10);

  // Guardar el usuario
  const newUser = { id: users.length + 1, usuario, pass: hashedPassword };
  users.push(newUser);

  res.status(201).json({ message: 'Usuario registrado', user: newUser });
};

// Iniciar sesión
exports.login = async (req, res) => {
  const { usuario, pass } = req.body;

  // Buscar el usuario
  const user = users.find(u => u.usuario === usuario);
  if (!user) {
    return res.status(404).json({ message: 'Usuario no encontrado' });
  }

  // Verificar la contraseña
  const isPasswordValid = await bcrypt.compare(pass, user.pass);
  if (!isPasswordValid) {
    return res.status(401).json({ message: 'Contraseña incorrecta' });
  }

  // Generar el token
  const token = jwt.sign({ id: user.id, usuario: user.usuario }, SECRET_KEY, {
    expiresIn: '1h', // Expira en 1 hora
  });

  res.status(200).json({ message: 'Inicio de sesión exitoso', token });
};

// Verificar el token
exports.verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(403).json({ message: 'Token no proporcionado' });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded; // Guardar los datos del usuario en el request
    next(); // Continuar con la siguiente función
  } catch (error) {
    return res.status(401).json({ message: 'Token inválido o expirado' });
  }
};
