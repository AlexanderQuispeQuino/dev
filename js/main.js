const tabs = document.querySelectorAll('[data-target]')
const tabContents = document.querySelectorAll('[data-content]') 

console.log(tabs);

tabs.forEach(tab =>{
    tab.addEventListener('click' , () =>{
        const target = document.querySelector(tab.dataset.target)
        
        tabContents.forEach(tabContent =>{
            tabContent.classList.remove('qualification-active')
        })

        target.classList.add('qualification-active')

        tabs.forEach(tab =>{
            tab.classList.remove('qualification-active')
        })
        tab.classList.add('qualification-active')
    })
})

// const observerOptions = {
//     root: null,
//     rootMargin: "0px",
//     threshold: 1.0
// };

// const observer = new IntersectionObserver((entries) =>{
//     entries.forEach((entry)=>{
//         if (entry.isIntersecting) {
//             entry.target.classList.add("animated");
//             observer.unobserve(entry.target);
//         }
//     });
// }, observerOptions);

// window.addEventListener("DOMContentLoaded",(e) => {
//     const sections = Array.from(document.querySelectorAll(".animar"));

//     for (let section of sections) {
//         observer.observe(section);
        
//     }
// });



// const observerOptions = {
//     root: null,
//     rootMargin: "0px",
//     threshold: 1.0
// };

const observer = new IntersectionObserver((entries, observer) =>{
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const animation = entry.target.getAttribute("data-animation");
            entry.target.classList.add(`${animation}-visible`);
            observer.unobserve(entry.target);
        }
    });
});


    const elements = document.querySelectorAll('[data-animation]');

    elements.forEach(element => {
        observer.observe(element); 
    })


// logica para el Formulario
    document.getElementById("sendButton").addEventListener("click", function () {
      // Obtiene los valores del formulario
      const name = document.getElementById("name").value.trim();
      const lastname = document.getElementById("lastname").value.trim();
      const email = document.getElementById("email").value.trim();
      const project = document.getElementById("project").value.trim();
      const message = document.getElementById("message").value.trim();

      // Validación básica
      if (!name || !lastname || !email || !project || !message) {
        alert("Por favor, completa todos los campos.");
        return;
      }

      // Crea el mensaje para WhatsApp
      const whatsappMessage = `
        Hola, mi nombre es ${name} ${lastname}.
        Mi correo es: ${email}.
        Estoy interesado/a en: ${project}.
        Mi mensaje es: ${message}.
      `.replace(/\s+/g, ' ').trim();

      // Número de teléfono de destino (cambiarlo por el tuyo)
      const phoneNumber = "51994441385"; // Cambia por tu número incluyendo el código de país

      // URL de WhatsApp
      const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(whatsappMessage)}`;

      // Redirige al usuario a WhatsApp
      window.open(whatsappURL, "_blank");
    });

