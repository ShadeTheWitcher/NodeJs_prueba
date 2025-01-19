import { Router } from 'express';
import userRoutes from './RoutesUsers.js';
import authRoutes from './RoutesAuth.js';

const router = Router();

// Definir las rutas
router.use('/users', userRoutes); // Ruta para usuarios
router.use('/auth', authRoutes); // Ruta para autenticación

// Ruta raíz
router.get('/', (req, res) => {
  // Pasar un valor predeterminado (null o una cadena vacía) para `message` y `user`
  res.render("index1", { message: null, user: null });
});

export default router;
