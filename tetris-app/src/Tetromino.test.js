import React from 'react';
import ReactDOM from 'react-dom';
import { TetroShapes } from './Tetromino';
import { blockToPoints } from './Block.test';

const tetroToPoints = function(tetro){
  return tetro.blocks.map(blockToPoints).join(' ');
}

it('Tetromino shifts', () => {
  const k1 = new TetroShapes.Line();
  const k2 = k1.clone();
  k2.shift({dx:1, dy:2});

  expect(tetroToPoints(k1)).toEqual("-1,0 0,0 1,0 2,0");
  expect(tetroToPoints(k2)).toEqual("0,2 1,2 2,2 3,2");
});

it('Tetromino rotates', () => {
  const k1 = new TetroShapes.KnightOne();
  const k2 = k1.clone();
  k2.rotate();

  expect(tetroToPoints(k1)).toEqual("-1,-1 -1,0 0,0 1,0");
  expect(tetroToPoints(k2)).toEqual("-1,1 0,1 0,0 0,-1");
});
