const Usuario = require('../models/usuario');
const Hospital = require('../models/hospital');
const Medico = require('../models/medico');
const fs = require('fs');

const borrarImagen = (path) => {

            if(fs.existsSync(path)){
                //Borrar Imagen Anterior
                fs.unlinkSync(path,(err) => {
                    console.log(err);
                })
            }
    
}

const actualizarImagen = async (tipo , id , nombreArchivo) => {

    let pathViejo = '';
    switch (tipo) {
        case 'medicos':
            const medico = await Medico.findById(id);
            if(!medico){
                return false;
            }

             pathViejo = `./uploads/medicos/${medico.imagen}`;

            borrarImagen(pathViejo);
            medico.imagen = nombreArchivo;
            medico.save();
            return true;

            break;

        case 'usuarios':
            const usuario = await Usuario.findById(id);
            if(!usuario){
                return false;
            }

            pathViejo = `./uploads/usuarios/${usuario.imagen}`;

            borrarImagen(pathViejo);
            usuario.imagen = nombreArchivo;
            usuario.save();
            return true;
            
            break;    

        case 'hospitales':
            const hospital = await Hospital.findById(id);
            if(!hospital){
                return false;
            }

             pathViejo = `./uploads/hospitales/${hospital.imagen}`;

            borrarImagen(pathViejo);
            hospital.imagen = nombreArchivo;
            hospital.save();
            return true;
            
            break;

    }

}

module.exports = {
    
    actualizarImagen
}
    
