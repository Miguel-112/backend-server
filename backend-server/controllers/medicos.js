
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

const atualizarMedico = (req, res) =>{

    res.json({

        ok: true,
        msg:'Actualizar  Medico',

    })
}


const borrarMedico = (req, res) =>{

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