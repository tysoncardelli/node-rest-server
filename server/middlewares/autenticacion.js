const jwt = require('jsonwebtoken');
//============= Verificar Token 

let verificaToken=(req,res,next)=>{

    let token = req.get('Authorization');
    jwt.verify(token,process.env.SEED, (err, decoded)=>{
        if(err){
            return res.status(401).json({
                ok:false,
                err
            });
        }
        req.usuario = decoded.usuario;
        next();

    })
    console.log(token)
   
}

let verifyAdminRol=(req,res,next)=>{


    let usuario = req.usuario
    if (usuario.role == 'ADMIN_ROLE'){
        next();
    }
    else{
        return res.status(401).json({
            ok:false,
            err: {
                message: 'El usuario no es administrador'
            }
          
        });
    }
   
    console.log(token)
   
}
module.exports ={
    verificaToken,
    verifyAdminRol
}