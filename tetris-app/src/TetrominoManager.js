import TetroShapes from './Tetromino';
import Errors from './Errors';

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
    this.shiftDown();
  }

  newRandomTetro(){
    const { grid } = this;

    // todo add weight to self-correct
    const rand = Math.floor(Math.random()*ctors.length);

    const tet = ctors[rand]();
    tet.shift({dx: grid.width()/2 - 1, dy: grid.height()});
    return tet;
  }

  checkCollisionError(tetro){
    let outOfBounds = false;
    let overlap = false;
    tetro.blocks.forEach(b => {
      const gridValue = this.grid.get(b.row, b.col);
      outOfBounds = outOfBounds || gridValue === Errors.OutOfBounds;
      overlap = overlap || gridValue;
    });
    if (overlap){
      return Errors.Overlap;
    } else if (outOfBounds){
      return Errors.OutOfBounds;
    } else {
      return null;
    }
  }
  rotate(){
    const next = this.current().clone();
    next.rotate();
    const error = this.checkCollisionError(next);
    if (error === null){
      this._current = next;
    } else {
      // todo shift up/left/right until it works
    }
    return error;
  }
  tryShift(delta){
    const next = this.current().clone();
    next.shift(delta);
    const error = this.checkCollisionError(next);
    if (error === null){
      this._current = next;
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
    if (result === Errors.Overlap){
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
    return this.shiftDown();
  }

  current(){
    if (!this._current){
      this._current = this.newRandomTetro();
    }
    return this._current;
  }
}

export default TetrominoManager;
