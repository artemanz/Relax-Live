const showPopup = (popup) => {
  popup.style.visibility = 'visible';
  setTimeout(() => popup.style.opacity = 1, 0);
};

const showTooltip = (node, selector) => {
  const title = node.querySelector(`.${selector}-title`);
  let element;
  let popup;

  let style = document.createElement('style');
  style.id = `${selector}-tooltips`;
  style.textContent = `
  .${selector}-item-popup-tranformed {
    top: 140px;
    padding-top: 40px;
  }

  .${selector}-item-popup-tranformed::before {
    transform: rotate(180deg);
  }`;

  document.head.append(style);

  node.addEventListener('mouseover', (e) => {
    const target = e['target'].closest(`.${selector}-item__icon-inner-text`);
    if (target && !popup) {
      const newTarget = target.closest(`.${selector}-item__icon`)
      popup = newTarget.querySelector(`.${selector}-item-popup`);
      if (popup.getBoundingClientRect().y < 0) {
        popup.classList.add(`${selector}-item-popup-tranformed`);
        title.style.zIndex = '-1';
        document.querySelectorAll(`.${selector}-item`).forEach(item => {
          item.style.cssText = 'z-index: -1;';
        });
        popup.closest(`.${selector}-item`).style.zIndex = '1';
      }

      element = target.closest(`.${selector}-item`);
      element.classList.add('active-item');
      showPopup(popup);
    }
  });

  node.addEventListener('mouseout', (e) => {
    const target = e['target'].closest(`.${selector}-item__icon-inner-text`);
    if (!target && popup) {
      popup.removeAttribute('style');
      popup.classList.remove(`${selector}-item-popup-tranformed`);
      title.removeAttribute('style');
      document.querySelectorAll(`.${selector}-item`).forEach(item => {
        item.removeAttribute('style');
      });

      element.classList.remove('active-item');
      popup = null;
    }
  });
};

const showFormulaTooltips = () => {
  const formula = document.querySelector('.formula');
  showTooltip(formula, 'formula');
}

const showProblemsTooltips = () => {
  const problems = document.querySelector('.problems');
  showTooltip(problems, 'problems');
}

/* showNumberList */
const showNumberTooltip = () => {
  const newNumber = document.querySelector('.header-contacts__phone-number-accord');
  let isHide = true;
  document.querySelector('.header-contacts').addEventListener('click', (event) => {
    const target = event.target;
    if (target.closest('.header-contacts__arrow')) {
      if (isHide) {
        newNumber.style.cssText = 'top: 2rem;';
        newNumber.children[0].style.opacity = 1;
        isHide = false;
      } else {
        newNumber.removeAttribute('style');
        newNumber.children[0].style.opacity = 0;
        isHide = true;
      }
    }
  });
};
/* ^ showNumberList */

export default {
  showFormulaTooltips,
  showProblemsTooltips,
  showNumberTooltip
};