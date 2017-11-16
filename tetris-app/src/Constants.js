
const _Tetros = [
  {id: 0, type: 'Attack', color: 'grey'},
  {id: 1, type: 'Line', color: 'pink'},
  {id: 2, type: 'Square', color: 'yellow'},
  {id: 3, type: 'Cross', color: 'red'},
  {id: 4, type: 'KnightOne', color: 'purple'},
  {id: 5, type: 'KnightTwo', color: 'orange'},
  {id: 6, type: 'ZedOne', color: 'green'},
  {id: 7, type: 'ZedTwo', color: 'blue'},
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

export {
  TetroById,
  TetroByType,
}
