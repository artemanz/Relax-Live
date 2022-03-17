class Slider {
  constructor({
    wrap,
    nav,
    slidesToShow,
    startPosition = 0,
    isFinity = false,
    hasActive = false,
    responsive,
  }) {
    this.track = document.querySelector(wrap);
    this.slides = Array.from(this.track.children);
    this.nav = {
      prev: document.querySelector(nav[0]),
      next: document.querySelector(nav[1]),
    }
    this.options = {
      defSlidesToShow: slidesToShow,
      slidesToShow: slidesToShow,
      defCurrentPosition: startPosition,
      currentPosition: startPosition,
      shift: Math.floor(100 / slidesToShow),
      length: this.slides.length,
      count: this.slides.length
    }

    this.isFinity = isFinity;
    this.hasActive = hasActive;
    this.isTransitionComplete = true;

    this.responsive = responsive;
    this.breakPoints = [];

    this.controlSLider = this.controlSLider.bind(this);
    this.resize = this.resize.bind(this);
    this.replaceSlides = this.replaceSlides.bind(this);

    this.init();
  }

  init() {
    this.addEventListeners();
    if (this.isFinity) this.cloneSlides();
    if (this.hasActive) this.activeSlide();

    if (this.responsive) {
      for (let key of Object.keys(this.responsive)) {
        this.breakPoints.push(+key);
      }
      this.changeSettings();
      this.resize();
    }
  };

  cloneSlides() {
    this.slides.forEach(item => {
      const newItem = item.cloneNode(true);
      newItem.classList.add('slide-clone');
      this.slides[0].insertAdjacentElement('beforebegin', newItem);
    });

    this.slides = Array.from(this.track.children);
    this.options.length = this.slides.length;
    this.track.style.transform = `translateX(-${this.options.currentPosition * this.options.shift}%)`;
  }

  controlSLider(direction) {
    if (this.isTransitionComplete) {
      if (direction > 0) {
        if (!this.isFinity && this.options.currentPosition >= this.options.length - this.options.slidesToShow) return;
        ++this.options.currentPosition;
        this.track.style.transform = `translateX(-${this.options.currentPosition * this.options.shift}%)`;
        this.isTransitionComplete = false;
      }

      if (direction < 0) {
        if (!this.isFinity && this.options.currentPosition <= 0) return;
        --this.options.currentPosition;
        this.track.style.transform = `translateX(-${this.options.currentPosition * this.options.shift}%)`;
        this.isTransitionComplete = false;
      }
    }
  }

  activeSlide() {
    this.slides.forEach(item => item.classList.remove(this.hasActive.class));
    this.slides[this.options.currentPosition + this.hasActive.position].classList.add(this.hasActive.class);
  }

  replaceSlides() {
    if (this.isFinity) {
      if (this.options.currentPosition === this.options.length - this.options.slidesToShow) {
        for (let i = 0; i < this.options.length; i++) {
          this.track.append(this.track.children[0]);
        }
        this.options.currentPosition = this.options.length / 2 - this.options.slidesToShow;
        this.track.style.transition = `transform 0s`;
        this.track.style.transform = `translateX(-${this.options.currentPosition * this.options.shift}%)`;
        setTimeout(() => this.track.style.transition = '');
      }

      if (this.options.currentPosition === 0) {
        for (let i = 0; i < this.options.length; i++) {
          this.track.prepend(this.track.lastElementChild);
        }
        this.options.currentPosition = this.options.length / 2;
        this.track.style.transition = `transform 0s`;
        this.track.style.transform = `translateX(-${this.options.currentPosition * this.options.shift}%)`;
        setTimeout(() => this.track.style.transition = '');
      }
    }

    if (this.hasActive) this.activeSlide();
    this.isTransitionComplete = true;
  }

  changeSettings(def = false) {
    if (!def) {
      this.options.shift = Math.floor(100 / this.options.slidesToShow);
      this.track.style.transform = `translateX(-${this.options.currentPosition * this.options.shift}%)`;
      if (this.options.slidesToShow === 1 && this.hasActive) this.hasActive.position = 0;
    } else {
      this.options.slidesToShow = this.options.defSlidesToShow;
      this.options.shift = Math.floor(100 / this.options.slidesToShow);
      this.options.currentPosition = this.options.defCurrentPosition;
      this.track.style.transform = `translateX(-${this.options.currentPosition * this.options.shift}%)`;
      if (this.options.slidesToShow === 3 && this.hasActive) this.hasActive.position = 1;
    }
  };

  resize() {
    const width = window.innerWidth;
    this.breakPoints.forEach(item => {
      if (width < item) {
        for (let key in this.responsive[item]) {
          this.options[key] = this.responsive[item][key];
        }
        this.changeSettings();
      } else {
        this.changeSettings(true);
      }
    });
  }

  addEventListeners() {
    this.nav.prev.addEventListener('click', () => {
      this.controlSLider(-1);
    });
    this.nav.next.addEventListener('click', () => {
      this.controlSLider(1);
    });

    window.addEventListener('resize', debounce(this.resize));
    this.track.addEventListener('transitionend', debounce(this.replaceSlides, 400));
  }
}

export default Slider;

function debounce(func, time = 100) {
  let isComplete = true;
  return function (event) {
    if (isComplete) {
      func(event);
      isComplete = false;
      setTimeout(() => {
        isComplete = true;
      }, time);
    }
  }
}