const header = document.querySelector(".header");

const btnsNavHeader = header.querySelectorAll(".header__nav-item-button");


const clickHeaderNavBtn = () => {
	const currentMenu = event.currentTarget.closest(".header__nav-item").querySelector(".header__nav-item-menu");
	currentMenu.classList.toggle("nav-item-menu-active");
};

btnsNavHeader.forEach((btn) => {
	btn.addEventListener("click", clickHeaderNavBtn);
});
