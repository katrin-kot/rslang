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
    this.descriptionGame.innerText = `
      Нажимайте на карточки со словами, чтобы услышать их произношение.
      Если изученных слов не хватает, по умолчанию уровень сложности - базовый, 
      раунд - 0. Нажимите на кнопку "Speak Please" и после произносите слова 
      в микрофон. Статистика записывается по окончании игры, также если игра 
      была начата, то по нажатию на кнопку "New game" или по нажатию на кнопку "Restart".
      Удачи !
    `;

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
