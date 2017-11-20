import { AudioBackground, AudioClip } from './Audio';

class _Jukebox {
  constructor() {
    this.bgm = {
      typeA: new AudioBackground('type_a.mp3'),
    }
    this.sfx = {
      pieceSet: new AudioClip('tenderness.wav'),
      clear1: new AudioClip('double_mischief.wav'),
    }
  }

  playBGM(soundCode){
    const audio = this.bgm[soundCode];
    if (audio){
      audio.play();
    }
  }

  playSFX(soundCode){
    const audio = this.sfx[soundCode];
    if (audio){
      audio.play();
    }
  }
}

const Jukebox = new _Jukebox();

export default Jukebox;
