class Block{
  constructor(coord, color){
    this.col = coord.x;
    this.row = coord.y;
    this.color = color;
  }

  clone(){
    // https://stackoverflow.com/a/44782052/6461842
    const newBlock = Object.create(Object.getPrototypeOf(this));
    return Object.assign(newBlock, this);
  }
}

class FallingBlock extends Block{
  shift(x, y){
    this.col += x;
    this.row += y;
  }

  rotateAround(origin){
    const dx = origin.col - this.col;
    const dy = origin.row - this.row;
    this.col += dx - dy;
    this.row += dy + dx;
  }
}

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
    console.log(this.origin);
  }

  shift(coords){
    this.blocks.forEach(b => {
      b.shift(coords.x, coords.y);
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

const OVERLAP = 'overlap';
const OUT_OF_BOUNDS = 'out of bounds';
const ctors = [
  () => new Line(),
  () => new Square(),
  () => new Cross(),
  () => new KnightOne(),
  () => new KnightTwo(),
  () => new ZedOne(),
  () => new ZedTwo(),
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
    this.tryShift({x: dx || -1, y: 0});
  }
  shiftRight(dx){
    this.tryShift({x: dx || 1, y: 0});
  }
  shiftDown(dy){
    const result = this.tryShift({x: 0, y: dy || -1});
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

export {
  OVERLAP,
  OUT_OF_BOUNDS,
  TetrominoManager,
  Block,
  FallingBlock,
  KnightOne,
}
