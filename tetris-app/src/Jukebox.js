import { AudioBackground, AudioClip } from './Audio';

class _Jukebox {
  constructor() {
    this.soundBank = {
      pieceSet: new AudioClip('tenderness.wav'),
      clear1: new AudioClip('double_mischief.wav'),
    }
  }

  play(soundCode){
    const audio = this.soundBank[soundCode];
    if (audio){
      audio.play();
    }
  }
}

const Jukebox = new _Jukebox();

export default Jukebox;
