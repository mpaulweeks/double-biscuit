
class Brain {
  constructor(eventListener, inputListener, soundListener){
    eventListener.register(this, e => this.onEvent(e));
    this.eventListener = eventListener;

    inputListener.register(this, (et, e) => this.onInput(et, e));
    this.inputListener = inputListener;

    this.soundListener = soundListener;
  }

  onEvent(event){}

  onInput(eventType, event){}
}
