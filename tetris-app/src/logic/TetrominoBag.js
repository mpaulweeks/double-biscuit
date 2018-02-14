import TetroShapes from './Tetromino';

const ctors = [
  () => new TetroShapes.Line(),
  () => new TetroShapes.Square(),
  () => new TetroShapes.Cross(),
  () => new TetroShapes.KnightOne(),
  () => new TetroShapes.KnightTwo(),
  () => new TetroShapes.ZedOne(),
  () => new TetroShapes.ZedTwo(),
]

/**
 * https://stackoverflow.com/a/6274381
 * Shuffles array in place. ES6 version
 * @param {Array} a items An array containing the items.
 */
function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

class TetrominoBag {
  // http://tetris.wikia.com/wiki/Random_Generator
  constructor(){
    this.bag = [];
  }
  next(){
    if(this.bag.length === 0){
      const oneOfEvery = ctors.map(func => func());
      this.bag = shuffle(oneOfEvery);
    }
    return this.bag.pop();
  }
}

export default TetrominoBag;
