// COMMON
const body = document.querySelector("body");
const blocksLockPadding = document.querySelectorAll(".lock-padding");

let timeout = 200;


// block - header
const header = document.querySelector(".header");
const menuBtn = header.querySelector(".header__content-btn-menu");


// block - nav mobile
const navMobile = document.querySelector(".nav-mobile");


// block - service
const blockServiceItems = document.querySelector(".service__items");
const blockServiceItem = document.querySelector(".service__item");

const btnServicePrev = document.querySelector(".service__intro-back-btn-prev");
const btnServiceNext = document.querySelector(".service__intro-back-btn-next");


// block - client
const blockClientItems = document.querySelector(".client__content-items");
const blockClientItem = document.querySelector(".client__content-item");

const btnClientPrev = document.querySelector(".client__content-btn-prev");
const btnClientNext = document.querySelector(".client__content-btn-next");


// block - header
let positionHeader = "top";
let scorePressedMenuBtn = 0;

window.addEventListener("scroll", () => {
    if (pageYOffset >= 100) {
        header.classList.add("header-active");
        positionHeader = "bottom";
    } else {
        header.classList.remove("header-active");
        positionHeader = "top";
    };
});

menuBtn.addEventListener("click", () => {
    menuBtn.classList.toggle("header-content-btn-menu-active");
    navMobile.classList.toggle("nav-mobile-active");

    if (positionHeader == "bottom") {
        header.classList.toggle("header-active");
    };

    if (scorePressedMenuBtn == 0) {
        addRightPadding();
        scorePressedMenuBtn++;
    } else if (scorePressedMenuBtn == 1) {
        removeRightPadding();
        scorePressedMenuBtn--;
    };
});

function addRightPadding() {
    let widthScroll = window.innerWidth - navMobile.offsetWidth;

    body.style.paddingRight = widthScroll + "px";
    body.classList.add("body-pass");

    for (let index = 0; index < blocksLockPadding.length; index++) {
        const element = blocksLockPadding[index];
        element.style.paddingRight = widthScroll + "px";
    };
}

function removeRightPadding() {
    
    setTimeout(() => {
        for (let index = 0; index < blocksLockPadding.length; index++) {
            const element = blocksLockPadding[index];
            element.style.paddingRight =  "0px";
        };

        body.style.paddingRight = "0px";
        body.classList.remove("body-pass");
    }, timeout * 2);
}


// block - service
let scorePressedBtnService = 0;
let positionLeftBlockService = 0;

let maximumClicksBtnService = 2;

let widthBlockServiceItem = blockServiceItem.offsetWidth;

let marginRightServiceContentItem = getComputedStyle(blockServiceItem).marginRight;
marginRightServiceContentItem = Number(marginRightServiceContentItem.replace("px", ""));

btnServicePrev.addEventListener("click", () => {
    pressedBtnService(positionLeft = widthBlockServiceItem + marginRightServiceContentItem,
                      scorePressed = -1,
                      clicks = maximumClicksBtnService);
});

btnServiceNext.addEventListener("click", () => {
    pressedBtnService(positionLeft = -(widthBlockServiceItem + marginRightServiceContentItem),
                      scorePressed = 1,
                      clicks = maximumClicksBtnService);
});

function pressedBtnService(positionLeft, scorePressed, clciks) {
    positionLeftBlockService += positionLeft;
    blockServiceItems.style.left = positionLeftBlockService + "px";

    scorePressedBtnService += scorePressed;

    checkBtnPressed(scorePressed = scorePressedBtnService,
                    maximumClicks = clicks,
                    btnPrev = btnServicePrev,
                    btnNext = btnServiceNext);
};


// block - client
let widthBlockClientItem = blockClientItem.offsetWidth;
let marginRightClientItem = getComputedStyle(blockClientItem).marginRight;
marginRightClientItem = Number(marginRightClientItem.replace("px", ""));

let maximumClicksBtnClient = 2;

let positionLeftBlockClient = 0;
let scorePressedBtnClient = 0;

btnClientPrev.addEventListener("click", () => {
    pressedBtnClient(positionLeft = widthBlockClientItem + marginRightClientItem,
                     scorePressed = -1,
                     clicks = maximumClicksBtnClient);
});

btnClientNext.addEventListener("click", () => {
    pressedBtnClient(positionLeft = -(widthBlockClientItem + marginRightClientItem),
                     scorePressed = 1,
                     clicks = maximumClicksBtnClient);
});

function pressedBtnClient(positionLeft, scorePressed, clicks) {
    positionLeftBlockClient += positionLeft;
    blockClientItems.style.left = positionLeftBlockClient + "px";

    scorePressedBtnClient += scorePressed;

    checkBtnPressed(scorePressed = scorePressedBtnClient,
                    maximumClicks = clicks,
                    btnPrev = btnClientPrev,
                    btnNext = btnClientNext);
};


// COMMON
function checkBtnPressed(scorePressed, maximumClicks, btnPrev, btnNext) {

    if (scorePressed == 0) {
        btnPrev.classList.remove("btn-active");
    }

    else if (scorePressed == maximumClicks) {
        btnNext.classList.remove("btn-active");

    } else {
        btnPrev.classList.add("btn-active");
        btnNext.classList.add("btn-active");
    }
};
checkResizeWidnow()
function checkResizeWidnow() {

    if (window.innerWidth >= 911) {
        maximumClicksBtnService = 2;

    } else if (window.innerWidth <= 910 && 561 < window.innerWidth) {
        maximumClicksBtnService = 3;
        maximumClicksBtnClient = 3;

    } else if (window.innerWidth <= 560) {
        maximumClicksBtnService = 4;
        maximumClicksBtnClient = 3;
    };
}
