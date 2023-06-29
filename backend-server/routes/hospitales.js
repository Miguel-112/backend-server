// ruta: /api/hospitales




const {Router} = require('express');
const {check} = require('express-validator');

const { validarCampos} = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');


const {
    getHospital,
    crearHospital,
    atualizarHospital,
    borrarHospital   
 }= require('../controllers/hospitales')

const router = Router();


router.get('/',validarJWT, getHospital);

router.post(
    '/',[
         
        validarJWT,
        check('nombre', 'El nombre del hospital es necesario').not().isEmpty(),
        validarCampos
        ], crearHospital);

router.put('/:id',
[
    validarJWT,
    check('nombre', 'El nombre del hospital es necesario').not().isEmpty(),
    validarCampos
  


],atualizarHospital);




router.delete( '/:id',
    validarJWT,
   borrarHospital
);


module.exports = router;
