const { options } = require('./config.js')
const knex = require('knex')(options);

var hoy = new Date();
var fecha = hoy.getDate() + '-' + (hoy.getMonth() + 1) + '-' + hoy.getFullYear();
var hora = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
var fechaYHora = fecha + ' ' + hora;

const mensajes = 
[
    { author: "Juan", text: "¡Hola! ¿Que tal?", date: fechaYHora },
    { author: "Pedro", text: "¡Muy bien! ¿Y vos?", date: fechaYHora },
    { author: "Ana", text: "¡Genial!", date: fechaYHora }
]

knex('mensajes').insert(mensajes)
.then(()=> console.log("data inserted"))
.catch((err)=> { console.log(err); throw err})
.finally(() => {
    knex.destroy()
})
