'use strict';

// Data needed for a later exercise
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

// Data needed for first part of the section
const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],
  order: function (starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },
  orderDelivery: function ({
    //destructures object passed through and set's a default
    starterIndex = 1,
    mainIndex = 0,
    time = '20:00',
    date,
  }) {
    console.log(
      `Order Recieved! ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} was order at ${time} on ${date}`
    );
  },
  orderPasta: function (ing1, ing2, ing3) {
    console.log(`Here is your delicious pasta with ${ing1},${ing2},${ing3}.`);
  },
  orderPizza: function (mainIngredient, ...otherIngredients) {
    console.log(mainIngredient);
    console.log(otherIngredients);
  },
  openingHours: {
    thu: {
      open: 12,
      close: 22,
    },
    fri: {
      open: 11,
      close: 23,
    },
    sat: {
      open: 0, // Open 24 hours
      close: 24,
    },
  },
};
/*

//ARRAY DESTRUCTURING
// basic destructuring
let arr = [1, 2, 3];
let a = arr[0];
let b = arr[1];
let c = arr[3];

let [x, y, z] = arr; //when [] is left side of equal sign, JS knows it should do destructuring

console.log(x, y, z);
console.log(arr); // destructuring does not affect the orignal array

//destructuring specfic values
let [main, , second] = restaurant.categories;
console.log(main, second);

let temp = main;
main = second;
second = temp;

console.log(main, second);
//switching variables values between other variables
[second, main] = [main, second];

console.log(main, second);
// Destructuring 2 return values from an object, see object above to further understand
console.log(restaurant.order(2, 0));
const [starter, mainCourse] = restaurant.order(2, 0);
console.log(starter, mainCourse);

//Nested destructuring
const nested = [2, 4, [5, 6]];
const [i, , j] = nested;
console.log(i, j);
const [l, , [m, k]] = nested;
console.log(l, m, k);

//Default values
const [p = 1, q = 1, r = 1] = [8, 9]; // default of all values will be 1 if no value is there for the destructuring.
console.log(p, q, r); // r will have a value of 1 since there is no value in the other array for r.

//OBJECT DESTRUCTURING
const { name, openingHours, categories } = restaurant;
console.log(name, openingHours, categories);
//renaming destructured object properties. Put: after the property from the object getting destructured
const {
  name: restaurantName,
  openingHours: hours,
  categories: tags,
} = restaurant;
console.log(restaurantName, hours, tags);
//defaults values for destrucutred object properties
const { menu = [], starterMenu: starters = [] } = restaurant; //menu will be an array since there's no corresponding property
console.log(menu, starters); //menu is empty, starters will be starterMenu from restaurant object
//Mutating variables
let a1 = 111;
let b1 = 999;
const obj = { a1: 23, b1: 7, c1: 14 };
({ a1, b1 } = obj); // have to wrap in parenthesis and cotain same name as object properties
console.log(a1, b1); //a1 = 21, b1 =7.
//Nested objects
const {
  fri: { open: o, close: n }, //creates variable called o and n. o stores friday object's open property and n stores the close property
} = openingHours;

console.log(o, n);

//Function destructuring, see restaurant object to see dthe destructuring take place within the paramater
restaurant.orderDelivery({
  //one object was passed. You can put a variable as well that's an object
  time: '7:21',
  date: 'March 3rd 2022',
  mainIndex: 2,
  starterIndex: 2,
});

restaurant.orderDelivery({
  //since method has default values, default values will be displayed

  date: 'March 3rd 2022',
});
*/
//SPREAD OPERATOR
const array = [2, 4, 6];
const newArray = [...array, 8, 10]; //... pread operator puts all the values from an array into something else.
console.log(newArray);
console.log(...newArray); //same as below. only logs the individual values
console.log(2, 4, 6, 8, 10);

const newMenu = [...restaurant.mainMenu, 'Gnocci']; //creates a completely new array and does not change the original
console.log(newMenu);

//Copy Array
const mainMenuCopy = [...restaurant.mainMenu];
//join Two arrays
const menus = [...restaurant.mainMenu, ...restaurant.starterMenu];
console.log(menus);

