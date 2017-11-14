import React, { Component } from 'react';
import Brain from './Brain';
import Display from './Display';
import EventListener from './EventListener';
import InputListener from './InputListener';
import './Game.css';

let started = false;
const init = function($canvas){
  if (started){
    return;
  }
  started = true;

  const brain = new Brain();
  const display = new Display(brain, $canvas);

  EventListener.register(e => brain.onEvent(e));
  InputListener.register((et, e) => brain.onInput(et, e));

  display.startDrawLoop();

  // debugging
  window.admin = {
    brain,
    display,
  };
}

class Game extends Component {
  componentDidMount() {
    var $canvas = this.refs.canvas;
    init($canvas);
  }

  render() {
    return (
      <div>
        <canvas ref='canvas' id='primary' className="Grid"></canvas>
      </div>
    );
  }
}

export default Game;
