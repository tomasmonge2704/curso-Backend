const socket = io.connect();
function date(){
    var hoy = new Date();
    var fecha = hoy.getDate() + '-' + (hoy.getMonth() + 1) + '-' + hoy.getFullYear();
    var hora = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
    var fechaYHora = fecha + ' ' + hora;
    return fechaYHora
}


socket.on('messages', data => {
    console.log(data);
});
function render(data) {
    const html = data.map((elem, index) => {
        return(`<div>
            <strong>${elem.author.id}</strong>
            <em>[${elem.date}]:</em>
            <em>${elem.text}</em>
            <img src=${elem.author.avatar} style="max-width:50px"></img>
            </div>`)
    }).join(" ");
    document.getElementById('messages').innerHTML = html;
}

socket.on('messages', function(data) { render(data); });
function addMessage(e) {
    const mensaje = {
        author:{id:document.getElementById('email').value,
                nombre:document.getElementById('nombre').value,
                apellido:document.getElementById('apellido').value,
                edad:document.getElementById('edad').value,
                alias:document.getElementById('alias').value,
                avatar:document.getElementById('avatar').value,
    },
        text: document.getElementById('texto').value,
        date:date()
    };
    socket.emit('new-message', mensaje);
    return false;
}
