import View from '../view';

class StartPageView extends View {
  constructor() {
    super();
    this.startWindow = this.createElement('div', 'speakIt__start-window');

    this.title = this.createElement('h1', 'speakIt__title');
    this.title.innerText = 'speakit';

    this.descriptionGame = this.createElement('p', 'speakIt__description');
    this.descriptionGame.innerText = 'Click on the words to hear them sound. Click on the button and speak the words into the microphone.';

    this.startBtn = this.createElement('button', 'btn-start');
    this.startBtn.innerText = 'Start game';
  }

  render() {
    document.body.append(this.appContainer);
    this.startWindow.append(this.title, this.descriptionGame, this.startBtn);
    this.appContainer.append(this.startWindow);
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
