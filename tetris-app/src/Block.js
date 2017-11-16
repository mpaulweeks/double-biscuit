import { TetroById, TetroByType } from './Constants';

class Block{
  constructor(coord, tetroId){
    this.col = coord.x;
    this.row = coord.y;
    this.tetroId = tetroId;
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

  meta(){
    return TetroById(this.tetroId);
  }

  serialize(){
    return `${this.col},${this.row},${this.tetroId}`;
  }

  static deserialize(serialized){
    const vals = serialized.split(',').map(v => parseInt(v, 10));
    return new Block({x: vals[0], y: vals[1]}, vals[2]);
  }
}

class AttackBlock extends Block{
  constructor(coord){
    super(coord, TetroByType('Attack').id);
  }
}

class FallingBlock extends Block{
  constructor(coord, tetroId, isOrigin=false){
    super(coord, tetroId);
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
