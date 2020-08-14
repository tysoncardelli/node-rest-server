//=========Port=========
process.env.PORT = process.env.PORT || 3000;
//=========Entorno=========
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';
//=========Base de datos=========
let urlDB;
if(process.env.NODE_ENV == 'dev'){
    urlDB = 'mongodb://localhost:27017/cafe'
} else {
    urlDB= 'mongodb+srv://admin:bGO1cqhMxDO3Cwxd@cluster0.w7jkk.mongodb.net/cafe'
}


process.env.urlDB = urlDB;