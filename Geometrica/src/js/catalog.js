const blockCharacteristics = document.querySelector(".characteristics");

const openMenuCatalog = () => {
	const activeMenu = event.currentTarget.closest(".characteristics__content-items").querySelector(".characteristics-item-active");

	if ( activeMenu && !event.currentTarget.classList.contains("characteristics-item-active") ) {
		activeMenu.classList.remove("characteristics-item-active");
		activeMenu.querySelector(".characteristics-item-menu-active").classList.remove("characteristics-item-menu-active");
	};

	const currentItem = event.currentTarget.closest(".characteristics__content-item");
	const currentMenu = currentItem.querySelector(".characteristics__content-item-menu");
	const currentBtnsChoice = currentMenu.querySelectorAll(".characteristics__content-item-menu-content-item");

	const changeTextCatalogMenu = () => {
		const lastText = currentItem.querySelector(".characteristics__content-item-btn");
		const newText = event.currentTarget.querySelector(".characteristics__content-item-menu-content-item-text > p").innerHTML.trim();

		lastText.innerHTML = `${newText}`;

		currentBtnsChoice.forEach((btn) => {
			btn.removeEventListener("click", changeTextCatalogMenu, false);
		});
	};

	currentItem.classList.toggle("characteristics-item-active");
	currentMenu.classList.toggle("characteristics-item-menu-active");

	currentBtnsChoice.forEach((btn) => {
		btn.addEventListener("click", changeTextCatalogMenu, { once: true });
	});
};


const changeRangeForPrice = (widthFilter, maxPrice) => {

};


if ( blockCharacteristics ) {
	const btnsOpenMenu = blockCharacteristics.querySelectorAll(".characteristics__content-item");

	btnsOpenMenu.forEach((btn) => {
		btn.addEventListener("click", () => { openMenuCatalog() });
	});

	const sliderCatalogCompany = blockCharacteristics.querySelector(".characteristics__content-secondary-company-slider");

	const newSliderCatalogCompany = new SliderWithSections(sliderCatalogCompany, {
		speed: 350,
		scrollSlidesAtTime: 1,
		slidesPerView: 4,
	});
	newSliderCatalogCompany.run();

	const blockFilter = blockCharacteristics.querySelector(".characteristics__content-secondary-filter");

	const widthFilter = blockCharacteristics.querySelector(".filter-range-scale").clientWidth;
	const maxPrice = +blockFilter.querySelector('input[name="max-interval"]').value;

};


// CATALOG items
const setsHeightAtFirstStart = (columns, element, block) => {
	let height = element.offsetHeight * columns;
	height += parseInt(getComputedStyle(element).marginBottom);
	height += 140;

	block.style.height = `${height}px`;
};

const blockCatalog = document.querySelector(".catalog");


if ( blockCatalog ) {
	const btns = blockCatalog.querySelectorAll(".catalog__content-nav-item-btn");

	btns.forEach((btn) => {
		btn.addEventListener("click", () => { changeCategoryPopular(blockCatalog, btns); });
	});

	const contentItems = blockCatalog.querySelector(".catalog__content-items");
	const elementItem = contentItems.querySelector(".content-item-collection");

	setsHeightAtFirstStart(4, elementItem, contentItems);
};
