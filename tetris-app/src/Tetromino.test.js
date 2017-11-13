import React from 'react';
import ReactDOM from 'react-dom';
import {
  Block,
  FallingBlock,
  KnightOne,
} from './Tetromino';

it('Block', () => {
  const b1 = new Block({x:2, y:1}, 'a');
  const b2 = b1.clone();
  b1.color = 'b';
  expect(b1.color).toEqual('b');
  expect(b2.color).toEqual('a');
});

it('FallingBlock', () => {
  const fb1 = new FallingBlock({x:2, y:1}, 'a');
  const fb2 = fb1.clone();
  fb1.color = 'b';
  expect(fb1.color).toEqual('b');
  expect(fb2.color).toEqual('a');

  const fbo = new Block({x:0, y:0}, 'o');
  fb2.rotateAround(fbo);
  expect(fb1.col).toEqual(2);
  expect(fb1.row).toEqual(1);
  expect(fb2.col).toEqual(1);
  expect(fb2.row).toEqual(-2);
});

it('Tetromino', () => {
  const k1 = new KnightOne();
  const k2 = k1.clone();

  k2.rotate();

  expect(k1.blocks[0].col).toEqual(-1);
  expect(k1.blocks[0].row).toEqual(-1);
  expect(k1.blocks[1].col).toEqual(-1);
  expect(k1.blocks[1].row).toEqual(0);
  expect(k1.blocks[2].col).toEqual(0);
  expect(k1.blocks[2].row).toEqual(0);
  expect(k1.blocks[3].col).toEqual(1);
  expect(k1.blocks[3].row).toEqual(0);

  expect(k2.blocks[0].col).toEqual(-1);
  expect(k2.blocks[0].row).toEqual(1);
  expect(k2.blocks[1].col).toEqual(0);
  expect(k2.blocks[1].row).toEqual(1);
  expect(k2.blocks[2].col).toEqual(0);
  expect(k2.blocks[2].row).toEqual(0);
  expect(k2.blocks[3].col).toEqual(0);
  expect(k2.blocks[3].row).toEqual(-1);
});
