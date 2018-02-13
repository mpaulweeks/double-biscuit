import React, { Component } from 'react';

import SocketManager from '../rigging/Socket';
import {
  LobbyWindow,
  LobbyLine,
  LobbyMessage,
  LobbySelect,
  LobbyInput,
  LobbyJoin,
} from './LobbyComponent';

// https://reactjs.org/blog/2015/12/16/ismounted-antipattern.html
const makeCancelable = (promise) => {
  let hasCanceled_ = false;

  const wrappedPromise = new Promise((resolve, reject) => {
    promise.then(
      val => hasCanceled_ ? reject({isCanceled: true}) : resolve(val),
      error => hasCanceled_ ? reject({isCanceled: true}) : reject(error)
    );
  });

  return {
    promise: wrappedPromise,
    cancel() {
      hasCanceled_ = true;
    },
  };
};

class LobbyMenu extends Component {
  constructor(props){
    super(props);
    this.state = {
      lobbies: null,
    };
  }
  componentDidMount() {
    const onSuccess = lobbies => {
      this.setState({
        lobbies: lobbies,
      });
    };
    this.cancelablePromise = makeCancelable(SocketManager.SL.fetchLobbies());
    this.cancelablePromise
      .promise
      .then(onSuccess)
      .catch((reason) => console.log('isCanceled', reason.isCanceled));
  }
  componentWillUnmount() {
    this.cancelablePromise.cancel();
  }
  loadNewLobby(newLobby) {
    if (newLobby) {
      this.props.callbacks.loadNewLobby(newLobby);
    }
  }
  onSelect() {
    const newLobby = this.lobbySelect.value;
    this.loadNewLobby(newLobby);
  }
  onSubmit() {
    const newLobby = this.lobbyInput.value;
    this.loadNewLobby(newLobby);
  }
  render() {
    const { lobbies } = this.state;
    return (
      <LobbyWindow>
        <LobbyLine>
          <LobbyMessage>
            Type in your own lobby name
          </LobbyMessage>
        </LobbyLine>
        <LobbyLine>
          <LobbyInput innerRef={e => this.lobbyInput = e}/>
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
            <LobbySelect onChange={() => this.onSelect()} innerRef={e => this.lobbySelect = e}>
              <option value="">choose an existing lobby</option>
              {lobbies.map((lobby, index) => (
                <option key="lobbySelect-{index}" value={lobby.lobby}>{lobby.lobby} ({lobby.count})</option>
              ))}
            </LobbySelect>
          )}
        </LobbyLine>
      </LobbyWindow>
    );
  }
}

export default LobbyMenu;
