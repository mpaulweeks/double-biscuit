import { Events } from '../Constants';

import BaseBrain from './BaseBrain';
import Grid from './Grid';

const dummyListener = function(){
  return {
    register: () => {},
  };
}

class EnemyBrain extends BaseBrain {
  constructor(){
    super(dummyListener(), dummyListener(), dummyListener(), dummyListener());
    this.grid = new Grid();
    this.id = null;
  }

  setInfo(id, index){
    this.id = id;
    this.index = index;
    this.dead = false;
  }

  receiveEvent(event){
    if (event.origin === this.id){
      if (event.type === Events.GridUpdate) {
        const gs = event.value;
        this.grid = Grid.deserialize(gs);
      }
      if (event.type === Events.Death) {
        this.dead = true;
      }
    }
  }
}

export default EnemyBrain;
