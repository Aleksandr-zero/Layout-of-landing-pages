// block ADVANTAGES
const advantagesSlider = document.querySelector(".advantages__content-slider");

if ( advantagesSlider ) {
  const newSliderWithSections_advantages = new SliderWithSections(advantagesSlider, {
    speed: 300,
    scrollSlidesAtTime: 1,
    slidesPerView: 3
  });
  newSliderWithSections_advantages.run();
};


// block REVIEWS
const reviewsSlider = document.querySelector(".reviews__content-slider");

if ( reviewsSlider ) {
  const newSliderWithSections_reviews = new SliderWithSections(reviewsSlider, {
    speed: 300,
    scrollSlidesAtTime: 1,
    slidesPerView: 3
  });
  newSliderWithSections_reviews.run();
};


// block NEW-ITEMS
const newItemsSlider = document.querySelector(".popup-collection__content-slider-with-previews");

if ( newItemsSlider ) {
  const newSliderWithPreviews = new SliderWithPreviews(newItemsSlider, {
    speed: 400,
    slidesPreviewPerView: 3
  });
  newSliderWithPreviews.run();
};
