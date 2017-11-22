import { BGM, SFX } from '../Constants';

import { AudioBackground, AudioClip } from './Audio';

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
    this.sfxIsMuted = false;
  }

  playBGM(bgmCode){
    const audio = this._bgm[bgmCode];
    if (audio){
      audio.play();
    }
  }
  setMuteBGM(isMuted){
    for (let key in this._bgm){
      this._bgm[key].setMute(isMuted);
    }
  }

  playSFX(sfxCode){
    const audio = this._sfx[sfxCode];
    if (audio && !this.sfxIsMuted){
      audio.play();
    }
  }
  setMuteSFX(isMuted){
    this.sfxIsMuted = isMuted;
  }
}

const Jukebox = new _Jukebox();

export default Jukebox;
