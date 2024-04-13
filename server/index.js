// Uso de express
const express = require('express');
const path = require('path');
const app  = express();
const server = require('http').createServer(app);
var io = require("socket.io")(server);
const PORT = 3000;

app.use(express.static('public'));
app.use('/css', express.static('node_modules/spectre.css/dist'));

console.log(__filename);

app.get('/hola-mundo', function(req, res){
  res.status(200).send('Hola Mundo!');
});

var messages = [{
  id: 1, user: 'Juan', message: 'Bienvenido'
}];

io.on('connection', function(socket){
  console.log('El cliente con ip se ha conectado '+ socket.handshake.address);
  socket.emit('messages',messages);
  socket.on('add-message',function(data) {
    messages.push(data);
    io.sockets.emit('messages', messages);
  });
});

server.listen(PORT, () => { console.log('Listening on port ' + PORT) });