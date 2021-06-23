const {response} = require('express');
const bcryptjs = require('bcryptjs');
const {generarJWT} = require('../helpers/jwt');
const Medico = require('../models/medico');


const getMedicos = async  (req, res = response) => {


    const medicos = await Medico.find().populate('hospital','nombre imagen')
                                       .populate('usuario','nombre imagen') 

    res.json({ok : true , medicos})

}

const crearMedico = async (req, res = response) => {


    const uid = req.uid;
    const medico = new Medico({usuario : uid ,...req.body});
    

    try {

        const createdMedico = await medico.save();

        res.json({ok : true , medico : createdMedico})
        
    } catch (error) {

        res.status(500).json({ok : false , mgs : 'Ocurrio un error inesperado'})
    }

}

const actualizarMedico =  (req, res = response) => {


    res.json({ok : true , mgs : 'actualizarMedico'})

}

const borrarMedico =  (req, res = response) => {


    res.json({ok : true , mgs : 'borrarMedico'})

}


module.exports = {
    getMedicos,
    crearMedico,
    actualizarMedico,
    borrarMedico
}