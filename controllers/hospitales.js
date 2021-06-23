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

const actualizarHospital = async (req, res = response) => {


    const id = req.params.id;
    const uid = req.uid;

    try {

        const hospitalDb = await Hospital.findById(id);

        if(!hospitalDb){
            return res.status(400).json({ok : false , msg : 'No existe un hospital con este id'});
        }

        const cambiosHospital = {...req.body, usuario : uid};
        const hospitalActualizado = await Hospital.findByIdAndUpdate(id , cambiosHospital, {new : true});

        res.json({ok : true , hospital : hospitalActualizado});
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ok : false , msg:'Error Inesperado'});
    }

}

const borrarHospital = async (req, res = response) => {


    const uid = req.params.id;

    try {

        const hospitalDb = await Hospital.findById(uid);

        if(!hospitalDb){
            return res.status(400).json({ok : false , msg : 'No existe un hospital con este id'});
        }

        await Hospital.findByIdAndDelete( uid);


        res.status(200).json({ok : true , msg: 'Hospital Eliminado'})
        
    } catch (error) {

        res.status(500).json({ok : false, msg : 'Error Inesperado'})
        
    }


}


module.exports = {
    getHospitales,
    crearHospital,
    actualizarHospital,
    borrarHospital
}