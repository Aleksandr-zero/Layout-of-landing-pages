class Navigation {
	/**
	* @param slider -> block "slider" ( type -> HTMLElement )
	Создаёт навигацию для слайдера.
	*/

	constructor(slider, speed) {
		this.slider = slider;
		this.sliderTrack = this.slider.querySelector(".slider-track");

		this.speed = speed;

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

	addTransitionSliderTrack(newPosition) {
		this.sliderTrack.style.transition = `transform 0.${this.speed}s ease`;

		setTimeout(() => {
			this.sliderTrack.style.transform = `translate3d(${-newPosition}px, 0px, 0px)`;
		}, 0);

		setTimeout(() => {
			this.sliderTrack.style.transition = `transform 0s ease`;
		},  this.speed);
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

		this.addTransitionSliderTrack(newPosition);

		return {
			"position": newPosition,
			"current_slide": newCurrentSlide
		};
	}
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
	*
	* @property _swipeStart = () => { this.swipeStart(); };
    * @property _swipeAction = () => { this.swipeAction(); };
    * @property _swipeEnd = () => { this.swipeEnd(); };
	*/

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


	// Навешивание событий
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


	// Вспомогательные методы.
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
		this.newNavigation = new Navigation(this.slider, this.speed);

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

			if ( this.className == "SliderWithPreviews" ) {
				this.changeDataForSLiderPreviews();
				this.pushingSliderPreviews();
			};

			if ( this.isPagination ) {
				this.watchSwipeSliderTrack_Pagination();
			};
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
		* @slider -> SliderWithPreviews
		*/

		this.positionPressedX = evt.clientX;
		this.positionPressedY = evt.clientY;
		this.positionFingerPressSliderX = this.positionPressedX - this.slider.getBoundingClientRect().x;
		this.positionFingerPressSliderY = this.positionPressedY - this.slider.getBoundingClientRect().y;
	}

	checkNavigation() {
		const navigation = this.slider.querySelector(".slider-navigation");

		if ( navigation ) {
			this.addNavigation();
		};
	}
};


class SliderWithSections {
	/**
	* @param slider - block "slider-with-sections" ( type -> HTMLElement )
	* @param options -> custom settings ( type -> Object )
	Слайдер с секциями
	*/

	constructor(slider, options) {
		this.slider = slider;
		this.options = options;

		this.sliderTrack = this.slider.querySelector(".slider-track");

		this.btnPrev = this.slider.querySelector(".btn-slider-push-last");
		this.btnNext = this.slider.querySelector(".btn-slider-push-next");

		this.slides = this.slider.querySelectorAll(".slide");

		this.allowSwipe = true;

		this.positionSliderTrack = 0;

		this.addOptions();
		this.createBreakpoints();
	}

	addOptions() {
		this.options = this.options;

		this.scrollSlidesAtTime = (this.options.scrollSlidesAtTime) ? this.options.scrollSlidesAtTime : 1;
		this.slidesPerView = this.options.slidesPerView;
		this.lastVisibleSlide = this.slidesPerView;

		this.speed = (this.options.speed) ? this.options.speed : 250;
		this.breakpoints = (this.options.breakpoints) ? this.options.breakpoints : {};


		if ( !this.slidesPerView ) {
			throw "You did not specify a parameter <slidesPerView>"
		};
	}

	// Вспомогательные методы
	getNewPositionSliderTrack(numberSlide) {
		/* Выщитывает новую позицию при текущем слайде.  */

		let newPosition = 0;

		for (let slide = 0; slide < numberSlide; slide++) {
			newPosition += this.slides[slide].offsetWidth + parseFloat(getComputedStyle(this.slides[slide]).marginRight);
		};

		newPosition = (this.lastVisibleSlide !== this.slides.length) ?
					   newPosition - ( this.slider.offsetWidth + parseFloat(getComputedStyle(this.slides[0]).marginRight)) :
					   newPosition - this.slider.offsetWidth;
		return newPosition;
	}

	checksIfLimitIsExceeded() {
		if ( this.lastVisibleSlide > this.slides.length ) {
			this.lastVisibleSlide = this.slides.length;
		} else if ( this.lastVisibleSlide < this.slidesPerView ) {
			this.lastVisibleSlide = this.slidesPerView;
		};
	}

	updateApplicationBreakpoints() {
		const keys = Object.keys(this.breakpoints).map(Number);
		keys.forEach((key) => {
			this.applicationBreakpoints[key] = false;
		});
	}


