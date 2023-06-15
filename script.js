const X_CLASS = 'x'
const CIRCLE_CLASS = 'circle'
const cellElements = document.querySelectorAll("[data-cell]")
const board = document.getElementById("board")
const WINNING_COMBINATIONS = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]]
let circleTurn;
const winningMessageTextElement = document.querySelector("[data-winning-message-text]")
const winningMessageElement = document.getElementById("winning-message")
const restartButton = document.getElementById("restartButton")



const checkWin = (currentClass) => {
    return WINNING_COMBINATIONS.some(combinations => {
        return combinations.every(index => {
            return cellElements[index].classList.contains(currentClass)
        })
    })
}


const isDraw = () => {
    return [...cellElements].every(cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
    })
}

const endGame = (draw) => {
    if (draw) {
        winningMessageTextElement.innerHTML = "Draw Match"
    } else {
        winningMessageTextElement.innerHTML = `${circleTurn ? "O's Win" : "X's Win"}`
    }
    winningMessageElement.classList.add('show')
}

const handleClick = (e) => {
    //place the mark
    const cell = e.target;
    const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;
    placeMark(cell, currentClass)


    //check for win
    if (checkWin(currentClass)) {
        endGame(false)
    }
    else if (isDraw()) {
        endGame(true)
    } else {
        swapTurns()
        setBoardHoverClass()
    }
}



cellElements.forEach(cell => {
    cell.addEventListener("click", handleClick, { once: true })
})


const placeMark = (cell, currentClass) => {
    cell.classList.add(currentClass)
}

const swapTurns = () => {
    circleTurn = !circleTurn;
}

const setBoardHoverClass = () => {
    board.classList.remove(X_CLASS)
    board.classList.remove(CIRCLE_CLASS)
    if (circleTurn) {
        board.classList.add(CIRCLE_CLASS)
    } else {
        board.classList.add(X_CLASS)
    }
}

const startGame = () => {
    circleTurn = false
    cellElements.forEach(cell => {
        cell.classList.remove(X_CLASS)
        cell.classList.remove(CIRCLE_CLASS)
        cell.addEventListener("click", handleClick, { once: true })
    })
    setBoardHoverClass()
    winningMessageElement.classList.remove("show")
}
startGame()

restartButton.addEventListener("click", startGame)