// COMMON
const btnBackHome = document.querySelector(".button-back-home");
const btnHome = document.querySelector(".button-home");

const body = document.querySelector("body");

const blocksLockPadding = document.querySelectorAll(".lock-padding");

let timeout = 200;


// block - header
const header = document.querySelector(".header");

const menuBtn = document.querySelector(".header__content-menu-btn");

const linksHeaderLoan = document.querySelectorAll(".nav-link-loan");
const linksHeaderBid = document.querySelectorAll(".nav-link-bid");
const linksHeaderAnswers = document.querySelectorAll(".nav-link-answers");

const navLinks = document.querySelectorAll(".nav-link");


// block - mobile nav
const mobileNav = document.querySelector(".mobile-nav");


// block - intro
const intro = document.querySelector(".intro");


// block - loan
const loan = document.querySelector(".loan");

const btnsSlider = document.querySelectorAll(".loan__content-btn-slider");


// block - bid
const bid = document.querySelector(".bid");



// block - answers
const answers = document.querySelector(".answers");

const itemsSectionAnswers = document.querySelectorAll(".answers__content-item-section");
const blocksItemAnswers =document.querySelectorAll(".answers__content-item");


// block - contact
const contactTitle = document.querySelector("#contact-title");


// block - footer
const footerSubText = document.querySelector("#footer-subtext");


// block - header
let lastScroll = 0;
const defaultOffset = 200;

let pressedMenuBtn = 0;

const scrollPosition = () => window.pageYOffset || document.documentElement.scrollTop;
const containHide = () => header.classList.contains("header-hide");

window.addEventListener('scroll', () => {
    if( scrollPosition() > lastScroll && !containHide() && scrollPosition() > defaultOffset) {
        //scroll down
        header.classList.add("header-hide");
    }
    else if( scrollPosition() < lastScroll && containHide()){
        //scroll up
        header.classList.remove("header-hide");
    }

    if (pageYOffset >= intro.offsetHeight) {
        btnBackHome.classList.add("button-home-active");
    } else {
        btnBackHome.classList.remove("button-home-active");
    }

    lastScroll = scrollPosition();
});

menuBtn.addEventListener("click", () => {
    mobileNav.classList.toggle("mobile-nav-active");
    header.classList.toggle("header-active");
    menuBtn.classList.toggle("header-content-menu-btn-acive");

    if (pressedMenuBtn) {
        setTimeout(() => {
            add_deleteRightPadding();
        }, timeout * 2);
        pressedMenuBtn--;
    } else {
        add_deleteRightPadding();
        pressedMenuBtn++;
    };
});

for (let index = 0; index < navLinks.length; index++) {
    const navLink = navLinks[index];
    navLink.addEventListener("click", () => {

        if (pressedMenuBtn) {
            mobileNav.classList.toggle("mobile-nav-active");
            header.classList.toggle("header-active");
            menuBtn.classList.toggle("header-content-menu-btn-acive");

            setTimeout(() => {
                add_deleteRightPadding();
            }, timeout * 2);

            pressedMenuBtn--;
        };
    });
};

function add_deleteRightPadding() {
    let widthScroll = innerWidth - mobileNav.offsetWidth;

    for (let index = 0; index < blocksLockPadding.length; index++) {
        const block = blocksLockPadding[index];
        block.style.paddingRight = widthScroll + "px";
    };

    body.style.paddingRight = widthScroll + "px";
    body.classList.toggle("body-pass");
};


// block - bid
window.addEventListener("DOMContentLoaded", () => {

    function setCursorPosition(pos, elem) {
        elem.focus();

        if (elem.setSelectionRange) {
            elem.setSelectionRange(pos, pos);
        }

        else if (elem.createTextRange) {
            let range = elem.createTextRange();
            range.collapse(true);
            range.moveEnd("character", pos);
            range.moveStart("character", pos);
            range.select();
        };
    };

    function mask() {

        let matrix = this.defaultValue;

        let i = 0,
            def = matrix.replace(/\D/g, ""),
            val = this.value.replace(/\D/g, "");
            def.length >= val.length && (val = def);

        matrix = matrix.replace(/[_\d]/g, function() {
            return val.charAt(i++) || "_";
        });
        
        this.value = matrix;

        i = matrix.lastIndexOf(val.substr(-1));

        i < matrix.length && matrix != this.defaultValue ? i++ : i = matrix.indexOf("_");

        setCursorPosition(i, this);
    };

    let input = document.querySelector(".input-phone");
    input.addEventListener("input", mask, false);
});


// block - answers
itemsSectionAnswers.forEach( (item) => {
    item.addEventListener("click", () => {

        const parent = item.parentNode;

        if(parent.classList.contains("answers-content-item-active")) {
            parent.classList.remove("answers-content-item-active");

        } else {
            blocksItemAnswers.forEach( (child) => child.classList.remove("answers-content-item-active"));

            parent.classList.add("answers-content-item-active");
        };
    });
});


// block - contact, loan and footer
let swipe = false;

checkResizeWindow();

window.addEventListener("resize", checkResizeWindow);

function checkResizeWindow() {
    if (innerWidth <= 768) {
        contactTitle.innerHTML = "Контакты автоломбарда";
    } else if (innerWidth > 769) {
        contactTitle.innerHTML = "Контакты";
    };

    if (innerWidth <= 670) {
        swipe = true;

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
        for (let index = 0; index < btnsSlider.length; index++) {
            const btn = loan.querySelector(`#btn-slider-${index + 1}`);

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
            sliderTrack.style.transition = 'transform 0.4s';
        };

        
        getEvent = function() {
            return (event.type.search('touch') !== -1) ? event.touches[0] : event;
        };
        
        
        // Продвигает слайдер
        slide = function() {
            if (transition) {
                sliderTrack.style.transition = 'transform 0.4s';
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
                if (swipe) {
                    document.addEventListener('touchmove', swipeAction);
                    document.addEventListener('touchend', swipeEnd);
            
                    document.addEventListener('mousemove', swipeAction);
                    document.addEventListener('mouseup', swipeEnd);
                };
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
            for (let index = 0; index < btnsSlider.length; index++) {
                const btn = btnsSlider[index];

                if (btn.classList.contains("btn-slider-active")) {
                    btn.classList.remove("btn-slider-active");
                };

                btnsSlider[slideIndex].classList.add("btn-slider-active");
            };
        };
        
        
        sliderTrack.style.transform = 'translate3d(0px, 0px, 0px)';
        sliderList.classList.add('slider-list-grab');
        
        sliderTrack.addEventListener('transitionend', () => allowSwipe = true);
        slider.addEventListener('touchstart', swipeStart);
        slider.addEventListener('mousedown', swipeStart);
    } else {
        swipe = false;
    }

    if (innerWidth <= 620) {
        footerSubText.innerHTML = "Автоломбард «Залог Недвижимости» © 2020 год";
    } else if (innerWidth > 621) {
        footerSubText.innerHTML = "«Залог Недвиимости» © 2020 год";
    };
};


// COMMON
function ScrollToElement(element) {
    window.scroll({
        left: 0,
        top: element.offsetTop,
        behavior: "smooth",
    });
};

btnHome.addEventListener("click", () => { ScrollToElement(element = header); });

bruteForceLinks(
    arrayItemsLinks = [linksHeaderLoan, linksHeaderBid, linksHeaderAnswers],
    blockItems = [loan, bid, answers],
);

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
