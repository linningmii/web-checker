import Coordinate from './coordinate'
import Slot from './slot'

const _rectangles = Symbol('_rectangles')
const _slots = Symbol('_slots')

/**
 * 跳棋棋盘
 *
 * 横向13列, 纵向17行, 坐标系不是标准直角坐标系, x轴水平, x与y轴承60度夹角, 棋盘整体为正六角形
 * 以跳棋棋盘中心点为(0,0), 则x轴的范围为[-8, +8], y轴的范围为[-8, +8]
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

    /**
     * TODO 考虑使用极坐标系替换这一实现
     *
     * 落子槽位
     * 根据跳棋棋盘规律, 棋盘划分为中心6个菱形, 以x轴/y轴正方向所夹菱形为菱形1, 顺时针方向开始绘制图形
     *
     * 菱形1: x ∈ [0, 4], y ∈ [0, 4]
     * 菱形2: x ∈ [0, 8], y ∈ [-4, 0], 且x + y <= 4
     * 菱形3: x ∈ [0, 4], y ∈ [-4, 0], 且x + y >= -4
     * 菱形4: x ∈ [-4, 0], y ∈ [-4, 0]
     * 菱形5: x ∈ [-8, 0], y ∈ [0, 4], 且x + y >= -4
     * 菱形6: x ∈ [-4, 0], y ∈ [0, 8], 且x + y <= 4
     */
    this[_rectangles] = [
      {x: [0, 4], y: [0, 4]},
      {x: [0, 8], y: [-4, 0], constraint: {XPlusYLessThanOrEqualTo: 4}},
      {x: [0, 4], y: [-8, 0], constraint: {XPlusYGreaterThanOrEqualTo: -4}},
      {x: [-4, 0], y: [-4, 0]},
      {x: [-8, 0], y: [0, 4], constraint: {XPlusYGreaterThanOrEqualTo: -4}},
      {x: [-4, 0], y: [0, 8], constraint: {XPlusYLessThanOrEqualTo: 4}}
    ]

    this[_slots] = []
    // 劫持_slots队列的push方法, 剔除重复的slot实例
    // TODO 替换为极坐标系后应该不需要考虑去重这一问题
    this[_slots].push = function (slot) {
      if (!this.find(item => item.equals(slot))) {
        Array.prototype.push.call(this, slot)
      }
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

    // 绘制棋盘底图
    ctx.beginPath()
    ctx.arc(center.x, center.y, radius, 0, 2 * Math.PI, false)
    ctx.strokeStyle = borderColor
    ctx.stroke()

    // 添加棋盘落子槽位
    // TODO 考虑使用极坐标系, 通过旋转一个菱形绘制出六角星
    this[_rectangles].forEach(({x: xRange, y: yRange, constraint}) => {
      for (let x = xRange[0]; x <= xRange[1]; x++) {
        for (let y = yRange[0]; y <= yRange[1]; y++) {
          let slot

          if (constraint && constraint.XPlusYLessThanOrEqualTo !== undefined) {
            if (x + y <= constraint.XPlusYLessThanOrEqualTo) {
              slot = new Slot(this, new Coordinate(x, y))
            }
          } else if (constraint && constraint.XPlusYGreaterThanOrEqualTo) {
            if (x + y >= constraint.XPlusYGreaterThanOrEqualTo) {
              slot = new Slot(this, new Coordinate(x, y))
            }
          } else {
            slot = new Slot(this, new Coordinate(x, y))
          }

          slot && this[_slots].push(slot)
        }
      }
    })
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

    // 单位长度, 约定单位长度是棋盘宽度的1/16
    const unitLength = this.width / 16
    // 因为x轴与y轴的夹角不是直角, 所以x的实际位置随y的值的变化而变化
    let x = center.x + coordinate.y * Math.sin(Math.PI / 6) * unitLength + coordinate.x * unitLength
    let y = center.y - (coordinate.y * Math.sin(Math.PI / 3) * unitLength)

    return {x, y}
  }

  /**
   * 判断该位置是否在棋盘上
   *
   * @param coordinate: Coordinate
   * @return boolean
   */
  isOnBoard (coordinate) {
    if (coordinate.x > 8 || coordinate.x < -8) {
      return false
    }

    if (coordinate.y > 8 || coordinate.y < -8) {
      return false
    }

    // todo 复杂判断
  }

  /**
   * 开始新游戏
   *
   * @return void
   */
  newGame () {
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
}