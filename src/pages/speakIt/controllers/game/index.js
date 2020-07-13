import PubSub from '../pubSub';
import CardsView from '../../views/content/cards';
import TranslationView from '../../views/content/translation';
import GameView from '../../views/game';
import ControlsView from '../../views/content/controls';
import WordsDifficultyView from '../../views/content/wordsDifficulty';
import StartPageView from '../../views/startPage';
import ImageView from '../../views/content/image';
import Words from '../../models/words';
import { getUserID } from '../../../../services/authService';
import { getStatistics, putStatistics, addEmptyStatistics } from '../../../../services/statsService';

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
    this.setGlobalStatsOnAction = this.setGlobalStatsOnAction.bind(this);
  }

  init() {
    PubSub.subscribe('startGame', this.startGame);
    PubSub.subscribe('compareWords', this.compareWords);
    PubSub.subscribe('restartGame', this.restartGame);
    PubSub.subscribe('newGame', this.newGame);
    PubSub.subscribe('resetProgress', this.resetProgress);
    PubSub.subscribe('setGlobalStatsOnAction', this.setGlobalStatsOnAction);
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
      this.setGlobalStats();
      this.hideCongratulations().then(() => {
        ControlsView.showResultPage();
      });
    }
  }

  increaseResult() {
    GameView.setResult(this.gameScore, Words.getCurrentWords().length);
  }

  restartGame() {
    this.setGlobalStatsOnAction();
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
    this.setGlobalStatsOnAction();
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

  async setGlobalStats() {
    const attempts = this.attemptsToPronounce;
    const currentDifficultyLevel = WordsDifficultyView.getCunrrentWordsDifficulty();
    const date = new Date();
    const day = `0${date.getDate()}`.slice(-2);
    const month = `0${date.getMonth() + 1}`.slice(-2);
    const hours = `0${date.getHours()}`.slice(-2);
    const minutes = `0${date.getMinutes()}`.slice(-2);
    const seconds = `0${date.getSeconds()}`.slice(-2);
    const dateTemplate = `${day}.${month}.${date.getFullYear()}T${hours}:${minutes}:${seconds}`;
    const score = `${this.gameScore}-${Words.getCurrentWords().length - this.gameScore}`;

    let stats;

    try {
      stats = await getStatistics({
        userId: getUserID(),
      });
    } catch (e) {
      await addEmptyStatistics({
        userId: getUserID(),
      });
    }
    delete stats.id;

    if (!stats.optional) {
      stats.optional = {};
    }

    if (!stats.optional.speakIt) {
      stats.optional = {
        speakIt: {},
      };
    }

    stats.optional.speakIt[`${dateTemplate}`] = {
      score: `${score}`,
      level: currentDifficultyLevel.difficultyLevel,
      raund: currentDifficultyLevel.raund,
      attempts,
    };

    try {
      await putStatistics({
        userId: getUserID(),
        payload: stats,
      });
      PubSub.publish('showNotification', {
        message: 'Статистика сохранена.',
        type: 'success',
      });
    } catch (e) {
      PubSub.publish('showNotification', {
        message: 'Что то пошло не так, статистика не сохранена.',
        type: 'error',
      });
    }
  }

  setGlobalStatsOnAction() {
    if (ControlsView.getStateGame() && this.gameScore !== Words.getCurrentWords().length) {
      this.setGlobalStats();
      this.getWrongWords();
    }
  }

  getWrongWords() {
    const wrongWords = Words.getCurrentWords().filter(
      (word, indx) => CardsView.getUnansweredWords().includes(indx),
      // eslint-disable-next-line no-underscore-dangle
    ).map((word) => word._id);
    Words.addWrongAnswersToAnki(wrongWords);
  }
}

export default new GameController();
