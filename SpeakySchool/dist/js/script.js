// COMMON
const body = document.querySelector("body");
const intro = document.querySelector(".intro");

const timeout = 200;

let blocks_lockPadding = document.querySelectorAll(".lock-padding");


const add_deleteRightPadding = () => {
    let widtScroll = innerWidth - document.documentElement.clientWidth

    blocks_lockPadding.forEach((block) => {
        block.style.paddingRight = widtScroll + "px";
    });

    body.classList.toggle("body-pass");
    body.style.paddingRight = widtScroll + "px";
};


window.addEventListener("scroll", () => {
    if (pageYOffset >= 120 ) {
        header.classList.add("header-active-scroll");
    } else {
        header.classList.remove("header-active-scroll");
    };

    if (pageYOffset >= 220) {
        header.classList.add("header-active", 'lock-padding');
        intro.classList.add("intro-active");
    } else {
        header.classList.remove("header-active", 'lock-padding');
        intro.classList.remove("intro-active");
    };

    blocks_lockPadding = document.querySelectorAll(".lock-padding");
});

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


// block -form
let selectBoxBtns;

const changes_TrialForms = (indexForm, forms, backFormItems) => {
    for (let index = 0; index < forms.length; index++) {
        const form = forms[index];

        if (form.classList.contains("trial-lesson-form-active")) {
            form.classList.remove("trial-lesson-form-active");
            
            if (indexForm) {
                backFormItems.classList.add("back-form-items-active");
            } else {
                backFormItems.classList.remove("back-form-items-active");
            }

            setTimeout(() => {
                forms[indexForm].classList.add("trial-lesson-form-active");
            }, timeout);
        };
    };
};

const pressedSelectBoxBtn = (selectBlocksContainers, selectBoxBtnsArray) => {
    const currentSelectBoxBtn = event.currentTarget;
    const currentSelectBox_Container = selectBlocksContainers[selectBoxBtnsArray.indexOf(currentSelectBoxBtn)];
    const currentSelectBlocks = selectBlocksContainers[selectBoxBtnsArray.indexOf(currentSelectBoxBtn)]
                                        .querySelectorAll(".trial-lesson__content-form-box-selects-block");

    currentSelectBoxBtn.classList.toggle("box-select-btn-active");
    currentSelectBox_Container.classList.toggle("box-selects-active");

    currentSelectBlocks.forEach((item) => {
        item.addEventListener("click", () => {
            currentSelectBoxBtn.innerHTML = item.querySelector("label").innerHTML;
            currentSelectBoxBtn.classList.remove("box-select-btn-active");
            currentSelectBox_Container.classList.remove("box-selects-active");
        });
    });
};

const pressedBtnForm = (formBtns, formBtnsArray, forms, backFormItems) => {

    for (let index = 0; index < formBtns.length; index++) {
        const btn = formBtns[index];

        if (btn.classList.contains("trial-lesson-btn-active")) {
            btn.classList.remove("trial-lesson-btn-active");
            event.currentTarget.classList.add("trial-lesson-btn-active");
            
            changes_TrialForms(
                indexForm = formBtnsArray.indexOf(event.currentTarget),
                forms = forms,
                backFormItems = backFormItems
            );

            return;
        };
    };
};

const trialLessonBlock = document.querySelectorAll(".trial-lesson");

trialLessonBlock.forEach((trialLesson) => {

    selectBoxBtns = trialLesson.querySelectorAll(".trial-lesson__content-form-box-select");
    const selectBoxBtnsArray = Array.from(selectBoxBtns);
    const selectBlocksContainers = trialLesson.querySelectorAll(".trial-lesson__content-form-box-selects");

    const backFormItems = trialLesson.querySelector(".trial-lesson__content-back-form-items");

    const forms = trialLesson.querySelectorAll(".trial-lesson__content-form");
    const formBtns = trialLesson.querySelectorAll(".trial-lesson__content-back-form-btn");
    const formBtnsArray = Array.from(formBtns);

    if (selectBoxBtns) {

        selectBoxBtns.forEach((selectBtn) => {
            selectBtn.addEventListener("click", () => {
                pressedSelectBoxBtn(selectBlocksContainers, selectBoxBtnsArray);
            });
        });
    };

    formBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
            pressedBtnForm(formBtns, formBtnsArray, forms,  backFormItems);
        });
    });
});

