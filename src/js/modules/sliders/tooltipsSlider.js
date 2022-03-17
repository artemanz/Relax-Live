import Slider from '../assets/slider';

const tooltipsSlider = () => {
  const slider = new Slider({
    wrap: '.formula-slider',
    nav: ['#formula-arrow_left', '#formula-arrow_right'],
    slidesToShow: 3,
    startPosition: 5,
    isFinity: true,
    hasActive: {
      class: 'active-item',
      position: 1
    },
    responsive: {
      785: {
        slidesToShow: 1,
        currentPosition: 6,
      },
      576: {
        slidesToShow: 1,
        currentPosition: 6,
      }
    }
  });
};

export default tooltipsSlider;