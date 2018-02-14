import SocketManager from './Socket';

class EventListener {
  constructor(receiveEventCallback){
    this.receiveEventCallback = receiveEventCallback;
    SocketManager.register(this, m => this.receiveSocket(m));
  }
  sendEvent(event){
    SocketManager.sendUpdate({
      event: event,
    })
  }
  receiveSocket(data){
    this.receiveEventCallback(data.event);
  }
}

export default EventListener;