// Btn - trial lesson
const btnsTrialLesson = document.querySelectorAll(".btn-trial-lesson");
const trialLessonBlocks = document.querySelectorAll(".trial-lesson__content");

btnsTrialLesson.forEach((btn) => {
    btn.addEventListener("click", () => {
        window.scroll({
            left: 0,
            top: trialLessonBlocks[0].offsetTop - (header.offsetHeight + 20),
            behavior: "smooth",
        })
    });
});

class SliderWithoutFight {
        
    constructor(slider) {
        this.slider = slider;
        this.sliderTrack = this.slider.querySelector(".slider-track");

        this.sliderWidth = this.slider.offsetWidth;
        this.slideCount = this.slider.querySelectorAll(".slide").length;

        this.maximumSwipingAtSlider = 0;

        this.position = 0;
        this.positionFinal = 0;

        this.positionPressed;
        this.positionSliderTrack = 0;
        this.positionFingerPressSlider;
        this.positionFingetCurrentMoment_OnSlider = 0;

        this.allowSwipe = true;


        this.measuresMaximumSwipeOfSlider();
    }

    getEvent() {
        /* Получаем события (чтобы наш слайдер работал и на десктопах, и на телефонах).  */
        return (event.type.search('touch') != -1) ? event.touches[0] : event;
    };

    measuresMaximumSwipeOfSlider() {
        /* Измеряет максимальное пролистывании у слайдера  */

        this.sliderTrack.querySelectorAll(".slide").forEach((slide) => {
            this.maximumSwipingAtSlider += slide.offsetWidth;
            this.maximumSwipingAtSlider += +(getComputedStyle(slide).getPropertyValue("margin-right").replace("px", ""));
        });

        this.maximumSwipingAtSlider -= this.slider.querySelector(".slider-list").offsetWidth;
    }

    checksOutOfBounds() {
        /* Если мышка или палец будет заходить за границы слайдера то запрещаем его двигать. */

        if ( this.positionFingetCurrentMoment_OnSlider >= this.positionFingerPressSlider ||
            -this.positionFingetCurrentMoment_OnSlider >= (this.sliderWidth - this.positionFingerPressSlider )) {

            this.allowSwipe = false;
            this.positionFinal = this.position;
        };
    };


    swipeStart() {
        /* 
        При касании слайдера, записыает прошлое значение позиции, на
        котором остановился пользователь.
        */

        const evt = this.getEvent();

        this.positionPressed = evt.clientX;
        this.positionFingerPressSlider = evt.clientX - this.slider.getBoundingClientRect().x;

        this.sliderTrack.style.transform = `translate3d(${-this.positionFinal}px, 0px, 0px)`;
    }


    pushingSlide() {
        /* Продвигает слайдер.  */

        this.position = this.positionSliderTrack;

        if (this.position <= this.maximumSwipingAtSlider) {
            this.sliderTrack.style.transform = `translate3d(-${this.position}px, 0px, 0px)`;
        };
    };


    swipeAction() {
        /*
        Получает координаты продвижения слайдера (на сколько px продвинул
        пользователь слайдер) и вызывает функцию "pushingSlide".
        */

        let evt = this.getEvent();

        this.positionFingetCurrentMoment_OnSlider = this.positionPressed - evt.clientX;
        this.positionSliderTrack = this.positionPressed - evt.clientX + this.positionFinal;

        this.checksOutOfBounds();

        if (this.allowSwipe) {
            this.pushingSlide(
                this.positionFingerMovement = this.positionSliderTrack
            );
        };
    };


