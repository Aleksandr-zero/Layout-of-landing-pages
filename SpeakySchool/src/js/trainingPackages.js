// COMMON - page - teaching kids offline AND page - teaching kids online
const iteratingOverAnArray_DeleteActiveClass = (array, activeClass) => {
    for (let index = 0; index < array.length; index++) {
        const item = array[index];

        if (item.classList.contains(activeClass)) {
            item.classList.remove(activeClass);
        };
    };
};

const add_delectActiveClass_trainingPackageItem = (arrayItems, indexBlock, activeClass) =>  {

    iteratingOverAnArray_DeleteActiveClass(
        array = arrayItems,
        activeClass = activeClass
    );

    setTimeout(() => {
        arrayItems[indexBlock].classList.add(activeClass);
    }, timeout);
};


// page - teaching kids online
const trainingPackageWrapperItems = document.querySelector(".training-package__content-wrapper-items");

let trainingPackageBlockItemsOnline;
let trainingPackageBlockItemsOnlineSliders;
let trainingPackageWrappersBtnsOnline;

if (trainingPackageWrapperItems) {
    trainingPackageBlockItemsOnline = trainingPackageWrapperItems.querySelectorAll(".training-package-content-items-online");

    trainingPackageBlockItemsOnlineSliders = trainingPackageWrapperItems.querySelectorAll('.slider');

    trainingPackageWrappersBtnsOnline = document.querySelectorAll(".training-package__content-back-btns-wrapper");
};

let trainingPackageBtnsOnline_1;
let trainingPackageBtnsOnline_2;

let trainingPackageBtnsOnline_Array_1;
let trainingPackageBtnsOnline_Array_2;

if (trainingPackageWrapperItems && trainingPackageBlockItemsOnline.length) {
    trainingPackageBtnsOnline_1 = trainingPackageWrappersBtnsOnline[0].querySelectorAll(".training-package__content-btn");
    trainingPackageBtnsOnline_2 = trainingPackageWrappersBtnsOnline[1].querySelectorAll(".training-package__content-btn");

    trainingPackageBtnsOnline_Array_1 = Array.from(trainingPackageBtnsOnline_1);
    trainingPackageBtnsOnline_Array_2 = Array.from(trainingPackageBtnsOnline_2);
};

let positionBtnOnline_1 = 0;
let positionBtnOnline_2 = 0;

const pressedTrainingPackageBtnOnline_1 = (event) => {
    positionBtnOnline_1 = trainingPackageBtnsOnline_Array_1.indexOf(event.currentTarget);

    iteratingOverAnArray_DeleteActiveClass(
        array = trainingPackageBtnsOnline_1,
        activeClass = "training-package-btn-active"
    );

    event.currentTarget.classList.add("training-package-btn-active");

    add_delectActiveClass_trainingPackageItem(
        arrayItems = trainingPackageBlockItemsOnline,
        indexBlock = positionBtnOnline_1 + positionBtnOnline_2,
        activeClass = "training-package-content-items-active"
    );
};

const pressedTrainingPackageBtnOnline_2 = (event) => {
    positionBtnOnline_2 = trainingPackageBtnsOnline_Array_2.indexOf(event.currentTarget);

    iteratingOverAnArray_DeleteActiveClass(
        array = trainingPackageBtnsOnline_2,
        activeClass = "training-package-btn-active"
    );

    event.currentTarget.classList.add("training-package-btn-active");

    add_delectActiveClass_trainingPackageItem(
        arrayItems = trainingPackageBlockItemsOnline,
        indexBlock = positionBtnOnline_1 + positionBtnOnline_2,
        activeClass = "training-package-content-items-active"
    )
};


if (trainingPackageWrapperItems && trainingPackageBlockItemsOnline.length) {
    trainingPackageBtnsOnline_1.forEach((btn) => {
        btn.addEventListener("click", pressedTrainingPackageBtnOnline_1);
    });

    trainingPackageBtnsOnline_2.forEach((btn) => {
        btn.addEventListener("click", pressedTrainingPackageBtnOnline_2);
    });

    trainingPackageBlockItemsOnlineSliders.forEach((items) => {
        new SliderWithoutFight(items).run();
    });
};


// page - teaching kids offline
const trainingPackageBlockWrapperItemsOffline = document.querySelector(".training-package__content-wrapper-items");

let trainingPackageBlockItemsOffline;
let trainingPackageBlockItemsOfflineSliders;

let trainingPackageBtnsOffline;
let trainingPackageBtnsOfflineArray;

