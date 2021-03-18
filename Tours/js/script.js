const blockCuratedItems = document.querySelector(".curated__items");
const blockCuratedItemCount = document.querySelectorAll(".curated__item").length;
const curatedPrevBtn = document.querySelector(".curated__back-btn-prev");
const curatedNextBtn = document.querySelector(".curated__back-btn-next");


const blockDealsItems = document.querySelector(".deals__items");


// block - curated

let positionBlockCuratedLeft = 0;
let positionBlockCuratedScore = 0;

curatedPrevBtn.addEventListener("click", () => {
    pressesBtn(positionLeft = 420, positionScore = -1);

    if (positionBlockCuratedScore == 1) {
        positionBlockCuratedLeft -= 90;
    };
});

curatedNextBtn.addEventListener("click", () => {
    pressesBtn(positionLeft = -420, positionScore = 1);

    if (positionBlockCuratedScore == 2) {
        positionBlockCuratedLeft += 90;
    };
});

function pressesBtn(positionLeft, positionScore) {
    positionBlockCuratedLeft += positionLeft 
    blockCuratedItems.style.left = positionBlockCuratedLeft + "px";

    positionBlockCuratedScore += positionScore;

    checkBtnPressed();
}

function checkBtnPressed() {
    if (positionBlockCuratedScore == 0) {
        curatedPrevBtn.classList.add("curated__back-btn-passive");
    }

    else if (positionBlockCuratedScore == 1 || positionBlockCuratedScore == 2) {
        curatedPrevBtn.classList.remove("curated__back-btn-passive");
        curatedNextBtn.classList.remove("curated__back-btn-passive");
    }

    else if (positionBlockCuratedScore == 3) {
        curatedNextBtn.classList.add("curated__back-btn-passive");
    };
};


// block - deals

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
