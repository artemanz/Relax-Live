const portfolioSlider = () => {
  const controlSlider = (direction) => {
    if (isComplete) {
      if (direction < 0) {
        next.removeAttribute('style');
        currentPosition--;
        track.style.transform = `translateX(-${(currentPosition) * shift}px)`;
        if (currentPosition === 0) prev.style.display = 'none';
        isComplete = false;
      }

      if (direction > 0) {
        prev.removeAttribute('style');
        currentPosition++;
        track.style.transform = `translateX(-${(currentPosition) * shift}px)`;
        if (currentPosition === length - slidesToShow) next.style.display = 'none';
        isComplete = false;
      }
    }
  };

  const resize = () => {
    const width = window.innerWidth;
    if (width < 900 && width > 575) {
      slidesToShow = 1;
      currentPosition = 0;
      track.style.transform = `translateX(0)`;
      prev.style.display = 'none';
      next.style.display = 'block';
    } else if (width > 900 && slidesToShow !== 3) {
      slidesToShow = 3;
      currentPosition = 0;
      track.style.transform = `translateX(0)`;
      prev.style.display = 'none';
      next.style.display = 'block';
    }
    if (width < 575) {
      prev.style.display = 'none';
      next.style.display = 'none';
    }
  };

  const addEventListeners = () => {
    prev.addEventListener('click', () => {
      const direction = -1
      controlSlider(direction);
    });
    next.addEventListener('click', () => {
      const direction = 1
      controlSlider(direction);
    });

    track.addEventListener('transitionend', () => {
      isComplete = true;
    });

    window.addEventListener('resize', resize);
  };

  /* mainSLider elems */
  const parent = document.querySelector('.portfolio-slider-track');
  const picture = [...document.querySelectorAll('.portfolio-slider__slide')];

  const prev = document.getElementById('portfolio-arrow_left');
  const next = document.getElementById('portfolio-arrow_right');
  /* ^ mainSLider elems */

  /* Create slider */
  const track = document.createElement('div');
  track.className = 'slider-track';
  picture.forEach(item => track.append(item));
  parent.append(track);
  /* ^Create slider */

  prev.style.display = 'none';

  /* Slider settings */
  let slidesToShow = 3;
  let currentPosition = 0;
  let shift = picture[0].clientWidth;
  /* ^ Slider settings */

  let length = picture.length;
  let isComplete = true;

  resize();
  addEventListeners();
};

const portfolioMobileSlider = () => {
  const controlSlider = (direction) => {
    if (isComplete) {
      if (direction < 0 && currentPosition > 0) {
        next.removeAttribute('style');
        currentPosition--;
        track.style.transform = `translateX(-${(currentPosition) * shift}%)`;
        if (currentPosition === 0) prev.style.display = 'none';
        counterCurrent.textContent = currentPosition + 1;
        isComplete = false;
      }

      if (direction > 0 && currentPosition < length) {
        prev.removeAttribute('style');
        currentPosition++;
        track.style.transform = `translateX(-${(currentPosition) * shift}%)`;
        if (currentPosition === length - slidesToShow) next.style.display = 'none';
        counterCurrent.textContent = currentPosition + 1;
        isComplete = false;
      }
    }
  };

  const addEventListeners = () => {
    prev.addEventListener('click', () => {
      const direction = -1
      controlSlider(direction);
    });
    next.addEventListener('click', () => {
      const direction = 1
      controlSlider(direction);
    });

    track.addEventListener('transitionend', () => {
      isComplete = true;
    });
  };
  const parent = document.querySelector('.portfolio-slider-mobile');
  const picture = [...document.querySelectorAll('.portfolio-slider-mobile .portfolio-slider__slide-frame')];

  const prev = document.getElementById('portfolio-arrow-mobile_left');
  const next = document.getElementById('portfolio-arrow-mobile_right');

  const counterTotal = document.querySelector('.portfolio-slider-wrap .slider-counter-content__total');
  const counterCurrent = document.querySelector('.portfolio-slider-wrap .slider-counter-content__current');
  counterTotal.textContent = picture.length;
  counterCurrent.textContent = 1;

  prev.style.display = 'none';

  /* Create slider */
  const track = document.createElement('div');
  track.className = 'slider-track';
  picture.forEach(item => track.append(item));
  parent.append(track);
  /* ^Create slider */

  /* Slider settings */
  let slidesToShow = 1;
  let currentPosition = 0;
  let shift = 122;
  /* ^ Slider settings */

  let length = picture.length;
  let isComplete = true;

  addEventListeners();
};

export default {
  portfolioSlider,
  portfolioMobileSlider
};