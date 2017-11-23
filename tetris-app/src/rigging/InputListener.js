
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

class _InputListener extends _BaseInputListener {
  constructor(){
    super();

    const self = this;
    document.addEventListener('keydown', event => {
      console.log(event);
      self.broadcast('KeyDown', event);
    });
    document.addEventListener('keyup', event => {
      self.broadcast('KeyUp', event);
    });
  }
}
const InputListener = new _InputListener();

class TouchListener extends _BaseInputListener {
  constructor($canvas){
    super();
    this.canvas = $canvas;

    const self = this;
    this.canvas.addEventListener("touchend", touchEvent => {
      const event = self.convertTouchToButton(touchEvent);
      self.broadcast('Touch', event);
    }, false);
  }
  convertTouchToButton(touchEvent){
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
      var slope = height/width;
      var f = function(x){
        return -1*slope*x + height;
      }
      var g = function(x){
        return slope*x;
      }
      var possible = {
        ArrowUp: true,
        Space: true,
        ArrowLeft: true,
        ArrowRight: true
      };
      if(f(touchX) > touchY){
        possible.Space = false;
        possible.ArrowRight = false;
      } else {
        possible.ArrowUp = false;
        possible.ArrowLeft = false;
      }
      if(g(touchX) > touchY){
        possible.Space = false;
        possible.ArrowLeft = false;
      } else {
        possible.ArrowUp = false;
        possible.ArrowRight = false;
      }
      // brain.latestPossible = possible;
      for(var dir in possible){
        if(possible[dir]){
          return {code: dir};
        }
      }
    }
  }
}


export {
  InputListener,
  TouchListener,
}
