import React from 'react';
import ReactDOM from 'react-dom';
import TetroShapes from './Tetromino';
import { blockToStr } from './Block.test';

const tetroToStr = function(tetro){
  return tetro.blocks.map(blockToStr).join(' ');
}

it('Line clones', () => {
  const t1 = new TetroShapes.Line();
  const t2 = t1.clone();

  expect(t1.__proto__.constructor.name).toEqual('Line');
  expect(t2.__proto__.constructor.name).toEqual('Line');
});

it('Tetromino.shift', () => {
  const t1 = new TetroShapes.Line();
  const t2 = t1.clone();

  t2.shift({dx:1, dy:2});
  expect(tetroToStr(t1)).toEqual("-1,0 0,0 1,0 2,0");
  expect(tetroToStr(t2)).toEqual("0,2 1,2 2,2 3,2");
});

it('Tetromino.rotate', () => {
  const t1 = new TetroShapes.KnightOne();
  const t2 = t1.clone();

  t2.rotate();
  expect(tetroToStr(t1)).toEqual("-1,-1 -1,0 0,0 1,0");
  expect(tetroToStr(t2)).toEqual("-1,1 0,1 0,0 0,-1");
});

it('Tetromino.rotate comes full circle', () => {
  const t1 = new TetroShapes.KnightOne();
  const t2 = t1.clone();

  t2.rotate();
  expect(tetroToStr(t1)).not.toEqual(tetroToStr(t2));
  t2.rotate();
  expect(tetroToStr(t1)).not.toEqual(tetroToStr(t2));
  t2.rotate();
  expect(tetroToStr(t1)).not.toEqual(tetroToStr(t2));
  t2.rotate();
  expect(tetroToStr(t1)).toEqual(tetroToStr(t2));
});

it('Tetromino.iterator', () => {
  const tetro = new TetroShapes.Cross();
  let iteratedBlocks = [];
  for (let b of tetro){
    iteratedBlocks.push(b);
  }
  const iteratedPoints = iteratedBlocks.map(blockToStr).join(' ');

  expect(tetroToStr(tetro)).toEqual(iteratedPoints);
});

it('Square.rotate does nothing', () => {
  const t1 = new TetroShapes.Square();
  const t2 = t1.clone();

  t2.rotate();
  expect(tetroToStr(t1)).toEqual(tetroToStr(t2));
});
