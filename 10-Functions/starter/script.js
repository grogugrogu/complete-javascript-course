'use strict';
//DEFAULT PARAMAETERS
// parameters used to define other default parameters must be before it's use
//E.g numPassengershas to be defined before to be able to be used with price below
const bookings = [];
const createBooking = function (
  flightNum,
  numPassengers = 1, // = 1 sets the default if it is undefined or nothing is inside the function
  price = 199 * numPassengers // numPassengers parameter must be placed before price to be used in it's default
) {
  const booking = {
    flightNum,
    numPassengers,
    price,
  };
  console.log(booking);
  bookings.push(booking);
};
createBooking('LH123');
createBooking('LH123', 2, 800);
createBooking('LH123', 2);
createBooking('LH123', 5);
createBooking('LH123', undefined, 1000); // skipping a parameter (set it to undefined)

// How passing arguments work: Value vs Reference
const flight = 'LH234';
const jonas = {
  name: 'Jonas Schmedtmann',
  passport: 24739479284,
};
const checkIn = function (flightNum, passenger) {
  flightNum = 'Lh999';
  passenger.name = 'Mr.' + passenger.name; //Do not do this
  if (passenger.passport === 24739479284) {
    console.log('Checked in');
  } else {
    console.log('Wrong Passport!');
  }
};
checkIn(flight, jonas);
console.log(flight); //primitive type so flightNum is a copy of original value and does not change the variable
console.log(jonas); //reference happened in function cause it was an object and pointed to the same spot in the memory

const newPassport = function (person) {
  person.passport = Math.trunc(Math.random() * 10000000000000);
}; //Do not do this (assign object values in functions as it references the actual object in memory)
//Javscript only has pasing by value even if it looks like it's passing by reference
newPassport(jonas);
checkIn(flight, jonas);

//FUNCTIONS ACCEPTING CALLBACK FUNCTIONS
const oneWord = function (str) {
  //.name property will give the name of the function
  return str.replace(/ /g, '').toLowerCase();
};

const upperFirstWord = function (str) {
  const [first, ...others] = str.split(' ');
  return [first.toUpperCase(), ...others].join(' ');
};
//Higher-order function
const transformer = function (str, fn) {
  console.log(`Original string: ${str}`);
  console.log(`Transformed string: ${fn(str)}`);
  console.log(`Transformed string: ${fn.name}`); //gives the function name
};

transformer('Javascript is the best!', upperFirstWord);
transformer('Javascript is the best!', oneWord);
//JS uses callbacks all the time
const high5 = function () {
  console.log('WAVE');
};
/*
document.body.addEventListener('click', high5);
['Jonas', 'Martha', 'Adam'].forEach(high5);
*/
//Functions returning functions
const greet = function (greeting) {
  return function (name) {
    console.log(`${greeting} ${name}`);
  };
};
const greeterHey = greet('Hey');
greeterHey('Jonas');
greeterHey('Steven'); // greeting is still coming from greet function
greet('Hey')('Joe');
//Chalenge Arrow function
const greetArr = greeting => name => console.log(`${greeting} ${name}`);
greetArr('Hi')('JIMMY');
//CALL AND APPLY METHODS
const lufthansa = {
  airline: 'Lufthansa',
  iataCode: 'LH',
  bookings: [],
  //book: function(){},
  book(flightNum, name) {
    console.log(
      `${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`
    );
    this.bookings.push({ flight: `${this.iataCode}${flightNum}`, name });
  },
};

lufthansa.book(239, 'Jonas Schmedtmann');
lufthansa.book(635, 'John Smith');

const eurowings = {
  airline: 'Eurowings',
  iataCode: 'EW',
  bookings: [],
};

//IMPORTANT TO UNDERSTAND CALL, APPLY AND BIND METHODS
const book = lufthansa.book; //now treats the funtion as a regular function call
//DOES NOT WORK book(23, 'Sarah Williams'); not in a object but only refers to the function itself without the object

