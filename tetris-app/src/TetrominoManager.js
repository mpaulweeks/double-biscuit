import { TetroShapes } from './Tetromino';

const OVERLAP = 'overlap';
const OUT_OF_BOUNDS = 'out of bounds';
const ctors = [
  () => new TetroShapes.Line(),
  () => new TetroShapes.Square(),
  () => new TetroShapes.Cross(),
  () => new TetroShapes.KnightOne(),
  () => new TetroShapes.KnightTwo(),
  () => new TetroShapes.ZedOne(),
  () => new TetroShapes.ZedTwo(),
]

class TetrominoManager {
  constructor(grid){
    this.grid = grid;
    this._current = null;
  }

  newRandomTetro(){
    const { grid } = this;

    const rand = Math.floor(Math.random()*ctors.length);
    const tet = ctors[rand]();
    tet.shift({x: grid.width()/2 - 1, y: grid.height() - 1});
    return tet;
  }

  checkCollisionError(tetro){
    let outOfBounds = false;
    let overlap = false;
    tetro.blocks.forEach(b => {
      const gridValue = this.grid.get(b.row, b.col);
      outOfBounds = outOfBounds || gridValue === OUT_OF_BOUNDS;
      overlap = overlap || gridValue;
    });
    if (overlap){
      return OVERLAP;
    } else if (outOfBounds){
      return OUT_OF_BOUNDS;
    } else {
      return null;
    }
  }
  tryShift(coords){
    const shifted = this.current().clone();
    shifted.shift(coords);
    const error = this.checkCollisionError(shifted);
    if (error === null){
      this._current = shifted;
    }
    return error;
  }
  shiftLeft(dx){
    this.tryShift({dx: dx || -1, dy: 0});
  }
  shiftRight(dx){
    this.tryShift({dx: dx || 1, dy: 0});
  }
  shiftDown(dy){
    const result = this.tryShift({dx: 0, dy: dy || -1});
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

  setInGrid(){
    this.current().blocks.forEach(b => {
      this.grid.setBlock(b);
    });
  }

  refresh(){
    this._current = null;
    return true; // check if overlapping
  }

  current(){
    if (!this._current){
      this._current = this.newRandomTetro();
    }
    return this._current;
  }
}

const SUT = {}

export {
  SUT,
  OVERLAP,
  OUT_OF_BOUNDS,
  TetrominoManager,
}
