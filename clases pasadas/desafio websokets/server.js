const express = require('express')
const { Server: HttpServer } = require('http')
const { Server: IOServer } = require('socket.io')
const app = express()
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)
const productos = []
const exphbs = require("express-handlebars");
var hoy = new Date();
var fecha = hoy.getDate() + '-' + ( hoy.getMonth() + 1 ) + '-' + hoy.getFullYear();
var hora = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
var fechaYHora = fecha + ' ' + hora;
const messages = [
    { author: "Juan", text: "¡Hola! ¿Que tal?", time:fechaYHora },
    { author: "Pedro", text: "¡Muy bien! ¿Y vos?", time:fechaYHora },
    { author: "Ana", text: "¡Genial!", time:fechaYHora }
 ];
 app.use(express.static('views'))
 app.engine("hbs",exphbs.engine({
    extname:".hbs",
    defaultLayout:null,
    layoutsDir:__dirname + "/views",
    partialsDir:__dirname + "/views"
  }))
  app.set("views", "./views");
  app.set("view engine", "hbs");
  app.use(express.urlencoded({extended:true}))
  //ROUTES
  app.get('/', (req,res) =>{
      res.render('index', { productos });
  });
  app.post('/productos',(req,res) =>{
     productos.push(req.body)
     res.redirect('/')
     console.log(productos)
  })
io.on('connection',socket => {
    console.log('Un cliente se ha conectado');
    socket.emit('messages', messages);

    socket.on('new-message',data => {
        messages.push(data);
        io.sockets.emit('messages', messages);
    });
 });

 //port 
 httpServer.listen(8080, function() {
    console.log('Servidor corriendo en http://localhost:8080');
})