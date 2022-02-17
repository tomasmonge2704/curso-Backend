const express = require('express')
const app = express()

const { engine } = require("express-handlebars");

app.engine("hbs",engine({
  extname:".hbs",
  defaultLayout:'index.hbs',
  layoutsDir:__dirname + "/views/layouts",
  partialsDir:__dirname + '/views/partials'
}))

app.set("view engine", "hbs");
app.set("views", "./views");
app.use(express.static("public"));
//ROUTES
app.get('/', (req,res) =>{
    res.render("main",{ listExists:true});
});

app.get('/productos', function(req,res){
    res.sendFile(__dirname + '/productos.html')

})

//PORT 
const PORT = 8080
app.listen(PORT, err =>{
  if(err) throw new Error(`Error en servidor ${err}`)
  console.log(`el servidor express escuchando en el puerto ${PORT}`)
})


