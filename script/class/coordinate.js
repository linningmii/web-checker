const _quad = Symbol('_quad')
const _x = Symbol('_x')
const _y = Symbol('_y')

export default class Coordinate {
  constructor (quad, x, y) {
    this[_quad] = quad
    this[_x] = x
    this[_y] = y
  }

  get quad () {
    return this[_quad]
  }

  get x () {
    return this[_x]
  }

  get y () {
    return this[_y]
  }
}