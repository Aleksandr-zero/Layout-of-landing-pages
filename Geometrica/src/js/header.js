// MENU NAV
const open_hideMenuNav = () => {
	const menu = event.currentTarget.closest(".header__content-nav-item").querySelector(".header__content-nav-item-menu");

	menu.classList.toggle("header-nav-item-menu-active");
	event.currentTarget.classList.toggle("header-nav-item-btn-active");
};

const headerBtnsOpenMenu = document.querySelectorAll(".header__content-nav-item-btn");
headerBtnsOpenMenu.forEach((btn) => {
	btn.addEventListener("click", open_hideMenuNav);
});


// SUBHEAD CATALOG
const catalogMenu = document.querySelector(".subhead__content-catalog-menu");

const open_hideSubheadCatalog = () => {
	catalogMenu.classList.toggle("subhead-catalog-menu-active");
};

const btnOpenCatalogSubhead = document.querySelector(".subhead__content-catalog-btn");

btnOpenCatalogSubhead.addEventListener("click", open_hideSubheadCatalog);
