import toggleWindowScroll from './assets/toggleWindowScroll';

const toggleBurgerMenu = () => {
  const menuBtn = document.querySelectorAll('.menu__icon'),
    menu = document.querySelector('.popup-dialog-menu');

  let isHide = true;

  let clientWidth = document.documentElement.clientWidth,
    animationType = 'horizontal';
  const breakPoint = 576;

  window.addEventListener('resize', () => {
    if (clientWidth <= breakPoint) animationType = 'vertical';
    else animationType = 'horizontal';
  });

  const showMenu = () => {
    animationType === 'horizontal' ? menu.style.cssText = `transform: translateX(0);` :
      menu.style.cssText = `transform: translateY(0);`;
    toggleWindowScroll.blockWindowScroll();
    isHide = false;
  };

  menuBtn.forEach(item => item.addEventListener('click', showMenu));

  document.body.addEventListener('click', (e) => {
    const target = e.target;
    if ((!target.closest('.popup-dialog-menu, .menu') || target.closest('.close-menu')) && !target.closest('.popup-dialog')) {
      if (!isHide) {
        menu.removeAttribute('style');
        toggleWindowScroll.allowWindowScroll();
        isHide = true;
      }
    }
  });
};

const smoothMenuScroll = () => {
  const menu = document.querySelector('.popup-dialog-menu');

  menu.addEventListener('click', (e) => {
    e.preventDefault();
    const target = e.target;
    if (target.matches('.popup-menu-nav__item>a')) {
      const sectionToScroll = document.querySelector(target.hash);

      sectionToScroll.scrollIntoView({
        block: 'start',
        behavior: 'smooth'
      });
      menu.removeAttribute('style');
      toggleWindowScroll.allowWindowScroll();
    }
  });

  const buttonFooter = document.querySelector('.button-footer');
  buttonFooter.addEventListener('click', (e) => {
    e.preventDefault();
    const main = document.querySelector(buttonFooter.querySelector('a').hash);
    if (main) {
      main.scrollIntoView({
        block: 'start',
        behavior: 'smooth'
      });
    }
  });
};

export default {
  toggleBurgerMenu,
  smoothMenuScroll
};