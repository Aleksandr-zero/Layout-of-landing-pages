// MENU
const navigationNav = document.querySelector(".custom-furniture__content-nav");

const openMenuNavigationNav = () => {
	const activeMenu = navigationNav.querySelector(".custom-furniture-nav-menu-active");

	const currentItem = event.currentTarget.closest(".custom-furniture__content-nav-item");
	const currentMenu = currentItem.querySelector(".custom-furniture__content-nav-item-menu");

	if ( activeMenu == currentMenu ) {
		currentMenu.classList.toggle("custom-furniture-nav-menu-active");
		return
	};

	if ( activeMenu ) {
		activeMenu.classList.remove("custom-furniture-nav-menu-active");
	};

	currentMenu.classList.toggle("custom-furniture-nav-menu-active");
};

if ( navigationNav ) {
	const navigationNavBtns = navigationNav.querySelectorAll(".custom-furniture__content-nav-item-button");
	navigationNavBtns.forEach((btn) => {
		btn.addEventListener("click", openMenuNavigationNav);
	});
};
