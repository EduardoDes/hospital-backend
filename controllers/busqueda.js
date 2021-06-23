const {response} = require('express');
const Hospital = require('../models/hospital');
const Medico = require('../models/medico');
const Usuario = require('../models/usuario');


const buscarTodo = async  (req, res = response) => {

    const busqueda =  req.params.id;
    const regex = new RegExp( busqueda, 'i'); //Expresion Regular


    const [usuarios , hospitales , medicos] = await Promise.all([   //Resolver mas de 1 await de manera simultanea , entregar parametros en el orden de las promesas

        Usuario.find({ nombre : regex}),
        Hospital.find({ nombre : regex}),
        Medico.find({ nombre : regex})
    ])


    res.json({ok : true , usuarios, hospitales,medicos})

}

const buscarPorColeccion = async  (req, res = response) => {

    const busqueda =  req.params.id;
    const tabla =  req.params.tabla;
    const regex = new RegExp( busqueda, 'i'); //Expresion Regular

    let data = [];
    
    switch (tabla) {
        case 'medicos':
            data = await Medico.find({ nombre : regex}).populate('usuario','nombre img').populate('hospital','nombre img');
           
            break;
        
        case 'hospitales':
            data = await Hospital.find({ nombre : regex}).populate('usuario','nombre img');
            
            break;

         case 'usuarios':
            data = await Usuario.find({ nombre : regex});
            
                break;    
    
        default: return res.status(400).json({ok : false , msg:'La tabla ingresada no es valida'});

        

            
    }

    res.json({ok : true , resultados : data})

}


module.exports = {
    buscarTodo,
    buscarPorColeccion
}