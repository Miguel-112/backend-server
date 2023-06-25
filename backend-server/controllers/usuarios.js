
const {response} = require('express');

const bcrypt = require('bcryptjs');

const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');
const getUsuarios = async (req, res)=>{

  const desde = Number(req.query.desde) || 0;
  
  const [usuarios, total]=  await Promise.all([
     
      Usuario.find({},'nombre email roles google img')
      .skip(desde)
      .limit(5),
      Usuario.countDocuments()

    ]);


    res.json({
        ok:true,
        usuarios,
        total,
        //uid:req.uid, //recuperamos el id del usuario que hace la peticion , lo traemos desde el midelware validar-jwt
    });

}


const crearUsuarios = async (req, res = response)=>{

    const {email,password} = req.body;

  try {

    const existeEmail = await Usuario.findOne({email});

    if(existeEmail){
       return res.status(500).json({
            ok:false,
            msg:'El correo ya existe.'
        });
    }
      const usuario = new Usuario(req.body);
       // encriptar contraseñas
      const salt = bcrypt.genSaltSync(10);
        usuario.password = bcrypt.hashSync(usuario.password, salt);

        

      // guardar usuario
        await usuario.save();
        //  generar el TOKEN = JWT
        const token = await generarJWT( usuario.id );
      res.json({
          ok:true,
         usuarios:[{
          id:123,
          usuario,
          token
         }]
    
      })
  } catch (error) {
    console.error(error);
    
    res.status(500).json({
        ok:false,
        msg:'Error inesperado revisar log'
    });
  }

}

const actualizarUsuario = async (req, res = response) => {

  // TODO: Validar token y comprobar si es el usuario correcto

  const uid = req.params.id;

  try {

      const usuarioDB = await Usuario.findById( uid );

      if ( !usuarioDB ) {
          return res.status(404).json({
              ok: false,
              msg: 'No existe un usuario por ese id'
          });
      }

      // Actualizaciones
      const { password, google, email, ...campos } = req.body;

      if ( usuarioDB.email !== email ) {

          const existeEmail = await Usuario.findOne({ email });
          if ( existeEmail ) {
              return res.status(400).json({
                  ok: false,
                  msg: 'Ya existe un usuario con ese email'
              });
          }
      }
      
      campos.email = email;
      const usuarioActualizado = await Usuario.findByIdAndUpdate( uid, campos, { new: true } );

      res.json({
          ok: true,
          usuario: usuarioActualizado
      });

      
  } catch (error) {
      console.log(error);
      res.status(500).json({
          ok: false,
          msg: 'Error inesperado'
      })
  }

}

const  borrarUsuario = async (req, res = response)=>{
 
  const uid = req.params.id;

  try {
   
    const usuarioDB = await Usuario.findById(uid);

    if(!usuarioDB){

      return res.status(404).json({
        ok:true,
        msg: 'No existe un usuario por ese id'
    });

    }

    await Usuario.findByIdAndDelete(uid);

    return res.status(200).json({
      ok:true,
      uid: 'usuario eliminado',
  });


    
  } catch (error) {
    console.error(error);

    res.status(500).json({
      ok:false,
      msg:'hable con el admnistrado'
  });
    
  }

}

module.exports = {
    getUsuarios,
    crearUsuarios,
    actualizarUsuario,
    borrarUsuario,
}