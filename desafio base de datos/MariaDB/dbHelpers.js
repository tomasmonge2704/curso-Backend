const { options } = require('./config.js')
const knex = require('knex')(options);

async function selectProductos(productos){
    try{
        let rows = await knex.from('productos').select("*")
        for (row of rows) productos.push(row)
    }
    catch(err){
        console.log(err)
    }
}
function insertProducto(producto){
    knex('productos').insert(producto)
    .then(() => console.log("data inserted"))
    .catch((err) => {console.log(err); throw err})
}


module.exports = {
    selectProductos,
    insertProducto
}

