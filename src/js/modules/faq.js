const faqAccordion = () => {
  const accordion = document.querySelector('.accordion');

  accordion.addEventListener('click', (e) => {
    const target = e.target;
    if (target.matches('.title_block')) {
      target.classList.toggle('msg-active');
    }
  });
};

export default faqAccordion;