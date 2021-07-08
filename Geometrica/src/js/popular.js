const setsHeightForChangeBlock = (changeBlock) => {
	const height = changeBlock.clientHeight;
	const blockItems = changeBlock.closest(".popular__content-items");

	blockItems.style.height = `${height}px`;
};

const changeCategoryPopular = (block, btns) => {
	const changeBlockName = event.currentTarget.dataset.changeBlock;
	const changeBlock = block.querySelector(`.popular-${changeBlockName}`);

	btns.forEach((btn) => {
		btn.classList.remove("popular-content-btn-active");
	});
	event.currentTarget.classList.add("popular-content-btn-active");

	block.querySelector(".popular-content-item-active").classList.remove("popular-content-item-active");
	// setsHeightForChangeBlock(changeBlock);
	changeBlock.classList.add("popular-content-item-active");
};

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
		visibleSlides: 3
	});
	newSliderWithSections.run();
};
