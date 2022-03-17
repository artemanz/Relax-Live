import Tab from './assets/tabs';

const workProcess = () => {
  const changeSlide = (target) => {
    items.forEach(item => item.classList.remove('active'));
    target.classList.add('active');

    const index = items.indexOf(target);
    slides.forEach(item => item.style.display = 'none');
    descriptions.forEach(item => item.classList.remove('visible-content-block'));

    descriptions[index].classList.add('visible-content-block');
    slides[index].removeAttribute('style');
  };

  const navTabs = document.querySelector('.scheme .nav-wrap');
  const items = [...navTabs.querySelectorAll('.button_o')];
  const descriptions = [...document.querySelectorAll('.scheme-description-block')];
  let isComplete = true;

  const slides = [...document.querySelectorAll('.scheme-slider__slide')];

  slides.forEach(item => item.style.display = 'none');
  slides[0].removeAttribute('style');

  navTabs.addEventListener('click', (e) => {
    if (isComplete) {
      const target = e.target;
      if (target.matches('.button_o')) {
        changeSlide(target);
      }
    }
    isComplete = false;
  });

  navTabs.addEventListener('transitionend', () => isComplete = true);

  /* Mobile nav-slider */
  const tab = new Tab({
    wrap: '.scheme .nav-list',
    nav: ['#nav-arrow-scheme_left', '#nav-arrow-scheme_right'],
    slidesToShow: 3,
    responsive: {
      768: {
        slidesToShow: 1
      }
    },
    changeFn: changeSlide
  });
};

export default workProcess;