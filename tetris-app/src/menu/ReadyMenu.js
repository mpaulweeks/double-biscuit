import React, { Component } from 'react';

import SocketManager from '../rigging/Socket';
import {
  LobbyWindow,
  LobbyBlock,
  LobbyLine,
  LobbyMessage,
  LobbyName,
  LobbyInput,
  LobbyJoin,
} from './LobbyComponent';

class ReadyMenu extends Component {
  constructor(props){
    super(props);
    this.state = {
      enemies: [],
    };
    this.eventListener = new EventListener(() => {});
    this.eventListener.register(
      this,
      e => this.onReceive(e)
    );
  }
  onReceive(event) {
    console.log(event);
  }
  onReady() {
    // send socket event with ready message
    this.props.callbacks.ready();
  }
  render() {
    const { lobbies, nameError } = this.state;
    return (
      <LobbyWindow>
        <LobbyBlock>
          <LobbyLine>
            <LobbyMessage>
              Type in your name
            </LobbyMessage>
          </LobbyLine>
          <LobbyLine>
            <div>
              <LobbyInput innerRef={e => this.nameInput = e} isError={nameError}/>
            </div>
          </LobbyLine>
        </LobbyBlock>
        <LobbyBlock>
          <LobbyLine>
            <LobbyMessage>
              Create a new lobby
            </LobbyMessage>
          </LobbyLine>
          <LobbyLine>
            <div>
              <LobbyInput innerRef={e => this.lobbyInput = e} placeholder="type a lobby name"/>
            </div>
            <LobbyJoin onClick={() => this.onSubmit()}>join</LobbyJoin>
          </LobbyLine>
          <LobbyLine>
            {lobbies === null && (
              <LobbyMessage>loading lobbies...</LobbyMessage>
            )}
            {lobbies !== null && lobbies.length === 0 && (
              <LobbyMessage>there are currently no existing lobbies to join</LobbyMessage>
            )}
            {lobbies !== null && lobbies.length > 0 && (
              <LobbyMessage>or choose an existing lobby</LobbyMessage>
            )}
          </LobbyLine>
          {lobbies !== null && lobbies.length > 0 && (
            lobbies.map((lobby, index) => (
              <LobbyLine key="lobbyLine-{index}">
                <LobbyName>{lobby.name} ({lobby.population})</LobbyName>
                <LobbyJoin onClick={() => this.loadNewLobby(lobby.name)}>join</LobbyJoin>
              </LobbyLine>
            ))
          )}
        </LobbyBlock>
      </LobbyWindow>
    );
  }
}

export default LobbyMenu;
