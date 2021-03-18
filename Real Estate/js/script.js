// block - Header
const btnMenuHeaderOpen = document.querySelector(".header__content-back-btn");
const btnMenuHeaderClose = document.querySelector(".header__content-nav_mobile-btn");
const mobileNavMenu = document.querySelector(".header__content-nav_mobile");

// block - Intro

const introContentBox_2_btn = document.querySelector(".intro__content-text-search-content-box_2");
const introContentBox_2 = document.querySelector(".intro__content-text-search-content-box_2-addresses");
const introContentBoxItems = document.querySelectorAll(".search-content-box-2");

const introContentItems = document.querySelector(".intro__content-img-items");
const introContentItemCount = document.querySelectorAll(".intro__content-img-item").length;

const introBtnPrev = document.querySelector(".intro__content-img-btn-prev");
const introBtnNext = document.querySelector(".intro__content-img-btn-next");

let positionIntroContentScore = 0;
let positionIntroContent = 0;


// block - Properties

const propertiesContentSlider = document.querySelector(".properties__content-items");

let isDown = false;
let startX;
let scrollLeft;


// block - Client

const clientContentImg = document.querySelector(".clients__content-img");
const clientContentItemsWrapper = document.querySelector(".clients__content-img-wrapper");

const clientContentItems = document.querySelector(".clients__content-img-items");
const clientContentItemCount = document.querySelectorAll(".clients__content-img-item").length;

const clientBtnsImg = document.querySelector(".clients__content-img-btns");

const clientBtnPrev = document.querySelector(".clients__content-img-btn-prev");
const clientBtnNext = document.querySelector(".clients__content-img-btn-next");

const clientContentItemTextCount = document.querySelectorAll(".clients__content-text-item");

const clientImgsBtns = document.querySelectorAll(".clients__content-text-btn");
const clientImgsBtn_1 = document.querySelector("#client-btn-1");
const clientImgsBtn_2 = document.querySelector("#client-btn-2");
const clientImgsBtn_3 = document.querySelector("#client-btn-3");

let positionClientContentScore = 0;
let positionClientContent = 0;


// block - Header

btnMenuHeaderOpen.addEventListener("click", () => {
    mobileNavMenu.classList.add("mobile-nav-open");
});

btnMenuHeaderClose.addEventListener("click", () => {
    mobileNavMenu.classList.remove("mobile-nav-open");
});


// block - Intro

introContentBox_2_btn.addEventListener("click", () => {
    introContentBox_2.classList.toggle("intro-content-box_2-addresses-active");
});

introContentBoxItems.forEach( (item) => {
    item.addEventListener("click", () => {
        introContentBox_2_btn.querySelector("p").innerHTML = item.querySelector("p").innerHTML;
    });
});

introBtnPrev.addEventListener("click", () => {
    positionIntroContent += 705;
    introContentItems.style.left = positionIntroContent + "px";

    positionIntroContentScore -= 1;

    checkBtnPressed(btnPrev = introBtnPrev, btnNext = introBtnNext,
                    countItems = introContentItemCount, position = positionIntroContentScore);
});

introBtnNext.addEventListener("click", () => {
    positionIntroContent -= 705;
    introContentItems.style.left = positionIntroContent + "px";

    positionIntroContentScore += 1;

    checkBtnPressed(btnPrev = introBtnPrev, btnNext = introBtnNext,
                    countItems = introContentItemCount, position = positionIntroContentScore);
});


// block - Properties

propertiesContentSlider.addEventListener('mousedown', (e) => {
    isDown = true;
    
    propertiesContentSlider.classList.add('properties__content-items-active')

    startX = e.pageX - propertiesContentSlider.offsetLeft;
    scrollLeft = propertiesContentSlider.scrollLeft;
})

propertiesContentSlider.addEventListener('mouseleave', () => {
    isDown = false;
    propertiesContentSlider.classList.remove('properties__content-items-active')
})

propertiesContentSlider.addEventListener('mouseup', () => {
    isDown = false;
    propertiesContentSlider.classList.remove('properties__content-items-active')
})

propertiesContentSlider.addEventListener('mousemove', (e) => {
    if (!isDown) return //stop running it;

    e.preventDefault();
    let x = e.pageX - propertiesContentSlider.offsetLeft;
    let walk = x - startX;

    propertiesContentSlider.scrollLeft = scrollLeft - walk;
})


if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {
    console.log(1)
} else null;


// block - Client

clientBtnPrev.addEventListener("click", () => {
    positionClientContent += 460;
    clientContentItems.style.left = positionClientContent + "px";

    positionClientContentScore -= 1;

    checkBtnPressed(btnPrev = clientBtnPrev, btnNext = clientBtnNext,
                    countItems = clientContentItemCount, position = positionClientContentScore);
});

clientBtnNext.addEventListener("click", () => {
    positionClientContent -= 460;
    clientContentItems.style.left = positionClientContent + "px";

    positionClientContentScore += 1;

    checkBtnPressed(btnPrev = clientBtnPrev, btnNext = clientBtnNext,
                    countItems = clientContentItemCount, position = positionClientContentScore);
})


clientImgsBtn_1.addEventListener("click", () => { pressedBtnImgContent(item = clientContentItemTextCount[0],
                                                                       btn = clientImgsBtn_1) });
clientImgsBtn_2.addEventListener("click", () => { pressedBtnImgContent(item = clientContentItemTextCount[1],
                                                                       btn = clientImgsBtn_2) });
clientImgsBtn_3.addEventListener("click", () => { pressedBtnImgContent(item = clientContentItemTextCount[2],
                                                                       btn = clientImgsBtn_3) });

function pressedBtnImgContent(item, btn) {

    clientContentItemTextCount.forEach( ( itemText ) => {
        if (itemText.classList.contains("clients__content-text-item-active")) {
            itemText.classList.remove("clients__content-text-item-active");
        };
    });

    setTimeout( () => {item.classList.add("clients__content-text-item-active")}, 200);

    toggleClassBtnImgActive(btn = btn);
};

function toggleClassBtnImgActive(btn) {

    clientImgsBtns.forEach( ( btnImg ) => {

        if (btnImg.classList.contains("clients-btn-active")) {
            btnImg.classList.remove("clients-btn-active");
        };
    });

    btn.classList.add("clients-btn-active");
};

window.addEventListener("resize", () => { ckeckWindowWidth() });
ckeckWindowWidth()

function ckeckWindowWidth() {
    if (window.innerWidth <= 1000) {
        clientContentItemsWrapper.appendChild(clientBtnsImg);
    }

    else if (window.innerWidth > 1000) {
        clientContentImg.appendChild(clientBtnsImg);
    };
};


// Common

function checkBtnPressed(btnPrev, btnNext, countItems, position) {

    if (position == 0) {
        btnPrev.classList.add("btn-passive");
        btnPrev.classList.remove("btn-active");
    }

    else if (position == countItems - 1) {
        btnNext.classList.add("btn-passive");
        btnNext.classList.remove("btn-active");
    }

    else if (position == 1) {
        btnPrev.classList.remove("btn-passive");
        btnNext.classList.remove("btn-passive");

        btnPrev.classList.add("btn-active");
        btnNext.classList.add("btn-active");
    };
};
