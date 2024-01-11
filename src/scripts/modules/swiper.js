import Swiper, { Navigation, Thumbs, EffectFade, Pagination, Controller, Autoplay } from 'swiper';
Swiper.use([Thumbs, EffectFade, Navigation, Pagination, Controller, Autoplay]);

const notesSlider = document.querySelector('.notes-slider');

if(notesSlider) {
  new Swiper(notesSlider, {
    spaceBetween: 40,
    pagination: {
      el: ".swiper-pagination",
      type: "fraction",
    },

    autoplay: true,
    speed: 2500,

    autoplay: {
      delay: 2500,
    },

    navigation: {
      nextEl: ".notes-slider-button-next",
      prevEl: ".notes-slider-button-prev",
    },
  });
}

const resultSlider = document.querySelector('.result-slider');

if(resultSlider) {
  new Swiper(resultSlider, {
    spaceBetween: 20,
    slidesPerView: 1,

    navigation: {
      nextEl: ".result-slider-button-next",
      prevEl: ".result-slider-button-prev",
    },

    breakpoints: {
      534: {
        slidesPerView: 2
      }
    }
  });
}

const reviewsSlider = document.querySelector('.reviews-slider');

if(reviewsSlider) {
  new Swiper(reviewsSlider, {
    spaceBetween: 15,
    slidesPerView: 'auto',

    navigation: {
      nextEl: ".reviews-slider-button-next",
      prevEl: ".reviews-slider-button-prev",
    },
  });
}
