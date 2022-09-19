let currentTurn = 'x';
let numsOfMoves = 0;
let boardRows = [];
let isWin = false;
let boardAnswers =
    [['0', '0', '0'],
    ['0', '0', '0'],
    ['0', '0', '0']];
let currentPlayer = document.querySelector('#is-turn');


for (let i = 0; i <= 2; i++) {
    boardRows[i] = document.querySelector(`#board ul:nth-of-type(${i + 1})`);
    boardRows[i].addEventListener('click', (e) => {
        putMark(e);
    })
}

whosTurn();

function putMark(e) {
    if (e.target.innerHTML === '_') {
        const index = Array.from(e.target.parentElement.children).indexOf(e.target);
        const row = e.target.parentElement.id;
        numsOfMoves++;
        // e.target.classList.add('no-click');
        if (currentTurn === 'x') {
            e.target.innerHTML = 'X'
            currentTurn = 'o';

            storeHistory(row, index, 'X');
        }
        else {
            e.target.innerHTML = 'O'
            currentTurn = 'x';

            storeHistory(row, index, 'O');
        }
        addToArray(index, row, e.target.textContent);
        whosTurn();
        checkWinner();
    }
}

function addToArray(index, row, answer) {
    let depth;
    if (row === "first") {
        depth = 0;
    }
    else if (row === "second") {
        depth = 1;
    }
    else if (row === "third") {
        depth = 2;
    }

    boardAnswers[depth][index] = answer;
}

function checkWinner() {
    let firstRowX = boardAnswers[0][0] + boardAnswers[0][1] + boardAnswers[0][2];
    let secondRowX = boardAnswers[1][0] + boardAnswers[1][1] + boardAnswers[1][2];
    let thirdRowX = boardAnswers[2][0] + boardAnswers[2][1] + boardAnswers[2][2];

    let firstColumnX = boardAnswers[0][0] + boardAnswers[1][0] + boardAnswers[2][0];
    let secondColumnX = boardAnswers[0][1] + boardAnswers[1][1] + boardAnswers[2][1];
    let thirdColumnX = boardAnswers[0][2] + boardAnswers[1][2] + boardAnswers[2][2];

    let firstDiagonalX = boardAnswers[0][0] + boardAnswers[1][1] + boardAnswers[2][2];
    let secondDiagonalX = boardAnswers[0][2] + boardAnswers[1][1] + boardAnswers[2][0];

    didSomeoneWin(firstRowX, ['X', 'X', 'X']);
    didSomeoneWin(secondRowX, ['X', 'X', 'X']);
    didSomeoneWin(thirdRowX, ['X', 'X', 'X']);

    didSomeoneWin(firstColumnX, ['X', 'X', 'X']);
    didSomeoneWin(secondColumnX, ['X', 'X', 'X']);
    didSomeoneWin(thirdColumnX, ['X', 'X', 'X']);

    didSomeoneWin(firstDiagonalX, ['X', 'X', 'X']);
    didSomeoneWin(secondDiagonalX, ['X', 'X', 'X']);

    let firstRowO = boardAnswers[0][0] + boardAnswers[0][1] + boardAnswers[0][2];
    let secondRowO = boardAnswers[1][0] + boardAnswers[1][1] + boardAnswers[1][2];
    let thirdRowO = boardAnswers[2][0] + boardAnswers[2][1] + boardAnswers[2][2];

    let firstColumnO = boardAnswers[0][0] + boardAnswers[1][0] + boardAnswers[2][0];
    let secondColumnO = boardAnswers[0][1] + boardAnswers[1][1] + boardAnswers[2][1];
    let thirdColumnO = boardAnswers[0][2] + boardAnswers[1][2] + boardAnswers[2][2];

    let firstDiagonalO = boardAnswers[0][0] + boardAnswers[1][1] + boardAnswers[2][2];
    let secondDiagonalO = boardAnswers[0][2] + boardAnswers[1][1] + boardAnswers[2][0];

    didSomeoneWin(firstRowO, ['O', 'O', 'O']);
    didSomeoneWin(secondRowO, ['O', 'O', 'O']);
    didSomeoneWin(thirdRowO, ['O', 'O', 'O']);

    didSomeoneWin(firstColumnO, ['O', 'O', 'O']);
    didSomeoneWin(secondColumnO, ['O', 'O', 'O']);
    didSomeoneWin(thirdColumnO, ['O', 'O', 'O']);

    didSomeoneWin(firstDiagonalO, ['O', 'O', 'O']);
    didSomeoneWin(secondDiagonalO, ['O', 'O', 'O']);

    if (isWin) {
        if (currentTurn === 'x') {
            currentTurn = 'o';
        }
        else {
            currentTurn = 'x';
        }
        alert(`winner is ${currentTurn}`);
    }

    if (numsOfMoves >= 9 && !isWin) {
        alert(`Draw game`);
    }
}

function didSomeoneWin(a, b) {
    temp = b.toString();
    b = temp.replace(/\,/g, '');

    if (a === b) {
        isWin = true;
        return true;
    } else {
        return false;
    }
}

function whosTurn() {
    currentPlayer.innerHTML = `Who's turn: ${currentTurn}`;
}

// Next previous
let history = [];
let historyIndex = 1;
let previousBtn = document.querySelector('#previous-btn');
previousBtn.addEventListener('click', (e) => {
    previous();
})
let nextBtn = document.querySelector('#next-btn');
nextBtn.addEventListener('click', (e) => {
    next();
})

function storeHistory(row, index, answer) {
    history.push([row, index, answer]);
    // console.log(history);
}

function previous() {
    if (numsOfMoves + 1 <= historyIndex) {
        return false;
    }
    if (history[history.length - historyIndex][0] === 'first') {
        removeAnswer('first', history[history.length - historyIndex][1])
        historyIndex++;
    }
    else if (history[history.length - historyIndex][0] === 'second') {
        removeAnswer('second', history[history.length - historyIndex][1])
        historyIndex++;
    }
    else if (history[history.length - historyIndex][0] === 'third') {
        removeAnswer('third', history[history.length - historyIndex][1])
        historyIndex++;
    }
}

function removeAnswer(row, index) {
    if (row === 'first') {
        boardRows[0].children[index].innerHTML = '_';
    }
    else if (row === 'second') {
        boardRows[1].children[index].innerHTML = '_';
    }
    else if (row === 'third') {
        boardRows[2].children[index].innerHTML = '_';
    }
}

function addAnswer(row, index, answer) {
    if (row === 'first') {
        boardRows[0].children[index].innerHTML = answer;
    }
    else if (row === 'second') {
        boardRows[1].children[index].innerHTML = answer;
    }
    else if (row === 'third') {
        boardRows[2].children[index].innerHTML = answer;
    }
}

function next() {
    if (historyIndex === 1) {
        return false;
    }
    if (history[history.length - historyIndex + 1][0] === 'first') {
        addAnswer('first', history[history.length - historyIndex + 1][1], history[history.length - historyIndex + 1][2])
        historyIndex--;
    }
    else if (history[history.length - historyIndex + 1][0] === 'second') {
        addAnswer('second', history[history.length - historyIndex + 1][1], history[history.length - historyIndex + 1][2])
        historyIndex--;
    }
    else if (history[history.length - historyIndex + 1][0] === 'third') {
        addAnswer('third', history[history.length - historyIndex + 1][1], history[history.length - historyIndex + 1][2])
        historyIndex--;
    }
    console.log('history:', historyIndex);
    console.log('moves:', numsOfMoves);
}

let restartBtn = document.querySelector('#restart-btn');
restartBtn.addEventListener('click', () => {
    alert('CTRL + R boi');
})