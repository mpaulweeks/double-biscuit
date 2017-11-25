import BaseBrain from './BaseBrain';
import Grid from './Grid';

const dummyListener = function(){
  return {
    register: () => {},
  };
}

class EnemyBrain extends BaseBrain {
  constructor(eventListener){
    super(eventListener, dummyListener(), dummyListener(), dummyListener());
    this.grid = new Grid();
    this.id = null;
  }

  onEvent(event){
    if (event.origin === this.id && event.type === 'Grid'){
      const gs = event.value;
      this.grid = Grid.deserialize(gs);
    }
  }
}

export default EnemyBrain;
