import { AudioBackground, AudioClip } from './Audio';
import { BGM, SFX } from './Constants';

class _Jukebox {
  constructor() {
    this._bgm = {};
    for (var bgmKey in BGM){
      const url = BGM[bgmKey];
      this._bgm[url] = new AudioBackground(url);
    }

    this._sfx = {};
    for (var sfxKey in SFX){
      const url = SFX[sfxKey];
      this._sfx[url] = new AudioClip(url);
    }
  }

  playBGM(bgmCode){
    console.log(bgmCode);
    const audio = this._bgm[bgmCode];
    if (audio){
      audio.play();
    }
  }

  playSFX(sfxCode){
    const audio = this._sfx[sfxCode];
    if (audio){
      audio.play();
    }
  }
}

const Jukebox = new _Jukebox();

export default Jukebox;
