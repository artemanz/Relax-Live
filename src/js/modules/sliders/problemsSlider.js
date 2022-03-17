import Slider from '../assets/slider';

const problemsSlider = () => {
  const slider = new Slider({
    wrap: '.problems-slider',
    nav: ['#problems-arrow_left', '#problems-arrow_right'],
    slidesToShow: 1,
    startPosition: 4,
    isFinity: true,
    hasActive: {
      class: 'active-item',
      position: 0
    },
  });
};

export default problemsSlider;