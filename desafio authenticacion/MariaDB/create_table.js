const { options } = require('./config.js')
const knex = require('knex')(options);

knex.schema.createTable('productos', table => {
    table.increments('id')
    table.string('name')
    table.integer('precio')
    table.string('imageURL')
})
    .then(()=> console.log("table created"))
    .catch((err) => {console.log(err); throw err })
    .finally(()=> {
        knex.destroy()
    })