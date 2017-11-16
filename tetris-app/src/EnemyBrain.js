import Grid from './Grid';

class EnemyBrain {
  constructor(){
    this.grid = new Grid();
  }

  onEvent(event){
    if (event.type === 'Grid'){
      const gs = event.value;
      this.grid = Grid.deserialize(gs);
    }
  }
  onInput(){
    // do nothing
  }
  registerEventListener(eventListener){
    this.eventListener = eventListener;
    this.eventListener.register(this, e => this.onEvent(e));
  }
}

export default EnemyBrain;
