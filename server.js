var express = require('express');
var app = express();
var passport = require('passport');
var mongo = require('mongodb');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var db = mongoose.connection;
var User = ('./model/user')
var session = require("express-session")
LocalStrategy = require('passport-local').Strategy;
passportLocalMongoose = require('passport-local-mongoose');

mongoose.connect('mongob://localhost/loginapp');
app.use(express.static(__dirname + '/client'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

var UserDetails = mongoose.model('userInfo', UserDetail);

 var Schema = mongoose.Schema;
 var UserDetail = new Schema({
  username: String,
  password: String
}, {
  collection: 'userInfo'
});


app.use(session({
    secret: "something",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());


passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function(err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));


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

app.get("/register", (req, res) => {
    res.sendFile('./client/src/views/register.html', {
        root: __dirname
    });
});

app.get('/login', (req, res) => {
    res.sendFile('./client/src/views/login.html', {
        root: __dirname
    });
})

app.post('/login',
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true
    })
);

app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});





var port = process.env.PORT || 3000;





app.listen(port, () => {
    console.log('You are Connected at port:', port);
});