    swipeEnd() {
        /* Записывает конечную позицию слайдера.  */

        this.positionFinal = this.position;

        // если мы будем тянуть слайдер, когда уже начало или конец слайдер,
        // то мы будем перезаписыать переменню "positionFinal" на максимальную
        // или минималбную позицию. 
        if (this.positionFinal > this.maximumSwipingAtSlider) {
            this.positionFinal = this.maximumSwipingAtSlider;

        } else if (this.positionFinal < 0) {
            this.positionFinal = 0;
        };

        this.allowSwipe = true;
    };


    run() {
        /* Запускает слайдер */

        this.sliderTrack.addEventListener("touchstart",  () => { this.swipeStart(); },  { passive: true });
        this.sliderTrack.addEventListener("touchmove",   () => { this.swipeAction(); }, { passive: true });
        this.sliderTrack.addEventListener("touchend",    () => { this.swipeEnd(); },    { passive: true });
    }
};

// COMMON - page - teaching kids offline AND page - teaching kids online
const iteratingOverAnArray_DeleteActiveClass = (array, activeClass) => {
    for (let index = 0; index < array.length; index++) {
        const item = array[index];

        if (item.classList.contains(activeClass)) {
            item.classList.remove(activeClass);
        };
    };
};

const add_delectActiveClass_trainingPackageItem = (arrayItems, indexBlock, activeClass) =>  {

    iteratingOverAnArray_DeleteActiveClass(
        array = arrayItems,
        activeClass = activeClass
    );

    setTimeout(() => {
        arrayItems[indexBlock].classList.add(activeClass); 
    }, timeout);
};


// page - teaching kids online
const trainingPackageWrapperItems = document.querySelector(".training-package__content-wrapper-items");

let trainingPackageBlockItemsOnline;
let trainingPackageBlockItemsOnlineSliders;
let trainingPackageWrappersBtnsOnline;

if (trainingPackageWrapperItems) {
    trainingPackageBlockItemsOnline = trainingPackageWrapperItems.querySelectorAll(".training-package-content-items-online");

    trainingPackageBlockItemsOnlineSliders = trainingPackageWrapperItems.querySelectorAll('.slider');
    
    trainingPackageWrappersBtnsOnline = document.querySelectorAll(".training-package__content-back-btns-wrapper");
};

let trainingPackageBtnsOnline_1;
let trainingPackageBtnsOnline_2;

let trainingPackageBtnsOnline_Array_1;
let trainingPackageBtnsOnline_Array_2;

if (trainingPackageWrapperItems && trainingPackageBlockItemsOnline.length) {
    trainingPackageBtnsOnline_1 = trainingPackageWrappersBtnsOnline[0].querySelectorAll(".training-package__content-btn");
    trainingPackageBtnsOnline_2 = trainingPackageWrappersBtnsOnline[1].querySelectorAll(".training-package__content-btn");

    trainingPackageBtnsOnline_Array_1 = Array.from(trainingPackageBtnsOnline_1);
    trainingPackageBtnsOnline_Array_2 = Array.from(trainingPackageBtnsOnline_2);
};

let positionBtnOnline_1 = 0;
let positionBtnOnline_2 = 0;

const pressedTrainingPackageBtnOnline_1 = (event) => {
    positionBtnOnline_1 = trainingPackageBtnsOnline_Array_1.indexOf(event.currentTarget);

    iteratingOverAnArray_DeleteActiveClass(
        array = trainingPackageBtnsOnline_1,
        activeClass = "training-package-btn-active"
    );

    event.currentTarget.classList.add("training-package-btn-active");

    add_delectActiveClass_trainingPackageItem(
        arrayItems = trainingPackageBlockItemsOnline,
        indexBlock = positionBtnOnline_1 + positionBtnOnline_2,
        activeClass = "training-package-content-items-active"
    );
};

