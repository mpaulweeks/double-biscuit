
class Block{
  constructor(row, col, color){
    this.row = row;
    this.col = col;
    this.color = color;
  }
}

class FallingBlock extends Block{
  shift(x, y){
    this.col += x;
    this.row += y;
  }
}

class Tetromino {
  constructor(color, points){
    this.color = color;
    this.blocks = points.map(p => {
      return new FallingBlock(p.y, p.x, this.color);
    });
  }

  shift(coords){
    this.blocks.forEach(b => {
      b.shift(coords.x, coords.y);
    });
  }

  clone(){
    const points = this.blocks.map(b => {
      return {x: b.col, y: b.row};
    });
    return new Tetromino(this.color, points);
  }

  *[Symbol.iterator](){
    yield* this.blocks;
  }
}

const OVERLAP = 'overlap';
const OUT_OF_BOUNDS = 'out of bounds';

class TetrominoManager {
  constructor(grid){
    this.grid = grid;
    this._current = null;
  }

  newLongPiece(){
    const { grid } = this;

    const t = new Tetromino('pink', [
      {x: -1, y: 0},
      {x: 0, y: 0},
      {x: 1, y: 0},
      {x: 2, y: 0},
    ]);
    t.shift({x: grid.width()/2 - 1, y: grid.height() - 1});
    return t;
  }

  shift(coords){
    const shifted = this.current().clone();
    shifted.shift(coords);
    let outOfBounds = false;
    let overlap = false;
    shifted.blocks.forEach(b => {
      const gridValue = this.grid.get(b.row, b.col);
      outOfBounds = outOfBounds || gridValue === OUT_OF_BOUNDS;
      overlap = overlap || gridValue;
    });
    if (overlap){
      return OVERLAP;
    } else if (outOfBounds){
      return OUT_OF_BOUNDS;
    } else {
      this._current = shifted;
      return null;
    }
  }
  shiftDown(dy){
    const result = this.shift({x: 0, y: dy || -1});
    if (result === OVERLAP){
      this.setInGrid();
    }
    return result;
  }
  drop(){
    while(this.shiftDown() === null){
      // continue looping
    }
  }
  shiftLeft(dx){
    this.shift({x: dx || -1, y: 0});
  }
  shiftRight(dx){
    this.shift({x: dx || 1, y: 0});
  }

  setInGrid(){
    this.current().blocks.forEach(b => {
      this.grid.setBlock(b);
    });
    this._current = null;
  }

  current(){
    if (!this._current){
      this._current = this.newLongPiece();
    }
    return this._current;
  }
}

class Grid{
  constructor(){
    this._width = 10;
    this._height = 22;
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
  width(){
    return this._width;
  }
  height(){
    return this._height;
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
    const { tm } = this;

    if (animationCountdown > 0){
      animationCountdown -= 1;
      // animate
    } else {
      let pieceWasSet = false;

      if (this.arrowCode){
        switch (this.arrowCode){
          case 'ArrowLeft':
            tm.shiftLeft();
            break;
          case 'ArrowRight':
            tm.shiftRight();
            break;
          case 'ArrowDown':
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
        pieceWasSet |= tm.shiftDown();
        this.autoDropper = 0;
      }

      if (pieceWasSet){
        animationCountdown = 20;
      }
    }
  }
}

export default Brain;
