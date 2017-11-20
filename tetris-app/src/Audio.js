
class AudioFile {
  constructor(src){
    this.ready = false;
    this.audio = new Audio();
    this.audio.src = '/' + src;

    const self = this;
    this.audio.addEventListener('canplaythrough', function(){
      self.ready = true;
    });
    this.audio.addEventListener('ended', function(){
      self.audio.currentTime = 0;
      self.ready = true;
    });
  }

  play(){
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
