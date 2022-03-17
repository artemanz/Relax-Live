import fadePopup from './assets/popupFade';

const maskPhone = () => {
  const masked = '+7 (___) ___-__-__';
  const elems = document.querySelectorAll('input[name="phone"]');

  function mask(event) {
    const keyCode = event.keyCode;
    const template = masked,
      def = template.replace(/\D/g, ""),
      val = this.value.replace(/\D/g, "");
    let i = 0,
      newValue = template.replace(/[_\d]/g, function (a) {
        return i < val.length ? val.charAt(i++) || def.charAt(i) : a;
      });
    i = newValue.indexOf("_");
    if (i != -1) {
      newValue = newValue.slice(0, i);
    }
    let reg = template.substr(0, this.value.length).replace(/_+/g,
      function (a) {
        return "\\d{1," + a.length + "}";
      }).replace(/[+()]/g, "\\$&");
    reg = new RegExp("^" + reg + "$");
    if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) {
      this.value = newValue;
    }
    if (event.type == "blur" && this.value.length < 5) {
      this.value = "";
    }

  }

  for (const elem of elems) {
    elem.addEventListener("input", mask);
    elem.addEventListener("focus", mask);
    elem.addEventListener("blur", mask);
  }
}

const ajaxSendForm = (urlPost) => {
  const sendForm = (url, body) => {
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
  };

  const forms = document.querySelectorAll('form');
  validateName();

  forms.forEach((item) => {
    const privacyCheck = item.querySelector('input[type="checkbox"]');

    item.addEventListener('submit', (e) => {
      e.preventDefault();

      let isEmpty = false;
      const inputs = item.querySelectorAll('input[type="text"]');
      inputs.forEach(i => {
        if (i.value.trim() === '') {
          isEmpty = true;
        }
      });
      if (!isEmpty) {
        const formData = new FormData(item);
        const body = {};
        formData.forEach((value, key) => {
          body[key] = value.trim();
        });

        if (privacyCheck.checked) {
          sendForm(urlPost, body);
          thanksPopup(inputs, privacyCheck);
        } else {
          showMessage('Необходимо согласие на обработку персональных данных', item.querySelector('button'));
        }
      } else {
        showMessage('Необходимо заполнить все поля формы', item.querySelector('button'));
      }
    });
  });
};

const showMessage = (msg, button) => {
  const message = document.createElement('span');
  if (button.nextElementSibling.classList.contains('form-message-warn')) button.nextElementSibling.remove();
  message.classList.add('form-message-warn');
  message.textContent = msg;
  message.style.cssText = 'color:red; margin-top: 10px; text-align: center; max-width: 350px;';
  button.insertAdjacentElement('afterend', message);
};

const thanksPopup = (inputs, privacyCheck) => {
  const popupConsultation = document.querySelector('.popup-consultation');
  const popup = document.querySelector('.popup-thank');
  popup.style.cssText = 'transition: opacity .5s ease; opacity: 0;'

  setTimeout(() => {
    fadePopup.fadeInPopup(popup);
    fadePopup.fadeOutPopup(popupConsultation);
    inputs.forEach(item => item.value = '');
    privacyCheck.checked = false;
    [...document.querySelectorAll('.form-message-warn')].forEach(item => item.remove());
  }, 500);

  const close = setTimeout(() => fadePopup.fadeOutPopup(popup), 5000);

  popup.addEventListener('click', (e) => {
    const target = e.target;
    if (target.closest('.close') || !target.closest('.feedback-wrap')) {
      fadePopup.fadeOutPopup(popup);
      clearTimeout(close);
    }
  });
};

const validateName = () => {
  const inputs = document.querySelectorAll('input[name=name]');
  inputs.forEach(item => {
    item.addEventListener('input', () => {
      item.value = item.value.replace(/[^а-яё ]/gi, '');
      item.value = item.value.replace(/ +/gi, ' ');
      item.value = item.value.replace(/^ /, '');
    });
  });
};

export default {
  maskPhone,
  ajaxSendForm
};