// HEADER
const header = document.querySelector(".header");

// Перемещение блоков
let isRearrange_HeaderLocations = false;

const rearrange_HeaderLocations = header.querySelector(".header__content-locations");
const newPosition_HeaderLocations = header.querySelector(".header__content-back-logo");
const lastPosition_HeaderLocations = header.querySelector(".header__content-social");

const changeResizeWindow = () => {

	if ( window.outerWidth <= 1020 && !isRearrange_HeaderLocations ) {
		newPosition_HeaderLocations.append(rearrange_HeaderLocations);
		isRearrange_HeaderLocations = true;
	} else if ( window.outerWidth > 1020 && isRearrange_HeaderLocations ) {
		lastPosition_HeaderLocations.before(rearrange_HeaderLocations);
		isRearrange_HeaderLocations = false;
	};
};

changeResizeWindow();
window.addEventListener("resize", changeResizeWindow);

// NAV
const btnsNavHeader = header.querySelectorAll(".header__nav-item-button");

const clickHeaderNavBtn = () => {
	const currentMenu = event.currentTarget.closest(".header__nav-item").querySelector(".header__nav-item-menu");
	currentMenu.classList.toggle("nav-item-menu-active");
};

btnsNavHeader.forEach((btn) => {
	btn.addEventListener("click", clickHeaderNavBtn);
});
