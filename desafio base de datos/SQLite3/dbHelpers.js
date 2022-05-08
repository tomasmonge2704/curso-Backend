const { options } = require('./config.js')
const knex = require('knex')(options);
var hoy = new Date();
var fecha = hoy.getDate() + '-' + (hoy.getMonth() + 1) + '-' + hoy.getFullYear();
var hora = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
var fechaYHora = fecha + ' ' + hora;

async function selectMensajes(messages){
    try{
        let rows = await knex.from('mensajes').select("*")
        for (row of rows) messages.push(row)
    }
    catch(err){
        console.log(err)
    }
}
function insertMensajes(mensaje){
  knex('mensajes').insert(mensaje)
    .then(() => console.log("data inserted"))
    .catch((err) => {console.log(err); throw err})
}


module.exports = {
    selectMensajes,
    insertMensajes
}



