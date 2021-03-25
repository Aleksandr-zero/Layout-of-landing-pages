// block - header
const header = document.querySelector(".header");


// block - intro
const intro = document.querySelector(".intro");


// block - header and intro

window.addEventListener("scroll", () => {
    
    if (pageYOffset >= 100) {
        header.classList.add("header-active");
        intro.classList.add("intro-active");
    } else {
        header.classList.remove("header-active");
        intro.classList.remove("intro-active");
    };
});
