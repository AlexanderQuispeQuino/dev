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

