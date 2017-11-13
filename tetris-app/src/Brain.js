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
    this.animationCountdown = 0;

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

  tick(){
    const { tm, grid } = this;

    if (this.animationCountdown > 0){
      // todo move this to display, just stop ticking

      this.animationCountdown -= 1;
      // animate

      if (this.animationCountdown === 0) {
        grid.removeRows();
        const ok = tm.refresh();
        if (!ok){
          this.restart();
        }
      }
    } else {
      let pieceWasSet = false;

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
            pieceWasSet = true;
            break;
          default:
            break;
        }
        this.arrowCode = null;
      }

      this.autoDropper += 1;
      if (this.autoDropper > 60){
        pieceWasSet = pieceWasSet || tm.shiftDown();
        this.autoDropper = 0;
      }

      if (pieceWasSet){
        this.animationCountdown = 10;
      }
    }
  }
}

export default Brain;
