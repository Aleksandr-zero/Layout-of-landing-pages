// block - header
const header = document.querySelector(".header");

const btnMenu = document.querySelector(".btn-menu");
const mobileNav = document.querySelector(".mobile-nav");

let pressedBtnMenu = 0;

const btnPhone = document.querySelectorAll(".phone-link");
const bell = document.querySelector(".bell");
const bellBtnClose = bell.querySelector(".bell__content-description-close");

const deleteActiveClasses_Blocks = () => {
    bell.classList.toggle("bell-active");
    mobileNav.classList.remove("mobile-nav-active");
    btnMenu.classList.remove("btn-menu-active");
    header.classList.remove("header-not-swadow_back-color");
};

const close_openBell = () => {
    deleteActiveClasses_Blocks();

    add_deleteRightPadding();
};

const checkActiveClassHeader = () => {
    if (header.classList.contains("header-active") == false) {
        header.classList.toggle("header-active-pressed-menu-btn");
    } else {
        header.classList.toggle("header-not-swadow_back-color");
    };
};

btnMenu.addEventListener("click", () => {
    mobileNav.classList.toggle("mobile-nav-active");
    btnMenu.classList.toggle("btn-menu-active");

    if (pressedBtnMenu) {
        pressedBtnMenu = 0;

        setTimeout(() => {
            checkActiveClassHeader();
        }, timeout);

        add_deleteRightPadding();

        return;
    };

    checkActiveClassHeader();

    pressedBtnMenu++;

    add_deleteRightPadding();
});


btnPhone.forEach((btn) => {
    btn.addEventListener("click", () => {
        if (pressedBtnMenu) {
            deleteActiveClasses_Blocks();
        } else {
            close_openBell();
        };
    });
});

bellBtnClose.addEventListener("click", () => {
    close_openBell();
    pressedBtnMenu = 0;
});

