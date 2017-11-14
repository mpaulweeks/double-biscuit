import { FallingBlock } from './Block';

const blocksFromPoints = function(color, points){
  return points.map(p => {
    const isOrigin = p.x === 0 && p.y === 0;
    return new FallingBlock(p, color, isOrigin);
  });
}

class Tetromino {
  constructor(blocks){
    this.blocks = blocks;
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
  }

  rotate(){
    const origin = this.origin();
    this.blocks.forEach(b => {
      b.rotateAround(origin);
    });
  }

  clone(){
    let newTetro = Object.create(Object.getPrototypeOf(this));
    newTetro = Object.assign(newTetro, this);
    newTetro.blocks = this.blocks.map(b => b.clone());
    return newTetro;
  }

  *[Symbol.iterator](){
    yield* this.blocks;
  }
}

class Line extends Tetromino {
  constructor(){
    super(blocksFromPoints('pink', [
      {x: -1, y: 0},
      {x: 0, y: 0},
      {x: 1, y: 0},
      {x: 2, y: 0},
    ]));
  }
}

class Square extends Tetromino {
  constructor(){
    super(blocksFromPoints('yellow', [
      {x: -1, y: -1},
      {x: -1, y: 0},
      {x: 0, y: -1},
      {x: 0, y: 0},
    ]));
  }
  rotate(){
    // do nothing
    // todo broken by cloning
  }
}

class Cross extends Tetromino {
  constructor(){
    super(blocksFromPoints('red', [
      {x: -1, y: 0},
      {x: 0, y: 0},
      {x: 1, y: 0},
      {x: 0, y: -1},
    ]));
  }
}

class KnightOne extends Tetromino {
  constructor(){
    super(blocksFromPoints('purple', [
      {x: -1, y: -1},
      {x: -1, y: 0},
      {x: 0, y: 0},
      {x: 1, y: 0},
    ]));
  }
}

class KnightTwo extends Tetromino {
  constructor(){
    super(blocksFromPoints('orange', [
      {x: -1, y: 0},
      {x: 0, y: 0},
      {x: 1, y: 0},
      {x: 1, y: -1},
    ]));
  }
}

class ZedOne extends Tetromino {
  constructor(){
    super(blocksFromPoints('green', [
      {x: -1, y: -1},
      {x: 0, y: -1},
      {x: 0, y: 0},
      {x: 1, y: 0},
    ]));
  }
}

class ZedTwo extends Tetromino {
  constructor(){
    super(blocksFromPoints('blue', [
      {x: 1, y: -1},
      {x: 0, y: -1},
      {x: 0, y: 0},
      {x: -1, y: 0},
    ]));
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
