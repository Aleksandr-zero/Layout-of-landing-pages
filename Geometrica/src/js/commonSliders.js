// block ADVANTAGES
const advantagesSlider = document.querySelector(".advantages__content-slider");

const newSliderWithSections_advantages = new SliderWithSections(advantagesSlider, {
  speed: 300,
  scrollSlidesAtTime: 1,
  slidesPerView: 3
});
newSliderWithSections_advantages.run();


// block REVIEWS
const reviewsSlider = document.querySelector(".reviews__content-slider");

const newSliderWithSections_reviews = new SliderWithSections(reviewsSlider, {
  speed: 300,
  scrollSlidesAtTime: 1,
  slidesPerView: 3
});
newSliderWithSections_reviews.run();