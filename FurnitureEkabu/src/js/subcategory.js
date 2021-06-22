const blockSubcategory = document.querySelector(".subcategory");

if ( blockSubcategory ) {
	const popupSubcategory = blockSubcategory.querySelector(".subcategory__popup");

	const open_hidePopupSubcategory = () => {
		popupSubcategory.classList.toggle("popup-contact-active");
	};

	const btnClosePopupSubcategory = popupSubcategory.querySelector(".subcategory__popup-close-btn");
	btnClosePopupSubcategory.addEventListener("click", open_hidePopupSubcategory);

	const subcategoryWorks = blockSubcategory.querySelectorAll(".category-items__content-block");

	subcategoryWorks.forEach((work) => {
		const workSlider = work.querySelector(".category-items__content-block-slider-split");

		if ( workSlider ) {
			const newSliderSplit = new SliderSplit(workSlider);
			newSliderSplit.run();
		};

		const btnOpenPopupSubcategory = work.querySelector(".category-items__content-block-button");
		btnOpenPopupSubcategory.addEventListener("click", open_hidePopupSubcategory);
	});
};
