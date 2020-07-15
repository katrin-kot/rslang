import Swiper from 'swiper';

const swiper = new Swiper('.swiper-container', {
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  pagination: {
    el: '.swiper-pagination',
    type: 'progressbar',
  },
  initialSlide: 0,
  slidesPerView: 1,
  centeredSlides: true,
  allowTouchMove: false,

});
swiper.on('slideChange', () => {
  setTimeout(() => {
    document.querySelector('.swiper-slide-active .word-input').focus();
  }, 1000);
});

export default swiper;
