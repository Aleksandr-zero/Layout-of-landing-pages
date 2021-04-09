// COMMON
const body = document.querySelector("body");

let blocksLockPadding = document.querySelectorAll(".lock-padding");

let timeout = 200;


// block - header
const header = document.querySelector(".header");
const btnMenu = document.querySelector(".header__content-back-btn-menu");


// block - mobile-nav
const mobileNav = document.querySelector(".mobile-nav");


// block - intro
const intro = document.querySelector(".intro");


// block - traffic
const blockTraffic = document.querySelector(".traffic");


// block - header and mobile-nav
let pressedBtnMenu = 0;
let positionHeader = "top";

btnMenu.addEventListener("click", () => {

    mobileNav.classList.toggle("mobile-nav-acive");
    btnMenu.classList.toggle("header-btn-menu-active");

    if (positionHeader == "bottom") {
        header.classList.toggle("header-pass-shadow");
    };

    if (pressedBtnMenu) {
        setTimeout(() => {
            add_deleteStyleTopHeader(positionTop = -84);
            header.style.transition = `box-shadow ${timeout * 2}ms linear, top ${timeout * 2}ms`;

            openMibileNav();

        }, timeout * 2);

        pressedBtnMenu--;
    } else {
        header.style.transition = `box-shadow ${timeout * 2}ms linear, top 0s`;

        add_deleteStyleTopHeader(positionTop = 0);

        openMibileNav();

        pressedBtnMenu++;
    };
});

function openMibileNav() {
    add_deleteRightPadding();
    body.classList.toggle("body-pass");
    chechPositionHeader();
};

function add_deleteStyleTopHeader(positionTop) {
    if (positionHeader == "top") {
        header.style.top = positionTop + "px";
    };
};

function chechPositionHeader() {
    if (positionHeader == "top") {
        header.classList.toggle("header-active-pressed-btn");
    };
};

function add_deleteRightPadding() {
    let widthScroll = innerWidth - mobileNav.offsetWidth;

    for (let index = 0; index < blocksLockPadding.length; index++) {
        const item = blocksLockPadding[index];
        item.style.paddingRight = widthScroll + "px";
    };
};


// COMMON
window.addEventListener("scroll", () => {

    if (pageYOffset >= blockTraffic.offsetTop - blockTraffic.offsetHeight) {
        blockTraffic.classList.add("traffic-active");
    };

    if (pageYOffset >= 210) {
        header.classList.add("header-active");
        header.classList.add("lock-padding");
        header.style.top = "0px";
        positionHeader = "bottom";
        header.style.transition = `box-shadow ${timeout * 2}ms linear, top ${timeout * 2}ms`;

        intro.classList.add("intro-active");
    } else {
        header.classList.remove("header-active");
        header.classList.remove("lock-padding");
        header.style.top = "-84px";
        positionHeader = "top";

        intro.classList.remove("intro-active");
    };

    blocksLockPadding = document.querySelectorAll(".lock-padding");
});
