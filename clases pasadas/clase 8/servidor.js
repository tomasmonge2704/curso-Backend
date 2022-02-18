const express = require('express')
const multer = require('multer');

const app = express();
app.use(express.urlencoded({extended:true}))
app.get('/', function(req,res){
    res.sendFile(__dirname + '/index.html');
});
var storage = multer.diskStorage({
    destination:function (req,file,cb){
        cb(null,'uploads')
    },
    filename: function (req,file,cb){
        cb(null, file.fieldname + '-' + Date.now())
    }
})
var upload = multer({storage: storage})
//upload file
app.post('/uploadfile', upload.single('myFile'), (req,res,next) =>{
    const file = req.file
    if (!file){
        const error = new Error('Please ulpoad a file')
        error.httpStatusCode = 400
        return next(error)
    }
    res.send(file)
})
//upload multiple files
app.post('/uploadmultiple', upload.array('myFiles', 12), (req,res,next) =>{
    const files = req.files
    if (!files){
        const error = new Error('Please ulpoad a files')
        error.httpStatusCode = 400
        return next(error)
    }
    res.send(files)
})
app.listen(3000, ()=> console.log('server started on port 3000'))

