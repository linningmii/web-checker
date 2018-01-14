import Coordinate from './coordinate'

export default class Slot {
  constructor (board, coordinate, borderColor = 'black') {
    if (!coordinate instanceof Coordinate) {
      throw new TypeError('Not a valid coordinate')
    }

    const ctx = board.canvasContext
    const position = board.position(coordinate)

    // 默认半径为canvas元素的45%
    const radius = board.width / 60 / 2

    ctx.beginPath()
    ctx.arc(position.x, position.y, radius, 0, 2 * Math.PI, false)
    ctx.strokeStyle = borderColor
    ctx.stroke()
  }
}