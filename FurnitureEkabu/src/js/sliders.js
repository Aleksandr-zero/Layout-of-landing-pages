class Navigation {
    /**
    * @param slider -> block "slider" ( type -> HTMLElement )
    Создаёт навигацию для слайдера.
    */

    constructor(slider) {
        this.slider = slider;
        this.sliderTrack = this.slider.querySelector(".slider-track");

        this.slides = this.slider.querySelectorAll(".slide");

        this.maximumSwipingAtSlider = 0;

        this.measuresMaximumSwipeOfSlider();
    }

    measuresMaximumSwipeOfSlider() {
        /* Измеряет максимальную длину прокрутки слайдера.  */

        this.sliderTrack.querySelectorAll(".slide").forEach((slide) => {
            this.maximumSwipingAtSlider += slide.offsetWidth;
        });

        this.maximumSwipingAtSlider -= this.slider.clientWidth;
    }

    getNewPositionSliderTrack(currentSlide) {
        let newPosition = 0;

        for (let indexSlide = 0; indexSlide < currentSlide; indexSlide++) {
            newPosition +=  Math.round(this.slides[indexSlide].getBoundingClientRect().width);
        };

        const checkNewPosition = this.checkNewPosition(newPosition);
        newPosition = checkNewPosition;

        return newPosition;
    }

    addTransitionSliderTrack(duration, newPosition) {
        this.sliderTrack.style.transition = `transform 0.${duration}s ease`;

        setTimeout(() => {
            this.sliderTrack.style.transform = `translate3d(${-newPosition}px, 0px, 0px)`;
        }, 0);

        setTimeout(() => {
            this.sliderTrack.style.transition = `transform 0s ease`;
        }, duration);
    }

    checkNewPosition(newPosition) {
        if ( newPosition > this.maximumSwipingAtSlider ) {
            newPosition = this.maximumSwipingAtSlider;
        } else if ( newPosition < 0 ) {
            newPosition = 0;
        };

        return newPosition
    }

    pushingSliderTrack(direction, currentSlide) {
        if ( ( currentSlide === this.slides.length - 1 && direction !== "last" ) ||
             ( currentSlide === 0 && direction !== "next" ) ) {
            return;
        };

        const newCurrentSlide = (direction === "next") ? currentSlide + 1 : currentSlide - 1;

        const newPosition = this.getNewPositionSliderTrack(newCurrentSlide);

        const widthCurrentSlide = Math.round(this.slides[currentSlide].getBoundingClientRect().width);
        const positionSliderTrack = Math.abs(getComputedStyle(this.sliderTrack).transform.split(",")[4]);

        this.addTransitionSliderTrack(500, newPosition);

        return {
            "position": newPosition,
            "current_slide": newCurrentSlide
        };
    }
};


class Pagination {
    /**
    * @param slider -> block "slider" ( type -> HTMLElement )
    Создаёт пагинацию для слайдера.
    */

    constructor(slider) {
        this.slider = slider;

        this.btnsPagination = this.slider.querySelectorAll(".pagination-btn");
    }

    changeBtnPagination(currentSlide) {
        /* Изменяет кнопку пагинации на активную в зависимости слайдера.  */

        this.btnsPagination.forEach((btn) => {
            btn.classList.remove("pagination-btn-active");
        });

        this.btnsPagination[currentSlide].classList.add("pagination-btn-active");
    };
};


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
            this.maximumSwipingAtSlider += slide.offsetWidth;
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


class SliderWithFight extends Slider {
    /**
    Слайдер с боем.
    * @param slider -> block "slider-with-fight" ( type -> HTMLElement )
    * @param options -> custom settings ( type -> Object )
    */

