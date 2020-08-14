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

    let desde = req.query.desde || 0;
    desde = Number(desde);
    let limite = req.query.limite || 5;
    limite = Number(limite);

    Usuario.find({estado: true}, 'nombre email role estado google img')
           .skip(desde)
           .limit(limite)
           .exec((err,usuarios)=>{
            if(err){
                return res.status(400).json({
                    ok: false,
                    err
                })
            }
            Usuario.count({estado: true}, (err, count)=> {
                res.json({
                    ok: true,
                    usuarios: usuarios,
                    conteo:count
                })
        
            })
            

           });
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
        
      //let body = req.body;
      let body = _.pick(req.body, ['nombre','email','img','rol','estado']);

      Usuario.findByIdAndUpdate(id, body, {new: true} ,(err, usuarioDB)=>{
        
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
  
  app.delete('/usuario/:id', function(req, res) {
      
    let id = req.params.id;
    
    Usuario.findByIdAndRemove(id,(err,usuarioBorrado)=>{
        if(err){
            return res.status(400).json({
                ok: false,
                err
            });
        };
        if(usuarioBorrado == null){
            return res.status(400).json({
                ok: false,
                error: {
                    message: "usuario no encontrado"
                }
            });
        }
        res.json({
            ok: true,
            usuario: usuarioBorrado
        })
    })


  });
  
  module.exports = app;