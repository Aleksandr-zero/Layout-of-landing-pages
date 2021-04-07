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
checkResizeWindow();

window.addEventListener("resize", () => {
    checkResizeWindow();
    checkResiveWidthWindow();
});

function checkResizeWindow() {

    if (innerWidth <= 840) {

        for (let index = 4; index < servicesItemCount.length; index++) {
            const servicesItem = servicesItemCount[index];
            servicesItem.classList.add("services-content-item-pass");
        };


        let slider = document.querySelector('.slider');
        let sliderList = document.querySelector('.slider-list');
        let sliderTrack = document.querySelector('.slider-track');
        let slides = document.querySelectorAll('.slide');
        
        let slideWidth = slides[0].offsetWidth;
        let slideIndex = 0;
        
        let marginRightSlide = getComputedStyle(slides[0]).marginRight;
        marginRightSlide = Number(marginRightSlide.replace("px", ""));
        
        // число для центрироания слайдов
        let sumCenteringCount_1 = 0;
        let sumCenteringCount_2 = 0;
        

        // координаты, полученные при первом касании 
        let posInit = 0;
        let posX1 = 0;
        
        // разность posX1 и event.clientX. Будет считаться каждый раз при движении по экрану в swipeAction
        let posX2 = 0;
        
        let posY1 = 0;
        let posY2 = 0;
        
        let posFinal = 0;
        
        // переменные для отслеживания чтобы не скроллить вниз при захвате слайдера
        let isSwipe = true;
        let isScroll = true;
        
        
        // разрешает двигать слайдер
        let allowSwipe = true;
        let transition = true;
        
        let nextTrf = 0;
        let prevTrf = 0;
        
        let posThreshold = slides[0].offsetWidth * 0.35;
        let trfRegExp = /([-0-9.]+(?=px))/;


        add_deleteClassActive_Btn();


        // вешаем события клика на кнопки
        for (let index = 0; index < servicesBtnsPoints.length; index++) {
            const btn = services.querySelector(`#btn-slider-${index + 1}`);

            btn.addEventListener("click", () => {                
                pressedBtnSlider(
                    poisition = index * slideWidth,
                    score = index
                );
            });
        };

        function pressedBtnSlider(poisition, score) {
            sumCenteringCount_1 = marginRightSlide * score;
            sumCenteringCount_2 = marginRightSlide * score;

            sliderTrack.style.transform = `translate3d(-${poisition + sumCenteringCount_2}px, 0px, 0px)`;
            slideIndex = score;
            
            add_deleteClassActive_Btn();
        };

        if (transition) {
            sliderTrack.style.transition = 'transform .4s';
        };

        
        getEvent = function() {
            return (event.type.search('touch') !== -1) ? event.touches[0] : event;
        };
        
        
        // Продвигает слайдер
        slide = function() {
            if (transition) {
                sliderTrack.style.transition = 'transform .4s';
            };
        
            sliderTrack.style.transform = `translate3d(-${slideIndex * slideWidth + sumCenteringCount_1}px, 0px, 0px)`;
        };
        
        
        swipeStart = function() {
            let evt = getEvent();
        
            if (allowSwipe) {
         
                transition = true;
        
                nextTrf = (slideIndex + 1) * -slideWidth;
                prevTrf = (slideIndex - 1) * -slideWidth;
        
                // берем начальную позицию курсора по оси Х
                posInit = posX1 = evt.clientX;
                posY1 = evt.clientY;
        
                // убираем плавный переход, чтобы track двигался за курсором без задержки
                // т.к. он будет включается в функции slide()
                sliderTrack.style.transition = '';
        
                // и сразу начинаем отслеживать другие события на документе
                document.addEventListener('touchmove', swipeAction);
                document.addEventListener('touchend', swipeEnd);
        
                document.addEventListener('mousemove', swipeAction);
                document.addEventListener('mouseup', swipeEnd);
            };
        };
        
        
        swipeAction = function() {
        
            let evt = getEvent();
        
            // для более красивой записи возьмем в переменную текущее свойство transform
            let styleTransform = sliderTrack.style.transform;
        
            // считываем трансформацию с помощью регулярного выражения и сразу превращаем в число
            // Число показывающее сколько ты проскроллил слайдер
            let transform =+ styleTransform.match(trfRegExp)[0];
        
            posX2 = posX1 - evt.clientX;
            posX1 = evt.clientX;
        
            posY2 = posY1 - evt.clientY;
            posY1 = evt.clientY;
        
            if (!isSwipe && !isScroll) {
                let posY = Math.abs(posY2);
        
                if (posY > 7 || posX2 === 0) {
                    isScroll = true;
                    allowSwipe = false;
                }
        
                else if (posY < 7) {
                    isSwipe = true;
                };
            };
        
        
            if (isSwipe) {
        
                // запрешает двигать слайдер в левую сторону так как первый слайд
                if (slideIndex === 0) {
        
                    // запрешает двигать слайдер в левую сторону так как первый слайд
                    if (posInit < posX1) {
                        allowSwipe = false;
                        return;
                    };
                };
        
                // запрет ухода вправо на последнем слайде
                if (slideIndex === --slides.length) {
        
                    if (posInit > posX1) {
                        allowSwipe = false;
                        return;
                    };
                };
        
                if (posInit > posX1 && transform < nextTrf || posInit < posX1 && transform > prevTrf) {
                    reachEdge();
                    return;
                };
        
                sliderTrack.style.transform = `translate3d(${transform - posX2}px, 0px, 0px)`;
            };
        };
        
        
        swipeEnd = function() {
        
            // финальная позиция курсора
            posFinal = posInit - posX1;
        
            isScroll = false;
            isSwipe = false;
        
            document.removeEventListener('touchmove', swipeAction);
            document.removeEventListener('mousemove', swipeAction);
            document.removeEventListener('touchend', swipeEnd);
            document.removeEventListener('mouseup', swipeEnd);
        
         
            if (allowSwipe) {
        
                // возвращает false если мы не продвинули слайдер на половину ширины одного слайда
                if ( Math.abs(posFinal) > posThreshold ) {
        
                    // НАЗАД
                    if (posInit < posX1) {
                        slideIndex--;
                        sumCenteringCount_1 -= marginRightSlide;
                    } 
        
                    // ВПЕРЁД
                    if (posInit > posX1) {
                        slideIndex++;
                        sumCenteringCount_1 += marginRightSlide;
                    };
                };
        
                // если курсор двигался, то запускаем функцию переключения слайдов
                if (posInit !== posX1) {
                    allowSwipe = false;
                    slide();
                };
            }
        
            else {
                allowSwipe = true;
            }

            add_deleteClassActive_Btn();
        };
        
        
        // запрещает двигать слайдер если вышли за его пределы
        reachEdge = function() {
            transition = false;
            swipeEnd();
            allowSwipe = true;
        };


        function add_deleteClassActive_Btn() {
            for (let index = 0; index < servicesBtnsPoints.length; index++) {
                const btn = servicesBtnsPoints[index];

                if (btn.classList.contains("btn-point-acive")) {
                    btn.classList.remove("btn-point-acive");
                };

                servicesBtnsPoints[slideIndex].classList.add("btn-point-acive");
            };
        };
        
        
        sliderTrack.style.transform = 'translate3d(0px, 0px, 0px)';
        
        sliderTrack.addEventListener('transitionend', () => allowSwipe = true);
        slider.addEventListener('touchstart', swipeStart);
        slider.addEventListener('mousedown', swipeStart);
        
    } else {
        return;
    };
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