    constructor(slider, options) {
        super();

        this.slider = slider;
        this.options = options;

        this.sliderWidth = Math.round(this.slider.getBoundingClientRect().width);

        this.sliderTrack = this.slider.querySelector(".slider-track");

        this.currentSlide = 0;
        this.numberSlides = this.sliderTrack.querySelectorAll(".slide");

        this.positionSlider = 0;
        this.positionFinal = 0;

        this.positionPressedX;
        this.positionPressedY;
        this.positionFingerPressSliderX;
        this.positionFingerPressSliderY;
        this.positionX_FingetCurrentMoment_OnSlider;
        this.positionY_FingetCurrentMoment_OnSlider;

        this.allowSwipe = true;
        this.isScrollingSlider = false;

        this.addOptions();
        super.checkIsPaginationSlider();
        this.addNavigation();

        this._swipeStart = () =>  { this.swipeStart(); };
        this._swipeAction = () => { this.swipeAction(); };
        this._swipeEnd = () =>       { this.swipeEnd(); };

        this.percentForSuccessfulScrolling = Math.round((this.sliderWidth / 100) * this.percentageForSuccessfulScrolling);

        this.goingOutBoundsSlider = () => {
            /* Выход за границы слайдера мышкой. */

            this.swipeEnd();
            this.sliderTrack.removeEventListener("mouseout", this.goingOutBoundsSlider);
        };
    }

    addOptions() {
        this.percentageForSuccessfulScrolling = (this.options.percentageForSuccessfulScrolling) ?
                                                 this.options.percentageForSuccessfulScrolling : 35;
    }


    // Вспомогательные методы.
    removeEventsSliderTrack() {
        /* Удаляет события у блока - sliderTrack и у самого слайдер  */

        this.sliderTrack.removeEventListener("touchmove", this._swipeAction);
        this.sliderTrack.removeEventListener("touchend", this._swipeEnd);

        this.sliderTrack.removeEventListener("mousemove", this._swipeAction);
        this.sliderTrack.removeEventListener("mouseout", this.goingOutBoundsSlider);
        this.sliderTrack.removeEventListener("mouseup", this._swipeEnd);

        this.slider.classList.remove("slider-active");
    }

    addEventsSliderTrack() {
        this.sliderTrack.addEventListener("mouseup", this._swipeEnd);
        this.sliderTrack.addEventListener("touchend", this._swipeEnd, { passive: true });

        this.sliderTrack.addEventListener("mousemove", this._swipeAction);
        this.sliderTrack.addEventListener("touchmove", this._swipeAction, { passive: true });

        this.sliderTrack.addEventListener("mouseout", this.goingOutBoundsSlider);
        this.slider.classList.add("slider-active");
    }

    checkIsNavigation_Pagination() {
        if ( this.isPagination ) {
            super.watchSwipeSliderTrack_Pagination();
        };
    }

    addTransitionSliderTrack(duration) {
        this.sliderTrack.style.transition = `transform 0.${duration}s ease`;
        this.positionFinal = this.currentSlide * this.sliderWidth;
        this.allowSwipe = false;

        setTimeout(() => {
            this.sliderTrack.style.transform = `translate3d(${-this.positionFinal}px, 0px, 0px)`;
        }, 0)

        setTimeout(() => {
            this.sliderTrack.style.transition = "none";
            this.allowSwipe = true;
        }, duration)
    }

    returnsSliderBack() {
        /* Возвращает слайдер на место если не проскролил нужно количество.  */
        this.addTransitionSliderTrack(500);
    }


    checksIfSliderNeedsPromoted() {
        /* Проверяет надо ли продвигать слайдер.  */

        if (this.singleSwipe >= this.percentForSuccessfulScrolling && this.currentSlide !== this.numberSlides.length - 1) {
            this.currentSlide++;
            this.addTransitionSliderTrack(500);
        } else if (this.singleSwipe <= this.percentForSuccessfulScrolling && this.currentSlide !== 0) {
            this.currentSlide--;
            this.addTransitionSliderTrack(500);
        } else {
            this.returnsSliderBack();
        };

        this.checkIsNavigation_Pagination();
    }


    // Функционал слайдера.
    pushingSlider() {
        this.singleSwipe = this.positionSliderTrack - this.positionFinal;

        this.sliderTrack.style.transform = `translate3d(${-this.positionSliderTrack}px, 0px, 0px)`;

        if (Math.abs(this.singleSwipe >= 5) && !this.isScrollingSlider) {
            this.isScrollingSlider = true;
        };
    }

