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

class Nav extends Component {
  onLobbyMenu() {
    this.props.callbacks.resetLobby();
  }
  render() {
    const { lobby } = this.props;
    return (
      <Navbar>
        <NavChild>
          Double Biscuit
        </NavChild>
        <NavChild>
          {lobby ? lobby : 'Menu'}
        </NavChild>
        <NavChild>
          <button onClick={() => this.onLobbyMenu()}>change lobby</button>
        </NavChild>
        <NavChild>
          <SoundBar />
        </NavChild>
      </Navbar>
    );
  }
}

export default Nav;
