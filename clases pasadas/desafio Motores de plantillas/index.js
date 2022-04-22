const express = require('express')
const app = express()
const productos = []
//app
const exphbs = require("express-handlebars");

app.engine("hbs",exphbs.engine({
  extname:".hbs",
  defaultLayout:null,
  layoutsDir:__dirname + "/views/handlebars",
  partialsDir:__dirname + "/views/handlebars"
}))
app.set("views", "./views/handlebars");
app.set("view engine", "hbs");
app.use(express.urlencoded({extended:true}))
//ROUTES
app.get('/', (req,res) =>{
    res.render('inicio', { productos });
});
app.get('/productos', (req,res) =>{
    res.render('productos', { productos });
});
app.post('/productos',(req,res) =>{
   productos.push(req.body)
   res.redirect('/productos')
   console.log(productos)
})
app.post('/volver',(req,res) =>{
    res.redirect('/')
 })
//PORT 
const PORT = 8080
app.listen(PORT, err =>{
  if(err) throw new Error(`Error en servidor ${err}`)
  console.log(`el servidor express escuchando en el puerto ${PORT}`)
})