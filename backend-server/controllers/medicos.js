
const {response} = require('express');
const Medico = require('../models/medico');
const getMedico = async (req, res) =>{

    const medicos = await Medico.find()
    .populate('usuario','nombre img')
    .populate('hospital','nombre img');

    res.json({

        ok: true,
        medicos 

    })
}

const crearMedico = async (req, res = response) => {

    const uid = req.uid;
    const medico = new Medico({
        usuario: uid,
        ...req.body
    });


    try {

        const medicoDB = await medico.save();

        
        res.json({
            ok: true,
            medico: medicoDB
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }


}

const atualizarMedico = async (req, res) =>{

      
    const id  = req.params.id;
    const uid = req.uid;

    try {
        
        const medicos = await Medico.findById( id );

        if (!medicos) {
            return res.status(404).json({
                ok: true,
                msg: 'el medico no encontrado por id',
            });
        }

        const cambiosMedicos = {
            ...req.body,
            usuario: uid
        }

        const MedicosActualizado = await Medico.findByIdAndUpdate( id,  cambiosMedicos, { new: true } );


        res.json({
            ok: true,
            medicos: MedicosActualizado
        })

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

    // res.json({

    //     ok: true,
    //     msg:'Actualizar  Medico',

    // })
}


const borrarMedico = async (req, res) =>{

    const id = req.params.id;

    try {
     
      const MedicoDB = await Medico.findById(id);
  
      if(!MedicoDB){
  
        return res.status(404).json({
          ok:true,
          msg: 'No existe un usuario por ese id'
      });
  
      }
  
      await Medico.findByIdAndDelete(id);
  
      return res.status(200).json({
        ok:true,
        uid: 'Medico eliminado',
    });
  
  
      
    } catch (error) {
      console.error(error);
  
      res.status(500).json({
        ok:false,
        msg:'hable con el admnistrado'
    });
      
    }
    res.json({

        ok: true,
        msg:'Borrar Medicos',

    })
}





module.exports ={
  getMedico,
  crearMedico,
  atualizarMedico,
  borrarMedico
}