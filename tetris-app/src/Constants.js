// file must have no dependencies

const Attack = {id: 0, type: 'Attack', color: 'grey'};
// http://tetris.wikia.com/wiki/Tetris_Guideline
const Line = {id: 1, type: 'Line', color: 'cyan'};
const Square = {id: 2, type: 'Square', color: 'yellow'};
const Cross = {id: 3, type: 'Cross', color: 'purple'};
const KnightOne = {id: 4, type: 'KnightOne', color: 'orange'};
const KnightTwo = {id: 5, type: 'KnightTwo', color: 'blue'};
const ZedOne = {id: 6, type: 'ZedOne', color: 'green'};
const ZedTwo = {id: 7, type: 'ZedTwo', color: 'red'};

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
  Gumball: 'gumball_machine.mp3',
  Unity: 'thefatrat_unity.mp3',
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

const Events = {
  Attack: 'attack',
  GridUpdate: 'grid_update',
  Lobby: {
    Waiting: 'lobby_waiting',
    Ready: 'lobby_ready',
  },
};

const Inputs = {
  MoveLeft: 'move_left',
  MoveRight: 'move_right',
  MoveDown: 'move_down',
  Drop: 'move_drop',
  Rotate: 'rotate',
  Swap: 'swap',
  Debug: {
    Attack1: 'debug_attack_1',
    Attack2: 'debug_attack_2',
    Attack3: 'debug_attack_3',
    Clear1: 'debug_clear_1',
    Clear2: 'debug_clear_2',
    Clear3: 'debug_clear_3',
    Clear4: 'debug_clear_4',
  },
};

export {
  TetroById,
  TetroByType,
  BGM,
  SFX,
  Inputs,
  Errors,
  Events,
  Cookies,
}
