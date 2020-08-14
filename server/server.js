require('./config/config');

const mongoose = require('mongoose');
const express = require('express');
const app = express();
app.use(require('./controllers/usuario'));


// parse application/json

// respond with "hello world" when a GET request is made to the homepage

mongoose.connect(process.env.urlDB, {useNewUrlParser: true, useCreateIndex: true}, (err, res)=>{

    if(err) throw err;
    console.log('Base de Datos online')
});

app.listen(process.env.PORT, ()=>{
    console.log("Escuchando puerto", process.env.PORT)
})