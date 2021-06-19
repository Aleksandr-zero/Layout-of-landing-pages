let isOverdriveBlockRoomDimensions = false;
let isOverdriveBlockBestMaterials = false;

const changeResizeWindow = () => {

	if ( event.target.outerWidth <= 800 && !isOverdriveBlockRoomDimensions ) {
		newPosition_RoomDimensions.before(overdriveBlock_RoomDimensions);
		isOverdriveBlockRoomDimensions = true;
	} else if ( event.target.outerWidth > 800 && isOverdriveBlockRoomDimensions ) {
		blockroomDimensions.append(overdriveBlock_RoomDimensions);
		isOverdriveBlockRoomDimensions = false;
	};

	if ( event.target.outerWidth <= 660 && !isOverdriveBlockBestMaterials ) {
		newPosition_BestMaterials.before(overdriveBlock_BestMaterials);
		isOverdriveBlockBestMaterials = true;
	} else if ( event.target.outerWidth > 660 && isOverdriveBlockBestMaterials ) {
		lastPosition_BestMaterials.append(overdriveBlock_BestMaterials);
		isOverdriveBlockBestMaterials = false;
	};
};

window.addEventListener("resize", changeResizeWindow);


// BEST MATERIALS
const blockBestMaterials = document.querySelector(".best-materials");

const lastPosition_BestMaterials = blockBestMaterials.querySelector(".best-materials__content-table");

const overdriveBlock_BestMaterials = blockBestMaterials.querySelector(".best-materials__content-table-back-button");
const newPosition_BestMaterials = blockBestMaterials.querySelector(".best-materials__content-back-img");

// ROOM DIMENSIONS
const blockroomDimensions = document.querySelector(".room-dimensions__content");

const newPosition_RoomDimensions = document.querySelector(".room-dimensions__content-description-items");
const overdriveBlock_RoomDimensions = blockroomDimensions.querySelector(".room-dimensions__content-back-img");
