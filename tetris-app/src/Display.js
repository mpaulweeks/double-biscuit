

const loopFunction = function(state, func){
  if (state.continue){
    const nextLoop = function(){
      loopFunction(state, func);
    }
    state.raf = window.requestAnimationFrame(nextLoop);
    try {
      func();
    }
    catch (e) {
      // debugging
      state.continue = false;
      throw e;
    }
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
    this.animationTimer = 0;
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

  drawBlock(b){
    if (b){
      const { canvas, ctx, brain } = this;
      const cellWidth = Math.floor(canvas.width / brain.grid.width());
      const cellHeight = Math.floor(canvas.height / brain.grid.height());
      const floor = canvas.height;
      const buffer = 3;

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

  draw(){
    const { canvas, ctx, brain } = this;

    if (this.animationTimer > 0){
      this.animationTimer -= 1;
    } else {
      const { pieceWasSet } = brain.tick();
      if (pieceWasSet){
        this.animationTimer = 15;
      }
    }

    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = "grey";
    for (let gridBlock of brain.grid){
      this.drawBlock(gridBlock);
    }

    ctx.strokeStyle = "white";
    for (let fallingBlock of this.brain.current()){
      this.drawBlock(fallingBlock);
    }

    const rowsFilled = brain.grid.checkRows();
    for (let row of rowsFilled){
      const floor = canvas.height;
      const cellHeight = Math.floor(canvas.height / brain.grid.height());
      const xStart = 0;
      const yStart = floor - (cellHeight * (row + 1));
      ctx.fillStyle = 'rgba(200, 200, 200, 50)';
      ctx.fillRect(
        xStart,
        yStart,
        canvas.width,
        cellHeight
      );
    }
  }
  startDrawLoop(){
    this.drawState.continue = true;
    loopFunction(this.drawState, () => {
      this.draw();
    });
  }
  stopDrawLoop(){
    this.drawState.continue = false;
  }

}

export default Display;
