import React, { Component } from 'react';
import styled from 'styled-components';

import SocketManager from './rigging/Socket';
import { BGM } from './Constants';
import Jukebox from './view/Jukebox';

import Nav from './nav/Nav';
import LobbyMenu from './menu/LobbyMenu';
import ReadyMenu from './menu/ReadyMenu';
import Game from './view/Game';

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

class App extends Component {
  constructor(props){
    super(props);
    Jukebox.playBGM(BGM.Gumball);
    this.state = {
      name: null,
      lobby: null,
      ready: false,
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
      ready: false,
    });
  }
  resetLobby() {
    SocketManager.disconnect();
    this.setState({
      lobby: null,
      ready: false,
    });
  }
  ready() {
    this.setState({
      ready: true,
    });
  }
  render() {
    const { name, lobby, ready } = this.state;
    const childrenProps = {
      name,
      lobby,
      callbacks: {
        loadNewLobby: (name, lobby) => this.loadNewLobby(name, lobby),
        resetLobby: () => this.resetLobby(),
        ready: () => this.ready(),
      },
    }
    return (
      <Container>
        <Nav {...childrenProps}/>
        { lobby &&  ready && <Game {...childrenProps}/> }
        { lobby && !ready && <ReadyMenu {...childrenProps}/> }
        {!lobby && <LobbyMenu {...childrenProps}/> }
      </Container>
    );
  }
}

export default App;
