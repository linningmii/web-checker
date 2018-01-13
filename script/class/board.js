import Coordinate from './coordinate'

/**
 * 跳棋棋盘
 *
 * 横向13列, 纵向17行, 坐标系不是标准直角坐标系, x轴水平, x与y轴承60度夹角, 棋盘整体为正六角形
 * 以跳棋棋盘中心点为(0,0), 则x轴y轴范围均为 -6 ~ +6
 */
export default class Board {
  constructor (canvasContext) {
    if (!canvasContext instanceof CanvasRenderingContext2D) {
      throw new TypeError('Not a valid 2D canvas context')
    }

    this.element = canvasContext.canvas
    this.canvasContext = canvasContext
    this.width = this.element.width
    this.height = this.element.height

    if (this.width !== this.height) {
      throw new BizException('The canvas use for generate checker board must be squared')
    }
  }

  /**
   * 生成棋盘
   *
   * @param borderColor 棋盘边框
   */
  generate (borderColor) {
    const ctx = this.canvasContext

    // 棋盘中心位置
    const center = {
      x: this.width / 2,
      y: this.height / 2
    }

    // 默认半径为canvas元素的45%
    const radius = this.width / 2 * 0.9

    ctx.beginPath()
    ctx.arc(center.x, center.y, radius, 0, 2 * Math.PI, false)
    ctx.strokeStyle = borderColor
    ctx.stroke()
  }

  /**
   * 棋盘的坐标系规则在这个方法中实现, 根据坐标返回具体的canvas位置
   *
   * @param coordinate
   * @return {{x: number, y: number}}
   */
  position (coordinate) {
    if (!coordinate instanceof Coordinate) {
      throw new TypeError('Not a valid coordinate')
    }

    // 棋盘中心位置
    const center = {
      x: this.width / 2,
      y: this.height / 2
    }

    // 单位长度
    const unitLength = this.width / 15
    // 因为x轴与y轴的夹角不是直角, 所以x的实际位置随y的值的变化而变化
    let x = center.x + coordinate.y * Math.sin(Math.PI / 6) * unitLength + coordinate.x * unitLength
    let y = center.y - (coordinate.y * Math.sin(Math.PI / 3) * unitLength)

    return {x, y}
  }

  /**
   * 判断该位置是否在棋盘上
   *
   * @param position: Position
   * @return boolean
   */
  isOnBoard (position) {
    return true
  }

  /**
   * 开始新游戏
   *
   * @return void
   */
  newGame () {
  }
}