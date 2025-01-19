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

router.get('/profile', verifyToken, (req, res) => {
  // Esta ruta ahora está protegida
  res.json({ message: 'Perfil de usuario', user: req.user });
});

export default router;
