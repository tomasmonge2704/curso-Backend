const express = require('express')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const MongoStore = require('connect-mongo')
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
const routes = require('./routes')
const mongoose = require('mongoose')
var bCrypt = require('bcryptjs');
const url = `mongodb+srv://tomas2:1roZJIVtj5JnG5HH@cluster0.nmb6c.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const connectionParams = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}
mongoose.connect(url, connectionParams)
    .then(() => {
        console.log('Connected to the database ')
    })
    .catch((err) => {
        console.error(`Error connecting to the database. n${err}`);
    })
const User = mongoose.model("User", new mongoose.Schema({ username: String,password: String,email: String,nombre: String, apellido: String }));
let productos = []
dbHelpersProductos.selectProductos(productos)
let mensajes = { mensajes: [] }
mensajesMongo.readMensajes(mensajes)
app.use(cookieParser())
app.use(session({
    secret: 'keyboard cat',
    cookie: {
        httpOnly: false,
        secure: false,
        maxAge: 10000000
    },
    rolling: true,
    resave: true,
    saveUninitialized: false
}))

function auth(req, res, next) {
    if (req.session?.user === 'pepe' && req.session?.admin) {
        return next()
    }
    return res.redirect(401, '/login')
}

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
//passport
function isValidPassword(user, password) {
    return bCrypt.compareSync(password, user.password);
}

passport.use('login', new LocalStrategy(
    (username, password, done) => {
        User.findOne({ username }, (err, user) => {
            if (err)
                return done(err);

            if (!user) {
                console.log('User Not Found with username ' + username);
                return done(null, false);
            }
            if (!isValidPassword(user, password)) {
                console.log('Invalid Password');
                return done(null, false);
            }

            return done(null, user);
        });
    })
);

//singup
passport.use('signup', new LocalStrategy({
    passReqToCallback: true
},
    (req, username, password, done) => {
        User.findOne({ 'username': username }, function (err, user) {

            if (err) {
                console.log('Error in SignUp: ' + err);
                return done(err);
            }

            if (user) {
                console.log('User already exists');
                return done(null, false)
            }
            console.log(req.body,username,password)
            const newUser = {
                username: username,
                password: createHash(password),
                email: req.body.email,
                nombre: req.body.nombre,
                apellido: req.body.apellido,
            }
            User.create(newUser, (err, userWithId) => {
                if (err) {
                    console.log('Error in Saving user: ' + err);
                    return done(err);
                }
                console.log(user)
                console.log('User Registration succesful');
                return done(null, userWithId);
            });
        });
    })
)

function createHash(password) {
    return bCrypt.hashSync(
        password,
        bCrypt.genSaltSync(10),
        null);
}
passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, done);
});

app.use(passport.initialize());
app.use(passport.session());
function checkAuthentication(req,res,next){
    if(req.isAuthenticated()){
        next()
    }else{
        res.redirect("/login")
    }
}
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
app.get('/',checkAuthentication, routes.getRoot);
app.get('/login', routes.getLogin)
app.post('/login', passport.authenticate('login', { failureRedirect: '/faillogin' }), routes.postLogin)
app.get('/faillogin', routes.getFaillogin);
app.get('/signup', routes.getSignup);
app.post('/signup', passport.authenticate('signup', { failureRedirect: '/failsignup' }), routes.postSignup);
app.get('/failsignup', routes.getFailsignup);
app.get('/logout', routes.getLogout)
app.get('*', routes.failRoute);

app.get('/productos', checkAuthentication, (req, res) => {
    res.render('productos', { productos });
});

app.get('/api/productos-test', checkAuthentication, (req, res) => {
    productos = productosFaker
    res.render('productos', { productos });
});
app.post('/productos', checkAuthentication, (req, res) => {
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

