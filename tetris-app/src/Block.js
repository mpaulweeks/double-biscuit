class Block{
  constructor(coord, color){
    this.col = coord.x;
    this.row = coord.y;
    this.color = color;
  }

  shift(dx, dy){
    this.col += dx;
    this.row += dy;
  }

  clone(){
    // https://stackoverflow.com/a/44782052/6461842
    const newBlock = Object.create(Object.getPrototypeOf(this));
    return Object.assign(newBlock, this);
  }

  type(){
    return this.__proto__.constructor.name;
  }
}

class AttackBlock extends Block{
  constructor(coord){
    super(coord, 'grey');
  }
}

class FallingBlock extends Block{
  constructor(coord, color, isOrigin=false){
    super(coord, color);
    this.isOrigin = isOrigin;
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
  AttackBlock,
  FallingBlock,
}
