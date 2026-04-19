const Stack = require('./stack');

// versi for of
// function reverseStringStack(str) {
//   let result = '';

//   for (const char of str) {
//     result = char + result;
//   }

//   return result;
// }

// versi method
// const reverseStringStack = (str) => {
//   return str.split('').reverse().join('');
// };

// versi recursive
// const reverseStringStack = (str) => {
//   if (str === '') return '';

//   return reverseStringStack(str.slice(1)) + str[0];
// };

// versi stack

const reverseStringStack = (str) => {
  const stack = new Stack();

  for (const char of str) {
    stack.push(char);
  }

  let reversedString = '';

  while (!stack.isEmpty()) {
    reversedString += stack.pop();
  }

  return reversedString;
};

const result = reverseStringStack('Hello World!');

console.log(result); // Output: !dlroW olleH

module.exports = reverseStringStack;
