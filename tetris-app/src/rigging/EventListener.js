import SocketManager from './Socket';

class EventListener {
  constructor(checkForNewUsers){
    this.checkForNewUsers = checkForNewUsers;
    this.subscribers = [];
    SocketManager.register(this, m => this.receiveSocket(m));
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
  broadcast(event){
    this.subscribers.forEach(sub => {
      if (event.pattern === 'broadcast'){
        sub.callback(event);
      }
    });
  }
  sendUpstream(event){
    SocketManager.send({
      event: event,
    })
  }
  receiveSocket(data){
    this.checkForNewUsers(data);
    this.broadcast(data.event);
  }
}

export default EventListener;
