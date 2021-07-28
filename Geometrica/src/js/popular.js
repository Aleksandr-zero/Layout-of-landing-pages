const blockPopular = document.querySelector(".popular");

if ( blockPopular ) {
	const slider = blockPopular.querySelector(".popular__content-item-slider")
	const btns = blockPopular.querySelectorAll(".popular__content-btn");

	btns.forEach((btn) => {
		btn.addEventListener("click", () => { changeCategoryPopular(blockPopular, btns); });
	});

	const newSliderWithSections = new SliderWithSections(slider, {
		speed: 300,
		scrollSlidesAtTime: 1,
		slidesPerView: 3
	});
	newSliderWithSections.run();
};
