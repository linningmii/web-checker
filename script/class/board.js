import {isInteger, inRange} from '../utils'

import Coordinate from './coordinate'
import Slot from './slot'
import BizException from './bizException'

const _canvasContext = Symbol('_canvasContext')
const _rectangles = Symbol('_rectangles')
const _slots = Symbol('_slots')
const _isGenerated = Symbol('_isGenerated')

/**
 * 跳棋棋盘
 *
 * 横向17列, 纵向17行, 坐标系不是标准直角坐标系, x轴水平, x与y轴承60度夹角, 棋盘整体为正六角形
 * 以跳棋棋盘中心点为(0,0), 则x轴的范围为[-8, +8], y轴的范围为[-8, +8]
 */
export default class Board {
  constructor (canvasContext) {
    if (!canvasContext instanceof CanvasRenderingContext2D) {
      throw new TypeError('Not a valid 2D canvas context')
    }

    this[_canvasContext] = canvasContext

    if (this.width !== this.height) {
      throw new BizException('The canvas use for generate checker board must be squared')
    }

    this[_slots] = []
    // 劫持_slots队列的push方法, 剔除重复的slot实例
    // TODO 替换为极坐标系后应该不需要考虑去重这一问题
    this[_slots].push = function (slot) {
      if (!this.find(item => item.equals(slot))) {
        Array.prototype.push.call(this, slot)
      }
    }
  }

  get canvasContext () {
    return this[_canvasContext]
  }

  get element () {
    return this[_canvasContext].canvas
  }

  get width () {
    return this.element.width
  }

  get height () {
    return this.element.height
  }

  get radius () {
    // 默认半径为canvas元素的45%
    return this.width / 2 * 0.9
  }

  get unitLength () {
    // 单位长度, 约定单位长度是棋盘宽度的1/16
    return this.width / 16
  }

  get isGenerated () {
    return !!this[_isGenerated]
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

    // 绘制棋盘底图
    ctx.beginPath()
    ctx.arc(center.x, center.y, radius, 0, 2 * Math.PI, false)
    ctx.strokeStyle = borderColor
    ctx.stroke()

    for (let quad = 0; quad < 6; quad++) {
      for (let x = 0; x < 5; x++) {
        for (let y = 0; y < 5; y++) {
          new Slot(this, new Coordinate(quad, x, y))
        }
      }
    }

    this[_isGenerated] = true
  }

  /**
   * 棋盘的坐标系规则在这个方法中实现, 根据坐标返回具体的canvas位置
   *
   * 坐标系实现
   * 将棋盘坐标划分为6个象限
   * 每个象限为菱形, x∈[0, 4], y ∈ [0, 4]
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

    // 计算坐标距离中心点的距离
    // 每当x值加1, 水平方向上的像素位置增加 1个单位长度
    const x = center.x + coordinate.x * this.unitLength + coordinate.y * this.unitLength * Math.sin(Math.PI / 6)
    // 每当y值加1, 竖直方向上的像素位置增加 sin(π/3) * 单位长度, 水平方向上的像素位置增加 sin(π/2) * 单位长度
    const y = center.y - coordinate.y * this.unitLength * Math.sin(Math.PI / 3)

    // 根据象限旋转求出具体像素位置
    let resultPosition = {x, y}
    for (let i = 0; i <= coordinate.quad; i++) {
      resultPosition = this.clockwiseRotationToNextQuad(resultPosition)
    }

    return resultPosition
  }

  /**
   * 围绕圆心顺时针旋转到下一象限
   *
   * position: {x: number, y: number}
   */
  clockwiseRotationToNextQuad (position) {
    let {x, y} = position
    return {x, y}
  }

  /**
   * 判断该坐标是否在棋盘上
   *
   * @param coordinate: Coordinate
   * @return boolean
   */
  isOnBoard (coordinate) {
    if (!coordinate instanceof Coordinate) {
      throw new TypeError('Not a valid coordinate')
    }

    const {quad, x, y} = coordinate

    if (!isInteger(quad)) {
      return false
    }

    if (!isInteger(x)) {
      return false
    }

    if (!isInteger(y)) {
      return false
    }

    if (!inRange(quad, 6)) {
      return false
    }

    if (!inRange(x, 5)) {
      return false
    }

    if (!inRange(y, 5)) {
      return false
    }

    return true
  }

  /**
   * 添加事件监听程序, 调用方式和原生dom元素一致
   *
   * @return void
   */
  addEventListener () {
    // this.element.addEventListener.apply(Array.from(arguments))会抛出Illegal invocation异常
    HTMLElement.prototype.addEventListener.apply(this.element, Array.from(arguments))
  }

  /**
   * 移除事件监听程序, 调用方式和原生dom元素一致
   *
   * @return void
   */
  removeEventListener () {
    // this.element.removeEventListener.apply(Array.from(arguments))会抛出Illegal invocation异常
    HTMLElement.prototype.removeEventListener.apply(this.element, Array.from(arguments))
  }

  /**
   * 开始新游戏
   *
   * @return void
   */
  newGame () {
    if (!this.isGenerated) {
      throw BizException('The board must be generated before start a new game')
    }
  }
}