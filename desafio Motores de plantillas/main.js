const express = require('express')
const app = express()

const personas = []
//ejs
app.use(express.urlencoded({extended:true}))
app.set("views", "./views");
app.set("view engine", "ejs");
//ROUTES
app.get('/', (req,res) =>{
    res.render('inicio', { personas });
});

app.post('/personas',(req,res) =>{
   personas.push(req.body)
   console.log(personas)
   res.redirect('/')
})

//PORT 
const PORT = 8080
app.listen(PORT, err =>{
  if(err) throw new Error(`Error en servidor ${err}`)
  console.log(`el servidor express escuchando en el puerto ${PORT}`)
})