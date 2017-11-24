
class BaseBrain {
  constructor(eventListener, inputListener, touchListener, soundListener){
    this.id = `${new Date().getTime()}-${Math.floor(Math.random()*1000)}`;

    eventListener.register(this, e => this.onEvent(e));
    this.eventListener = eventListener;

    inputListener.register(this, (et, e) => this.onInput(et, e));

    touchListener.register(this, (et, e) => this.onInput(et, e));

    this.soundListener = soundListener;
  }

  onEvent(event){}

  onInput(eventType, event){}
}

export default BaseBrain;