const pressedTrainingPackageBtnOnline_2 = (event) => {
    positionBtnOnline_2 = trainingPackageBtnsOnline_Array_2.indexOf(event.currentTarget);

    iteratingOverAnArray_DeleteActiveClass(
        array = trainingPackageBtnsOnline_2,
        activeClass = "training-package-btn-active"
    );

    event.currentTarget.classList.add("training-package-btn-active");

    add_delectActiveClass_trainingPackageItem(
        arrayItems = trainingPackageBlockItemsOnline,
        indexBlock = positionBtnOnline_1 + positionBtnOnline_2,
        activeClass = "training-package-content-items-active"
    )
};


if (trainingPackageWrapperItems && trainingPackageBlockItemsOnline.length) {
    trainingPackageBtnsOnline_1.forEach((btn) => {
        btn.addEventListener("click", pressedTrainingPackageBtnOnline_1);
    });
    
    trainingPackageBtnsOnline_2.forEach((btn) => {
        btn.addEventListener("click", pressedTrainingPackageBtnOnline_2);
    });

    trainingPackageBlockItemsOnlineSliders.forEach((items) => {
        new SliderWithoutFight(items).run();
    });
};


// page - teaching kids offline
const trainingPackageBlockWrapperItemsOffline = document.querySelector(".training-package__content-wrapper-items");

let trainingPackageBlockItemsOffline;
let trainingPackageBlockItemsOfflineSliders;

let trainingPackageBtnsOffline;
let trainingPackageBtnsOfflineArray;

if (trainingPackageBlockWrapperItemsOffline) {
    trainingPackageBlockItemsOffline = trainingPackageBlockWrapperItemsOffline.querySelectorAll(".training-package-content-items-offline");
    trainingPackageBlockItemsOfflineSliders = trainingPackageBlockWrapperItemsOffline.querySelectorAll(".slider");

    trainingPackageBtnsOffline = document.querySelectorAll(".training-package-content-btn-offline");
    trainingPackageBtnsOfflineArray = Array.from(trainingPackageBtnsOffline);
};

const pressedTrainingPackageBtnOffline = (event) => {
    let indexTrainingPackageBlock;

    for (let index = 0; index < trainingPackageBtnsOffline.length; index++) {
        const btn = trainingPackageBtnsOffline[index];

        if (btn.classList.contains("training-package-btn-active")) {
            btn.classList.remove("training-package-btn-active");

            event.currentTarget.classList.add("training-package-btn-active");

            indexTrainingPackageBlock = trainingPackageBtnsOfflineArray.indexOf(event.currentTarget);
        };
    };

    add_delectActiveClass_trainingPackageItem(
        arrayItems = trainingPackageBlockItemsOffline,
        indexBlock = indexTrainingPackageBlock,
        activeClass = "training-package-content-items-active"
    );
};

if (trainingPackageBlockItemsOffline) {
    trainingPackageBtnsOffline.forEach((btn) => {
        btn.addEventListener("click", pressedTrainingPackageBtnOffline);
    });

    trainingPackageBlockItemsOfflineSliders.forEach((items) => {
        new SliderWithoutFight(items).run();
    });
}


// block - teaching adults
const trainingPackageBtnsLine = document.querySelector(".training-package__content-back-btns-line");
const trainingPackageBtnsLineMenu = document.querySelectorAll(".training-package__content-back-btns-line-menu");
const trainingPackageBtnsLineMenuTitles = document.querySelectorAll(".training-package__content-back-btns-line-menu-title");

const trainingPackageBlockItemsAdultsOffline = document.querySelectorAll(".training-package__content-items-adults-offline");
const trainingPackageBlockItemsAdultsOnline = document.querySelectorAll(".training-package__content-items-adults-online");

const trainingPackageMenuContent = document.querySelectorAll(".training-package__content-back-btns-line-menu-content");

