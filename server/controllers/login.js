const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');
const bodyParser =  require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }))




app.post('/login', (req,res)=>{

    let body = req.body;
    console.log(body);
    Usuario.findOne({email: body.email},(err,usuarioDB)=>{
        if(err){
            return res.status(500).json({
                ok: false,
                err
            })
        }
        if(!usuarioDB){
            return res.status(400).json({
                ok: false,
                message: '(Usuario) o contranha incorrectos'
            })
        }

        if(!bcrypt.compareSync(body.password, usuarioDB.password)){
            return res.status(400).json({
                ok: false,
                message: 'Usuario o (contranha) incorrectos'
            })
        }

        let token = jwt.sign({
            usuario: usuarioDB
        },process.env.SEED, { expiresIn: process.env.CADUCIDAD_TOKEN });

        res.json({
            ok: true,
            Usuario: usuarioDB,
            token
        })

    });

});






  
module.exports = app;