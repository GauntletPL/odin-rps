const RPS = {
    rock: 'scissors',
    paper: 'rock',
    scissors: 'paper'
};

let humanScore = 0;
let computerScore = 0;

function getComputerChoice() {
    return Object.keys(RPS)[Math.floor(Math.random() * 3)];
}

function getHumanChoice(target) {
    const humanChoice = target.value;
    const computerChoice = getComputerChoice();
    playRound(humanChoice, computerChoice);
}

function updateResultBoard(humanChoice, computerChoice, result) {
    const resultDiv = document.querySelector('#results');
    resultDiv.appendChild(createResultRow(resultDiv.children.length, humanChoice, computerChoice, result));
}

function createResultRow(no, user, cpu, res) {
    const rowDiv = document.createElement('div');
    rowDiv.classList.add('result-row');

    if (res === 'YOU WIN') {
        rowDiv.classList.add('good');
    } else if (res === 'CPU WINS') {
        rowDiv.classList.add('bad');
    } else {
        rowDiv.classList.add('neutral');
    }

    const orderDiv = document.createElement('div');
    orderDiv.textContent = no;

    const userDiv = document.createElement('div');
    userDiv.classList.add('user-res');
    userDiv.classList.add(user);

    const vsDiv = document.createElement('div');
    vsDiv.textContent = 'vs';

    const cpuDiv = document.createElement('div');
    cpuDiv.classList.add('cpu-res');
    cpuDiv.classList.add(cpu);

    const outcomeDiv = document.createElement('div');
    outcomeDiv.className = 'outcome-res';
    outcomeDiv.textContent = res;

    rowDiv.append(orderDiv);
    rowDiv.append(userDiv);
    rowDiv.append(vsDiv);
    rowDiv.append(cpuDiv);
    rowDiv.append(outcomeDiv);

    return rowDiv;
}

function updateScore() {
    const userScoreDiv = document.getElementById('user-score');
    userScoreDiv.textContent = humanScore;

    const cpuScoreDiv = document.getElementById('cpu-score');
    cpuScoreDiv.textContent = computerScore;
}

function resetSelection() {
    const choiceSelect = document.getElementById('choice');
    choiceSelect.value = '';
}

function playRound(humanChoice, computerChoice) {
    let result = '';
    if (humanChoice === computerChoice) {
        result = 'DRAW';
        humanScore++;
        computerScore++
    } else if (computerChoice === RPS[humanChoice]) {
        result = 'YOU WIN';
        humanScore++;
    } else {
        result = 'CPU WINS';
        computerScore++;
    }
    updateResultBoard(humanChoice, computerChoice, result);
    updateScore();
    resetSelection();
    validateGame();
}

function validateGame() {
    if (humanScore >= 5 || computerScore >= 5) {
        updateInfoBar((humanScore > computerScore) ? 'U' : (computerScore > humanScore) ? 'C' : 'D');
        toggleSelectEnabled();
    }
}

function updateInfoBar(res) {
    const infoBar = document.getElementById('info-bar');
    if (res === 'U') {
        infoBar.textContent = 'Congratulations!!! You\'ve won.';
        infoBar.className = 'good';
    } else if (res === 'C') {
        infoBar.textContent = 'You\'ve lost. Life does that sometimes.';
        infoBar.className = 'bad';
    } else {
        infoBar.textContent = 'It\'s a draw. Care to try again?';
        infoBar.className = 'neutral';
    }
}

function toggleSelectEnabled() {
    const choiceSelect = document.getElementById('choice');
    choiceSelect.disabled = !choiceSelect.disabled;
}