import Board from './board'
import Coordinate from './coordinate'

interface Slot {
  constructor(board: Board, coordinate: Coordinate)
}