'use strict';

// Coding Challenge #1

/* 
Julia and Kate are doing a study on dogs. So each of them asked 5 dog owners about their dog's age, and stored the data into an array (one array for each). For now, they are just interested in knowing whether a dog is an adult or a puppy. A dog is an adult if it is at least 3 years old, and it's a puppy if it's less than 3 years old.

Create a function 'checkDogs', which accepts 2 arrays of dog's ages ('dogsJulia' and 'dogsKate'), and does the following things:

1. Julia found out that the owners of the FIRST and the LAST TWO dogs actually have cats, not dogs! So create a shallow copy of Julia's array, and remove the cat ages from that copied array (because it's a bad practice to mutate function parameters)
2. Create an array with both Julia's (corrected) and Kate's data
3. For each remaining dog, log to the console whether it's an adult ("Dog number 1 is an adult, and is 5 years old") or a puppy ("Dog number 2 is still a puppy 🐶")
4. Run the function for both test datasets

HINT: Use tools from all lectures in this section so far 😉

TEST DATA 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
TEST DATA 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]

GOOD LUCK 😀
*/

const julia1 = [3, 5, 2, 12, 7];
const kate1 = [4, 1, 15, 8, 3];
const julia2 = [9, 16, 6, 8, 3];
const kate2 = [10, 5, 6, 1, 4];
console.log(julia1.slice(1, -2));
const combined = [...julia1.slice(1, -2), ...kate1];
console.log(combined);

const checkDogs = function (array) {
  array.forEach(function (age, dog) {
    const type =
      age > 3 ? `an adult, and is ${age} years old` : 'is still a puppy 🐶';
    console.log(`Dog number ${dog + 1} is ${type}`);
  });
};

checkDogs(combined);
checkDogs(kate2);

// Coding Challenge #2

/* 
Let's go back to Julia and Kate's study about dogs. This time, they want to convert dog ages to human ages and calculate the average age of the dogs in their study.

Create a function 'calcAverageHumanAge', which accepts an arrays of dog's ages ('ages'), and does the following things in order:

1. Calculate the dog age in human years using the following formula: if the dog is <= 2 years old, humanAge = 2 * dogAge. If the dog is > 2 years old, humanAge = 16 + dogAge * 4.
2. Exclude all dogs that are less than 18 human years old (which is the same as keeping dogs that are at least 18 years old)
3. Calculate the average human age of all adult dogs (you should already know from other challenges how we calculate averages 😉)
4. Run the function for both test datasets

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

GOOD LUCK 😀
*/

const calcAverageHumanAge = function (ages) {
  return ages
    .map(function (age) {
      if (age <= 2) {
        return 2 * age;
      } else {
        return 16 + age * 4;
      }
    })
    .filter(dog => dog >= 18)
    .reduce(function (total, dog, _, array) {
      return total + dog / array.length;
    }, 0);
};

console.log(calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]));
console.log(calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]));

// Coding Challenge #3

/* 
Rewrite the 'calcAverageHumanAge' function from the previous challenge, but this time as an arrow function, and using chaining!

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

GOOD LUCK 😀
*/

///////////////////////////////////////
// Coding Challenge #4

