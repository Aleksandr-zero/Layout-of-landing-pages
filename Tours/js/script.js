// Common

const body = document.querySelector("body");
const itemsLockPadding = document.querySelectorAll(".lock-padding");

let timeout = 500;


// block - header

const menuBtn = document.querySelector(".header__content-menu-btn-link");
const header = document.querySelector(".header");
let heightHeader = header.offsetHeight + 40;

const mobileNav = document.querySelector(".header__content-mobile-nav");

const mobileNavLinks = document.querySelectorAll(".mobile-nav-link");

const linksHome = document.querySelectorAll(".link-home");
const linksAbout = document.querySelectorAll(".link-about");
const linksPopulerDestination = document.querySelectorAll(".link-populer-destination");
const linksTourPackage = document.querySelectorAll(".link-tour-packege");
const linksContact = document.querySelectorAll(".link-contact");


// block - about
const about = document.querySelector(".about");


// block - curated
const curated = document.querySelector(".curated");

const blockCuratedItems = document.querySelector(".curated__items");
const blockCuratedItemCount = document.querySelectorAll(".curated__item");

const curatedPrevBtn = document.querySelector(".curated__back-btn-prev");
const curatedNextBtn = document.querySelector(".curated__back-btn-next");

const curatedBackImgBtns = document.querySelectorAll(".curated__item-back-img-btn");


// block - deals
const deals = document.querySelector(".deals");

const blockDealsItems = document.querySelector(".deals__items");


// block - footer
const footer = document.querySelector(".footer");


// block - header

let scorePressed = 0;
let positionHeader = "top";

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

    } else {
        scorePressed++;
    }
});

function add_removeLockPadding(rightPaddingCount) {

    if (scorePressed == 0) {
        closeMobileNav(rightPadding = rightPaddingCount);

    } else {
        setTimeout(() => {
            closeMobileNav(rightPadding = 0);
        }, timeout);
    };
};

for (let index = 0; index < mobileNavLinks.length; index++) {
    const mobileLink = mobileNavLinks[index];
    let lockPaddingScroll = window.innerWidth - document.querySelector(".header__content-mobile-nav").offsetWidth;

    mobileLink.addEventListener("click", () => {

        add_removeLockPadding(rightPaddingCount = lockPaddingScroll);

        mobileNav.classList.toggle("mobile-nav-open");
        menuBtn.classList.toggle("menu-btn-active");

        header.classList.toggle("header-active-not-shadow");

        setTimeout(() => {
            header.classList.remove("header-active-pressed-btn");
        }, 100);

        scorePressed--;
    });
};

function closeMobileNav(rightPadding) {

    for (let index = 0; index < itemsLockPadding.length; index++) {
        const elementLock = itemsLockPadding[index];
        elementLock.style.paddingRight = rightPadding + "px";
    };

    body.classList.toggle("stop-scrolling");
    body.style.paddingRight = rightPadding + "px"
}

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

else if (window.innerWidth <= 660 && 451 < window.innerWidth) {
    var positionLeftCount = 325 - window.innerWidth / 3 + 325
    scoreAdd_Dec = 1;
}

else if (window.innerWidth <= 450 && 376 < window.innerWidth) {
    var positionLeftCount = 107;
    scoreAdd_Dec = 1;
    scoreTranslateX = 1;
}

else if (window.innerWidth <= 375 && 356 < window.innerWidth) {
    var positionLeftCount = 108;
    scoreAdd_Dec = 1;
    scoreTranslateX = 1;
}

else if (window.innerWidth <= 355) {
    var positionLeftCount = 108.5;
    scoreAdd_Dec = 1;
    scoreTranslateX = 1;

}else  var positionLeftCount = 420;


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


// block - common
bruteForceLinks(
    arrayItemsLinks = [linksHome, linksAbout, linksPopulerDestination, linksTourPackage, linksContact],
    blockItems = [header, about, curated, deals, footer]
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