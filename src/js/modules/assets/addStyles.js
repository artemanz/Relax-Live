const addStyles = () => {
  const style = document.createElement('style');
  style.id = 'relax-live-style';
  style.textContent = `
  @media (max-width: 1134px){
    .scheme .nav-list{
      min-width: auto;
      display: flex;
      transition: transform .5s ease;
    }

    .scheme .scheme-nav__item{
      padding: 0 22px;
      display: flex;
      flex: 0 0 33%;
      align-items: center;
      justify-content: center;
      font-size: 13px;
  }
  .scheme .button_o svg {
      left: 50%;
      transform: translateX(-50%);
  }
}

  @media (max-width: 576px) {
  .scheme .scheme-nav__item{
    padding: 0;
    display: block;
    flex: 0 0 100%;
  }
  }

  .popup-transparency-slider{
    display: flex;
    transition: transform .5s ease;
  }

  .popup-transparency-slider__slide{
    flex: 0 0 100%;
  }

  .popup-dialog-transparency{
    transition: opacity .5s ease;
  }

  @media (max-width: 1090px) {
    .transparency-slider-wrap{
      overflow: hidden;
    }

    .transparency-slider.row{
      display: flex;
      flex-wrap: inherit;
      transition: transform .5s ease;
    }

    .transparency-item{
      flex: 0 0 100%;
    }
  }

  @media (max-width:1134px){
    .popup-design .nav-list{
      min-width: auto;
      display: flex;
      transition: transform .2s ease;
    }

    .popup-design .designs-nav__item{
      display: flex;
      flex: 0 0 33%;
      align-items: center;
      justify-content: center;
      font-size: 12.5px;
  }
  .popup-design .button_o svg {
    left: 50%;
    transform: translateX(-50%);
}
  }

  @media (max-width: 576px) {
    .popup-design .designs-nav__item{
      padding: 0;
      display: block;
      flex: 0 0 100%;
    }
    }

    .preview-block__item{
      overflow: hidden;
    }
    
    .preview-block__item img{
      width: 150%;
    }

  @media (max-width: 1134px){
    .designs .nav-list{
      min-width: auto;
      display: flex;
      transition: transform .2s ease;
    }

    .designs .designs-nav__item{
      display: flex;
      flex: 0 0 33%;
      align-items: center;
      justify-content: center;
      font-size: 12.5px;
  }
  .designs .button_o svg {
      left: 50%;
      transform: translateX(-50%);
  }
}

  @media (max-width: 576px) {
  .designs .designs-nav__item{
    padding: 0;
    display: block;
    flex: 0 0 100%;
  }
  }

  .formula-slider-wrap{
    margin-top: 102px;
    overflow: hidden;
  }

.problems-slider-wrap{
overflow: hidden;
}

  .formula-slider {
    min-height: 440px;
    margin-top: 0;
    display: flex;
    align-items: baseline;
    transition: transform .5s ease;
  }

  .formula-slider__slide{
    padding-top: 30px;
    flex: 0 0 33%;
  }

  .problems-slider{
    display: flex;
    transition: transform .5s ease;
  }

  .problems-slider__slide{
    flex: 0 0 100%;
  }

  @media (max-width: 785px){
    .formula-slider__slide{
      flex: 0 0 100%;
    }
  }

  .reviews-slider-wrap{
    max-width: 630px;
    overflow: hidden;
  }

  .reviews-slider{
    overflow: visible;
    display: flex;
    transition: transform .5s ease;
  }

  .reviews-slider__slide{
    flex: 0 0 100%;
  }

  #reviews-arrow_left{
    left: 0;
  }

  #reviews-arrow_right{
    right: 0;
  }

  .types-repair-wrapper{
    transition: transform 0.5s ease;
  }

  .types-repair{
    display: flex;
    transition: transform .2s ease;
    will-change: transform;
  }

  .repair-types-slider__slide{
    flex: 0 0 100%;
  }

  @media (max-width: 768px){
    .nav-list-repair{
      min-width: auto;
      flex-wrap: unset;
    }

    .repair-types-nav__item {
      display: flex;
      flex: 0 0 100%;
      align-items: center;
      justify-content: center;
  }
  .button_o svg{
    left: 50%;
    transform: translateX(-50%);
  }
}

#portfolio-arrow_left{
  display: flex;
}

#portfolio-arrow-mobile_left, #portfolio-arrow-mobile_right {
  z-index: 100;
}

.slider-track {
  display: flex;
  overflow: visible;
  transition: transform .5s ease;
}

.popup-portfolio-slider-wrap{
  overflow: hidden;
}

.popup-portfolio-slider{
  display: flex;
  transition: transform .5s ease;
}

.popup-portfolio-slider__slide{
  flex: 0 0 100%;
}

.popup-portfolio{
  transition: opacity .5s ease; opacity: 0;
}

.problems-item-popup-1{
  top: auto;
}

.problems-item-popup-1::before{
  transform: none;
}

@media (min-width: 1025px){
.problems-item-popup-1 {
    top: auto;
  }
}

@media (max-width: 1024px){
  .nav-list-popup-repair{
    display: flex; 
    transition: transform .2s ease; 
    flex-wrap: nowrap; 
    min-width: auto;
  }
 
  .problems-item-popup-1 {
    top: 250px;
}

.problems-item-popup-1::before {
  transform: rotate(180deg);
}

  .popup-repair-types-nav__item{
    flex: 0 0 100%;
  }
}

.problems-slider__slide{
  max-width: none !important;
}

.partners .wrapper{
  overflow: hidden;
}

.partners-slider{
  transition: transform .5s ease;
  display: flex;
}

.partners-slider__slide{
  flex: 0 0 33%;
}

@media (max-width: 1024px){
  .partners-slider__slide {
    max-width: none;
  }

  .nav-list-repair{
    min-width: auto;
    flex-wrap: nowrap;
  }
  
  .nav-list-repair .button_o{
    display: flex;
      flex: 0 0 33%;
      align-items: center;
      justify-content: center;
      font-size: 12.5px;
  }

  .nav-list-repair .button_o svg {
    left: 50%;
    transform: translateX(-50%);
  }
}

@media (max-width: 768px){
  .nav-list-repair .button_o{
    flex: 0 0 100%;
}

  .designs .designs-nav__item,
  .scheme .scheme-nav__item {
  flex: 0 0 100%;
}
}

@media (max-width: 575px){
  .problems-item-popup-1{
    top: 190px;
  }
  .problems-item-popup-1::before {
    transform: none;
  }

  .partners-slider__slide{
    flex: 0 0 100%;
  }
}
  `;
  document.head.append(style);
};

export default addStyles;