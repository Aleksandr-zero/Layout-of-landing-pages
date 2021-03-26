// block - header
const header = document.querySelector(".header");


// block - intro
const intro = document.querySelector(".intro");


// block - testimonials
const testimonialsContentItems = document.querySelector(".testimonials__content-items");
const testimonialsContentItem = document.querySelector(".testimonials__content-item");
let widthTestimonialsContentItem = testimonialsContentItem.offsetWidth;

let marginRightTestimonialsContentItem = getComputedStyle(testimonialsContentItem).marginRight;
marginRightTestimonialsContentItem = Number(marginRightTestimonialsContentItem.replace("px", ""));

const testimonialsBtnPrev = document.querySelector(".testimonials-btn-prev");
const testimonialsBtnNext = document.querySelector(".testimonials-btn-next");

const testimonialsBtnsPoints = document.querySelectorAll(".testimonials__content-btn");
const testimonialsBtnPoint_1 = document.querySelector("#testimonials-content-btn-1");
const testimonialsBtnPoint_2 = document.querySelector("#testimonials-content-btn-2");
const testimonialsBtnPoint_3 = document.querySelector("#testimonials-content-btn-3");
const testimonialsBtnPoint_4 = document.querySelector("#testimonials-content-btn-4");


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


// block - testimonials
let positionLeft = 0;
let positionLeftPoint = 0;

let positionPressedFirstScore = 1;
let positionScore = 0;
let positionScorePoint = 0;

testimonialsBtnPrev.addEventListener("click", () => {
    pressedBtn(position = widthTestimonialsContentItem, marginRight = marginRightTestimonialsContentItem, score = -1);
});

testimonialsBtnNext.addEventListener("click", () => {
    pressedBtn(position = -widthTestimonialsContentItem, marginRight = -marginRightTestimonialsContentItem, score = 1);
});

function pressedBtn(position, marginRight, score) {
    positionLeft += position;
    positionLeft += marginRight;

    testimonialsContentItems.style.left = positionLeft + "px";

    positionScore += score;

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
    if (positionScore == 0) {
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
