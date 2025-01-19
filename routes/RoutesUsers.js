//routesUsers.js
import { Router } from 'express';
import { UserController } from '../controllers/userController.js';

const router = Router();

// Rutas CRUD
router.get('/', UserController.getAllUsers); // Obtener todos los usuarios
router.get('/:id', UserController.getUserById); // Obtener un usuario por ID
router.post('/createUser', UserController.createUser); // Crear un nuevo usuario
router.put('/update/:id', UserController.updateUser); // Actualizar un usuario
router.delete('/delete/:id', UserController.deleteUser); // Eliminar un usuario

export default router;
