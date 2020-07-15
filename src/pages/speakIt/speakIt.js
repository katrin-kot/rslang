import './speakIt.css';
import StartPageView from './views/startPage';
import ContentController from './controllers/content';
import CardsController from './controllers/content/cards';
import ControlsController from './controllers/content/controls';
import VoiceController from './controllers/content/voice';
import ImageController from './controllers/content/image';
import TranslationController from './controllers/content/translation';
import SpeechController from './controllers/content/speech';
import GameController from './controllers/game';
import ResultPageController from './controllers/resultsPage';
import StatsPageController from './controllers/statsPage';
import ModalPopupController from './controllers/modalPopup';
import NotificationsController from './controllers/notifications';

StartPageView.render();
ContentController.init();
ControlsController.init();
CardsController.init();

VoiceController.init();
ImageController.init();
TranslationController.init();
SpeechController.init();
GameController.init();
ResultPageController.init();
StatsPageController.init();
ModalPopupController.init();
NotificationsController.init();
