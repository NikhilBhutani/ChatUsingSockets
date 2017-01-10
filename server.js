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
});
