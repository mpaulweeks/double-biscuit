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
  shift(dx, dy){
    this.col += dx;
    this.row += dy;
  }

  rotateAround(origin){
    const dx = origin.col - this.col;
    const dy = origin.row - this.row;
    this.col += dx - dy;
    this.row += dy + dx;
  }
}

export {
  Block,
  FallingBlock,
}