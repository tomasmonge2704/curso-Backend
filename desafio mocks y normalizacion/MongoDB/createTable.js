const mongoose = require('mongoose');

const mensajesCollection = 'productos';

const mensajesSchema = new mongoose.Schema({
    nombre: {type:String, require:true, max:100},
    apellido: {type:String, require:true, max:100},
    email: {type:String, require:true, max:100},
   usuario: {type:String, require:true, max:100},
   id:{type:Number,require:true, max:100}
})

module.exports = mongoose.model(mensajesCollection, mensajesSchema)