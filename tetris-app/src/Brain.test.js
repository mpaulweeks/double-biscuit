import Brain from './Brain';

it('Brain.getTotalPendingAttacks', () => {
  const b = new Brain();
  expect(b.getTotalPendingAttacks()).toEqual(0);

  b.onEvent({type: 'Attack', value: 2});
  expect(b.getTotalPendingAttacks()).toEqual(2);

  b.processAttacks();
  expect(b.getTotalPendingAttacks()).toEqual(0);

  b.onEvent({type: 'Attack', value: 3});
  b.onEvent({type: 'Attack', value: 5});
  expect(b.getTotalPendingAttacks()).toEqual(8);
});
