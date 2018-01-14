import Coordinate from './coordinate'

/**
 * 棋盘
 */
interface Board {
  constructor(canvasContext: CanvasRenderingContext2D)

  element: Element;
  canvasContext: CanvasRenderingContext2D
  width: number
  height: number

  /**
   * 渲染棋盘
   */
  generate(): void;

  /**
   * 棋盘的坐标系规则在这个方法中实现, 根据坐标返回具体的canvas位置
   *
   * @param coordinate
   * @return {{x: number, y: number}}
   */
  position(coordinate: Coordinate): { x: number, y: number }

  /**
   * 判断该坐标是否落在棋盘范围内
   *
   * @param {} coordinate
   * @return {boolean}
   */
  isOnBoard(coordinate: Coordinate): boolean

  /**
   * 开始游戏
   */
  newGame(): void
}