'use strict'
var PACMAN = '😛'
const SUPER_PACMAN = '😈'
const PACMAN_WON = '🤑'
const PACMAN_DED = '💀'

var gPacman
function createPacman(board) {
    // TODO
    gPacman = {
        location: {
            i: 2,
            j: 2
        }
    }

    board[gPacman.location.i][gPacman.location.j] = PACMAN
}
function movePacman(ev) {
    console.log('ev:', ev)
    if (!gGame.isOn) return
    // use getNextLocation(), nextCell
    const nextLocation = getNextLocation(ev.key)
    var nextCell = gBoard[nextLocation.i][nextLocation.j]

    // return if cannot move
    if (nextCell === WALL) return

    // eat power food
    if(nextCell === POWER_FOOD){
        superMode()
    }

     if (nextCell === CHERRY) {
    updateScore(9)

    }
    // FIXME: hitting a ghost?  call gameOver
    if (nextCell === GHOST) {
        if(!gIsSuperPower){
            gameOver()
            return
        }
        else if(gIsSuperPower) {
        console.log('super')
        removeGhost(nextCell)
    }
}

    // eat food
    if (nextCell === FOOD || nextCell === POWER_FOOD || nextCell === CHERRY) {
        gFoodCounter--
        var eatSound = new Audio('sound/eat.mp3')
        eatSound.play()
        if(gFoodCounter === 0) victory()
        updateScore(1)
    }


    // DONE: moving from current position:
    // DONE: update the model
    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY
    // DONE: update the DOM
    renderCell(gPacman.location, EMPTY)

    // DONE: Move the pacman to new location
    // DONE: update the model
    gPacman.location = nextLocation // {i:2 ,j:3}
    gBoard[gPacman.location.i][gPacman.location.j] = PACMAN
    // DONE: update the DOM
    renderCell(gPacman.location, PACMAN)
}

function superMode(){
    gIsSuperPower = true
    PACMAN = SUPER_PACMAN
    setTimeout(()=>{
            gIsSuperPower = false
            PACMAN = '😛'
            reviveAll()
    },5000)

}

function getNextLocation(eventKeyboard) {

    const nextLocation = {
        i: gPacman.location.i,
        j: gPacman.location.j
    }

    switch (eventKeyboard) {
        case 'ArrowUp':
            nextLocation.i--
            break;
        case 'ArrowRight':
            nextLocation.j++
            break;
        case 'ArrowDown':
            nextLocation.i++
            break;
        case 'ArrowLeft':
            nextLocation.j--
            break;

        default:
            break;
    }
    return nextLocation
}