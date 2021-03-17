const body = document.querySelector("body");
const header = document.querySelector(".header");

const menuBtn = document.querySelector(".header__btn");
const mobileNav = document.querySelector(".header__mobile-nav");


menuBtn.addEventListener("click", () => {
    mobileNav.classList.toggle("mobile-nav-open");
    menuBtn.classList.toggle("header__btn-close");

    body.classList.toggle("stop-scrolling");
});
