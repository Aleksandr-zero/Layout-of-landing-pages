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

if ( blockCharacteristics ) {
	const btnsOpenMenu = blockCharacteristics.querySelectorAll(".characteristics__content-item");

	btnsOpenMenu.forEach((btn) => {
		btn.addEventListener("click", () => { openMenuCatalog() });
	});
};