//iterables
const str = 'jonas';
const letters = [...str, ' ', 'S.']; // [j,o,n,a,s,' ','S.'] ... operator with string splits a string into single charactrs in an array.
console.log(letters);
console.log(...str); // 'j','o','n','a','s'  ... operator can be pass into only functions and arrays
//console.log(`${...str}`); this will not work

//Real-World Example Passing a whole array into a function
/*const ingredients = [
  prompt("Let's make pasta! ingredient 1?"),
  prompt('ingredient 2?'),
  prompt('ingredient 3?'),
];

console.log(ingredients);
restaurant.orderPasta(...ingredients); //instead of placing every ingredient, you can just use the spread operator to copy all the values into a function
*/

//Object spread operator
const newRestaurant = { founded: 1998, ...restaurant, founder: 'Giovanni' };
console.log(newRestaurant);
const restaurantCopy = { ...restaurant };
restaurantCopy.name = 'Risorante Roma';
console.log(restaurant.name);
console.log(restaurantCopy.name);

//COMPARISON OF SPREAD AND REST OPERATOR
//Spread operator on RIGHT SIDE of = sign
const arr = [1, 2, ...[3, 4]];
//REST operator on left side of = sign Takes the remaining elements of an array and puts it into a new array
const [e, f, ...others] = [1, 2, 3, 4, 5];
console.log(e, f, ...others);
//Rest and Spread together. Rest operator collects the rest of the array after the last variable(risotto). Does not collect any skipped elements
const [pizza, , risotto, ...otherFood] = [
  //rest must always be last
  ...restaurant.mainMenu,
  ...restaurant.starterMenu,
];

console.log(pizza, risotto, otherFood);
//Objects(rest operator)
const { sat, ...weekdays } = restaurant.openingHours; //collect the properties you put and rest operator will take the rest into the new variable after ...
console.log(weekdays);
//functions(rest operator) packs all arguments and puts them into an array
const add = function (...numbers) {
  let sum = 0;
  for (let i = 0; i < numbers.length; i++) {
    sum += numbers[i];
  }
  console.log(sum);
};

add(2, 3);
add(2, 3, 4);
add(2, 3, 4, 5, 57, 7);
//placing array into function that expects multiple parameters. Put spread operator into function and rest operator will transform it into array in functiion
const h = [2, 3, 4, 5, 6];
add(...h); //packs here then unpacks in function advantages are mre arguments

//Edge cases
//returns first ingredient then the rest as an array
restaurant.orderPizza('mushroom', 'onions', 'pineapple');
//returns only ingredient then empty array
restaurant.orderPizza('olives');

//SHORT CIRCUITING
//OR operators can: 1)use any data type, 2) return any data type, 3) short ciruit
//short circuits the first value that is a truthy value. or operator will automatically reutrn that first truthy the value
console.log(3 || 'Jonas');
console.log('' || 'Jonas');
console.log(true || 0);
console.log(undefined || null); //null still loges even though it's falsy
console.log(undefined || 0 || '' || 'hello' || 23 || null); //hello will be returned
const guests1 = restaurant.numGuests || 10; //if restaurants/numGuests exists it will display if not value will be 10
console.log(guests1); //will display 10 if restaurants.numGuests = 0 cause it's a falsy value

//AND operator
//short circuits the first value that is falsy. And operator will return that first falsy value
console.log(0 && 'gs'); //returns the first falsy value:0
console.log(6 && 'kf'); //if all values are true displays the last value 'kf'
console.log('Hello' && 23 && null && 'jonas'); //'null' will be returned
restaurant.orderPizza && restaurant.orderPizza('mushrooms', 'olives'); //will return the falsy one (if restaurant.orderPizza does notexist) if it does it will call the function with the arguments placed in

//NULLISH coalescing operator
//Will skip Null or undefined to find first value that's not null or undefined
//will return (0 or '') and not skip them
restaurant.thing = 0;
const guestsCorrect = restaurant.thing ?? 10;
console.log(guestsCorrect); //will return and not skip it like or operator

