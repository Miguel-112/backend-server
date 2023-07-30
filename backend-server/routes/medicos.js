// ruta: /api/medico

const {Router} = require('express');
const {check} = require('express-validator');

const { validarCampos} = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');


const {
    getMedico,
    crearMedico,
    atualizarMedico,
    borrarMedico,
    getMedicoById
  }= require('../controllers/medicos')

const router = Router();


router.get('/', getMedico);

router.post(
    '/',[
      validarJWT,
      check('nombre', 'El nombre del medico es necesario').not().isEmpty(),
      check('hospital', 'Elhospital id debe ser valido').isMongoId(),
      validarCampos
        

        ], crearMedico);

router.put('/:id',
[
  
  


],atualizarMedico);




router.delete( '/:id',
   validarJWT,
   borrarMedico
);


router.get( '/:id',
   validarJWT,
   getMedicoById
);



module.exports = router;
