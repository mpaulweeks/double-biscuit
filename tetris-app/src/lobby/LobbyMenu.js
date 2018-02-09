import React, { Component } from 'react';

import SocketManager from '../rigging/Socket';
import {
  ScreenCover,
  ModalWindow,
  ModalLine,
  ModalSelect,
  ModalInput,
  ModalSubmit,
} from '../Modal';

class LobbyMenu extends Component {
  constructor(props){
    super(props);
    this.state = {
      lobbies: null,
    };
  }
  componentDidMount() {
    const self = this;
    SocketManager.SL.fetchLobbies().then(lobbies => {
      self.setState({
        lobbies: lobbies,
      });
    })
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
      <div>
        <ScreenCover></ScreenCover>
        <ModalWindow>
          <ModalLine>
            Type in your own lobby name
          </ModalLine>
          <ModalLine>
            <ModalInput innerRef={e => this.lobbyInput = e}/>
            <ModalSubmit onClick={() => this.onSubmit()}>
              join
            </ModalSubmit>
          </ModalLine>
          <ModalLine>
            {lobbies === null && "loading lobbies..."}
            {lobbies !== null && lobbies.length === 0 && "there are currently no lobbies"}
            {lobbies !== null && lobbies.length > 0 && (
              <ModalSelect onChange={() => this.onSelect()} innerRef={e => this.lobbySelect = e}>
                <option value="">choose an existing lobby</option>
                {lobbies.map((lobby, index) => (
                  <option key="lobbySelect-{index}" value={lobby.lobby}>{lobby.lobby} ({lobby.count})</option>
                ))}
              </ModalSelect>
            )}
          </ModalLine>
        </ModalWindow>
      </div>
    );
  }
}

export default LobbyMenu;
