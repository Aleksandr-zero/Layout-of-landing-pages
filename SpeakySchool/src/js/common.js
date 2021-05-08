// COMMON
const body = document.querySelector("body");
const intro = document.querySelector(".intro");

const timeout = 200;

let blocks_lockPadding = document.querySelectorAll(".lock-padding");


const add_deleteRightPadding = () => {
    let widtScroll = innerWidth - document.documentElement.clientWidth

    blocks_lockPadding.forEach((block) => {
        block.style.paddingRight = widtScroll + "px";
    });

    body.classList.toggle("body-pass");
    body.style.paddingRight = widtScroll + "px";
};


window.addEventListener("scroll", () => {
    if (pageYOffset >= 120 ) {
        header.classList.add("header-active-scroll");
    } else {
        header.classList.remove("header-active-scroll");
    };

    if (pageYOffset >= 220) {
        header.classList.add("header-active", 'lock-padding');
        intro.classList.add("intro-active");
    } else {
        header.classList.remove("header-active", 'lock-padding');
        intro.classList.remove("intro-active");
    };

    blocks_lockPadding = document.querySelectorAll(".lock-padding");
});
