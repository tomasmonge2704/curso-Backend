
const fs = require('fs')
class Contenedor {
    constructor (nombreArchivo)
    {this.nombreArchivo = nombreArchivo}
    
    
    save(producto){
       
        
        async function escribirArchivo(nombreArchivo, producto){
            producto.id = 1
            try{
                const contenido = JSON.parse(await fs.promises.readFile(nombreArchivo, 'utf-8'))
               
                await fs.promises.appendFile(nombreArchivo, JSON.stringify(producto))
                console.log('guardado!')
            }
            catch (err){
                console.log('error de lectura!',err)
            }
        }
        escribirArchivo(this.nombreArchivo, producto)
        
       
        
    }
getById(Id){
    async function leerArchivo(nombreArchivo){
        try{
            const contenido = JSON.parse(await fs.promises.readFile(nombreArchivo, 'utf-8')) 
            const contenidoId = contenido.find(e => e.id === Id)
            if (contenidoId === undefined) {
                console.log(null)
             }
             else {
                console.log(contenidoId)
             }
            
        }
        catch (err){
            console.log('error',err)
        }
        
    }
    leerArchivo(this.nombreArchivo)
    
}
getAll(){
    async function leerArchivo(nombreArchivo){
        try{
            const contenido = JSON.parse(await fs.promises.readFile(nombreArchivo, 'utf-8')) 
            const array = []
            contenido.forEach(e => array.push(e))
           console.log(array)
            
        }
        catch (err){
            console.log('error',err)
        }
        
    }
    leerArchivo(this.nombreArchivo)
}
deleteById(Id){
    async function leerArchivo(nombreArchivo){
        try{
            const contenido = JSON.parse(await fs.promises.readFile(nombreArchivo, 'utf-8')) 
            for (let i = 0; i < contenido.length; i++) {
                if (contenido[i].id === Id) {
                    contenido.splice(i, 1);
                }
              }
            await fs.promises.writeFile(nombreArchivo, JSON.stringify(contenido))
            console.log(contenido)

        }
        catch (err){
            console.log('error',err)
        }
        
    }
    leerArchivo(this.nombreArchivo)
}
deleteAll(){
    async function leerArchivo(nombreArchivo){
        try{
            let contenido = JSON.parse(await fs.promises.readFile(nombreArchivo, 'utf-8')) 
            contenido = []
            await fs.promises.writeFile(nombreArchivo, JSON.stringify(contenido))
            console.log(contenido)

        }
        catch (err){
            console.log('error',err)
        }
        
    }
    leerArchivo(this.nombreArchivo)
}
}

 const Productos = new Contenedor("./prods/productos.json");
Productos.save([                                                                                                                                                     
    {                                                                                                                                                    
      title: 'Escuadra',                                                                                                                                 
      price: 123.45,                                                                                                                                     
      thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png',                                     
      id: 1                                                                                                                                              
    },                                                                                                                                                   
    {                                                                                                                                                    
      title: 'Calculadora',                                                                                                                              
      price: 234.56,                                                                                                                                     
      thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png',                                          
      id: 2                                                                                                                                              
    },                                                                                                                                                   
    {                                                                                                                                                    
      title: 'Globo Terráqueo',                                                                                                                          
      price: 345.67,                                                                                                                                     
      thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png',                                   
      id: 3                                                                                                                                              
    }                                                                                                                                                    
  ]    
)
// Productos.getById(4)
// Productos.getAll()
// Productos.deleteById(2)
// Productos.deleteAll()