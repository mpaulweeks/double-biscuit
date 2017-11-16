import React, { Component } from 'react';
import Brain from './Brain';
import { GridDisplay, UpcomingDisplay } from './Display';
import EventListener from './EventListener';
import InputListener from './InputListener';
import './Game.css';

class Game extends Component {
  constructor(props) {
    super(props);
    this.upcomingRefs = [];
  }

  componentDidMount() {
    console.log('component mounted');

    const brain = new Brain();
    const displays = [
      new GridDisplay(this.refs.gridCanvas, brain),
    ];
    this.upcomingRefs.forEach((ref, index) => {
      displays.push(new UpcomingDisplay(ref, brain, index));
    });

    EventListener.register(e => brain.onEvent(e));
    InputListener.register((et, e) => brain.onInput(et, e));

    displays.forEach(d => d.startDrawLoop());

    // debugging
    window.admin = {
      brain,
      displays,
    };
  }

  render() {
    // variable refs https://github.com/facebook/react/issues/1899#issuecomment-234485054

    var upcoming = [0,1,2,3];
    return (
      <div className="PrimaryGame">
        <div className="UpcomingContainer">
          {upcoming.map((value, i) => (
            <canvas key={i} ref={c => {this.upcomingRefs[value] = c;}} className="UpcomingCanvas"></canvas>
          ))}
        </div>
        <div>
          <canvas ref='gridCanvas' className="GridCanvas"></canvas>
        </div>
      </div>
    );
  }
}

export default Game;
