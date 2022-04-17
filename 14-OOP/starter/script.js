'use strict';

//////////////////////////////////////////////
//CONSTRUCTOR FUNCTIONS AND THE new OPERATOR

//arrow functions will not work as a function constructor
const Person = function (firstName, birthYear) {
  //Instance properties
  //Will make the objects have these as their own properties
  this.firstName = firstName;
  this.birthYear = birthYear;

  //Never create a method inside of a constructor function
  //Terrible for permance of your code
  //This way attatches the method to every single object
  //   this.calcAge = function () {
  //     console.log(2037 - birthYear);
  //   };
};

const jonas = new Person('Jonas', 1991);

console.log(jonas);

//setting functions to the constructor object without .prototype wil result in a static method available only to the constructor
//this method is not inherited
Person.hey = function () {
  console.log('Hey there');
  //this will refer to the constructor function
  //this keyword will always be the object that is calling the method ( the constructor object in this case)
  console.log(this);
};
Person.hey();

//1) New {} (empty object) is created
//2) function is called, this = {}. This key word is the new empty object
//3) {} (object) is linked to prototype.
//4)function automatically returns the newly created object {} from the beginning.

const matilda = new Person('Matilda', 2017);
const jack = new Person('Jack', 1975);
console.log(matilda, jack);

const jay = 'Jay';

console.log(jonas instanceof Person);
console.log(jay instanceof Person);

//Protoypes
console.log(Person.prototype);

//how to assign method properties to classes
//this is for performance
Person.prototype.calcAge = function () {
  console.log(2037 - this.birthYear);
};

jonas.calcAge();
matilda.calcAge();

//checks for the methods in the objects prototype with __proto__
console.log(jonas.__proto__);
// .prototype is the prototype of al objects created with the Person constructor function but not the constructor function
//should be called .prototypeOfLinkedObjects
console.log(jonas.__proto__ === Person.prototype);

console.log(Person.prototype.isPrototypeOf(jonas));
//Will be false
console.log(Person.prototype.isPrototypeOf(Person));

//the species property will be on the protoype but not the object itself
Person.prototype.species = 'Homo Sapiens';
console.log(jonas, jonas.species, matilda.species);

//wil be true because the property is inside of the object.
console.log(jonas.hasOwnProperty('firstName'));
//Will be false as this is a prototype property and not it's own
//simply has access to it from it's prototype but it's not the objects
console.log(jonas.hasOwnProperty('species'));

//prototype property of person constructor and prototype of persons's objects
console.log(jonas.__proto__);
//prototype property of object constructor and prototype of objects objects
console.log(jonas.__proto__.__proto__);
//the prototype of object
console.log(jonas.__proto__.__proto__.__proto__);

//constructor of person constructor
console.dir(Person.prototype.constructor);

const arr = [3, 6, 4, 5, 6, 9, 3, 9, 6];
//new Array === []
console.log(arr.__proto__);
//protoype of the array constructor is the prototype of all the arrrays
console.log(arr.__proto__ === Array.prototype);
// protoype of the Array constructor is Object prototype property
console.log(arr.__proto__.__proto__);

//adding a new method to prototype property of Array constructor
//all arrays will inherit this method
Array.prototype.unique = function () {
  return [...new Set(this)];
};
//Generally not a good idea to do this however.
//1) next version of js might add another methd with the same name and break your code
//2) working with a team that uses multiple methods on a builtin constructor will get messy and create bugs
console.log(arr.unique());

const h1 = document.querySelector('h1');
console.dir(h1);
console.dir(x => x + 1);

//CODING CHALLENGE 1
//1)
const Car = function (make, speed) {
  (this.make = make), (this.speed = speed);
};
//2)
Car.prototype.accelerate = function () {
  this.speed += 10;
  console.log(`${this.make} is going at ${this.speed}km/h`);
};
//3)
Car.prototype.brake = function () {
  this.speed -= 5;
  console.log(`${this.make} is going at ${this.speed}km/h`);
};
//4)
const BMW = new Car('BMW', 120);
const Mercedes = new Car('Mercedes', 95);

BMW.accelerate();
Mercedes.accelerate();
BMW.brake();
Mercedes.brake();

//ES6 Classes (prototype)
//classs are basiclly just another type of function
//Class expressions
const PersoCL = class {};

