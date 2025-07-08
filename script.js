document.addEventListener("DOMContentLoaded", () => {
  const iframe = document.getElementById("iframe");
  const slides = document.querySelectorAll(".slide");
  const slideContainer = document.getElementById("slideContainer");
  const infoBanner = document.querySelector(".info-banner");
  const titleElement = document.getElementById("title");
  const descriptionElement = document.getElementById("description");
  const btnLeft = document.querySelector(".nav.left");
  const btnRight = document.querySelector(".nav.right");

  const scrollAmount = 200;

  // Detectar si es un dispositivo táctil
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

  slides.forEach(slide => {
    slide.addEventListener("click", () => {
      const url = slide.getAttribute("data-url");
      const title = slide.getAttribute("data-title");
      const description = slide.getAttribute("data-description");

      iframe.src = url;
      titleElement.textContent = title;
      descriptionElement.textContent = description;

      // Mostrar info-banner en móviles
      if (isTouchDevice) {
        infoBanner.classList.add("visible");

        // Ocultar después de 5 segundos
        clearTimeout(window._hideBannerTimeout);
        window._hideBannerTimeout = setTimeout(() => {
          infoBanner.classList.remove("visible");
        }, 5000);
      }
    });
  });

  // Flechas de navegación
  btnLeft.addEventListener("click", () => {
    slideContainer.scrollBy({
      left: -scrollAmount,
      behavior: "smooth"
    });
  });

  btnRight.addEventListener("click", () => {
    slideContainer.scrollBy({
      left: scrollAmount,
      behavior: "smooth"
    });
  });
});
