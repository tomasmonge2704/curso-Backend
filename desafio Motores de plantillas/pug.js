const express = require('express')
const app = express()
app.use('/static', express.static(__dirname + '/pubblic'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.set('views','./views');
app.set('view engine', 'pug');

app.get('/',(req,res)=> {
    res.render('pug.pug',{mensaje:'holaa'})
})

app.listen(3000, ()=> console.log('server started on port 3000'));