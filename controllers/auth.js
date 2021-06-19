const { response} = require('express');
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');
const {generarJWT} = require('../helpers/jwt');


const login = async (req, res = response) => {

    const { email , password } = req.body;

    try {


        const usuarioDb = await Usuario.findOne({email});

        if(!usuarioDb){
            res.status(404).json({ ok : false , msg : 'Email no encontrado'})
        }

        const validPassword = bcryptjs.compareSync(password , usuarioDb.password);

        if(!validPassword){
            res.status(404).json({ ok : false , msg : 'Contraseña no valida'})
        }

        const token = await generarJWT(usuarioDb.id);



        res.status(200).json({ ok: true , token})
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ ok: false , msg : 'Error Inesperado'})
    }


  

}

module.exports = {
    login
}