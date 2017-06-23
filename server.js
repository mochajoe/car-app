var express = require('express');
var app = express();
var passport = require('passport');
var multer = require('multer');
var mongo = require('mongodb');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var db = mongoose.connection;
var User = ('./model/user')
var session = require("express-session")
var flash = require('connect-flash');
var cookieParser = require('cookie-parser');

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

LocalStrategy = require('passport-local').Strategy;
passportLocalMongoose = require('passport-local-mongoose');

app.use(express.static(__dirname + '/client'));
app.use(flash());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// DATABASE SHIT!!!!!!!!!!!

var connectionString = /*I will add my mlabs database here* process.env./ ||*/ 'mongodb://localhost/loginapp';
var db = mongoose.connect(connectionString);

var UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  location: String,
  about: String
});

// model for maintaining user data
var UserModel = mongoose.model("UserModel", UserSchema);


//Authentication shit!!!!!!



app.use(passport.initialize());
app.use(passport.session());


passport.use(new LocalStrategy(
function(username, password, done)
{
  console.log("in passport");
  UserModel.findOne({username: username, password: password}, function (err, user){
    if(user)
    {
      console.log("in passport");

      // if user is found return user
      return done(null, user);
    }
    // otherwise we return false
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

app.get('/login', function(req, res){
  res.sendFile(__dirname + '/client/index.html');
});

app.get('/searchBar', (req, res) => {
  res.sendFile(__dirname + '/client/index.html');
})

app.get("/loggedin", function(req, res){
  res.send(req.isAuthenticated() ? req.user : '0');
});


app.post('/login',
  passport.authenticate('local', { successRedirect: '/',
                                   failureRedirect: '/login',
                                   failureFlash: true })
);

app.post("/register", function (req, res){
  UserModel.findOne({username: req.body.username}, function(err, user){
    // if user already exists, return null
    if(user)
    {
      res.json(null);
      return;
    }
    else
    {
      var newUser = new UserModel(req.body);
      newUser.save(function(err, user){
        req.login(user, function(err)
        {
          if(err) {return next(err); }
          res.json(user);
        });
      });
    }
  });

  var newUser = req.body;
  console.log(newUser);
});





var port = process.env.PORT || 3000;





app.listen(port, () => {
    console.log('You are Connected at port:', port);
});