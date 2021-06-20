const blockIntro = document.querySelector(".intro");
const introSlider = document.querySelector(".slider");


if (introSlider) {
    const newSliderWithFight = new SliderWithFight(introSlider, {
        percentageForSuccessfulScrolling: 30
    });
    newSliderWithFight.run();
};
