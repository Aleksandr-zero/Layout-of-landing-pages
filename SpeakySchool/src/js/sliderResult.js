// slider - block achieving-results
const achievingResults = document.querySelector(".achieving-results");

if (achievingResults) {
    const achievingResultsSlider = achievingResults.querySelector('.slider');
    const NewSlider = new SliderWithoutFight(achievingResultsSlider);

    const checkResizeWindow = () => {
        if (innerWidth <= 630) {
            NewSlider.run();
        };
    };

    checkResizeWindow();
    window.addEventListener("resize", checkResizeWindow);
};