//LOGICAL ASSIGNMENT operators
const rest1 = {
  numGuests: 20,
  name: 'capri',
  thing: 0,
};
const rest2 = {
  name: 'La Piazza',
  owner: 'giovanni',
  password: 3242,
};
//rest1.numGuests = rest1.numGuests || 10; works but below is better way to write at line 253
//rest2.numGuests = rest2.numGuests || 10;
//OR Assignment Operator
rest1.numGuests ||= 10; //if it exists then it will be equal to itself if not it will be 10
rest2.numGuests ||= 10;
console.log(rest1.numGuests);
console.log(rest2.numGuests);
//Nullish coalescing assignment operator
rest1.thing ??= 10;
rest2.thing ??= 10;
console.log(rest1.thing); //will log 0 instead of 10 like Or Assignment operator
console.log(rest2.thing); //will log 10 since rest.thing is undefined
//And assignment operator
rest1.password &&= 'HIDDEN'; //will return undefined (first falsy value)
rest2.password &&= 'HIDDEN'; //if there is a password it will be assigned to the 'HIDDEN' STRING. (ignores first truthy value)
console.log(rest1.password);
console.log(rest2.password);

//CHALLENGE 1
const game = {
  team1: 'Bayern Munich',
  team2: 'Borrussia Dortmund',
  players: [
    [
      'Neuer',
      'Pavard',
      'Martinez',
      'Alaba',
      'Davies',
      'Kimmich',
      'Goretzka',
      'Coman',
      'Muller',
      'Gnarby',
      'Lewandowski',
    ],
    [
      'Burki',
      'Schulz',
      'Hummels',
      'Akanji',
      'Hakimi',
      'Weigl',
      'Witsel',
      'Hazard',
      'Brandt',
      'Sancho',
      'Gotze',
    ],
  ],
  score: '4:0',
  scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
  date: 'Nov 9th, 2037',
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
};
//task 1
let [players1, players2] = game.players;
console.log(players1);
console.log(players2);
//task2
let [gk, ...fieldPlayers] = players1; /// ...fieldPlayers stores the rest
console.log(gk, fieldPlayers);
//task3
const allPlayers = [...players1, ...players2];
console.log(allPlayers);
//task4
let players1Final = [...players1, 'Thiago', 'Coutinho', 'Perisic'];
console.log(players1Final);
//task 5;
let {
  odds: { team1, x: draw, team2 },
} = game;
console.log(team1, draw, team2);
//task 6;
let printGoals = function (...names) {
  for (let i = 0; i < names.length; i++) {
    console.log(names[i]);
  }
  console.log(`${names.length} Goals scored in total`);
};
printGoals('Davies', 'Muller', 'Lewandowski', 'Kimmich');
printGoals(...game.scored);
//task 7
team1 < team2 && console.log('Team 1 is more likely to win');
team1 > team2 && console.log('Team 2 is more likely to win');

//FOR OF LOOP
//the item variable is a placeholder that represents every array item that will be looped
const rmenu = [...restaurant.starterMenu, ...restaurant.mainMenu];
for (const item of rmenu) console.log(item);

//FOR OF LOOP desctructuing
//.entries() creates individual arrays with the position and value
//[0,firstValue],[1,secondValue],[2,thirdValue], etc.
//[i,el] accesses each item in the individul arrays.
//[i,el] === [0,firstValue]
for (const [i, el] of rmenu.entries()) {
  console.log(`${i + 1}: ${el}`);
}
//Object literals
//let's you put variables or functions without setting it to tht variable or function
//Simply place the variable or or function name and it works
let action = 'walk';
let run = function () {
  return 'john is running';
};
let john = {
  name: 'john',
  action,
  run() {
    return 'john is running';
  },
};

console.log(john.action);
console.log(john.run);

// OPTIONAL CHAINING
//No optional chanining
if (restaurant.openingHours && restaurant.openingHours.mon)
  console.log(restaurant.openingHours.mon.open);

// console.log(restaurant.openingHours.mon.open);

