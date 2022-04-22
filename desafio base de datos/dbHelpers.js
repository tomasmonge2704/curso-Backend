const { options } = require('./mariaDB.js')
const knex = require('knex')(options);

async function selectProductos(productos){
    knex.from('productos').select("*")
    .then((rows) => {
        for (row of rows) {
            productos.push(row)
        }
    }).catch((err) => { console.log(err); throw err })
    .finally(() => {
        knex.destroy()
    });
}
async function insertProducto(producto){
    knex('productos').insert(producto)
    .then(()=> console.log("data inserted:",producto)
    )
    .catch((err)=> { console.log(err); throw err})
}


module.exports = {
    selectProductos,
    insertProducto
}