/* 
Julia and Kate are still studying dogs, and this time they are studying if dogs are eating too much or too little.
Eating too much means the dog's current food portion is larger than the recommended portion, and eating too little is the opposite.
Eating an okay amount means the dog's current food portion is within a range 10% above and 10% below the recommended portion (see hint).

1. Loop over the array containing dog objects, and for each dog, calculate the recommended food portion and add it to the object as a new property. Do NOT create a new array, simply loop over the array. Forumla: recommendedFood = weight ** 0.75 * 28. (The result is in grams of food, and the weight needs to be in kg)
2. Find Sarah's dog and log to the console whether it's eating too much or too little. HINT: Some dogs have multiple owners, so you first need to find Sarah in the owners array, and so this one is a bit tricky (on purpose) 🤓
3. Create an array containing all owners of dogs who eat too much ('ownersEatTooMuch') and an array with all owners of dogs who eat too little ('ownersEatTooLittle').
4. Log a string to the console for each array created in 3., like this: "Matilda and Alice and Bob's dogs eat too much!" and "Sarah and John and Michael's dogs eat too little!"
5. Log to the console whether there is any dog eating EXACTLY the amount of food that is recommended (just true or false)
6. Log to the console whether there is any dog eating an OKAY amount of food (just true or false)
7. Create an array containing the dogs that are eating an OKAY amount of food (try to reuse the condition used in 6.)
8. Create a shallow copy of the dogs array and sort it by recommended food portion in an ascending order (keep in mind that the portions are inside the array's objects)

HINT 1: Use many different tools to solve these challenges, you can use the summary lecture to choose between them 😉
HINT 2: Being within a range 10% above and below the recommended portion means: current > (recommended * 0.90) && current < (recommended * 1.10). Basically, the current portion should be between 90% and 110% of the recommended portion.

TEST DATA:
const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] }
];


GOOD LUCK 😀
*/
const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];
//1)
dogs.forEach(x => (x.recFood = Math.trunc(x.weight ** 0.75 * 28)));
console.log(dogs);
//2)
console.log(
  dogs[dogs.findIndex(x => x.owners.includes('Sarah'))].curFood >
    dogs[dogs.findIndex(x => x.owners.includes('Sarah'))].recFood
    ? "Sarah's dog is eating too much"
    : "Sarah's dog is eating too little"
);
//3)
const ownersEatTooMuch = dogs
  .filter(x => x.curFood > x.recFood)
  .flatMap(dog => dog.owners);
console.log(ownersEatTooMuch);
const ownersEatTooLittle = dogs
  .filter(x => x.curFood < x.recFood)
  .flatMap(dog => dog.owners);
console.log(ownersEatTooLittle);
//4
console.log(`${ownersEatTooMuch.join(' and ')}'s dog eats too much!`);
console.log(`${ownersEatTooLittle.join(' and ')}'s dog eats too little!`);
//5
console.log(dogs.some(x => x.curFood === x.recFood));
//6
console.log(
  dogs.some(x => x.curFood > x.recFood * 0.9 && x.curFood < x.recFood * 1.1)
);
//7
const dogsOkay = dogs.filter(
  x => x.curFood > x.recFood * 0.9 && x.curFood < x.recFood * 1.1
);
console.log(dogsOkay);
//8
const sortedDog = dogs
  .slice(0, dogs.length)
  .sort((a, b) => a.recFood - b.recFood);
console.log(sortedDog);
/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

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

const displayMovements = function (movements, sort = false) {
  //innerHTML is all the html inside the container
  containerMovements.innerHTML = '';
  const movs = sort
    ? movements.slice(0, movements.length).sort((a, b) => a - b)
    : movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html = `
    <div class="movements__row">
         <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
         <div class="movements__value">${mov}€</div>
     </div>
    `;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};
//let's you see all the html inside the container when you use innerHTML wil console.log
console.log(containerMovements.innerHTML);

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(str => str[0])
      .join('');
  });
};

createUsernames(accounts);
const user = 'Steven Thomas Williams';

console.log(accounts);

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes}€`;
  const out = acc.movements.filter(x => x < 0).reduce((acc, mov) => acc + mov);
  labelSumOut.textContent = `${Math.abs(out)}€`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      console.log(arr);
      return int >= 1;
    })
    .reduce((acc, mov) => acc + mov, 0);

  labelSumInterest.textContent = `${interest}€`;
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${acc.balance}€`;
};

const updateUI = function (currentAccount) {
  //Display movements
  displayMovements(currentAccount.movements);
  //Display Balance
  calcDisplayBalance(currentAccount);
  //Display summary
  calcDisplaySummary(currentAccount);
};

