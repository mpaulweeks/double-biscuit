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
      name: null,
      lobby: null,
    };
  }
  componentDidMount() {
    // todo while testing
    // this.loadNewLobby('bob', 'main');
  }
  loadNewLobby(newName, newLobby) {
    SocketManager.connect(newLobby);
    this.setState({
      name: newName,
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
    const { name, lobby } = this.state;
    const childrenProps = {
      name,
      lobby,
      callbacks: {
        loadNewLobby: (name, lobby) => this.loadNewLobby(name, lobby),
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
