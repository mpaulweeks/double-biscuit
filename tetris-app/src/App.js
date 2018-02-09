import React, { Component } from 'react';

import SoundBar from './SoundBar';
import SocketManager from './rigging/Socket';
import Menu from './menu/Menu';
import Game from './view/Game';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      lobby: null,
    };
  }
  loadNewLobby(newLobby) {
    SocketManager.connect(newLobby);
    this.setState({
      lobby: newLobby,
    });
  }
  resetLobby() {
    this.setState({
      lobby: null,
    });
  }
  render() {
    const { lobby } = this.state;
    const childrenProps = {
      lobby,
      callbacks: {
        loadNewLobby: nl => this.loadNewLobby(nl),
        resetLobby: () => this.resetLobby(),
      },
    }
    return (
      <div className="Container">
        <SoundBar />
        { lobby && <Game {...childrenProps}/> }
        {!lobby && <Menu {...childrenProps}/> }
      </div>
    );
  }
}

export default App;
