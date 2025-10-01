const productos = [
  { id: 1, nombre: "Pan", descripcion: "Pan", precio: 2.5, categoria: "SIN TACC", imagen: "https://tse3.mm.bing.net/th/id/OIP.MXbx9GqgfdTTV3lWeqTp_QHaEK?rs=1&pid=ImgDetMain&o=7&rm=3", likes: 120 },
  { id: 2, nombre: "Chocolate Dubai", descripcion: "Chocolate", precio: 1.8, categoria: "dulces", imagen: "https://i5.walmartimages.com/seo/Dubai-Chocolate-Bar-Pistachio-11-3oz-Premium-Pistachio-Bar-16-Pieces-Bites-Shredded-Phyllo-Dough-Knafeh_84b7fc1d-9bb6-4f8a-af5b-8b4060c6bee9.24e8472fae2ff776e3bea93217d90c80.jpeg", likes: 200 },
  { id: 3, nombre: "Coca Cola", descripcion: "Bebida.", precio: 3.0, categoria: "bebidas", imagen: "https://www.coca-cola.com/content/dam/onexp/mx/es/brands/coca-cola/coca-cola-original/Product-Information-Section-Coca-Cola-Original.jpg", likes: 250 },
  { id: 4, nombre: "Papas Lays", descripcion: "Papas.", precio: 2.2, categoria: "snacks", imagen: "https://tse4.mm.bing.net/th/id/OIP.USUi3TWKkIqS-n2Uecu_KAHaHa?rs=1&pid=ImgDetMain&o=7&rm=3", likes: 180 },
  { id: 5, nombre: "Galletas Surtidas Diversión", descripcion: "Galletas.", precio: 4.0, categoria: "snacks", imagen: "https://tse4.mm.bing.net/th/id/OIP.aE332EnPXV6B-hCSkIcEvgHaHa?rs=1&pid=ImgDetMain&o=7&rm=3", likes: 90 },
  { id: 6, nombre: "Sprite", descripcion: "bebida", precio: 2.0, categoria: "bebidas", imagen: "https://cdn0.woolworths.media/content/wowproductimages/large/093187.jpg", likes: 75 },
  { id: 7, nombre: "Pan de Ajo", descripcion: "Pan de ajo crujiente y sabroso.", precio: 3.5, categoria: "SIN TACC", imagen: "https://images.unsplash.com/photo-1542831371-d531d36971e6?auto=format&fit=crop&w=800&q=80", likes: 110 },
  { id: 8, nombre: "Alfajor Rasta", descripcion: "Alfajor de chocolate.", precio: 2.8, categoria: "dulces", imagen: "https://http2.mlstatic.com/D_NQ_NP_866989-MLU71483131876_092023-O.webp", likes: 300 },
  { id: 9, nombre: "Agua Mineral Villavicencio", descripcion: "Agua mineral refrescante y pura.", precio: 1.5, categoria: "bebidas", imagen: "https://th.bing.com/th/id/OIP.EMF2hh1gnHgk6Bte52hewwHaHa?o=7rm=3&rs=1&pid=ImgDetMain&o=7&rm=3", likes: 60 },
  { id: 10, nombre: "Galletas Operas", descripcion: "Galletas.", precio: 2.0, categoria: "snacks", imagen: "https://tse2.mm.bing.net/th/id/OIP.VuYOR88A6mKElA51kYpvHgHaHa?rs=1&pid=ImgDetMain&o=7&rm=3", likes: 95 }  
];

let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
let isAdmin = JSON.parse(localStorage.getItem('isAdmin')) || false;

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

// Eliminamos las variables de las secciones que ya no manejaremos:
// const productosSection = document.getElementById('productos');
// const heroSection = document.getElementById('hero');
// Eliminamos las variables del modal de login:
// const modalLogin = document.getElementById('modal-login');
// const mensajeError = document.getElementById('mensaje-error');
// const formLogin = document.getElementById('form-login');

let productosFiltrados = [...productos];

// --- FUNCIONES DE MODO ADMIN (SOLO UI/LOCALSTORAGE) ---

