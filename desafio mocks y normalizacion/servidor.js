const express = require('express')
const { Server: HttpServer } = require('http')
const { Server: IOServer } = require('socket.io')
const app = express()
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)
const exphbs = require("express-handlebars");
const dbHelpersProductos = require("./MariaDB/dbHelpers")
const dbHelpersMensajes = require("./SQLite3/dbHelpers")


const productos = []
dbHelpersProductos.selectProductos(productos)
const messages = []
dbHelpersMensajes.selectMensajes(messages)

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
app.post('/productos', (req, res) => {
    req.body.precio = parseInt(req.body.precio)
    const producto = req.body
    productos.push(producto)
    dbHelpersProductos.insertProducto(producto)
    res.redirect('/')
})
io.on('connection', socket => {
    console.log('Un cliente se ha conectado');
    socket.emit('messages', messages);

    socket.on('new-message', data => {
        messages.push(data);
       dbHelpersMensajes.insertMensajes(data)
        io.sockets.emit('messages', messages);
    });
});

//port 
httpServer.listen(8080, function () {
    console.log('Servidor corriendo en http://localhost:8080');
})