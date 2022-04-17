const budget = [
  { value: 250, description: 'Sold old TV 📺', user: 'jonas' },
  { value: -45, description: 'Groceries 🥑', user: 'jonas' },
  { value: 3500, description: 'Monthly salary 👩‍💻', user: 'jonas' },
  { value: 300, description: 'Freelancing 👩‍💻', user: 'jonas' },
  { value: -1100, description: 'New iPhone 📱', user: 'jonas' },
  { value: -20, description: 'Candy 🍭', user: 'matilda' },
  { value: -125, description: 'Toys 🚂', user: 'matilda' },
  { value: -1800, description: 'New Laptop 💻', user: 'jonas' },
];

const spendingLimits = {
  jonas: 1500,
  matilda: 100,
};

const addExpense = function (value, description, user = 'jonas') {
  user = user.toLowerCase();

  //   const limit = spendingLimits[user] ? spendingLimits[user] : 0;
  //?. checks if user exists and sets it if it does. if not it's undefined.
  //?? checks if first value is not nullish(undefined or null) then set's it to first non-nullish value
  const limit = spendingLimits?.[user] ?? 0;

  if (value <= limit) {
    //don't need to repeat the key name if it is the same as the argument
    //i.e description:description can just be description when placed in an object
    budget.push({ value: -value, description, user });
  }
};

addExpense(10, 'Pizza 🍕');
addExpense(100, 'Going to movies 🍿', 'Matilda');
addExpense(200, 'Stuff', 'Jay');
console.log(budget);

const checkExpense = function () {
  for (const entry of budget) {
    const limit = spendingLimits?.[entry.user] ?? 0;
    if (entry.value < -limit) {
      entry.flag = 'limit';
    }
  }
};
checkExpense();

console.log(budget);

const bigExpenses = function (limit) {
  let output = '';
  for (const el of budget) {
    if (el.value <= -spendingLimits) {
      output += el.description.slice(-2) + ' / '; // Emojis are 2 chars
    }
  }
  output = output.slice(0, -2); // Remove last '/ '
  console.log(output);
};

bigExpenses(100);
