import {
  OUT_OF_BOUNDS,
  Block,
  TetrominoManager,
} from './Tetromino';

class Grid{
  constructor(){
    this._width = 10;
    this._height = 25;
    this._matrix = [];
    for (var row = 0; row < this._height; row++){
      this._matrix[row] = [];
      for (var col = 0; col < this._width; col++){
        this._matrix[row][col] = null;
        if ((row + col) % 2 === 0 && row < 5){
          this._matrix[row][col] = new Block(row, col, 'lightblue');
        }
      }
    }
  }

  get(row, col){
    if (row < 0 || row >= this._height){
      return OUT_OF_BOUNDS;
    }
    if (col < 0 || col >= this._width){
      return OUT_OF_BOUNDS;
    }
    return this._matrix[row][col];
  }
  setBlock(b){
    this._matrix[b.row][b.col] = b;
  }

  checkRows(){
    var rowsFilled = [];
    for (var row = 0; row < this._height; row++){
      var colsFilled = 0;
      for (var col = 0; col < this._width; col++){
        if (this._matrix[row][col]){
          colsFilled += 1;
        }
      }
      if (colsFilled === this._width){
        rowsFilled.push(row);
      }
    }
    return rowsFilled;
  }

  removeRows(){
    const rows = this.checkRows();

    const descendingRows = rows.slice().reverse();
    descendingRows.forEach(clearRow => {
      let row;
      let col;
      for (row = clearRow + 1; row < this._height; row++){
        for (col = 0; col < this._width; col++){
          const b = this._matrix[row][col];
          if (b){
            b.row -= 1;
          }
        }
      }
      this._matrix.splice(clearRow, 1);
      row = this._height - 1;
      this._matrix[row] = [];
      for (col = 0; col < this._width; col++){
        this._matrix[row][col] = null;
      }
    });
  }

  width(){
    return this._width;
  }
  height(){
    // grid goes higher than display/tetroManager thinks
    return this._height - 3;
  }
  *[Symbol.iterator](){
    for (var row = 0; row < this._height; row++){
      for (var col = 0; col < this._width; col++){
        yield this._matrix[row][col];
      }
    }
  }
}

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
            tm.current().rotate();
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
