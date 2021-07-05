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
                formBtnsArray.indexOf(event.currentTarget),
                forms,
                backFormItems
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

class Slider {
    /**
    Является посредником между классами: Navigation и Pagination, для нового вида слайдера
    При наследовании класса должны быть методы:
    * @method -> swipeEnd
    * @method -> removeEventsSliderTrack
    Свойства:
    * @property slider -> type( HTMLElement )
    * @property sliderTrack -> type( HTMLElement )
    * @property maximumSwipingAtSlider -> type( int )
    * @property positionPressedX -> type( int )
    * @property positionPressedY -> type( int )
    * @property positionFingerPressSliderX -> type( int )
    * @property positionFingerPressSliderY -> type( int )
    * @property positionX_FingetCurrentMoment_OnSlider -> type( int )
    * @property positionY_FingetCurrentMoment_OnSlider -> type( int )
    * @property allowSwipe -> type( boolean )
    * @property isScrollingSlider -> type( boolean )
    */

    constructor() {

    }

    getEvent() {
        return (event.type.search('touch') != -1) ? event.touches[0] : event;
    }

    measuresMaximumSwipeOfSlider() {
        /* Измеряет максимальную длину прокрутки слайдера.  */

        this.sliderTrack.querySelectorAll(".slide").forEach((slide) => {
            this.maximumSwipingAtSlider += slide.offsetWidth + (+getComputedStyle(slide).marginRight.replace(/px/, ""));
        });

        this.maximumSwipingAtSlider -= this.sliderWidth;
    }


    getPaginationSlider() {
        return this.slider.querySelector(".slider-pagination");
    }

    checkIsPaginationSlider() {
        /* Проверяет есть ли у слайдера пагинация.  */

        const pagination = this.getPaginationSlider();

        if ( pagination ) {
            this.addPagination();
        };
    }

    watchSwipeSliderTrack_Pagination() {
        this.newPagination.changeBtnPagination(this.currentSlide)
    }

    addPagination() {
        this.isPagination = true;
        this.newPagination = new Pagination(this.slider);
    }


    addNavigation() {
        this.isNavigation = true;
        this.newNavigation = new Navigation(this.slider);

        const btnPrev = this.slider.querySelector(".btn-slider-push-last");
        const btnNext = this.slider.querySelector(".btn-slider-push-next");

        btnPrev.addEventListener("click", () => {this.pressedBtnPushSlider(); });
        btnNext.addEventListener("click", () => { this.pressedBtnPushSlider(); });
    }

    pressedBtnPushSlider() {
        if ( !this.allowSwipe ) {
            return;
        };

        const direction = event.currentTarget.dataset.direction;

        const dataset = this.newNavigation.pushingSliderTrack(direction, this.currentSlide);

        if ( dataset ) {
            this.currentSlide = dataset.current_slide;
            this.positionFinal = dataset.position;
            this.positionSliderTrack = dataset.position;

            this.watchSwipeSliderTrack_Pagination();
        };

        this.allowSwipe = false;

        setTimeout(() => {
            this.allowSwipe = true;
        }, 500);
    }


    checkSliderCanBeMoved(evt) {
        /**
        * @param evt -> fun "getEvent"
        Проверяет: если мы будем одновременно скролить страницу и сам слайдер, то блокируем слайдер.
        */

        if ( Math.abs(evt.clientY - this.positionPressedY) >= 5 && event.type === "touchmove" ) {
            // Если пользователь будет  скроллить страницу.

            if ( !this.isScrollingSlider ) {
                this.allowSwipe = false;
                this.removeEventsSliderTrack();

            } else if ( this.isScrollingSlider ) {
                this.allowSwipe = true;
            };
        };
    }

    checksOutOfBounds() {
        /* Если палец будет заходить за границы слайдера то запрещаем его двигать.  */

        if (
            (this.positionX_FingetCurrentMoment_OnSlider >= this.positionFingerPressSliderX && this.positionSliderTrack - this.positionFinal > 0) ||
            (this.positionX_FingetCurrentMoment_OnSlider >= (this.sliderWidth - this.positionFingerPressSliderX)) && this.positionSliderTrack - this.positionFinal < 0
            ) {

            this.swipeEnd();
        };
    }

    calculatesTouchCoordinates_SwipeStart(evt) {
        /**
        Вычисляет координаты при первом касании слайдера.
        * @param evt -> fun "getEvent"
        * @slider -> SliderWithFight
        * @slider -> SliderWithoutFight
        * @slider -> SliderWithAutomaticAdjustment
        */

        this.positionPressedX = evt.clientX;
        this.positionPressedY = evt.clientY;
        this.positionFingerPressSliderX = this.positionPressedX - this.slider.getBoundingClientRect().x;
        this.positionFingerPressSliderY = this.positionPressedY - this.slider.getBoundingClientRect().y;
    }
};


class SliderWithoutFight extends Slider {
    /**
    Слайдер без боя.
    * @param slider -> block "slider-without-fight" ( type -> HTMLElement )
    * @param options -> custom settings ( type -> Object )
    */

