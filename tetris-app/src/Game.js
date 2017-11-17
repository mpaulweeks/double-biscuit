import React, { Component } from 'react';
import Brain from './Brain';
import EnemyBrain from './EnemyBrain';
import { GridDisplay, TetroDisplay, EnemyDisplay } from './Display';
import EventListener from './EventListener';
import InputListener from './InputListener';
import './Game.css';

class Game extends Component {
  constructor(props) {
    super(props);
    this.upcomingRefs = [];
    this.enemyRefs = [];
    this.started = false;
  }

  setup() {
    if (this.started){ return; }
    this.started = true;

    const primaryBrain = new Brain();
    this.brains = [
      primaryBrain,
    ]
    this.displays = [
      new GridDisplay(this.refs.gridCanvas, primaryBrain),
    ];

    const getSwapFunc = brain => brain.tm.getSwap();
    this.displays.push(new TetroDisplay(this.refs.swapCanvas, primaryBrain, getSwapFunc));

    this.upcomingRefs.forEach((ref, index) => {
      const getTetroFunc = brain => brain.tm.upcoming()[index];
      this.displays.push(new TetroDisplay(ref, primaryBrain, getTetroFunc));
    });
    this.enemyRefs.forEach((ref) => {
      const eb = new EnemyBrain();
      this.brains.push(eb);
      this.displays.push(new EnemyDisplay(ref, eb));
    });

    this.brains.forEach(b => {
      b.registerEventListener(EventListener);
      InputListener.register((et, e) => b.onInput(et, e));
    });
  }

  componentDidMount() {
    this.setup();

    this.displays.forEach(d => d.startDrawLoop());

    // debugging
    window.admin = this;
  }

  render() {
    // variable refs https://github.com/facebook/react/issues/1899#issuecomment-234485054

    var upcoming = [0,1,2,3];
    var enemies = [0,1,2,3];
    return (
      <div className="AllGames">
        <div>
          <canvas ref='swapCanvas' className="UpcomingCanvas"></canvas>
        </div>
        <div className="PrimaryGame">
          <div className="UpcomingContainer">
            {upcoming.map((value, i) => (
              <canvas key={`upcoming-${i}`} ref={c => {this.upcomingRefs[value] = c;}} className="UpcomingCanvas"></canvas>
            ))}
          </div>
          <div>
            <canvas ref='gridCanvas' className="GridCanvas"></canvas>
          </div>
        </div>
        <div className="EnemyGames">
          {enemies.map((value, i) => (
            <canvas key={`enemy-${i}`} ref={c => {this.enemyRefs[value] = c;}} className="EnemyCanvas"></canvas>
          ))}
        </div>
      </div>
    );
  }
}

export default Game;
