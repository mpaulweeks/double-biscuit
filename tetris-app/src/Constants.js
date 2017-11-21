// file must have no dependencies

const Attack = {id: 0, type: 'Attack', color: 'grey'};
const Line = {id: 1, type: 'Line', color: 'pink'};
const Square = {id: 2, type: 'Square', color: 'yellow'};
const Cross = {id: 3, type: 'Cross', color: 'red'};
const KnightOne = {id: 4, type: 'KnightOne', color: 'purple'};
const KnightTwo = {id: 5, type: 'KnightTwo', color: 'orange'};
const ZedOne = {id: 6, type: 'ZedOne', color: 'green'};
const ZedTwo = {id: 7, type: 'ZedTwo', color: 'blue'};

const _Tetros = [
  Attack,
  Line,
  Square,
  Cross,
  KnightOne,
  KnightTwo,
  ZedOne,
  ZedTwo,
];

const _TetrosById = _Tetros.reduce((map, tetro) => {
  map[tetro.id] = tetro;
  return map;
}, {});

const _TetrosByType = _Tetros.reduce((map, tetro) => {
  map[tetro.type] = tetro;
  return map;
}, {});

const TetroById = function(id){
  return _TetrosById[id];
}

const TetroByType = function(type){
  return _TetrosByType[type];
}

const BGM = {
  TypeA: 'type_a.mp3',
}

const SFX = {
  PieceSet: 'tenderness.wav',
  Clear1: 'double_mischief.wav',
}

const Errors = {
  Overlap: 'overlap',
  OutOfBounds: 'out of bounds',
};

const Cookies = {
  MuteBGM: 'mute_bgm',
  MuteSFX: 'mute_sfx',
};

export {
  TetroById,
  TetroByType,
  BGM,
  SFX,
  Errors,
  Cookies,
}
