const express = require('express');
const app = express();
const server = require('http').createServer(app);

const io = require('socket.io').listen(server);

users = [];
connections = [];

server.listen(process.env.PORT || 3000);
console.log("Server Runnning");
app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});


//Opening a connnection with socket.io
io.sockets.on('connection', function(socket){
  connections.push(socket);
  console.log('Connected : %s sockets connected', connections.length);

//Disconnect
 socket.on('disconnect', function(data){
   users.splice(users.indexOf(socket.username),1);
   updateUserNames();
   connections.splice(connections.indexOf(socket), 1);
   console.log('Disconnected: %s sockets connected', connections.length);
 });

//Sending a message
socket.on('send message', function(data){
   io.sockets.emit('new message', {msg:data, user: socket.username});
});

socket.on('new user', function(data, callback){
   callback(true);
   socket.username = data;
   users.push(socket.username);
   updateUserNames();
});

function updateUserNames()
{
   io.sockets.emit('get users', users);
 }

});
