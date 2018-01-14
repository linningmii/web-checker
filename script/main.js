import {Board} from './class'

const boardCanvas = document.querySelector('#board')

const ctx = boardCanvas.getContext('2d')

const board = new Board(ctx)
board.generate('red')

board.addEventListener('click', function (event) {
  console.log(event)
})