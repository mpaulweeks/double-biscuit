import Logger from '../Logging';

class _SocketManager {
  constructor(){
    this.conn = null;
    this.eventListeners = [];
    this.new();
    this.failedMessages = [];
    this.retryFunc = setInterval(() => this.retryFailed(), 1000);
  }

  register(eventListener, callback){
    this.eventListeners.push({
      caller: eventListener,
      callback: callback,
    });
  }

  host(){
    if (document.location.host.indexOf('localhost') >= 0){
      return 'localhost:5080';
    }
    return 'double-biscuit-api.mpaulweeks.com';
  }

  new(){
    const self = this;
    try {
      const newConn = new WebSocket(`ws://${self.host()}/ws`);
      newConn.onclose = function (evt) {
        Logger.info('[Socket] conn closed');
        Logger.info(evt);
        self.new();
      };
      newConn.onmessage = function (evt) {
        const messages = evt.data.split('\n');
        messages.forEach(function (message){
          self.eventListeners.forEach(el => {
            el.callback(message);
          });
        });
      };
      self.conn = newConn;
    } catch (err) {
      Logger.info(err);
    }
  }

  send(data){
    const message = JSON.stringify(data);
    this.trySend(message);
  }

  trySend(message){
    if (this.conn && this.conn.readyState === 1){
      try {
        this.conn.send(message);
      } catch (err) {
        Logger.info('[Socket] trySend failed');
        Logger.info(err);
        this.failedMessages.push(message);
      }
    } else {
      Logger.info('[Socket] trySend delayed, conn not ready');
      this.failedMessages.push(message);
    }
  }

  retryFailed(){
    const oldFailed = this.failedMessages.slice();
    this.failedMessages = [];
    oldFailed.forEach(msg => this.trySend(msg));
  }
}

const SocketManager = new _SocketManager();

export default SocketManager;
