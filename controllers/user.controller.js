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
    login
}