const trainingPackageMenuContentRadioBtn = document.querySelectorAll(".training-package__content-back-btns-line-menu-content-check > input");
const trainingPackageMenuContentRadioBtn_Offline = trainingPackageMenuContentRadioBtn[0];
const trainingPackageMenuContentRadioBtn_Online = trainingPackageMenuContentRadioBtn[1];

const trainingPackageMenuContentRadioBtn_Rest = Array.prototype.slice.call(trainingPackageMenuContentRadioBtn, 2);

const trainingPackageContentWrapperItems = document.querySelector(".training-package__content-wrapper-items");

let typeTraining;
let typeOccupation;
let lessonDuration;

let gettingValueByClass = [typeTraining, typeOccupation, lessonDuration];

const getsValueRadioBtn = () => {
    return event.currentTarget.value;
};

const blocksRadioBtnLine = () => {
    trainingPackageMenuContentRadioBtn.forEach((radioBtn) => {
        radioBtn.disabled = true;
    });
};

const addActiveCLassBtnLineMenu = (index) => {
    trainingPackageBtnsLineMenu[index].querySelector(".training-package__content-back-btns-line-menu-btn")
                                            .classList.add("line-menu-btn-active");

    trainingPackageBtnsLineMenu[index + 1].querySelector(".training-package__content-back-btns-line-menu-btn")
                                            .classList.add("line-menu-btn-pass");
};

const addActiveCLass_LastBtnLineMenu = () => {
    trainingPackageBtnsLineMenu[2].querySelector(".training-package__content-back-btns-line-menu-btn")
                                                    .classList.add("line-menu-btn-active");
};

const deleteActiveClass_And_Checked = () => {
    for (let index = 1; index < trainingPackageBtnsLineMenu.length; index++) {
        trainingPackageBtnsLineMenu[index].querySelectorAll("input").forEach((radioBtn) => {
            radioBtn.checked = false;
        });
    };

    trainingPackageBtnsLineMenu[2].classList.remove(
        "back-btns-line-menu-active-online",
        "back-btns-line-menu-active-offline"
    );
};

const deleteActiveClass_BtnsLineMenu = () => {
    trainingPackageBtnsLineMenu.forEach((btnLineMenu) => {
        btnLineMenu.classList.remove(
            "back-btns-line-menu-active-offline",
            "back-btns-line-menu-active-online",
            "back-btns-line-menu-active"
        );
    });
};

const pressedMenuConten_TypeTraining = () => {
    // Открывает меню - вид занятия
    typeTraining = getsValueRadioBtn();

    opensTypeOccupationMenuContent();
};

const pressedMenuContent_TypeOccupation = () => {
    // Открывает меню - длительность
    typeOccupation = getsValueRadioBtn();

    opensLessonDurationMenuContent();

    if (typeTraining.split("-")[0] == "offline") {
        blocksRadioBtnLine();
        opensTrainingPackageItems();
        addActiveCLass_LastBtnLineMenu();
    };
};

const pressedMenuContent_LessonDuration = () => {
    // выбирает длительность занятия и открывает предложения по обучение (карточки)
    lessonDuration = getsValueRadioBtn();

    opensTrainingPackageItems();
    blocksRadioBtnLine();
    addActiveCLass_LastBtnLineMenu();
};

const opensTypeOccupationMenuContent = () => {
    deleteActiveClass_And_Checked();

    addActiveCLassBtnLineMenu(
        index = 0
    );

    if (typeTraining.split("-")[0] == "offline") {
        trainingPackageBtnsLineMenu[1].classList.remove("back-btns-line-menu-active-online");
        trainingPackageBtnsLineMenu[1].classList.add("back-btns-line-menu-active-offline");

    } else if (typeTraining.split("-")[0] == "online") {
        trainingPackageBtnsLineMenu[1].classList.remove("back-btns-line-menu-active-offline");
        trainingPackageBtnsLineMenu[1].classList.add("back-btns-line-menu-active-online");
    };
};

