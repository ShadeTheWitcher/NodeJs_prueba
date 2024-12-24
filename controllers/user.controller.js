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

        return res.status(201).json({ok: true, msg: "user ok"})

    } catch (error) {
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