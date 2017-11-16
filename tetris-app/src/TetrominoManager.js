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
    this.queue = [];
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
      this._updateCurrent(next);
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
      this._updateCurrent(next);
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
      this.setInGrid(); // move to pop? implications for draw
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

  ghost(){
    const ghost = this.current().clone();
    const delta = {dx: 0, dy: -1};
    let error = null;
    while(!error){
      ghost.shift(delta);
      error = this.checkCollisionError(ghost);
    }
    ghost.shift({dx:0, dy: 1});
    return ghost;
  }

  _updateCurrent(newCurrent){
    this.queue[0] = newCurrent;
  }
  _ensureQueue(){
    while (this.queue.length < 10){
      this.queue.push(this.newRandomTetro());
    }
  }
  popCurrent(){
    return this.queue.splice(0, 1);
  }
  current(){
    this._ensureQueue();
    return this.queue[0];
  }
  upcoming(){
    this._ensureQueue();
    return this.queue.slice(1);
  }
}

export default TetrominoManager;
