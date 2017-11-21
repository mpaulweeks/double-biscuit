import React, { Component } from 'react';
import Game from './Game';

class App extends Component {
  render() {
    // todo put audio controls/info here
    return (
      <div className="Container">
        <Game />
      </div>
    );
  }
}

export default App;
