
class _EventListener {
  constructor(){
    this.subscribers = [];
  }
  register(caller, callback){
    this.subscribers.push({
      caller: caller,
      callback: callback,
    });
  }
  delegate(event){
    this.subscribers.forEach(sub => {
      sub.callback(event);
    });
  }
  broadcast(caller, event){
    this.subscribers.forEach(sub => {
      if (sub.caller !== caller){
        sub.callback(event);
      } else {
        // registered caller
      }
    });
  }
}

const EventListener = new _EventListener();

export default EventListener;
