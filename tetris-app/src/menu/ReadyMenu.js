import React, { Component } from 'react';

import EventListener from '../rigging/EventListener';
import { Events } from '../Constants';
import {
  LobbyWindow,
  LobbyBlock,
  LobbyLine,
  LobbyMessage,
  LobbyName,
  LobbyJoin,
} from './LobbyComponent';

class ReadyMenu extends Component {
  constructor(props){
    super(props);
    this.eventListener = new EventListener(e => this.receiveEvent(e));
  }
  receiveEvent(event) {
    console.log('ready event:', event);
    if (event.type === Events.Lobby.Ready){
      this.props.callbacks.ready();
    }
  }
  onReady() {
    this.eventListener.sendEvent({
      pattern: 'broadcast',
      type: Events.Lobby.Ready,
    });
    this.props.callbacks.ready();
  }
  render() {
    const { lobbyUsers } = this.props;
    return (
      <LobbyWindow>
        <LobbyBlock>
          <LobbyLine>
            {lobbyUsers.length < 2 ? (
              <LobbyMessage>
                Waiting for more players to start the game...
              </LobbyMessage>
            ) : (
              <LobbyJoin onClick={() => this.onReady()}>start</LobbyJoin>
            )}
          </LobbyLine>
        </LobbyBlock>
        <LobbyBlock>
          <LobbyLine>
            Users waiting in lobby:
          </LobbyLine>
          {lobbyUsers.map((user, index) => (
            <LobbyLine key={`enemyName-${index}`}>
              <LobbyName>{user.name}</LobbyName>
            </LobbyLine>
          ))}
        </LobbyBlock>
      </LobbyWindow>
    );
  }
}

export default ReadyMenu;
