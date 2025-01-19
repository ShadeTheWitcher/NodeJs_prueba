//routesAuth.js
import { Router } from 'express';
import { AuthController } from '../controllers/authController.js';
import { verifyToken } from '../middlewares/jwt.middlware.js';

const router = Router();

// Rutas de autenticación
router.post('/register', AuthController.register);
router.post('/login', AuthController.login);

// Ruta protegida (requiere token)
router.get('/protected', verifyToken, (req, res) => {
  res.status(200).json({ message: 'Acceso permitido', user: req.user });
});

export default router;
