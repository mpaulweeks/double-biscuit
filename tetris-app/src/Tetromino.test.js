import React from 'react';
import ReactDOM from 'react-dom';
import TetroShapes from './Tetromino';
import { blockToStr } from './Block.test';

const tetroToStr = function(tetro){
  return tetro.blocks.map(blockToStr).join(' ');
}

it('Line clones', () => {
  const k1 = new TetroShapes.Line();
  const k2 = k1.clone();

  expect(k1.__proto__.constructor.name).toEqual('Line');
  expect(k2.__proto__.constructor.name).toEqual('Line');
});

it('Tetromino shifts', () => {
  const k1 = new TetroShapes.Line();
  const k2 = k1.clone();
  k2.shift({dx:1, dy:2});

  expect(tetroToStr(k1)).toEqual("-1,0 0,0 1,0 2,0");
  expect(tetroToStr(k2)).toEqual("0,2 1,2 2,2 3,2");
});

it('Tetromino rotates', () => {
  const k1 = new TetroShapes.KnightOne();
  const k2 = k1.clone();
  k2.rotate();

  expect(tetroToStr(k1)).toEqual("-1,-1 -1,0 0,0 1,0");
  expect(tetroToStr(k2)).toEqual("-1,1 0,1 0,0 0,-1");
});

it('Tetromino iterates', () => {
  const tetro = new TetroShapes.Cross();
  let iteratedBlocks = [];
  for (let b of tetro){
    iteratedBlocks.push(b);
  }
  const iteratedPoints = iteratedBlocks.map(blockToStr).join(' ');

  expect(tetroToStr(tetro)).toEqual(iteratedPoints);
});
