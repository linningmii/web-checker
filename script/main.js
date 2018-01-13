import {Board, Checker, Coordinate} from './class'

const boardCanvas = document.querySelector('#board')

const ctx = boardCanvas.getContext('2d')

const board = new Board(ctx)
const checker = new Checker(board, 'green')
board.generate('red')

const testCoordinate = new Coordinate(0, 0)
const testCoordinate1 = new Coordinate(0, 1)
const testCoordinate2 = new Coordinate(1, 1)
checker.drop(testCoordinate)
checker.drop(testCoordinate1)
checker.drop(testCoordinate2)