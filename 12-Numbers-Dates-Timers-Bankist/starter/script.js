'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2022-03-24T17:01:17.194Z',
    '2022-03-25T23:36:17.929Z',
    '2022-03-26T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

/////////////////////////////////////////////////
// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
// Functions

const formatMovementDate = function (date, locale) {
  const calcDaysPassed = (date1, date2) =>
    Math.round(Math.abs((date2 - date1) / (1000 * 60 * 60 * 24)));

  const daysPassed = calcDaysPassed(new Date(), date);
  console.log(daysPassed);

  if (daysPassed === 0) return 'Today';
  if (daysPassed === 1) return 'Yesterday';
  if (daysPassed <= 7) return `${daysPassed} days ago`;

  /*const Day = `${date.getDate()}`.padStart(2, 0);
  const Month = `${date.getMonth()}`.padStart(2, 0);
  const Year = date.getFullYear();
  return `${Day}/${Month}/${Year}`;*/
  return new Intl.DateTimeFormat(locale).format(date);
};

const formatCur = function (value, locale, currency) {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(value);
};

const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const date = new Date(acc.movementsDates[i]);
    const displayDate = formatMovementDate(date, acc.locale);
    const formattedMov = formatCur(mov, acc.locale, acc.currency);
    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
        <div class="movements__date">${displayDate}</div>
        <div class="movements__value">${formattedMov}</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = formatCur(acc.balance, acc.locale, acc.currency);
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = formatCur(incomes, acc.locale, acc.currency);

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = formatCur(Math.abs(out), acc.locale, acc.currency);

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = formatCur(interest, acc.locale, acc.currency);
};

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUsernames(accounts);

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
};

const startLogOutTimer = function () {
  const tick = function () {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(time % 60).padStart(2, 0);
    //in each call, print the remaining time to UI
    labelTimer.textContent = `${min}:${sec}`;

    // when 0 seconds, stop timer and logout user
    if (time === 0) {
      clearInterval(timer);
      labelWelcome.textContent = 'Log in to get started';
      containerApp.style.opacity = 0;
    }
    //Decrease 1s
    //has to be put after so it checks if it zero first before logging out
    //other way will make it logout at 1s because it will subtract first before displaying the last second
    time--;
  };
  //set time to 5 miutes
  let time = 120;
  //starts immediately
  tick();
  //call the timer every second
  const timer = setInterval(tick, 1000);
  return timer;
};

///////////////////////////////////////
// Event handlers
let currentAccount, timer;
// FAKE ALWAYS LOGGED IN
/*currentAccount = account1;
updateUI(currentAccount);
containerApp.style.opacity = 100;*/

btnLogin.addEventListener('click', function (e) {
  // Prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  if (currentAccount?.pin === +inputLoginPin.value) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;
    //create current date
    const Now = new Date();
    const options = {
      hour: 'numeric',
      minute: 'numeric',
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
    };

    //const locale = navigator.language;
    //console.log(locale);

    labelDate.textContent = new Intl.DateTimeFormat(
      currentAccount.locale,
      options
    ).format(Now);
    /*const Day = `${Now.getDate()}`.padStart(2, 0);
    const Month = `${Now.getMonth()}`.padStart(2, 0);
    const Year = Now.getFullYear();
    const Hour = `${Now.getHours()}`.padStart(2, 0);
    const Min = `${Now.getMinutes()}`.padStart(2, 0);

    labelDate.textContent = `${Day}/${Month}/${Year}, ${Hour}:${Min}`;*/
    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();
    //timer
    if (timer) clearInterval(timer);
    timer = startLogOutTimer();

    // Update UI
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = +inputTransferAmount.value;
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    //Add transfer date
    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAcc.movementsDates.push(new Date().toISOString());

    // Update UI
    updateUI(currentAccount);
    //reset timer
    clearInterval(timer);
    timer = startLogOutTimer();
  }
});
//loan
btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Math.floor(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    setTimeout(function () {
      // Add movement
      currentAccount.movements.push(amount);
      //Add loan date
      currentAccount.movementsDates.push(new Date().toISOString());

      // Update UI
      updateUI(currentAccount);
    }, 2500);
    //reset timer
    clearInterval(timer);
    timer = startLogOutTimer();
  }
  inputLoanAmount.value = '';
});

//close account
btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    +inputClosePin.value === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    console.log(index);
    // .indexOf(23)

    // Delete account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  }

  inputCloseUsername.value = inputClosePin.value = '';
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount, !sorted);
  sorted = !sorted;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES
