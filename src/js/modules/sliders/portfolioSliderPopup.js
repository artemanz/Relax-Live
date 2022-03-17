import fadePopup from '../assets/popupFade';

const portfolioSliderPopup = () => {
  const showPopupSlider = (popupSlider, index, counter) => {
    const descriptions = [...document.querySelectorAll('.popup-portfolio-text')];
    descriptions[index].style.display = 'block';
    counter.textContent = index + 1;
    setTimeout(() => fadePopup.fadeInPopup(popupSlider));
  };

  const controlSlider = (direction) => {
    const moveSlide = () => {
      popupText.forEach(item => item.style.display = 'none');
      popupText[currentPosition].style.display = 'block';
      counterCurrent.textContent = currentPosition + 1;
      track.style.transform = `translateX(-${(currentPosition) * shift}%)`;
      isComplete = false;
    };

    if (isComplete) {
      if (direction < 0 && currentPosition > 0) {
        currentPosition--;
        moveSlide();
      }

      if (direction > 0 && currentPosition < length - 1) {
        currentPosition++;
        moveSlide();
      }
    }
  }

  const showSlide = (target, isMobile) => {
    if (target.matches('.portfolio-slider__slide-frame')) {
      const index = isMobile ? mPicture.indexOf(target) : picture.indexOf(target);
      currentPosition = index;
      track.style.transition = 'none';
      track.style.transform = `translateX(-${(currentPosition) * shift}%)`;
      popupText.forEach(item => item.style.display = 'none');
      popupText[currentPosition].style.display = 'block';
      setTimeout(() => track.style.transition = 'transform .5s ease');
      showPopupSlider(popupSlider, index, counterCurrent);
    }
  };

  const addEventListeners = () => {
    slider.addEventListener('click', (event) => {
      const target = event.target;
      showSlide(target, false);
    });

    mSlider.addEventListener('click', (event) => {
      const target = event.target;
      showSlide(target, true);
    });

    popupSlider.addEventListener('click', (event) => {
      const target = event.target;
      if (target.closest('.close')) {
        fadePopup.fadeOutPopup(popupSlider);
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

    track.addEventListener('transitionend', () => {
      isComplete = true;
    });
  };

  /* Popup */
  const slider = document.querySelector('.portfolio-slider');
  const mSlider = document.querySelector('.portfolio-slider-mobile');

  const picture = [...document.querySelectorAll('.mobile-hide .portfolio-slider__slide-frame')];
  const mPicture = [...document.querySelectorAll('.portfolio-slider-mobile .portfolio-slider__slide-frame')];

  const popupSlider = document.querySelector('.popup-portfolio');
  /* ^ Popup */

  /* Popup slider elems */
  const track = document.querySelector('.popup-portfolio-slider');
  const popupText = [...document.querySelectorAll('.popup-portfolio-text')];

  const prev = document.getElementById('popup_portfolio_left');
  const next = document.getElementById('popup_portfolio_right');

  const counterTotal = document.querySelector('.popup-portfolio .slider-counter-content__total');
  const counterCurrent = document.querySelector('.popup-portfolio .slider-counter-content__current');
  /* ^ Popup slider elems */

  /* Slider settings */
  let slidesToShow = 1;
  let currentPosition = 0;
  let shift = Math.floor(100 / slidesToShow);
  /* ^Slider settings */

  let length = picture.length;
  let isComplete = true;

  counterTotal.textContent = length;
  track.style.transform = `translateX(-${currentPosition * shift}%)`;
  addEventListeners();
};

export default portfolioSliderPopup;