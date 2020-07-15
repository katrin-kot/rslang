import createNode from '../../createNodeHelper';
import PubSub from '../../../controllers/pubSub';

class ControlsView {
  constructor() {
    this.isStopSpeak = false;
    this.isGameStarted = false;
  }

  render() {
    this.startSpeakBtn = createNode('button', 'btn-start-speak', 'btn', 'event-pointer-none');
    this.startSpeakBtn.innerText = 'Speak please';

    this.stopSpeakBtn = createNode('button', 'btn-stop-speak', 'btn', 'micro-off', 'none');
    this.stopSpeakBtn.innerText = 'Stop speak';

    this.restartBtn = createNode('button', 'btn-restart', 'btn');
    this.restartBtn.innerText = 'Restart';

    this.resultsBtn = createNode('button', 'btn-results', 'btn');
    this.resultsBtn.innerText = 'Results';

    const controlsContainer = document.querySelector('.controls__wrapper');
    controlsContainer.append(this.startSpeakBtn, this.stopSpeakBtn, this.restartBtn);
    controlsContainer.append(this.resultsBtn);
    this.btnsClickHandler(controlsContainer);
  }

  btnsClickHandler(controlsContainer) {
    controlsContainer.addEventListener('click', (e) => {
      if (e.target.classList.contains('btn-start-speak')) {
        PubSub.publish('startSpeak');
        e.target.classList.add('event-pointer-none', 'btn-attention');
        this.stopSpeakBtn.classList.remove('none');
        PubSub.publish('startGame');
        this.isGameStarted = true;
        PubSub.publish('loadUserCongrats');
        document.querySelector('.spoken-word').classList.remove('none');
        document.querySelector('.word-translation').classList.add('none');
      }

      if (e.target.classList.contains('btn-restart')) {
        PubSub.publish('restartGame');
      }

      if (e.target.classList.contains('btn-results')) {
        this.showResultPage();
      }

      if (e.target.classList.contains('btn-stop-speak')) {
        this.isStopSpeak = !this.isStopSpeak;
        if (this.isStopSpeak) {
          PubSub.publish('stopSpeak');
          e.target.innerText = 'Start speak';
        } else {
          PubSub.publish('startSpeak');
          e.target.innerText = 'Stop speak';
        }
        e.target.classList.toggle('micro-on');
      }
    });
  }

  clearControlsFlags() {
    this.isStopSpeak = false;
    this.isGameStarted = false;
  }

  activateBtnStart() {
    this.startSpeakBtn.classList.remove('event-pointer-none', 'btn-attention');
  }

  disableBtnStart() {
    this.startSpeakBtn.classList.add('event-pointer-none');
  }

  showResultPage() {
    PubSub.publish('showResults');
    if (this.isGameStarted && !this.isStopSpeak) {
      this.isStopSpeak = !this.isStopSpeak;
      PubSub.publish('stopSpeak');
      const btnStopSpeak = document.querySelector('.btn-stop-speak');
      btnStopSpeak.innerText = 'Start speak';
      btnStopSpeak.classList.toggle('micro-on');
    }
  }

  setDefaultStateBtns() {
    this.startSpeakBtn.classList.remove('btn-attention');
    this.startSpeakBtn.classList.add('event-pointer-none');
    if (this.isGameStarted) {
      PubSub.publish('stopSpeak');
    }
    this.clearControlsFlags();
    this.stopSpeakBtn.classList.add('none');
    this.stopSpeakBtn.innerText = 'Stop speak';
    this.stopSpeakBtn.classList.remove('micro-on');
  }

  getStateGame() {
    return this.isGameStarted;
  }
}

export default new ControlsView();
