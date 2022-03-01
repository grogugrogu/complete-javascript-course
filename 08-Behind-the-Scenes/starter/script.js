'use strict';
function calcAge(birthYear) {
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
calcAge(1991);
