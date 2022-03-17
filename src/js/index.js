import showFullServiceList from './modules/showFullServiceList';
import repairSlider from './modules/sliders/repairSlider';
import faqAccordion from './modules/faq';
import workProcess from './modules/workProcess';
import designSection from './modules/designerSetion'

/* Sliders */
import partnersSlider from './modules/sliders/partnersSlider';
import tooltipsSlider from './modules/sliders/tooltipsSlider';
import problemsSlider from './modules/sliders/problemsSlider';
import reviewsSlider from './modules/sliders/reviewsSlider';
import portfolioSlider from './modules/sliders/portfolioSlider';
import portfolioSliderPopup from './modules/sliders/portfolioSliderPopup';

import menu from './modules/menu';
import popup from './modules/popups';
import form from './modules/form';
import hoverTooltip from './modules/hoverTooltips';

import addStyles from './modules/assets/addStyles';

const urlPost = './server.php';
const urlGet = './db/db.json';

addStyles();

popup.privacy();
popup.contract();
popup.consultation();
popup.popupDesign();

form.maskPhone();
form.ajaxSendForm(urlPost);

hoverTooltip.showFormulaTooltips();
hoverTooltip.showProblemsTooltips();
hoverTooltip.showNumberTooltip();

menu.toggleBurgerMenu();
menu.smoothMenuScroll();

showFullServiceList(urlGet);

faqAccordion();
workProcess();

/* Sliders */
repairSlider();
partnersSlider();
tooltipsSlider();
reviewsSlider();
portfolioSlider.portfolioSlider();
portfolioSlider.portfolioMobileSlider();
portfolioSliderPopup();
// problemsSlider();

designSection();
problemsSlider();