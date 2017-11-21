import BaseBrain from './BaseBrain';
import Grid from './Grid';

class EnemyBrain extends BaseBrain {
  constructor(...args){
    super(...args);
    this.grid = new Grid();
  }

  onEvent(event){
    if (event.type === 'Grid'){
      const gs = event.value;
      this.grid = Grid.deserialize(gs);
    }
  }
}

export default EnemyBrain;
