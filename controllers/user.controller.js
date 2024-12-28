import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import {UserModel} from '../models/user.model.js'

// ruta   /api/v1/users/register
const register = async(req, res) => {
    try {
        const {username, email, password} = req.body
        console.log(req.body)

        //validacion
        if(!username || !email || !password){
            return res.status(400).json({ok: false, msg: "Missing required fields: email,password,username"})
        }

        //
        const user = await UserModel.findOnebyEmail(email)
        if(user){
            return res.status(409).json({ok: false, msg: "Email already exists"})
        }

        const salt = await bcryptjs.genSalt(10) //genera saltos para que los hash no sean iguales en caso de ser iguales pw
        const hashedPassword = await bcryptjs.hash(password, salt)

        const newUser = await UserModel.create({email, password: hashedPassword, username})

        const token = jwt.sign({
            email: newUser.email
        },
            process.env.JWT_SECRET,
            {
                expiresIn: "1h"
            }
        )

        return res.status(201).json({ok: true, msg: token})

    } catch (error) {
        // if (error.message === 'Email already exists') {
        //     return res.status(409).json({ ok: false, msg: error.message });
        // }
        
        
        console.log(error)

        return res.status(500).json({
            ok: false,
            msg: 'Error server'
        })
    }
}

// ruta   /api/v1/users/login
const login = async(req, res) => {
    try {
        const {email, password} = req.body //pedimos el email y pass

        if(!email || !password){ //validamos que exista la info solicitada
            return res
            .status(400)
            .json({ error: "Missing required fields: email,password"});
        }

        const user = await UserModel.findOnebyEmail(email) //verif que exista email
        if(!user){
            return res.status(404).json({ error: "User not found"});
        }

        const isMatch = await bcryptjs.compare(password, user.password) //comparamos contraseña

        if(!isMatch){
            return res.status(401).json({ error: "Invalid credentials"});
        }

        const token = jwt.sign({email: user.email}, //generamos token con el payload donde solo colocamos el email, ya que es publico
            process.env.JWT_SECRET,
            {
                expiresIn: "1h"
            }
        )
        return res.json({ ok: true, msg: token})

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: 'Error server'
        })
    }
}

const profile = async(req, res) => {
    try {

        const user = await UserModel.findOnebyEmail(req.email)
        return res.json({ ok: true, msg: user})

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: 'Error server'
        })
    }
}

export const UserController = {
    register,
    login,
    profile
}