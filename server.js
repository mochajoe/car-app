var http = require('http');
var path = require('path');
var express = require('express');

var app = express();
var server = http.createServer(router);
app.set('port', (process.env.PORT || 3000));


router.use(express.static(path.resolve(__dirname, 'client')));


app.listen(app.get('port'), function() {
  console.log('Server started: http://localhost:' + app.get('port') + '/');
});
