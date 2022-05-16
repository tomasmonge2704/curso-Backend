const mongoose = require('mongoose');

const mensajesCollection = 'mensajes';
const MensajesSchema = new mongoose.Schema({
    author:{
        id:{type:String, require:true, max:100},
        nombre:{type:String, require:true, max:100},
        apellido:{type:String, require:true, max:100},
        edad:{type:Number,require:true, max:100},
        alias:{type:String, require:true, max:100},
        avatar:{type:String, require:true, max:100}
    },
    text:{type:String, require:true, max:100},
    date:{type:String, require:true, max:100}
})

module.exports = mensajes = mongoose.model(mensajesCollection, MensajesSchema)