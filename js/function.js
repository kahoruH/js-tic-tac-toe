
const Cells = document.querySelectorAll('[data-key]')
const Message = document.getElementById('js-message')

const WinningPattern = [
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
const Cross = 'cross'
const Circle = 'circle'


//先行はCircle
let CircleTurn = true;

let Turn = 0;

startGame()


//Restart
const RestartBtn = document.getElementById('js-restart')
RestartBtn.addEventListener('click', startGame)


//ボード頭上のナビ
const BarCircle = document.querySelector('.circle');
const BarCross = document.querySelector('.cross');

function chengeTurns() {
  CircleTurn = !CircleTurn;
  Turn++;

  if(Turn % 2 == 0) {
    BarCross.classList.remove('active')
    BarCircle.classList.add('active')
    
  } else {
    BarCross.classList.add('active')
    BarCircle.classList.remove('active')
  }
}

//セルに付けるマーク
function putMark(Cell, CurrentClass) {
  Cell.classList.add(CurrentClass)
}


function startGame() {
  Cells.forEach(Cell => {
    Cell.classList.remove(Cross)
    Cell.classList.remove(Circle)
    Cell.removeEventListener('click', handleClick)
    Cell.addEventListener('click', handleClick, { once: true })
  })
}

function handleClick(e) {
  const Cell = e.target
  const CurrentClass = CircleTurn ? Circle : Cross
  putMark(Cell, CurrentClass)
  if (checkWinner(CurrentClass)) {
    endGame(false)
  } else if (Draw()) {
    endGame(true)
  } else {
    chengeTurns()
  }
}

function endGame(draw) {
  if (draw) {
    Message.innerText = 'Draw!'
  } else {
    Message.innerHTML = `${CircleTurn ? '<i class="far fa-circle"></i>' : '<i class="fas fa-times"></i>'} wins! Congrats!`
    Message.classList.add('result')
  }

  Cells.forEach(Cell => {
    Cell.removeEventListener('click', handleClick)
  })
}


function Draw() {
  return [...Cells].every(Cell => {
    return Cell.classList.contains(Cross) || Cell.classList.contains(Circle)
  })
}

function checkWinner(CurrentClass) {
  return WinningPattern.some(pattern => {
    return pattern.every(index => {
      return Cells[index].classList.contains(CurrentClass)
    })
  })
}