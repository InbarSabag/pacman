'use strict'
const GHOST = '&#9781'
var gGhosts = []
var gDedGhosts = []
var gIntervalGhosts

function createGhost(board, idx) {
    var ghost = {
        location: {
            i: 2 + idx,
            j: 6
        },
        color: getRandomColor(),
        currCellContent: FOOD
    }

    gGhosts.push(ghost)
    board[ghost.location.i][ghost.location.j] = GHOST
}

function createGhosts(board) {
    gGhosts = []
    // 3 ghosts and an interval
    for (var i = 0; i < 3; i++) {
        createGhost(board, i)
    }
    gIntervalGhosts = setInterval(moveGhosts, 1000)
}

function moveGhosts() {
    // loop through ghosts
    for (var i = 0; i < gGhosts.length; i++) {
        var ghost = gGhosts[i]
        moveGhost(ghost)
    }
    // console.log('')
}


function moveGhost(ghost) {
    // figure out moveDiff, nextLocation, nextCell
    const moveDiff = getMoveDiff()

    const nextLocation = {
        i: ghost.location.i + moveDiff.i,
        j: ghost.location.j + moveDiff.j
    }

    var nextCell = gBoard[nextLocation.i][nextLocation.j]
    // console.log(nextLocation);

    // return if cannot move
    if (nextCell === WALL) return
    if (nextCell === GHOST) return
    if (nextCell === PACMAN) {
        if (!gIsSuperPower) {
            gameOver()
            return
        }
        return
    }



    // moving from current position:
    // update the model
    gBoard[ghost.location.i][ghost.location.j] = ghost.currCellContent
    // update the DOM
    renderCell(ghost.location, ghost.currCellContent)


    // Move the ghost to new location
    // update the model
    ghost.currCellContent = nextCell
    ghost.location = nextLocation
    gBoard[ghost.location.i][ghost.location.j] = GHOST
    // update the DOM
    renderCell(ghost.location, getGhostHTML(ghost))
}


function removeGhost(nextLocation) {
    for (var i = 0; i < gGhosts.length; i++) {
        var ghost = gGhosts[i]
        if (
            ghost.location.i === nextLocation.i &&
            ghost.location.j === nextLocation.j
        ) {
            var removedGhost = gGhosts.splice(i, 1)
            if (removedGhost.currCellContent === FOOD) {
                gGame.foodCount--
                removedGhost.currCellContent = EMPTY
            }
            gDedGhosts.push(removedGhost)
        }
    }
}

function reviveAll() {
    console.log('revive');
    for (var i = 0; i < gDedGhosts.length; i++) {
        var ghost = gDedGhosts[i]
        gGhosts.push(ghost)
    }
    gDedGhosts = []
}

function getMoveDiff() {
    const randNum = getRandomIntInclusive(1, 4)
    if (randNum === 1) {
        return { i: 0, j: 1 }
    } else if (randNum === 2) {
        return { i: -1, j: 0 }
    } else if (randNum === 3) {
        return { i: 0, j: -1 }
    } else {
        return { i: 1, j: 0 }
    }
}


function getGhostHTML(ghost) {
    var color = (gIsSuperPower) ? 'blue' : ghost.color
    return `<span style="color:${color}">${GHOST}</span>`
}