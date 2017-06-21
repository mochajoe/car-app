var http = require('http');
var path = require('path');
var express = require('express');

<<<<<<< HEAD
var app = express();
var server = http.createServer(router);
app.set('port', (process.env.PORT || 3000));
=======
var router = express();
var server = http.createServer(router);
>>>>>>> 0bb30dabf3f4ddcc93f6767010fd36ba098a4714


router.use(express.static(path.resolve(__dirname, 'client')));

<<<<<<< HEAD

app.listen(app.get('port'), function() {
  console.log('Server started: http://localhost:' + app.get('port') + '/');
=======
server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
  var addr = server.address();
  console.log("Chat server listening at", addr.address + ":" + addr.port);
>>>>>>> 0bb30dabf3f4ddcc93f6767010fd36ba098a4714
});
