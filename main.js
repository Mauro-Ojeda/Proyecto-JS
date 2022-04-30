const carritoStorage=JSON.parse(localStorage.getItem('carrito'));
let buscado = document.getElementById("busqueda")
let btn = document.getElementById("boton")
let noImg = 'img/noImg.png';
let badgeDeCarrito = document.getElementById('carritoCantidad').innerHTML = JSON.parse(localStorage.getItem('carrito')).length;
const productos =[
    {id: 1,cantidad:1 ,titulo:'Miami Heats',precio:107,talle:5,imagen:'img/heat2.png',alt:'Uniforme  de Miami Heats',stock:3,},
    {id: 2,cantidad:1 ,titulo:'Toronto Raptors',precio:102,talle:4,imagen:'img/toronto.png',alt:'Uniforme  de Toronto Raptors',stock:7,},
    {id: 3,cantidad:1 ,titulo:'Boston Celtics',precio:103,talle:3,imagen:'img/boston.png',alt:'Uniforme  de Boston Celtics',stock:0,},
    {id: 4,cantidad:1 ,titulo:'New York',precio:104,talle:3,imagen:'img/nyk.png',alt:'Uniforme  de New York',stock:9,},
];
if (carritoStorage=== null){
    let array = [];
    localStorage.setItem('carrito',JSON.stringify (array));
}
function comprobarCart (object){
    const carritoStorage=JSON.parse(localStorage.getItem('carrito'));
    let carrito= carritoStorage;
    return carrito.find(elemento => elemento.id === object.id)
}
function añadirCarrito(index){
// If para comprobar Stock
    if (productos[index].stock === 0) {
        Toastify({
            text: "❌Este Producto No tiene Stock ,Por lo tanto no fue agregado al carrito",
            duration: 4000,
            gravity: "bottom", 
            position: "left", 
            close: true,
            style: {
            background: "linear-gradient(to left, #000000, #a80707)",
            }
            }).showToast();
    }else{
    const carritoStorage=JSON.parse(localStorage.getItem('carrito'));
    let comprobante = comprobarCart(productos[index]);
    // If para comprobar si ya un producto con el mismo ID y si lo hay aumenta la cantidad
    if(comprobante === undefined ){
        productos[index].cantidad=1;
        carritoStorage.push(productos[index])
        localStorage.setItem('carrito',JSON.stringify (carritoStorage));
        document.getElementById('carritoCantidad').innerHTML = carritoStorage.length;
    }else{
        let indexo = carritoStorage.findIndex((elemento)=>{
            return elemento.id === productos[index].id;
        })
        carritoStorage[indexo].cantidad += 1;
        localStorage.setItem('carrito',JSON.stringify (carritoStorage));
        }
        Toastify({
            text: "✅Producto Agregado Correctamente",
            duration: 2000,
            gravity: "bottom", 
            position: "right", 
            close: true,
            style: {
                background: "linear-gradient(to left, #00b09b, #96c93d)",
                }
        }).showToast();
}
}
function crearCards(productosAMostrar){
    let acumuladorDeCards = document.getElementById("contenedorDeCards");
    acumuladorDeCards.innerHTML= '';
    productosAMostrar.forEach((elementoDelArray,index) => {
        return acumuladorDeCards.innerHTML += `
        <div id="carta" class="container card col-xs-3">
        <img class="card-img-top"src="${elementoDelArray.hasOwnProperty('imagen') ? elementoDelArray.imagen : noImg}" alt=${elementoDelArray.alt}>
        <span class="badge">${elementoDelArray.stock >0 ? 'Hay Stock' :'Sin Stock'}<span id="stockBadge" class="badge bg-dark">${elementoDelArray.stock}</span>
        </a></span>
        <div class="card-body">
        <a href="" class="subCrece card-tittle" ">${elementoDelArray.titulo}</a>
        <p class="card-text">Precio $${elementoDelArray.precio}- Talle ${elementoDelArray.talle}</p>
        <button class="sinS btnComprar btn btn-success text-white" onclick="añadirCarrito(${index})">➕Añadir</button>
        </div>
        </div>`
    });
}
function enter(){
    buscado.addEventListener("keydown", function (event) {
        if (event.key === 'Enter') {
            buscar();
        }
    });
}
function buscar(){
    const productoBuscado = document.getElementById('busqueda').value.toUpperCase().trim();
    if (productoBuscado === ''){
        Toastify({
            text: "Escribe algo para Buscar",
            duration: 2000,
            gravity: "bottom", 
            position: "left", 
            close: true,
            style: {
                background: "linear-gradient(to left, #007bff ,#1c1010)",
                }
            }).showToast();
            crearCards(productos)
    }else{
        const productosEncontrados= productos.filter((producto)=>{
            return producto.titulo.toUpperCase().trim().match(productoBuscado)
        });
        crearCards(productosEncontrados);
    }
}
crearCards(productos)