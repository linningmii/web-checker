import Board from './board'
import Coordinate from './coordinate'

interface Checker {
  readonly board: Board;

  drop(coordinate: Coordinate): void;
}