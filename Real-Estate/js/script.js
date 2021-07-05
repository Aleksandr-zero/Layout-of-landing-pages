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

		this.sliderTrack.querySelectorAll(".properties__content-item").forEach((slide) => {
			this.maximumSwipingAtSlider += slide.clientWidth + (+getComputedStyle(slide).marginRight.replace(/px/, ""));
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


// block - Header

const header = document.querySelector(".header");

const btnMenuHeaderOpen = document.querySelector(".header__content-back-btn");
const btnMenuHeaderClose = document.querySelector(".header__content-nav_mobile-btn");
const mobileNavMenu = document.querySelector(".header__content-nav_mobile");


// block - Intro

const introContentBox_2_btn = document.querySelector(".intro__content-text-search-content-box_2");
const introContentBox_2 = document.querySelector(".intro__content-text-search-content-box_2-addresses");
const introContentBoxItems = document.querySelectorAll(".search-content-box-2");
const introContentBoxImg = document.querySelector(".intro__content-text-search-content-box_2-img");

const introContentItems = document.querySelector(".intro__content-img-items");
const introContentItemCount = document.querySelectorAll(".intro__content-img-item").length;

const introBtnPrev = document.querySelector(".intro__content-img-btn-prev");
const introBtnNext = document.querySelector(".intro__content-img-btn-next");

let positionIntroContentScore = 0;
let positionIntroContent = 0;


// block - Properties
const propertiesContentSlider = document.querySelector(".properties__content-slider");


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

window.addEventListener("scroll", () => {
    if (pageYOffset >= 100) {
        header.classList.add("header-active");
    } else {
        header.classList.remove("header-active");
    };
});

btnMenuHeaderOpen.addEventListener("click", () => {
    mobileNavMenu.classList.add("mobile-nav-open");
});

btnMenuHeaderClose.addEventListener("click", () => {
    mobileNavMenu.classList.remove("mobile-nav-open");
});


// block - Intro

introContentBox_2_btn.addEventListener("click", () => {
    introContentBox_2.classList.toggle("intro-content-box_2-addresses-active");
    introContentBoxImg.classList.toggle("intro-search-content-img-active");
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
const addSlider =() => {
    const newSliderWithoutFight = new SliderWithoutFight(propertiesContentSlider);
    newSliderWithoutFight.run();
};

addSlider();

document.addEventListener("load", addSlider);


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
