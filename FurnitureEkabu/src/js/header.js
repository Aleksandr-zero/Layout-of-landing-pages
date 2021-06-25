// HEADER
const header = document.querySelector(".header");

const headerNavigationNavBtns = header.querySelectorAll(".custom-furniture__content-nav-item-button");
headerNavigationNavBtns.forEach((btn) => {
	btn.addEventListener("click", () => { openMenuNavigationNav(header) });
});

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
	const activeMenu = header.querySelector(".nav-item-menu-active");

	if ( activeMenu == currentMenu ) {
		activeMenu.classList.toggle("nav-item-menu-active");
		return;
	};

	if ( activeMenu ) {
		activeMenu.classList.remove("nav-item-menu-active");
	};

	currentMenu.classList.toggle("nav-item-menu-active");
};

btnsNavHeader.forEach((btn) => {
	btn.addEventListener("click", clickHeaderNavBtn);
});


// Nav-mobile
const navMobile = header.querySelector(".header__nav-mobile");
const btnOpenNavMobile = header.querySelector(".header__content-btn-menu");

const open_hideNavMobile = () => {
	navMobile.classList.toggle("nav-mobile-active");
	btnOpenNavMobile.classList.toggle("header-btn-menu-active");
};

btnOpenNavMobile.addEventListener("click", open_hideNavMobile);
