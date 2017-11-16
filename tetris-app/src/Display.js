import Rainbow from './Rainbow';

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

class BaseDisplay{
  constructor($canvas, brain){
    this.canvas = $canvas;
    this.ensureCanvasSettings();
    this.ctx = this.canvas.getContext('2d');
    this.brain = brain;

    this.drawState = {
      continue: false,
    }
    this.animationTimer = 0;
  }

  ensureCanvasSettings(){
    const $canvas = this.canvas;

    var canvasW = $canvas.offsetWidth;
    var canvasH = $canvas.offsetHeight;

    // only set on change, setting clears the canvas and introduces jaggies
    if (canvasW !== $canvas.width)
      $canvas.width = canvasW;
    if (canvasH !== $canvas.height)
      $canvas.height = canvasH;
  }

  cellDimensions(blocksWide){
    const cellWidth = Math.floor(this.canvas.width / blocksWide);
    return {
      cellWidth,
      cellHeight: cellWidth,
    }
  }

  drawBlock(blocksWide, block, color, buffer){
    const { canvas, ctx } = this;
    const { cellWidth, cellHeight } = this.cellDimensions(blocksWide);

    const floor = canvas.height;

    const xStart = cellWidth * block.col;
    const yStart = floor - (cellHeight * (block.row + 1));

    ctx.fillStyle = color;
    ctx.fillRect(
      buffer + xStart,
      buffer + yStart,
      cellWidth - buffer*2,
      cellHeight - buffer*2
    );

    ctx.strokeRect(
      xStart,
      yStart,
      cellWidth,
      cellHeight
    );
  }

  startDrawLoop(){
    this.drawState.continue = true;
    loopFunction(this.drawState, () => {
      this.ensureCanvasSettings();
      this.draw();
    });
  }

  stopDrawLoop(){
    this.drawState.continue = false;
  }
}

class UpcomingDisplay extends BaseDisplay {
  constructor($canvas, brain, upcomingIndex){
    super($canvas, brain);
    this.upcomingIndex = upcomingIndex;
  }

  draw(){
    const { canvas, ctx, brain } = this;

    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const upcomingTetro = brain.tm.upcoming()[this.upcomingIndex];
    const adjustedBlocks = upcomingTetro.spawn.map(b => {
      const adjustedBlock = b.clone();
      adjustedBlock.shift(2, 2);
      if (upcomingTetro.type() === 'Line'){
        adjustedBlock.shift(-0.5, 0);
      }
      if (upcomingTetro.type() === 'Square'){
        adjustedBlock.shift(0.5, 0);
      }
      return adjustedBlock;
    });

    ctx.strokeStyle = "black";
    for (let fallingBlock of adjustedBlocks){
      this.drawBlock(5, fallingBlock, fallingBlock.color, 1);
    }
  }
}

class GridDisplay extends BaseDisplay {

  tryDrawBlock(blocksWide, block, color, buffer){
    if (block){
      this.drawBlock(blocksWide, block, color || block.color, buffer);
    }
  }

  draw(){
    const { canvas, ctx, brain } = this;
    const blocksWide = brain.grid.width();
    const { cellHeight } = this.cellDimensions(blocksWide);

    if (this.animationTimer > 0){
      this.animationTimer -= 1;
    } else {
      const { pieceWasSet } = brain.tick();
      if (pieceWasSet){
        this.animationTimer = 10;
        if (brain.grid.checkRows().length > 0){
          this.animationTimer = 30;
        }
      }
    }

    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // drawing boxes
    const rowsFilled = brain.grid.checkRows();

    ctx.strokeStyle = "black";
    for (let gridBlock of brain.grid){
      this.tryDrawBlock(blocksWide, gridBlock, null, 2);
    }

    if (rowsFilled.length === 0){
      ctx.strokeStyle = "white";
    } else {
      // dont draw white outline while animating clear
      ctx.strokeStyle = "black";
    }
    for (let fallingBlock of brain.tm.ghost()){
      this.tryDrawBlock(blocksWide, fallingBlock, 'rgba(0, 0, 0, 0)', 0);
    }
    for (let fallingBlock of this.brain.current()){
      this.tryDrawBlock(blocksWide, fallingBlock, null, 4);
    }

    // drawing clear
    const clearGradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
    Rainbow.applyGradient(clearGradient, this.animationTimer);
    ctx.fillStyle = clearGradient;
    for (let row of rowsFilled){
      const floor = canvas.height;
      const xStart = 0;
      const yStart = floor - (cellHeight * (row + 1));
      ctx.fillRect(
        xStart,
        yStart,
        canvas.width,
        cellHeight
      );
    }
  }
}

export {
  GridDisplay,
  UpcomingDisplay,
};
