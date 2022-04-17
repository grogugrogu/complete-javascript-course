'use strict';
/* function calcAge(birthYear) {
  const age = 2037 - birthYear;
  function printAge() {
    let output = `${firstName}, you are ${age}, born in ${birthYear}`;
    console.log(output);
    if (birthYear >= 1981 && birthYear <= 1996) {
      const firstName = 'steven'; //javascript looks for the variable in the current scope first over any variable lookups then ignores others if fround in the current scope or nearest scope with the same name.
      output = 'NEW OUTPUT'; // THIS WILL CHANGE THE VARIABLE IN AN OUTER SCOPE CAUSE IT'S NOT
      console.log(output);
      var millenial = true;
      const str = `Oh and you're a millenial ${firstName}`;
      console.log(str);
      function add(a, b) {
        return a + b;
      }
    }
  }
  printAge();
  return age;
}

const firstName = 'Jonas';
calcAge(1991); */

/*
//variables
console.log(me);
//console.log(year);
//console.log(job);

var me = 'jonas'; // not really used anymore. If used before stated. It will appear undefined
let job = 'teacher'; // if used before stated will not work
const year = 1991; // if used before stated will not work

// Functions
console.log(addDecl(2, 3));
//console.log(addExpr(2, 3));
//console.log(addArrow(2, 3));

function addDecl(a, b) {
  //function will work if used before declaration
  return a + b;
}

const addExpr = function (a, b) {
  //function will not work before expression is in TDZ(temporal dead zone). If declared with var it won't work also as it's treated as undefined. Applies to arrow function as well
  return a + b;
};

const addArrow = (a, b) => a + b; //returns a+b implicitly. So no need to type return

if (!numProducts) deleteShoppingCart(); // will delete cause var is hoisted as undefined and  creates a falsy value
var numProducts = 10;
function deleteShoppingCart() {
  console.log('all products delted');
}

var x = 1; // var will create a property in the window object
let y = 2;
const z = 3;
console.log(x === window.x);
console.log(y === window.y);
console.log(y === window.y);
*/

//THIS, Arrow vs Declaration Vs Expression

console.log(this); // this will refer to the window

const calcAge = function (birthYear) {
  console.log(2037 - birthYear);
  console.log(this); // this will refer to the function
};
calcAge(1991);

const calcAgeArrow = birthYear => {
  //Arrow function's refer to it's function's parent (the window in this case)
  console.log(2037 - birthYear);
  console.log(this); // this will refer to the window
};
calcAgeArrow(1981);

const jonas = {
  year: 1998,
  calcAge: function () {
    console.log(this); // this with method calls will refer to the object
    console.log(2037 - this.year);
  },
};

jonas.calcAge();

const matilda = {
  year: 2017,
};

matilda.calcAge = jonas.calcAge;
matilda.calcAge();
const f = jonas.calcAge;
//f(); // will display undefined as the this cannot grab the year. Does not store the age. Happens because f is just a regular function call. No owner of the function.

var firstName = 'Matilda';

const jona = {
  //the brackets on an object are not code blocks but object literals
  firstName: 'jonas',
  year: 1991,
  calcAge: function () {
    console.log(this); // this with method calls will refer to the object
    console.log(2037 - this.year);

    /*//solution 1
    const self = this; //One solution to isMillenial(); function call. Replace this to self instead if using this solution
    const isMillenial = function () {
      console.log(self);
      console.log(self.year >= 1981 && self.year <= 1996);

      //console.log(this); does not work
      //console.log(this.year >= 1981 && this.year <= 1996); does not work when isMillenial() called
    };*/
    //solution 2
    const isMillenial = () => {
      // works because arrow function inherits it's this from it's parent function. Does not refer to window in this case.
      console.log(this);
      console.log(this.year >= 1981 && this.year <= 1996);
    };
    isMillenial(); //treats it as a regular function call and is undefined. has to have the variable name. solution 1: const self = this;
  },

  greet: () => {
    console.log(`${this}`);
    console.log(`Hey ${this.firstName}`);
  }, //this keyword is the window object in this function
}; //everything in an object is still in global scope

jona.greet();

jona.calcAge();

function addDecl(a, b) {
  console.log(arguments); //applies to function declarations
  return a + b;
}
addDecl(2, 3);

const addExpr = function (a, b) {
  console.log(arguments); //arguments applies to function expressions
  return a + b;
};
addExpr(2, 3);

const addArrow = (a, b) => {
  //console.log(arguments); //arguments cannot be used with arrow functions
  a + b;
};

addArrow(2, 3);

let age = 30;
let oldAge = age;
age = 31;
console.log(age);
console.log(oldAge);

const me = {
  name: 'gali',
  age: 19,
};

const clone = me;
clone.age = 19.5;

console.log(me.age);
console.log(clone.age);

//primitive types
let lastName = 'Williams';
let oldLastName = lastName;
lastName = 'Davis';
console.log(lastName, oldLastName); //both varaibels refer to different values
//Reference types
const jessica = {
  first: 'Jessica',
  last: 'williams',
  age: 27,
};

const marriedJessica = jessica;

jessica.last = 'Davis';

console.log(jessica.last);
console.log(marriedJessica.last); //both variables refer to the same property in the heap. Same object essentially.

//copying objects (shallow clone)
const jessica2 = {
  first: 'Jessica',
  last: 'williams',
  age: 27,
  family: ['bob', 'jane'],
};
const jessicaCopy = Object.assign({}, jessica2); //shallow clone. Any reference types will be shared.
jessicaCopy.last = 'Davis';
console.log(jessica2);
console.log(jessicaCopy); //Refer to seperate properties. New object was actually created. Lastnames are different.

jessicaCopy.family.push('Mary');
jessicaCopy.family.push('John'); //both jessicas refer to the same family heap. So they share an array.
console.log(jessicaCopy);
console.log(jessica2); //both will point to the same array in the heap
