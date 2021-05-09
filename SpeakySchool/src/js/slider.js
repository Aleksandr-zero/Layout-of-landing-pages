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
