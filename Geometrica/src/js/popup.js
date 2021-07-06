const timeoutOpenPopup = 300;

// POPUP block contact
const closePopup = () => {
	const popup = event.target.closest(".popup");

	setTimeout(() => {
		hides_showVerticalScrolling(popup);
	}, timeoutOpenPopup);

	popup.classList.remove("popup-active");
};

const openPopup = (popup) => {
	hides_showVerticalScrolling(popup);

	popup.classList.add("popup-active");

	const btnClosePopup = popup.querySelector(".popup__content-btn-close");
	btnClosePopup.addEventListener("click", closePopup);
};

const btnOpenPopupContact = document.querySelector(".contacts__content-description-content-link");
const popupContact = document.querySelector(".contacts__popup");

btnOpenPopupContact.addEventListener("click", () => { openPopup(popupContact); });