console.log(23 === 23.0);
//Base 10 - 0 to 9. 1/10 = 0.1. 3/10 = 3.33333333
//Binary base 2 - 0 to 1
console.log(0.1 + 0.2);
console.log(0.1 + 0.2 === 0.3); //false

//String to number
console.log(Number('23')); //formal way
console.log(+'23'); // easy way to convert number to string

//Parsing
console.log(Number.parseInt('30px', 10)); //returns 30
console.log(Number.parseInt('e23', 10)); //returns NaN
//ParseFloat is main way to get a number from a string coming from css
console.log(Number.parseFloat('2.5rem')); //returns floating point number (2.5)
console.log(Number.parseInt('  2.5rem   ')); // returns only integer part(2)
console.log(parseInt('  2.5rem   ')); //also works but is informal use with number

//Should only use for finding NaN only.
//isNaN not a good way to check a number
console.log(Number.isNaN(20));
console.log(Number.isNaN('20'));
console.log(Number.isNaN(+'20X'));
console.log(Number.isNaN(23 / 0));

//isFinite is the main way to check if a value is a number or not
//Main go to for checking number
console.log(Number.isFinite(20));
console.log(Number.isFinite('20'));
console.log(Number.isFinite(+'20X'));
console.log(Number.isFinite(23 / 0));
//checks for integers
console.log(Number.isInteger(23));
console.log(Number.isInteger(23.0));
console.log(Number.isInteger(23 / 0));

console.log(Math.sqrt(25));
console.log(25 ** (1 / 2)); //Same as above
console.log(8 ** (1 / 3)); //only way to get cubic root
//Math.max
console.log(Math.max(5, 18, 23, 11, 2));
console.log(Math.max(5, 18, '23', 11, 2)); //will consider 23 as it does type coercion
console.log(Math.max(5, 18, '23px', 11, 2)); //will not consider '23px' as it does not do parsing

//Math.min
console.log(Math.min(5, 18, 23, 11, 2));
//Math.Pi represents pi up to a certain amount of decimals
console.log(Math.Pi * Number.parseFloat('10px') ** 2);

//Math.random (random number from 0-1)
//Math.trunc removes the decimals
//Have to add 1 because the trunc will cut off the 5 and always round it down so 6 will rarely appear
console.log(Math.trunc(Math.random() * 6 + 1));

//function to give a number from a minimum and maximum
const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min) + 1) + min;
console.log(randomInt(10, 20));

//Rounding integers
//trunc only removes the decimals
console.log(Math.trunc(23.3));
//round, rounds the number to the nearest integer
console.log(Math.round(23.3));
console.log(Math.round(23.9));

//Rounds number up to highest (24)
//does type coercion
console.log(Math.ceil(23.3));
console.log(Math.ceil('23.9'));

//Rounds number down to lowest number (23)
//Similar to trunc except with negatives
//Does type coercion
console.log(Math.floor(23.3));
console.log(Math.floor(23.9));

//Difference between floor and trunc
//floor is better as it works with negatives too
console.log(Math.floor(-23.3));
console.log(Math.trunc(-23.3));

//Rounding Decimals
//Determins how man decimal places there are
//converts to string
//use + or Number() to convert to number
console.log((2.7).toFixed(0));
console.log((2.7).toFixed(3));
console.log((2.345).toFixed(2));
console.log(+(2.345).toFixed(2));

//Remainder operator
//Remainder operaotr only divides the integer part
console.log(5 % 2);
console.log(2 / 5); //5 = 2 * 2 + 1

console.log(8 % 3);
console.log(8 / 3); //8 = 2 * 3 + 2 <- Remainder is last number

console.log(6 % 2);
console.log(6 / 2);

console.log(7 % 2);
console.log(7 / 2);

const isEven = n => n % 2 === 0;
console.log(isEven(8));
console.log(isEven(23));
console.log(isEven(514));

labelBalance.addEventListener('click', function () {
  [...document.querySelectorAll('.movements__row')].forEach(function (row, i) {
    if (i % 2 === 0) {
      row.style.backgroundColor = 'orangered';
    }
    if (i % 3 === 0) row.style.backgroundColor = 'blue';
  });
});

//Underscores for reading numbers
//287,460,000,000
//_ is not allowed next to decimals at the end or beginning
//two underscores also do not work to seperate numbers
const diameter = 287_460_000_000;
console.log(diameter);

const price = 345_99;
console.log(price);

const transferFee1 = 15_00;
const transferFee2 = 1_500;

const PI = 3.14_15;
console.log(PI);

//underscores should not be used in strings when converting numbers
console.log(Number('230_000'));
//when using parseInt with an underscore it'll only read before the underscore
console.log(parseInt('230_000'));