//Class declaration
class PersonCl {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }
  //Instance methods
  //methods will be dded to .prototype property
  //available to all objects created from the constructor
  calcAge() {
    console.log(2037 - this.birthYear);
  }
  //is treated as a property
  get age() {
    return 2037 - this.birthYear;
  }
  //Setting a property that already exists
  set fullName(name) {
    console.log(name);
    if (name.includes(' ')) this._fullName = name;
    else alert(`${name} is not a full name`);
  }

  get fullName() {
    return this._fullName;
  }

  //Static method (only available for constructor)
  static hey() {
    console.log('Hey there');
    //this will refer to the constructor function
    //this keyword will always be the object that is calling the method ( the constructor object in this case)
    console.log(this);
  }
}

const jessica = new PersonCl('Jessica Davis', 1996);
console.log(jessica);
jessica.calcAge();
console.log(jessica.age);

console.log(jessica.__proto__ === PersonCl.prototype);
//
PersonCl.prototype.greet = function () {
  console.log(`Hey ${this.firstName}`);
};
//Both greet and calcage will be on the prototype
console.log(PersonCl.prototype);

//1) Classes are not hoisted
//2)Classes are first-class citzens
//3) Classes are executed in strict mode (even if u didn;t declare strict mode)
const walter = new PersonCl('Walter White', 1965);

console.log(walter);
PersonCl.hey();

//SETTERS AND GETTERS
//not mandatory to have a setter and  getter
//getters and setters work more like properties than funtions
const account = {
  owner: 'jonas',
  movements: [200, 530, 120, 300],
  get latest() {
    return this.movements.slice(-1).pop();
  },
  //
  set latest(mov) {
    this.movements.push(mov);
  },
};
//When calling a getter use it as if it were a property
//this accesses the getter
console.log(account.latest);

//this accesses the setter
account.latest = 50;
console.log(account.latest);

//STATIC METHODS
//not availble to the construtcors children but available to it's constructor only
//Array.from is not available on arrays but only the array constructor
//it is attatach to the Array constructor just so developers know it is related to arrays
console.log(Array.from(document.querySelectorAll('h1')));
//Number.parseFloat() <- is also a static method

//Object.Create()
const PersonProto = {
  calcAge() {
    console.log(2037 - this.birthYear);
  },
  //manual way of intializing (not a constructor but a bit similar)
  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};

const steven = Object.create(PersonProto);
console.log(steven);
steven.name = 'Steven';
steven.birthYear = 2002;

steven.calcAge();

console.log(steven.__proto__ === PersonProto);

const sarah = Object.create(PersonProto);
sarah.init('Sarah', 1979);
sarah.calcAge();

//CODING CHALLENGE 2)
//1)
class Car1 {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }

  accelerate() {
    this.speed += 10;
    console.log(`${this.make} is going at ${this.speed}km/h`);
  }
  brake() {
    this.speed -= 5;
    console.log(`${this.make} is going at ${this.speed}km/h`);
    return this;
  }
  get speedUS() {
    return this.speed / 1.6;
  }
  //since the getter reverses what was done in the setter u wont se it return when u log the speedUS of the objet
  //You will however see the result of the setter in the speed property of the object
  set speedUS(speed) {
    this.speed = speed * 1.6;
  }
}

const BMW1 = new Car1('BMW', 120);
const Mercedes1 = new Car1('Mercedes', 95);

BMW1.speedUS = 2;
console.log(BMW1.speed);
console.log(BMW1.speedUS);

//Ingeritance between 'Classes': Constructor functions

const Student = function (firstName, birthYear, course) {
  //does not work, treated as a refular function call in another conststuor
  //Person(firstName,birthYear)
  //Proper method
  //refers to the Person constructor when you use call
  Person.call(this, firstName, birthYear);
  this.course = course;
};

//Linking prototypes
//gives the student prototype it's methods
Student.prototype = Object.create(Person.prototype);

Student.prototype.introduce = function () {
  console.log(`My name is ${this.firstName} and I study ${this.course}`);
};
const mike = new Student('Mike', 2020, 'Computer Science');
console.log(mike);
mike.introduce();
// mike.calcAge();

console.log(mike.__proto__);
console.log(mike.__proto__.__proto__);

console.log(mike instanceof Student);
console.log(mike instanceof Person);
console.log(mike instanceof Object);

Student.prototype.constructor = Student;
console.dir(Student.prototype.constructor);

//Coding Challenge 3

//1)
const EV = function (make, speed, charge) {
  Car.call(this, make, speed);
  this.charge = charge;
};
EV.prototype = Object.create(Car.prototype);

