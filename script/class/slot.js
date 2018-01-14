import Coordinate from './coordinate'

const _board = Symbol('_board')
const _coordinate = Symbol('_coordinate')

export default class Slot {
  constructor (board, coordinate, borderColor = 'black') {
    if (!coordinate instanceof Coordinate) {
      throw new TypeError('Not a valid coordinate')
    }

    this[_board] = board
    this[_coordinate] = coordinate

    const ctx = board.canvasContext
    const position = board.position(coordinate)

    // 默认半径为canvas元素的45%
    const radius = board.width / 60 / 2

    ctx.beginPath()
    ctx.arc(position.x, position.y, radius, 0, 2 * Math.PI, false)
    ctx.strokeStyle = borderColor
    ctx.stroke()
  }

  get board () {
    return this[_board]
  }

  get coordinate () {
    return this[_coordinate]
  }

  /**
   * 比较两个slot是否在同一位置
   *
   * @param slot
   * @return Boolean
   */
  equals(slot) {
    return this.board === slot.board && this.coordinate.x === slot.coordinate.x && this.coordinate.y === slot.coordinate.y
  }
}