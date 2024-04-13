//var socket = io.connect('http://localhost:3000', {'forceNew':true});
var socket = io.connect('http://192.168.5.115:3000', {'forceNew':true});

socket.on('messages',function(data){
    render(data);
});

//funcion para renderizar el mensaje
function render(data){
    var html = data.map(function(message, index){
        var inicial = message.user.substr(0,1);
        return (`
        <div class="card mb-20">
            <div class="card-header">
                <div class="card-title h5 text-primary">
                    <figure class="avatar avatar-sm avatar-color" data-initial="${inicial}">
                        <i class="avatar-presence online"></i>
                    </figure>
                    <span>${message.user}</span>
                </div>
            </div>            
            <div class="card-body">
                <p>${message.message}</p> 
            </div>
        </div>
        `);
    });
    var mensajes = document.getElementById("chat");
    mensajes.innerHTML = html;
    mensajes.scrollTop = mensajes.scrollHeight;
}

function addMessage(e) {
    var message = {
        user : document.getElementById('user').value,
        message : document.getElementById('message').value
    };

    document.getElementById('user').classList.add('disabled');
    socket.emit('add-message', message);
    return false;
}