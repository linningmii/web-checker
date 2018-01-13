import Board from './board'

export default class Checker {
  constructor (board) {
    if (!board instanceof Board) {
      throw new TypeError('Not a valid 2D canvas context')
    }

    this.element = board.canvasContext.canvas
    this.canvasContext = board.canvasContext
  }

  drop(backgroundColor) {
    const ctx  = this.canvasContext

    ctx.beginPath();
    ctx.arc(0, 0, 100, 0, 2 * Math.PI, false);
    ctx.fillStyle = backgroundColor;
    ctx.fill();
  }
}