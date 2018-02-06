import Logger from '../Logging';


class _SocketManager {
  constructor(){
    this.eventListeners = [];

    const host = (
      document.location.host.indexOf('localhost') >= 0 ?
      'localhost:5110' :
      'socket-lobby.mpaulweeks.com'
    );
    this.SL = new window.SocketLobby(host, 'tetris');
    this.SL.connect(
      'main',
      () => {},
      updates => this.onUpdates(updates),
    )
  }

  register(eventListener, callback){
    this.eventListeners.push({
      caller: eventListener,
      callback: callback,
    });
  }

  onUpdates(updates){
    const self = this;
    updates.forEach(function (data){
      const message = JSON.parse(data.message);
      self.eventListeners.forEach(el => {
        el.callback(message);
      });
    });
  }
  send(data){
    const message = JSON.stringify(data);
    this.SL.sendUpdate(message);
  }
}

const SocketManager = new _SocketManager();

export default SocketManager;
