import './SRgame.css';
import '../../../node_modules/swiper/css/swiper.min.css';
import '../../../node_modules/swiper/js/swiper.min';

import StartScreen from './StartScreen';
import { renderSpinner, hideSpinner } from './spinner';

const initScreen = async () => {
  renderSpinner();
  await StartScreen.createScreen();
  hideSpinner();
};

initScreen();
