import TetrominoManager from './TetrominoManager';
import Grid from './Grid';

class Brain {
  constructor(){
    this.restart();
  }

  restart(){
    this.grid = new Grid();
    this.tm = new TetrominoManager(this.grid);

    this.autoDropper = 0;
    this.arrowCode = null;
    this.pieceWasSet = false;
    this.pendingAttacks = [];

    this.tick();
  }

  current(){
    return this.tm.current();
  }

  onInput(eventType, event){
    if(eventType === 'KeyDown'){
      this.arrowCode = event.code;
    }
  }
  onEvent(event){
    if (event.type === 'Attack'){
      this.pendingAttacks.push(event.value);
    }
  }
  processAttacks(){
    const attacks = this.pendingAttacks.splice(0, this.pendingAttacks.length);
    for (var att of attacks){
      this.grid.attack(att);
    }
  }

  tick(){
    const { tm, grid } = this;

    // check at beginning of tick
    if (this.pieceWasSet){
      grid.removeRows();
      this.processAttacks();
      const error = tm.refresh();
      if (error){
        this.restart();
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