if (trainingPackageBlockWrapperItemsOffline) {
    trainingPackageBlockItemsOffline = trainingPackageBlockWrapperItemsOffline.querySelectorAll(".training-package-content-items-offline");
    trainingPackageBlockItemsOfflineSliders = trainingPackageBlockWrapperItemsOffline.querySelectorAll(".slider");

    trainingPackageBtnsOffline = document.querySelectorAll(".training-package-content-btn-offline");
    trainingPackageBtnsOfflineArray = Array.from(trainingPackageBtnsOffline);
};

const pressedTrainingPackageBtnOffline = (event) => {
    let indexTrainingPackageBlock;

    for (let index = 0; index < trainingPackageBtnsOffline.length; index++) {
        const btn = trainingPackageBtnsOffline[index];

        if (btn.classList.contains("training-package-btn-active")) {
            btn.classList.remove("training-package-btn-active");

            event.currentTarget.classList.add("training-package-btn-active");

            indexTrainingPackageBlock = trainingPackageBtnsOfflineArray.indexOf(event.currentTarget);
        };
    };

    add_delectActiveClass_trainingPackageItem(
        arrayItems = trainingPackageBlockItemsOffline,
        indexBlock = indexTrainingPackageBlock,
        activeClass = "training-package-content-items-active"
    );
};

if (trainingPackageBlockItemsOffline) {
    trainingPackageBtnsOffline.forEach((btn) => {
        btn.addEventListener("click", pressedTrainingPackageBtnOffline);
    });

    trainingPackageBlockItemsOfflineSliders.forEach((items) => {
        new SliderWithoutFight(items).run();
    });

    if (document.querySelector(".training-package__content-back-btns-line")) {
        if (document.querySelector(".training-package__content-back-btns-line").querySelector(".slider")) {
            new SliderWithoutFight(document.querySelector(".training-package__content-back-btns")).run();
        };
    }
};


// block - teaching adults
const trainingPackageBtnsLine = document.querySelector(".training-package__content-back-btns-line");
const trainingPackageBtnsLineMenu = document.querySelectorAll(".training-package__content-back-btns-line-menu");
const trainingPackageBtnsLineMenuTitles = document.querySelectorAll(".training-package__content-back-btns-line-menu-title");

const trainingPackageBlockItemsAdultsOffline = document.querySelectorAll(".training-package__content-items-adults-offline");
const trainingPackageBlockItemsAdultsOnline = document.querySelectorAll(".training-package__content-items-adults-online");

const trainingPackageMenuContent = document.querySelectorAll(".training-package__content-back-btns-line-menu-content");

const trainingPackageMenuContentRadioBtn = document.querySelectorAll(".training-package__content-back-btns-line-menu-content-check > input");
const trainingPackageMenuContentRadioBtn_Offline = trainingPackageMenuContentRadioBtn[0];
const trainingPackageMenuContentRadioBtn_Online = trainingPackageMenuContentRadioBtn[1];

const trainingPackageMenuContentRadioBtn_Rest = Array.prototype.slice.call(trainingPackageMenuContentRadioBtn, 2);

const trainingPackageContentWrapperItems = document.querySelector(".training-package__content-wrapper-items");

let typeTraining;
let typeOccupation;
let lessonDuration;

let gettingValueByClass = [typeTraining, typeOccupation, lessonDuration];

const getsValueRadioBtn = () => {
    return event.currentTarget.value;
};

const blocksRadioBtnLine = () => {
    trainingPackageMenuContentRadioBtn.forEach((radioBtn) => {
        radioBtn.disabled = true;
    });
};

const addActiveCLassBtnLineMenu = (index) => {
    trainingPackageBtnsLineMenu[index].querySelector(".training-package__content-back-btns-line-menu-btn")
                                            .classList.add("line-menu-btn-active");

    trainingPackageBtnsLineMenu[index + 1].querySelector(".training-package__content-back-btns-line-menu-btn")
                                            .classList.add("line-menu-btn-pass");
};

const addActiveCLass_LastBtnLineMenu = () => {
    trainingPackageBtnsLineMenu[2].querySelector(".training-package__content-back-btns-line-menu-btn")
                                                    .classList.add("line-menu-btn-active");
};

const deleteActiveClass_And_Checked = () => {
    for (let index = 1; index < trainingPackageBtnsLineMenu.length; index++) {
        trainingPackageBtnsLineMenu[index].querySelectorAll("input").forEach((radioBtn) => {
            radioBtn.checked = false;
        });
    };

    trainingPackageBtnsLineMenu[2].classList.remove(
        "back-btns-line-menu-active-online",
        "back-btns-line-menu-active-offline"
    );
};

const deleteActiveClass_BtnsLineMenu = () => {
    trainingPackageBtnsLineMenu.forEach((btnLineMenu) => {
        btnLineMenu.classList.remove(
            "back-btns-line-menu-active-offline",
            "back-btns-line-menu-active-online",
            "back-btns-line-menu-active"
        );
    });
};