function guardarLogin(estadoAdmin = false) {
  localStorage.setItem('isAdmin', JSON.stringify(estadoAdmin));
  isAdmin = estadoAdmin;
  actualizarUIlogin();
}

/**
 * Actualiza la UI del icono de Admin. 
 * El clic en el icono ahora dirige a app.html (mediante el HTML).
 */
function actualizarUIlogin() {
  if (isAdmin) {
    loginExito.textContent = '¡Modo Administrador Activo! (Clic para salir)';
    loginExito.classList.add('visible');
    if(adminIcono) {
      adminIcono.style.opacity = '1';
      adminIcono.title = 'Logout Admin';
    }
    console.log('Modo Admin: Acceso completo habilitado.');
  } else {
    loginExito.textContent = 'Modo Invitado (Login Admin)';
    loginExito.classList.remove('visible'); 
    if(adminIcono) {
      adminIcono.style.opacity = '0.7';
      adminIcono.title = 'Login Admin';
    }
  }
}

// --------------------------------------------------------
// --- FUNCIONES DE NAVEGACIÓN (ELIMINADAS/AJUSTADAS) ---
// --------------------------------------------------------

// Se eliminan 'mostrarProductos()' y 'volverInicio()' ya que la navegación 
// entre index.html y Entrada.html la manejan los enlaces <a> en el HTML.

// Se eliminan 'mostrarLogin()', 'cerrarLogin()' y 'window.onclick' 
// ya que el login ahora ocurre en app.html (página separada).


// --------------------------------------------------------
// --- LÓGICA DE CARRITO Y PRODUCTOS (MANTENIDA) ---
// --------------------------------------------------------

function calcularTotal() {
  return carrito.reduce((total, producto) => total + producto.precio, 0);
}

function renderizarCarrito() {
  if (carrito.length === 0) {
    listaCarrito.innerHTML = '<li class="carrito-vacio-mensaje">El carrito está vacío.</li>';
    carritoSubtotal.textContent = '$0.00';
    carritoTotal.textContent = '$0.00';
    return;
  }

  listaCarrito.innerHTML = '';
  carrito.forEach(producto => {
    const li = document.createElement('li');
    li.innerHTML = `
      <img src="${producto.imagen}" alt="${producto.nombre}" />
      <div style="flex-grow: 1;">
        <strong>${producto.nombre}</strong><br>
        <span>$${producto.precio.toFixed(2)}</span>
      </div>
      <button onclick="borrarProducto(${producto.id})" style="background: none; border: none; color: #ff4444; font-size: 1.2rem; cursor: pointer;">&times;</button>
    `;
    listaCarrito.appendChild(li);
  });

  const total = calcularTotal();
  carritoSubtotal.textContent = `$${total.toFixed(2)}`;
  carritoTotal.textContent = `$${total.toFixed(2)}`; 
}

function actualizarContadorCarrito() {
  contadorCarrito.textContent = carrito.length;
  renderizarCarrito(); 
}

function guardarCarrito() {
  localStorage.setItem('carrito', JSON.stringify(carrito));
}

function agregarAlCarrito(id) {
  const producto = productos.find(p => p.id === id);
  if (producto) {
    carrito.push({ ...producto }); 
    guardarCarrito();
    actualizarContadorCarrito();
    alert(`${producto.nombre} ha sido agregado al carrito.`);
  }
}

/**
 * Filtra la lista de productos basada en la categoría seleccionada por botón.
 * @param {string} categoria - El valor de data-filtro (ej: 'todos', 'dulces').
 */
function filtrarProductosPorBoton(categoria) {
    // 1. Filtrar el arreglo de productos por categoría
    if (categoria === 'todos') {
        productosFiltrados = [...productos];
    } else {
        productosFiltrados = productos.filter(p => p.categoria.toLowerCase() === categoria.toLowerCase());
    }
    
    // 2. Aplicar también el filtro de búsqueda de texto actual (si existe)
    filtrarProductos(); 
}


