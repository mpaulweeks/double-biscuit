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

  receiveEvent(event){
    if (event.origin === this.id && event.type === Events.GridUpdate){
      const gs = event.value;
      this.grid = Grid.deserialize(gs);
    }
  }
}

export default EnemyBrain;
