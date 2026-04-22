const Stack = require('./stack');

// sebelum refactoring
// function balancedParenthesis(str) {
//   if (str.length % 2 !== 0) return false;

//   const stack = [];

//   for (const char of str) {
//     if (char === '(') {
//       stack.push(char);
//     }

//     if (char === ')') {
//       if (stack.length === 0) {
//         return false;
//       } else {
//         stack.pop();
//       }
//     }
//   }

//   return stack.length === 0;
// }

// versi refactoring
// function balancedParenthesis(str) {
//   if (str.length % 2 !== 0) return false;

//   const stack = [];

//   for (const paren of str) {
//     if (paren === '(') {
//       stack.push(paren);
//     } else if (paren === ')') {
//       if (stack.pop() === undefined) {
//         return false;
//       }
//     }
//   }

//   return stack.length === 0;
// }

// versi counter
// function balancedParenthesis(str) {
//   if (str.length % 2 !== 0) return false;

//   let count = 0;

//   for (const paren of str) {
//     if (paren === '(') count++;
//     else if (paren === ')') count--;

//     if (count < 0) return false;
//   }

//   return count === 0;
// }

// versi costum stack
const balancedParenthesis = (str) => {
  const stack = new Stack();

  for (const char of str) {
    if (char === '(') {
      stack.push(char);
    } else if (char === ')') {
      if (stack.isEmpty()) {
        return false;
      }

      stack.pop();
    }
  }

  return stack.isEmpty();
};

// Test cases
console.log('Test 1: () ->', balancedParenthesis('()')); // Expect: true
console.log('Test 2: (()()) ->', balancedParenthesis('(()())')); // Expect: true
console.log('Test 3: (() ->', balancedParenthesis('(()')); // Expect: false
console.log('Test 4: )( ->', balancedParenthesis(')(')); // Expect: false

module.exports = balancedParenthesis;
