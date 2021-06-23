const {response} = require('express');
const bcryptjs = require('bcryptjs');
const {generarJWT} = require('../helpers/jwt');
const Hospital = require('../models/hospital');


const getHospitales = async  (req, res = response) => {


    const hospitales = await Hospital.find().populate('usuario','nombre img');

    res.json({ok : true , hospitales})

}

const crearHospital = async (req, res = response) => {

    const uid = req.uid;
    const hospital = new Hospital({usuario : uid ,...req.body});
    

    try {

        const createdHospital = await hospital.save();

        res.json({ok : true , hospital : createdHospital})
        
    } catch (error) {

        res.status(500).json({ok : false , mgs : 'Ocurrio un error inesperado'})
    }

    

}

const actualizarHospital =  (req, res = response) => {


    res.json({ok : true , mgs : 'actualizarHospital'})

}

const borrarHospital =  (req, res = response) => {


    res.json({ok : true , mgs : 'borrarHospital'})

}


module.exports = {
    getHospitales,
    crearHospital,
    actualizarHospital,
    borrarHospital
}