    constructor(slider, options) {
        super();

        this.slider = slider;
        this.options = options;
        this.sliderTrack = this.slider.querySelector(".slider-track");

        this.sliderWidth = this.slider.offsetWidth;

        this.maximumSwipingAtSlider = 0;

        this.positionSliderTrack = 0;
        this.positionFinal = 0;
        this.singleSwipe = 0;

        this.positionPressedX;
        this.positionPressedY;
        this.positionFingerPressSliderX;
        this.positionFingerPressSliderY;
        this.positionX_FingetCurrentMoment_OnSlider;
        this.positionY_FingetCurrentMoment_OnSlider;

        this.allowSwipe = true;
        this.isScrollingSlider = false;

        super.measuresMaximumSwipeOfSlider();
        this.addOptions();

        this._swipeAction = () => { this.swipeAction(); };
        this._swipeEnd = () => { this.swipeEnd(); };

        this.goingOutBoundsSlider = () => {
            /* Выход за границы слайдера мышкой. */

            this.swipeEnd();
            this.sliderTrack.removeEventListener("mouseout", this.goingOutBoundsSlider);
        };
    }

    addOptions() {
        /* Добавляет пользовательские настройки для слайдера.  */
        this.scrollAfterAbruptStop = (this.options) ? this.options.scrollAfterAbruptStop : true;
    }


    // Вспомогательные методы.
    removeEventsSliderTrack() {
        this.sliderTrack.removeEventListener("mousemove", this._swipeAction);
        this.sliderTrack.removeEventListener("touchmove", this._swipeAction);

        this.sliderTrack.removeEventListener("mouseup", this._swipeEnd);
        this.sliderTrack.removeEventListener("touchend", this._swipeEnd);

        this.sliderTrack.removeEventListener("mouseout", this.goingOutBoundsSlider);
        this.slider.classList.remove("slider-active");
    }

    addEventsSliderTrack() {
        this.sliderTrack.addEventListener("mousemove", this._swipeAction);
        this.sliderTrack.addEventListener("touchmove", this._swipeAction, { passive: true });

        this.sliderTrack.addEventListener("mouseup", this._swipeEnd);
        this.sliderTrack.addEventListener("touchend", this._swipeEnd, { passive: true });

        this.sliderTrack.addEventListener("mouseout", this.goingOutBoundsSlider);
        this.slider.classList.add("slider-active");
    };

    checksOutOfBounds() {
        /* Если палец будет заходить за границы слайдера то запрещаем его двигать.  */

        if (
            (this.positionX_FingetCurrentMoment_OnSlider >= this.positionFingerPressSliderX && this.positionSliderTrack - this.positionFinal > 0) ||
            (this.positionX_FingetCurrentMoment_OnSlider >= (this.sliderWidth - this.positionFingerPressSliderX)) && this.positionSliderTrack - this.positionFinal < 0
            ) {

            this.measuresSpeedTrafficSliderTrack();
            this.removeEventsSliderTrack();
        };
    }


    // Автоматическая прокрутка.
    measuresSpeedTrafficSliderTrack() {
        /* Измеряет скорость движение трека.  */

        const speedSlider = (this.singleSwipe / this.swipeSlider_Time).toFixed(2);

        this.autoPushingSlider(speedSlider);
    }

    autoPushingSlider(speedSlider) {
        /* Автоматически пролистывает слайдер  */

        if (speedSlider <= 0.6 || this.positionSliderTrack > this.maximumSwipingAtSlider) {
            return;
        };

        let newPosition = speedSlider * this.positionSliderTrack;

        if (newPosition < this.positionSliderTrack) {
           newPosition = this.positionSliderTrack;
        };

        if (this.directionSliderTrack === "right") {
            newPosition = Math.round(newPosition - (newPosition - (this.positionSliderTrack / 1.45)));
        };

        if (newPosition > this.maximumSwipingAtSlider) {
            newPosition = this.maximumSwipingAtSlider;
        } else if (newPosition < 0) {
            newPosition = 0;
        };

        this.setsStyle_For_autoPushingSlider(newPosition);
    }

    setsStyle_For_autoPushingSlider(newPosition) {
        /* Устанавливает стили для автоматической прокрутки.  */

        this.sliderTrack.style.transform = `translate3d(-${newPosition}px, 0px, 0px)`;
        this.sliderTrack.style.transition = `transform 1s ease-out`;

        this.sliderTrack.addEventListener("transitionend", () => {
            this.sliderTrack.style.transition = `none`;
            this.positionFinal = this.positionSliderTrack = newPosition;
        });
    }

    stopsAutoScrolling() {
        /* Останавливает автоматическую прокрутку при захвата слайдера.  */

        const curretnPositionSliderTrack = Math.abs(
            Math.round(this.sliderTrack.getBoundingClientRect().x) - Math.round(this.slider.getBoundingClientRect().x)
        );
        this.positionFinal = this.positionSliderTrack = curretnPositionSliderTrack;

        this.sliderTrack.style.transform = `translate3d(-${this.positionFinal}px, 0px, 0px)`
    }


