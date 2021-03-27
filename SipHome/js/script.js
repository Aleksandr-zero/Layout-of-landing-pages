const body = document.querySelector("body");

let widtwWindowScroll = innerWidth - body.offsetWidth;
let blocksStopScrolling = document.querySelectorAll(".lock-padding");
let timeoutTransition = 200;


// block - header
const header = document.querySelector(".header");
const navLinkItems = header.querySelectorAll(".header__content-nav-item-link")
const navLinkItemLast = navLinkItems[navLinkItems.length - 1];

const headerBtnMenu = document.querySelector(".header__content-back-btn-menu");


// block - mobile-nav
const mobileNav = document.querySelector(".mobile-nav");
const mobileNavContent = document.querySelector(".mobile-nav__content");


// block - intro
const intro = document.querySelector(".intro");
const btnMenuClose = document.querySelector(".mobile-nav__content-back-btn-close");


// block - testimonials
const testimonialsContentItems = document.querySelector(".testimonials__content-items");
const testimonialsContentItem = document.querySelector(".testimonials__content-item");
const testimonialsContentItemsCount = document.querySelectorAll(".testimonials__content-item");
const testimonialsContentItemLast = testimonialsContentItemsCount[testimonialsContentItemsCount.length - 1];

const testimonialsBtnPrev = document.querySelector(".testimonials-btn-prev");
const testimonialsBtnNext = document.querySelector(".testimonials-btn-next");

const testimonialsBtnsPoints = document.querySelectorAll(".testimonials__content-btn");
const testimonialsBtnPoint_1 = document.querySelector("#testimonials-content-btn-1");
const testimonialsBtnPoint_2 = document.querySelector("#testimonials-content-btn-2");
const testimonialsBtnPoint_3 = document.querySelector("#testimonials-content-btn-3");
const testimonialsBtnPoint_4 = document.querySelector("#testimonials-content-btn-4");


// block - contact
const contactSelectBox = document.querySelector(".contact__content-form-back-select-box");
const contactSelectBoxContainer = document.querySelector(".contact__content-form-options-container"); 

const contactSelectedBox = document.querySelector(".contact__content-form-selected");
const contactSelectBoxOptions = document.querySelectorAll(".contact__content-form-option");


// block - header and intro
window.addEventListener("scroll", () => {

    if (pageYOffset >= 100) {
        header.classList.add("header-active");
        header.classList.add("lock-padding");

        mobileNavContent.classList.add("mobile-nav-content-active");

        intro.classList.add("intro-active");
        navLinkItemLast.classList.add("header__content-nav-item-link-pass");

        blocksStopScrolling = document.querySelectorAll(".lock-padding");
    
    } else {
        header.classList.remove("header-active");
        header.classList.remove("lock-padding");

        mobileNavContent.classList.remove("mobile-nav-content-active");

        intro.classList.remove("intro-active");
        navLinkItemLast.classList.remove("header__content-nav-item-link-pass");

        blocksStopScrolling = document.querySelectorAll(".lock-padding");
    };
});

headerBtnMenu.addEventListener("click", () => {
    mobileNav.classList.add("mobile-nav-active");

    for (let index = 0; index < blocksStopScrolling.length; index++) {
        const elementLock = blocksStopScrolling[index];
        elementLock.style.paddingRight = widtwWindowScroll + "px";
        console.log(1);
    };

    body.style.paddingRight = widtwWindowScroll + "px";
    body.classList.add("body-pass");
});


// block - mobile-nav
btnMenuClose.addEventListener("click", () => {
    mobileNav.classList.remove("mobile-nav-active");

    setTimeout(() => {

        for (let index = 0; index < blocksStopScrolling.length; index++) {
            const elementLock = blocksStopScrolling[index];
            elementLock.style.paddingRight = "0px";
        };

        body.style.paddingRight = "0px";
        body.classList.remove("body-pass");

    }, timeoutTransition * 2);
});


// block - testimonials
let positionLeft = 0;
let positionLeftPoint = 0;

let positionPressedFirstScore = 1;
let positionScore = 0;
let positionScorePoint = 0;

