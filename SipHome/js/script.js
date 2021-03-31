// COMMON
const body = document.querySelector("body");

let widtwWindowScroll = innerWidth - body.offsetWidth;
let blocksStopScrolling = document.querySelectorAll(".lock-padding");
let timeoutTransition = 200;   // Милисекунды


// block - header
const header = document.querySelector(".header");
let heightHeader = header.offsetHeight;

const navLinkItems = header.querySelectorAll(".header__content-nav-item-link")
const navLinkItemLast = navLinkItems[navLinkItems.length - 1];

const linksHome = document.querySelectorAll(".link-home");
const linksFeatures = document.querySelectorAll(".link-features");
const linksServices = document.querySelectorAll(".link-services");
const linksContact = document.querySelectorAll(".link-contact");
const linksFaq = document.querySelectorAll(".link-faq");

const headerBtnMenu = document.querySelector(".header__content-back-btn-menu");


// block - mobile-nav
const mobileNav = document.querySelector(".mobile-nav");
const mobileNavContent = document.querySelector(".mobile-nav__content");

const mobileNavLinks = document.querySelectorAll(".mobile-nav-link");

const btnMenuClose = document.querySelector(".mobile-nav__content-back-btn-close");


// block - intro
const intro = document.querySelector(".intro");


// block - features
const features = document.querySelector(".features");


// block - services
const services = document.querySelector(".services");

const servicesItems = document.querySelector(".services__content-section-items");
const servicesItemCount = servicesItems.querySelectorAll(".services__content-section-item");

const servicesBtnsPoints = document.querySelectorAll(".services__content-btn");
const servicesBtnPoint_1 = document.querySelector("#services-content-btn-1");
const servicesBtnPoint_2 = document.querySelector("#services-content-btn-2");
const servicesBtnPoint_3 = document.querySelector("#services-content-btn-3");
const servicesBtnPoint_4 = document.querySelector("#services-content-btn-4");


// block - testimonials
const testimonials = document.querySelector(".testimonials");

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
const contact = document.querySelector(".contact");

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
    };

    body.style.paddingRight = widtwWindowScroll + "px";
    body.classList.add("body-pass");
});


// block - mobile-nav
btnMenuClose.addEventListener("click", () => { closeMobileNav(timeoutMultiplication = 2) });

for (let index = 0; index < mobileNavLinks.length; index++) {
    const mobileLink = mobileNavLinks[index];
    mobileLink.addEventListener("click", () => { closeMobileNav(timeoutMultiplication = 2.5) });
};

function add_deleteLockPadding() {
    for (let index = 0; index < blocksStopScrolling.length; index++) {
        const elementLock = blocksStopScrolling[index];
        elementLock.style.paddingRight = "0px";
    };

    body.style.paddingRight = "0px";
    body.classList.remove("body-pass");
}

function closeMobileNav(timeoutMultiplication) {
    mobileNav.classList.remove("mobile-nav-active");
    setTimeout(() => {
        add_deleteLockPadding()
    }, timeoutTransition * timeoutMultiplication);
}


// block - services
let widthItemServices = servicesItemCount[0].offsetWidth;
let positionScoreServices = 0;
let countForCenteringSliderServices = 0;
let sumUpForCenteringSliderServices = false;

servicesBtnPoint_1.addEventListener("click", () => {
    pressedBtnServices(position = 0, score = 0, countCentereing = 0);
});

servicesBtnPoint_2.addEventListener("click", () => {
    pressedBtnServices(position = -(widthItemServices + 20), score = 1, countCentereing = 5);
});

servicesBtnPoint_3.addEventListener("click", () => {
    pressedBtnServices(position = -(widthItemServices + 20)*2, score = 2, countCentereing = 7);
});

servicesBtnPoint_4.addEventListener("click", () => {
    pressedBtnServices(position = -(widthItemServices + 20)*3, score = 3, countCentereing = 9);
});

function pressedBtnServices(position, score, countCentereing) {

    if (sumUpForCenteringSliderServices) {
        countForCenteringSliderServices = countCentereing;
    } else {
        countForCenteringSliderServices = 0;
    };
    
    servicesItems.style.left = position + countForCenteringSliderServices + "px";

    positionScoreServices = score;
    
    chechPressedBtnPoint();
}

function chechPressedBtnPoint() {
    servicesBtnsPoints.forEach( (btn) => {
        if (btn.classList.contains("btn-point-acive")) {
            btn.classList.remove("btn-point-acive");

            servicesBtnsPoints[positionScoreServices].classList.add("btn-point-acive");
        };
    });
};


// block - testimonials
let positionLeft = 0;
let positionScoreTestimonials = 0;

let widthTestimonialsContentItem = testimonialsContentItem.offsetWidth;
let marginRightTestimonialsContentItem = getComputedStyle(testimonialsContentItem).marginRight;
marginRightTestimonialsContentItem = Number(marginRightTestimonialsContentItem.replace("px", ""));

let sumUpForCentering = false;

let subtractionPercentageScore_1 = 1;
let subtractionPercentageScore_2 = 1;
let multiplicationPercentage_forentering = 8.25;

let subtractionPercentage = 0;


