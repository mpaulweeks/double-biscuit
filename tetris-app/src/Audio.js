
class AudioSong(){
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

class AudioClip(){
  constructor(src, bandwidth){
    this.clips = [];
    for (var i = 0; i < bandwidth; i++){
      this.clips.push(new AudioSong(src));
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
  AudioSong,
  AudioClip,
}
