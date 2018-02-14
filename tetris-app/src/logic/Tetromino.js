import { TetroByType } from '../Constants';

import { FallingBlock } from './Block';

class Tetromino {
  setBlocksFromPoints(points){
    // can't be constructor due to time of this
    const tetroId = this.meta().id;
    const blocks = points.map(p => {
      const isOrigin = p.x === 0 && p.y === 0;
      return new FallingBlock(p, tetroId, isOrigin);
    });

    this.blocks = blocks;
    this.spawn = blocks.map(b => b.clone());
    this.shifted = null;
    this.rotation = 0;
  }

  origin(){
    let origin = this.blocks[0];
    for (let b of this.blocks){
      if (b.isOrigin){
        origin = b;
      }
    }
    return origin;
  }

  shift(delta){
    this.blocks.forEach(b => {
      b.shift(delta.dx, delta.dy);
    });
    if (!this.shifted){
      this.shifted = this.blocks.map(b => b.clone());
    }
  }

  rotate(){
    // http://tetris.wikia.com/wiki/SRS
    const origin = this.origin();
    this.blocks.forEach(b => {
      b.rotateAround(origin);
    });
    this.rotation = (this.rotation + 1) % 4;
  }

  clone(){
    let newTetro = Object.create(Object.getPrototypeOf(this));
    newTetro = Object.assign(newTetro, this);
    newTetro.blocks = this.blocks.map(b => b.clone());
    return newTetro;
  }

  reset(){
    this.blocks = this.shifted.map(b => b.clone());
  }

  meta(){
    return TetroByType(this.type);
  }

  *[Symbol.iterator](){
    yield* this.blocks;
  }
}

class Line extends Tetromino {
  constructor(){
    super()
    this.type = 'Line';
    this.setBlocksFromPoints([
      {x: -1, y: 0},
      {x: 0, y: 0},
      {x: 1, y: 0},
      {x: 2, y: 0},
    ]);
  }
  rotate(){
    super.rotate();
    if (this.rotation === 2){
      this.blocks.forEach(b => {
        b.shift(1, -1);
      });
    }
    if (this.rotation === 0){
      this.blocks.forEach(b => {
        b.shift(-1, 1);
      });
    }
  }
}

class Square extends Tetromino {
  constructor(){
    super()
    this.type = 'Square';
    this.setBlocksFromPoints([
      {x: -1, y: -1},
      {x: -1, y: 0},
      {x: 0, y: -1},
      {x: 0, y: 0},
    ]);
  }
  rotate(){
    // do nothing
  }
}

class Cross extends Tetromino {
  constructor(){
    super()
    this.type = 'Cross';
    this.setBlocksFromPoints([
      {x: -1, y: 0},
      {x: 0, y: 0},
      {x: 1, y: 0},
      {x: 0, y: -1},
    ]);
  }
}

class KnightOne extends Tetromino {
  constructor(){
    super()
    this.type = 'KnightOne';
    this.setBlocksFromPoints([
      {x: -1, y: -1},
      {x: -1, y: 0},
      {x: 0, y: 0},
      {x: 1, y: 0},
    ]);
  }
}

class KnightTwo extends Tetromino {
  constructor(){
    super()
    this.type = 'KnightTwo';
    this.setBlocksFromPoints([
      {x: -1, y: 0},
      {x: 0, y: 0},
      {x: 1, y: 0},
      {x: 1, y: -1},
    ]);
  }
}

class ZedOne extends Tetromino {
  constructor(){
    super()
    this.type = 'ZedOne';
    this.setBlocksFromPoints([
      {x: -1, y: -1},
      {x: 0, y: -1},
      {x: 0, y: 0},
      {x: 1, y: 0},
    ]);
  }
}

class ZedTwo extends Tetromino {
  constructor(){
    super()
    this.type = 'ZedTwo';
    this.setBlocksFromPoints([
      {x: 1, y: -1},
      {x: 0, y: -1},
      {x: 0, y: 0},
      {x: -1, y: 0},
    ]);
  }
}

const TetroShapes = {
  Line,
  Square,
  Cross,
  KnightOne,
  KnightTwo,
  ZedOne,
  ZedTwo,
};

export default TetroShapes;
