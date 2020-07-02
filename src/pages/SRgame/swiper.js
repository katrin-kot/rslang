import Swiper from 'swiper';

const swiper = new Swiper('.swiper-container', {
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  pagination: {
    el: '.swiper-pagination',
    dynamicBullets: true,
  },
  initialSlide: 0,
  slidesPerView: 1,

});

export default swiper;