const pressedMenuConten_TypeTraining = () => {
    // Открывает меню - вид занятия
    typeTraining = getsValueRadioBtn();

    opensTypeOccupationMenuContent();
};

const pressedMenuContent_TypeOccupation = () => {
    // Открывает меню - длительность
    typeOccupation = getsValueRadioBtn();

    opensLessonDurationMenuContent();

    if (typeTraining.split("-")[0] == "offline") {
        blocksRadioBtnLine();
        opensTrainingPackageItems();
        addActiveCLass_LastBtnLineMenu();
    };
};

const pressedMenuContent_LessonDuration = () => {
    // выбирает длительность занятия и открывает предложения по обучение (карточки)
    lessonDuration = getsValueRadioBtn();

    opensTrainingPackageItems();
    blocksRadioBtnLine();
    addActiveCLass_LastBtnLineMenu();
};

const opensTypeOccupationMenuContent = () => {
    deleteActiveClass_And_Checked();

    addActiveCLassBtnLineMenu(
        index = 0
    );

    if (typeTraining.split("-")[0] == "offline") {
        trainingPackageBtnsLineMenu[1].classList.remove("back-btns-line-menu-active-online");
        trainingPackageBtnsLineMenu[1].classList.add("back-btns-line-menu-active-offline");

    } else if (typeTraining.split("-")[0] == "online") {
        trainingPackageBtnsLineMenu[1].classList.remove("back-btns-line-menu-active-offline");
        trainingPackageBtnsLineMenu[1].classList.add("back-btns-line-menu-active-online");
    };
};

const opensLessonDurationMenuContent = () => {
    addActiveCLassBtnLineMenu(
        index = 1
    );

    if (typeOccupation == "individual-lessons-online") {
        trainingPackageBtnsLineMenu[2].classList.remove("back-btns-line-menu-active-offline");
        trainingPackageBtnsLineMenu[2].classList.add("back-btns-line-menu-active-online");

    } else if (typeOccupation == "conversation-club-online") {
        trainingPackageBtnsLineMenu[2].classList.remove("back-btns-line-menu-active-online");
        trainingPackageBtnsLineMenu[2].classList.add("back-btns-line-menu-active-offline");

        blocksRadioBtnLine();
        opensTrainingPackageItems();
        addActiveCLass_LastBtnLineMenu();

    } else {
        trainingPackageBtnsLineMenu[2].classList.add("back-btns-line-menu-active-offline");
        blocksRadioBtnLine();
    };
};

const overwritesValuesMenuTitle = () => {
    for (let index = 0; index < trainingPackageBtnsLineMenuTitles.length; index++) {
        const btnsLineMenuTitle = trainingPackageBtnsLineMenuTitles[index];

        let pastText = btnsLineMenuTitle.innerHTML;
        let newText = `${pastText}<br>${gettingValueByClass[index]}`;
    };
};

const opensTrainingPackageItems = () => {
    if (lessonDuration == undefined) {
        lessonDuration = "60-min";
    };

    let activeClass = `${typeTraining}-${typeOccupation}-${lessonDuration}`;
    let trainingPackageBlockItem = document.querySelector(`.${activeClass}`)

    setTimeout(() => {
        trainingPackageContentWrapperItems.style.height = "420px";
        trainingPackageBlockItem.classList.add("training-package-content-items-active");
    }, timeout * 7);

    setTimeout(() => {
        deleteActiveClass_BtnsLineMenu();
        trainingPackageBtnsLine.style.height = "120px";
    }, timeout * 5);
};

if (trainingPackageBtnsLine) {
    trainingPackageMenuContentRadioBtn_Offline.addEventListener("click", pressedMenuConten_TypeTraining)
    trainingPackageMenuContentRadioBtn_Online.addEventListener("click", pressedMenuConten_TypeTraining)

    for (let index = 0; index < trainingPackageMenuContentRadioBtn_Rest.length - 2; index++) {
        const radioBtn_Rest = trainingPackageMenuContentRadioBtn_Rest[index];
        radioBtn_Rest.addEventListener("click", pressedMenuContent_TypeOccupation);
    };

    trainingPackageMenuContentRadioBtn_Rest[5].addEventListener("click", pressedMenuContent_LessonDuration);
    trainingPackageMenuContentRadioBtn_Rest[6].addEventListener("click", pressedMenuContent_LessonDuration);

    trainingPackageContentWrapperItems.querySelectorAll(".slider").forEach((slider) => {
        new SliderWithoutFight(slider).run();
    });

    if (innerWidth <= 720) {
        if (document.querySelector(".training-package__content-back-btns-line")) {
            new SliderWithoutFight(document.querySelector(".training-package__content-back-btns-line")).run();
        };
    };
};
