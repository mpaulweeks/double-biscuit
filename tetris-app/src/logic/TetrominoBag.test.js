import TetrominoBag from './TetrominoBag';

function testNext(magnitude){
  const sut = new TetrominoBag();
  const counts = {};
  for (var i = 0; i < 7*magnitude; i++){
    const newTetro = sut.next();
    counts[newTetro.type] = (counts[newTetro.type] || 0) + 1;
  }

  expect(Object.keys(counts).length).toEqual(7);
  for (var key in counts){
    const c = counts[key];
    expect(c).toEqual(magnitude);
  }
}

it('TetrominoBag.next() gives even distribution', () => {
  for (var m = 1; m <= 10; m++){
    testNext(m);
  }
});
