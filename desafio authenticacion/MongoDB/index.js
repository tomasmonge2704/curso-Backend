const mongoose = require('mongoose');
const model = require('./models/mensajes')


async function readMensajes(mensajes) {
  try {
    const URL =
      "mongodb+srv://tomas2:1roZJIVtj5JnG5HH@cluster0.nmb6c.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
    let rta = await mongoose.connect(URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("base de datos conectada");
    rows = await model.find({})
    for (row of rows) mensajes.mensajes.push(row)

  } catch (error) {
    console.log(`Error en CRUD: ${error}`);
  }
}

async function createMensajes(mensaje) {
  try {
    const URL =
      "mongodb+srv://tomas2:1roZJIVtj5JnG5HH@cluster0.nmb6c.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
    let rta = await mongoose.connect(URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("base de datos conectada");
    const MensajeSaveModel = new model(mensaje)
    let mensajeSave = await MensajeSaveModel.save()
    console.log(mensajeSave)
  } catch (error) {
    console.log(`Error en CRUD: ${error}`);
  }
}

module.exports = {
  readMensajes, createMensajes
}