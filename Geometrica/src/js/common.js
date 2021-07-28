const hides_showVerticalScrolling = (popup) => {
	/* Скрывает вертикальную прокрутку (чтобы не было тряски контента при появления popup).  */

	const body = document.querySelector("body");

	const widthScroll = window.innerWidth - popup.querySelector(".popup-temp__container").offsetWidth;

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
};


// CATALOG
const setsHeightForChangeBlock = (changeBlock) => {
	const height = changeBlock.clientHeight;
	const blockItems = changeBlock.closest(".catalog-content-items");

	blockItems.style.height = `${height}px`;
};

const changeCategoryPopular = (block, btns) => {
	if ( event.currentTarget.classList.contains("catalog-content-btn-active") ) {
		return;
	};

	const changeBlockName = event.currentTarget.dataset.changeBlock;
	const changeBlock = block.querySelector(`.catalog-${changeBlockName}`);

	btns.forEach((btn) => {
		btn.classList.remove("catalog-content-btn-active");
	});
	event.currentTarget.classList.add("catalog-content-btn-active");

	const currentBlock = block.querySelector(".catalog-content-item-active")
	currentBlock.classList.remove("catalog-content-item-active");
	currentBlock.classList.add("catalog-content-item-change");

	setTimeout(() => {
		setsHeightForChangeBlock(changeBlock);

		changeBlock.classList.add("catalog-content-item-active");
		currentBlock.classList.remove("catalog-content-item-change");
	}, 400);
};