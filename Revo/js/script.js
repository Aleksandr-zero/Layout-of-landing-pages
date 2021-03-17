const chooseItems = document.querySelector(".choose__content-items");
const chooseItem = document.querySelector(".choose__content-item");
const chooseBtnNext = document.querySelector(".choose__content-btn-next");
const chooseBtnPrev = document.querySelector(".choose__content-btn-prev");

const giftButtons = document.querySelectorAll(".gift__tabs-item");


history.pushState(null, null, "#gift-block-1");

chooseBtnNext.addEventListener("click", () => {
    let chooseItems_Width = chooseItem.offsetWidth + 30 + "px";
    chooseItems.style.left = "-" + chooseItems_Width;
});

chooseBtnPrev.addEventListener("click", () => {
    chooseItems.style.left = 0;
});


giftButtons.forEach((giftButton) => {
    giftButton.addEventListener("click", () => { pressingGiftButton(giftButtonPressed = giftButton) });
});


function pressingGiftButton(giftButtonPressed) {
    // Ищем активный класс у кнопки для удаления
    giftButtons.forEach((giftButton) => {
        giftButton.classList.forEach(classGiftButton => {
            if (classGiftButton == "gift__button-active") {
                giftButton.classList.toggle("gift__button-active");
                giftButton.classList.toggle("gift__button-passive");
            };
        });
    });

    giftButtonPressed.classList.toggle("gift__button-passive");
    giftButtonPressed.classList.toggle("gift__button-active");
};