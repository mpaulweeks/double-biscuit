import React, { Component } from 'react';

import Logger from '../Logging';
import { BGM } from '../Constants';
import EventListener from '../rigging/EventListener';
import SocketManager from '../rigging/Socket';
import { InputListener, TouchListener } from '../rigging/InputListener';
import HeroBrain from '../logic/HeroBrain';
import EnemyBrain from '../logic/EnemyBrain';

import { GridDisplay, TetroDisplay, EnemyDisplay } from './Display';
import {
  AllGames,
  FlexTop,
  FlexBottom,
  PrimaryInfo,
  PrimaryCanvasContainer,
  GridCanvas,
  EnemyContainer,
  EnemyGames,
  EnemyCanvasWrapper,
  EnemyName,
  EnemyCanvas,
  SectionTitle,
  IncomingAttack,
  TetroCanvas,
  BigTetroCanvas,
} from './Component';
import Jukebox from './Jukebox';
import './Game.css';


class Game extends Component {
  constructor(props) {
    super(props);
    this.upcomingRefs = [];
    this.enemyRefs = [];
    this.enemyBrains = [null, null, null];
    this.started = false;
    this.state = {
      enemyNames: [null, null, null],
      incomingAttack: false,
    };
  }

  checkForNewUsers(socketData){
    const { event } = socketData;
    let found = false;
    let empty = 0;
    this.enemyBrains.forEach((b, i) => {
      if (b.id === event.origin){
        found = b;
      }
      if (b.id === null){
        empty += 1;
      }
    });
    if (!found && empty > 0){
      Logger.info('setting enemy brain', event.origin, event);
      let bi = 0;
      while(this.enemyBrains[bi].id !== null){
        bi += 1;
      }
      found = this.enemyBrains[bi];
      found.id = event.origin;
      found.index = bi;
    }
    if (found && event.name) {
      // todo when is found still false?
      found.name = event.name;
      const { enemyNames } = this.state;
      enemyNames[found.index] = found.name;
      this.setState({
        enemyNames,
      });
    }
  }

  setup() {
    if (this.started){ return; }
    this.started = true;

    const eventListener = new EventListener(d => this.checkForNewUsers(d));
    Jukebox.playBGM(BGM.Gumball);

    const primaryBrain = new HeroBrain(
      eventListener,
      InputListener,
      new TouchListener(this.GridCanvas, this.SwapCanvas),
      Jukebox,
      this.props.name
    );
    this.primaryBrain = primaryBrain;
    this.displays = [
      new GridDisplay(this.GridCanvas, primaryBrain, nv => this.updateIncomingAttack(nv)),
    ];

    const getSwapFunc = brain => brain.tm.getSwap();
    this.displays.push(new TetroDisplay(this.SwapCanvas, primaryBrain, getSwapFunc));

    this.upcomingRefs.forEach((ref, index) => {
      const getTetroFunc = brain => brain.tm.upcoming()[index];
      this.displays.push(new TetroDisplay(ref, primaryBrain, getTetroFunc));
    });
    this.enemyRefs.forEach((ref, i) => {
      const eb = new EnemyBrain(eventListener);
      this.enemyBrains[i] = eb;
      this.displays.push(new EnemyDisplay(ref, eb));
    });
  }

  componentDidMount() {
    this.setup();

    this.displays.forEach(d => d.startDrawLoop());

    // debugging
    window.admin = {
      ...this,
      SocketManager,
    };
  }

  updateIncomingAttack(newValue) {
    if (newValue !== this.state.incomingAttack){
      // todo check if this is redundant, if render is smart enough
      this.setState({
        incomingAttack: newValue,
      });
    }
  }

  render() {
    // variable refs https://github.com/facebook/react/issues/1899#issuecomment-234485054
    var upcoming = [0,1,2,3];
    const { enemyNames } = this.state;
    return (
      <AllGames>
        <PrimaryInfo>
          <FlexTop>
            <SectionTitle>
              Next
            </SectionTitle>
            {upcoming.map((value, i) => (
              <div key={`upcoming-${i}`} >
                {i === 0 && <BigTetroCanvas innerRef={comp => this.upcomingRefs[value] = comp}></BigTetroCanvas>}
                {i > 0 && <TetroCanvas innerRef={comp => this.upcomingRefs[value] = comp}></TetroCanvas>}
              </div>
            ))}
          </FlexTop>
          <FlexBottom>
            {this.state.incomingAttack && (
              <IncomingAttack>
                Incoming<br/>attacks!
              </IncomingAttack>
            )}
            <SectionTitle>
              Swap
            </SectionTitle>
            <div>
              <BigTetroCanvas innerRef={c => this.SwapCanvas = c}></BigTetroCanvas>
            </div>
          </FlexBottom>
        </PrimaryInfo>
        <PrimaryCanvasContainer>
          <GridCanvas innerRef={c => this.GridCanvas = c}></GridCanvas>
        </PrimaryCanvasContainer>
        <EnemyContainer>
          <SectionTitle>
            Enemies
          </SectionTitle>
          <EnemyGames>
            {enemyNames.map((eName, i) => (
              <EnemyCanvasWrapper key={`enemy-${i}`}>
                <EnemyName>{eName || '(empty)'}</EnemyName>
                <EnemyCanvas innerRef={c => this.enemyRefs[i] = c}></EnemyCanvas>
              </EnemyCanvasWrapper>
            ))}
          </EnemyGames>
        </EnemyContainer>
      </AllGames>
    );
  }
}

export default Game;