let widthTestimonialsContentItem = testimonialsContentItem.offsetWidth;
let marginRightTestimonialsContentItem = getComputedStyle(testimonialsContentItem).marginRight;
marginRightTestimonialsContentItem = Number(marginRightTestimonialsContentItem.replace("px", ""));

checkResiveWidthWindow()
window.addEventListener("resize", () => { checkResiveWidthWindow() });

function checkResiveWidthWindow() {
    if (innerWidth <= 840) {
        testimonialsContentItemLast.classList.add("testimonials-content-item-pass");
    } else {
        testimonialsContentItemLast.classList.remove("testimonials-content-item-pass");
    };
};

testimonialsBtnPrev.addEventListener("click", () => {
    pressedBtn(position = widthTestimonialsContentItem,
               marginRight = marginRightTestimonialsContentItem,
               score = -1,
               scorePoint = -1);
});

testimonialsBtnNext.addEventListener("click", () => {
    pressedBtn(position = -widthTestimonialsContentItem,
               marginRight = -marginRightTestimonialsContentItem,
               score = 1,
               scorePoint = 1);
});

function pressedBtn(position, marginRight, score, scorePoint) {
    positionLeft += position;
    positionLeft += marginRight;

    testimonialsContentItems.style.left = positionLeft + "px";

    positionScore += score;
    positionScorePoint += scorePoint;

    testimonialsBtnsPoints.forEach( (btn) => {
        if (btn.classList.contains("testimonials-btn-active")) {
            btn.classList.remove("testimonials-btn-active");

            testimonialsBtnsPoints[positionScore].classList.add("testimonials-btn-active");
        };
    });

    checkPressedBtn();
};


testimonialsBtnPoint_1.addEventListener("click", () => {
    pressedBtnPoint(positionLeft = 0, positionScore = 0, btnPoint = testimonialsBtnPoint_1);
});

testimonialsBtnPoint_2.addEventListener("click", () => {
    pressedBtnPoint(positionLeft = -(widthTestimonialsContentItem + marginRightTestimonialsContentItem),
                    positionScore = 1,
                    btnPoint = testimonialsBtnPoint_2);
});

testimonialsBtnPoint_3.addEventListener("click", () => {
    pressedBtnPoint(positionLeft = -(widthTestimonialsContentItem + marginRightTestimonialsContentItem)*2,
                    positionScore = 2,
                    btnPoint = testimonialsBtnPoint_3);
});

testimonialsBtnPoint_4.addEventListener("click", () => {
    pressedBtnPoint(positionLeft = -(widthTestimonialsContentItem + marginRightTestimonialsContentItem)*3,
                    positionScore = 3,  
                    btnPoint = testimonialsBtnPoint_4);
});

function pressedBtnPoint(positionLeft, positionScore, btnPoint) {
    testimonialsContentItems.style.left = positionLeft + "px";

    positionScorePoint = positionScore;

    testimonialsBtnsPoints.forEach( (btn) => {
        if (btn.classList.contains("testimonials-btn-active")) {
            btn.classList.remove("testimonials-btn-active");

            btnPoint.classList.add("testimonials-btn-active");
        };
    });

    checkPressedBtn();
};


function checkPressedBtn() {
    if (positionScore == 0 || positionScorePoint == 0) {
        testimonialsBtnPrev.classList.remove("testimonials-content-items-btn-active");
        testimonialsBtnNext.classList.add("testimonials-content-items-btn-active")
    }

    else if(positionScore == 3 || positionScorePoint == 3) {
        testimonialsBtnNext.classList.remove("testimonials-content-items-btn-active");
        testimonialsBtnPrev.classList.add("testimonials-content-items-btn-active")

    } else {
        testimonialsBtnPrev.classList.add("testimonials-content-items-btn-active")
        testimonialsBtnNext.classList.add("testimonials-content-items-btn-active")
    }
};


// block - contact
contactSelectBox.addEventListener("click", () => {
    contactSelectBoxContainer.classList.toggle("contact-content-form-options-container-active");

    contactSelectBoxOptions.forEach( (item) => {
        item.addEventListener("click", () => {
            contactSelectedBox.innerHTML = item.querySelector("label").innerHTML;
            contactSelectBox.classList.remove("contact-content-form-options-container-active");
        });
    });
});
