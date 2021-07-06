const blockCategoryItems = document.querySelector(".category-items");

const open_hide_PopupCategoryItems = (popup) => {
	popup.classList.toggle("popup-contact-active");

	if ( event.currentTarget.classList.contains("popup-contact__content-button-close") ) {
		setTimeout(() => {
			hides_showVerticalScrolling(popup);
		}, 300);
	} else {
		hides_showVerticalScrolling(popup);
	};
};

if ( blockCategoryItems ) {
	const popupCategoryItems = blockCategoryItems.querySelector(".category-items__popup");
	const btnClosePopupCategory = popupCategoryItems.querySelector(".category-items__popup-btn-close");

	const categoryItemsBlocks = document.querySelectorAll(".category-items__content-block");

	categoryItemsBlocks.forEach((block) => {
		const slider = block.querySelector(".category-items__content-block-slider-split");
		const btnOpenPopup = block.querySelector(".category-items__content-block-button");

		if ( slider ) {
			const newSliderSplit = new SliderSplit(slider);
			newSliderSplit.run();
		};

		btnOpenPopup.addEventListener("click", () => { open_hide_PopupCategoryItems(popupCategoryItems); });
	});

	btnClosePopupCategory.addEventListener("click", () => { open_hide_PopupCategoryItems(popupCategoryItems); });
};

