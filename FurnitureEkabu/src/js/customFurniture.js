// MENU
const navigationNav = document.querySelector(".custom-furniture__content-nav");

const openMenuNavigationNav = () => {
	const currentMenu = event.currentTarget.nextSibling.nextSibling;
	currentMenu.classList.toggle("custom-furniture-nav-menu-active");
};

if ( navigationNav ) {
	const navigationNavBtns = navigationNav.querySelectorAll(".custom-furniture__content-nav-item-button");
	navigationNavBtns.forEach((btn) => {
		btn.addEventListener("click", openMenuNavigationNav);
	});
};
