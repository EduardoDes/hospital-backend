/*
   'api/hospitales' 
*/
    const {check} = require('express-validator');
    const {validarCampos} = require('../middlewares/validar-campos');
    const {Router} = require('express');
    const { getHospitales , crearHospital , actualizarHospital,borrarHospital } = require('../controllers/hospitales');
    const { validarJWT } = require('../middlewares/validar-jwt');
    
    
    const router = Router();
    
    router.get('/', getHospitales);
    
    router.post('/',
    [
      validarJWT,
      check('nombre','El nombre del Hospital es obligatorio').not().isEmpty(),
      validarCampos
    
    ] , crearHospital);
    
    router.put('/:id',[
    
    
    ],  actualizarHospital);
    
    router.delete('/:id',borrarHospital);
    
    
    module.exports = router;