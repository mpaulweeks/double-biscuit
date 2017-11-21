import React, { Component } from 'react';

import SoundBar from './SoundBar';
import Game from './view/Game';

class App extends Component {
  render() {
    return (
      <div className="Container">
        <SoundBar />
        <Game />
      </div>
    );
  }
}

export default App;
