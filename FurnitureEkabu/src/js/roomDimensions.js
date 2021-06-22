const roomDimensions = document.querySelector(".room-dimensions");

if ( roomDimensions ) {
	const roomDimensionsPopup = roomDimensions.querySelector(".room-dimensions__popup");
	const btnCloseRoomDimensionsPopup = roomDimensions.querySelector(".room-dimensions__popup-close-btn");

	const btnOpenPopupRoomDimensions = roomDimensions.querySelector(".room-dimensions__content-description-button");

	const open_hidePopupRoomDimensions = () => {
		roomDimensionsPopup.classList.toggle("popup-contact-active");
	};

	btnCloseRoomDimensionsPopup.addEventListener("click", open_hidePopupRoomDimensions)
	btnOpenPopupRoomDimensions.addEventListener("click", open_hidePopupRoomDimensions);
};
