import Logger from '../Logging';
import { Inputs } from '../Constants';

class _BaseInputListener {
  constructor(){
    this.subscribers = [];
  }
  register(caller, callback){
    this.subscribers.push({
      caller: caller,
      callback: callback,
    });
  }
  broadcast(eventType, event){
    this.subscribers.forEach(sub => {
      sub.callback(eventType, event);
    });
  }
}

const KeyToInput = {
  'ArrowUp': Inputs.Rotate,
  'ArrowLeft': Inputs.MoveLeft,
  'ArrowRight': Inputs.MoveRight,
  'ArrowDown': Inputs.MoveDown,
  'Space': Inputs.Drop,
  'KeyS': Inputs.Swap,
  'Digit1': Inputs.Debug.Clear1,
  'Digit2': Inputs.Debug.Clear2,
  'Digit3': Inputs.Debug.Clear3,
  'Digit4': Inputs.Debug.Clear4,
  'KeyQ': Inputs.Debug.Attack1,
  'KeyW': Inputs.Debug.Attack2,
  'KeyE': Inputs.Debug.Attack3,
};

class _InputListener extends _BaseInputListener {
  constructor(){
    super();

    const self = this;
    document.addEventListener('keydown', event => {
      Logger.info(event);
      self.broadcast('KeyDown', KeyToInput[event.code]);
    });
    document.addEventListener('keyup', event => {
      self.broadcast('KeyUp', KeyToInput[event.code]);
    });
  }
}
const InputListener = new _InputListener();

class TouchListener extends _BaseInputListener {
  constructor($canvas, $swap){
    super();
    this.canvas = $canvas;

    const self = this;
    this.canvas.addEventListener("touchend", touchEvent => {
      const event = self.convertTouchToKeyPress(touchEvent);
      self.broadcast('Touch', KeyToInput[event.code]);
    });
    $swap.addEventListener("touchend", touchEvent => {
      self.broadcast('Touch', Inputs.Swap);
    });
  }
  convertTouchToKeyPress(touchEvent){
    touchEvent.preventDefault();
    if(touchEvent.changedTouches){
      touchEvent = touchEvent.changedTouches[0];
    }

    const { width, height } = this.canvas;
    const { left, top } = this.canvas.getBoundingClientRect();
    const touchX = touchEvent.clientX - left;
    const touchY = touchEvent.clientY - top;
    const isCenter = (
      touchX > width/4 &&
      touchX < width/4*3 &&
      touchY > height/4 &&
      touchY < height/4*3
    );

    if (isCenter && false){
      // do center action
    } else {
      const slope = height/width;
      const f = function(x){
        return -1*slope*x + height;
      }
      const g = function(x){
        return slope*x;
      }
      const possible = {
        Up: true,
        Down: true,
        Left: true,
        Right: true
      };
      const moves = {
        Up: Inputs.Rotate,
        Down: Inputs.ArrowDown,
        Left: Inputs.ArrowLeft,
        Right: Inputs.ArrowRight,
      };
      if(f(touchX) > touchY){
        possible.Down = false;
        possible.Right = false;
      } else {
        possible.Up = false;
        possible.Left = false;
      }
      if(g(touchX) > touchY){
        possible.Down = false;
        possible.Left = false;
      } else {
        possible.Up = false;
        possible.Right = false;
      }
      for(var dir in possible){
        if(possible[dir]){
          return moves[dir];
        }
      }
    }
  }
}

export {
  InputListener,
  TouchListener,
}