    // Функционал слайдера.
    pushingSlider() {
        this.singleSwipe = Math.abs(this.positionSliderTrack - this.positionFinal);

        if (this.singleSwipe >= 5) {
            this.isScrollingSlider = true;
        };

        if ( (this.positionSliderTrack <= this.maximumSwipingAtSlider ) && (this.positionSliderTrack > 0)) {
            this.sliderTrack.style.transform = `translate3d(-${this.positionSliderTrack}px, 0px, 0px)`;
        };
    };

    swipeStart() {
        this.stopsAutoScrolling();

        this.allowSwipe = true;
        this.time_1 = performance.now();

        const evt = super.getEvent();

        super.calculatesTouchCoordinates_SwipeStart(
            this.evt = evt
        )

        this.sliderTrack.style.transform = `translate3d(${-this.positionFinal}px, 0px, 0px)`;
        this.sliderTrack.style.transition = `none`;

        this.addEventsSliderTrack();
    }

    swipeAction() {
        const evt = super.getEvent();
        this.directionSliderTrack = (this.positionPressedX < evt.clientX) ? "right" : "left";

        super.checkSliderCanBeMoved(
            this.evt = evt
        );

        if (!this.allowSwipe) {
            return
        };

        if (event.type === "touchmove") {
            this.positionX_FingetCurrentMoment_OnSlider = Math.abs(this.positionPressedX - evt.clientX);
            this.positionY_FingetCurrentMoment_OnSlider = Math.abs(this.positionPressedY - evt.clientY);

            this.checksOutOfBounds();
        };

        if (this.allowSwipe) {
            this.positionSliderTrack = this.positionPressedX - evt.clientX + this.positionFinal;
            this.pushingSlider();
        };
    };

    swipeEnd() {
        if (!this.allowSwipe) {
            this.allowSwipe = true;
            return;
        };

        this.singleSwipe = Math.abs(this.positionSliderTrack - this.positionFinal);

        this.positionFinal = this.positionSliderTrack;

        // если мы будем тянуть слайдер, когда уже начало или конец слайдер, то мы будем
        // перезаписыать переменню "positionFinal" на максимальную или минималбную позицию.
        if (this.positionFinal > this.maximumSwipingAtSlider) {
            this.positionFinal = this.maximumSwipingAtSlider;

        } else if (this.positionFinal < 0) {
            this.positionFinal = 0;
        };

        this.allowSwipe = true;
        this.isScrollingSlider = false;

        if (this.scrollAfterAbruptStop) {
            this.swipeSlider_Time = performance.now() - this.time_1;
            this.measuresSpeedTrafficSliderTrack();
        };

        this.removeEventsSliderTrack();
    }


    run() {
        this.sliderTrack.addEventListener("touchstart", () => { this.swipeStart(); }, { passive: true });
        this.sliderTrack.addEventListener("mousedown", () => { this.swipeStart(); });

        this.sliderTrack.style.transform = `translate3d(0px, 0px, 0px)`;
    }
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
        arrayItems,
        activeClass
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
        trainingPackageBtnsOnline_1,
        "training-package-btn-active"
    );

    event.currentTarget.classList.add("training-package-btn-active");

    add_delectActiveClass_trainingPackageItem(
        trainingPackageBlockItemsOnline,
        positionBtnOnline_1 + positionBtnOnline_2,
        "training-package-content-items-active"
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
        trainingPackageBlockItemsOnline,
        positionBtnOnline_1 + positionBtnOnline_2,
        "training-package-content-items-active"
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
        trainingPackageBlockItemsOffline,
        indexTrainingPackageBlock,
        "training-package-content-items-active"
    );
};

if (trainingPackageBlockItemsOffline) {
    trainingPackageBtnsOffline.forEach((btn) => {
        btn.addEventListener("click", pressedTrainingPackageBtnOffline);
    });

    trainingPackageBlockItemsOfflineSliders.forEach((items) => {
        new SliderWithoutFight(items).run();
    });

    if (document.querySelector(".training-package__content-back-btns")) {
        if (document.querySelector(".training-package__content-back-btns").classList.contains("slider")) {
            new SliderWithoutFight(document.querySelector(".training-package__content-back-btns")).run();
        }
    }
};


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

    addActiveCLassBtnLineMenu(0);

    if (typeTraining.split("-")[0] == "offline") {
        trainingPackageBtnsLineMenu[1].classList.remove("back-btns-line-menu-active-online");
        trainingPackageBtnsLineMenu[1].classList.add("back-btns-line-menu-active-offline");

    } else if (typeTraining.split("-")[0] == "online") {
        trainingPackageBtnsLineMenu[1].classList.remove("back-btns-line-menu-active-offline");
        trainingPackageBtnsLineMenu[1].classList.add("back-btns-line-menu-active-online");
    };
};

const opensLessonDurationMenuContent = () => {
    addActiveCLassBtnLineMenu(1);

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

    trainingPackageContentWrapperItems.querySelectorAll(".slider").forEach((slider) => {
        new SliderWithoutFight(slider).run();
    });

    if (innerWidth <= 720) {
        if (document.querySelector(".training-package__content-back-btns-line")) {
            new SliderWithoutFight(document.querySelector(".training-package__content-back-btns-line")).run();
        };
    };
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
