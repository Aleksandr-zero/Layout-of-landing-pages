class Slider {

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
    }
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

        this._swipeStart = () =>  { this.swipeStart(); };
        this._swipeAction = () => { this.swipeAction(); };
        this._swipeEnd = () => 	  { this.swipeEnd(); };

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
        this.allowSwipe = true;
    }

    addEventsSliderTrack() {
        this.sliderTrack.addEventListener("mouseup", this._swipeEnd);
        this.sliderTrack.addEventListener("touchend", this._swipeEnd, { passive: true });

        this.sliderTrack.addEventListener("mousemove", this._swipeAction);
        this.sliderTrack.addEventListener("touchmove", this._swipeAction, { passive: true });

        this.sliderTrack.addEventListener("mouseout", this.goingOutBoundsSlider);
        this.slider.classList.add("slider-active");
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
    }


    // Функционал слайдера.
    pushingSlider() {
        this.singleSwipe = this.positionSliderTrack - this.positionFinal;

        this.sliderTrack.style.transform = `translate3d(${-this.positionSliderTrack}px, 0px, 0px)`;

        if (Math.abs(this.singleSwipe) >= 5) {
            this.isScrollingSlider = true;
        };
    }

    swipeStart() {
        if (!this.allowSwipe) {
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

        if ((Math.abs(this.singleSwipe) <= this.percentForSuccessfulScrolling)) {
            this.returnsSliderBack();
            return;
        };

        this.checksIfSliderNeedsPromoted();
    }


    run() {
        this.sliderTrack.addEventListener("mousedown", this._swipeStart);
        this.sliderTrack.addEventListener("touchstart", this._swipeStart, { passive: true });
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

