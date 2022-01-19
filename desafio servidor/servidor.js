
const express = require('express')

const app = express()
const PORT = 8080

const fs = require("fs");
function getRandomArbitrary(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}


const server = app.listen(PORT, () => {
  console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
})
server.on("error", error => console.log(`Error en servidor ${error}`))
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
        app.get('/productoRandom', (req, res) => {
          res.send( `Producto: ${contenidoId.title}`)
         })
      } catch (err) {
        console.log("error", err);
      }
      
    }
    leerArchivo(this.nombreArchivo);
    
  }
  getAll() {
    let array = [];
    async function leerArchivo(nombreArchivo) {
      
      try {
        const contenido = JSON.parse(
          await fs.promises.readFile(nombreArchivo, "utf-8")
        );
        
        contenido.forEach((e) => array.push(e));
        
        app.get('/productos', (req, res) => {
           res.send(array.map( prod => `Producto${prod.id}: ${prod.title}`))

         })
      } catch (err) {
        console.log("error", err);
      }
     
      
    }
    
   leerArchivo(this.nombreArchivo);
   
   
  }

  
  
}


app.get('/', (req, res) => {
  res.send('hola Bienvenido!' )
})



 const Productos = new Contenedor("./productos.txt");
 Productos.getAll()
 Productos.getById(getRandomArbitrary(1,3))