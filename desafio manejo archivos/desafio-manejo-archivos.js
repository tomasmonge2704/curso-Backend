const fs = require("fs");
class Contenedor {
  constructor(nombreArchivo) {
    this.nombreArchivo = nombreArchivo;
  }

  save(producto) {
    async function escribirArchivo(nombreArchivo, producto) {
      try {
        //lee el contenido del archivo
        let contenido = await fs.promises.readFile(nombreArchivo, "utf-8");
        let Arrayproducto = [];
        //valida si el archivo esta vacio
        if (contenido === "") {
          let idVar = 0;

          producto.forEach(function (e) {
            idVar = idVar + 1;
            e.id = idVar;
            Arrayproducto.push(e);
          });
        }
        //si el archivo no esta vacio...
        else {
          contenido = JSON.parse(
            await fs.promises.readFile(nombreArchivo, "utf-8")
          );
          let idVar = contenido.length;
          Arrayproducto = contenido;
          // a cada producto le agrega un ID
          producto.forEach(function (e) {
            //valida si el producto ya tiene un ID
            if (e.id) {
            } else {
              idVar = idVar + 1;
              e.id = idVar;
            }

            //valida si el ID esta duplicado
            if (contenido.find((x) => x.id === e.id)) {
              console.log("esta duplicado");
            } else {
              Arrayproducto.push(e);
            }
          });
        }
        //reescribe el archivo con el Array de productos
        await fs.promises.writeFile(
          nombreArchivo,
          JSON.stringify(Arrayproducto)
        );
        console.log("guardado!");
        console.log(producto);
      } catch (err) {
        console.log("error de lectura!", err);
      }
    }
    escribirArchivo(this.nombreArchivo, producto);
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
    }
    leerArchivo(this.nombreArchivo);
  }
  getAll() {
    async function leerArchivo(nombreArchivo) {
      try {
        const contenido = JSON.parse(
          await fs.promises.readFile(nombreArchivo, "utf-8")
        );
        const array = [];
        contenido.forEach((e) => array.push(e));
        console.log(array);
      } catch (err) {
        console.log("error", err);
      }
    }
    leerArchivo(this.nombreArchivo);
  }
  deleteById(Id) {
    async function leerArchivo(nombreArchivo) {
      try {
        const contenido = JSON.parse(
          await fs.promises.readFile(nombreArchivo, "utf-8")
        );
        for (let i = 0; i < contenido.length; i++) {
          if (contenido[i].id === Id) {
            contenido.splice(i, 1);
          }
        }
        await fs.promises.writeFile(nombreArchivo, JSON.stringify(contenido));
        console.log(contenido);
      } catch (err) {
        console.log("error", err);
      }
    }
    leerArchivo(this.nombreArchivo);
  }
  deleteAll() {
    async function leerArchivo(nombreArchivo) {
      try {
        let contenido = JSON.parse(
          await fs.promises.readFile(nombreArchivo, "utf-8")
        );
        contenido = [];
        await fs.promises.writeFile(nombreArchivo, JSON.stringify(contenido));
        console.log(contenido);
      } catch (err) {
        console.log("error", err);
      }
    }
    leerArchivo(this.nombreArchivo);
  }
}

const Productos = new Contenedor("./prods/productos.json");
Productos.save([
  {
    title: "Escuadra",
    price: 123.45,
    thumbnail:
      "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png",
    
    },
  {
    title: "Calculadora",
    price: 234.56,
    thumbnail:
      "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png",
  },
  {
    title: "Globo Terráqueo",
    price: 345.67,
    thumbnail:
      "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png",
  },
]);
 Productos.getById(4)
 Productos.getAll()
 Productos.deleteById(2)
 Productos.deleteAll()
