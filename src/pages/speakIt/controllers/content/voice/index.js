import PubSub from '../../pubSub';
import Words from '../../../models/words';
import VoiceView from '../../../views/content/voice';

class VoiceController {
  init() {
    PubSub.subscribe('playVoiceWord', this.playVoiceWord);
  }

  playVoiceWord(wordInfo) {
    const currentWord = Words.getCurrentWords()[wordInfo.cardIndex];
    if (wordInfo.type === 'word') {
      VoiceView.changeSrc(currentWord.audio);
    }
    if (wordInfo.type === 'example') {
      const { speechSynthesis } = window;
      const msg = new SpeechSynthesisUtterance();
      msg.volume = 1;
      msg.rate = 1;
      msg.text = currentWord.textExample;
      msg.voiceURI = 'Samantha';
      msg.lang = 'en-US';
      if (speechSynthesis.speaking) {
        speechSynthesis.cancel();
        setTimeout(() => {
          speechSynthesis.speak(msg);
        }, 250);
      } else {
        speechSynthesis.speak(msg);
      }
    }
  }
}

export default new VoiceController();
