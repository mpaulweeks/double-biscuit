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
    if (window.location.hostname === 'localhost'){
      const search = window.location.search.substring(1) || '';
      const paramsByName = search.split('&').reduce((lookup, elm) => {
        if (elm.includes('=')){
          const parts = elm.split('=');
          lookup[parts[0]] = parts[1];
        }
        return lookup;
      }, {});
      const name = paramsByName['name'];
      const lobby = paramsByName['lobby'];
      if (name && lobby) {
        this.loadNewLobby(name, lobby);
      }
    }
  }
  onLobbyRefresh() {
    const { lobby, ready } = this.state;
    console.log('on lobby refresh:', lobby);
    if (lobby && !ready) {
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
  resetGame() {
    const { name, lobby } = this.state;
    this.loadNewLobby(name, lobby);
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
        resetGame: () => this.resetGame(),
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
