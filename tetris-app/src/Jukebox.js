import { AudioBackground, AudioClip } from './Audio';

class _Jukebox {
  constructor() {
    this.double = new AudioClip('double-biscuit.wav');
  }
}

const Jukebox = new _Jukebox();

export default Jukebox;
