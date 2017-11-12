

const loopFunction = function(state, func){
  if (state.continue){
    const nextLoop = function(){
      loopFunction(state, func);
    }
    state.raf = window.requestAnimationFrame(nextLoop);
    func();
  }
}

class Display{
  constructor(brain, $canvas){
    this.canvas = $canvas;
    this.getCanvasSettings();
    this.ctx = this.canvas.getContext('2d');

    this.brain = brain;
    this.drawState = {
      continue: false,
    }
  }

  getCanvasSettings(){
    const $canvas = this.canvas;

    var canvasW = $canvas.offsetWidth;
    var canvasH = $canvas.offsetHeight;

    // only set on change, setting clears the canvas and introduces jaggies
    if (canvasW !== $canvas.width)
      $canvas.width = canvasW;
    if (canvasH !== $canvas.height)
      $canvas.height = canvasH;
    return {
      canvasW: canvasW,
      canvasH: canvasH,
    }
  }

  draw(){
    const { canvas, ctx } = this;
    const grid = this.brain.grid;
    const cellWidth = Math.floor(canvas.width / grid.width());
    const cellHeight = Math.floor(canvas.height / grid.height());
    const floor = canvas.height;
    const buffer = 5;

    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = "white";
    for (var b of grid){
      if (b){
        const xStart = cellWidth * b.col;
        const yStart = floor - (cellHeight * (b.row + 1));

        ctx.strokeRect(
          xStart,
          yStart,
          cellWidth,
          cellHeight
        );

        ctx.fillStyle = b.color;
        ctx.fillRect(
          buffer + xStart,
          buffer + yStart,
          cellWidth - buffer*2,
          cellHeight - buffer*2
        );
      }
    }
  }
  startDrawLoop(){
    this.drawState.continue = true;
    loopFunction(this.drawState, () => this.draw());
  }
  stopDrawLoop(){
    this.drawState.continue = false;
  }

}

export default Display;
