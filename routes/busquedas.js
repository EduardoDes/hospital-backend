/*

api/busqueda

*/ 

const {Router} = require('express');
const { validarJWT } = require('../middlewares/validar-jwt');
const {buscarTodo,buscarPorColeccion} = require('../controllers/busqueda')


const router = Router();

router.get('/:id',[

    validarJWT

], buscarTodo);

router.get('/coleccion/:tabla/:id',[

    validarJWT

], buscarPorColeccion);




module.exports = router;