import PubSub from '../pubSub';
import CardsView from '../../views/content/cards';
import TranslationView from '../../views/content/translation';
import GameView from '../../views/game';
import ControlsView from '../../views/content/controls';
import StartPageView from '../../views/startPage';
import ImageView from '../../views/content/image';
import Words from '../../models/words';

class GameController {
  constructor() {
    this.attemptsToPronounce = 0;
    this.gameScore = 0;
    this.isEndOfTheGame = false;
    this.compareWords = this.compareWords.bind(this);
    this.restartGame = this.restartGame.bind(this);
    this.startGame = this.startGame.bind(this);
    this.newGame = this.newGame.bind(this);
    this.resetProgress = this.resetProgress.bind(this);
  }

  init() {
    PubSub.subscribe('startGame', this.startGame);
    PubSub.subscribe('compareWords', this.compareWords);
    PubSub.subscribe('restartGame', this.restartGame);
    PubSub.subscribe('newGame', this.newGame);
    PubSub.subscribe('resetProgress', this.resetProgress);
  }

  startGame() {
    this.resetStats();
    ImageView.setDefaultImage();
    GameView.hideSoundExample();
    GameView.clearTranslationArea();
    CardsView.removeActiveCardClass();
    CardsView.cardsEventPointer();
  }

  compareWords(optionsSpokenWord) {
    let wordIndex;
    this.attemptsToPronounce += 1;

    const wordInfo = Words.getCurrentWords().filter((item, indx) => {
      const word = item.word.toLowerCase();
      const condition = optionsSpokenWord.indexOf(word) >= 0;
      if (condition) {
        wordIndex = indx;
      }
      return condition;
    });

    if (wordInfo.length) {
      const currentWord = wordInfo[0].word;
      GameView.addWordInInput(currentWord);
      if (GameView.checkWord(currentWord)) {
        PubSub.publish('changeImage', wordIndex);
        CardsView.addActiveCardClass(GameView.checkWord(currentWord.toLowerCase()));
        GameView.setRightAnswer(currentWord.toLowerCase());
        this.gameScore += 1;
        this.increaseResult();
      }
    } else {
      GameView.addWordInInput(optionsSpokenWord[0]);
    }

    if ((this.gameScore === Words.getCurrentWords().length) && !this.isEndOfTheGame) {
      this.isEndOfTheGame = true;
      GameView.showHideCongratulations();

      this.hideCongratulations().then(() => {
        ControlsView.showResultPage();
      });
    }
  }

  increaseResult() {
    GameView.setResult(this.gameScore, Words.getCurrentWords().length);
  }

  restartGame() {
    // TODO: Добавить сюда отправление результата
    this.resetStats();
    this.increaseResult();
    ImageView.setDefaultImage();
    CardsView.removeActiveCardClass();
    GameView.resetCardsDataAnswer();
    GameView.clearWordInInput();
    GameView.hideSoundExample();
    TranslationView.clearWordTranslation();
  }

  newGame() {
    this.resetStats();
    GameView.removeContentWrapper();
    StartPageView.showStartWindow();
    Words.removeCurrentWords();
    ControlsView.clearControlsFlags();
    CardsView.setDefaultStateToListener();
  }

  getQuantityAttemptsPronounce() {
    return this.attemptsToPronounce;
  }

  resetStats() {
    this.attemptsToPronounce = 0;
    this.gameScore = 0;
    this.isEndOfTheGame = false;
  }

  hideCongratulations() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(GameView.showHideCongratulations());
      }, 1000);
    });
  }

  resetProgress() {
    GameView.resetProgress();
    ImageView.setDefaultImage();
    this.resetStats();
  }
}

export default new GameController();
