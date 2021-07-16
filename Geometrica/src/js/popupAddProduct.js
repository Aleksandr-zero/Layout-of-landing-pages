const popupAddProduct = document.querySelector(".popup-add-cart");

if ( popupAddProduct ) {
	const inputNumber = popupAddProduct.querySelector(".popup-add-cart__content-choice-quantity-num");

	const changeInputNumber = () => {
		const valueInputNumber = +inputNumber.value;

		inputNumber.value = (event.currentTarget.classList.contains("add")) ?
			valueInputNumber + 1 : valueInputNumber - 1;
	};

	const btnAddProduct = popupAddProduct.querySelector(".popup-add-cart__content-choice-quantity-add");
	const btnSubtractProduct = popupAddProduct.querySelector(".popup-add-cart__content-choice-quantity-subtract");

	btnAddProduct.addEventListener("click", () => { changeInputNumber(); });
	btnSubtractProduct.addEventListener("click", () => { changeInputNumber(); });
};
