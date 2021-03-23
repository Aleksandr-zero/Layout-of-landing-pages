// Common

const body = document.querySelector("body");
const itemsLockPadding = document.querySelectorAll(".lock-padding");

let timeout = 500;


// block - header

const menuBtn = document.querySelector(".header__content-menu-btn-link");
const header = document.querySelector(".header");

const mobileNav = document.querySelector(".header__content-mobile-nav");


// block - curated

const blockCuratedItems = document.querySelector(".curated__items");
const blockCuratedItemCount = document.querySelectorAll(".curated__item");

const curatedPrevBtn = document.querySelector(".curated__back-btn-prev");
const curatedNextBtn = document.querySelector(".curated__back-btn-next");

const curatedBackImgBtns = document.querySelectorAll(".curated__item-back-img-btn");


// block - deals

const blockDealsItems = document.querySelector(".deals__items");


// block - header

let scorePressed = 0;
var positionHeader = "top";

window.addEventListener("scroll", () => {

    if (pageYOffset >= header.offsetHeight + 12) {
        header.classList.add("header-active");
        positionHeader = "bottom";
    } else {
        header.classList.remove("header-active");
        positionHeader = "top";
    };
});

menuBtn.addEventListener("click", () => {
    mobileNav.classList.toggle("mobile-nav-open");
    menuBtn.classList.toggle("menu-btn-active");
    header.classList.toggle("header-active-not-shadow");

    let lockPaddingScroll = window.innerWidth - document.querySelector(".header__content-mobile-nav").offsetWidth;

    add_removeLockPadding(rightPaddingCount = lockPaddingScroll);

    if (scorePressed == 1) {
    
        if (positionHeader == "top") {
            setTimeout(() => {
                header.classList.remove("header-active-pressed-btn");
            }, 100);
        };

        scorePressed--;
    }
    else if (scorePressed == 0 && positionHeader == "top") {
        header.classList.add("header-active-pressed-btn");
        scorePressed++;
    };
});

function add_removeLockPadding(rightPaddingCount) {

    if (scorePressed == 0) {
        body.classList.toggle("stop-scrolling");
        body.style.paddingRight = rightPaddingCount + "px"

        for (let index = 0; index < itemsLockPadding.length; index++) {
            const elementLock = itemsLockPadding[index];
            elementLock.style.paddingRight = rightPaddingCount + "px";
        };

    } else {
        setTimeout(() => {
            for (let index = 0; index < itemsLockPadding.length; index++) {
                const elementLock = itemsLockPadding[index];
                elementLock.style.paddingRight = "0px";
            };

            body.classList.toggle("stop-scrolling");
            body.style.paddingRight = "0px"

        }, timeout);
    };
};


// block - curated

let positionBlockCuratedLeft = 0;
let positionBlockCuratedScore = 0;

let widthBlockCuratedItems = blockCuratedItems.offsetWidth;
let widthBlockCuratedItem = blockCuratedItemCount[0].offsetWidth;

let scoreAdd_Dec = 0;
let scoreTranslateX = 0;

// используем 1260 так как у блока "deals__wrapper-items" заданная ширина - 1260px
if (window.innerWidth <= 1260 && 781 < window.innerWidth) {
    var positionLeftCount = 420 - window.innerWidth / 3 + 420;
} 

else if (window.innerWidth <= 780 && 661 < window.innerWidth) {
    var positionLeftCount = 390 - window.innerWidth / 3 + 390;
}

else if (window.innerWidth <= 660 && 571 < window.innerWidth) {
    var positionLeftCount = 325 - window.innerWidth / 3 + 325
    scoreAdd_Dec = 1;
}

else if (window.innerWidth <= 570 && 451 < window.innerWidth) {
    var positionLeftCount = 325 - window.innerWidth / 3 + 325;
    scoreAdd_Dec = 1;
}

else if (window.innerWidth <= 450) {
    var positionLeftCount = 107;
    scoreAdd_Dec = 1;
    scoreTranslateX = 1;

} else  var positionLeftCount = 420;