	// Создание брейкпоинтов
	getBreakpoints() {
		return Object.entries(this.breakpoints).length === 0 && this.breakpoints.constructor === Object ? false : true;
	}

	createBreakpoints() {
		if ( !this.getBreakpoints() ) {
			return;
		};

		this.createBreakpoint();
		this.checkResizeWindow_FisrtStart();
	}

	// Добавление событий
	addEventClickBtnPushSlider() {
		this.btnPrev.addEventListener("click", () => { this.pushSliderOnClickBtn(); });
		this.btnNext.addEventListener("click", () => { this.pushSliderOnClickBtn(); });
	}

	// Функционал передвижения
	pushSliderOnClickBtn() {
		/* Передвигает слайдер при клике на кнопку.  */

		const direction = event.currentTarget.dataset.direction;

		if ( ( this.lastVisibleSlide === this.slidesPerView && direction === "last") || !this.allowSwipe ) {
			return;
		};

		this.lastVisibleSlide += (direction === "next") ? this.scrollSlidesAtTime : -this.scrollSlidesAtTime

		this.checksIfLimitIsExceeded();

		const newPosition = this.getNewPositionSliderTrack(this.lastVisibleSlide);
		this.addTransitionSliderTrack(newPosition);
	}

	addTransitionSliderTrack(newPosition) {
		/* Добавляет плавную прокрутку для слайдера.  */

		this.sliderTrack.style.transition = `transform 0.${this.speed}s ease`;

		setTimeout(() => {
			this.positionSliderTrack = newPosition;
			this.sliderTrack.style.transform = `translate3d(${-newPosition}px, 0px, 0px)`;
		}, 0);
	}


	// брейкпоинты
	checkResizeMaxWidthBreakpoint() {
		window.addEventListener("resize", () => {
			if ( window.innerWidth > this.maxWidth && this.applicationBreakpoints[this.maxWidth] ) {
				this.updateApplicationBreakpoints();

				this.setsNewDataBreakpoints(false);
			};
		});
	}

	updateApplication_ForBreakpoints(currentWidth) {
		const keys = Object.keys(this.applicationBreakpoints).map(Number);

		keys.forEach((key) => {
			if ( key !== currentWidth ) {
				this.applicationBreakpoints[key] = false;
			};
		});
	};

	addEventResizeWindow(width, data, secondaryWidth) {
		/* Создаёт для каждого брейкпоинта отдельный обработчик.  */

		const checkResizeWindow = () => {
			return ( secondaryWidth ) ?
				window.innerWidth <= width && window.innerWidth > secondaryWidth :
				window.innerWidth <= width;
		};

		window.addEventListener("resize", () => {
			if ( checkResizeWindow() && !this.applicationBreakpoints[width] ) {
				this.applicationBreakpoints[width] = true;
				this.setsNewDataBreakpoints(data);

				this.updateApplication_ForBreakpoints(width);
			};
			this.checkResizeMaxWidthBreakpoint();
		});
	}

	createBreakpoint() {
		/* Создаёт данные для прослушки изменения ширины экрана.  */

		this.applicationBreakpoints = {};

		this.updateApplicationBreakpoints();

		const keys = Object.keys(this.breakpoints).map(Number);
		this.maxWidth = Math.max(...keys);

		Object.entries(this.breakpoints).forEach((breakpoint, index) => {
			let secondaryWidth = keys[index - 1];
			const width = parseInt(breakpoint[0]);
			const data = breakpoint[1];

			this.addEventResizeWindow(width, data, secondaryWidth);
		});
	}

	checkResizeWindow_FisrtStart() {
		/* Проверяет ширину экрана при первом запуске слайдера.  */

		const checkResizeWindow = (width, secondaryWidth) => {
			return ( secondaryWidth ) ?
				window.innerWidth <= width && window.innerWidth > secondaryWidth :
				window.innerWidth <= width;
		};

		const keys = Object.keys(this.breakpoints).map(Number);

		keys.forEach((key, index) => {
			if ( checkResizeWindow(key, keys[index - 1]) ) {
				this.applicationBreakpoints[key] = true;

				const newData = this.breakpoints[key];
				this.setsNewDataBreakpoints(newData);
			};
		});
	}

