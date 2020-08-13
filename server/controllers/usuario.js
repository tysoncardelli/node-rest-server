const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const _ =require('underscore');
const bodyParser =  require('body-parser');
app.use(bodyParser.json())
const Usuario = require('../models/usuario')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 

app.get('/usuario', function(req, res) {
    res.json('get usuario');
  });
  
app.post('/usuario', function(req, res) {
    let body = req.body;

    let usuario = new Usuario( {
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password,10),
        role: body.role
    });


    usuario.save((err, usuarioDB)=>{
        if(err){
            return res.status(400).json({
                ok: false,
                err
            })
        }

        usuarioDB.password = null;
        res.json({
            ok: true,
            usuario: usuarioDB
        })
    })

});
  
  app.put('/usuario/:id', function(req, res) {
      let id = req.params.id;
      //let body = _.pick(req.body, ['nombre','email','img','rol','estado']);
        let body = req.body;

      Usuario.findByIdAndUpdate(id, body, {new: true, runValidators:true } ,(err, usuarioDB)=>{
        
        if(err){
            return res.status(400).json({
                ok: false,
                err
            })
        }

        res.json({
            ok:true,
            usuario: usuarioDB
        });
      })

      
  });
  
  app.delete('/usuario', function(req, res) {
      res.json('delete usuario');
  });
  
  module.exports = app;