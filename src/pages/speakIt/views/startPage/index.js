import createNode from '../createNodeHelper';

class StartPageView {
  constructor() {
    this.appContainer = createNode('div', 'app-speakIt');

    this.startWindow = createNode('div', 'speakIt__start-window');

    this.title = createNode('h1', 'speakIt__title');
    this.title.innerText = 'speakit';

    this.descriptionGame = createNode('p', 'speakIt__description');
    this.descriptionGame.innerText = 'Click on the words to hear them sound. Click on the button and speak the words into the microphone.';

    this.startBtn = createNode('button', 'speakIt__btn-start');
    this.startBtn.innerText = 'Start game';
  }

  render() {
    this.startWindow.append(this.title, this.descriptionGame, this.startBtn);
    this.appContainer.append(this.startWindow);
    document.body.append(this.appContainer);
    this.hideStartWindow();
  }

  hideStartWindow() {
    this.startBtn.addEventListener('click', () => {
      this.startWindow.classList.add('hidden');
      // TODO: добавить сюда паблишера для рендера основной логики игры
    });
  }
}

export default new StartPageView();
