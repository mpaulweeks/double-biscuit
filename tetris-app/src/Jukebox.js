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
    const audio = this._bgm[bgmCode];
    if (audio){
      audio.play();
    }
  }
  muteBGM(){
    for (let key in this._bgm){
      this._bgm[key].setMute(true);
    }
  }
  unmuteBGM(){
    for (let key in this._bgm){
      this._bgm[key].setMute(false);
    }
  }

  playSFX(sfxCode){
    const audio = this._sfx[sfxCode];
    if (audio){
      audio.play();
    }
  }
  muteSFX(){
    for (let key in this.sfx){
      this.sfx[key].setMute(true);
    }
  }
  unmuteSFX(){
    for (let key in this.sfx){
      this.sfx[key].setMute(false);
    }
  }
}

const Jukebox = new _Jukebox();

export default Jukebox;
