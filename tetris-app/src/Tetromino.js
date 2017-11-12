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

class Line extends Tetromino {
  constructor(){
    super('pink', [
      {x: -1, y: 0},
      {x: 0, y: 0},
      {x: 1, y: 0},
      {x: 2, y: 0},
    ]);
  }
}

class Square extends Tetromino {
  constructor(){
    super('yellow', [
      {x: -1, y: -1},
      {x: -1, y: 0},
      {x: 0, y: -1},
      {x: 0, y: 0},
    ]);
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

    let tet = null;
    const rand = Math.floor(Math.random()*2);
    switch (rand){
      case 1:
        tet = new Square();
        break;
      default:
        tet = new Line();
        break;
    }
    tet.shift({x: grid.width()/2 - 1, y: grid.height() - 1});
    return tet;
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
  }

  refresh(){
    this._current = null;
  }

  current(){
    if (!this._current){
      this._current = this.newLongPiece();
    }
    return this._current;
  }
}

export {
  OVERLAP,
  OUT_OF_BOUNDS,
  TetrominoManager,
  Block,
}