// WITH optional chaining
// ?. proceeds if everything before it exists
//if what before it exists does but is undefined, it will return undefined
//if it is not undefined, it will proceed to the code after ?.
console.log(restaurant.openingHours.mon?.open);
//there can be multiple optional chaining as well
console.log(restaurant.openingHours?.mon?.open);
//Example with nullish coalescing operator and for of loop
const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
for (const day of days) {
  const open = restaurant.openingHours[day]?.open ?? 'closed';
  console.log(`On ${day}, we open at ${open}`);
}

//optional chaining with methods
//?. goes before the parameters when dealing withn functions
console.log(restaurant.order?.(0, 1) ?? 'Method does not exist');
console.log(restaurant.orderRisotto?.(0, 1) ?? 'Method does not exist');
//optional chaining with arrays
const users = [{ name: 'jonas', email: 'hello@jonas.io' }];
console.log([users[0]?.name ?? 'User Array empty']);
//empty array
const userA = [];
console.log([userA[0]?.name ?? 'User Array empty']);

//For of loop with objects
for (const day of Object.keys(restaurant.openingHours)) {
  console.log(day);
}
// property Names
const properties = Object.keys(restaurant.openingHours);
console.log(properties);

let openStr = `We are open on ${properties.length} days:`;

for (const day of properties) {
  openStr += ` ${day},`;
}
console.log(openStr);
//property VALUES
const values = Object.values(restaurant.openingHours);
console.log(values);

//Entire object
const entries = Object.entries(restaurant.openingHours);
console.log(entries);
//Entire object with destructuring
//Eg. [key,{open,close}] === [thu,{open:12, close:7}]
// this will access the first item in of each array and the second item (which is an object)
//{open, close} will destructure the object in the second item of each array
for (const [key, { open, close }] of entries) {
  console.log(`On ${key} we open at ${open} and close at ${close}`);
}

//Coding challenge 2
//task 1
for (const [i, el] of game.scored.entries()) {
  console.log(`Goal ${i + 1}: ${el}`);
}

//task 2
let sum = 0;
for (let odd of Object.values(game.odds)) {
  sum += odd;
}
console.log(sum / Object.values(game.odds).length);

//task 3

for (const [team, odd] of Object.entries(game.odds)) {
  console.log(
    `Odd of ${team === 'x' ? 'draw' : `victory ${game[team]}`}: ${odd}`
  );
}

//Sets

const orderSet = new Set([
  'Pasta',
  'Pizza',
  'Pizza',
  'Risotto',
  'Pasta',
  'Pizza',
]);
console.log(orderSet);

console.log(new Set('Jonas'));
console.log(orderSet.size);
console.log(orderSet.has('Pizza'));
console.log(orderSet.has('Bread'));
orderSet.add('Garlic Bread');
orderSet.add('Garlic Bread');
orderSet.delete('Risotto');
console.log(orderSet);
for (const order of orderSet) console.log(order);
//Example
const staff = ['Waiter', 'Chef', 'Waiter', 'Manager', 'Chef', 'Waiter'];
const staffUnique = [...new Set(staff)];
console.log(staffUnique);
console.log(new Set(staffUnique).size);
console.log(new Set('jonasschedttmann').size);

//MAPS
const rest = new Map();
rest.set('name', 'Classico Italiano');
rest.set(1, 'Firenze, Italy');
console.log(rest.set(2, 'Lisbon, Portugal')); // set method returns updated map

