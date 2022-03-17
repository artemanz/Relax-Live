import toggleWindowScroll from './assets/toggleWindowScroll';

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

export default smoothMenuScroll;