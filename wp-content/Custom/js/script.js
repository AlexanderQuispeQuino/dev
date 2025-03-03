// INICIO PARA EL TAB DE SECCION MI RESUMEN (TRABAJO Y EDUCACION)
const tabs = document.querySelectorAll("[data-target]");
const tabContents = document.querySelectorAll("[data-content]");

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const target = document.querySelector(tab.dataset.target);

    tabContents.forEach((tabContent) => {
      tabContent.classList.remove("qualification-active");
    });

    target.classList.add("qualification-active");

    tabs.forEach((tab) => {
      tab.classList.remove("qualification-active");
    });
    tab.classList.add("qualification-active");
  });
});

// FIN PARA EL TAB DE SECCION MI RESUMEN (TRABAJO Y EDUCACION)

// INICIO PARA LA SECCION PROYECTOS (CARGAR IMAGEN EN EL POPUP)
document.addEventListener("DOMContentLoaded", function () {
  const cards = document.querySelectorAll(".card-proyects"); // Selecciona TODAS las tarjetas
  const popup = document.querySelector(".popup-overlay");
  const popupImg = document.getElementById("popup-img");
  const closePopup = document.querySelector(".close-popup");

  // Detectar si es un dispositivo móvil
  function isMobile() {
    return /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  }
  // Recorremos todas las tarjetas
  cards.forEach((card) => {
    card.addEventListener("click", function () {
      let imgSrc = card.querySelector("img").src; // Obtiene la imagen de la tarjeta clicada
      popupImg.src = imgSrc; // Cambia la imagen del popup dinámicamente

      if (isMobile()) {
        imgSrc = imgSrc.replace("-card", "-359").replace(".webp", ".jpg"); // En móviles
      } else {
        imgSrc = imgSrc.replace("-card", ""); // En desktop
      }

      popupImg.src = imgSrc;
      popup.classList.add("active");
    });
  });

  // Cerrar el popup al hacer clic en la "X"
  closePopup.addEventListener("click", function () {
    popup.classList.remove("active");
  });

  // Cerrar el popup al hacer clic fuera de la imagen
  popup.addEventListener("click", function (event) {
    if (event.target === popup) {
      popup.classList.remove("active");
    }
  });
});

// FIN PARA LA SECCION PROYECTOS (CARGAR IMAGEN EN EL POPUP)

// INICIO PARA LA SECCION CONTACTO (FORMULARIO DE CONTACTO, VALIDACIONES)
document.getElementById("sendButton").addEventListener("click", function () {
  // Obtiene los valores del formulario
  const name = document.getElementById("form-field-nombre").value.trim();
  const lastname = document.getElementById("form-field-apellidos").value.trim();
  const email = document.getElementById("form-field-email").value.trim();
  const celular = document.getElementById("form-field-celular").value.trim();
  const message = document.getElementById("form-field-mensaje").value.trim();

  // Expresión regular para validar email
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Expresión regular para validar el celular (solo números, entre 9 y 15 dígitos)
  const celularPattern = /^\d{9,15}$/;

  // Validaciones
  if (!name) {
    alert("Por favor, ingresa tu nombre.");
    return;
  }
  if (!lastname) {
    alert("Por favor, ingresa tus apellidos.");
    return;
  }
  if (!email) {
    alert("Por favor, ingresa tu correo electrónico.");
    return;
  }
  if (!emailPattern.test(email)) {
    alert("Por favor, ingresa un correo electrónico válido.");
    return;
  }
  if (!celular) {
    alert("Por favor, ingresa tu número de celular.");
    return;
  }
  if (!celularPattern.test(celular)) {
    alert("El número de celular debe contener entre 9 y 15 dígitos numéricos.");
    return;
  }
  if (!message) {
    alert("Por favor, ingresa tu mensaje.");
    return;
  }

  // Crea el mensaje para WhatsApp
  const whatsappMessage = `
			Hola, mi nombre es ${name} ${lastname}.
			Mi correo es: ${email}.
			Mi número de celular es: ${celular}.
			Mi mensaje es: ${message}.
		`
    .replace(/\s+/g, " ")
    .trim();

  // Número de teléfono de destino (cambiarlo por el tuyo)
  const phoneNumber = "51994441385"; // Cambia por tu número incluyendo el código de país

  // URL de WhatsApp
  const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    whatsappMessage
  )}`;

  // Redirige al usuario a WhatsApp
  window.open(whatsappURL, "_blank");

  // Limpia los campos del formulario
  document.getElementById("form-field-nombre").value = "";
  document.getElementById("form-field-apellidos").value = "";
  document.getElementById("form-field-email").value = "";
  document.getElementById("form-field-celular").value = "";
  document.getElementById("form-field-mensaje").value = "";
});

// FIN PARA LA SECCION CONTACTO (FORMULARIO DE CONTACTO, VALIDACIONES)

// INICIO PARA TRACKING DE EVENTOS DE LOS BOTONES EN GOOGLE ANALYTICS
document.addEventListener("DOMContentLoaded", async function () {
  // Selección de botones a trackear
  const contactButton = document.querySelector(
    ".elementor-button[href='#contacto']"
  );
  const whatsappButton = document.querySelector(
    '.elementor-button-link[href*="wa.me"]'
  );
  const sendButton = document.querySelector("#sendButton");

  let userLocation = {
    country: "Desconocido",
    region: "Desconocido",
    city: "Desconocido",
  };

  // Obtener ubicación del usuario
  try {
    const response = await fetch("https://ipinfo.io/json?token=98dfe05a50b150");
    if (response.ok) {
      const data = await response.json();
      userLocation = {
        country: data.country || "Desconocido",
        region: data.region || "Desconocido",
        city: data.city || "Desconocido",
      };
    }
  } catch (error) {
    console.error("Error al obtener la ubicación:", error);
  }

  // Función para trackear eventos en Google Analytics
  function trackEvent(eventName, eventCategory, eventLabel, extraData = {}) {
    gtag("event", eventName, {
      event_category: eventCategory,
      event_label: eventLabel,
      ...extraData,
    });
  }

  // Trackeo del botón "¡Hablemos!"
  if (contactButton) {
    contactButton.addEventListener(
      "click",
      function () {
        trackEvent("click", "Botón", "¡Hablemos!");
      },
      { passive: true }
    );
  }

  // Trackeo del botón de WhatsApp con ubicación
  if (whatsappButton) {
    whatsappButton.addEventListener(
      "click",
      function () {
        trackEvent("whatsapp_click", "Interacción", window.location.href, {
          country: userLocation.country,
          region: userLocation.region,
          city: userLocation.city,
        });
      },
      { passive: true }
    );
  }

  // Trackeo del botón "Enviar Mensaje"
  if (sendButton) {
    sendButton.addEventListener(
      "click",
      function () {
        trackEvent("form_submit", "Formulario", "Enviar Mensaje", {
          country: userLocation.country,
          region: userLocation.region,
          city: userLocation.city,
        });
      },
      { passive: true }
    );
  }
});

// FIN PARA TRACKING DE EVENTOS DE LOS BOTONES EN GOOGLE ANALYTICS
