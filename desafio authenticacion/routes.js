//index
function getRoot(req,res){
    res.render('index')
}
//login
function getLogin(req, res){
    if(req.isAuthenticated()) {
        let user = req.user;
        res.render('login');
    }
    else{
        console.log('user No logueado');
        res.render('login')
    }
}
//signup
function getSignup(req,res){
    res.render('signup')
}
//PROSSER LOGIN
function postLogin (req, res){
    var user = req.user;
    res.render('index')
}
//PROCESS SIGNUP
function postSignup (req, res){
    var user = req.body;
    res.render('index')
}
function getFaillogin (req,res){
    console.log('error en login');
    res.render('login-error',{});
}
function getFailsignup(req,res){
    console.log('error en signup');
    res.render('signup-error',{})
}
//LOGOUT
function getLogout(req,res){
    req.logout();
    res.render('login')
}
function failRoute(req,res){
    res.status(404).render('routing-error',{})
}
module.exports = {
    getRoot,getLogin,getSignup,postLogin,postSignup,getFaillogin,getFailsignup,getLogout,failRoute
}