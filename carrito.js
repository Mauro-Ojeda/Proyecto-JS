const carritoStorage = JSON.parse(localStorage.getItem('carrito'));
const noImg = 'img/noImg.png';
const precios =carritoStorage.reduce((acc,{cantidad,precio})=>acc + cantidad*precio,0);
const Cantidades =carritoStorage.reduce((acc,{cantidad})=> acc + cantidad,0);
if (carritoStorage === null,[]) {
    let arrayVacio = [];
    localStorage.setItem('carrito', JSON.stringify(arrayVacio));
}
if(carritoStorage.length === 0){
    carritoVacio()
}else{
    crearCards(carritoStorage)
}
function comprado(){
    let contenedor = document.getElementById("contenedorDelCart");
    contenedor.innerHTML= ''
    const totalDelCarrito = document.getElementById('precioTotal');
    totalDelCarrito.innerHTML =0;
    vaciar()
    return contenedor.innerHTML +=`
    <h1 class="text-center"><span>✅</span>Compra Realizada con Éxito,<br>Seguir  
    <a href="index.html">Comprando 🛒</a>
    </h1>
    `
}
function crearCards(productosAMostrar) {
    let acumuladorDeCards = document.getElementById("contenedorDelCart");
    acumuladorDeCards.innerHTML = '';
    productosAMostrar.forEach((elementoDelArray, index) => {
        return acumuladorDeCards.innerHTML += `
        <tr>
                <th class="flex-fill text-primary" scope="row">
                <img class="flex-fill imagenCarrito card-img-top"src="${elementoDelArray.hasOwnProperty('imagen') ? elementoDelArray.imagen : noImg}" alt=${elementoDelArray.alt}>
                </th>
                <td>${elementoDelArray.titulo}</td>
                <td>${elementoDelArray.precio}</td>
                <td>
                <button class="btn btn-primary" type="button"onclick='aumentarCantidad(${index})' >➕</button>
                <button class="btn btn-danger" type="button"onclick='bajarCantidad(${index})' >➖</button>
                <a class="bg-dark signo" type="button"onclick='explicacion()'>💬</a></td>
                <td>${elementoDelArray.talle}</td>
                <td>${elementoDelArray.stock}</td>
                <td><button class="btn btn-danger" type="button"onclick='botonBorrar(${index})'>X</button></td>
                </tr>
                `
    });
    actualizarTotal()
    actualizarCantidad()
}
function aumentarCantidad(index){
    if(carritoStorage[index].stock === carritoStorage[index].cantidad){
        Toastify({
            text: "No hay más Stock de este Producto",
            duration: 3000,
            gravity: "bottom",
            position: "right",
            close: true,
            style: {
                background: "linear-gradient(to left, #000000, #a80707)",
            }
        }).showToast();
        actualizarTotal()
        actualizarCantidad()
        localStorage.setItem('carrito',JSON.stringify (carritoStorage));
    }else{
        carritoStorage[index].cantidad = Number(carritoStorage[index].cantidad) + 1;
        localStorage.setItem('carrito',JSON.stringify (carritoStorage));
        actualizarTotal()
        actualizarCantidad()
    }
}
function bajarCantidad(index){
    if(carritoStorage[index].cantidad >= 0){
        carritoStorage[index].cantidad = 1
        actualizarTotal()
        actualizarCantidad()
        localStorage.setItem('carrito',JSON.stringify (carritoStorage));
        Toastify({
            text: "No puedes tener 0 de cantidad, para eso borra el Producto",
            duration: 3000,
            gravity: "bottom",
            position: "right",
            close: true,
            style: {
                background: "linear-gradient(to left, #000000, #a80707)",
            }
        }).showToast();
    }else{
        carritoStorage[index].cantidad = Number(carritoStorage[index].cantidad) - 1;
        actualizarTotal()
        actualizarCantidad()}
        localStorage.setItem('carrito',JSON.stringify (carritoStorage));
}
function explicacion(){
    Toastify({
        text: "Si no aumenta la cantidad,es porque no hay más Stock del producto",
        duration: 4000,
        gravity: "bottom",
        position: "left",
        close: true,
        style: {
            background: "linear-gradient(to left, #007bff ,#1c1010)",
        }
    }).showToast();
}
function carritoVacio(){
    let contenedor = document.getElementById("contenedorDelCart");
    return contenedor.innerHTML =`
    <h1 class="text-center">❌ El carrito esta vacio ,comienza a <a href="index.html" >comprar 🛒</a>
    </h1>
    `
}
function vaciar() {
    let vacio = [];
    localStorage.setItem('carrito', JSON.stringify(vacio));
}
function vaciarCart() {
    if (carritoStorage.length === 0) {
        Toastify({
            text: "Ya esta vacio",
            duration: 2000,
            gravity: "bottom",
            position: "left",
            close: true,
            style: {
                background: "linear-gradient(to left, #000000, #a80707)",
            }
        }).showToast();
    }else{
        let contenedor = document.getElementById("contenedorDelCart");
        contenedor.innerHTML= ''
        vaciar()
        carritoVacio()
        const totalDeCantidades = document.getElementById('cantidades');
        totalDeCantidades.innerHTML = 0;
        const totalDelCarrito = document.getElementById('precioTotal');
        totalDelCarrito.innerHTML = 0;
}
}
function botonComprar() {
    if (carritoStorage.length === 0) {
        Toastify({
            text: "No hay nada en tu carrito",
            duration: 3000,
            gravity: "bottom",
            position: "left",
            close: true,
            style: {
                background: "linear-gradient(to left, #000000, #a80707)",
            }
        }).showToast();
    } else {
        comprado()
    }
}
function botonBorrar(index){
    Toastify({
        text: "Producto Eliminado",
        duration: 2000,
        gravity: "bottom", 
        position: "left", 
        close: true,
        style: {
            background: "linear-gradient(to left, #000000, #a80707)",
            }
        }).showToast();
    carritoStorage.splice(index,1);
    actualizarTotal()
    actualizarCantidad()
    localStorage.setItem('carrito', JSON.stringify(carritoStorage));
    crearCards(carritoStorage)
    if(carritoStorage.length=== 0){
        carritoVacio()
    }
}
function comprobarCart (object){
    let carrito= carritoStorage;
    return carrito.find(elemento => elemento.id === object.id)
}
function actualizarCantidad() {
    const Cantidades =carritoStorage.reduce((acc,{cantidad})=> acc + cantidad,0);
    const totalDeCantidades = document.getElementById('cantidades');
    totalDeCantidades.innerHTML = `${Cantidades}`;
}
function actualizarTotal() {
    const precios =carritoStorage.reduce((acc,{cantidad,precio})=>acc + cantidad*precio,0);
    const totalDelCarrito = document.getElementById('precioTotal');
    totalDelCarrito.innerHTML = `$ ${precios.toFixed(2)}`;
}
