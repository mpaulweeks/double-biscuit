
class _InputListener {
  constructor(){
    this.subscribers = [];
  }
  register(caller, callback){
    this.subscribers.push({
      caller: caller,
      callback: callback,
    });
  }
}

const InputListener = new _InputListener();

document.addEventListener('keydown', event => {
  console.log(event);
  InputListener.subscribers.forEach(sub => {
    sub.callback('KeyDown', event);
  });
});
document.addEventListener('keyup', event => {
  InputListener.subscribers.forEach(sub => {
    sub.callback('KeyUp', event);
  });
});

export default InputListener;
