const { options } = require('./config.js')
const knex = require('knex')(options);
const messages = []

knex('mensajes').select("*")
    .then((rows) => {
        for (row of rows) {
            messages.push(row)
        }
    }).catch((err) => { console.log(err); throw err })
    .finally(() => {
        console.log(messages)
        knex.destroy()
    });