rest
  .set('categories', ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'])
  .set('open', 11)
  .set('close', 23)
  .set(true, 'We are open :D')
  .set(false, 'We are closed :(');

console.log(rest.get('name'));
console.log(rest.get(true));
console.log(rest.get(1));

const time = 21;

console.log(rest.get(time > rest.get('open') && time < rest.get('close')));
console.log(rest.has('categories'));
rest.delete(2);
//rest.clear(); clears the map
//primitive values
rest.set([1, 2], 'Test'); //[1,2] alone does not refer to the same place in memory as they are primitive values
console.log(rest);
console.log(rest.size);
console.log(rest.get([1, 2])); //displays undefined
//variables
let arr2 = [1, 2];
rest.set(arr2, 'Test'); //[1,2] alone does not refer to the same place in memory as they are primitive values
console.log(rest);
console.log(rest.size);
console.log(rest.get(arr2));
//DOM elements. Maps can be used with dom elements for advanced functionality
rest.set(document.querySelector('h1'), 'Heading');
console.log(rest);

const question = new Map([
  ['question', 'What is the best programming language in the world?'],
  [1, 'C'],
  [2, 'Java'],
  [3, 'Javascript'],
  ['correct', 3],
  [true, 'Correct :)'],
  [false, 'Try Again!'],
]);
console.log(question);
//Convert object to Map. User Object.entries to create a map from an array or object easily
const hoursMap = new Map(Object.entries(restaurant.openingHours)); //
console.log(hoursMap);
// Quiz app
console.log(question.get('question'));
for (const [key, value] of question) {
  if (typeof key === 'number') console.log(`Answer ${key}: ${value}`);
}

const answer = 3;
console.log(answer);

console.log(question.get(question.get('correct') === answer));
//convert map to array
console.log(...question); // use spread operator
//map methods(after array conversion)
console.log(...question.entries());
console.log(...question.keys());
console.log(...question.values());
//Coding challenge 3
const gameEvents = new Map([
  [17, '⚽️ GOAL'],
  [36, '🔁 Substitution'],
  [47, '⚽️ GOAL'],
  [61, '🔁 Substitution'],
  [64, '🔶 Yellow card'],
  [69, '🔴 Red card'],
  [70, '🔁 Substitution'],
  [72, '🔁 Substitution'],
  [76, '⚽️ GOAL'],
  [80, '⚽️ GOAL'],
  [92, '🔶 Yellow card'],
]);
// task 1
const events = [...new Set(gameEvents.values())];
console.log(events);
//task 2
gameEvents.delete(64);
console.log(gameEvents);
//task 3
console.log(
  `An event happened, on average, every ${90 / gameEvents.size} minutes`
);
//task 4
for (const [key, value] of gameEvents) {
  console.log(
    key <= 45
      ? `[FIRST HALF] ${key}: ${value}`
      : `[SECOND HALF] ${key}: ${value}`
  );
}
//STRINGS
//Working with strings 1
const airline = 'TAP Air Portugal';
const plane = 'A320';
console.log(plane[0]);
console.log(plane[1]);
console.log(plane[2]);
console.log('B737'[0]);
console.log(airline.length);
console.log('B737'.length);
console.log(airline.indexOf('r'));
console.log(airline.lastIndexOf('r'));
console.log(airline.indexOf('Portugal')); //-1 if not found
console.log(airline.slice(4)); //4 is the beginning parameter, does not change original string return new string
console.log(airline.slice(4, 7)); //7 is the end parameter and does not include the string you want to end at but the one after it
console.log(airline.slice(0, airline.indexOf(' ')));
console.log(airline.slice(airline.lastIndexOf(' ') + 1));
console.log(airline.slice(-2));
console.log(airline.slice(1, -1));
const checkMiddleSeat = function (seat) {
  //B and E are middle seats
  const s = seat.slice(-1);
  if (s === 'B' || s === 'E') {
    console.log('You got the middle seat');
  } else console.log('You got lucky');
};
checkMiddleSeat('11B');
checkMiddleSeat('23C');
checkMiddleSeat('3E');
//javascript auto string to object conversion
console.log(typeof new String('jonas')); //this converts it manually but once you use amethod it is converted to an object
console.log(typeof new String('jonas').slice(0)); //is converted back to string
//Working with strings 2
console.log(airline.toLowerCase());
console.log(airline.toUpperCase());
// Fix capitalization in name
const passenger = 'jOnAS';
const passengerLower = passenger.toLowerCase();
const passengerCorrect =
  passengerLower[0].toUpperCase() + passengerLower.slice(1);
console.log(passengerCorrect);
//comparing email
const email = 'hello@jonas.io';
const loginEmail = ' Hello@Jonas.Io \n';
const lowerEmail = loginEmail.toLowerCase();
const trimedEmail = lowerEmail.trim(); //removes space in begining and end
console.log(trimedEmail);
//Replacing
const priceGB = '288,97£';
const priceUS = priceGB.replace('£', '$').replace(',', '.');
console.log(priceUS);

const announcement = 'All passengers come to boardig door 23. Boarding door 23';
console.log(announcement.replace('door', 'gate'));
console.log(announcement.replace(/door/g, 'gate'));
//Boolean
const planee = 'A320neo';
console.log(planee.includes('A320'));
console.log(planee.includes('xfn'));
console.log(planee.startsWith('air'));
console.log(planee.startsWith('A32'));

if (planee.startsWith('A32') && planee.endsWith('neo')) {
  console.log('Part of the NEW ARirbus family');
}
// practice exercise
const checkBaggage = function (items) {
  const baggage = items.toLowerCase();
  if (baggage.includes('knife') || baggage.includes('gun')) {
    console.log('You are not allowed on board');
  } else {
    console.log('You are allowed on board');
  }
};
checkBaggage('I have a laptop, some foof and a pocket Knife');
checkBaggage('Socks and camera');
checkBaggage('Got some snacks and a gun for protection');
//Working with strings 3
console.log('a+b+very+nice+string'.split('+'));
console.log('Jonas schmettmann'.split(' '));

const [firstName, lastName] = 'Jonas Schmedtmann'.split(' ');

const newName = ['Mr.', firstName, lastName.toUpperCase()].join(' ');
console.log(newName);
const capitalizeName = function (name) {
  const names = name.split(' ');
  const namesUpper = [];
  for (const n of names) {
    namesUpper.push(n[0].toUpperCase() + n.slice(1));
  }
  console.log(namesUpper.join(' '));
};
capitalizeName('jessica ann smith davis');
capitalizeName('jonas schettmann');
//Padding a string
const message = 'Go to gate 23';
console.log(message.padStart(25, '+').padEnd(35, '+'));
console.log('Jonas'.padStart(25, '+').padEnd(35, '+'));

const maskCreditCard = function (number) {
  const str = String(number);
  const last = str.slice(-4);
  return last.padStart(str.length, '*');
};
console.log(maskCreditCard(638646473));
console.log(maskCreditCard(433784638646473));
console.log(maskCreditCard('334859493847755774747'));
//Repeat
const message3 = 'Bad weather... All Depatures Delayed... ';
console.log(message3.repeat(5));
const planesInLine = function (n) {
  console.log(`There are ${n} planes in line ${':PLANE:'.repeat(n)}`);
};
planesInLine(5);
planesInLine(2);
planesInLine(3);

//Coding Challenge 4

document.body.append(document.createElement('textarea'));
document.body.append(document.createElement('button'));
function camelCase(text) {
  let arr = text.trim().toLowerCase().split('_');
  arr[1] = arr[1].replace(arr[1][0], arr[1][0].toUpperCase());
  return arr.join('');
}
console.log(camelCase('cameL_case'));
document.querySelector('button').addEventListener('click', function () {
  const text = document.querySelector('textarea').value;
  const rows = text.split('\n');
  let counter = 1;
  for (let [i, word] of rows.entries()) {
    let arr = word.trim().toLowerCase().split('_');
    arr[1] = arr[1].replace(arr[1][0], arr[1][0].toUpperCase());
    console.log(arr.join('').padEnd(20) + '!'.repeat(i + 1));
    counter += 1;
  }
});
//String Exercise
const flightss =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

// 🔴 Delayed Departure from FAO to TXL (11h25)
//              Arrival from BRU to FAO (11h45)
//   🔴 Delayed Arrival from HEL to FAO (12h05)
//            Departure from FAO to LIS (12h30)
console.log(flightss.split('+'));

const getCode = str => str.slice(0, 3).toUpperCase();
for (const flight of flightss.split('+')) {
  const [type, from, to, time] = flight.split(';');
  const output = `${type.startsWith('_Delayed') ? '🔴' : ''}${type.replaceAll(
    '_',
    ' '
  )} from ${getCode(from)} to ${getCode(to)} (${time.replace(
    ':',
    'h'
  )})`.padStart(36);
  console.log(output);
}