//2)
EV.prototype.chargeBattery = function (chargeTo) {
  this.charge = chargeTo;
  console.log(`Battey at: ${this.charge}%`);
};
//3)
//When there are two methods in the prototype chain the closest one to the object will be used
EV.prototype.accelerate = function () {
  this.speed += 20;
  this.charge--;
  console.log(
    `${this.make} going at ${this.charge}km/h, with a charge of ${this.charge}%`
  );
};

//4)
const tesla = new EV('Tesla', '120', 23);
tesla.brake();
tesla.accelerate();
tesla.chargeBattery(50);
tesla.brake();
tesla.accelerate();
EV.prototype.constructor = EV;
console.log(EV.prototype.constructor);

//Inheritance between Classes: ES6 classes

class StudentCl extends PersonCl {
  constructor(fullName, birthYear, course) {
    // super(fullName,birthYear) is the same as PersonCl.call(this,fullName, birthYear)
    //super() needs to Always happen first
    super(fullName, birthYear);
    //if this.course wasn't needed you don't need a constructor function or super function at all
    this.course = course;
  }
  introduce() {
    console.log(`My name is ${this.fullName} and I study ${this.course}`);
  }
  calcAge() {
    console.log(
      `I'm ${
        2037 - this.birthYear
      } years old, but as a student I feel more life ${
        2037 - this.birthYear + 10
      }`
    );
  }
}

const marthaCl = new StudentCl('Martha Jones', 2012, 'Computer Science');
marthaCl.introduce();
//available from the Person prototype
marthaCl.calcAge();

//Inheritance Between 'Classes': Object.create
//This version of inheritance does not use constructors, new operator and prototype properties
const stevan = Object.create(PersonProto);
//PersonProto is the prototype of StudentProto
const StudentProto = Object.create(PersonProto);
StudentProto.init = function (firstName, birthYear, course) {
  PersonProto.init.call(this, firstName, birthYear);
  this.course = course;
};
StudentProto.introduce = function () {
  console.log(`My name is ${this.firstName} and I study ${this.course}`);
};

//PersonProto is the prototype of student proto which is jey's prototype
const jey = Object.create(StudentProto);
jey.init('Jey', 2010, 'Computer Science');
jey.introduce();
jey.calcAge();

//1)Public fields
//2)Private fields
//3)Public methods
//4)Private methods
//(there is also the static versions)
class Account {
  //Public fields (on instances not prototype)
  //referanceable by the this keyword
  locale = navigator.language;
  //Private fields (instances not on prototype)
  #movements = [];
  #pin;

  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;
    //protected
    // _ <- before a property means to not touch it (this is a convention) should not be accessed n the public API
    this.#pin = pin;

    this.locale = navigator.language;

    console.log(`Thanks for opening an account, ${owner}`);
  }

  //3) Public methods
  //Public interface of our objects
  //better than manually manipulating objects

  getMovements() {
    return this.#movements;
  }
  deposit(val) {
    this.#movements.push(val);
    return this;
  }
  //abstracts the fact we have to make a negative movement
  //we abstracted it from the user so they don't need to care about
  withdraw(val) {
    this.deposit(-val);
    return this;
  }

  requestLoan(val) {
    if (this.#approvedLoan(val)) {
      this.deposit(val);
      console.log(`Loan Approved`);
      return this;
    }
  }

  //4) Privates methods
  #approvedLoan(val) {
    return true;
  }
}

const acc1 = new Account('Jonas', 'EUR', 1111);
console.log(acc1);

// acc1.movements.push(250);
// acc1.movements.push(-140);
acc1.deposit(250);
acc1.withdraw(140);
acc1.requestLoan(1000);
console.log(acc1.getMovements());

console.log(acc1);
console.log(acc1);

// console.log(acc1.#movements);

//Chaining
//need to return this so the object is returned and the methods can continue to access the objet when chained
acc1.deposit(300).deposit(500).withdraw(35).requestLoan(25000).withdraw(4000);
console.log(acc1.getMovements());

//Coding Challenge 4

class EVCl extends Car1 {
  #charge;
  constructor(make, speed, charge) {
    super(make, speed);
    this.#charge = charge;
  }
  chargeBattery(chargeTo) {
    this.#charge = chargeTo;
    console.log(`Battery at: ${this.#charge}%`);
    return this;
  }

  accelerate() {
    this.speed += 20;
    this.#charge--;
    console.log(
      `${this.make} going at ${this.speed}km/h, with a charge of ${
        this.#charge
      }%`
    );
    return this;
  }
}

const rivian = new EVCl('Rivian', 120, 23);

rivian.chargeBattery(50).accelerate().brake();
console.log(rivian.speedUS);
