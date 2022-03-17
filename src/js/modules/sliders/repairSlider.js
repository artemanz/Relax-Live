import Tab from '../assets/tabs';

const repairSlider = () => {
  const controlSlider = (direction) => {
    if (direction > 0) {
      if (currentPosition < lengthTotal - 1) {
        ++currentPosition;
        activeSlider.style.transform = `translateX(-${currentPosition * 100}%)`;
        counterCurrent.textContent = currentPosition + 1;
      }
    }

    if (direction < 0) {
      if (currentPosition > 0) {
        --currentPosition;
        activeSlider.style.transform = `translateX(-${currentPosition * 100}%)`;
        counterCurrent.textContent = currentPosition + 1;
      }
    }
  };

  const changeSlider = (target) => {
    repairItems.forEach((item) => {
      item.classList.remove('active');
    });
    target.classList.add('active');
    map.forEach(item => item.classList.remove('repair-slider-active'));

    let prevSlider = activeSlider;
    setTimeout(() => prevSlider.removeAttribute('style'), 400);

    activeSlider = map.get(target);
    activeSlider.classList.add('repair-slider-active');
    slides = activeSlider.querySelectorAll('.repair-types-slider__slide');
    currentPosition = 0;
    lengthTotal = [...slides].length;
    counterTotal.textContent = lengthTotal;
    counterCurrent.textContent = currentPosition + 1;

    const distance = [...typesRepair].reduce((acc, item, index, arr) => {
      if (index < arr.indexOf(map.get(target))) {
        return acc += item.clientHeight;
      } else return acc + 0;
    }, 0);

    sliderWrapper.style.transform = `translateY(-${distance}px)`;
  };

  const resize = () => {
    const width = window.innerWidth;
    if (width < 576) {
      changeSlider(repairItems[0]);
    }
  };

  const tab = new Tab({
    wrap: '.nav-list-repair',
    nav: ['#nav-arrow-repair-left_base', '#nav-arrow-repair-right_base'],
    slidesToShow: 3,
    responsive: {
      768: {
        slidesToShow: 1
      }
    },
    changeFn: changeSlider
  });

  const repairTypes = document.querySelector('.repair-types');
  const repairItems = repairTypes.querySelectorAll('button');
  const sliderWrapper = repairTypes.querySelector('.types-repair-wrapper');
  const typesRepair = sliderWrapper.querySelectorAll('.types-repair');

  const prev = document.getElementById('repair-types-arrow_left');
  const next = document.getElementById('repair-types-arrow_right');

  const counterTotal = repairTypes.querySelector('.slider-counter-content__total');
  const counterCurrent = repairTypes.querySelector('.slider-counter-content__current');

  let activeSlider = document.querySelector('.repair-slider-active');
  let slides = activeSlider.querySelectorAll('.repair-types-slider__slide');

  let currentPosition = 0;
  let lengthTotal = [...slides].length;

  counterTotal.textContent = lengthTotal;

  const map = new Map();
  for (let i = 0; i < repairItems.length; i++) {
    map.set(repairItems[i], typesRepair[i]);
  }

  repairTypes.addEventListener('click', (event) => {
    const target = event['target'].closest('.repair-types-nav__item');

    if (target) {
      if (target.classList.contains('active')) {
        return;
      } else {
        changeSlider(target);
      }
    }
  });

  prev.addEventListener('click', () => {
    const direction = -1;
    controlSlider(direction);
  });

  next.addEventListener('click', () => {
    const direction = 1;
    controlSlider(direction);
  });

  window.addEventListener('resize', resize);
  resize();
};

export default repairSlider;