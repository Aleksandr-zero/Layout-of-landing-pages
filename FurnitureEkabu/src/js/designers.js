const maxBlocksVisible = 12;

const blockDesigners = document.querySelector('.portfolio-designers');
let cardsDesighers;

if (blockDesigners) {
	cardsDesighers = blockDesigners.querySelectorAll(".portfolio-designers__content-item");
};

const showsRestOfWork = () => {
	const currentCardDesigner = event.currentTarget.closest(".portfolio-designers__content-item");
	const currentWorks = currentCardDesigner.querySelectorAll(".portfolio-designers__content-item-work");

	for (let work = maxBlocksVisible; work < currentWorks.length; work++) {
		currentWorks[work].style.display = "flex";
	};

	event.currentTarget.style.display = "none";
};

const hidesRemainingBlocks = (block) => {
	for (let work = maxBlocksVisible; work < block.length; work++) {
		block[work].style.display = "none";
	};
};

if (cardsDesighers) {
	cardsDesighers.forEach((block) => {
		const btnShowsWorks = block.querySelector(".portfolio-designers__content-btn");
		const blockWorks = block.querySelector(".portfolio-designers__content-item-works");
		const blocksWork = blockWorks.querySelectorAll(".portfolio-designers__content-item-work");

		if ( blocksWork.length > maxBlocksVisible ) {
			hidesRemainingBlocks(blocksWork);
			btnShowsWorks.addEventListener("click", showsRestOfWork);
		} else {
			btnShowsWorks.style.display = "none";
		};
	});
}


// POPUP
if (blockDesigners) {
	const btnsDesigners = blockDesigners.querySelectorAll(".portfolio-designers__content-item-description-btn");

	const popupDesigners = blockDesigners.querySelector(".portfolio-designers__popup");
	const btnClosePopupDesigners = popupDesigners.querySelector(".portfolio-designers__popup-content-button-close");

	const open_hide_PopupContactDesigner = () => {
		popupDesigners.classList.toggle("popup-contact-active");
	};

	btnClosePopupDesigners.addEventListener("click", open_hide_PopupContactDesigner);

	btnsDesigners.forEach((btn) => {
		btn.addEventListener("click", open_hide_PopupContactDesigner)
	});
};
