'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.close-modal');
const btnsOpenModal = document.querySelectorAll('.show-modal');
const closedModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

const openedModal = function () {
  console.log('button clicked!');
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

// all 3 buttons open modal
for (let i = 0; i < btnsOpenModal.length; i++) {
  btnsOpenModal[i].addEventListener('click', openedModal);
}
//closes modal with x button
btnCloseModal.addEventListener('click', closedModal);
//closes modal by clicking outside
overlay.addEventListener('click', closedModal); //DO NOT ADD THE () <--- BRACKETS. IT WILL NOT WORK IF YOU DO. ONLY PLAce VARIABLE NAME. ADDING BRACKETS IMMEDIATELY CALLS THE FUNCTION.
// keyboard
document.addEventListener('keydown', function (event) {
  if (event.key === 'Escape' && !modal.classList.contains('hidden')) {
    closedModal();
  }
});
