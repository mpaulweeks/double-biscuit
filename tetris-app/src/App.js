import React, { Component } from 'react';

import SoundBar from './SoundBar';
import Menu from './menu/Menu';
import Game from './view/Game';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      lobby: null,
    };
  }
  loadNewLobby(newLobby) {
    this.setState({
      lobby: newLobby,
    });
  }
  render() {
    const { lobby } = this.state;
    const callbacks = {
      loadNewLobby: nl => this.loadNewLobby(nl),
    }
    return (
      <div className="Container">
        <SoundBar />
        { lobby && <Game/> }
        {!lobby && <Menu lobby={ lobby } callbacks={ callbacks }/> }
      </div>
    );
  }
}

export default App;
