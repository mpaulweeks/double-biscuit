import React, { Component } from 'react';
import styled from 'styled-components';

import SocketManager from './rigging/Socket';
import Nav from './nav/Nav';
import LobbyMenu from './lobby/LobbyMenu';
import Game from './view/Game';

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

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
    SocketManager.disconnect();
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
      <Container>
        <Nav {...childrenProps}/>
        { lobby && <Game {...childrenProps}/> }
        {!lobby && <LobbyMenu {...childrenProps}/> }
      </Container>
    );
  }
}

export default App;
