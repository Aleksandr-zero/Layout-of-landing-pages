// SLIDER SPLIT
const blocksSliderSplit = document.querySelectorAll(".slider-split-list");

if ( blocksSliderSplit ) {
	blocksSliderSplit.forEach((slider) => {
		const firstSlide = slider.querySelector(".category-items__content-block-slider-split-slide");
		firstSlide.classList.add("slide-split-active");
	});
};


// POPUP
const hides_showVerticalScrolling = (popup) => {
	/* Скрывает вертикальную прокрутку (чтобы не было тряски контента при появления popup).  */

	const body = document.querySelector("body");

	const widthScroll = window.innerWidth - popup.offsetWidth;

	if (widthScroll) {
		body.style.cssText = `
			padding-right: ${widthScroll}px;
			overflow: hidden;
		`;
	} else {
		body.style.cssText = `
			padding-right: ${widthScroll}px;
			overflow: auto;
		`;
	}
}