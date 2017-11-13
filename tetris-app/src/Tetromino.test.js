import React from 'react';
import ReactDOM from 'react-dom';
import {
  Block,
  FallingBlock,
  KnightOne,
} from './Tetromino';

const blockToPoints = function(block){
  return `${block.col},${block.row}`;
}

const tetroToPoints = function(tetro){
  return tetro.blocks.map(b => {
    return `${b.col},${b.row}`;
  }).join(' ');
}

it('Block clones', () => {
  const b1 = new Block({x:2, y:1}, 'color2');
  const b2 = b1.clone();
  b1.color = 'color1';

  expect(b1.color).toEqual('color1');
  expect(b2.color).toEqual('color2');
});

it('FallingBlock clones', () => {
  const fb1 = new FallingBlock({x:2, y:1}, 'color2');
  const fb2 = fb1.clone();
  fb1.color = 'color1';

  expect(fb1.color).toEqual('color1');
  expect(fb2.color).toEqual('color2');
});

it('FallingBlock rotates', () => {
  const fb1 = new FallingBlock({x:2, y:1}, 'color2');
  const fb2 = fb1.clone();
  const origin = new Block({x:0, y:0}, 'o');
  fb2.rotateAround(origin);

  expect(blockToPoints(fb1)).toEqual("2,1");
  expect(blockToPoints(fb2)).toEqual("1,-2");
});

it('Tetromino rotates', () => {
  const k1 = new KnightOne();
  const k2 = k1.clone();
  k2.rotate();

  expect(tetroToPoints(k1)).toEqual("-1,-1 -1,0 0,0 1,0");
  expect(tetroToPoints(k2)).toEqual("-1,1 0,1 0,0 0,-1");
});
