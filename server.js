const express = require("express");
const { Router } = express;
const app = express();
const fs = require("fs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
var hoy = new Date();
var fecha =
  hoy.getDate() + "-" + (hoy.getMonth() + 1) + "-" + hoy.getFullYear();
var hora = hoy.getHours() + ":" + hoy.getMinutes() + ":" + hoy.getSeconds();
var fechaYHora = fecha + " " + hora;
const routerProductos = Router();
const routerCarrito = Router();
app.use("/api/productos", routerProductos);
app.use("/api/carrito", routerCarrito)

//rutas Productos
routerProductos.get("/", (req, res) => {
  
  async function leerArchivo() {
    try {
      const contenido = JSON.parse(
        await fs.promises.readFile("./productos.json", "utf-8")
      );
      res.status(200).send({ products: contenido });
    } catch (err) {
      console.log("error", err);
    }
  }
  leerArchivo();
  
});
routerProductos.get("/:id", (req, res) => {
  async function leerArchivo() {
    try {
      const contenido = JSON.parse(
        await fs.promises.readFile("./productos.json", "utf-8")
      );
      let contenidoId = contenido.find((e) => e.id == req.params.id);
      if (contenidoId === undefined) {
        contenidoId = null;
      } else {
        console.log(contenidoId);
      }

      res.status(200).send({ producto: contenidoId });
    } catch (err) {
      console.log("error", err);
    }
  }

  leerArchivo();
});
routerProductos.post("/", (req, res) => {
  producto = req.body;

  async function escribirArchivo() {
    try {
      //lee el contenido del archivo
      let contenido = JSON.parse(
        await fs.promises.readFile("./productos.json", "utf-8")
      );
      //le asigna un iD en base al contenido
      producto.id = contenido.length + 1;
      producto.timestamp = fechaYHora;
      contenido.push(producto);
      res
        .status(200)
        .send({ message: "el producto se ha recibido", producto: producto });
      //sobreescribe el archivo
      await fs.promises.writeFile(
        "./productos.json",
        JSON.stringify(contenido)
      );
    } catch (err) {
      console.log("error de lectura!", err);
    }
  }
  escribirArchivo();
});

routerProductos.put("/:id", (req, res) => {
  producto = req.body;
  async function leerArchivo() {
    try {
      //lee el archivo json
      let contenido = JSON.parse(
        await fs.promises.readFile("./productos.json", "utf-8")
      );
      //encuentra el producto por su Id
      let contenidoId = contenido.find((e) => e.id == req.params.id);
      if (contenidoId === undefined) {
        console.log("no se ha encontrado ese ID");
        contenidoId = null;
      }
      //le asigna el mismo Id que tenia el anterior
      producto.id = contenidoId.id;
      producto.timestamp = fechaYHora;
      res
        .status(200)
        .send({ producto: contenidoId, productoActualizado: producto });
      //sobreescribe el archivo
      contenido = contenido.filter((i) => i.id !== contenidoId.id);
      contenido.push(producto);
      await fs.promises.writeFile(
        "./productos.json",
        JSON.stringify(contenido)
      );
    } catch (err) {
      console.log("error", err);
    }
  }

  leerArchivo();
});

routerProductos.delete("/:id", (req, res) => {
  async function leerArchivo() {
    try {
      //lee el archivo json
      let contenido = JSON.parse(
        await fs.promises.readFile("./productos.json", "utf-8")
      );
      //encuentra el producto por su Id
      let contenidoId = contenido.find((e) => e.id == req.params.id);
      if (contenidoId === undefined) {
        res.status(200).send("No se ha encontrado un producto con ese Id ");
      }
      res.status(200).send({ ProductoEliminado: contenidoId });
      //sobreescribe el archivo
      contenido = contenido.filter((i) => i.id !== contenidoId.id);
      await fs.promises.writeFile(
        "./productos.json",
        JSON.stringify(contenido)
      );
    } catch (err) {
      console.log("error", err);
    }
  }

  leerArchivo();
});
// Router Carrito
routerCarrito.post("/", (req, res) => {
  productos = req.body;
  async function escribirArchivo() {
    try {
      //lee el contenido del archivo
      let contenido = JSON.parse(
        await fs.promises.readFile("./carrito.json", "utf-8")
      );
      let Idcontenido = contenido.length + 1;
      const carrito = {
        id: Idcontenido,
        timestamp: fechaYHora,
        productos: [{ productos }],
      };
      contenido.push(carrito);
      res
        .status(200)
        .send({ message: "el carrito se ha creado", id: Idcontenido });
      //sobreescribe el archivo
      await fs.promises.writeFile("./carrito.json", JSON.stringify(contenido));
    } catch (err) {
      console.log("error de lectura!", err);
    }
  }
  escribirArchivo();
});

routerCarrito.delete("/:id", (req, res) => {
  async function leerArchivo() {
    try {
      //lee el archivo json
      let contenido = JSON.parse(
        await fs.promises.readFile("./carrito.json", "utf-8")
      );
      //encuentra el producto por su Id
      let contenidoId = contenido.find((e) => e.id == req.params.id);
      if (contenidoId === undefined) {
        res.status(200).send("No se ha encontrado un producto con ese Id ");
      }
      res.status(200).send({ ProductoEliminado: contenidoId });
      //sobreescribe el archivo
      contenido = contenido.filter((i) => i.id !== contenidoId.id);
      await fs.promises.writeFile("./carrito.json", JSON.stringify(contenido));
    } catch (err) {
      console.log("error", err);
    }
  }

  leerArchivo();
});

routerCarrito.get("/:id/productos", (req, res) => {
  async function leerArchivo() {
    try {
      const contenido = JSON.parse(
        await fs.promises.readFile("./carrito.json", "utf-8")
      );
      let carritoId = contenido.find((e) => e.id == req.params.id);
      if (carritoId === undefined) {
        carritoId = null;
      }
      res.status(200).send(carritoId.productos);
    } catch (err) {
      console.log("error", err);
    }
  }

  leerArchivo();
});
routerCarrito.post("/:id/productos", (req, res) => {
  productos = req.body;
  async function leerArchivo() {
    try {
      //lee el archivo json
      let contenido = JSON.parse(
        await fs.promises.readFile("./carrito.json", "utf-8")
      );
      //encuentra el producto por su Id
      let carritoId = contenido.find((e) => e.id == req.params.id);
      if (carritoId === undefined) {
        console.log("no se ha encontrado ese ID");
        carritoId = null;
      }
      carritoId.productos.push(productos);
      res.status(200).send({ productoActualizado: carritoId });
      //sobreescribe el archivo
      contenido = contenido.filter((i) => i.id !== carritoId.id);
      contenido.push(carritoId);
      await fs.promises.writeFile("./carrito.json", JSON.stringify(contenido));
    } catch (err) {
      console.log("error", err);
    }
  }

  leerArchivo();
});

routerCarrito.delete("/:id/productos/:id_prod", (req, res) => {
  async function leerArchivo() {
    try {
      //lee el archivo json
      let contenido = JSON.parse(
        await fs.promises.readFile("./carrito.json", "utf-8")
      );
      //encuentra el producto por su Id
      let contenidoId = contenido.find((e) => e.id == req.params.id);
      let productoId = contenidoId.productos.find(
        (e) => e.id == req.params.id_prod
      );
      contenidoId.productos = contenidoId.productos.filter(
        (e) => e.id !== req.params.id_prod
      );
      if (productoId === undefined) {
        res.status(200).send("No se ha encontrado un producto con ese Id ");
      } else {
        res
          .status(200)
          .send({
            ProductoEliminado: productoId,
            ProductosRestantes: contenidoId.productos,
          });
      }

      //sobreescribe el archivo
      contenido = contenido.filter((i) => i.id !== contenidoId.id);
      contenido.push(contenidoId);
      await fs.promises.writeFile("./carrito.json", JSON.stringify(contenido));
    } catch (err) {
      console.log("error", err);
    }
  }

  leerArchivo();
});

//PORT 
const PORT = 8080 || process.env.PORT
app.listen(PORT,()=>{
  console.log('server on')
})