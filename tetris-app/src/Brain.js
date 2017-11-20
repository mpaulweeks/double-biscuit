import TetrominoManager from './TetrominoManager';
import Grid from './Grid';
import { AttackBlock } from './Block';
import Jukebox from './Jukebox';
import { SFX } from './Constants';

class Brain {
  constructor(){
    this.restart();
  }

  restart(){
    this.grid = new Grid();
    this.tm = new TetrominoManager(this.grid);

    this.autoDropper = 0;
    this.arrowCode = null;
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
      case 'KeyDown':
        this.arrowCode = event.code;
        // todo use input buffer, not arrowCode
        this.inputBuffer[code] = true;
        break;
      case 'KeyUp':
        this.inputBuffer[code] = false;
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
  registerEventListener(eventListener){
    this.eventListener = eventListener;
    this.eventListener.register(this, e => this.onEvent(e));
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
    // todo delegate to listener for DI
    Jukebox.playSFX(soundCode);
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
    if (this.arrowCode){
      switch (this.arrowCode){
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
      this.arrowCode = null;
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

export default Brain;
