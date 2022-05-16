const socket = io.connect();
const denormalize = normalizr.denormalize;
function date() {
    var hoy = new Date();
    var fecha = hoy.getDate() + '-' + (hoy.getMonth() + 1) + '-' + hoy.getFullYear();
    var hora = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
    var fechaYHora = fecha + ' ' + hora;
    return fechaYHora
}

function render(data) {
    const html = data.map((elem, index) => {
        return (`<div>
            <strong>${elem.author.id}</strong>
            <em>[${elem.date}]:</em>
            <em>${elem.text}</em>
            <img src=${elem.author.avatar} style="max-width:50px"></img>
            </div>`)
    }).join(" ");
    document.getElementById('messages').innerHTML = html;
}

socket.on('messages', function (data) { render(data); });
function addMessage(e) {
    const mensaje = {
        author: {
            id: document.getElementById('email').value,
            nombre: document.getElementById('nombre').value,
            apellido: document.getElementById('apellido').value,
            edad: document.getElementById('edad').value,
            alias: document.getElementById('alias').value,
            avatar: document.getElementById('avatar').value,
        },
        text: document.getElementById('texto').value,
        date: date()
    };
    socket.emit('new-message', mensaje);
    return false;
}
function renderProductos(data) {
    const html = data.map((elem, index) => {
        return (`
        <tr>
        <td>${elem.name}</td>
        <td>${elem.precio}</td>
        <td><img src="${elem.imageURL}" style="max-height:30px"></td>
    </tr>
    `)
    }).join(" ");
    document.getElementById('productos').innerHTML = html;
}

socket.on('productos', function (data) { renderProductos(data); });
function addProd(e) {
    const producto = {
        name: document.getElementById('name').value,
        precio: document.getElementById('precio').value,
        imageURL: document.getElementById('imageURL').value,
    };
    socket.emit('new-product', producto);
    return false;
}