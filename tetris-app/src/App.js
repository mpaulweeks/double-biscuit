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
      lobbyUsers: [],
      ready: false,
    };
  }
  componentDidMount() {
    // todo while testing
    // this.loadNewLobby('bob', 'main');
  }
  onLobbyRefresh() {
    const { lobby } = this.state;
    console.log('on lobby refresh:', lobby);
    if (lobby) {
      const self = this;
      SocketManager.SL.fetchLobbyUsers(lobby).then(lobbyData => {
        console.log('fetched lobby:', lobbyData);
        if (!lobbyData){
          return;
        }
        const lobbyUsers = lobbyData.map(ld => JSON.parse(ld.data));
        self.setState({
          lobbyUsers: lobbyUsers,
        });
      });
    }
  }
  loadNewLobby(newName, newLobby) {
    SocketManager.connect(newLobby, () => this.onLobbyRefresh());
    SocketManager.sendInfo({name: newName});
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
    const { name, lobby, lobbyUsers, ready } = this.state;
    const childrenProps = {
      name,
      lobby,
      lobbyUsers,
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
