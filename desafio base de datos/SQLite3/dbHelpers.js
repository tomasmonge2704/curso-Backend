const { options } = require('./config.js')
const knex = require('knex')(options);

async function selectMensajes(messages){
    try{
        let rows = await knex.from('mensajes').select("*")
        for (row of rows) messages.push(row)
    }
    catch(err){
        console.log(err)
    }
    finally{
        knex.destroy()
    }
}
async function insertMensajes(mensaje){
    try{
        await knex('mensajes').insert(mensaje)
        console.log("insertado")
    }
    catch(err){
        console.log(err)
    }
    finally{
        knex.destroy()
    }
    
}


module.exports = {
    selectMensajes,
    insertMensajes
}



