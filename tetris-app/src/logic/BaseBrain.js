
class BaseBrain {
  constructor(eventListener, inputListener, touchListener, soundListener, name){
    this.id = `${new Date().getTime()}-${Math.floor(Math.random()*1000)}`;

    inputListener.register(this, (et, e) => this.onInput(et, e));
    touchListener.register(this, (et, e) => this.onInput(et, e));

    this.eventListener = eventListener;
    this.soundListener = soundListener;
    this.name = name;
  }

  isGameOver(){
    return this.won || this.dead;
  }

  onInput(eventType, event){}
}

export default BaseBrain;
