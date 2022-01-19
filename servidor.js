
const express = require('express')

const app = express()
const PORT = 8080

const fs = require("fs");

class Contenedor {
  constructor(nombreArchivo) {
    this.nombreArchivo = nombreArchivo;
  }
  getById(Id) {
    async function leerArchivo(nombreArchivo) {
      try {
        const contenido = JSON.parse(
          await fs.promises.readFile(nombreArchivo, "utf-8")
        );
        const contenidoId = contenido.find((e) => e.id === Id);
        if (contenidoId === undefined) {
          console.log(null);
        } else {
          console.log(contenidoId);
        }
        
      } catch (err) {
        console.log("error", err);
      }
      return contenidoId
    }
    leerArchivo(this.nombreArchivo);
    
  }
  getAll() {
    
    async function leerArchivo(nombreArchivo) {
      let array = [];
      try {
        const contenido = JSON.parse(
          await fs.promises.readFile(nombreArchivo, "utf-8")
        );
        
        contenido.forEach((e) => array.push(e));
        
      } catch (err) {
        console.log("error", err);
      }
      
      return array
    }
    
   leerArchivo(this.nombreArchivo);
    
    
  }
  
  
}

function getRandomArbitrary(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
const Productos = new Contenedor("./productos.json");

const server = app.listen(PORT, () => {
  console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
})
server.on("error", error => console.log(`Error en servidor ${error}`))
app.get('/', (req, res) => {
  res.send('hola Bienvenido!' )
})
app.get('/productos', (req, res) => {
 res.send( `Productos: ${Productos.getAll()}`)
})
app.get('/productoRandom', (req, res) => {
  res.send( `Producto: ${Productos.getById(getRandomArbitrary(1,3))}`)
 })