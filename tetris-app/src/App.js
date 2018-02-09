import React, { Component } from 'react';

import SocketManager from './rigging/Socket';
import Nav from './nav/Nav';
import LobbyMenu from './lobby/LobbyMenu';
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
        <Nav {...childrenProps}/>
        { lobby && <Game {...childrenProps}/> }
        {!lobby && <LobbyMenu {...childrenProps}/> }
      </div>
    );
  }
}

export default App;
