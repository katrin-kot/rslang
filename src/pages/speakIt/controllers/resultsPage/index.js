import PubSub from '../pubSub';
import ResultPageView from '../../views/resultsPage';
import VoiceView from '../../views/content/voice';
import Words from '../../models/words';

class ResultPageController {
  init() {
    ResultPageView.render();
    PubSub.subscribe('showResults', this.showResults);
    PubSub.subscribe('playVoiceResultWord', this.playVoiceResultWord);
    PubSub.subscribe('redirectOnMain', this.redirectOnMain);
  }

  showResults() {
    ResultPageView.showResultPage(Words.getCurrentWords());
  }

  playVoiceResultWord(src) {
    VoiceView.changeSrc(src);
  }

  redirectOnMain() {
    window.location.pathname = '/index.html';
  }
}

export default new ResultPageController();
