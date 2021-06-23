const { response} = require('express');
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');
const {generarJWT} = require('../helpers/jwt');
const {googleVerify} = require('../helpers/google-verify');

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

const googleSignIn = async(req, res = response) => {

    
    const googleToken = req.body.token;

    try {

      const {name , email , picture} = await googleVerify(googleToken);

      const usuarioDb = await Usuario.findOne({email});
      let usuario;

      if(!usuarioDb){
          usuario = new Usuario({
              nombre : name,
              email,
              password: '@@@',
              imagen : picture,
              google : true
          })
      }else{
          usuario = usuarioDb;
          usuario.google = true;
      }

      await usuario.save();
      const token = await generarJWT(usuarioDb.id);

      res.json({ ok: true , token})
        
    } catch (error) {
        res.status(401).json({ ok: false , msg: 'Token Incorrecto'})
    }

}

const renewToken = async (req , res = response) => {

    const uid = req.uid;

    const token = await generarJWT(uid);

    res.json({ok : true, token})
}

module.exports = {
    login,
    googleSignIn,
    renewToken
}