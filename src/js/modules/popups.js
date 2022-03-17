import fadePopup from './assets/popupFade';

const privacy = () => {
  const linkPrivacy = document.querySelectorAll('span.link-privacy'),
    popupPrivacy = document.querySelector('.popup-privacy');

  popupPrivacy.style.cssText = 'transition: opacity .5s ease; opacity: 0;'

  linkPrivacy.forEach(item => {
    item.addEventListener('click', () => {
      fadePopup.fadeInPopup(popupPrivacy);
    });
  });

  popupPrivacy.addEventListener('click', (e) => {
    const target = e.target;
    if (target.closest('.close') || !target.closest('.popup-dialog')) {
      fadePopup.fadeOutPopup(popupPrivacy);
    }
  });
};

const fadeTransition = (slider, activeIndex, counterCurrent, transparencyItems) => {
  const parent = document.querySelector(slider);
  const fade = () => {
    counterCurrent.textContent = activeIndex + 1;
    transparencyItems.forEach((item, i) => {
      if (activeIndex !== i) {
        item.style.cssText = 'display: none; opacity: 0;';
      }
    });
    parent.style.opacity = '1';
    parent.removeEventListener('transitionend', fade);
  };

  parent.addEventListener('transitionend', fade);
  parent.style.opacity = '0';
};

const contract = () => {
  const popupTransparency = document.querySelector('.popup-transparency'),
    transparencySlider = document.querySelector('.transparency-slider');

  const transparencyTrack = document.querySelector('.popup-transparency-slider'),
    transparencyItems = [...document.querySelectorAll('.popup-transparency-slider__slide')];

  const counterCurrent = popupTransparency.querySelector('.slider-counter-content__current');
  const totalCurrent = popupTransparency.querySelector('.slider-counter-content__total');

  let length = transparencyItems.length;
  totalCurrent.textContent = length;

  popupTransparency.style.cssText = 'transition: opacity .5s ease; opacity: 0;';

  let activeIndex = 0;

  transparencySlider.addEventListener('click', (event) => {
    const target = event.target;
    if (target.matches('.transparency-item__img')) {
      const arr = Array.from(transparencySlider.children);
      activeIndex = arr.indexOf(arr.find((item) => item === target.closest('.transparency-item')));
      counterCurrent.textContent = activeIndex + 1;
      transparencyItems.forEach((item, i) => {
        if (activeIndex !== i) {
          item.style.cssText = 'display: none; opacity: 0;';
        }
      });

      fadePopup.fadeInPopup(popupTransparency);
    }
  });

  popupTransparency.addEventListener('click', (event) => {
    const target = event.target;
    if (target.closest('.close') || !target.closest('.popup-dialog-transparency')) {
      fadePopup.fadeOutPopup(popupTransparency);
      setTimeout(() => transparencyItems.forEach(item => item.removeAttribute('style')), 400);
    }
  });

  const prev = document.getElementById('transparency_left'),
    next = document.getElementById('transparency_right');

  prev.addEventListener('click', () => {
    setTimeout(() => transparencyItems.forEach(item => item.removeAttribute('style')), 400);
    --activeIndex;
    if (activeIndex < 0) activeIndex = length - 1;
    fadeTransition('.popup-dialog-transparency', activeIndex, counterCurrent, transparencyItems);
  });

  next.addEventListener('click', () => {
    setTimeout(() => transparencyItems.forEach(item => item.removeAttribute('style')), 400);
    ++activeIndex;
    if (activeIndex > length - 1) activeIndex = 0;
    fadeTransition('.popup-dialog-transparency', activeIndex, counterCurrent, transparencyItems);
  });
};

const consultation = () => {
  const popupConsultation = document.querySelector('.popup-consultation'),
    consultationBtn = document.querySelectorAll('.button_wide');

  popupConsultation.style.cssText = 'transition: opacity .5s ease; opacity: 0;'

  consultationBtn.forEach(item => {
    item.addEventListener('click', () => {
      fadePopup.fadeInPopup(popupConsultation);
    });
  });

  popupConsultation.addEventListener('click', (e) => {
    const target = e.target;
    if (target.closest('.close') || !target.closest('.feedback-wrap')) {
      fadePopup.fadeOutPopup(popupConsultation);
    }
  });

  transparencyMobileSlider();
};

const transparencyMobileSlider = () => {
  const track = document.querySelector('.transparency-slider.row');
  const items = Array.from(track.children);
  const prev = document.getElementById('transparency-arrow_left');
  const next = document.getElementById('transparency-arrow_right');

  window.addEventListener('resize', () => {
    track.removeAttribute('style');
  });

  prev.style.display = 'none';

  let position = 0;
  let shift = 100;

  prev.addEventListener('click', () => {
    --position;
    next.removeAttribute('style');
    if (position === 0) {
      prev.style.display = 'none';
    }
    track.style.transform = `translateX(-${position*shift}%)`;
  });

  next.addEventListener('click', () => {
    ++position;
    prev.removeAttribute('style');
    if (position === items.length - 1) {
      next.style.display = 'none';
    }
    track.style.transform = `translateX(-${position*shift}%)`;
  });
};

