
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
  shiftDown(dy){
    this.shift({x: 0, y: dy || -1});
  }

  *[Symbol.iterator](){
    yield* this.blocks;
  }
}

class TetrominoManager {
  constructor(grid){
    this.grid = grid;
    this._current = null;
  }

  newLongPiece(){
    const { grid } = this;

    const t = new Tetromino('pink', [
      {x: -1, y: 0},
      {x: 0, y: 0},
      {x: 1, y: 0},
      {x: 2, y: 0},
    ]);
    t.shift({x: grid.width()/2 - 1, y: grid.height() - 1});
    return t;
  }

  current(){
    if (!this._current){
      this._current = this.newLongPiece();
    }
    return this._current;
  }
}

class Grid{
  constructor(){
    this._width = 10;
    this._height = 22;
    this._matrix = [];
    for (var row = 0; row < this._height; row++){
      this._matrix[row] = [];
      for (var col = 0; col < this._width; col++){
        this._matrix[row][col] = null;
        if ((row + col) % 2 === 0 && row < 5){
          this._matrix[row][col] = new Block(row, col, 'lightblue');
        }
      }
    }
  }

  width(){
    return this._width;
  }
  height(){
    return this._height;
  }
  *[Symbol.iterator](){
    for (var row = 0; row < this._height; row++){
      for (var col = 0; col < this._width; col++){
        yield this._matrix[row][col];
      }
    }
  }
}

class Brain {
  constructor(){
    this.grid = new Grid();
    this.tm = new TetrominoManager(this.grid);
    this.autoDropper = 0;

    this.tick();
  }

  current(){
    return this.tm.current();
  }

  tick(){
    const { tm } = this;
    const current = tm.current();

    this.autoDropper += 1;
    if (this.autoDropper > 60){
      current.shiftDown();
      this.autoDropper = 0;
    }
  }
}

export default Brain;
