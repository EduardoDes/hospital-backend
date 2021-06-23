const { response } = require("express");
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const {actualizarImagen} = require('../helpers/actualizar-imagen');
const fs = require('fs');

const fileUpload = (req , res = response) => {

    const tipo = req.params.tipo;
    const id = req.params.id;

    const tiposValidos = ['hospitales','medicos','usuarios'];

    if(!tiposValidos.includes(tipo)){
        return res.status(400).json({status : false , msg: 'Tipo no es valido'});
        
    }

    if(!req.files || Object.keys(req.files).length === 0){
        return res.status(400).json({status : false , msg: 'No se envio archivo'});
    }

    const file = req.files.imagen;

    const splitName = file.name.split('.');
    const extension = splitName[splitName.length -1];

    const extensionesValidas = ['png','jpg','jpeg','gif'];
    if(! extensionesValidas.includes(extension)){
        return res.status(400).json({status : false , msg: 'Extension Invalida'});
    }

    const nombreArchivo = `${ uuidv4() }.${extension}`;

    const path = `./uploads/${tipo}/${nombreArchivo}`;

    file.mv(path , ( error) => {
        if(error){
            return res.status(500).json({ status : false , msg : 'Ocurrio un error al subir archivo'});
        }

        actualizarImagen(tipo , id, nombreArchivo);

        res.json({ ok:true , msg : 'Archivo Subido', nombreArchivo});
        
    })


}

const retornaImagen = (req , res = response) => {

    const tipo = req.params.tipo;
    const imagen = req.params.imagen;
    const pathImagen = path.join( __dirname,`../uploads/${tipo}/${imagen}`);

    //Defaul Img

    if(fs.existsSync(pathImagen)){
        res.sendFile(pathImagen);
    }else{
        console.log('Entra aca');
        const pathImagen = path.join( __dirname,`../uploads/no-img.jpg`);
        res.sendFile(pathImagen);

    }



    
}

module.exports = {
    fileUpload,
    retornaImagen
};