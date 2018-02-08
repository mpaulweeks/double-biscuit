import React, { Component } from 'react';

import {
  ScreenCover,
  ModalWindow,
  ModalLine,
  ModalSelect,
  ModalInput,
  ModalSubmit,
} from '../Modal';

class Menu extends Component {
  constructor(props){
    super(props);
    this.state = {
      lobbies: [
        {lobby: 'test', count: '7'},
      ],
    };
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
            or join an existing lobby
          </ModalLine>
          <ModalLine>
            <ModalSelect onChange={() => this.onSelect()} innerRef={e => this.lobbySelect = e}>
              <option value="">Click to view existing lobbies</option>
              {lobbies.map((lobby, index) => (
                <option key="lobbySelect-{index}" value={lobby.lobby}>{lobby.lobby} ({lobby.count})</option>
              ))}
            </ModalSelect>
          </ModalLine>
        </ModalWindow>
      </div>
    );
  }
}

export default Menu;