//Event Handler
let currentAccount;
//e event parameter
//login
btnLogin.addEventListener('click', function (e) {
  //Prevent from from submitting on click
  e.preventDefault();
  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    //Display UI and message
    labelWelcome.textContent = `Welcome Back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;
    //Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();
    updateUI(currentAccount);
    console.log('LOGGED IN');
  }
});
//transfer
btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const recieveAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';
  //Checks if amount is greater than 0, account balance is more or equal to sending amount and if the username isn't the users + it is an existing account
  if (
    amount > 0 &&
    currentAccount.balance >= amount &&
    recieveAcc?.username !== currentAccount.username &&
    recieveAcc
  ) {
    currentAccount.movements.push(-amount);
    recieveAcc.movements.push(amount);
    updateUI(currentAccount);
  }
});

//loan
btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputLoanAmount);
  if (amount > 0 && currentAccount.movements.some(x => x >= amount * 0.1)) {
    //add movement
    currentAccount.movements.push(amount);
    //update ui
    updateUI(currentAccount);
  }
  //clears loan amount
  inputLoanAmount.value = '';
});

//close account
btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    //Delete account
    accounts.splice(index, 1);
    //Hide ui
    containerApp.style.opacity = 0;
    console.log(index);
  }
  inputCloseUsername.value = inputClosePin.value = '';
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  //does the opposite of the current state
  displayMovements(currentAccount.movements, !sorted);
  //reverses the sort state for next click (changes sort variable to current state in it's ui )
  sorted = !sorted;
});
/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

/////////////////////////////////////////////////

let arr = ['a', 'b', 'c', 'd', 'e'];
console.log(arr.slice(2));
console.log(arr.slice(2, 4)); //4 really mean 2 to 3. As 4 is where it ends
console.log(arr.slice(-2)); //Last two elements of an array
console.log(arr.slice(-1));
console.log(arr.slice(1, -3));
console.log(arr.slice());
console.log([...arr]);

// SPLICE
//mutates the origninal array
//console.log(arr.splice(2));
//console.log(arr.splice(-1));
arr.splice(-1);
console.log(arr);
arr.splice(1, 2); //second parameter is the amount deleted at that positio and after
console.log(arr);

//REVERSE
//reverse and mutates the original array
arr = ['a', 'b', 'c', 'd', 'e'];
const arr2 = ['j', 'i', 'h', 'g', 'f'];
console.log(arr2.reverse());
console.log(arr2);

//CONCAT
//Does not mutate original array
const letters = arr.concat(arr2);
console.log(letters);
//Alternative way to concat
console.log([...arr, ...arr2]);

//JOIN
console.log(letters.join('-'));

//AT method
const arr3 = [23, 11, 64];
console.log(arr3[0]);
console.log(arr3.at(0));
//getting last array element
console.log(arr3[arr3.length - 1]);
console.log(arr3.slice(-1)[0]);
console.log(arr3.at(-1));
//AT also works on strings
console.log('jonas'.at(0));
console.log('jonas'.at(-1));

//forEach Method
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
//for of loop with movements array
for (const [i, movement] of movements.entries()) {
  if (movement > 0) {
    console.log(`Movement ${i + 1}: You deposited ${movement}`);
  } else {
    console.log(`Movement ${i + 1}: You withdrew ${Math.abs(movement)}`);
  }
}
console.log('--FOR EACH--');
//forEach method with movements array
//First parameter is always the current element
//Second is always the index
//Third is always the entire array we are looping over
//forEach will always loop over the entire array
//for of is better if you need to breakout of the loop
movements.forEach(function (movement, index, array) {
  movement > 0
    ? console.log(`Movement ${index + 1}: You deposited ${movement}`)
    : console.log(`Movement ${index + 1}: You withdrew ${Math.abs(movement)}`);
});

//forEach with MAPS AND SETS
const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);
//forEach Maps
//first parameter is the value
//second parameter is the key
//third parameter is the entire map

currencies.forEach(function (value, key, map) {
  console.log(`${key}: ${value}`);
});

//forEach Set
//no ket or index in a set so second parameter is the first again
const currenciesUnique = new Set(['USD', 'GBP', 'USD', 'EUR', 'EUR']);
currenciesUnique.forEach(function (value, value2, map) {
  console.log(`${value2}: ${value}`);
});

//MAP method
//Map method is more algned with functional programming
//Modern way
const eurToUsd = 1.1;
const movementsUSD = movements.map(mov => Math.trunc(mov * eurToUsd));
console.log(movements);
console.log(movementsUSD);
//Previous way
const movementsUSDfor = [];
for (const mov of movements) movementsUSDfor.push(Math.trunc(mov * eurToUsd));
console.log(movementsUSDfor);

const movementsDescriptions = movements.map((mov, i, array) => {
  return `Movement ${i + 1}: ${
    mov > 0 ? `You deposited ${mov}` : `You withdrew ${Math.abs(mov)}`
  }`;
});

console.log(movementsDescriptions);
//FILTER Method
const deposits = movements.filter(mov => mov > 0);
console.log(deposits);
//Previous way
const depositsFor = [];
for (const mov of movements) if (mov > 0) depositsFor.push(mov);
console.log(depositsFor);
//Filter withdrawals
const withdrawals = movements.filter(mov => mov < 0);
console.log(withdrawals);

//REDUCE method
const balance = movements.reduce((acc, cur, i) => acc + cur, 0);
console.log(balance);

let balance2 = 0;
for (const mov of movements) balance2 += mov;
console.log(balance2);
//Maximum value with reduce method
const max = movements.reduce(function (max, cur) {
  if (max > cur) {
    return max;
  } else {
    return cur;
  }
}, movements[0]); //this accesses the movements array and sets the initial max to the first value of the array

console.log(max);

//The magic of chaining methoods
//PIPELINE
const totalDepositsUSD = movements
  .filter(mov => mov > 0)
  .map((mov, i, arr) => {
    return mov * eurToUsd;
  })
  .reduce((acc, mov) => acc + mov);

console.log(totalDepositsUSD);

console.log(movements);
//Find Method
//needs a boolean
//returns the first element in the array that satisfies this condition
const firstWithdrawal = movements.find(mov => mov < 0);
console.log(firstWithdrawal);
console.log(accounts);
const account = accounts.find(acc => acc.owner === 'Jessica Davis');
console.log(account);
//EQUALITY
//includes method checks for equality
console.log(movements.includes(-130));
//some method checks for any condition including equality
//returns true if ANY satisfy the condition
const anyDeposits = movements.some(mov => mov > 1500);
console.log(anyDeposits);
//every method
//only returns true if
console.log(movements.every(mov => mov > 0));
console.log(movements.every(mov => typeof mov === 'number'));
//Seperate callback
const deposit = mov => mov > 0;
console.log(movements.every(deposit));
console.log(movements.some(deposit));
console.log(movements.filter(deposit));
//flat method
const array = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];
console.log(array.flat());
const arrayDeep = [
  [[1, 2], 3],
  [4, [5, 6]],
  [7, 8, 9],
];
console.log(arrayDeep.flat(2));
//flat indicidual methods
const accountMovements = accounts.map(acc => acc.movements);
console.log(accountMovements);
const allMovements = accountMovements.flat();
console.log(allMovements);
const overallBalance = allMovements.reduce((acc, cur) => acc + cur, 0);
console.log(overallBalance);
//flat chained
const overallBalanceChain = accounts
  .map(acc => acc.movements)
  .flat()
  .reduce((acc, cur) => acc + cur, 0);
console.log(overallBalanceChain);
//flat map
const overallBalance2 = accounts
  .flatMap(acc => acc.movements)
  .reduce((acc, cur) => acc + cur, 0);
console.log(overallBalance2);
//Sort method
//mutates original array
//sorts string in alphabetical order
//Strings
const owners = ['Jonas', 'Zach', 'Adam', 'Martha'];
console.log(owners.sort());
console.log(owners);
//Numbers
console.log(movements);
//Does not work
console.log(movements.sort());
//sort with parameters
//Return < 0, A,B (keep order)
//Return > 0,B,A (switch order)
//Ascending order
console.log(
  movements.sort((a, b) => {
    if (a > b) return 1;
    if (a < b) return -1;
  })
);
console.log(
  movements.sort((a, b) => {
    a - b;
  })
);
//Descending order
console.log(
  movements.sort((a, b) => {
    if (b > a) return 1;
    if (b < a) return -1;
  })
);

console.log(
  movements.sort((a, b) => {
    b - a;
  })
);

//Creating and filling arrays
console.log([1, 2, 3, 4, 5, 6, 7]);
console.log(new Array(1, 2, 3, 4, 5, 6, 7));
//EMTY ARRAY + FILL METHOD
// new Array with number alone creates that number of emtpy values in the array

const x = new Array(7);
console.log(x);
//most methods dont work with empty arrays like map
console.log(x.map(() => 5));
//FILL
//mutates original array
//the fill method is mommonly used wiyh emty arrays
//first parameter is value that is being inserted in
//second parameter is start of the fill(fills to the end if no third parameter is specified)
//third parameter is where the fill stops right before
x.fill(1, 3, 5);
console.log(x);
const arr4 = [1, 2, 3, 4, 5, 6, 7];
arr4.fill(23, 2, 6);
console.log(arr4);
//Array.from() function
// callback function with no parameters will simply fill the array with the return value
const y = Array.from({ length: 7 }, () => 1);
console.log(y);
//callback first parameter is every value in the array and is not used
//callback second parameter is the index
const z = Array.from({ length: 7 }, (cur, i) => i + 1);
console.log(z);
//random dice array of 100 values
const randomDice = Array.from(
  { length: 100 },
  () => Math.trunc(Math.random(1) * 6) + 1
);
console.log(randomDice);
//Iterables can be created into arrays with Array.from()
//no information, just divs from array
const movementsUI = Array.from(document.querySelectorAll('.movements__value'));
console.log(movementsUI);
//takes information when the label is click (so after a user logs in)
//works because the text was converted into an array and is organizd in an array-like structure
//Second parameter is an inbuit mapping funtion
labelBalance.addEventListener('click', function () {
  const movementsUI = Array.from(
    document.querySelectorAll('.movements__value'),
    el => el.textContent.replace('€', '')
  );
  console.log(movementsUI);
  //this also creates an array but the mapping must be done seperately
  const movementsUI2 = [...document.querySelectorAll('.movements__value')];
  console.log(movementsUI2.map(el => el.textContent.replace('€', '')));
});
//Arrays methods practice
//1)
//takes all arrays from each object then flattens them into one array
const bankDepositsSum = accounts
  .flatMap(acc => acc.movements)
  .filter(x => x > 0)
  .reduce((sum, cur) => sum + cur, 0);
console.log(bankDepositsSum);
//2)
//IMPORTANT
const numDeposits1000 = accounts
  .flatMap(acc => acc.movements)
  .filter(x => x >= 1000).length;
console.log(numDeposits1000);
//Using reduce
//cannot use ++ operator in reduce because it returns the original value
const numDeposits1000reduce = accounts
  .flatMap(acc => acc.movements)
  .reduce((count, cur) => (cur >= 1000 ? ++count : count + 0), 0);
console.log(numDeposits1000reduce);
//++ operator changes the varible but does not return the updated variable which the reduce method needs
let a = 10;
console.log(a++);
console.log(a);
//solution to the ++ operator not returning updated varible
//prefix ++ operator returns the updated varible
console.log(++a);

//3)
const { depositss, withdrawalss } = accounts
  .flatMap(acc => acc.movements)
  .reduce(
    (sums, cur) => {
      cur > 0 ? (sums.depositss += cur) : (sums.withdrawalss += cur);
      return sums;
    },
    { depositss: 0, withdrawalss: 0 }
  );
console.log(depositss, withdrawalss);

//4)
//this is  nice title => This Is a Nice Title
const converTitleCase = function (title) {
  const capitalize = str => str[0].toUpperCase() + str.slice(1);
  const exceptions = ['a', 'an', 'the', 'but', 'or', 'on', 'in', 'with', 'and'];

  const titleCase = title
    .toLowerCase()
    .split(' ')
    .map(word => (exceptions.includes(word) ? word : capitalize(word)))
    .join(' ');
  return capitalize(titleCase);
};
console.log(converTitleCase('this is nice title'));
console.log(converTitleCase('this is a LONG title but not too long'));
console.log(converTitleCase('and here is another title with an EXAMPLE'));
