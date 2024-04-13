// Configuracion del servidor
const express = require('express'); // Uso de express
const app  = express();
const server = require('http').createServer(app); // Conexion con servidor
var io = require("socket.io")(server); // Declaracion  de socket.io para comunicar entre client
const PORT = 3000; // Puerto de salida de la conexion

app.use(express.static('public')); // se usa express para mostrara la carpeta public
app.use('/css', express.static('node_modules/spectre.css/dist')); // se usa spectre.css para el diseño de la aplicación

// Declaración de objeto de messages para guardar temporalmente el chat
var messages = [{
  id: 1, user: 'Juan', message: 'Bienvenido'
}];

// Conexion con socket
io.on('connection', function(socket){
  console.log('El cliente con ip se ha conectado '+ socket.handshake.address);
  // Para enviar el mensajes
  socket.emit('messages',messages);
  // Para recibir los mensajes donde se añade al ultimo mensaje y luego se devuelve
  socket.on('add-message',function(data) {
    messages.push(data);
    io.sockets.emit('messages', messages);
  });
});

// Expone el puerto en la conexión habilitada
server.listen(PORT, () => { console.log('Listening on port ' + PORT) });