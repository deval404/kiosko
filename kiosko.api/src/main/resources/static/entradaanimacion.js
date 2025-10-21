// Este script se encarga de la animación de ScrollReveal para la página de Entrada.html
// Se ejecuta solo cuando el DOM (estructura HTML) está completamente cargado.

document.addEventListener('DOMContentLoaded', function() {
    // Es importante verificar que ScrollReveal esté cargado para evitar errores
    if (typeof ScrollReveal === 'undefined') {
        console.error('ScrollReveal no está cargado. Asegúrate de incluir la librería en tu HTML antes de este script.');
        return;
    }

    // Header: Aparece desde arriba suavemente
    ScrollReveal().reveal('.header-nav', { 
        delay: 200,      
        duration: 800,     
        distance: '20px',  
        origin: 'top'      
    });

    // Panel de Texto (Izquierda): Desliza desde la izquierda
    ScrollReveal().reveal('.hero-text-content', { 
        delay: 600,
        duration: 1200,
        distance: '80px',
        origin: 'left',
        easing: 'ease-in-out'
    });

    // Panel Visual (Derecha): Desliza desde la derecha
    ScrollReveal().reveal('.hero-visual-decor', { 
        delay: 600,
        duration: 1200,
        distance: '80px',
        origin: 'right',
        easing: 'ease-in-out'
    });

    // Botón de Administrador: Aparece con un pequeño zoom
    ScrollReveal().reveal('.admin-access-prominent', {
        delay: 1500,
        scale: 0.9, 
        duration: 800,
        opacity: 0,
        easing: 'ease-out'
    });
});