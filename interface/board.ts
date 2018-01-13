import Coordinate from './coordinate'

interface Board {
  element: Element;
  canvasContext: CanvasRenderingContext2D
  width: number
  height: number

  generate(): void;

  /**
   * 棋盘的坐标系规则在这个方法中实现, 根据坐标返回具体的canvas位置
   *
   * @param coordinate
   * @return {{x: number, y: number}}
   */
  position(coordinate: Coordinate): { x: number, y: number }

  isOnBoard(position: Coordinate): boolean

  newGame(): void
}