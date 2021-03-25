// block - header

const header = document.querySelector(".header");


// block - header

window.addEventListener("scroll", () => {
    if (pageYOffset >= 100) {
        header.classList.add("header-active");
    } else {
        header.classList.remove("header-active");
    };
});


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


// block - service

let scorePressedBtnService = 0;
let positionLeftBlockService = 0;
let widthBlockServiceItem = blockServiceItem.offsetWidth + 38;

btnServicePrev.addEventListener("click", () => {
    pressedBtnService(positionLeft = widthBlockServiceItem, scorePressed = -1);
});

btnServiceNext.addEventListener("click", () => {
    pressedBtnService(positionLeft = -widthBlockServiceItem, scorePressed = 1);
});

function pressedBtnService(positionLeft, scorePressed) {
    positionLeftBlockService += positionLeft;
    blockServiceItems.style.left = positionLeftBlockService + "px";

    scorePressedBtnService += scorePressed;

    checkBtnPressed(scorePressed = scorePressedBtnService, btnPrev = btnServicePrev, btnNext = btnServiceNext);
};


// block - client

let widthBlockClientItem = blockClientItem.offsetWidth + 110;
let positionLeftBlockClient = 0;
let scorePressedBtnClient = 0;

btnClientPrev.addEventListener("click", () => {
    pressedBtnClient(positionLeft = widthBlockClientItem, scorePressed = -1);
});

btnClientNext.addEventListener("click", () => {
    pressedBtnClient(positionLeft = -widthBlockClientItem, scorePressed = 1);
});

function pressedBtnClient(positionLeft, scorePressed) {
    positionLeftBlockClient += positionLeft;
    blockClientItems.style.left = positionLeftBlockClient + "px";

    scorePressedBtnClient += scorePressed;

    checkBtnPressed(scorePressed = scorePressedBtnClient, btnPrev = btnClientPrev, btnNext = btnClientNext);
};


// COMMON

function checkBtnPressed(scorePressed, btnPrev, btnNext) {

    if (scorePressed == 0) {
        btnPrev.classList.remove("btn-active");
    }

    else if (scorePressed == 1) {
        btnPrev.classList.add("btn-active");
        btnNext.classList.add("btn-active");
    }

    else if (scorePressed == 2) {
        btnNext.classList.remove("btn-active");
    }
};
