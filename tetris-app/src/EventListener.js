
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
        console.log('broadcast', event);
        sub.callback(event);
      } else {
        console.log('caller is registered');
      }
    });
  }
}

const EventListener = new _EventListener();

export default EventListener;