//Call method
//First argument is object with that function
//Other arguments are the arguments for that function
book.call(eurowings, 23, 'Sarah Williams'); //book function points to eurowings
// Call() method is used with functions that refer to an object and lets that function refer to that object
console.log(eurowings);

book.call(lufthansa, 239, 'Mary Cooper'); //points at lufthana
console.log(lufthansa);

const swiss = {
  airline: 'Swiss Air Lines',
  iataCode: 'LX',
  bookings: [],
};

book.call(swiss, 583, 'Mary Cooper');

//Apply Method
//not that used anymore in javascript, there is a better way
const flightData = [583, 'George Cooper'];
book.apply(swiss, flightData);
console.log(swiss);
//Better way(modern and easier)
//spread method inserts the whole array
book.call(swiss, ...flightData);
//BIND METHOD
//allows us to manually set the this.keyword for any function call and is bined
const bookEW = book.bind(eurowings); //sets the eurowing object to be refferred to when the book function is called
const bookLH = book.bind(lufthansa);
const bookLX = book.bind(swiss);
bookEW(23, 'Steven Williams');
//Partial application (part of the original function is already set)
const bookEW23 = book.bind(eurowings, 23); //With bind you can also preset parameters in the function like call
bookEW23('Jonas Schmettmann');
bookEW23('Marta Cooper');

// BIND method with Event Listeners
lufthansa.planes = 300;
lufthansa.buyPlane = function () {
  console.log(this);
  this.planes++;
  console.log(this.planes);
};
//Incorrect way, this refers to the button
document.querySelector('.buy').addEventListener('click', lufthansa.buyPlane);
//Correct way,this refers to the lufthansa object cause of bind
document
  .querySelector('.buy')
  .addEventListener('click', lufthansa.buyPlane.bind(lufthansa));
//Partial application
const addTax = (rate, value) => value + value * rate;
console.log(addTax(0.1, 200));
console.log(addTax(undefined, 200));
//like default parameters but different
//Creates a specific function from a more general fuction
const addVat = addTax.bind(null, 0.23);
console.log(addVat(100));
console.log(addVat(23));
//Challenge
const addTaxRate = function (rate) {
  return function (value) {
    return value + value * rate;
  };
};
const addVat2 = addTaxRate(0.23);
console.log(addVat2(100));
console.log(addVat2(23));
console.log(addTaxRate(0.23)(100));

//Challenge 1
/* 
Let's build a simple poll app!

A poll has a question, an array of options from which people can choose, and an array with the number of replies for each option. This data is stored in the starter object below.

Here are your tasks:

1. Create a method called 'registerNewAnswer' on the 'poll' object. The method does 2 things:
  1.1. Display a prompt window for the user to input the number of the selected option. The prompt should look like this:
        What is your favourite programming language?
        0: JavaScript
        1: Python
        2: Rust
        3: C++
        (Write option number)
  
  1.2. Based on the input number, update the answers array. For example, if the option is 3, increase the value AT POSITION 3 of the array by 1. Make sure to check if the input is a number and if the number makes sense (e.g answer 52 wouldn't make sense, right?)
2. Call this method whenever the user clicks the "Answer poll" button.
3. Create a method 'displayResults' which displays the poll results. The method takes a string as an input (called 'type'), which can be either 'string' or 'array'. If type is 'array', simply display the results array as it is, using console.log(). This should be the default option. If type is 'string', display a string like "Poll results are 13, 2, 4, 1". 
4. Run the 'displayResults' method at the end of each 'registerNewAnswer' method call.

HINT: Use many of the tools you learned about in this and the last section 😉

BONUS: Use the 'displayResults' method to display the 2 arrays in the test data. Use both the 'array' and the 'string' option. Do NOT put the arrays in the poll object! So what shoud the this keyword look like in this situation?

BONUS TEST DATA 1: [5, 2, 3]
BONUS TEST DATA 2: [1, 5, 3, 9, 6, 1]

GOOD LUCK 😀
*/

