
class AudioFile {
  constructor(src){
    this.ready = false;
    this.started = false;
    this.audio = new Audio();
    this.audio.src = src;

    const self = this;
    this.audio.addEventListener('canplaythrough', () => self.onLoad());
    this.audio.addEventListener('ended', () => self.onEnd());
  }

  onLoad(){
    this.ready = true;
  }

  onEnd(){
    this.audio.currentTime = 0;
    this.ready = true;
  }

  play(){
    this.started = true;
    if (this.ready){
      this.audio.play();
      this.ready = false;
    }
  }

  isReady(){
    return this.ready;
  }
}

class AudioBackground extends AudioFile {
  constructor(src) {
    super(src)
    this.audio.loop = true;
    this.audio.volume = 0.7;
  }

  onLoad(){
    this.ready = true;
    // check if they called play before it was ready
    if (this.started){
      this.play();
    }
  }

  onEnd(){
    // do nothing, loop takes care of it
  }
}

class AudioClip {
  constructor(src, bandwidth=5){
    this.clips = [];
    for (var i = 0; i < bandwidth; i++){
      this.clips.push(new AudioFile(src));
    }
  }

  play(){
    for (let c of this.clips){
      if (c.isReady()){
        return c.play();
      }
    }
  }
}

export {
  AudioBackground,
  AudioClip,
}
