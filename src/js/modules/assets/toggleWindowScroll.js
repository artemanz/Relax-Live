const blockWindowScroll = () => {
  document.body.style.paddingRight = 18 + 'px';
  document.body.style.overflowY = 'hidden';
};
const allowWindowScroll = () => {
  setTimeout(() => {
    document.body.style.overflowY = 'auto';
    document.body.style.paddingRight = '';
  }, 500);
};

export default {
  blockWindowScroll,
  allowWindowScroll
};