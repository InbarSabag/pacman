'use strict'
const WALL = '🟫'
const FOOD = '💎'
const EMPTY = ' '
const POWER_FOOD = '👑'
const CHERRY = '🍒'


var gFoodCounter
var gBoard
var gIsSuperPower = false
var gElModal = document.querySelector('.modal')
var gElMsg = document.querySelector('.msg')

const SIZE = 10
const gGame = {
    score: 0,
    isOn: false
}

function init() {
    var startGameSound = new Audio('sound/startgame.mp3')
    startGameSound.play()
    gGame.score = 0
    gFoodCounter = (SIZE)**2 - 1
    gElModal.hidden = true
    console.log('hello')
    gBoard = buildBoard()
    createPacman(gBoard)
    createGhosts(gBoard)
    printMat(gBoard, '.board-container')
    gGame.isOn = true
}


function buildBoard() {
    const board = []
    for (var i = 0; i < SIZE; i++) {
        board.push([])
        for (var j = 0; j < SIZE; j++) {
            board[i][j] = FOOD
            if (i === 0 || i === SIZE - 1 ||
                j === 0 || j === SIZE - 1 ||
                (j === 3 && i > 4 && i < SIZE - 2)) {
                board[i][j] = WALL
                gFoodCounter--
            }
        }
    }
    board[1][1] = POWER_FOOD
    board[1][SIZE-2] = POWER_FOOD
    board[SIZE-2][1] = POWER_FOOD
    board[SIZE-2][SIZE-2] = POWER_FOOD
    return board
}

function updateScore(diff) {
    // Model
    gGame.score += diff
    //DOM
    document.querySelector('h2 span').innerText = gGame.score
}

function gameOver() {
    var gameOverSound = new Audio('sound/gameover.mp3')
    gameOverSound.play()
    console.log('Game Over')
    clearInterval(gIntervalGhosts)
    renderCell(gPacman.location, PACMAN_DED)
    gGame.isOn = false
    gElMsg.innerText ='💀 GAME OVER! 💀'
    gElModal.hidden = false
    gElModal.style.backgroundColor = 'darkred'
}

function victory() {
    var winSound = new Audio('sound/win.mp3')
    winSound.play()
    console.log('VICTORY')
    clearInterval(gIntervalGhosts)
    renderCell(gPacman.location, PACMAN_DED)
    gGame.isOn = false
    gElMsg.innerText ='🏆 VICTORY! 🏆'
    gElModal.style.backgroundColor = 'goldenrod'
    gElModal.hidden = false
}


