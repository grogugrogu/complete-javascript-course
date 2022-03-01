'use strict';
// Selecting Elements
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');

//dice
const diceEl = document.querySelector('.dice');

//buttons
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

//score
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

//player
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1'); // always remember to include . with query selector
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

let playing, currentScore, activePlayer, scores; //DO NOT DECLARE VALUES HERE SINCE INIT FUNCTION WILL DECLARE AND DECLARING IT WILL CONFLICT

//initialize function. Can be used to start or restart the game
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true; //game contiues or not

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  document.querySelector('.player--0').classList.add('player--active');
  document.querySelector('.player--1').classList.remove('player--active');
};

//start of game
init();

// rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    //1.Generate random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    //2.Display Dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    //3.Check for rolled 1: if true switch players
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

//Hold functionality
btnHold.addEventListener('click', function () {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    if (scores[activePlayer] >= 20) {
      //remove dice
      diceEl.classList.add('hidden');
      //stop buttons
      playing = false;
      //make winner
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init);
