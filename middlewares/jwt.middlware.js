import jwt from 'jsonwebtoken'

export const verifyToken = (req, res, next) => {

    let token = req.headers.authorization

    if (!token){
        return res.status(401).json({ error: "Token not provided"});
    }

   token = token.split(" ")[1] //separa el texto que se envia para que solo sea el token y no la palabra "beader"

   //console.log({token})

    try {
        const {email} = jwt.verify(token, process.env.JWT_SECRET)
        req.email = email
        console.log(email)
        next()
    } catch (error) {
        console.log(error)
        return res.status(400).json({ error: "invalid token"});
    }




}