	setsNewDataBreakpoints(newData) {
		this.slidesPerView = (newData.slidesPerView) ? newData.slidesPerView : this.options.slidesPerView;
		this.scrollSlidesAtTime = (newData.scrollSlidesAtTime) ? newData.scrollSlidesAtTime : this.options.scrollSlidesAtTime;
		this.lastVisibleSlide = (newData.slidesPerView) ? newData.slidesPerView : this.options.slidesPerView;
	}


	run() {
		this.addEventClickBtnPushSlider();
	}
};


class SliderSplit {
	/**
	* @param slider - block "slider-split" ( type -> HTMLElement )
	Слайдер с секциями
	*/

	constructor(slider) {
		this.slider = slider;

		this.slides = this.slider.querySelectorAll(".slide");
		this.btns = this.slider.querySelectorAll(".intro__container-slider-btn")
	}

	addEventClickBtns() {
		this.btns.forEach((btn) => {
			btn.addEventListener("click", () => { this.changeSlides(); });
		});
	}

	changeActiveBtn(pressedBtn) {
		this.slider.querySelector(".intro-slider-btn-active").classList.remove("intro-slider-btn-active");
		pressedBtn.classList.add("intro-slider-btn-active");
	}

	changeSlides() {
		const numberSlide = event.currentTarget.dataset.positionSlide - 1;

		this.slider.querySelector(".intro-slide-active").classList.remove("intro-slide-active");
		this.slides[numberSlide].classList.add("intro-slide-active");

		this.changeActiveBtn(event.currentTarget)
	}

	run() {
		this.addEventClickBtns();
	}
};


class SliderWithPreviews extends Slider {
    /**
	* @param slider - block "slider-with-previews" ( type -> HTMLElement )
	* @param options -> custom settings ( type -> Object )
	Слайдер с превьюхами
	*/

	constructor(slider, options) {
		super();

		this.slider = slider;
		this.options = options;
		this.className = "SliderWithPreviews";

		this.currentSlide = 0;
		this.currentSlidePreview = 0;

		this.sliderWidth = Math.round(this.slider.getBoundingClientRect().width);

		this.sliderTrack = this.slider.querySelector(".slider-track");
		this.slides = this.slider.querySelectorAll(".slide");
		this.sliderTrackPreviews = this.slider.querySelector(".slider-track-previews");
		this.slidesPreviews = this.slider.querySelectorAll(".slide-preview");

		this.slidePreviewsMarRight = parseInt(getComputedStyle(this.slidesPreviews[this.currentSlidePreview]).marginRight);

    	this.positionPressedX;
    	this.positionPressedY;
    	this.positionFingerPressSliderX;
    	this.positionFingerPressSliderY;
    	this.positionX_FingetCurrentMoment_OnSlider;
    	this.positionY_FingetCurrentMoment_OnSlider;

    	this.positionSliderTrack = 0;
    	this.positionFinal = 0;

    	this.positionSliderTrackPreview = 0;

		this.allowSwipe = true;

		this.allowSwipe = true;
		this.isScrollingSlider = false;

    	this._swipeStart = () => { this.swipeStart(); };
    	this._swipeAction = () => { this.swipeAction(); };
    	this._swipeEnd = () => { this.swipeEnd(); };

		this.addOptions();
		this.addNavigation();

		this.lastVisibleSlidePreviews = this.slidesPreviewPerView;

		this.goingOutBoundsSlider = () => {
			/* Выход за границы слайдера мышкой. */

			this.swipeEnd();
			this.sliderTrack.removeEventListener("mouseout", this.goingOutBoundsSlider);
		};
	}

	addOptions() {
		this.speed = (this.options.speed) ? this.options.speed : 200;
		this.movementClickingOnPreview = (this.options.movementClickingOnPreview) ? this.options.movementClickingOnPreview : false;
		this.slidesPreviewPerView = this.options.slidesPreviewPerView;

		if ( !this.slidesPreviewPerView ) {
			throw "You did not specify a parameter <slidesPreviewPerView>"
		};
	}

	// Вспомогательные методы
	checkDataForMovement() {
		if ( this.currentSlide < 0 ) {
			this.currentSlide = 0;
		} else if ( this.currentSlide > this.slides.length - 1 ) {
			this.currentSlide = this.slides.length - 1;
		};
	}

	addNavigation() {
		const navigation = this.slider.querySelector(".slider-navigation");

		if ( navigation ) {
			super.addNavigation();
		};
	}

