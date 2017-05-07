var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
users = [];
connections = [];

server.listen(process.env.PORT || 3000);
console.log("Server Running....");

app.get('/',function(req, res){
  res.sendFile(__dirname + '/index.html');
})


io.sockets.on('connection',function(socket)){
  //when a new user connects
  connection.push(socket);
  console.log('Connected : %s sockets connected',connections.length);

  //When someone disconnects
  connection.splice(connections.indexOf(socket),1);
  console.log('1 socket disconected : %s sockets connected' ,connections.length);
  

}