function filtrarProductos() {
  const termino = busquedaInput.value.toLowerCase();
  const productosAMostrar = productosFiltrados.filter(p => 
    p.nombre.toLowerCase().includes(termino) || 
    p.descripcion.toLowerCase().includes(termino)
  );
  gridProductos.innerHTML = '';
  if (productosAMostrar.length === 0) {
    gridProductos.innerHTML = '<p style="text-align:center; grid-column: 1 / -1; color: #777;">No se encontraron productos.</p>';
    return;
  }
  productosAMostrar.forEach(producto => {
    const productoDiv = document.createElement('div');
    productoDiv.className = 'producto';
    productoDiv.innerHTML = `
      <img src="${producto.imagen}" alt="${producto.nombre}" onerror="this.src='https://via.placeholder.com/250x150?text=Imagen+no+disponible'" />
      <div class="contenido">
        <h3>${producto.nombre}</h3>
        <p>${producto.descripcion}</p>
        <div class="precio">$${producto.precio.toFixed(2)}</div>
        <div class="likes">${producto.likes} likes</div>
        <button class="btn-agregar" onclick="agregarAlCarrito(${producto.id})">Agregar al Carrito</button>
      </div>
    `;
    gridProductos.appendChild(productoDiv);
  });
}

function mostrarCarrito() {
  carritoDesplegable.classList.toggle('show');
  renderizarCarrito(); 

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

function borrarProducto(idProducto) {
  const index = carrito.findIndex(producto => producto.id === idProducto); 

  if (index !== -1) {
    carrito.splice(index, 1);
    guardarCarrito();
    actualizarContadorCarrito();
    alert('Producto eliminado del carrito.');
    if (carritoDesplegable.classList.contains('show')) {
      renderizarCarrito();
    }
  }
}

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
  actualizarContadorCarrito(); 
  
  if (carritoDesplegable.classList.contains('show')) {
    carritoDesplegable.classList.remove('show');
  }
  
  alert('Carrito vaciado completamente.');
}

// --------------------------------------------------------
// --- LÓGICA DE INICIALIZACIÓN ---
// --------------------------------------------------------

document.addEventListener('DOMContentLoaded', () => {
    // Inicialización de funciones principales
    actualizarContadorCarrito();
    actualizarUIlogin(); 
    filtrarProductos();


    // Listener para botones de filtro
    if (filtroCategoriasBotones) {
        filtroCategoriasBotones.addEventListener('click', (e) => {
            const boton = e.target.closest('.btn-filtro');
            if (boton) {
                const categoria = boton.getAttribute('data-filtro');
                
                // 1. Aplicar filtro
                filtrarProductosPorBoton(categoria);

                // 2. Manejar la clase 'active' para resaltado visual
                filtroCategoriasBotones.querySelectorAll('.btn-filtro').forEach(b => {
                    b.classList.remove('active');
                });
                boton.classList.add('active');
            }
        });
    }
});

// Event listeners adicionales
busquedaInput.addEventListener('input', filtrarProductos);

// El evento 'hashchange' ya no es necesario aquí porque el index.html ya no oculta/muestra secciones.
// La navegación entre secciones de la misma página se hace con los enlaces de ancla (<a href="#productos">).
// window.addEventListener('hashchange', ... ) ELIMINADO

// Cerrar carrito al hacer scroll o resize
window.addEventListener('scroll', () => {
  if (carritoDesplegable.classList.contains('show')) {
    carritoDesplegable.classList.remove('show');
  }
});

// Logout automático después de inactividad
setTimeout(() => {
  if (isAdmin && confirm('Sesión admin expirada por inactividad. ¿Renovar?')) {
    console.log('Sesión admin renovada.');
  } else if (isAdmin) {
    guardarLogin(false);
    alert('Sesión admin cerrada por inactividad. Ahora en modo invitado.');
  }
}, 30 * 60 * 1000); // 30 minutos

// --------------------------------------------------------
// --- SLIDER DE OFERTAS (MANTENIDA) ---
// --------------------------------------------------------

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

setInterval(() => cambiarOferta(1), 4000);

if (container && slides.length > 0) {
  actualizarSlider();
}