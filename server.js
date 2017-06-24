var express = require('express');
var app = express();
var passport = require('passport');
LocalStrategy = require('passport-local').Strategy;
var mongo = require('mongodb');
var mongoose = require('mongoose');
var User = ('./model/user')
var session = require("express-session")
var flash = require('connect-flash');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var multer = require('multer'); // v1.0.5
var upload = multer(); // for parsing multipart/form-data

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));


//Express session
app.use(session({
    secret: "something",
    resave: false,
    saveUninitialized: false
}));



app.use(express.static(__dirname + '/client'));
app.use(flash());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// DATABASE SHIT!!!!!!!!!!!

var connectionString = /*I will add my mlabs database here* process.env./ ||*/ 'mongodb://localhost/test';
var db = mongoose.connect(connectionString);

var UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  location: String,
  about: String
});

// model for maintaining user data
var UserModel = mongoose.model("UserModel", UserSchema);

// var admin = new UserModel({username:'Anthony',password:'john',location:'Boston', about:"I love BMWs"})
// var student = new UserModel({username:'Bob',password:'ddd',location:'Washington DC', about:"I love Toyotas"})

// admin.save();
// student.save();

//Authentication shit!!!!!!



app.use(passport.initialize());
app.use(passport.session());

//this is the local strategy that is configured
passport.use(new LocalStrategy(
function(username, password, done)
{

   console.log("in passport");
   UserModel.findOne({username: username, password: password}, function (err, user){
    if(user)
    {
      console.log("in passport");
      return done(null, user); //if we find it then we reply with the user object
    }
    // if no user is found then false
    return done(null, false, {message: 'Unable to login'});
  });
}));



passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});


app.get('/secret', function(req, res) {
    res.sendFile('./client/src/views/secret.html', {
        root: __dirname
    });

})

// Authentication Routes SHIT!!!!!!!

app.get("/register", (req, res) => {
    res.sendFile('./client/src/views/register.html', {
        root: __dirname
    });
});

app.get('/login', function(req, res) {
  res.sendFile(__dirname + '/client/index.html');
});

app.get('/searchBar', (req, res) => {
  res.sendFile(__dirname + '/client/index.html');
})

app.get("/loggedin", function(req, res){
  res.send(req.isAuthenticated() ? req.user : '0');
});

//passports looks at this request first, local is the easiest strategy, username and password
app.post('/login',passport.authenticate('local'), (req,res) => {
  console.log('/login');
  console.log(req.user);
  res.json(req.user);
})

// app.post('/login',
//   passport.authenticate('local', { successRedirect: '/',
//                                    failureRedirect: '/login',
//                                    failureFlash: true })
// );

app.post("/register", function (req, res){
  UserModel.findOne({username: req.body.username}, function(err, user){
    var newUser = req.body;
    console.log(newUser);
  });

  var newUser = req.body;
  console.log(newUser);
});





var port = process.env.PORT || 3000;





app.listen(port, () => {
    console.log('You are Connected at port:', port);
});