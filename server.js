var express = require ('express');
var app = express();
var passport = require('passport');
var mongo = require('mongodb');
var mongoose = require('mongoose');


var db = mongoose.connection;


var port = process.env.PORT || 3000;

app.use('/', express.static(__dirname + '/client'));

mongoose.connect('mongob://localhost/loginapp');

app.listen(port, () => {
  console.log('You are Connected at port:', port );
});
