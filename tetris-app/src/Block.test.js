import React from 'react';
import ReactDOM from 'react-dom';
import { Block, FallingBlock } from './Block';

const blockToStr = function(block){
  if (block === null){
    return 'null';
  }
  return `${block.col},${block.row}`;
}

it('Block clones', () => {
  const b1 = new Block({x:2, y:1}, 'color2');
  const b2 = b1.clone();
  b1.color = 'color1';

  expect(b1.color).toEqual('color1');
  expect(b2.color).toEqual('color2');

  expect(b1.__proto__.constructor.name).toEqual('Block');
  expect(b2.__proto__.constructor.name).toEqual('Block');
});

it('FallingBlock clones', () => {
  const fb1 = new FallingBlock({x:2, y:1}, 'color2');
  const fb2 = fb1.clone();
  fb1.color = 'color1';

  expect(fb1.color).toEqual('color1');
  expect(fb2.color).toEqual('color2');

  expect(fb1.__proto__.constructor.name).toEqual('FallingBlock');
  expect(fb2.__proto__.constructor.name).toEqual('FallingBlock');
});

it('FallingBlock rotates', () => {
  const fb1 = new FallingBlock({x:2, y:1}, 'color2');
  const fb2 = fb1.clone();
  const origin = new Block({x:0, y:0}, 'o');
  fb2.rotateAround(origin);

  expect(blockToStr(fb1)).toEqual("2,1");
  expect(blockToStr(fb2)).toEqual("1,-2");
});

export {
  blockToStr,
}
