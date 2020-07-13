import PubSub from '../pubSub';
import ResultPageView from '../../views/resultsPage';
import VoiceView from '../../views/content/voice';
import Words from '../../models/words';

class ResultPageController {
  init() {
    ResultPageView.render();
    PubSub.subscribe('showResults', this.showResults);
    PubSub.subscribe('playVoiceResultWord', this.playVoiceResultWord);
  }

  showResults() {
    ResultPageView.showResultPage(Words.getCurrentWords());
  }

  playVoiceResultWord(src) {
    VoiceView.changeSrc(src);
  }
}

export default new ResultPageController();
