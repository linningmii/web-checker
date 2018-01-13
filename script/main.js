import {Board, Checker, Coordinate} from './class'

const boardCanvas = document.querySelector('#board')

const ctx = boardCanvas.getContext('2d')

const board = new Board(ctx)
board.generate('red')

new Array(13).fill('666').forEach((item, xIndex) => {
  new Array(13).fill('666').forEach((item, yIndex) => {
    const x = xIndex - 6
    const y = yIndex - 6

    let checker
    if (x === 0 && y === 0) {
      checker = new Checker(board, 'red')
    } else {
      checker = new Checker(board, 'green')
    }

    const coordinate = new Coordinate(x, y)
    checker.drop(coordinate)
  })
})
