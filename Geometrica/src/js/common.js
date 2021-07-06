const hides_showVerticalScrolling = (popup) => {
	/* Скрывает вертикальную прокрутку (чтобы не было тряски контента при появления popup).  */

	const body = document.querySelector("body");

	const widthScroll = window.innerWidth - popup.querySelector(".popup__container").offsetWidth;

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