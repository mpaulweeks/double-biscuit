import React from 'react';
import ReactDOM from 'react-dom';
import Grid from './Grid';
import { Block } from './Block';
import { blockToStr } from './Block.test';

const gridToStr = function(grid){
  let blocks = [];
  for (let b of grid){
    blocks.push(b);
  }
  return blocks.map(blockToStr).join(' ');
}

const fillRow = function(grid, row){
  for (let col = 0; col < grid.width(); col++){
    const block = new Block({x: col, y: row}, 'testColor');
    grid.setBlock(block);
  }
}

it('Grid.attack with numRows: 0 does nothing', () => {
  const g = new Grid();
  const expected = gridToStr(g);
  g.attack(0);
  const actual = gridToStr(g);

  expect(expected).toEqual(actual);
});

it('Grid.attack puts blanks in the same column', () => {
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

it('Grid.attack shifts existing blocks', () => {
  const g = new Grid();
  fillRow(g, 0);
  fillRow(g, 2);
  var before = gridToStr(g);

  g.attack(1);
  g.removeRows([0]);
  expect(before).toEqual(gridToStr(g));

  g.attack(2);
  g.removeRows([0, 1]);
  expect(before).toEqual(gridToStr(g));

  g.attack(1);
  g.attack(2);
  g.attack(3);
  g.removeRows([0, 1, 2, 3, 4, 5]);
  expect(before).toEqual(gridToStr(g));
});

it('Grid.checkRows', () => {
  const g = new Grid();
  expect(g.checkRows()).toEqual([]);

  g.attack(1);
  expect(g.checkRows()).toEqual([]);

  fillRow(g, 5);
  expect(g.checkRows()).toEqual([5]);

  fillRow(g, 7);
  fillRow(g, 8);
  expect(g.checkRows()).toEqual([5,7,8]);
});

it('Grid.removeRows', () => {
  const g = new Grid();
  let empty = gridToStr(g);
  g.removeRows([]);
  expect(empty).toEqual(gridToStr(g));

  g.removeRows([0, 1, 2]);
  expect(empty).toEqual(gridToStr(g));

  fillRow(g, 1);
  let oneRow = gridToStr(g);

  g.removeRows([]);
  expect(oneRow).toEqual(gridToStr(g));

  g.removeRows([2, 3, 4]);
  expect(oneRow).toEqual(gridToStr(g));

  fillRow(g, 2);
  g.removeRows([2]);
  expect(oneRow).toEqual(gridToStr(g));

  fillRow(g, 6);
  fillRow(g, 8);
  g.removeRows([6, 8]);
  expect(oneRow).toEqual(gridToStr(g));
});
