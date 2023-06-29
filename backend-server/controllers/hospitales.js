
const {response, request} = require('express');

const Hospital = require('../models/hospital');

const getHospital = async(req, res) =>{


    const hospitales = await Hospital.find()
                                 .populate('usuario','nombre img');
                                 

    res.json({

        ok: true,
        hospitales

    })
}

const crearHospital = async(req, res = response) => {

    const uid = req.uid;
    const hospital = new Hospital({ 
        usuario: uid,
        ...req.body 
    });

    try {
        
        const hospitalDB = await hospital.save();
        

        res.json({
            ok: true,
            hospital: hospitalDB
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
    


}
const atualizarHospital = async (req, res) =>{


    
    const id  = req.params.id;
    const uid = req.uid;

    try {
        
        const hospital = await Hospital.findById( id );

        if ( !hospital ) {
            return res.status(404).json({
                ok: true,
                msg: 'Hospital no encontrado por id',
            });
        }

        const cambiosHospital = {
            ...req.body,
            usuario: uid
        }

        const hospitalActualizado = await Hospital.findByIdAndUpdate( id, cambiosHospital, { new: true } );


        res.json({
            ok: true,
            hospital: hospitalActualizado
        })

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}



const borrarHospital = async (req, res) =>{

    const id = req.params.id;

    try {
     
      const HospitalDB = await Hospital.findById(id);
  
      if(! HospitalDB){
  
        return res.status(404).json({
          ok:true,
          msg: 'No existe hospital por ese id'
      });
  
      }
  
      await Hospital.findByIdAndDelete(id);
  
      return res.status(200).json({
        ok:true,
        uid: 'Hospital eliminado',
    });
  
  
      
    } catch (error) {
      console.error(error);
  
      res.status(500).json({
        ok:false,
        msg:'hable con el admnistrado'
    });
      
    }
  

  
}





module.exports ={
   getHospital,
   crearHospital,
   atualizarHospital,
   borrarHospital

   
    
    
}



