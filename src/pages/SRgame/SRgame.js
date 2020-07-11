import './SRgame.css';
import '../../../node_modules/swiper/css/swiper.min.css';
import '../../../node_modules/swiper/js/swiper.min';
// eslint-disable-next-line no-unused-vars
import CardGame from './CardGame';

const game = new CardGame();
game.renderGameNewCards();
