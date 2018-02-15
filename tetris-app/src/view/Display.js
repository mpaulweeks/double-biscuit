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

  tryDrawDead(){
    const { canvas, ctx, brain } = this;
    if (brain.dead){
      const deadStyle = "rgba(0,0,0,0.5)";
      ctx.fillStyle = deadStyle;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      const fontSize = canvas.height/5;
      ctx.font = `bold ${fontSize}px Impact`;
      ctx.fillStyle = "white";
      ctx.fillText("GAME", 10, canvas.height/2 - fontSize*1/4, canvas.width - 20);
      ctx.fillText("OVER", 10, canvas.height/2 + fontSize*3/4, canvas.width - 20);
    }
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

class TetroDisplay extends BaseDisplay {
  constructor($canvas, brain, getTetroFunc){
    super($canvas, brain);
    this.getTetroFunc = getTetroFunc;
  }

  draw(){
    const { canvas, ctx, brain } = this;
    const blocksWide = 5;
    const { cellWidth } = this.cellDimensions(blocksWide);

    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const upcomingTetro = this.getTetroFunc(brain);
    if (upcomingTetro){
      const adjustedBlocks = upcomingTetro.spawn.map(b => {
        // assuming display is 5x3
        const adjustedBlock = b.clone();
        adjustedBlock.shift(2, 1.5);
        if (upcomingTetro.meta().type === 'Line'){
          adjustedBlock.shift(-0.5, -0.5);
        }
        if (upcomingTetro.meta().type === 'Square'){
          adjustedBlock.shift(0.5, 0);
        }
        return adjustedBlock;
      });

      ctx.strokeStyle = "black";
      const buffer = Math.floor(cellWidth / 15);
      for (let fallingBlock of adjustedBlocks){
        this.drawBlock(blocksWide, fallingBlock, fallingBlock.meta().color, buffer);
      }
    }
  }
}

class EnemyDisplay extends BaseDisplay {
  draw(){
    const { canvas, ctx, brain } = this;
    const blocksWide = brain.grid.width();

    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = "black";
    for (let gridBlock of brain.grid){
      this.drawBlock(blocksWide, gridBlock, gridBlock.meta().color, 2, true);
    }

    this.tryDrawDead();
  }
}

class GridDisplay extends BaseDisplay {
  constructor($canvas, brain, incomingAttackCallback){
    super($canvas, brain);
    this.incomingAttackCallback = incomingAttackCallback;

    this.doubleBiscuit = new Image();
    this.doubleBiscuit.src = 'double_biscuit_trans.png';
  }

  draw(){
    const { canvas, ctx, brain, incomingAttackCallback } = this;
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

    // draw grid
    ctx.strokeStyle = "black";
    for (let gridBlock of brain.grid){
      this.drawBlock(blocksWide, gridBlock, gridBlock.meta().color, 2);
    }

    // draw falling
    if (rowsFilled.length === 0){
      ctx.strokeStyle = "white";
    } else {
      // dont draw white outline while animating clear
      ctx.strokeStyle = "black";
    }
    for (let fallingBlock of brain.tm.ghost()){
      this.drawBlock(blocksWide, fallingBlock, 'rgba(0, 0, 0, 0)', 0);
    }
    for (let fallingBlock of this.brain.current()){
      this.drawBlock(blocksWide, fallingBlock, fallingBlock.meta().color, 4);
    }

    // drawing clear
    const clearGradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
    Rainbow.applyGradient(clearGradient, this.animationTimer);
    ctx.fillStyle = clearGradient;
    const floor = canvas.height;
    for (let row of rowsFilled){
      const xStart = 0;
      const yStart = floor - (cellHeight * (row + 1));
      ctx.fillRect(
        xStart,
        yStart,
        canvas.width,
        cellHeight
      );
    }
    if (rowsFilled.length === 2 && this.animationTimer < 5){
      ctx.drawImage(
        this.doubleBiscuit,
        canvas.width / 4,
        floor - cellHeight*rowsFilled.length,
        canvas.width / 2,
        cellHeight*rowsFilled.length
      );
    }

    this.tryDrawDead();

    // updating attack message
    if (brain.getTotalPendingAttacks() > 0){
      incomingAttackCallback(true);
    } else {
      incomingAttackCallback(false);
    }
  }
}

export {
  GridDisplay,
  EnemyDisplay,
  TetroDisplay,
};
