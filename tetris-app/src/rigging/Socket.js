
class _SocketManager {
  constructor(){
    this.eventListeners = [];
    this.SL = new window.SocketLobby('tetris');
  }
  connect(lobbyName){
    this.SL.connect({
      lobby: lobbyName,
      onLobbyRefresh: () => {},
      onUpdate: update => this.onUpdate(update),
    });
  }
  disconnect(){
    this.SL.disconnect();
  }

  register(eventListener, callback){
    this.eventListeners.push({
      caller: eventListener,
      callback: callback,
    });
  }

  onUpdate(update){
    const message = JSON.parse(update);
    this.eventListeners.forEach(el => {
      el.callback(message);
    });
  }
  send(data){
    const message = JSON.stringify(data);
    this.SL.sendUpdate(message);
  }
}

const SocketManager = new _SocketManager();

export default SocketManager;
