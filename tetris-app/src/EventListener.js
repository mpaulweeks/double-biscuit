
class _EventListener {
  constructor(){
    this.callbacks = [];
  }
  register(callback){
    this.callbacks.push(callback);
  }
  delegate(event){
    this.callbacks.forEach(sub => {
      sub(event);
    });
  }
}

const EventListener = new _EventListener();

export default EventListener;
