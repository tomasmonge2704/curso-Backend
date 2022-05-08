const { options } = require('./config.js')
const knex = require('knex')(options);

const productos = [
    {
      name: 'Tomas ',
      precio: 21344,
      imageURL: 'https://i.blogs.es/09b647/googlefotos/1366_2000.jpg'
    }
  ]

knex('productos').insert(productos)
.then(()=> console.log("data inserted"))
.catch((err)=> { console.log(err); throw err})
.finally(() => {
    knex.destroy()
})

