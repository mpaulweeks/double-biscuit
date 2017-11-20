import Grid from './Grid';
import { Block } from './Block';

const fillRow = function(grid, row){
  for (let col = 0; col < grid.width(); col++){
    const block = new Block({x: col, y: row}, 'testColor');
    grid.setBlock(block);
  }
}

it('Grid.attack with numRows: 0 does nothing', () => {
  const g = new Grid();
  const expected = g.serialize();
  g.attack(0);
  const actual = g.serialize();

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
  var before = g.serialize();

  g.attack(1);
  g.removeRows([0]);
  expect(before).toEqual(g.serialize());

  g.attack(2);
  g.removeRows([0, 1]);
  expect(before).toEqual(g.serialize());

  g.attack(1);
  g.attack(2);
  g.attack(3);
  g.removeRows([0, 1, 2, 3, 4, 5]);
  expect(before).toEqual(g.serialize());
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
  let empty = g.serialize();
  let count = g.removeRows([]);
  expect(count).toEqual(0);
  expect(empty).toEqual(g.serialize());

  count = g.removeRows([0, 1, 2]);
  expect(count).toEqual(3);
  expect(empty).toEqual(g.serialize());

  fillRow(g, 1);
  let oneRow = g.serialize();

  count = g.removeRows([]);
  expect(count).toEqual(0);
  expect(oneRow).toEqual(g.serialize());

  count = g.removeRows([2, 3, 4]);
  expect(count).toEqual(3);
  expect(oneRow).toEqual(g.serialize());

  fillRow(g, 2);
  count = g.removeRows([2]);
  expect(count).toEqual(1);
  expect(oneRow).toEqual(g.serialize());

  fillRow(g, 6);
  fillRow(g, 8);
  count = g.removeRows([6, 8]);
  expect(count).toEqual(2);
  expect(oneRow).toEqual(g.serialize());
});

it('Grid.serialize', () => {
  const g0 = new Grid();
  expect(g0.serialize()).toEqual('');

  const g1 = new Grid();
  fillRow(g1, 1);
  const g2 = new Grid();
  fillRow(g2, 2);
  const g3 = new Grid();
  fillRow(g3, 1);

  expect(g1.serialize()).not.toEqual(g0.serialize());
  expect(g1.serialize()).not.toEqual(g2.serialize());
  expect(g1.serialize()).toEqual(g3.serialize());
});

it('Grid.deserialize', () => {
  const g = new Grid();
  g.attack(3);
  const gs = g.serialize();
  const gsds = Grid.deserialize(gs).serialize();

  expect(gs).toEqual(gsds);
});
