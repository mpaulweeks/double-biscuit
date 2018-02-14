import { Errors } from '../Constants';

import TetrominoBag from './TetrominoBag';

class TetrominoManager {
  constructor(grid){
    this.grid = grid;
    this.bag = new TetrominoBag();
    this.queue = [];
    this.shiftDown();
    this.swapTetro = null;
    this.justSwapped = false;
  }

  newRandomTetro(){
    const { grid } = this;
    const tet = this.bag.next();

    // as first shift, this is imprinted on block.shifted
    tet.shift({dx: grid.width()/2 - 1, dy: grid.height()});
    return tet;
  }

  doSwap(){
    if (this.justSwapped){
      // do nothing
      return;
    }

    if (this.swapTetro){
      const newSwap = this.current();
      this.queue[0] = this.swapTetro;
      this.swapTetro = newSwap;
      this.justSwapped = true;
    } else {
      this.swapTetro = this.popCurrent();
    }
    this.swapTetro.reset();
  }
  getSwap(){
    return this.swapTetro;
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
    let next = this.current().clone();
    next.rotate();
    const error = this.checkCollisionError(next);
    let safe = error === null;

    if (!safe) {
      // try shifting
      const dxs = [-1, 1, -2, 2];
      for (var i = 0; !safe && i < dxs.length; i++){
        const shifted = next.clone();
        shifted.shift({ dx: dxs[i], dy: 0 });
        const shiftedError = this.checkCollisionError(shifted);
        if (shiftedError === null) {
          next = shifted;
          safe = true;
        }
      }
    }

    if (safe){
      this._updateCurrent(next);
      return null;
    } else {
      return error;
    }
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
      this.justSwapped = false;
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
    return this.queue.splice(0, 1)[0];
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
