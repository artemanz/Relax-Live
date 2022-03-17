class Tab {
  constructor({
    slidesToShow,
    wrap,
    nav,
    responsive,
    changeFn = false,
  }) {
    this.track = document.querySelector(wrap);
    this.tabs = Array.from(this.track.children);
    this.nav = {
      prev: document.querySelector(nav[0]),
      next: document.querySelector(nav[1]),
    }
    this.options = {
      defSlidesToShow: slidesToShow,
      slidesToShow: slidesToShow,
      currentPosition: 0,
      shift: Math.floor(100 / slidesToShow),
      length: this.tabs.length
    }
    this.responsive = responsive
    this.breakPoints = [];

    this.changeFn = changeFn;

    this.controlSLider = this.controlSLider.bind(this);
    this.resize = this.resize.bind(this);

    this.init();
  }

  init() {
    this.addEventListeners();

    if (this.responsive) {
      for (let key of Object.keys(this.responsive)) {
        this.breakPoints.push(+key);
      }
      this.resize();
    }
  };

  controlSLider(direction) {
    const {
      currentPosition,
      slidesToShow,
      length,
      shift
    } = this.options;
    if (direction > 0) {
      debugger;
      if (currentPosition < length - slidesToShow) {
        ++this.options.currentPosition;
        this.track.style.transform = `translateX(-${this.options.currentPosition * shift}%)`;
        if (this.changeFn && this.options.slidesToShow === 1) this.changeFn(this.tabs[this.options.currentPosition]);
      }
    }

    if (direction < 0) {
      if (currentPosition > 0) {
        --this.options.currentPosition;
        this.track.style.transform = `translateX(-${this.options.currentPosition * shift}%)`;
        if (this.changeFn && this.options.slidesToShow === 1) this.changeFn(this.tabs[this.options.currentPosition]);
      }
    }
  }

  changeSettings(def = false) {
    if (!def) {
      this.options.shift = Math.floor(100 / this.options.slidesToShow);
      this.options.currentPosition -= this.options.slidesToShow;
      if (this.options.currentPosition < 0) this.options.currentPosition = 0;
      this.track.style.transform = `translateX(-${this.options.currentPosition * this.options.shift}%)`;
    } else {
      this.options.slidesToShow = this.options.defSlidesToShow;
      this.options.shift = Math.floor(100 / this.options.slidesToShow);
      this.options.currentPosition = 0;
      this.track.removeAttribute('style');
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
  }
}

export default Tab;

function debounce(func, time = 100) {
  let timer;
  return function (event) {
    clearTimeout(timer);
    timer = setTimeout(func, time, event);
  }
}