// =================================================================
// 1. CONSTANTES Y VARIABLES GLOBALES
// =================================================================

let productos = []; 
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
let isAdmin = JSON.parse(localStorage.getItem('isAdmin')) || false;

const API_URL = "https://kiosko-889m.onrender.com/api/productos";

// Elementos del DOM
const gridProductos = document.getElementById('grid-productos');
const contadorCarrito = document.getElementById('contador-carrito');
const loginExito = document.getElementById('login-exito');
const adminIcono = document.querySelector('.admin-icono'); 
const busquedaInput = document.getElementById('busqueda');
const carritoDesplegable = document.getElementById('carrito-desplegable');
const listaCarrito = document.getElementById('lista-carrito');
const carritoSubtotal = document.getElementById('carrito-subtotal');
const carritoTotal = document.getElementById('carrito-total');
const filtroCategoriasBotones = document.getElementById('filtro-categorias-botones'); 

// Variable para controlar el estado actual del filtro TACC (true=Sin TACC, false=todos)
let filtroTaccActivo = false;


// =================================================================
// 2. LÓGICA DEL SLIDER (SIN CAMBIOS)
// =================================================================

let slideActual = 0;
const slides = document.querySelectorAll('.oferta');
const totalSlides = slides.length;
const container = document.getElementById('slider-container');
const dots = document.querySelectorAll('.dot');

function actualizarSlider() {
    if (container) {
        container.style.transform = `translateX(-${slideActual * 100}%)`;
    }
    if (dots.length > 0) {
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === slideActual);
        });
    }
}

function cambiarOferta(direccion) {
    slideActual += direccion;
    if (slideActual >= totalSlides) slideActual = 0;
    if (slideActual < 0) slideActual = totalSlides - 1;
    actualizarSlider();
}

function mostrarOferta(index) {
    slideActual = index;
    actualizarSlider();
}

if (container && slides.length > 0) {
    actualizarSlider();
    setInterval(() => cambiarOferta(1), 4000);
}


// =================================================================
// 3. LÓGICA DE LA API (SIN CAMBIOS)
// =================================================================

async function obtenerProductos() {
    try {
        const resp = await fetch(API_URL);
        if (!resp.ok) {
            throw new Error(`Error en la solicitud GET: ${resp.status} ${resp.statusText}`);
        } else {
            console.log("trajo la wea");
        }
        return await resp.json();
    } catch (error) {
        console.error('Fallo al obtener la lista de productos. CORS o API no disponible:', error.message);
        return null; 
    }
}


// =================================================================
// 4. LÓGICA DEL CARRITO (SIN CAMBIOS)
// =================================================================

function guardarCarrito() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

function renderCarrito() {
    let totalItems = 0;
    let subtotal = 0;
    
    if (listaCarrito) listaCarrito.innerHTML = ''; 
    
    carrito.forEach((item, index) => { 
        totalItems += item.cantidad;
        subtotal += item.precio * item.cantidad;
        
        if (listaCarrito) {
            listaCarrito.innerHTML += `
                <li class="item-carrito">
                    <span>${item.nombre} (x${item.cantidad})</span>
                    <span>$${(item.precio * item.cantidad).toFixed(2)}</span>
                    <button class="btn-eliminar-item" onclick="borrarProductoPorIndice(${index})">❌</button>
                </li>
            `;
        }
    });

    if (carrito.length === 0 && listaCarrito) {
        listaCarrito.innerHTML = '<li class="carrito-vacio-mensaje">El carrito está vacío.</li>';
    }

    if (contadorCarrito) {
        contadorCarrito.textContent = totalItems;
    }
    if (carritoSubtotal) {
        carritoSubtotal.textContent = `$${subtotal.toFixed(2)}`;
    }
    if (carritoTotal) {
        carritoTotal.textContent = `$${subtotal.toFixed(2)}`;
    }
}

function agregarAlCarrito(idProducto) {
    const productoAñadir = productos.find(p => p.id === idProducto);
    
    if (!productoAñadir) {
        console.error(`Producto con ID ${idProducto} no encontrado en la lista principal.`);
        return;
    }

    const itemExistente = carrito.find(item => item.id === idProducto);

    if (itemExistente) {
        itemExistente.cantidad += 1;
    } else {
        carrito.push({
            id: productoAñadir.id,
            nombre: productoAñadir.nombre,
            precio: productoAñadir.precio,
            cantidad: 1
        });
    }

    guardarCarrito(); 
    renderCarrito(); 
    console.log(`Producto ${productoAñadir.nombre} añadido al carrito.`);
}
window.agregarAlCarrito = agregarAlCarrito; 

function borrarProductoPorIndice(index) {
    if (index >= 0 && index < carrito.length) {
        const nombreProducto = carrito[index].nombre;
        carrito.splice(index, 1);
        
        guardarCarrito();
        renderCarrito(); 
        
        alert(`❌ ${nombreProducto} eliminado del carrito.`);
    }
}
window.borrarProductoPorIndice = borrarProductoPorIndice;

