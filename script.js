// Espera a que todo el contenido estÃ© cargado antes de aplicar el estilo
window.addEventListener("load", function() {
  const chatIconContainer = document.querySelector(".chat-icon-container");
  const chatIcon = document.querySelector(".chat-icon img");

  // Si no encuentra el Ã­cono, muestra un mensaje de error en consola
  if (!chatIconContainer || !chatIcon) {
    console.error("No se encontrÃ³ el elemento con la clase .chat-icon o .chat-icon-container.");
    return;
  }

  // Asegura que el contenedor se mantenga siempre fijo al desplazarse
  chatIconContainer.style.position = "fixed";
  chatIconContainer.style.bottom = "2px"; // Espacio desde el borde inferior
  chatIconContainer.style.right = "8px";  // Espacio desde el borde derecho
  chatIconContainer.style.zIndex = "100";   // Asegura que estÃ© en la capa superior

  // Ajusta el tamaÃ±o del Ã­cono (90% mÃ¡s pequeÃ±o)
  chatIcon.style.width = "61.5px";  // Ajusta el tamaÃ±o aquÃ­
  chatIcon.style.height = "61.5px"; // Ajusta el tamaÃ±o aquÃ­
  chatIcon.style.cursor = "pointer"; // Cambia el cursor al pasar sobre el Ã­cono
});


// Otras funciones o cÃ³digo aquÃ­...

document.addEventListener('DOMContentLoaded', function() {
    document.addEventListener('contextmenu', function(e) {
        e.preventDefault();
    });
});