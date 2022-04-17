//Importing module
//Individual imports and renaming
// import { addToCart, totalPrice as price, qt } from './shoppingCart.js';
// console.log(price, qt);
// addToCart('bread', 5);

console.log('Importing module');
//Importing All
//Eerything from the module will be exported as an object
//In this case the object's name will be ShoppingCart
// import * as ShoppingCart from './shoppingCart.js';
// ShoppingCart.addToCart('bread', 5);
// console.log(ShoppingCart.totalPrice);

//Importing default and imdividual

//Not deisrable
//do nt mix default and named exports combined
// import add, { addToCart, totalPrice as price, qt } from './shoppingCart.js';

//Live connection between modules
//{cart} is used here for the example that there is live connection to the moduke
//the cart will be updated from the module
//console.log will show that the card has all the food and quantity
import add, { cart } from './shoppingCart.js';
add('pizza', 2);
add('bread', 5);
add('apples', 4);

console.log(cart);

console.log('start fetching');
//Top-level await
//Works with modules
//Blocks entire execution of the module *Impotrtant
//use top-level await with caution

// const res = await fetch('https://jsonplaceholder.typicode.com/posts');
// const data = await res.json();
// console.log(data);
// console.log('something');

// const getLastPost = async function () {
//   const res = await fetch('https://jsonplaceholder.typicode.com/posts');
//   const data = await res.json();
//   console.log(data);

//   return { title: data.at(-1).title, text: data.at(-1).body };
// };

// //this will be a promise because theres no await
// //by the time we run the function the data will not have arrived yet
// const lastPost = getLastPost();
// console.log(lastPost);

// //not very clean
// // lastPost.then(last => console.log(last));

// //Proper method
// //top-level await only useable in modules
// //will return the value desired and not promise
// const lastPost2 = await getLastPost();
// console.log(lastPost2);

// const ShoppingCart2 = (function () {
//   const cart = [];
//   const shippingCost = 10;
//   const totalPrice = 237;
//   const totalQuantity = 23;

//   const addToCart = function (product, quantity) {
//     cart.push({ product, quantity });
//     //Shipping cost will be loged as the function will still have access to it's birth place variables
//     console.log(
//       `${quantity} ${product} added to cart (shipping cost is ${shippingCost})`
//     );
//   };

//   const orderStock = function (product, quantity) {
//     cart.push({ product, quantity });
//     console.log(`${quantity} ${product} ordered from suppliser`);
//   };

//   return {
//     addToCart,
//     cart,
//     totalPrice,
//     totalQuantity,
//   };
// })();

// //This works because of closures
// //Allows the function to have access to the variables present at it's creation/birth
// ShoppingCart2.addToCart('apple', 4);
// ShoppingCart2.addToCart('piza', 4);

// //variables will be updated as functions still have access to their birthplace variables
// console.log(ShoppingCart2);

//Will be undefined as .shippingCost was not returned
// //However the functions that werereturned will still have access to it
// console.log(ShoppingCart2.shippingCost);

//Common JS modules
//Export in Node JS
// export.addToCart2 = function (product, quantity) {
//     cart.push({ product, quantity });
//     //Shipping cost will be loged as the function will still have access to it's birth place variables
//     console.log(
//       `${quantity} ${product} added to cart (shipping cost is ${shippingCost})`
//     );
// };

//Import inNodeJS
// const {addToCart2} = require('./shoppingCart.js')

// import cloneDeep from './node_modules/lodash-es/cloneDeep.js';
import cloneDeep from 'lodash-es';

const state = {
  cart: [
    { product: 'bread', quanity: 5 },
    { product: 'pizza', quantity: 5 },
  ],
  user: { loggedIn: true },
};

const stateClone = Object.assign({}, state);
const stateDeepClone = cloneDeep(state);

state.user.loggedIn = false;

console.log(stateClone);
console.log(stateDeepClone);

if (module.hot) {
  module.hot.accept();
}

class Person {
  #greeting = 'Hey';
  constructor(name) {
    this.name = name;
    console.log(`${this.#greeting}, ${this.name}`);
  }
}

const jonas = new Person('jonas');

console.log('Jonas' ?? null);
console.log(cart.find(el => el.quantity >= 2));
Promise.resolve('TEST').then(x => console.log(x));

import 'core-js/stable';

//Polyfilling async functions
import 'regenerator-runtime/runtime';
