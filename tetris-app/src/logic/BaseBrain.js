
class BaseBrain {
  constructor(eventListener, inputListener, touchListener, soundListener, name){
    this.id = `${new Date().getTime()}-${Math.floor(Math.random()*1000)}`;

    eventListener.register(this, e => this.onEvent(e));
    this.eventListener = eventListener;

    inputListener.register(this, (et, e) => this.onInput(et, e));

    touchListener.register(this, (et, e) => this.onInput(et, e));

    this.soundListener = soundListener;
    this.name = name;
  }

  onEvent(event){}

  onInput(eventType, event){}
}

export default BaseBrain;
