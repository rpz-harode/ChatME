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


io.sockets.on('connection',function(socket){
  //when a new user connects
  connections.push(socket);
  console.log('Connected : %s sockets connected',connections.length);

  //When someone disconnects
  socket.on('disconnect',function(data){
    users.splice(users.indexOf(socket.username),1);
    updateUsernames();
    connections.splice(connections.indexOf(socket),1);
    console.log('1 socket disconected : %s sockets connected' ,connections.length);
  });

  //to implement message sending
  socket.on('send message', function(data){
      //console.log(data);
      io.sockets.emit('new message' , {msg: data, user: socket.username});
  });

  //For new users
  socket.on('new user' , function(data,callback){
      callback(true);
      socket.username = data;
      users.push(socket.username);
      updateUsernames();

  });

  function updateUsernames(){
    io.sockets.emit('get users',users);
  }
});
