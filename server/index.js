// Uso de express
const express = require('express');
const app  = express();
const server = require('http').createServer(app);
var io = require("socket.io")(server);

app.get('/hola-mundo', function(req, res){
    res.status(200).send('Hola Mundo!');
});

server.listen(8081, () => { console.log('Listening on port 8081') });