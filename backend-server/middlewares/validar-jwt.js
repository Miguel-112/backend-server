
const jwt = require('jsonwebtoken');

const Usuario=require('../models/usuario');

const validarJWT= (req,res,next)=> {

    // Leer el token

    const token = req.header('x-token');
   
    if(!token){

        return res.status(401).json({
             
            ok:false,
            msg:'No hay token en la petició'
        });
    }

    try {

        const {uid}=jwt.verify(token,process.env.JWT_SECRET);

        req.uid=uid;
         
        next();

        
    } catch (error) {

        return res.status(401).json({
             
            ok:false,
            msg:'Token no valido'
        });
        
    }




}

const validarADMIN_ROLE= async (req,res, next) => {
   
    const uid = req.uid;

    try{

        const usuarioDB = await Usuario.findById(uid);

        if(!usuarioDB){
            return res.status(404).json({
                ok:false,
                msg:'el usuario no existe'
            })
        }
        if(usuarioDB.roles !== 'ADMIN_ROLE'){
            return res.status(404).json({
                ok:false,
                msg:'no cuenta con los privilegios para hacer eso'
            })
        }

        next();
    }catch(error){
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Hable con el administrador'
        })
    }



}




const validarADMIN_ROLE_o_MismoUsuario= async (req,res, next) => {
   
    const uid = req.uid;
    const id= req.param.id;

    try{

        const usuarioDB = await Usuario.findById(uid);

        if(!usuarioDB){
            return res.status(404).json({
                ok:false,
                msg:'el usuario no existe'
            })
        }
        if(usuarioDB.roles 
            === 'ADMIN_ROLE' || uid === id){
            next();
        }

        next();
    }catch(error){
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Hable con el administrador'
        })
    }



}



module.exports ={
    validarJWT,
    validarADMIN_ROLE,
    validarADMIN_ROLE_o_MismoUsuario
}