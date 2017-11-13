import { FallingBlock } from './Block';

class Tetromino {
  constructor(color, points, originCoord){
    // todo take blocks instead
    // change this to classMethod since it's only done once
    this.color = color;
    this.blocks = points.map(p => {
      return new FallingBlock(p, this.color);
    });
    if (originCoord === undefined){
      originCoord = {x: 0, y: 0};
    }
    for (const b of this.blocks){
      if (b.col === originCoord.x && b.row === originCoord.y){
        this.origin = b;
      }
    }
  }

  shift(coords){
    this.blocks.forEach(b => {
      b.shift(coords.dx, coords.dy);
    });
  }

  rotate(){
    const { origin } = this;
    this.blocks.forEach(b => {
      b.rotateAround(origin);
    });
  }

  clone(){
    const points = this.blocks.map(b => {
      return {x: b.col, y: b.row};
    });
    const originCoord = {x: this.origin.col, y: this.origin.row};
    return new Tetromino(this.color, points, originCoord);
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
  rotate(){
    // do nothing
    // todo broken by cloning
  }
}

class Cross extends Tetromino {
  constructor(){
    super('red', [
      {x: -1, y: 0},
      {x: 0, y: 0},
      {x: 1, y: 0},
      {x: 0, y: -1},
    ]);
  }
}

class KnightOne extends Tetromino {
  constructor(){
    super('purple', [
      {x: -1, y: -1},
      {x: -1, y: 0},
      {x: 0, y: 0},
      {x: 1, y: 0},
    ]);
  }
}

class KnightTwo extends Tetromino {
  constructor(){
    super('orange', [
      {x: -1, y: 0},
      {x: 0, y: 0},
      {x: 1, y: 0},
      {x: 1, y: -1},
    ]);
  }
}

class ZedOne extends Tetromino {
  constructor(){
    super('green', [
      {x: -1, y: -1},
      {x: 0, y: -1},
      {x: 0, y: 0},
      {x: 1, y: 0},
    ]);
  }
}

class ZedTwo extends Tetromino {
  constructor(){
    super('blue', [
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

export {
  TetroShapes,
}
