import { Inputs, Events, SFX } from '../Constants';

import BaseBrain from './BaseBrain';
import TetrominoManager from './TetrominoManager';
import Grid from './Grid';
import { AttackBlock } from './Block';

const KEY_REPEAT = function(inputCode){
  const arrowRepeat = 10;
  switch (inputCode){
    case Inputs.Rotate:
      return arrowRepeat * 2;
    case Inputs.MoveLeft:
      return arrowRepeat;
    case Inputs.MoveRight:
      return arrowRepeat;
    case Inputs.MoveDown:
      return arrowRepeat / 2;
    case Inputs.Drop:
      return -1;
    case Inputs.Swap:
      return -1;
    default:
      return -1;
  }
}

class HeroBrain extends BaseBrain {
  constructor(...args){
    super(...args);
    this.restart();
  }

  restart(){
    this.grid = new Grid();
    this.tm = new TetrominoManager(this.grid);

    this.autoDropper = 0;
    this.inputTouched = {};
    this.inputPressed = {};
    this.inputBuffer = {};
    this.pieceWasSet = false;
    this.pendingAttacks = [];

    this.tick();
    this.sendUpdate();
  }

  current(){
    return this.tm.current();
  }

  onInput(eventType, code){
    switch (eventType){
      case 'Touch':
        this.inputTouched[code] = true;
        break;
      case 'KeyDown':
        if (!this.inputPressed[code]){
          this.inputPressed[code] = true;
          this.inputBuffer[code] = 0;
        }
        break;
      case 'KeyUp':
        this.inputPressed[code] = false;
        break;
      default:
        break;
    }
  }

  receiveEvent(event){
    if (event.origin !== this.id && event.type === Events.Attack){
      this.pendingAttacks.push(event.value);
    }
  }

  sendAttack(rowsCleared){
    const attackSize = rowsCleared - 1;
    if (attackSize > 0){
      this.eventListener.sendEvent({
        pattern: 'broadcast',
        origin: this.id,
        type: Events.Attack,
        value: attackSize,
      });
    }
  }
  processAttacks(){
    const attacks = this.pendingAttacks.splice(0, this.pendingAttacks.length);
    for (var att of attacks){
      this.grid.attack(att);
    }
  }
  getTotalPendingAttacks(){
    return this.pendingAttacks.reduce((sum, att) => sum + att, 0);
  }
  sendUpdate(){
    const data = this.grid.serialize();
    this.eventListener.sendEvent({
      pattern: 'broadcast',
      origin: this.id,
      name: this.name,
      type: 'Grid',
      value: data,
    });
  }

  sendSound(soundCode){
    this.soundListener.playSFX(soundCode);
  }

  debug_fillRow(rows){
    this.tm.drop();
    this.autoDropper = 0;
    this.pieceWasSet = true;
    const self = this;
    rows.forEach(function (row){
      for (let col = 0; col < self.grid.width(); col++){
        const block = new AttackBlock({x: col, y: row});
        self.grid.setBlock(block);
      }
    });
  }

  processInput(inputCode){
    const { tm } = this;
    switch (inputCode){
      case Inputs.Rotate:
        tm.rotate();
        break;
      case Inputs.MoveLeft:
        tm.shiftLeft();
        break;
      case Inputs.MoveRight:
        tm.shiftRight();
        break;
      case Inputs.MoveDown:
        tm.shiftDown();
        break;
      case Inputs.Drop:
        tm.drop();
        this.autoDropper = 0;
        this.pieceWasSet = true;
        break;
      case Inputs.Swap:
        tm.doSwap();
        break;
      // debug
      case Inputs.Debug.Clear1:
        this.debug_fillRow([0]);
        break;
      case Inputs.Debug.Clear2:
        this.debug_fillRow([0,1]);
        break;
      case Inputs.Debug.Clear3:
        this.debug_fillRow([0,1,2]);
        break;
      case Inputs.Debug.Clear4:
        this.debug_fillRow([0,1,2,3]);
        break;
      case Inputs.Debug.Attack1:
        this.onEvent({type: Events.Attack, value: 1});
        break;
      case Inputs.Debug.Attack2:
        this.onEvent({type: Events.Attack, value: 2});
        break;
      case Inputs.Debug.Attack3:
        this.onEvent({type: Events.Attack, value: 3});
        break;
      default:
        break;
    }
  }

  tick(){
    const { tm, grid } = this;

    // check at beginning of tick
    if (this.pieceWasSet){
      const numRowsCleared = grid.removeRows(grid.checkRows());
      if (numRowsCleared === 0){
        // todo these should go out earlier, might need to re-do tick strategy entirely
        this.sendSound(SFX.PieceSet);
      } else {
        this.sendSound(SFX.Clear1);
      }
      this.sendAttack(numRowsCleared);
      this.processAttacks();
      this.sendUpdate();

      tm.popCurrent();
      const error = tm.shiftDown();
      if (error){
        this.restart();
        this.sendUpdate();
      }
    }

    // process input / game changes
    this.pieceWasSet = false;
    for (let inputCode in this.inputTouched){
      const isInputTouched = this.inputTouched[inputCode];
      if (isInputTouched){
        this.processInput(inputCode);
        this.inputTouched[inputCode] = false;
      }
    }
    for (let inputCode in this.inputPressed){
      const isInputPressed = this.inputPressed[inputCode];
      if (isInputPressed){
        if (this.inputBuffer[inputCode] === 0){
          this.processInput(inputCode);
          this.inputBuffer[inputCode] = KEY_REPEAT(inputCode);
        } else {
          this.inputBuffer[inputCode] -= 1;
        }
      }
    }

    this.autoDropper += 1;
    if (this.autoDropper > 60){
      this.pieceWasSet = this.pieceWasSet || tm.shiftDown();
      this.autoDropper = 0;
    }

    return {
      pieceWasSet: this.pieceWasSet,
    };
  }
}

export default HeroBrain;
