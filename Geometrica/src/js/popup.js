// COMMON
const timeoutOpenPopup = 300;

const closePopup = () => {
	const popup = event.target.closest(".popup-temp");

	setTimeout(() => {
		hides_showVerticalScrolling(popup);
	}, timeoutOpenPopup);

	popup.classList.remove("popup-active");
};

const openPopup = (popup) => {
	hides_showVerticalScrolling(popup);

	popup.classList.add("popup-active");

	const btnClosePopup = popup.querySelector(".popup-temp__content-btn-close");
	btnClosePopup.addEventListener("click", closePopup);
};


// POPUP block products
const blockPopularProducts = document.querySelector(".popular__content-item-products");
const itemsPopularProducts = blockPopularProducts.querySelectorAll(".popular__content-item-product");

const popupPopularProducts = document.querySelector(".popup-add-cart");

itemsPopularProducts.forEach((product) => {
	const btn = product.querySelector(".popular__content-item-product-btn");
	btn.addEventListener("click", () => { openPopup(popupPopularProducts); });
});

// POPUP block contact
const btnOpenPopupContact = document.querySelector(".contacts__content-description-content-link");
const popupContact = document.querySelector(".contacts__popup");

btnOpenPopupContact.addEventListener("click", () => { openPopup(popupContact); });


// POPUP block new-items
const blockNewItems = document.querySelector(".new-items");

if ( blockNewItems ) {
	const popupCollection = blockNewItems.querySelector(".popup-collection");

	const btnsOpenPopupCollection = blockNewItems.querySelectorAll(".new-items__content-back-img-description-title-link");
	btnsOpenPopupCollection.forEach((btn) => {
		btn.addEventListener("click", () => { openPopup(popupCollection); });
	});
};