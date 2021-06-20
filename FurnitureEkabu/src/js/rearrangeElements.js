// BEST MATERIALS
const blockBestMaterials = document.querySelector(".best-materials");
let isRearrangeBlockBestMaterials = false;

const check_For_ChangeBestMaterials = () => {

	if ( window.outerWidth <= 660 && !isRearrangeBlockBestMaterials ) {
		const newPosition_BestMaterials = blockBestMaterials.querySelector(".best-materials__content-back-img");
		const rearrangeBlock_BestMaterials = blockBestMaterials.querySelector(".best-materials__content-table-back-button");

		newPosition_BestMaterials.before(rearrangeBlock_BestMaterials);
		isRearrangeBlockBestMaterials = true;

	} else if ( window.outerWidth > 660 && isRearrangeBlockBestMaterials ) {
		const lastPosition_BestMaterials = blockBestMaterials.querySelector(".best-materials__content-table");
		const rearrangeBlock_BestMaterials = blockBestMaterials.querySelector(".best-materials__content-table-back-button");

		lastPosition_BestMaterials.append(rearrangeBlock_BestMaterials);
		isRearrangeBlockBestMaterials = false;
	};
};


// ROOM DIMENSIONS
const blockRoomDimensions = document.querySelector(".room-dimensions__content");
let isRearrangeBlockRoomDimensions = false;

const check_For_ChangeRoomDimensions = () => {

	if ( window.outerWidth <= 800 && !isRearrangeBlockRoomDimensions ) {
		const newPosition_RoomDimensions = document.querySelector(".room-dimensions__content-description-items");
		const rearrangeBlock_RoomDimensions = blockRoomDimensions.querySelector(".room-dimensions__content-back-img");

		newPosition_RoomDimensions.before(rearrangeBlock_RoomDimensions);
		isRearrangeBlockRoomDimensions = true;

	} else if ( window.outerWidth > 800 && isRearrangeBlockRoomDimensions ) {
		const rearrangeBlock_RoomDimensions = blockRoomDimensions.querySelector(".room-dimensions__content-back-img");

		blockRoomDimensions.append(rearrangeBlock_RoomDimensions);
		isRearrangeBlockRoomDimensions = false;
	};
};

// YOUR PROJECT
const blockYourProject = document.querySelector(".your-project");
let isRearrangeBlockYourProject = false;

const returnNewPlaces_YourProject = () => {
	const yourProjectItems = document.querySelectorAll(".your-project__content-item");

	yourProjectItems.forEach((item) => {
		const rearrangeBlock_YourProject = item.querySelector(".your-project__content-item-description-text");
		item.append(rearrangeBlock_YourProject);
	});
};

const returnPreviousPlaces_YourProject = () => {
	const yourProjectItems = document.querySelectorAll(".your-project__content-item");

	yourProjectItems.forEach((item) => {
		const newPosition = item.querySelector(".your-project__content-item-description");
		const rearrangeBlock_YourProject = item.querySelector(".your-project__content-item-description-text");
		newPosition.append(rearrangeBlock_YourProject);
	});
};

const check_For_ChangeYourProject = () => {

	if ( window.outerWidth <= 800 && !isRearrangeBlockYourProject ) {
		returnNewPlaces_YourProject();
		isRearrangeBlockYourProject = true;

	} else if ( window.outerWidth > 800 && isRearrangeBlockYourProject ) {
		returnPreviousPlaces_YourProject();
		isRearrangeBlockYourProject = false;
	};
}


const checkResizeWindow = () => {

	if ( blockBestMaterials ) check_For_ChangeBestMaterials();
	if ( blockRoomDimensions ) check_For_ChangeRoomDimensions();
	if ( blockYourProject ) check_For_ChangeYourProject();
};

checkResizeWindow();
window.addEventListener("resize", checkResizeWindow);
