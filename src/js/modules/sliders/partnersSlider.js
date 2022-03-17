import Slider from '../assets/slider';

const partnersSlider = () => {
  const slider = new Slider({
    wrap: '.partners-slider',
    nav: ['#partners-arrow_left', '#partners-arrow_right'],
    slidesToShow: 3,
    responsive: {
      576: {
        slidesToShow: 1
      }
    }
  });
};

export default partnersSlider;