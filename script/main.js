import {Board, Checker} from './class'

const boardCanvas = document.querySelector('#board')

const ctx = boardCanvas.getContext('2d')

const board = new Board(ctx)
const checker = new Checker(board)
board.generate('red')
checker.drop('green')