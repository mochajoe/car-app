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

// DATABASE
var connectionString = "mongodb://user:user@ds139072.mlab.com:39072/heroku_tnw3lrsl" || 'mongodb://localhost/test';
var db = mongoose.connect(connectionString);

var UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  name: String,
  gender: String,
  birthdate: String,
  location: String,
  bio: String,
  favoriteCars: Array,
  edmundIds: Array
});

// model for maintaining user data
var UserModel = mongoose.model("UserModel", UserSchema);

// var admin = new UserModel({username:'Anthony',password:'john',location:'Boston', about:"I love BMWs"})
// var student = new UserModel({username:'Bob',password:'ddd',location:'Washington DC', about:"I love Toyotas"})

// admin.save();
// student.save();

//Authentication
// model for maintaining user favorites


app.use(passport.initialize());
app.use(passport.session());

//this is the local strategy that is configured
passport.use(new LocalStrategy(
function(username, password, done)
{
   UserModel.findOne({username: username, password: password}, function (err, user){
    if(user)
    {
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

// Authentication Routes
app.get('/account', function(req, res) {
  res.sendFile(__dirname + '/client/index.html');
});

app.get('/register', function(req, res) {
  res.sendFile(__dirname + '/client/index.html');
});

app.get('/login', function(req, res) {
  res.sendFile(__dirname + '/client/index.html');
});

app.get('/searchBar', (req, res) => {
  res.sendFile(__dirname + '/client/index.html');
})

app.get('/logout', (req, res) => {
  res.sendFile(__dirname + '/client/index.html');
})

app.get("/loggedin", function(req, res){
  res.send(req.isAuthenticated() ? req.user : '0');
});

app.post("/logout", function(req, res){
  req.logOut();
  res.sendStatus(200);
});

//passports looks at this request first, local is the easiest strategy, username and password
app.post('/login',passport.authenticate('local'), (req,res) => {
  res.json(req.user);
})
//check if that user exists already in our data base
//if they are in our database than we don't let them register
app.post("/register", function (req, res){
  UserModel.findOne({username:req.body.username}, (err,user) => {
    if(user) {
      //if user is in database. don't insert
      return res.json(null);

    } else {
      var newUser = new UserModel(req.body);
      newUser.save((err,user) => {
        //passport has a login method
        req.login(user, (err) => {
          if(err) {
            return next(err);
          }
                  res.json(user);

        }); //it says this is the current logged in user
      });
    }
  })
  var newUser = req.body;
});

app.post("/favoriteCar", (req,res) =>{

  UserModel.findOneAndUpdate({username:req.body.user.username},{$push:{favoriteCars:{name:`${req.body.year} ${req.body.make} ${req.body.model}`}}}, (err,user) => {
      res.json(user)
  })
});

app.post("/favoriteCarId", (req,res) =>{
  UserModel.findOneAndUpdate({username:req.body.user.username},{$push:{edmundIds:req.body.Id}}, (err,user) => {
      res.json(user)
  })
});

app.post("/getUserDetail", (req,res) => {
  console.log(req.body)
  UserModel.findOne({username: req.body.username}, (err, user) => {
    console.log(err)
    console.log(user)
    res.json(user)

  })
})

var port = process.env.PORT || 3000;





app.listen(port, () => {
    console.log('You are Connected at port:', port);
});
