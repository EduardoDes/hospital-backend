const {response} = require('express');
const bcryptjs = require('bcryptjs');
const {generarJWT} = require('../helpers/jwt');
const Medico = require('../models/medico');
const Hospital = require('../models/hospital');

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

const actualizarMedico = async (req, res = response) => {


    const id = req.params.id;
    const uid = req.uid;

    try {

        const medicoDb = await Medico.findById(id);

        if(!medicoDb){
            return res.status(400).json({ok : false , msg : 'No existe un medico con este id'});
        }

        const hospitalExiste = await Hospital.findById(req.body.hospital);

        if(!hospitalExiste){
            return res.status(400).json({ok : false , msg : 'No existe un hospital con este id'});
        }

        const cambiosMedico = {...req.body, usuario : uid};

        const medicoActualizado = await Medico.findByIdAndUpdate(id , cambiosMedico, {new : true});

        res.json({ok : true , medico : medicoActualizado});
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ok : false , msg:'Error Inesperado'});
    }

}

const borrarMedico =  async (req, res = response) => {


    const uid = req.params.id;

    try {

        const medicoDb = await Medico.findById(uid);

        if(!medicoDb){
            return res.status(400).json({ok : false , msg : 'No existe un medico con este id'});
        }

        await Medico.findByIdAndDelete( uid);


        res.status(200).json({ok : true , msg: 'Medico Eliminado'})
        
    } catch (error) {

        res.status(500).json({ok : false, msg : 'Error Inesperado'})
        
    }

}


module.exports = {
    getMedicos,
    crearMedico,
    actualizarMedico,
    borrarMedico
}