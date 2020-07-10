import createNode from '../createNodeHelper';
import PubSub from '../../controllers/pubSub';
import { checkUserLogin } from '../../../../services/verifyUserService';

class StartPageView {
  constructor() {
    this.appContainer = createNode('div', 'app-speakIt');

    this.startWindow = createNode('div', 'speakIt__start-window');

    this.title = createNode('h1', 'speakIt__title');
    this.title.innerText = 'speakit';

    this.descriptionGame = createNode('p', 'speakIt__description');
    this.descriptionGame.innerText = 'Click on the words to hear them sound. Click on the button and speak the words into the microphone.';

    this.startBtn = createNode('button', 'speakIt__btn-start', 'btn');
    this.startBtn.innerText = 'Start game';
  }

  async render() {
    this.startWindow.append(this.title, this.descriptionGame, this.startBtn);
    this.appContainer.append(this.startWindow);
    document.body.append(this.appContainer);
    this.hideStartWindow();
    await checkUserLogin();
  }

  hideStartWindow() {
    this.startBtn.addEventListener('click', () => {
      this.startWindow.classList.add('hidden');
      PubSub.publish('loadContent');
    });
  }

  showStartWindow() {
    this.startWindow.classList.remove('hidden');
  }
}

export default new StartPageView();
