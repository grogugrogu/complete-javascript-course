'use strict';

let secretNumber = Math.trunc(Math.random() * 20) + 1; //math.random()*20 + 1 makes it between 1-21 but Math.Trunc() makes the decimals go away. Eg. 1.0001 is 1 20.232 is 20.
let score = 20;
let highscore = 0;
const displayMessage = function (message) {
  document.querySelector('.message').textContent = message;
};

document.querySelector('.check').addEventListener('click', function () {
  const guess = Number(document.querySelector('.guess').value);
  console.log(guess, typeof guess);

  if (!guess || guess < 0 || guess > 20) {
    displayMessage('FORBIDDEN');
  } else if (guess === secretNumber) {
    if (score > 1) {
      document.querySelector('.number').textContent = secretNumber;
      displayMessage('CORRECT NUMBER! :)');
      document.querySelector('body').style.backgroundColor = '#60b347';
      document.querySelector('.number').style.width = '30rem';
      if (score > highscore) {
        highscore = score;
        document.querySelector('.highscore').textContent = highscore;
      }
    } else {
      score = 0;
      displayMessage('You Lost The Game! :(');
      document.querySelector('.score').textContent = score;
    }
  } else if (guess !== secretNumber) {
    if (score > 1) {
      displayMessage(guess > secretNumber ? 'Too High :(' : 'Too Low :(');
      document.querySelector('.score').textContent = score;
      score--;
    } else {
      document.querySelector('.message').textContent = 'You Lost The Game! :(';
      document.querySelector('.score').textContent = 0;
      document.querySelector('body').style.backgroundColor = '#fa0030';
    }
  }
});

document.querySelector('.again').addEventListener('click', function () {
  score = 20;
  secretNumber = Math.trunc(Math.random() * 20) + 1;
  displayMessage('Start guessing...');
  document.querySelector('body').style.backgroundColor = 'rgb(255, 255, 255)';
  document.querySelector('.number').style.width = '15rem';

  document.querySelector('.score').textContent = score;
  document.querySelector('.number').textContent = '?';
  document.querySelector('.guess').value = '';
}); //CONST stopped the event listener from running and was ignored since it was trying to change a CONST variable