    swipeStart() {
        if ( !this.allowSwipe ) {
            setTimeout(() => {
                this.allowSwipe = true;
            });
            return;
        };

        const evt = super.getEvent();

        super.calculatesTouchCoordinates_SwipeStart(
            this.evt = evt
        );

        this.sliderTrack.style.transform = `translate3d(-${this.positionFinal}px, 0px, 0px)`;

        this.addEventsSliderTrack();
    }

    swipeAction() {
        const evt = super.getEvent();

        super.checkSliderCanBeMoved(
            this.evt = evt
        );

        if (!this.allowSwipe) {
            return
        };

        this.positionSliderTrack = this.positionPressedX - evt.clientX + this.positionFinal;

        if (event.type === "touchmove") {
            this.positionX_FingetCurrentMoment_OnSlider = Math.abs(this.positionPressedX - evt.clientX);
            this.positionY_FingetCurrentMoment_OnSlider = Math.abs(this.positionPressedY - evt.clientY);

            super.checksOutOfBounds();
        };

        this.pushingSlider();
    }

    swipeEnd() {
        this.removeEventsSliderTrack();
        this.isScrollingSlider = false;
        this.allowSwipe = true;

        if ((Math.abs(this.singleSwipe) <= this.percentForSuccessfulScrolling)) {
            this.returnsSliderBack();
            return;
        };

        this.checksIfSliderNeedsPromoted();
    }


    addNavigation() {
        const navigation = this.slider.querySelector(".slider-navigation");

        if ( navigation ) {
            super.addNavigation();
        };
    }


    run() {
        this.sliderTrack.addEventListener("mousedown", this._swipeStart);
        this.sliderTrack.addEventListener("touchstart", this._swipeStart, { passive: true });

        this.sliderTrack.style.transform = `translate3d(0px, 0px, 0px)`;
    }
};


class SliderSplit {
    /**
    * @param slider -> block "slider-split" ( type -> HTMLElement )
    * @param options -> custom settings ( type -> Object )
    Разделённый слайдер в одной плоскости.
    */

    constructor(slider, options) {
        this.slider = slider;
        this.options = options;

        this.slides = this.slider.querySelectorAll(".slide");
        this.slidesNumbers = this.slides.length;
        this.sliderBtns = this.slider.querySelectorAll(".slider-split-btn");

        this.currentSlide = 0;

        this.sliderWidth = this.sliderWidth = Math.round(this.slider.getBoundingClientRect().width);

        this.percentageForChangingSlides = Math.round(this.sliderWidth / this.slidesNumbers);

        this._mouseMovement_On_Slider = () => { this.mouseMovement_On_Slider(); };

        this.setsZIndex_For_Slides();
    }


    // Вспомогательные методы.
    getEvent() {
        return (event.type.search('touch') != -1) ? event.touches[0] : event;
    }

    findSlide_CurrentLocationsCursor(evt) {
        /* Находит слайд в зависимости расположения курсора мыши.  */

        const positionCurrentCursor = (evt.clientX - this.slider.getBoundingClientRect().x).toFixed(2);
        const currentSlide = Math.floor(positionCurrentCursor / this.percentageForChangingSlides);

        if ( this.currentSlide !== currentSlide ) {
            this.currentSlide = currentSlide;

            this.setsActiveSlide();
            this.setsActiveBtn();
        };
    }

    setsActiveSlide() {
        this.slides.forEach((slide) => {
            slide.classList.remove("slide-split-active");
        });

        this.slides[this.currentSlide].classList.add("slide-split-active");
    }

    setsActiveBtn() {
        this.sliderBtns.forEach((btn) => {
            btn.classList.remove("split-btn-active");
        });

        this.sliderBtns[this.currentSlide].classList.add("split-btn-active");
    }

    setsZIndex_For_Slides() {
        let zIndex = 5 * this.slidesNumbers;

        this.slides.forEach((slide) => {
            slide.style.zIndex = `${zIndex}`;
            zIndex -= 5;
        });
    }


    // Отвечает за функционал.
    mouseMovement_On_Slider() {
        /* Движение курсора по области слайдера.  */

        const evt = this.getEvent();

        this.findSlide_CurrentLocationsCursor(
            this.evt = evt
            );
    }


    run() {
        this.slider.addEventListener("mousemove", this._mouseMovement_On_Slider);
    }
};