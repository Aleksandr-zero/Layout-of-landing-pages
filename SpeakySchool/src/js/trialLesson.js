// block -form
let selectBoxBtns;

const changes_TrialForms = (indexForm, forms, backFormItems) => {
    for (let index = 0; index < forms.length; index++) {
        const form = forms[index];

        if (form.classList.contains("trial-lesson-form-active")) {
            form.classList.remove("trial-lesson-form-active");
            
            if (indexForm) {
                backFormItems.classList.add("back-form-items-active");
            } else {
                backFormItems.classList.remove("back-form-items-active");
            }

            setTimeout(() => {
                forms[indexForm].classList.add("trial-lesson-form-active");
            }, timeout);
        };
    };
};

const pressedSelectBoxBtn = (selectBlocksContainers, selectBoxBtnsArray) => {
    const currentSelectBoxBtn = event.currentTarget;
    const currentSelectBox_Container = selectBlocksContainers[selectBoxBtnsArray.indexOf(currentSelectBoxBtn)];
    const currentSelectBlocks = selectBlocksContainers[selectBoxBtnsArray.indexOf(currentSelectBoxBtn)]
                                        .querySelectorAll(".trial-lesson__content-form-box-selects-block");

    currentSelectBoxBtn.classList.toggle("box-select-btn-active");
    currentSelectBox_Container.classList.toggle("box-selects-active");

    currentSelectBlocks.forEach((item) => {
        item.addEventListener("click", () => {
            currentSelectBoxBtn.innerHTML = item.querySelector("label").innerHTML;
            currentSelectBoxBtn.classList.remove("box-select-btn-active");
            currentSelectBox_Container.classList.remove("box-selects-active");
        });
    });
};

const pressedBtnForm = (formBtns, formBtnsArray, forms, backFormItems) => {

    for (let index = 0; index < formBtns.length; index++) {
        const btn = formBtns[index];

        if (btn.classList.contains("trial-lesson-btn-active")) {
            btn.classList.remove("trial-lesson-btn-active");
            event.currentTarget.classList.add("trial-lesson-btn-active");
            
            changes_TrialForms(
                indexForm = formBtnsArray.indexOf(event.currentTarget),
                forms = forms,
                backFormItems = backFormItems
            );

            return;
        };
    };
};

const trialLessonBlock = document.querySelectorAll(".trial-lesson");

trialLessonBlock.forEach((trialLesson) => {

    selectBoxBtns = trialLesson.querySelectorAll(".trial-lesson__content-form-box-select");
    const selectBoxBtnsArray = Array.from(selectBoxBtns);
    const selectBlocksContainers = trialLesson.querySelectorAll(".trial-lesson__content-form-box-selects");

    const backFormItems = trialLesson.querySelector(".trial-lesson__content-back-form-items");

    const forms = trialLesson.querySelectorAll(".trial-lesson__content-form");
    const formBtns = trialLesson.querySelectorAll(".trial-lesson__content-back-form-btn");
    const formBtnsArray = Array.from(formBtns);

    if (selectBoxBtns) {

        selectBoxBtns.forEach((selectBtn) => {
            selectBtn.addEventListener("click", () => {
                pressedSelectBoxBtn(selectBlocksContainers, selectBoxBtnsArray);
            });
        });
    };

    formBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
            pressedBtnForm(formBtns, formBtnsArray, forms,  backFormItems);
        });
    });
});

// Btn - trial lesson
const btnsTrialLesson = document.querySelectorAll(".btn-trial-lesson");
const trialLessonBlocks = document.querySelectorAll(".trial-lesson__content");

btnsTrialLesson.forEach((btn) => {
    btn.addEventListener("click", () => {
        window.scroll({
            left: 0,
            top: trialLessonBlocks[0].offsetTop - (header.offsetHeight + 20),
            behavior: "smooth",
        })
    });
});
