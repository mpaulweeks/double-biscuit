import React from 'react';
import ReactDOM from 'react-dom';
import {
  Block,
  FallingBlock,
} from './Tetromino';

it('clones Block', () => {
  const b1 = new Block(1, 2, 'a');
  const b2 = b1.clone();
  b1.color = 'b';
  expect(b1.color).toEqual('b');
  expect(b2.color).toEqual('a');
});

it('clones FallingBlock', () => {
  const fb1 = new FallingBlock(1, 2, 'a');
  const fb2 = fb1.clone();
  fb1.color = 'b';
  expect(fb1.color).toEqual('b');
  expect(fb2.color).toEqual('a');

  const fbo = new Block(0, 0, 'o');
  fb2.rotateAround(fbo);
  expect(fb1.row).toEqual(1);
  expect(fb1.col).toEqual(2);
  expect(fb2.row).toEqual(-2);
  expect(fb2.col).toEqual(1);
});
