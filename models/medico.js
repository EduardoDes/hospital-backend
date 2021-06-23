const {Schema,model} = require('mongoose');

const MedicoSchema = Schema({

    nombre: {
        type : String,
        require: true
    },
    imagen: {
        type : String
    },
    usuario: {
        required : true,
        type : Schema.Types.ObjectId,
        ref: 'Usuario'
    },
    hospital: {
        required : true,
        type : Schema.Types.ObjectId,
        ref: 'Hospital'
    }
}, { collection: 'medicos'});

MedicoSchema.method('toJSON', function() {
    const {__v, ...object} = this.toObject();
    return object;
})

module.exports = model('Medico', MedicoSchema);