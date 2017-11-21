
class _InputListener {
  constructor(){
    this.callbacks = [];
  }
  register(callback){
    this.callbacks.push(callback);
  }
}

const InputListener = new _InputListener();

document.addEventListener('keydown', event => {
  console.log(event);
  InputListener.callbacks.forEach(sub => {
    sub('KeyDown', event);
  });
});
document.addEventListener('keyup', event => {
  InputListener.callbacks.forEach(sub => {
    sub('KeyUp', event);
  });
});

export default InputListener;