//biggest number javacscript can safely represent
console.log(2 ** 53 - 1);
console.log(Number.MAX_SAFE_INTEGER);
//Numbers below may or may not be correct
console.log(2 ** 53 + 1);
console.log(2 ** 53 + 2);
console.log(2 ** 53 + 3);
console.log(2 ** 53 + 4);

//bigInt
//bigint numbers cannot be combined with regular number
//n can transform a larger number into a bigint
console.log(46546546546546544444444444444444444444444n);
//BigInt function should only be used with smaller numbers
console.log(BigInt(46546546546546544444444444444444444444444));
//operations
console.log(10000n + 10000n);
console.log(563563456345635634563456356n * 1000000000n);

const huge = 20289854894415164645151n;
const num = 23;
//console.log(huge * num); //this will result in a error
//console.log(Math.sqrt(16n)); //
//must convert non bigint number into bigint number
console.log(huge * BigInt(num));

//Exceptions
//bigint can still be used with comparison operators
console.log(20n > 15);
//bigint will not work with equality operator
console.log(20n === 20);
//type of bigint numbers is bigint
console.log(typeof 20n);
//loose equality operators will make bigint numbers equal to it's string equivalent
console.log(20n == '20');
//string concatenations
//will convert the bigint number into a string when added with a string
console.log(huge + ' is really big!');
//Divisions
//big int division will display the closest integer
console.log(10n / 3n);
//will display the floating integer answer
console.log(10 / 3);

//Create a date
//Months in javascript are 0 based, so january is 0
//Dates pass the last possible day in a month will continue the date into the next month and match the day as well
const now = new Date();
console.log(now);

console.log(new Date('Mar 26 2022 22:32:31'));
console.log(new Date('December 24, 2015'));
console.log(new Date(account1.movementsDates[0]));
console.log(new Date(2037, 10, 19, 15, 23, 5));
//Will appear as Dec 1st since november 31st doesnt exist
console.log(new Date(2037, 10, 31));
//1st date in javascript
console.log(new Date(0));
//exactly 3 days after as the first number is days times hours times minutes times seconds times miliseconds
console.log(new Date(3 * 24 * 60 * 60 * 1000));

//Working with dates
const future = new Date(2037, 10, 19, 15, 23);
console.log(future);
//getFullYear() gets year from the date, never use getyear
console.log(future.getFullYear());
console.log(future.getMonth());
console.log(future.getDate()); // gets date of the month
console.log(future.getDay()); //gets day of the week
console.log(future.getHours());
console.log(future.getMinutes());
console.log(future.getSeconds());
//Standardized date
console.log(future.toISOString());
//Date in mlliseconds
console.log(future.getTime());
//one value alone will convert milliseconds into the date
console.log(new Date(2142274980000));
console.log(Date.now());
//changes the year in the date saved in a variable
future.setFullYear(2040);
console.log(future);

//Operations with Dates
//Calculating how many days have passed
//This gives the date in miliseconds
console.log(Number(+future));

//Calculate days that have passed
const calcDaysPassed = (date1, date2) =>
  Math.abs((date2 - date1) / (1000 * 60 * 60 * 24));

const days1 = calcDaysPassed(new Date(2037, 3, 14), new Date(2037, 3, 4));
console.log(days1);

const number = 3884764.23;
const options = {
  style: 'currency',
  unit: 'celsius',
  currency: 'EUR',
  //useGrouping: false,
};
console.log('US', new Intl.NumberFormat('en-US', options).format(number));
console.log('Germany', new Intl.NumberFormat('de-DE', options).format(number));
console.log('Syria', new Intl.NumberFormat('ar-SY', options).format(number));
console.log(
  navigator.language,
  new Intl.NumberFormat(navigator.language, options).format(number)
);

//Timers
//argument 3 and beyond are arguments for first argument (the callback function)
const ingredients = ['olives', 'spinach'];
const pizzaTimer = setTimeout(
  (ing1, ing2) => console.log(`Here is your pizza with ${ing1} and ${ing2}`),
  3000,
  ...ingredients
);
console.log('Waiting...');

//clear timeout stops the setTimeout function from running
//since the timer includes spinach the cleartimeout function will run and stop the pizzatimer
if (ingredients.includes('spinach')) clearTimeout(pizzaTimer);

//setInterval
setInterval(function () {
  const now = new Date();
  console.log(
    `${now.getHours()} Hours ${now.getMinutes()} Minutes ${now.getSeconds()} Seconds`
  );
}, 1000);
