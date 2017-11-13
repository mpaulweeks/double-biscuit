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

it('Grid attack puts blanks in the same column', () => {
  const g = new Grid();
  g.attack(3);

  let missingCols = [];
  for (let row = 0; row < 3; row++){
    for (let col = 0; col < g.width(); col++){
      if (g.get(row, col) === null){
        missingCols.push(col);
      }
    }
  }
  expect(missingCols.length).toEqual(3);
  for (let mc of missingCols){
    expect(mc).toEqual(missingCols[0]);
  }
});

it('Grid.checkRows', () => {
  const g = new Grid();
  expect(g.checkRows()).toEqual([]);

  g.attack(1);
  expect(g.checkRows()).toEqual([]);
});
