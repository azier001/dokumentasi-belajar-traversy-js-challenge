const Queue = require('./queue');
const Stack = require('./stack');

// coba pakai regex dulu
// function isPalindromeQueueStack(str) {
//   const formattedStr = str.toLowerCase().replace(/[^a-z0-9]/g, '');
//   const reversedStr = formattedStr.split('').reverse().join('');

//   console.log(formattedStr);

//   return formattedStr === reversedStr;
// }

const isPalindromeQueueStack = (str) => {
  const formattedStr = str.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();

  const charQueue = new Queue();
  const charStack = new Stack();

  for (const char of formattedStr) {
    charQueue.enqueue(char);
    charStack.push(char);
  }

  while (!charQueue.isEmpty()) {
    if (charQueue.dequeue() !== charStack.pop()) {
      return false;
    }
  }

  return true;
};

const result1 = isPalindromeQueueStack('A man, a plan, a canal: Panama');
const result2 = isPalindromeQueueStack('Hello');

console.log(result1, result2);

module.exports = isPalindromeQueueStack;
