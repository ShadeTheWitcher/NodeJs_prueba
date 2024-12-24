import 'dotenv/config'
import express from 'express';
import userRouter from './routes/user.route.js'
const app = express();

//middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true}))

//ruta
app.use('/api/v1/users', userRouter)

const PORT = process.env.PORT || 3000;

app.listen(PORT, ()  => console.log('Server on port ' + PORT) )












// const http = require("http");
// const fs = require("fs");

// const server = http.createServer((req, res) => {
//   fs.createReadStream("./static/index.html");
//   read.pipe(res);
// });

// server.listen(3000);
// console.log("Server on port ${3000}");


//express

// const express = require('express')

// const app = express()

// app.get('/', (req, res) => {
//     res.sendFile('./static/index.html', {
//         root: __dirname
//     })
// })

//ejemplos de rutas simples

// app.get('/', (req, res) =>{
//     res.send('hello world')
// })

// app.use((req, res) => {
//     res.status(404).send('No se encontro tu pagina')
// })

