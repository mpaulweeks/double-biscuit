
class EventListener {
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
  broadcast(callerId, event){
    this.subscribers.forEach(sub => {
      if (event.pattern === 'broadcast' && sub.caller.id !== callerId){
        sub.callback(event);
      }
    });
  }
  sendUpstream(callerId, event){
    // todo websockets
    this.broadcast(callerId, event);
  }
}

export default EventListener;
