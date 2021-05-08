class Slider {
    /* Слайдер */

    constructor(slider) {
        this.slider = slider;
        this.sliderTrack = this.slider.querySelector(".slider-track");
        this.slidesCount = this.slider.querySelectorAll('.slide').length;
        this.slideWidth = this.slider.querySelector(".slide").offsetWidth;

        this.position = 0;
		this.positionFinal = 0;

		this.positionPressed;
		this.positionFingerMovement = 0;

		this.allowSwipe = true;
    }

    pushSlide(positionFingerMovement) {  
        this.position = positionFingerMovement;
        this.sliderTrack.style.transform = `translate3d(${-this.position}px, 0px, 0px)`;
    }

    swipeStart() {
        /* При касании слайдера, записыает прошлое
           значение позиции, на котором остановился пользователь. */

        this.positionPressed = event.touches[0].clientX;        
        this.sliderTrack.style.transform = `translate3d(${-this.positionFinal}px, 0px, 0px)`;
    }

    swipeAction() {
        /* Получает координаты продвижения слайдера (на сколько px продвинул
           пользователь слайдер) и вызывает функцию "pushingSlide". */

        this.positionFingerMovement = this.positionPressed - event.touches[0].clientX + this.positionFinal;

        if (this.allowSwipe && this.positionFingerMovement <= (this.slideWidth * (this.slidesCount - 1))) {

            this.pushSlide(
                this.positionFingerMovement = this.positionFingerMovement
            );

            // Если слайдер начинает уходить за границы самого себя
            if (this.position >= this.slideWidth * (this.slidesCount - 1) || this.position <= 0) {
                this.allowSwipe = false;
            };

        } else {

            if  (this.positionFingerMovement >= 0 && this.positionFingerMovement <= (this.slideWidth * (this.slidesCount - 1) + 50)) {
                this.pushSlide(
                    this.positionFingerMovement = this.positionFingerMovement
                );

                this.allowSwipe = true;
            };
        };
    }

    swipeEnd() {
        /* Записывает конечную позицию слайдера. */
        this.positionFinal = this.position;
    }

    start() {
        this.sliderTrack.addEventListener("touchstart", () => { this.swipeStart(); },   {passive: false});
		this.sliderTrack.addEventListener("touchmove",  () => { this.swipeAction(); },  {passive: false});
		this.sliderTrack.addEventListener("touchend",   () => { this.swipeEnd(); },     {passive: false});
    }
};
