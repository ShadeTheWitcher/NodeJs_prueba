import { Router } from "express"
import { UserController } from "../controllers/user.controller.js";
import { verifyToken } from "../middlewares/jwt.middlware.js";

const router = Router()

router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.get('/profile', verifyToken , UserController.profile) //ruta protegida por token

//router.get('/usuarios', UserController.login)

export default router;