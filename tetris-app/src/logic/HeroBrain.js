import { SFX } from '../Constants';

import BaseBrain from './BaseBrain';
import TetrominoManager from './TetrominoManager';
import Grid from './Grid';
import { AttackBlock } from './Block';

const KEY_REPEAT = function(inputCode){
  const arrowRepeat = 10;
  switch (inputCode){
    case 'ArrowUp':
      return arrowRepeat * 2;
    case 'ArrowLeft':
      return arrowRepeat;
    case 'ArrowRight':
      return arrowRepeat;
    case 'ArrowDown':
      return arrowRepeat / 2;
    case 'Space':
      return -1;
    case 'KeyS':
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
  }

  current(){
    return this.tm.current();
  }

  onInput(eventType, event){
    const code = event.code;
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

  onEvent(event){
    if (event.type === 'Attack'){
      this.pendingAttacks.push(event.value);
    }
  }

  sendAttack(rowsCleared){
    const attackSize = rowsCleared - 1;
    if (attackSize > 0){
      // todo send attack
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
    this.eventListener.broadcast(this, {type: 'Grid', value: data});
  }

  sendSound(soundCode){
    this.soundListener.playSFX(soundCode);
  }

  debug_fillRow(row){
    this.tm.drop();
    this.autoDropper = 0;
    this.pieceWasSet = true;
    for (let col = 0; col < this.grid.width(); col++){
      const block = new AttackBlock({x: col, y: row});
      this.grid.setBlock(block);
    }
  }

  processInput(inputCode){
    const { tm } = this;
    switch (inputCode){
      case 'ArrowUp':
        tm.rotate();
        break;
      case 'ArrowLeft':
        tm.shiftLeft();
        break;
      case 'ArrowRight':
        tm.shiftRight();
        break;
      case 'ArrowDown':
        tm.shiftDown();
        break;
      case 'Space':
        tm.drop();
        this.autoDropper = 0;
        this.pieceWasSet = true;
        break;
      case 'KeyS':
        tm.doSwap();
        break;
      // debug
      case 'Digit1':
        this.debug_fillRow(0);
        break;
      case 'Digit2':
        this.debug_fillRow(0);
        this.debug_fillRow(1);
        break;
      case 'Digit3':
        this.debug_fillRow(0);
        this.debug_fillRow(1);
        this.debug_fillRow(2);
        break;
      case 'Digit4':
        this.debug_fillRow(0);
        this.debug_fillRow(1);
        this.debug_fillRow(2);
        this.debug_fillRow(3);
        break;
      case 'KeyQ':
        this.onEvent({type: 'Attack', value: 1});
        break;
      case 'KeyW':
        this.onEvent({type: 'Attack', value: 2});
        break;
      case 'KeyE':
        this.onEvent({type: 'Attack', value: 3});
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
        // todo these should be constants
        // these should go out earlier, might need to re-do tick strategy entirely
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
