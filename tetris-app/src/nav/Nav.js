import React, { Component } from 'react';
import styled from 'styled-components';

import SoundBar from '../SoundBar';

const Navbar = styled.div`
  height: 40px;

  padding: 5px;

  text-align: left;
  color: black;
  background-color: white;

  display: flex;
  flex-direction: row;
`;

const NavChild = styled.div`
  padding-left: 5px;
  padding-right: 5px;
  margin: 0px auto;

  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const AppName = styled.div`
  font-weight: bold;
`;

const LobbyDisplay = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const LobbyName = styled.div`
  padding-left: 2px;
  cursor: pointer;
  text-decoration: underline;
`;

class Nav extends Component {
  onLobbyMenu() {
    this.props.callbacks.resetLobby();
  }
  render() {
    const { lobby } = this.props;
    return (
      <Navbar>
        <NavChild>
          <AppName>
            Double Biscuit
          </AppName>
        </NavChild>
        <NavChild>
          <LobbyDisplay>
            Lobby:
            {lobby ? (
              <LobbyName onClick = {() => this.onLobbyMenu() }>
                {lobby}
              </LobbyName>
            ) : 'n/a'}
          </LobbyDisplay>
        </NavChild>
        <NavChild>
          <SoundBar />
        </NavChild>
      </Navbar>
    );
  }
}

export default Nav;
