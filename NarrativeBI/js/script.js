const body = document.querySelector("body");
const header = document.querySelector(".header");

let blockLockPadding = document.querySelectorAll(".lock-padding");
let rightPaddingCount = window.innerWidth - document.querySelector(".header__mobile-nav").offsetWidth;

let pressedCount = 0;
let timeout = 500;

const menuBtn = document.querySelector(".header__btn");
const mobileNav = document.querySelector(".header__mobile-nav");


menuBtn.addEventListener("click", () => {
    mobileNav.classList.toggle("mobile-nav-open");
    menuBtn.classList.toggle("header__btn-close");

    if (pressedCount == 0) {
        body.classList.toggle("stop-scrolling");

        for (let index = 0; index < blockLockPadding.length; index++) {
            const elementLock = blockLockPadding[index];
            elementLock.style.paddingRight = rightPaddingCount + "px";
            console.log(elementLock)
        };

        body.style.paddingRight = rightPaddingCount + "px"

        pressedCount++;

    } else {
        setTimeout(() => {
            for (let index = 0; index < blockLockPadding.length; index++) {
                const elementLock = blockLockPadding[index];
                elementLock.style.paddingRight = "0px";
            };

            body.style.paddingRight = "0px"
            body.classList.toggle("stop-scrolling");
        }, timeout)

        pressedCount--;
    }
});
