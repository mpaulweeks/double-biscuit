import React, { Component } from 'react';
import Brain from './Brain';
import Display from './Display';
import './Game.css';

let started = false;
const init = function($canvas){
  if (started){
    return;
  }
  started = true;
  const brain = new Brain();
  const display = new Display(brain, $canvas);
  display.startDrawLoop();
  // display.draw();
}

class Game extends Component {
  componentDidMount() {
    var $canvas = document.getElementById('primary')
    init($canvas);
  }

  render() {
    return (
      <div>
        <canvas id='primary' className="Grid"></canvas>
      </div>
    );
  }
}

export default Game;
