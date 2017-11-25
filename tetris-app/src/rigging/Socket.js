
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
    const host = 'double-biscuit-api.mpaulweeks.com';
    if (host.indexOf('localhost') >= 0){
      return 'localhost:5080';
    }
    return host;
  }

  new(){
    const self = this;
    self._conn = new WebSocket(`ws://${self.host()}/ws`);
    self.conn().onclose = function (evt) {
      self._conn = null;
      console.log('conn closed');
    };
    self.conn().onmessage = function (evt) {
      const message = evt.data;
      self.eventListeners.forEach(el => {
        el.callback(message);
      });
    };
  }

  send(data){
    console.log('sending ws', data);
    const message = JSON.stringify(data);
    this.conn().send(message);
  }
}

const SocketManager = new _SocketManager();

export default SocketManager;
