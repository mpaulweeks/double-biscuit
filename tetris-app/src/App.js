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
  render() {
    const { lobby } = this.state;
    return (
      <div className="Container">
        <SoundBar />
        { lobby && <Game/> }
        {!lobby && <Menu lobby={ lobby }/> }
      </div>
    );
  }
}

export default App;
