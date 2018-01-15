import Board from './board'
import Coordinate from './coordinate'

/**
 * 棋子
 */
interface Checker {
  readonly board: Board

  /**
   * 落子
   *
   * @param {} coordinate
   */
  drop(coordinate: Coordinate): void

  move?(coordinate: Coordinate): void
}