const { Schema, model } = require('mongoose');

const UsuarioSchema = new Schema({
    nombre: {
        type: 'string',
        required: true,
    },
    email: {
        type: 'string',
        required: true,
        unique: true,
    },
    password: {
        type: 'string',
        required: true,
    },
    img: {
        type: 'string',
    },
    roles: {
        type: 'string',
        required: true,
        default: 'USER_ROLE'
    },
    google: {
        type: 'boolean',
        default: false
    },
});



UsuarioSchema.method('toJSON', function() {
    const { __v, _id,password, ...object } = this.toObject();
    object.uid = _id;
    return object; // Cambia esta línea
});


module.exports = model('Usuario', UsuarioSchema);