	findClassContains(classes) {
		let isClass = false;

		for (let index = 0; index < classes.length; index++) {
			isClass = (classes[index].includes("slide-preview")) ? true : false;
		};

		return isClass;
	}

	// Навешивание событий
	addEvent_SliderPreviews() {
		/* Добавляет прослушку на слайдер с превьюхами.  */

		this.slidesPreviewsArr = Array.prototype.slice.call(this.slidesPreviews);

		this.sliderTrackPreviews.addEventListener("click", () => {

			if ( !this.allowSwipe ) {
				return;
			};

			if ( this.findClassContains(event.target.classList) ) {
				const pressedSlidePreview = this.slidesPreviewsArr.indexOf(event.target) + 1;

				this.lastVisibleSlidePreviews = pressedSlidePreview;
				this.currentSlidePreview = pressedSlidePreview - 1;
				this.currentSlide = pressedSlidePreview;

				this.addTransitionSliderTrack();
			};
		});
	}


	// Передвижение слайдера с превьюхами.
	pushingSliderPreviews() {
		/* Передвижение слайдера с превьюхами.  */

		if ( this.lastVisibleSlidePreviews > this.slidesPreviews.length ) {
			this.lastVisibleSlidePreviews = this.slidesPreviews.length;
			this.currentSlidePreview = this.slidesPreviews.length - this.slidesPreviewPerView;
		};

		this.sliderTrackPreviews.style.transition = `transform 0.${this.speed}s ease`;

		this.positionSliderTrackPreview = this.currentSlidePreview * this.slidesPreviews[0].offsetWidth;
		this.positionSliderTrackPreview += ( this.currentSlidePreview === 1 ) ?
			this.slidePreviewsMarRight : this.slidePreviewsMarRight * this.currentSlidePreview;

		setTimeout(() => {
			this.sliderTrackPreviews.style.transform = `translate3d(${-this.positionSliderTrackPreview}px, 0px, 0px)`;
		}, 0);
	}


	// Передвижение обычного слайдера.
	pushingSlider() {
		this.singleSwipe = this.positionSliderTrack - this.positionFinal;

		this.sliderTrack.style.transform = `translate3d(${-this.positionSliderTrack}px, 0px, 0px)`;

		if (Math.abs(this.singleSwipe) >= 5) {
			this.isScrollingSlider = true;
		};
	}

	swipeStart() {
		super.addEventsSliderTrack();

		const evt = super.getEvent();
		super.calculatesTouchCoordinates_SwipeStart(evt);

		this.sliderTrack.style.transform = `translate3d(${-this.positionFinal}px, 0px, 0px)`;
	}

	swipeAction() {
		const evt = super.getEvent();
		super.checkSliderCanBeMoved(evt);

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

	changeDataForSLiderPreviews() {
		this.currentSlidePreview = this.currentSlide;
		this.lastVisibleSlidePreviews = this.currentSlidePreview + this.slidesPreviewPerView;

		if ( this.currentSlidePreview !== 0 ) {
			this.currentSlidePreview--;
			this.lastVisibleSlidePreviews--;
		};
		this.pushingSliderPreviews();
	}

	addTransitionSliderTrack() {
		this.currentSlide += ( this.singleSwipe > 0 ) ? 1 : -1;

		this.checkDataForMovement();
		this.changeDataForSLiderPreviews();

		this.sliderTrack.style.transition = `transform 0.${this.speed}s ease`;
		this.positionSliderTrack = this.currentSlide * this.sliderWidth;
		this.positionFinal = this.positionSliderTrack;
		this.allowSwipe = false;

		setTimeout(() => {
			this.sliderTrack.style.transform = `translate3d(${-this.positionSliderTrack}px, 0px, 0px)`;
		}, 0)

		setTimeout(() => {
			this.sliderTrack.style.transition = "none";
			this.allowSwipe = true;
		}, this.speed);
	}

	swipeEnd() {
		super.removeEventsSliderTrack();
		this.addTransitionSliderTrack();

		this.isScrollingSlider = false;
		this.allowSwipe = true;
		this.singleSwipe = 0;
	}


	run() {
		this.sliderTrack.addEventListener("touchstart", this._swipeStart, { passive: true });
		this.sliderTrack.addEventListener("mousedown", this._swipeStart);

		if ( this.movementClickingOnPreview ) {
			this.addEvent_SliderPreviews();
		};
	}
};
