var express = require ('express');
var app = express();
var passport = require('passport');

var port = process.env.PORT || 3000;

app.use('/', express.static(__dirname + '/client'));

app.listen(port, () => {
  console.log('You are Connected at port:', port );
});
