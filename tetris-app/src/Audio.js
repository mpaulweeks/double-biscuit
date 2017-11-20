
class AudioFile {
  constructor(src){
    this.loaded = false;
    this.audio = new Audio();
    this.audio.src = src;

    const self = this;
    this.audio.addEventListener('canplaythrough', function(){
       self.loaded = true;
    });
  }

  play(){
    this.audio.play();
  }

  ready(){
    return loaded;
  }
}

class AudioBackground extends AudioFile {
  constructor(src) {
    super(src)
    // todo loop
  }
}

class AudioClip {
  constructor(src, bandwidth=1){
    this.clips = [];
    for (var i = 0; i < bandwidth; i++){
      this.clips.push(new AudioFile(src));
    }
  }

  play(){
    for (let c of this.clips){
      if (c.ready()){
        return c.play();
      }
    }
  }
}

export {
  AudioBackground,
  AudioClip,
}
