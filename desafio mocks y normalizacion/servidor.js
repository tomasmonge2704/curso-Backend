const express = require('express')
const { Server: HttpServer } = require('http')
const { Server: IOServer } = require('socket.io')
const app = express()
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)
const exphbs = require("express-handlebars");
const dbHelpersProductos = require("./MariaDB/dbHelpers")
const productosFaker = require("./generadorProductos").productosFaker
const mensajesMongo = require('./MongoDB/index')
let productos = []
dbHelpersProductos.selectProductos(productos)
let mensajes = []
mensajesMongo.readMensajes(mensajes)
console.log(mensajes)
app.use(express.static('views'))
app.engine("hbs", exphbs.engine({
    extname: ".hbs",
    defaultLayout: null,
    layoutsDir: __dirname + "/views",
    partialsDir: __dirname + "/views"
}))
app.set("views", "./views");
app.set("view engine", "hbs");
app.use(express.urlencoded({ extended: true }))
//ROUTES
app.get('/', (req, res) => {
    res.render('index', { productos });
});
app.get('/productos', (req,res) =>{
    res.render('productos', { productos });
});

app.get('/api/productos-test', (req,res) =>{
    productos = productosFaker
    res.render('productos', {productos});
});
app.post('/productos', (req, res) => {
    req.body.precio = parseInt(req.body.precio)
    const producto = req.body
    productos.push(producto)
    dbHelpersProductos.insertProducto(producto)
    res.redirect('/')
})
io.on('connection', socket => {
    console.log('Un cliente se ha conectado');
    socket.emit('messages', mensajes);

    socket.on('new-message', data => {
        mensajes.push(data);
        mensajesMongo.createMensajes(data)
        io.sockets.emit('messages', mensajes);
    });
});

//port 
httpServer.listen(8080, function () {
    console.log('Servidor corriendo en http://localhost:8080');
})