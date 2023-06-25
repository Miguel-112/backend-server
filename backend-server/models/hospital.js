const { Schema, model } = require('mongoose');

const HospitalSchema = new Schema({
    nombre: {
        type: 'string',
        required: true,
    },
  
    img: {
        type: 'string',
    },

    usuario:{
        required: true,
        type:Schema.Types.ObjectId,
        ref:'Usuario'
    }
    
}, {collection:'hospitales'});



HospitalSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();
    
    return object; // Cambia esta línea
});


module.exports = model('Hospital', HospitalSchema);
