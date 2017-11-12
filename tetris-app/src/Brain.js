
class Block{
  constructor(row, col, color){
    this.row = row;
    this.col = col;
    this.color = color;
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
  }
}

export default Brain;
