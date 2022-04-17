//Exporting module
console.log('Exporting module');

//Blockng code
//this top-leve waiat in the exporting module will slow down the importing module
//top-level await Blocks the importing module as well
//can be helpful but also bad if not used with great care
// console.log('Start fetchng users');
// await fetch('https://jsonplaceholder.typicode.com/users');
// console.log('finished fetching');

//Shippingcost and cart variable are scoped to the module
const shippingCost = 10;
export const cart = [];

//Exports need to happen in top-level code so in the global spaace
export const addToCart = function (product, quantity) {
  cart.push({ product, quantity });
  console.log(`${quantity} ${product} added to cart`);
};

const totalPrice = 237;
const totalQuantity = 23;
//variableexport and renaming at export
export { totalPrice, totalQuantity as qt };

export default function (product, quantity) {
  cart.push({ product, quantity });
  console.log(`${quantity} ${product} added to cart`);
}