function vaciarCarrito() {
    if (carrito.length === 0) {
        alert('El carrito ya está vacío.');
        return;
    }
    if (!confirm('¿Estás seguro de que quieres vaciar todo el carrito?')) {
        return;
    }
    
    carrito = [];
    guardarCarrito();
    renderCarrito(); 

    if (carritoDesplegable && carritoDesplegable.classList.contains('show')) {
        carritoDesplegable.classList.remove('show');
    }
    alert('✅ Carrito vaciado completamente.');
}
window.vaciarCarrito = vaciarCarrito;


// =================================================================
// 5. RENDERIZADO Y FILTRADO (MODIFICADAS)
// =================================================================

function crearTarjetaProducto(producto) {
    
    // --- LÓGICA DE IMAGEN MANTENIDA INTACATA ---
    const imagenUrlDesdeAPI = producto.imagenURL; 
    const baseUrl = API_URL.substring(0, API_URL.lastIndexOf('/'));
    
    let imageUrl;
    
    if (imagenUrlDesdeAPI && (imagenUrlDesdeAPI.startsWith('data') || imagenUrlDesdeAPI.startsWith('https'))) {
        imageUrl = imagenUrlDesdeAPI;
    } else if (imagenUrlDesdeAPI && imagenUrlDesdeAPI.startsWith('/')) {
        const origin = new URL(API_URL).origin; 
        imageUrl = origin + imagenUrlDesdeAPI;
    } else if (imagenUrlDesdeAPI) {
        imageUrl = `${baseUrl}/${imagenUrlDesdeAPI}`;
    } else {
        imageUrl = 'https://via.placeholder.com/1x1.png'; 
    }
    // --- FIN DE LÓGICA DE IMAGEN ---

    const tarjeta = document.createElement('div');
    tarjeta.classList.add('producto-card'); 
    tarjeta.setAttribute('data-id', producto.id);
    tarjeta.setAttribute('data-categoria', (producto.categoria || '').toLowerCase());
    
    // Agregamos el atributo TACC para la UI (opcional)
    if (producto.conTacc === false || producto.taccFree === true) {
        tarjeta.classList.add('sin-tacc');
    }

    tarjeta.innerHTML = `
        <img 
            src="${imageUrl}" 
            alt="${producto.nombre}" 
            onerror="this.src='https://via.placeholder.com/250x150?text=Imagen+no+disponible'" 
        />
        <div class="contenido">
            <h3>${producto.nombre}</h3>
            ${(producto.conTacc === false || producto.taccFree === true) ? '<span class="label-tacc">✨ Sin TACC</span>' : ''}
            <p class="descripcion">${producto.descripcion || ''}</p>
            <div class="precio">$${parseFloat(producto.precio).toFixed(2)}</div>
            <div class="likes">${producto.likes || 0} likes</div> 
            
            <button class="btn-agregar" onclick="agregarAlCarrito(${producto.id})">
                Agregar al Carrito
            </button>
        </div>
    `;

    return tarjeta;
}


/**
 * Filtra y renderiza productos. Ahora soporta filtro por texto, por categoría y por TACC.
 * @param {Array<Object>} [productosParaRenderizar] - Lista opcional de productos ya filtrados (ej: por texto).
 * @param {string} [filtroCategoria] - Categoría para filtrar (ej: 'dulces').
 * @param {boolean} [sinTacc] - Si es true, filtra solo productos sin TACC.
 */
async function cargarProductosCliente(productosParaRenderizar = null, filtroCategoria = null, sinTacc = false) {
    if (!gridProductos) return;
    
    gridProductos.innerHTML = 'Cargando productos...';

    // 1. Obtener la lista base (o usar la ya filtrada por el buscador)
    let listaBase = productosParaRenderizar;

    if (!listaBase) {
        const listaObtenida = await obtenerProductos();
        
        if (listaObtenida) {
            productos.splice(0, productos.length, ...listaObtenida);
            listaBase = productos;
        } else {
            gridProductos.innerHTML = '<p>Lo sentimos, no hay productos disponibles en este momento.</p>';
            return;
        }
    }

    // 2. Aplicar el filtro de categoría
    let listaIntermedia = listaBase;
    
    if (filtroCategoria && filtroCategoria !== 'todos') {
        listaIntermedia = listaBase.filter(producto => 
            (producto.categoria || '').toLowerCase() === filtroCategoria
        );
    }
    
    // 3. Aplicar el filtro SIN TACC
    let listaFinal = listaIntermedia;
    
    if (sinTacc) {
        // Asumo que el campo booleano es 'conTacc' (true=con TACC, false=sin TACC) o 'taccFree' (true=sin TACC)
        listaFinal = listaIntermedia.filter(producto => 
            producto.conTacc === false || producto.taccFree === true 
        );
    }


    // 4. Renderizar
    gridProductos.innerHTML = ''; 

    if (listaFinal.length > 0) {
        listaFinal.forEach(producto => {
            const tarjetaElemento = crearTarjetaProducto(producto);
            gridProductos.appendChild(tarjetaElemento);
        });
    } else {
        gridProductos.innerHTML = '<p>No se encontraron productos que coincidan con los filtros aplicados.</p>';
    }
}

