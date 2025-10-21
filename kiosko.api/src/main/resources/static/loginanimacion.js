// La animación del login ahora se maneja SÓLO con CSS,
// o si quieres la animación de opacidad, lo puedes dejar así:
document.querySelector(".login-container").style.opacity = "0"; // Aseguramos que inicie oculto

document.addEventListener('DOMContentLoaded', () => {
    // Las burbujas inician inmediatamente porque su animación está en CSS.

    // Animación de aparición del login
    const loginContainer = document.querySelector(".login-container");
    loginContainer.style.transition = "opacity 0.8s ease-out";
    loginContainer.style.opacity = "1";
    // Nota: El timeout de 200ms ya no es necesario, lo hacemos inmediatamente al cargar el DOM.
});


// Redirección al hacer login (puedes validar si querés)
document.getElementById("loginForm").addEventListener("submit", (e) => {
  e.preventDefault(); 
  window.location.href = "admiprueba.html"; // Aquí redireccionamos
});