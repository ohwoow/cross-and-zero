const game = document.querySelector('.game'),
    result = document.querySelector('.result'),
    btnNewGame = document.querySelector('.new-game'),
    fields = document.querySelectorAll('.field');

// кто ходит (крестик или нолик)
let step = false

//кол-во ячеек
let count = 0

// разметка крестика
let cross = `
    <svg class="cross">
      <line class="first" x1="15" y1="15" x2="100" y2="100"
        stroke="red" stroke-width="10" stroke-linecap="round"/>
      <line class="second" x1="100" y1="15" x2="15" y2="100"
        stroke="red" stroke-width="10" stroke-linecap="round"/>
    </svg>
`

// разметка нолика
let circle = `
    <svg class="circle">
        <circle r="45" cx="58" cy="58" stroke="blue"
        stroke-width="10" fill="none" stroke-linecap="round"/>
    </svg>
`

// при выигрыше одной из сторон добавлять активные классы ячейкам
const addActiveField = (arr, count) => {

    fields[arr[count][0]].classList.add('active')
    fields[arr[count][1]].classList.add('active')
    fields[arr[count][2]].classList.add('active')
}

// ход крестика
function stepCross(target) {

    target.innerHTML = cross
    target.classList.add('x')
    let crossAudio = new Audio('audio/cross.mp3')
    crossAudio.play().then(r => '')
    count++
}

//ход кружка
function stepZero(target) {

    target.innerHTML = circle
    target.classList.add('o')
    let circleAudio = new Audio('audio/zero.mp3')
    circleAudio.play().then(r => '')
    count++
}

// проверка на дочерний элемент (если есть, то запрещаем клик)

function check(event) {
    const target = event.target

    if (target.closest('.cross') || target.closest('.circle')) {
        return
    }
    init(event)
}


// новая игра
function newGame(event) {
    const target = event.target
    step = false
    count = 0
    result.innerText = ''
    fields.forEach(e => {
        e.innerHTML = ''
        e.classList.remove('x', 'o', 'active')
    })
    game.addEventListener('click', check)
}


// логика определения выигрыша (в массиве номера ячеек слева направо и сверху вниз + диагональ)
function win() {

    let comb = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ]


    // перебор массива и проверка на расположения в ячейках крестика или кружочка
    for (let i = 0; i < comb.length; i++) {

        if (fields[comb[i][0]].classList.contains('x') &&
            fields[comb[i][1]].classList.contains('x') &&
            fields[comb[i][2]].classList.contains('x')) {
              setTimeout(() => {
                  addActiveField(comb, i)
                  result.innerText = 'Выиграли Х'
              }, 1500)
            //выключаем клик по ячейкам по завершении игры
            game.removeEventListener('click', check)
        } else if (fields[comb[i][0]].classList.contains('o') &&
            fields[comb[i][1]].classList.contains('o') &&
            fields[comb[i][2]].classList.contains('o')) {
            setTimeout(() => {
                addActiveField(comb, i)
                result.innerText = 'Выиграли O'
            }, 1500)
            game.removeEventListener('click', check)
        } else if (count === 9) {
            setTimeout(() => {
                result.innerText = 'Ничья!'
            }, 1500)
            game.removeEventListener('click', check)
        }
    }

}

// определяем, кто ходит первый (крестик)
function init(event) {
    !step ? stepCross(event.target) : stepZero(event.target)
    step = !step
    win()
}

btnNewGame.addEventListener('click', newGame)
game.addEventListener('click', check)












