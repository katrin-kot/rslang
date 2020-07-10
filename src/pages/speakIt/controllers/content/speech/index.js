import PubSub from '../../pubSub';

let SpeechRecognition;
let recognition;

class SpeechController {
  init() {
    PubSub.subscribe('startSpeak', this.startSpeak);
    PubSub.subscribe('stopSpeak', this.stopSpeak);
  }

  startSpeak() {
    try {
      if (!recognition) {
        SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        recognition = new SpeechRecognition();
        recognition.lang = 'en-US';
        recognition.maxAlternatives = 5;
        recognition.addEventListener('result', (e) => {
          const options = [...e.results[0]].map((option) => option.transcript.toLowerCase());
          PubSub.publish('compareWords', options);
        });
        recognition.onerror = (e) => {
          if (e.error === 'not-allowed') {
            PubSub.publish('showNotification', {
              message: 'Пожалуйста, включите микрофон ! После этого нажмите Stop Speak и Start Speak',
              type: 'info',
            });
            recognition.removeEventListener('end', recognition.start);
          }
        };
      }
      recognition.start();
      recognition.addEventListener('end', recognition.start);
    } catch (error) {
      PubSub.publish('showNotification', {
        message: 'Что то случилось с микрофоном, перезагрузите страницу.',
        type: 'error',
      });
    }
  }

  stopSpeak() {
    recognition.stop();
    recognition.removeEventListener('end', recognition.start);
  }
}

export default new SpeechController();
