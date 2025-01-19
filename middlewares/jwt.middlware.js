import jwt from 'jsonwebtoken'

/**
 * Verificar el token
 * @param {Request} req
 * @param {Response} res
 * @param {Function} next
 */
export const verifyToken = (req, res, next) => {
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





}