const poll = {
  question: 'What is your favourite programming language?',
  options: ['0: JavaScript', '1: Python', '2: Rust', '3: C++'],
  //This creates an array of 4 zeroes
  answers: new Array(4).fill(0),
  displayResults: function (type = 'array') {
    return type === 'string'
      ? console.log(`Poll results are ${this.answers.join(' ,')}`)
      : console.log(this.answers);
  },
  registerNewAnswer: function () {
    let answer = Number(
      prompt(
        `${this.question}\n${this.options.join('\n')}\n(Write option number)`
      )
    );
    typeof answer === 'number' &&
      answer < this.answers.length &&
      this.answers[answer]++; //no need for if statement, this will return the final one statement if the rest are true

    this.displayResults('string');
    this.displayResults();
  },
};

document
  .querySelector('.poll')
  .addEventListener('click', poll.registerNewAnswer.bind(poll));

poll.displayResults('string');
poll.displayResults('array');

poll.displayResults.call({ answers: [5, 2, 3] }); //works because display results is expecting an object {} with the property answers
poll.displayResults.call({ answers: [1, 5, 3, 9, 6, 1] }, 'string');

const runOnce = function () {
  console.log('This will never run again');
};
runOnce();

//IIFE Immediately invoked functions
//Great to hide variables
//Mainly used to jsut invoke a function just once
(function () {
  console.log('This will never run again');
  const isPrivate = 23; //cannot be accessed
})();

(() => console.log('This will Also never run again'))();

{
  const isPrivate = 23; //cannot be accessed
  var notPrivate = 46; //not private, can be acccessed
}

//Closures
//Any function has access to the variables within the execution context that was created even if it's exeuction context is gone
//Below is an exmaple
const secureBooking = function () {
  let passengerCount = 0; //Is accessible for booker because functions have access to the variables in the execution context it was created in
  return function () {
    passengerCount++;
    console.log(`${passengerCount} Passengers`);
  };
};

//the booker function has access to passengerCount still, this is called a closure
//IMPORTANT: Even if there is a global variable named passengerCount it would still use the one or look for the one in the closure( the function that created it)
const booker = secureBooking();

booker();
booker();
booker();

console.dir(booker);

//Closure Examples
//functions can access variables from their parent even if they were decared outside of the parent
//1)
let f;
const g = function () {
  const a = 23;
  f = function () {
    console.log(a * 2);
  };
};

const h = function () {
  const b = 777;
  f = function () {
    console.log(b * 2);
  };
};

g();
f();
console.dir(f);

//Reassigning f function
//Re-assigned by h after h() is invoked
//New closure for f after h() is invoked
//h() 'Reborns' the f function
h();
f();
console.dir(f);
//2)
//Closures also include the parents arguments as those are considered local variables
const boardPassengers = function (n, wait) {
  const perGroup = n / 3;
  setTimeout(function () {
    //This callback function was executed completely independently from it's parent but is still able to access the variables from it's parent function environemnt
    console.log(`We are now boarding all ${n} passengers`);
    console.log(`There are 3 groups each with ${perGroup} passengers`);
  }, wait * 1000);
  console.log(`Will Start boarding in ${wait} seconds`);
};
const perGroup = 1000;
//boardPassengers will ignore the above perGroup variable in favor of it's parent functions perGroup variable
//Closures even have prority over the scope chain
boardPassengers(180, 3);
//Challege 2
//Even though the function runs once, the closure is still present
//The second function is waiting for the event and even though the birthplace already occured, the addventlistener function is still connected to it's parent's variables
(function () {
  const header = document.querySelector('h1');
  header.style.color = 'red';
  document.querySelector('body').addEventListener('click', function () {
    header.style.color = 'blue';
  });
})();
