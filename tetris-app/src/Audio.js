
class AudioClip(src){
  constructor(){
    this.ready = false;
    this.audio = new Audio();
    this.audio.src = src;

    const self = this;
    this.audio.addEventListener('canplaythrough', function(){
       self.ready = true;
    });
  }

  play(){
    this.audio.play();
  }
}

export {
  AudioClip,
}
