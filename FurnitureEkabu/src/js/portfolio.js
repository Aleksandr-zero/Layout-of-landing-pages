const blockPortfolio = document.querySelector(".portfolio");

if ( blockPortfolio ) {
	const portfolioSlider = blockPortfolio.querySelectorAll(".category-items__content-block-slider-split");

	portfolioSlider.forEach((slider) => {
		const newSliderSplit = new SliderSplit(slider);
		newSliderSplit.run();
	});
};