const popupDesign = () => {
  const showDesignPopup = () => {
    slideImages = Array.from(mainSlides[0].children);
    slideImages[0].style.display = 'block';
    counterTotal.textContent = slideImages.length;
    currentSlideIndex = 0;
    counterCurrent.textContent = currentSlideIndex + 1;
    fadePopup.fadeInPopup(popupDesign);
  };

  const hideDesignPopup = (e) => {
    const target = e.target.closest('.popup-dialog');
    if (!target) fadePopup.fadeOutPopup(popupDesign);
    if (e['target'].closest('.close')) fadePopup.fadeOutPopup(popupDesign);
  };

  const changeSlide = (currentSlideIndex) => {
    slideImages.forEach(item => item.style.display = 'none');
    slideImages[currentSlideIndex].style.display = 'block';
    counterCurrent.textContent = currentSlideIndex + 1;
  };

  const showSlider = (target) => {
    const index = tabs.indexOf(target)
    tabs.forEach(item => item.classList.remove('active'));
    tabs[index].classList.add('active');

    mainSlides.forEach(item => item.style.display = 'none');
    textContent.forEach(item => item.classList.remove('visible-content-block'));
    mainSlides[index].style.display = 'block';
    textContent[index].classList.add('visible-content-block');

    slideImages = Array.from(mainSlides[index].children);
    slideImages[0].style.display = 'block';
    counterTotal.textContent = slideImages.length;
    currentSlideIndex = 0;
    counterCurrent.textContent = currentSlideIndex + 1;
  };

  const addEventListeners = () => {
    navTabs.addEventListener('click', (e) => {
      const target = e['target'].closest('.button_o');
      if (target) {
        showSlider(target);
      }
    });

    prev.addEventListener('click', () => {
      if (currentSlideIndex > 0) {
        --currentSlideIndex;
        changeSlide(currentSlideIndex);
      }
    });
    next.addEventListener('click', () => {
      if (currentSlideIndex < slideImages.length - 1) {
        ++currentSlideIndex;
        changeSlide(currentSlideIndex);
      }

      // resize
      window.addEventListener('resize', resize);
    });

    trigger.addEventListener('click', showDesignPopup);
    popupDesign.addEventListener('click', hideDesignPopup);
  };

  const controlMobileTabs = (direction) => {
    if (direction > 0) {
      if (currentPosition < length - slidesToShow) {
        currentPosition++;
        navTrack.style.transform = `translateX(-${(currentPosition) * shift}%)`;
        if (slidesToShow === 1) showSlider(tabs[currentPosition]);
      }

    } else if (direction < 0) {
      if (currentPosition > 0) {
        currentPosition--;
        navTrack.style.transform = `translateX(-${(currentPosition) * shift}%)`;
        if (slidesToShow === 1) showSlider(tabs[currentPosition]);
      }
    }
  };

  const mobileAddEventListeners = () => {
    tabPrev.addEventListener('click', () => {
      const direction = -1;
      controlMobileTabs(direction);
    });

    tabNext.addEventListener('click', () => {
      const direction = 1;
      controlMobileTabs(direction);
    });
  };

  const resize = () => {
    const width = document.documentElement.clientWidth;
    if (width < 1134 && width > 576) {
      slidesToShow = 3;
      shift = 100 / slidesToShow;
    }
    if (width < 576) {
      slidesToShow = 1;
      shift = 100 / slidesToShow;
      currentPosition = 0;
      navTrack.style.transform = `translateX(-${currentPosition * shift}%)`;
    }
  };

  const trigger = document.querySelector('.link-list-designs a');
  const popupDesign = document.querySelector('.popup-design');
  popupDesign.style.cssText = 'transition: opacity .5s ease; opacity: 0;';

  /* Tabs */
  const navTabs = document.querySelector('.popup-design .nav-wrap');
  const tabs = [...navTabs.querySelectorAll('.button_o')];
  /* ^ Tabs */

  /* Slider */
  const mainSlider = document.querySelector('.popup-design-slider');
  const mainSlides = Array.from(mainSlider.children);
  const textContent = [...document.querySelectorAll('.popup-design-text')];

  const popupSlides = [...document.querySelectorAll('.popup-design-slider__style-slide')];
  popupSlides.forEach(item => {
    item.classList.add('fade-tab');
    item.style.display = 'none';
  });

  const prev = document.getElementById('popup_design_left');
  const next = document.getElementById('popup_design_right');

  const counterTotal = document.querySelector('.popup-design .slider-counter-content__total');
  const counterCurrent = document.querySelector('.popup-design .slider-counter-content__current');

  let slideImages = [];
  let currentSlideIndex = 0;
  /* ^Slider */

  /* Mobile tabs */
  let slidesToShow = 3;
  let length = tabs.length;
  let currentPosition = 0;
  let shift = Math.floor(100 / slidesToShow);

  const navTrack = document.querySelector('.popup-design .nav-list');
  const tabPrev = document.getElementById('nav-arrow-popup-designs_left');
  const tabNext = document.getElementById('nav-arrow-popup-designs_right');

  navTrack.style.transform = `translateX(-${currentPosition * shift}%)`;
  /* ^ Mobile tabs */

  counterTotal.textContent = 0;
  counterCurrent.textContent = 1;

  mainSlides.forEach(item => {
    item.classList.add('fade-tab');
    item.style.display = 'none';
  });
  mainSlides[0].style.display = 'block';

  resize();
  addEventListeners();
  mobileAddEventListeners();
};

export default {
  privacy,
  contract,
  consultation,
  popupDesign
};