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



/* CARRUSEL DE TESTIMONIOS - BUCLE INFINITO */

document.addEventListener("DOMContentLoaded", function () {
  const carrusel = document.querySelector(".carrusel-testimonios");
  if (!carrusel) return;

  const ventana = carrusel.querySelector(".carrusel-ventana");
  const pista = carrusel.querySelector(".carrusel-pista");
  const originales = Array.from(pista.querySelectorAll("img"));

  if (originales.length < 2) return;

  const TIEMPO_CARRUSEL = 2000;

  const primeraCopia = originales[0].cloneNode(true);
  const ultimaCopia = originales[originales.length - 1].cloneNode(true);

  primeraCopia.setAttribute("aria-hidden", "true");
  ultimaCopia.setAttribute("aria-hidden", "true");

  pista.insertBefore(ultimaCopia, pista.firstChild);
  pista.appendChild(primeraCopia);

  const imagenes = Array.from(pista.querySelectorAll("img"));

  let actual = 1;
  let temporizador = null;
  let inicioX = null;
  let inicioY = null;
  let animando = false;

  function ajustarAltura() {
    const imagen = imagenes[actual];
    if (!imagen) return;

    const altura = imagen.getBoundingClientRect().height;

    if (altura > 0) {
      ventana.style.height = altura + "px";
    }
  }

  function posicionar(conAnimacion) {
    pista.style.transition = conAnimacion
      ? "transform 0.5s ease"
      : "none";

    pista.style.transform =
      "translateX(-" + (actual * 100) + "%)";

    ajustarAltura();
  }

  function mover(direccion) {
    if (animando) return;

    animando = true;
    actual += direccion;
    posicionar(true);
  }

  function avanzar() {
    mover(1);
  }

  function retroceder() {
    mover(-1);
  }

  pista.addEventListener("transitionend", function (evento) {
    if (evento.target !== pista ||
        evento.propertyName !== "transform") return;

    if (actual === imagenes.length - 1) {
      actual = 1;
      posicionar(false);
    } else if (actual === 0) {
      actual = imagenes.length - 2;
      posicionar(false);
    }

    animando = false;
  });

  function detenerTemporizador() {
    if (temporizador !== null) {
      clearInterval(temporizador);
      temporizador = null;
    }
  }

  function iniciarTemporizador() {
    detenerTemporizador();

    temporizador = setInterval(function () {
      if (!document.hidden) {
        avanzar();
      }
    }, TIEMPO_CARRUSEL);
  }

  ventana.addEventListener("touchstart", function (evento) {
    if (evento.touches.length !== 1) return;

    inicioX = evento.touches[0].clientX;
    inicioY = evento.touches[0].clientY;
  }, { passive: true });

  ventana.addEventListener("touchend", function (evento) {
    if (inicioX === null || inicioY === null) return;

    const diferenciaX = evento.changedTouches[0].clientX - inicioX;
    const diferenciaY = evento.changedTouches[0].clientY - inicioY;

    inicioX = null;
    inicioY = null;

    if (
      Math.abs(diferenciaX) > 40 &&
      Math.abs(diferenciaX) > Math.abs(diferenciaY)
    ) {
      if (diferenciaX < 0) {
        avanzar();
      } else {
        retroceder();
      }

      iniciarTemporizador();
    }
  }, { passive: true });

  imagenes.forEach(function (imagen) {
    if (!imagen.complete) {
      imagen.addEventListener("load", ajustarAltura);
    }
  });

  window.addEventListener("resize", ajustarAltura);

  document.addEventListener("visibilitychange", function () {
    if (document.hidden) {
      detenerTemporizador();
    } else {
      iniciarTemporizador();
    }
  });

  posicionar(false);
  iniciarTemporizador();
});
