import React from 'react';
import ReactDOM from 'react-dom';
import Grid from './Grid';
import { blockToStr } from './Block.test';

const gridToPoints = function(grid){
  let blocks = [];
  for (let b of grid){
    blocks.push(b);
  }
  return blocks.map(blockToStr).join(' ');
}

it('Grid attack with numRows: 0 does nothing', () => {
  const g = new Grid();
  const expected = gridToPoints(g);
  g.attack(0);
  const actual = gridToPoints(g);

  expect(expected).toEqual(actual);
});