function checkResiveWidthWindow() {

    // подсчитываем дополнительное расстояние и прибавляем к
    // positionLeft, для того чтобы отцентрировать слайдер
    let x = widthTestimonialsContentItem + marginRightTestimonialsContentItem;

    if (innerWidth <= 840 || innerWidth <= 600) {
        testimonialsContentItemLast.classList.add("testimonials-content-item-pass");
        sumUpForCentering = true;

        for (let index = 4; index < servicesItemCount.length; index++) {
            const servicesItem = servicesItemCount[index];
            servicesItem.classList.add("services-content-item-pass");
        };

        multiplicationPercentage_forentering = 8.25; 
        subtractionPercentage = x - (x - (x / 100 * multiplicationPercentage_forentering));

        testimonialsContentItems.style.left = subtractionPercentage + "px";

    } else {
        testimonialsContentItemLast.classList.remove("testimonials-content-item-pass");
        sumUpForCentering = false;

        for (let index = 4; index < servicesItemCount.length; index++) {
            const servicesItem = servicesItemCount[index];
            servicesItem.classList.remove("services-content-item-pass");
        };

        testimonialsContentItems.style.left = "0px";

        multiplicationPercentage_forentering = 0;
    };

    if (innerWidth <= 600) {
        multiplicationPercentage_forentering = 6;
        subtractionPercentage = x - (x - (x / 100 * multiplicationPercentage_forentering));

        testimonialsContentItems.style.left = subtractionPercentage + "px";
    };

    if (innerWidth <= 460) {
        countForCenteringSliderServices = 6;
        sumUpForCenteringSliderServices = true;
    };
};


checkResiveWidthWindow()
window.addEventListener("resize", () => { checkResiveWidthWindow() });

testimonialsBtnPrev.addEventListener("click", () => {
    pressedBtnTestimonials(position = widthTestimonialsContentItem,
               marginRight = marginRightTestimonialsContentItem,
               score = -1,
               scorePoint = -1);
});

testimonialsBtnNext.addEventListener("click", () => {
    pressedBtnTestimonials(position = -widthTestimonialsContentItem,
               marginRight = -marginRightTestimonialsContentItem,
               score = 1,
               scorePoint = 1);
});


function pressedBtnTestimonials(position, marginRight, score) {

    if (sumUpForCentering) {
        positionLeft += position + marginRight;

        if (subtractionPercentageScore_1 || subtractionPercentageScore_2) {
            positionLeft += subtractionPercentage;
            subtractionPercentageScore_1 = 0;
            subtractionPercentageScore_2 = 0;
        }

    } else {
        positionLeft += position;
        positionLeft += marginRight;
    }

    testimonialsContentItems.style.left = positionLeft + "px";

    positionScoreTestimonials += score;

    testimonialsBtnsPoints.forEach( (btn) => {
        if (btn.classList.contains("btn-point-acive")) {
            btn.classList.remove("btn-point-acive");

            testimonialsBtnsPoints[positionScoreTestimonials].classList.add("btn-point-acive");
        };
    });

    checkPressedBtn();
};


testimonialsBtnPoint_1.addEventListener("click", () => {
    pressedBtnPoint(positionLeft = 0, positionScorePoint = 0, btnPoint = testimonialsBtnPoint_1);
});

testimonialsBtnPoint_2.addEventListener("click", () => {
    pressedBtnPoint(positionLeft = -(widthTestimonialsContentItem + marginRightTestimonialsContentItem),
                    positionScorePoint = 1,
                    btnPoint = testimonialsBtnPoint_2);
});

testimonialsBtnPoint_3.addEventListener("click", () => {
    pressedBtnPoint(positionLeft = -(widthTestimonialsContentItem + marginRightTestimonialsContentItem)*2,
                    positionScorePoint = 2,
                    btnPoint = testimonialsBtnPoint_3);
});

testimonialsBtnPoint_4.addEventListener("click", () => {
    pressedBtnPoint(positionLeft = -(widthTestimonialsContentItem + marginRightTestimonialsContentItem)*3,
                    positionScorePoint = 3,  
                    btnPoint = testimonialsBtnPoint_4);
});

function pressedBtnPoint(positionLeft, positionScorePoint, btnPoint) {

    if (sumUpForCentering) {
        testimonialsContentItems.style.left = positionLeft + subtractionPercentage + "px";
        subtractionPercentageScore_2++;
    } else {
        testimonialsContentItems.style.left = positionLeft + "px";
    }

    positionScoreTestimonials = positionScorePoint;

    testimonialsBtnsPoints.forEach( (btn) => {
        if (btn.classList.contains("btn-point-acive")) {
            btn.classList.remove("btn-point-acive");

            btnPoint.classList.add("btn-point-acive");
        };
    });

    checkPressedBtn();
};


function checkPressedBtn() {
    if (positionScoreTestimonials == 0) {
        testimonialsBtnPrev.classList.remove("testimonials-content-items-btn-active");
        testimonialsBtnNext.classList.add("testimonials-content-items-btn-active")
    }

    else if(positionScoreTestimonials == 3) {
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


// COMMON

bruteForceLinks(
    arrayItemsLinks = [linksHome, linksFeatures, linksServices, linksContact, linksFaq],
    blockItems = [header, features, services, contact, testimonials]
)

function ScrollToElement(element) {
    window.scroll({
        left: 0,
        top: element.offsetTop - heightHeader,
        behavior: "smooth",
    })
};

function bruteForceLinks(arrayItemsLinks, blockItems) {
    let score = 0;

    for (let indexItem = 0; indexItem < arrayItemsLinks.length; indexItem++) {
        
        const itemsLinks = arrayItemsLinks[indexItem];

        for (let indexLink = 0; indexLink < itemsLinks.length; indexLink++) {
            const link = itemsLinks[indexLink];
            const blockItem = blockItems[score];

            link.addEventListener("click", () => {ScrollToElement(element = blockItem)});
        };

        score++;
    };
};