const opensLessonDurationMenuContent = () => {
    addActiveCLassBtnLineMenu(
        index = 1
    );

    if (typeOccupation == "individual-lessons-online") {
        trainingPackageBtnsLineMenu[2].classList.remove("back-btns-line-menu-active-offline");
        trainingPackageBtnsLineMenu[2].classList.add("back-btns-line-menu-active-online");

    } else if (typeOccupation == "conversation-club-online") {
        trainingPackageBtnsLineMenu[2].classList.remove("back-btns-line-menu-active-online");
        trainingPackageBtnsLineMenu[2].classList.add("back-btns-line-menu-active-offline");

        blocksRadioBtnLine();
        opensTrainingPackageItems();
        addActiveCLass_LastBtnLineMenu();

    } else {
        trainingPackageBtnsLineMenu[2].classList.add("back-btns-line-menu-active-offline");
        blocksRadioBtnLine();
    };
};

const overwritesValuesMenuTitle = () => {
    for (let index = 0; index < trainingPackageBtnsLineMenuTitles.length; index++) {
        const btnsLineMenuTitle = trainingPackageBtnsLineMenuTitles[index];

        let pastText = btnsLineMenuTitle.innerHTML;
        let newText = `${pastText}<br>${gettingValueByClass[index]}`;
    };
};

const opensTrainingPackageItems = () => {
    if (lessonDuration == undefined) {
        lessonDuration = "60-min";
    };

    let activeClass = `${typeTraining}-${typeOccupation}-${lessonDuration}`;
    let trainingPackageBlockItem = document.querySelector(`.${activeClass}`)

    setTimeout(() => {
        trainingPackageContentWrapperItems.style.height = "420px";
        trainingPackageBlockItem.classList.add("training-package-content-items-active");
    }, timeout * 7);

    setTimeout(() => {
        deleteActiveClass_BtnsLineMenu();
        trainingPackageBtnsLine.style.height = "120px";
    }, timeout * 5);
};

if (trainingPackageBtnsLine) {
    trainingPackageMenuContentRadioBtn_Offline.addEventListener("click", pressedMenuConten_TypeTraining)
    trainingPackageMenuContentRadioBtn_Online.addEventListener("click", pressedMenuConten_TypeTraining)
    
    for (let index = 0; index < trainingPackageMenuContentRadioBtn_Rest.length - 2; index++) {
        const radioBtn_Rest = trainingPackageMenuContentRadioBtn_Rest[index];
        radioBtn_Rest.addEventListener("click", pressedMenuContent_TypeOccupation);
    };
    
    trainingPackageMenuContentRadioBtn_Rest[5].addEventListener("click", pressedMenuContent_LessonDuration);
    trainingPackageMenuContentRadioBtn_Rest[6].addEventListener("click", pressedMenuContent_LessonDuration);
};

// slider - block achieving-results
const achievingResults = document.querySelector(".achieving-results");

if (achievingResults) {
    const achievingResultsSlider = achievingResults.querySelector('.slider');
    const NewSlider = new SliderWithoutFight(achievingResultsSlider);

    const checkResizeWindow = () => {
        if (innerWidth <= 630) {  
            NewSlider.run();
        };
    };
    
    checkResizeWindow();
    window.addEventListener("resize", checkResizeWindow);
};

const paymentServicesBtn = document.querySelector(".footer__content-item-btn");
const paymentServices = document.querySelector(".payment-services");

const closePaymentServices = document.querySelector(".payment-services__content-block-close");


paymentServicesBtn.addEventListener("click", () => {
    paymentServices.classList.add("payment-services-active");
    add_deleteRightPadding();
});

closePaymentServices.addEventListener("click", () => {
    paymentServices.classList.remove("payment-services-active");
    add_deleteRightPadding();
});
