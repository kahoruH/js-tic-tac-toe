
const CELLS = document.querySelectorAll('[data-key]')
const MESSAGE = document.getElementById('js-message')

const WINNING_PATTERN = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]

//class
const CROSS = 'cross'
const CIRCLE = 'circle'


//先行はCircle
let CircleTurn = true;

let Turn = 0;


//ボード頭上のナビ
const BAR_CIRCLE = document.querySelector('.circle');
const BAR_CROSS = document.querySelector('.cross');

function chengeTurns() {
  CircleTurn = !CircleTurn;
  Turn++;

  if(Turn % 2 == 0) {
    BAR_CROSS.classList.remove('active')
    BAR_CIRCLE.classList.add('active')
    
  } else {
    BAR_CROSS.classList.add('active')
    BAR_CIRCLE.classList.remove('active')
  }
}

//セルに付けるマーク
function putMark(CELL, CURRENT_CLASS) {
  CELL.classList.add(CURRENT_CLASS)
  CELL.classList.remove('nonStyle')
}

function handleClick(e) {
  const CELL = e.target
  const CURRENT_CLASS = CircleTurn ? CIRCLE : CROSS
  putMark(CELL, CURRENT_CLASS)
  if (checkWinner(CURRENT_CLASS)) {
    endGame(false)
  } else if (Draw()) {
    endGame(true)
  } else {
    chengeTurns()
  }
}

function endGame(draw) {
  if (draw) {
    MESSAGE.innerText = 'Draw!'
  } else {
    MESSAGE.innerHTML = `${CircleTurn ? '<i class="far fa-circle"></i>' : '<i class="fas fa-times"></i>'} wins! Congrats!`
    MESSAGE.classList.add('result')
  }

  CELLS.forEach(CELL => {
    CELL.removeEventListener('click', handleClick)
    CELL.classList.add('nonStyle')
  })
}

function Draw() {
  return [...CELLS].every(CELL => {
    return CELL.classList.contains(CROSS) || CELL.classList.contains(CIRCLE)
  })
}

function checkWinner(CURRENT_CLASS) {
  return WINNING_PATTERN.some(pattern => {
    return pattern.every(index => {
      return CELLS[index].classList.contains(CURRENT_CLASS)
    })
  })
}

function startGame() {

  BAR_CROSS.classList.remove('active')
  BAR_CIRCLE.classList.add('active')

  MESSAGE.classList.remove('result')
  MESSAGE.innerText = 'starting...'

  CELLS.forEach(CELL => {
    CELL.classList.remove(CROSS)
    CELL.classList.remove(CIRCLE)
    CELL.removeEventListener('click', handleClick)
    CELL.addEventListener('click', handleClick, { once: true })
  })
}

startGame()

//Restart
const RESTART_BTN = document.getElementById('js-restart')
RESTART_BTN.addEventListener('click', startGame)