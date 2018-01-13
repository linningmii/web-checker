import Board from './board'
import Coordinate from './coordinate'
import BizException from './bizException'

const _board = Symbol('_board')
const _isDropped = Symbol('_isDropped')

/**
 * 棋子
 *
 * 默认棋子的半径是棋盘半径的1/30
 */
export default class Checker {
  constructor (board, backgroundColor) {
    if (!board instanceof Board) {
      throw new TypeError('Not a valid 2D canvas context')
    }

    this[_board] = board
    this.backgroundColor = backgroundColor
    this.element = board.canvasContext.canvas
    this.canvasContext = board.canvasContext
    this.radius = board.width / 60 / 2
    this[_isDropped] = false
  }

  get board () {
    return this[_board]
  }

  /**
   * 落子
   *
   * @param coordinate: Coordinate
   */
  drop (coordinate) {
    if (!coordinate instanceof Coordinate) {
      throw new TypeError('Not a valid position')
    }

    if (this.isDropped) {
      throw new BizException('The checker is already drop on the board')
    }

    const ctx = this.canvasContext

    const position = this.board.position(coordinate)

    ctx.beginPath()
    ctx.arc(position.x, position.y, this.radius, 0, 2 * Math.PI, false)
    ctx.fillStyle = this.backgroundColor
    ctx.fill()

    this[_isDropped] = true
  }

  get isDropped () {
    return this[_isDropped]
  }
}