/**
 * Filtra el listado de productos basándose en el término de búsqueda.
 * (Actualizada para respetar el filtro TACC activo)
 * @param {string} termino - El texto ingresado en el input de búsqueda.
 */
function filtrarProductosPorTexto(termino) {
    const terminoNormalizado = termino.trim().toLowerCase();
    let productosFiltrados;

    if (!terminoNormalizado) {
        productosFiltrados = productos; 
    } else {
        productosFiltrados = productos.filter(producto => 
            producto.nombre.toLowerCase().includes(terminoNormalizado) ||
            (producto.descripcion && producto.descripcion.toLowerCase().includes(terminoNormalizado))
        );
    }
    // Llama a la función de renderizado aplicando el filtro TACC activo
    cargarProductosCliente(productosFiltrados, null, filtroTaccActivo); 
}

/**
 * Filtra productos por categoría.
 * (Actualizada para respetar el filtro TACC activo)
 * @param {string} categoria - El valor del atributo data-filtro del botón.
 */
function filtrarProductosPorCategoria(categoria) {
    if (busquedaInput) busquedaInput.value = '';
    
    // El filtro de categoría se aplica dentro de cargarProductosCliente, respetando el filtro TACC activo
    cargarProductosCliente(productos, categoria, filtroTaccActivo); 
}

/**
 * Activa o desactiva el filtro Sin TACC y rerenderiza.
 * (NUEVA FUNCIÓN)
 */
function filtrarProductosPorTacc() {
    // 1. Invertir el estado del filtro
    filtroTaccActivo = !filtroTaccActivo;
    
    // 2. Limpiar la búsqueda por texto
    if (busquedaInput) busquedaInput.value = '';
    
    // 3. Desactivar todos los filtros de categoría de botón
    if (filtroCategoriasBotones) {
        filtroCategoriasBotones.querySelectorAll('.btn-filtro').forEach(b => {
            b.classList.remove('active');
        });
        // Si no está activo, activamos el botón "Todos"
        if (!filtroTaccActivo) {
            const botonTodos = filtroCategoriasBotones.querySelector('[data-filtro="todos"]');
            if (botonTodos) botonTodos.classList.add('active');
        }
    }
    
    // 4. Renderizar la lista completa (productos) con el filtro TACC aplicado
    cargarProductosCliente(productos, 'todos', filtroTaccActivo); 
    
    // 5. Opcional: Actualizar el botón TACC para mostrar su estado
    const btnTacc = document.getElementById('btn-filtro-tacc'); // Asumo que tienes un botón con este ID
    if (btnTacc) {
        btnTacc.classList.toggle('active', filtroTaccActivo);
        btnTacc.textContent = filtroTaccActivo ? 'Sin TACC' : 'Con TACC'; 
        
    }
}
window.filtrarProductosPorTacc = filtrarProductosPorTacc;


// =================================================================
// 6. INICIALIZACIÓN (MODIFICADA)
// =================================================================

document.addEventListener('DOMContentLoaded', () => {
    // 1. Cargar todos los productos
    cargarProductosCliente(); 
    
    // 2. Cargar el estado inicial del carrito
    renderCarrito(); 

    // 3. Configurar el evento de búsqueda por texto
    if (busquedaInput) {
        busquedaInput.addEventListener('input', (e) => {
            filtrarProductosPorTexto(e.target.value);
        });
    }
    
    // 4. Configurar el evento de filtrado por botones de categoría
    if (filtroCategoriasBotones) {
        filtroCategoriasBotones.addEventListener('click', (e) => {
            const boton = e.target.closest('.btn-filtro');
            if (boton) {
                const categoria = boton.getAttribute('data-filtro');
                filtrarProductosPorCategoria(categoria);

                // Manejar la clase 'active'
                filtroCategoriasBotones.querySelectorAll('.btn-filtro').forEach(b => {
                    b.classList.remove('active');
                });
                boton.classList.add('active');
            }
        });
    }
});

function mostrarCarrito() {
    carritoDesplegable.classList.toggle('show');


    if (carritoDesplegable.classList.contains('show')) {
        document.addEventListener('click', cerrarCarritoSiClicFuera);
    } else {
        document.removeEventListener('click', cerrarCarritoSiClicFuera);
    }
}

function cerrarCarritoSiClicFuera(event) {
    if (!event.target.closest('.carrito')) {
        carritoDesplegable.classList.remove('show');
        document.removeEventListener('click', cerrarCarritoSiClicFuera);
    }
}