curatedPrevBtn.addEventListener("click", () => {
    pressesBtn(positionLeft = positionLeftCount, positionScore = -1);

    if (positionBlockCuratedScore == 1 && scoreAdd_Dec == 0) {
        positionBlockCuratedLeft -= 90;
    };
});

curatedNextBtn.addEventListener("click", () => {
    pressesBtn(positionLeft = -positionLeftCount, positionScore = 1);

    if (positionBlockCuratedScore == 2 && scoreAdd_Dec == 0) {
        positionBlockCuratedLeft += 90;
    };
});


function pressesBtn(positionLeft, positionScore) {

    if (scoreTranslateX == 1) {
        positionBlockCuratedLeft += positionLeft;
        blockCuratedItems.style.transform = "translateX(" + positionBlockCuratedLeft + "%)";

        positionBlockCuratedScore += positionScore;

        checkBtnPressed(position = 5);

    } else {
        positionBlockCuratedLeft += positionLeft 
        blockCuratedItems.style.left = positionBlockCuratedLeft + "px";
    
        positionBlockCuratedScore += positionScore;

        checkBtnPressed(position = 0);
    }
}

if (/Android|MeeGo|webOS|iPhone|iPad|iPod|BlackBerry|Fennec|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {
    curatedBackImgBtns.forEach( (itemBtn) => {
        itemBtn.classList.add("curated__item-back-img-btn-phone");
    });
};

function checkBtnPressed(position) {
    if (positionBlockCuratedScore == 0) {
        curatedPrevBtn.classList.add("curated__back-btn-passive");
    }

    else if (positionBlockCuratedScore == 1 || positionBlockCuratedScore == 2) {
        curatedPrevBtn.classList.remove("curated__back-btn-passive");
        curatedNextBtn.classList.remove("curated__back-btn-passive");
    }
    
    else if (position == 0) {
        curatedNextBtn.classList.add("curated__back-btn-passive");
    }

    else if (position == 5 && positionBlockCuratedScore == 4) {
        curatedNextBtn.classList.add("curated__back-btn-passive");

        if (positionBlockCuratedScore == 3) {
            curatedPrevBtn.classList.remove("curated__back-btn-passive");
            curatedNextBtn.classList.remove("curated__back-btn-passive");
        }
    };
};


// block - deals

blockDealsItems.scrollLeft = 630;

let isDown = false;
let startX;
let scrollLeft;

blockDealsItems.addEventListener('mousedown', (e) => {
    isDown = true;
    
    blockDealsItems.classList.add('deals__items-active')

    startX = e.pageX - blockDealsItems.offsetLeft;
    scrollLeft = blockDealsItems.scrollLeft;
})

blockDealsItems.addEventListener('mouseleave', () => {
    isDown = false;
    blockDealsItems.classList.remove('deals__items-active')
})

blockDealsItems.addEventListener('mouseup', () => {
    isDown = false;
    blockDealsItems.classList.remove('deals__items-active')
})

blockDealsItems.addEventListener('mousemove', (e) => {
    if (!isDown) return //stop running it;

    e.preventDefault();
    let x = e.pageX - blockDealsItems.offsetLeft;
    let walk = x - startX;

    blockDealsItems.scrollLeft = scrollLeft - walk;
})

if (/Android|MeeGo|webOS|iPhone|iPad|iPod|BlackBerry|Fennec|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {
    
    blockDealsItems.addEventListener('touchstart', (event) => {
        isDown = true;
    
        startX = event.touches[0].clientX - blockDealsItems.offsetLeft;
        scrollLeft = blockDealsItems.scrollLeft;

    }, false);

    blockDealsItems.addEventListener('touchmove', (event) => {
        if (!isDown) return //stop running it;

        let x = event.touches[0].clientX - blockDealsItems.offsetLeft;
        let walk = x - startX;
    
        blockDealsItems.scrollLeft = scrollLeft - walk * 1.2;
    }, false);

} else null;
