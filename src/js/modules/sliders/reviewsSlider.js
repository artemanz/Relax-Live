const reviewsSlider = () => {
  const track = document.querySelector('.reviews-slider');
  const items = document.querySelectorAll('.reviews-slider__slide');

  const prev = document.getElementById('reviews-arrow_left');
  const next = document.getElementById('reviews-arrow_right');

  /* pagination */
  const dotsWrapper = document.querySelector('.slider-dots-reviews');
  const dots = [];
  dotsWrapper.style.display = 'flex';

  const dot = document.createElement('div');
  dot.className = 'dot dot-reviews switch';

  let newDot;
  for (let i = 0; i < items.length; i++) {
    newDot = dot.cloneNode(true);
    newDot.dataset.index = i;
    dots.push(newDot)
    dotsWrapper.append(newDot);
  }
  dots[0].classList.add('dot_active');
  // pagination

  let slidesToShow = 1;
  let length = items.length;
  let currentPosition = length;
  let shift = items[0].clientWidth;
  let isComplete = true;

  track.style.transform = `translateX(-${currentPosition * shift}px)`;

  items.forEach((item, i) => {
    item.dataset.index = i;
    const newItem = item.cloneNode(true);
    newItem.classList.add('slide-clone');
    items[0].insertAdjacentElement('beforebegin', newItem);
  });

  const totalArray = Array.from(track.children);
  const totalLength = totalArray.length;

  const prevSlide = () => {
    if (isComplete) {
      currentPosition--;
      track.style.transform = `translateX(-${(currentPosition) * shift}px)`;
      dots.forEach(item => item.classList.remove('dot_active'));
      dots[+totalArray[currentPosition].dataset.index].classList.add('dot_active');
      isComplete = false;
    }
  };

  const nextSlide = () => {
    if (isComplete) {
      currentPosition++;
      track.style.transform = `translateX(-${(currentPosition) * shift}px)`;
      dots.forEach(item => item.classList.remove('dot_active'));
      dots[+totalArray[currentPosition].dataset.index].classList.add('dot_active');
      isComplete = false;
    }
  };

  dotsWrapper.addEventListener('click', (e) => {
    const target = e.target;
    if (target.matches('.dot')) {
      if (currentPosition > length - 1) currentPosition = +target.dataset.index + length;
      else currentPosition = +target.dataset.index;
      dots.forEach(item => item.classList.remove('dot_active'));
      dots[+totalArray[currentPosition].dataset.index].classList.add('dot_active');
      track.style.transform = `translateX(-${(currentPosition) * shift}px)`;
    }
  });

  prev.addEventListener('click', prevSlide);
  next.addEventListener('click', nextSlide);

  track.addEventListener('transitionend', () => {
    if (currentPosition === totalLength - slidesToShow) {
      for (let i = 0; i < length; i++) {
        track.append(track.children[0]);
      }
      currentPosition = length - slidesToShow;
      track.style.transition = `none`;
      track.style.transform = `translateX(-${currentPosition * shift}px)`;
      setTimeout(() => track.style.transition = '');
    }

    if (currentPosition === 0) {
      for (let i = 0; i < length; i++) {
        track.prepend(track.lastElementChild);
      }
      currentPosition = length;
      track.style.transition = `none`;
      track.style.transform = `translateX(-${currentPosition * shift}px)`;
      setTimeout(() => track.style.transition = '');
    }

    isComplete = true;
  });

  window.addEventListener('resize', () => {
    track.removeAttribute('style');
    dots.forEach(item => item.classList.remove('dot_active'));
    dots[0].classList.add('dot_active');
    currentPosition = 0;
    length = items.length;
    shift = items[0].clientWidth;
  });
};

export default reviewsSlider;