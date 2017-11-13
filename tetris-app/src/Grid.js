import { AttackBlock } from './Block';
import Errors from './Errors';

class Grid{
  constructor(){
    this._width = 10;
    this._height = 35;
    this._matrix = [];
    for (var row = 0; row < this._height; row++){
      this._matrix[row] = [];
      for (var col = 0; col < this._width; col++){
        this._matrix[row][col] = null;
      }
    }
  }

  get(row, col){
    if (row < 0 || row >= this._height){
      return Errors.OutOfBounds;
    }
    if (col < 0 || col >= this._width){
      return Errors.OutOfBounds;
    }
    return this._matrix[row][col];
  }
  setBlock(b){
    this._matrix[b.row][b.col] = b;
  }

  attack(numRows){
    let newGrid = [];
    for (var row = 0; row < this._height; row++){
      newGrid[row] = [];
      for (var col = 0; col < this._width; col++){
        if (row < numRows){
          newGrid[row][col] = new AttackBlock({x:col, y:row});
        } else {
          newGrid[row][col] = this._matrix[row+numRows][col];
        }
      }
    }
    this._matrix = newGrid;
  }

  checkRows(){
    var rowsFilled = [];
    for (var row = 0; row < this._height; row++){
      var colsFilled = 0;
      for (var col = 0; col < this._width; col++){
        if (this._matrix[row][col]){
          colsFilled += 1;
        }
      }
      if (colsFilled === this._width){
        rowsFilled.push(row);
      }
    }
    return rowsFilled;
  }

  removeRows(){
    const rows = this.checkRows();

    const descendingRows = rows.slice().reverse();
    descendingRows.forEach(clearRow => {
      let row;
      let col;
      for (row = clearRow + 1; row < this._height; row++){
        for (col = 0; col < this._width; col++){
          const b = this._matrix[row][col];
          if (b){
            b.row -= 1;
          }
        }
      }
      this._matrix.splice(clearRow, 1);
      row = this._height - 1;
      this._matrix[row] = [];
      for (col = 0; col < this._width; col++){
        this._matrix[row][col] = null;
      }
    });
  }

  width(){
    return this._width;
  }
  height(){
    // grid goes higher than display/tetroManager thinks
    return 22;
  }
  *[Symbol.iterator](){
    for (var row = 0; row < this._height; row++){
      for (var col = 0; col < this._width; col++){
        yield this._matrix[row][col];
      }
    }
  }
}

export default Grid;
