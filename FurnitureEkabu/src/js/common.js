// SLIDER SPLIT
const blocksSliderSplit = document.querySelectorAll(".slider-split-list");

if ( blocksSliderSplit ) {
	blocksSliderSplit.forEach((slider) => {
		const firstSlide = slider.querySelector(".category-items__content-block-slider-split-slide");
		firstSlide.classList.add("slide-split-active");
	});
};
