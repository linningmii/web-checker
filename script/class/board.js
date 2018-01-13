/**
 * 跳棋棋盘
 *
 * 横向13列, 纵向17行, 坐标系不是标准直角坐标系, x/y轴承60度夹角, 棋盘整体为正六角形
 * 以跳棋棋盘中心点为(0,0), 则x轴y轴范围均为 -6 ~ +6
 */
export default class Board {
  constructor (canvasContext) {
    if (!canvasContext instanceof CanvasRenderingContext2D) {
      throw new TypeError('Not a valid 2D canvas context')
    }

    this.element = canvasContext.canvas
    this.canvasContext = canvasContext
  }

  generate (borderColor) {
    const ctx = this.canvasContext
    const center = {
      x: this.element.width / 2,
      y: this.element.height / 2
    }
    const radius = this.element.width / 2 * 0.9

    ctx.beginPath()
    ctx.arc(center.x, center.y, radius, 0, 2 * Math.PI, false)
    ctx.strokeStyle = borderColor
    ctx.stroke()
  }
}