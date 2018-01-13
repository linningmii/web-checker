const _x = Symbol('_x')
const _y = Symbol('_y')

export default class Coordinate {
  constructor (x, y) {
    this[_x] = x
    this[_y] = y
  }

  get x () {
    return this[_x]
  }

  get y () {
    return this[_y]
  }
}