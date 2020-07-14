import ControlsView from './controls';
import WordsDifficultyView from './wordsDifficulty';
import PubSub from '../../controllers/pubSub';

class ContentView {
  constructor() {
    this.template = `
      <div class="speakIt__content__wrapper container">
        <div id="btn-home">
          <button class="btn-main-page">
            <span class="circle" aria-hidden="true">
              <span class="icon arrow"></span>
            </span>
            <a href="/index.html" class="button-text">На главную</a>
          </button>
        </div>
        <div class="speakIt__top-bar">
          <div class ="speakIt__difficulty-lvl__wrapper"></div>
          <div class="speakIt__progress-bar__wrapper">
            <div class="progress-bar__answers">
              <span class="progress-bar-title">Правильных ответов: </span>
              <div>
                <span class="progress-bar__right-answer">0</span>
                <span class="progress-bar-separator">/</span>
                <span class="progress-bar__qunatity-words"></span>
              </div>
            </div>
            <div class="progress-bar__wrapper">
              <div class="progress-bar"></div>
            </div>
          </div>
        </div>
        <div class="speakIt__middle-bar">
          <div class="column-left">
            <div class="word-info__wrapper">
              <img class="word-image" src="./assets/images/speakit-words-img-stub.jpg" alt="rs lang-speakit by team 57">
              <p class="word-translation"></p>
              <input type="text" class="spoken-word none" readonly>
              <div class="sound-example hidden">
                <span class="sound-example-title">Прослушать пример:</span>
                <button class="play-btn">
                  <div class="play-button-icon"></div>
                </button>
              </div>
            </div>
            <div class="controls__wrapper"></div>
          </div>
          <div class="column-right">
            <div class="column-right-words"></div>
            <div class="loader"></div>
          <div/>
        </div>
        <audio class="voice-card"></audio>
      </div>
      <div class="user-congratulation__wrapper hidden">
        <div class="user-congratulation">
          <img class="user-congratulation-img">
        </div>
      </div>
    `;
  }

  render() {
    const appContainer = document.querySelector('.app-speakIt');
    appContainer.insertAdjacentHTML('afterbegin', this.template);
    ControlsView.render();
    WordsDifficultyView.render();
    PubSub.publish('renderCards');
    this.playExampleClickHandler();
  }

  playExampleClickHandler() {
    document.querySelector('.sound-example').addEventListener('click', (e) => {
      if (e.target.closest('.play-btn')) {
        const index = e.target.closest('.play-btn').dataset.wordIndex;
        PubSub.publish('playVoiceWord', { cardIndex: index, type: 'example' });
      }
    });
  }
}

export default new ContentView();
