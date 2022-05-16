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
const normalizr = require('normalizr');
const normalize = normalizr.normalize;
const schema = normalizr.schema;

let productos = []
dbHelpersProductos.selectProductos(productos)
let mensajes = { mensajes: [] }
mensajesMongo.readMensajes(mensajes)

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
//normalizer
function normilizee() {
    const user = new schema.Entity('mensajes');
    const comment = new schema.Entity('comments', { commenter: user });
    const article = new schema.Entity('articles', {
        author: user,
        comments: [comment]
    }, { idAttribute: 'email' });
    const post = new schema.Entity('posts', {
        posts: [article]
    })
    const normalizedData = normalize(mensajes, post);
    console.log(JSON.stringify(normalizedData))
}

//ROUTES
app.get('/', (req, res) => {
    res.render('index', { productos });
});
app.get('/productos', (req, res) => {
    res.render('productos', { productos });
});

app.get('/api/productos-test', (req, res) => {
    productos = productosFaker
    res.render('productos', { productos });
});
app.post('/productos', (req, res) => {
    req.body.precio = parseInt(req.body.precio)
    const producto = req.body
    productos.push(producto)
    dbHelpersProductos.insertProducto(producto)
})
io.on('connection', socket => {
    console.log('Un cliente se ha conectado');
    socket.emit('messages', mensajes.mensajes);
    socket.emit('productos', productos);
    socket.on('new-message', data => {
        mensajes.mensajes.push(data);
        io.sockets.emit('messages', mensajes.mensajes);
        mensajesMongo.createMensajes(data)
    });
    socket.on('new-product', data => {
        productos.push(data);
        io.sockets.emit('productos', productos);
        dbHelpersProductos.insertProducto(data)
    });
});

//port 
httpServer.listen(8080, function () {
    console.log('Servidor corriendo en http://localhost:8080');
})

