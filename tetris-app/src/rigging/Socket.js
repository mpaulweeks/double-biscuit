
class _SocketManager {
  constructor(){
    this._conn = null;
    this.eventListeners = [];
    this.new();
  }

  register(eventListener, callback){
    this.eventListeners.push({
      caller: eventListener,
      callback: callback,
    });
  }

  conn(){
    if (!this._conn){
      this.new();
    }
    return this._conn;
  }

  host(){
    if (document.location.host.indexOf('localhost') >= 0){
      return 'localhost:5080';
    }
    return 'double-biscuit-api.mpaulweeks.com';
  }

  new(){
    const self = this;
    self._conn = new WebSocket(`ws://${self.host()}/ws`);
    self.conn().onclose = function (evt) {
      self._conn = null;
      console.log('conn closed');
    };
    self.conn().onmessage = function (evt) {
      const messages = evt.data.split('\n');
      messages.forEach(function (message){
        self.eventListeners.forEach(el => {
          el.callback(message);
        });
      });
    };
  }

  send(data){
    const message = JSON.stringify(data);
    this.conn().send(message);
  }
}

const SocketManager = new _SocketManager();

export default SocketManager;
