import Tab from './assets/tabs';

const designSection = () => {
  const changeSlide = (target) => {
    tabs.forEach(item => item.classList.remove('active'));
    target.classList.add('active');

    const index = tabs.indexOf(target);
    slides.forEach(item => {
      item.style.display = 'none';
    });
    slides[index].removeAttribute('style');

    const imgSrc = getSrc(slides[index]);
    addPreviewItems(imgSrc);

    previewBlock.dataset.index = index;
    slidesImages = Array.from(slides[previewBlock.dataset.index].children);
    slidesImages[0].style.display = 'block';
    count = 0;
    counterTotal.textContent = slidesImages.length;
    counterCurrent.textContent = count + 1;
  };

  const addEventListeners = () => {
    /* Desktop tabs */
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
    /* ^ Desktop tabs */

    /* Preview nav */
    previewBlock.addEventListener('click', previewSliderNav);
    /* ^ Preview nav */
  };

  const getSrc = (slidesParent) => {
    const slides = Array.from(slidesParent.children);
    const src = [];
    slides.forEach(item => src.push(item.querySelector('img').attributes.src.nodeValue));
    return src;
  };

  const addPreviewItems = (src) => {
    previewBlock.innerHTML = '';
    const previewitems = [];

    src.forEach((item, i) => {
      const previewItem = document.createElement('div');
      previewItem.classList.add('preview-block__item');

      previewItem.insertAdjacentHTML('afterbegin', `
    <div class="preview-block__item-inner loft preview_active">Интерьер ${i+1}</div>
    <img src="${item}" alt="">
    `);
      previewitems.push(previewItem);
    });

    previewitems.forEach(item => previewBlock.append(item));
  };

  const previewSliderNav = (e) => {
    const previewsItems = Array.from(previewBlock.children);
    const target = e['target'].closest('.preview-block__item');

    if (target) {
      slidesImages.forEach(item => item.style.display = 'none');
      slidesImages[previewsItems.indexOf(target)].style.display = 'block';
    }
  };

  const addEventListenersMobile = () => {
    prevMobile.addEventListener('click', () => {
      if (count > 0) {
        count--;
        counterCurrent.textContent = count + 1;
        slidesImages.forEach(item => item.style.display = 'none');
        slidesImages[count].style.display = 'block';
      }
    });

    nextMobile.addEventListener('click', () => {
      if (count < slidesImages.length - 1) {
        count++;
        counterCurrent.textContent = count + 1;
        slidesImages.forEach(item => item.style.display = 'none');
        slidesImages[count].style.display = 'block';
      }
    });
  };

  /* Tabs */
  const navTabs = document.querySelector('.designs .nav-wrap');
  const tabs = [...navTabs.querySelectorAll('.button_o')];
  /* ^ Tabs */

  /* Slider */
  const slider = document.querySelector('.designs-slider');
  const slides = Array.from(slider.children);
  const portfolioImage = slider.querySelectorAll('.designs-slider__style-slide');
  const previewBlock = document.querySelector('.preview-block');
  let slidesImages;
  /* ^ Slider */

  /* Mobile tabs */
  const tab = new Tab({
    wrap: '.designs .nav-list',
    nav: ['#nav-arrow-designs_left', '#nav-arrow-designs_right'],
    slidesToShow: 3,
    responsive: {
      768: {
        slidesToShow: 1
      }
    },
    changeFn: changeSlide
  });
  /* ^ Mobile tabs */

  /* Mobile slider */
  const prevMobile = document.getElementById('design_left');
  const nextMobile = document.getElementById('design_right');

  const counterTotal = document.querySelector('.designs .slider-counter-content__total');
  const counterCurrent = document.querySelector('.designs .slider-counter-content__current');
  let count = 0;
  /* ^Mobile slider */

  let isComplete = true;

  portfolioImage.forEach(item => {
    item.classList.add('fade-tab');
    item.style.display = 'none';
  });
  slides.forEach(item => item.classList.add('fade-tab'));
  changeSlide(tabs[0]);
  counterTotal.textContent = slidesImages.length;

  addEventListeners();
  addEventListenersMobile();
};

export default designSection;