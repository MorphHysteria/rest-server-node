const {Schema, model} = require('mongoose');

// Estructura del documento usuario
const usuarioSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    correo: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria']
    },
    img: {
        type: String
    },
    rol: {
        type: String,
        required: true,
        enum: ['ADMIN_ROLE', 'USER_ROLE']
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
});

// Sobreescribir método de mongoose
usuarioSchema.methods.toJSON = function(){
    // Extraer la versión y la contraseña del objeto que se retorna como respuesta
    const {__v, password, ...usuario} = this.toObject();
    return usuario;
};

module.exports = model('Usuario', usuarioSchema);