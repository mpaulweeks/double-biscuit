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
    this.refreshLobbyList();
  }
  refreshLobbyList() {
    const onSuccess = lobbies => {
      this.setState({
        lobbies: lobbies,
      });
    };
    this.cancelablePromise = makeCancelable(SocketManager.SL.fetchLobbies());
    this.cancelablePromise
      .promise
      .then(onSuccess)
      .catch((reason) => {
        if (!reason.isCanceled){
          alert('there was an error connecting to the lobby server, please try again later');
        }
      });
    this.setState({
      lobbies: null,
    });
  }
  componentWillUnmount() {
    this.cancelablePromise.cancel();
  }
  loadNewLobby(newLobby) {
    const newName = this.nameInput.value;
    if (!newName) {
      this.setState({
        nameError: true,
      });
      return;
    }

    if (newLobby) {
      this.props.callbacks.loadNewLobby(newName, newLobby);
    }
  }
  onSubmit() {
    const newLobby = this.lobbyInput.value;
    this.loadNewLobby(newLobby);
  }
  render() {
    const { name } = this.props;
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
              <LobbyInput
                innerRef={e => this.nameInput = e}
                isError={nameError}
                defaultValue={name || ''}
              />
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
              <LobbyMessage>there are no lobbies to join</LobbyMessage>
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
          {lobbies !== null && (
            <LobbyLine>
              <LobbyJoin onClick={() => this.refreshLobbyList()}>refresh lobby list</LobbyJoin>
            </LobbyLine>
          )}
        </LobbyBlock>
      </LobbyWindow>
    );
  }
}

export default LobbyMenu;
