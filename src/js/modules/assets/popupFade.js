import toggleWindowScroll from './toggleWindowScroll';

const fadeInPopup = (popup) => {
  toggleWindowScroll.blockWindowScroll();
  popup.style.visibility = 'visible';
  setTimeout(() => popup.style.opacity = 1, 0);
};

const fadeOutPopup = (popup) => {
  popup.style.opacity = 0;
  setTimeout(() => popup.style.visibility = 'hidden', 500);
  toggleWindowScroll.allowWindowScroll();
}

export default {
  fadeInPopup,
  fadeOutPopup
};