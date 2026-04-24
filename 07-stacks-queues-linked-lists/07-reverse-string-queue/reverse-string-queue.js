const Queue = require('./queue');

// versi eksplor dulu dengan bantuan AI
// const reverseStringWithQueue = (str) => {
//   const queue = new Queue();

//   let result = '';

//   for (const char of str) {
//     queue.enqueue(char);
//   }

//   while (!queue.isEmpty()) {
//     result = queue.dequeue() + result;
//   }

//   return result;
// };

// versi pakai push dan shift
// const reverseStringWithQueue = (str) => {
//   const result = [];
//   let reversed = '';

//   for (const char of str) {
//     result.push(char);
//   }

//   while (result.length !== 0) {
//     reversed = result.shift() + reversed;
//   }

//   return reversed;
// };

// versi pakai spread operator
// const reverseStringWithQueue = (str) => {
//   const queue = [...str];
//   let reversedString = '';

//   while (queue.length !== 0) {
//     reversedString = queue.shift() + reversedString;
//   }

//   return reversedString;
// };

// versi for i mundur
const reverseStringWithQueue = (str) => {
  const queue = new Queue();

  for (let i = str.length - 1; i >= 0; i--) {
    queue.enqueue(str[i]);
  }

  let reversedString = '';

  while (!queue.isEmpty()) {
    reversedString += queue.dequeue();
  }

  return reversedString;
};

const result = reverseStringWithQueue('hello'); // olleh

console.log(result);

module.exports = reverseStringWithQueue;
