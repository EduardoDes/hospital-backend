const {response} = require('express');
const bcryptjs = require('bcryptjs');
const {generarJWT} = require('../helpers/jwt');
const Usuario = require('../models/usuario');


const getUsuarios = async (req, res) => {


    const usuarios = await Usuario.find({},'nombre rol email google');

    res.json({ok : true , usuarios, uid: req.uid})

}

const crearUsuario = async(req, res = response) => {

    const {email , password} = req.body;

    try {

    const emailExists = await Usuario.findOne({email});
    
    if(emailExists){
        return res.status(400).json({ok:false ,msg:'El correo ya esta registrado'});
    }

    const usuario = new Usuario(req.body);

    //Encriptar Contraseña

    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password,salt);



    await usuario.save();

    const token = await generarJWT(usuario.id);

    res.json({ok : true , usuario, token});
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ok : false, msg:'Error Inesperado'});
    }


}

const actualizarUsuario = async (req, res = response) => {
    
    const uid = req.params.id;

    try {

        const usuarioDb = await Usuario.findById(uid);

        if(!usuarioDb){
            return res.status(400).json({ok : false , msg : 'No existe un usuario con este id'});
        }

        const { password , google , email ,...campos} = req.body;

        if(usuarioDb.email != req.body.email){

            const existeEmail = await Usuario.findOne({email })
            if(existeEmail){
                res.status(400).json({ ok : false , msg : 'Ya existe un usuario con ese email' })
            }
        }

        campos.email = email;

        const usuarioActualizado = await Usuario.findByIdAndUpdate(uid,campos, {new : true});


        res.json({ ok : true ,usuario : usuarioActualizado});
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ok : false , msg:'Error Inesperado'});
    }
}

const eliminarUsuario = async (req , res = response) => {

    const uid = req.params.id;

    try {

        const usuarioDb = await Usuario.findById(uid);

        if(!usuarioDb){
            return res.status(400).json({ok : false , msg : 'No existe un usuario con este id'});
        }

        await Usuario.findByIdAndDelete( uid);


        res.status(200).json({ok : true , msg: 'Usuario Eliminado'})
        
    } catch (error) {

        res.status(500).json({ok : false, msg : 'Error Inesperado'})
        
    }

    

}

module.exports = {
    getUsuarios,
    crearUsuario,
    actualizarUsuario,
    eliminarUsuario
}