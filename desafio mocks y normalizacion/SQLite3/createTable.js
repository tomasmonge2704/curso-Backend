const { options } = require('./config.js')
const knex = require('knex')(options)

// knex.schema.createTable('productos', table => {
//     table.increments('id')
//     table.string('name')
//     table.integer('precio')
//     table.string('imageURL')

// }).then( () => {
//     console.log('table cars created')
// }).catch((err) =>{
//     console.log(err)
//     throw err
// }).finally(()=>{
//     knex.destroy()
// })

knex.schema.createTable('mensajes', table => {
    table.string('date')
    table.string('author')
    table.string('text')

}).then( () => {
    console.log('table mesajes created')
}).catch((err) =>{
    console.log(err)
    throw err
}).finally(()=>{
    knex.destroy()
})
