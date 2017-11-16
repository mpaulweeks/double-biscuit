import { FallingBlock } from './Block';
import { TetroByType } from './Constants';

const blocksFromPoints = function(tetro, points){
  const tetroId = TetroByType(tetro.type()).id;
  return points.map(p => {
    const isOrigin = p.x === 0 && p.y === 0;
    return new FallingBlock(p, tetroId, isOrigin);
  });
}

class Tetromino {
  setInstance(blocks){
    // can't be constructor due to time of this
    this.blocks = blocks;
    this.spawn = blocks.map(b => b.clone());
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

  type(){
    return this.__proto__.constructor.name;
  }

  *[Symbol.iterator](){
    yield* this.blocks;
  }
}

class Line extends Tetromino {
  constructor(){
    super()
    this.setInstance(blocksFromPoints(this, [
      {x: -1, y: 0},
      {x: 0, y: 0},
      {x: 1, y: 0},
      {x: 2, y: 0},
    ]));
  }
}

class Square extends Tetromino {
  constructor(){
    super()
    this.setInstance(blocksFromPoints(this, [
      {x: -1, y: -1},
      {x: -1, y: 0},
      {x: 0, y: -1},
      {x: 0, y: 0},
    ]));
  }
  rotate(){
    // do nothing
  }
}

class Cross extends Tetromino {
  constructor(){
    super()
    this.setInstance(blocksFromPoints(this, [
      {x: -1, y: 0},
      {x: 0, y: 0},
      {x: 1, y: 0},
      {x: 0, y: -1},
    ]));
  }
}

class KnightOne extends Tetromino {
  constructor(){
    super()
    this.setInstance(blocksFromPoints(this, [
      {x: -1, y: -1},
      {x: -1, y: 0},
      {x: 0, y: 0},
      {x: 1, y: 0},
    ]));
  }
}

class KnightTwo extends Tetromino {
  constructor(){
    super()
    this.setInstance(blocksFromPoints(this, [
      {x: -1, y: 0},
      {x: 0, y: 0},
      {x: 1, y: 0},
      {x: 1, y: -1},
    ]));
  }
}

class ZedOne extends Tetromino {
  constructor(){
    super()
    this.setInstance(blocksFromPoints(this, [
      {x: -1, y: -1},
      {x: 0, y: -1},
      {x: 0, y: 0},
      {x: 1, y: 0},
    ]));
  }
}

class ZedTwo extends Tetromino {
  constructor(){
    super()
    this.setInstance(blocksFromPoints(this, [
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
