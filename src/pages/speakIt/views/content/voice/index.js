const AUDIO_SRC = 'https://raw.githubusercontent.com/bobrui4anin/rslang-data/master/';

class VoiceView {
  changeSrc(src) {
    const audioBlock = document.querySelector('.voice-card');
    audioBlock.setAttribute('src', `${AUDIO_SRC}${src}`);
    audioBlock.load();
    audioBlock.play();
  }
}

export default new VoiceView();
