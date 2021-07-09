const sliderIntro = document.querySelector(".intro__container-slider");

if ( sliderIntro ) {
	const newSliderSplit = new SliderSplit(sliderIntro);
	newSliderSplit.run();
};
