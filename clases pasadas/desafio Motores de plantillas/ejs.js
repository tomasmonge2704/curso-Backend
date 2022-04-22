const express = require('express')
const app = express()

app.set('view engine', 'ejs')

app.get('/', function(req,res){
    res.render('ejs');
});

app.listen(3000, ()=> console.log('server started on port 3000'));