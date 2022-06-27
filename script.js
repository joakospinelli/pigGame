'use strict';

// Secciones de c/jugador
const playerElement = document.querySelectorAll('.player');
const player0Element = document.querySelector('.player--0');
const player1Element = document.querySelector('.player--1');

// Botones
const btnElement = document.querySelectorAll('.btn');
const btnRollElement = document.querySelector('.btn--roll');
const btnHoldElement = document.querySelector('.btn--hold');
const btnNewElement = document.querySelector('.btn--new');

// Puntuaciones acumuladas
const totalScoreElement0 = document.getElementById('score--0');
const totalScoreElement1 = document.getElementById('score--1');
const totalScoreElement = document.querySelectorAll('.score');

// Puntuaciones actuales
const currentScoreElement = document.querySelectorAll('.current-score');
const currentScoreElement0 = document.getElementById('current--0');
const currentScoreElement1 = document.getElementById('current--1');

// Componentes visuales
const diceElement = document.querySelector('.dice');

// Variables
const totalScores = [ 0, 0 ];
let currentScore;
let currentPlayer;
let playing;

// Funciones
const resetGame = function(){
    currentPlayer = 0;
    currentScore = 0;
    playing = true;

    totalScores.forEach(i => i = 0);
    totalScoreElement.forEach(i => i.textContent = 0);
    currentScoreElement.forEach(i => i.textContent = 0);
    playerElement.forEach(i => i.classList.remove('player--winner'));
    player0Element.classList.add('player--active');
    player1Element.classList.remove('player--active');
    diceElement.classList.add('hidden');
}

const randomNumber = function(){
    let number = Math.floor(Math.random() * 6) + 1;
    diceElement.src = `dice-${number}.png`;
    return number;
}

const switchPlayer = function(){
    document.getElementById(`current--${currentPlayer}`).textContent = 0;
    currentPlayer = currentPlayer === 0 ? 1 : 0;
    currentScore = 0;
    // Toggle: elimina la clase si el elemento la tiene; si no la tiene, se la agrega
    playerElement.forEach( i => i.classList.toggle('player--active') );
}

const winGame = function(){
    playing = false;
    playerElement[currentPlayer].classList.remove('player--active');
    playerElement[currentPlayer].classList.add('player--winner');
    diceElement.classList.add('hidden');
}

// Listeners
document.addEventListener('DOMContentLoaded', resetGame);

btnRollElement.addEventListener('click', function(){
    if (playing){
        diceElement.classList.remove('hidden');
        const dice = randomNumber();
        
        if (dice !== 1){
            currentScore += dice;
            document.getElementById(`current--${currentPlayer}`).textContent = currentScore;
        } else {
            switchPlayer();
    }
    }
});

btnHoldElement.addEventListener('click', function(){
    if (playing) {
        totalScores[currentPlayer] += currentScore;
        document.getElementById(`score--${currentPlayer}`).textContent = totalScores[currentPlayer];

        if (totalScores[currentPlayer] >= 100) winGame();
        else switchPlayer();
    }
});

btnNewElement.addEventListener('click', resetGame);
