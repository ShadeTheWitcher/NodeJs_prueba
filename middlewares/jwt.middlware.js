import jwt from 'jsonwebtoken'

/**
 * Verificar el token
 * @param {Request} req
 * @param {Response} res
 * @param {Function} next
 */
export const verifyToken = (req, res, next) => {
    // Obtener el token de los headers
    let token = req.headers.authorization;
  
    // Verificar si no se proporcionó el token
    if (!token) {
      return res.status(403).json({ message: 'Token no proporcionado' });
    }
  
    // Separar el token de la palabra 'Bearer'
    token = token.split(" ")[1];
  
    // Verificar el token
    try {
      // Decodificar el token y obtener los datos
      const decoded = jwt.verify(token, process.env.JWT_SECRET || SECRET_KEY);
  
      // Guardar los datos decodificados en el request para usarlos en las siguientes rutas
      req.user = decoded;
  
      // Continuar con la siguiente función
      next();
    } catch (error) {
      console.error('Error al verificar el token:', error);
  
      // Devolver un error si el token es inválido o ha expirado
      return res.status(401).json({ message: 'Token inválido o expirado' });
    }
  };