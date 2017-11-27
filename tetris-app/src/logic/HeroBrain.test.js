import HeroBrain from './HeroBrain';
import { Events } from '../Constants';

class MockListener {
  register(){}
}
const mockListener = new MockListener();

it('HeroBrain.getTotalPendingAttacks', () => {
  const b = new HeroBrain(mockListener, mockListener, mockListener);
  expect(b.getTotalPendingAttacks()).toEqual(0);

  b.onEvent({type: Events.Attack, value: 2});
  expect(b.getTotalPendingAttacks()).toEqual(2);

  b.processAttacks();
  expect(b.getTotalPendingAttacks()).toEqual(0);

  b.onEvent({type: Events.Attack, value: 3});
  b.onEvent({type: Events.Attack, value: 5});
  expect(b.getTotalPendingAttacks()).toEqual(8);
});
