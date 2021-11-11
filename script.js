'use strict';

// Selecting elements
// const score0 = document.querySelector('#score--0');
// const score1 = document.querySelector('#score--1');
const score0Elem = document.getElementById('score--0');
const score1Elem = document.getElementById('score--1'); //we are not passing a selector, we are passing an ID we are searching
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores, playing, currentScore, activePlayer;

// Starting condition
const init = function () {
  currentScore = 0;
  activePlayer = 0;
  scores = [0, 0];
  playing = true;
  diceEl.classList.add('hidden'); //hide the dice
  current0El.textContent = current1El.textContent = currentScore;
  score0Elem.textContent = score1Elem.textContent = 0;
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
};
init();

const finish = function () {
  //Finish the game
  playing = false;
  diceEl.classList.add('hidden');

  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--active');

  document
    .querySelector(`.player--${activePlayer}`)
    .classList.add('player--winner');
};

const switchPlayers = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
  activePlayer ^= 1;
  currentScore = 0;
};

// Rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (currentScore >= 20) {
    finish();
  }
  if (playing) {
    // 1. Generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    // 2. Display the dice
    diceEl.src = `dice-${dice}.png`;
    diceEl.classList.remove('hidden');

    // 3. Check if === 1. If true => switch player
    if (dice !== 1) {
      // Add dice value to the current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayers();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    // 1. Add current score to active player's total score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // 2. Check score >= 100 => win
    if (scores[activePlayer] >= 20) {
      finish();
    }
    // 3. Else switch player.
    else switchPlayers();
  }
});

btnNew.addEventListener('click', init);
