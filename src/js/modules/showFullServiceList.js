import fadePopup from './assets/popupFade';
import Tab from './assets/tabs';

const getData = (url) => {
  return fetch(url)
    .then(response => {
      if (response.status !== 200) {
        throw new Error('status network not 200.');
      }
      return response.json();
    })
    .catch(err => console.warn(err));
};

const showFullServiceList = (url) => {
  const triggers = document.querySelectorAll('.link-list'),
    popup = document.querySelector('.popup-repair-types'),
    menu = document.querySelector('.popup-dialog-menu');

  const serviceListData = getData(url);

  const fillData = () => {
    const date = document.querySelector('.popup-repair-types-content__head-date'),
      navigation = document.querySelector('.nav-list-popup-repair'),
      header = document.querySelector('.popup-repair-types-content__head-title'),
      table = document.querySelector('.popup-repair-types-content-table__list'),
      wrapper = document.querySelector('.popup-repair-types-content-table');

    serviceListData
      .then(data => {
        if (data) {
          date.textContent = data.find(item => item.hasOwnProperty('date')).date;

          const button = document.createElement('button'),
            tr = document.createElement('tr'),
            repairTypesName = document.createElement('td'),
            repairTypesValue1 = document.createElement('td'),
            repairTypesValue2 = document.createElement('td');

          tr.className = 'mobile-row';
          repairTypesName.className = 'repair-types-name';
          repairTypesValue1.className = 'repair-types-value';
          repairTypesValue2.className = 'repair-types-value';

          button.className = 'button_o popup-repair-types-nav__item';

          const priceItems = new Set();
          let buttonsSet = new Set();
          let priceList = new Set();

          for (let item of data) {
            if (!item.hasOwnProperty('date')) {
              button.textContent = item.title;
              buttonsSet.add(button.cloneNode(true));
              item.priceList.forEach(i => {
                tr.innerHTML = '';
                repairTypesName.textContent = i.typeService;
                tr.append(repairTypesName.cloneNode(true));
                tr.insertAdjacentHTML('beforeend', `
                <td class="mobile-col-title tablet-hide desktop-hide">Ед.измерения</td>
                <td class="mobile-col-title tablet-hide desktop-hide">Цена за ед.</td>
                `);
                repairTypesValue1.innerHTML = i['units'].replace(/\d+/g, match => `<sup>${match}</sup>`);
                repairTypesValue2.textContent = i.cost;
                tr.append(repairTypesValue1.cloneNode(true));
                tr.append(repairTypesValue2.cloneNode(true));
                priceItems.add(tr.cloneNode(true));
              });

              table.innerHTML = '';
              priceItems.forEach(item => table.append(item));
              priceList.add(table.cloneNode(true));
            }
          }

          if (buttonsSet.size) {
            navigation.innerHTML = '';
            buttonsSet.forEach(item => navigation.append(item));
          }

          wrapper.innerHTML = '';
          priceList.forEach(item => wrapper.append(item));

          const map = new Map();
          priceList = [...priceList];
          buttonsSet = [...buttonsSet];
          buttonsSet.forEach((item, i, arr) => {
            map.set(arr[i], priceList[i]);
          });

          const controlData = () => {
            const style = document.createElement('style');
            style.id = 'full-service-list';
            style.textContent = `
            .button_o-active{
              background: linear-gradient(
                90deg
                ,#f48922 0,#ffb015 100%);
                color: white;
            }`;
            document.head.append(style);
            buttonsSet[0].classList.add('button_o-active');

            const y = priceList.map(item => item.getBoundingClientRect().y - wrapper.getBoundingClientRect().y);

            let timeAnimation = 0;
            wrapper.addEventListener('scroll', (e) => {
              setTimeout(() => {
                const scrollDistance = wrapper.scrollTop;
                y.forEach((item, i) => {
                  if (scrollDistance > item - 1) {
                    for (let elem of buttonsSet) {
                      elem.classList.remove('button_o-active');
                    }
                    buttonsSet[i].classList.add('button_o-active');
                    header.textContent = buttonsSet[i].textContent;
                  }
                });
              }, timeAnimation)
            });

            navigation.addEventListener('click', (e) => {
              const target = e.target;
              if (target.matches('button.button_o')) {
                if (target.classList.contains('button_o-active')) {
                  return;
                } else {
                  buttonsSet.forEach(item => item.classList.remove('button_o-active'));
                  target.classList.add('button_o-active');
                  header.textContent = target.textContent;

                  const distance = priceList.reduce((acc, item, index, arr) => {
                    if (index < arr.indexOf(map.get(target))) {
                      return acc += item.clientHeight;
                    } else return acc + 0;
                  }, 0);

                  timeAnimation = 800;

                  wrapper.scrollTo({
                    top: distance,
                    behavior: 'smooth'
                  });
                }
              }
            });
          };

          controlData();
        }
      });
  }
  fillData();

  popup.style.cssText = 'transition: opacity .5s ease; opacity: 0;';

  triggers.forEach(item => {
    item.addEventListener('click', () => {
      menu.removeAttribute('style');
      fadePopup.fadeInPopup(popup);
    });
  });

  popup.addEventListener('click', (e) => {
    const target = e.target;
    if (target.closest('.close')) {
      fadePopup.fadeOutPopup(popup);
    }
  });

  const tab = new Tab({
    wrap: '.popup-repair-types .nav-list-popup-repair',
    nav: ['#nav-arrow-popup-repair_left', '#nav-arrow-popup-repair_right'],
    slidesToShow: 1,
    responsive: {
      1024: {
        slidesToShow: 1
      }
    }
  });
};

export default showFullServiceList;