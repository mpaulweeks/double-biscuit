import { Block, FallingBlock } from './Block';

it('Block.serialize', () => {
  const b1 = new Block({x:2, y:1}, 1);
  const b2 = new Block({x:2, y:1}, 2);
  const b3 = new Block({x:2, y:1}, 1);

  expect(b1.serialize()).not.toEqual(b2.serialize());
  expect(b1.serialize()).toEqual(b3.serialize());
});

it('Block.deserialize', () => {
  const b = new Block({x:2, y:1}, 1);
  const bs = b.serialize();
  const bsds = Block.deserialize(bs).serialize();

  expect(bs).toEqual(bsds);
});

it('FallingBlock rotates', () => {
  const fb1 = new FallingBlock({x:2, y:1}, 2);
  const fb2 = fb1.clone();
  const origin = new Block({x:0, y:0}, 0);
  fb2.rotateAround(origin);

  expect(fb1.serialize()).toEqual("2,1,2");
  expect(fb2.serialize()).toEqual("1,-2,2");
});
