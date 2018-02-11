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
    this.started = false;
  }

  checkForNewUsers(socketData){
    const { event } = socketData;
    let found = false;
    let empty = 0;
    this.brains.forEach(b => {
      if (b.id === event.origin){
        found = true;
      }
      if (b.id === null){
        empty += 1;
      }
    });
    if (!found && empty > 0){
      Logger.info('setting enemy brain', event.origin, event);
      let bi = 0;
      while(this.brains[bi].id !== null){
        bi += 1;
      }
      this.brains[bi].id = event.origin;
    }
  }

  setup() {
    if (this.started){ return; }
    this.started = true;

    const eventListener = new EventListener(d => this.checkForNewUsers(d));
    Jukebox.playBGM(BGM.Unity);

    const primaryBrain = new HeroBrain(
      eventListener,
      InputListener,
      new TouchListener(this.GridCanvas, this.SwapCanvas),
      Jukebox
    );
    this.brains = [
      primaryBrain,
    ]
    this.displays = [
      new GridDisplay(this.GridCanvas, primaryBrain, this.IncomingAttack),
    ];

    const getSwapFunc = brain => brain.tm.getSwap();
    this.displays.push(new TetroDisplay(this.SwapCanvas, primaryBrain, getSwapFunc));

    this.upcomingRefs.forEach((ref, index) => {
      const getTetroFunc = brain => brain.tm.upcoming()[index];
      this.displays.push(new TetroDisplay(ref, primaryBrain, getTetroFunc));
    });
    this.enemyRefs.forEach((ref) => {
      const eb = new EnemyBrain(eventListener);
      this.brains.push(eb);
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

  render() {
    // variable refs https://github.com/facebook/react/issues/1899#issuecomment-234485054

    var upcoming = [0,1,2,3];
    var enemies = [0,1,2,3];
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
            <IncomingAttack innerRef={comp => {this.IncomingAttack = comp}}>
              Incoming<br/>attacks!
            </IncomingAttack>
            <br/>
            <SectionTitle>
              Swap
            </SectionTitle>
            <div>
              <BigTetroCanvas innerRef={comp => this.SwapCanvas = comp}></BigTetroCanvas>
            </div>
          </FlexBottom>
        </PrimaryInfo>
        <PrimaryCanvasContainer>
          <GridCanvas innerRef={comp => this.GridCanvas = comp}></GridCanvas>
        </PrimaryCanvasContainer>
        <EnemyContainer>
          <SectionTitle>
            Enemies
          </SectionTitle>
          <EnemyGames>
            {enemies.map((value, i) => (
              <EnemyCanvasWrapper key={`enemy-${i}`}>
                <EnemyCanvas innerRef={c => this.enemyRefs[value] = c}></EnemyCanvas>
              </EnemyCanvasWrapper>
            ))}
          </EnemyGames>
        </EnemyContainer>
      </AllGames>
    );
  }
}

export default Game;
