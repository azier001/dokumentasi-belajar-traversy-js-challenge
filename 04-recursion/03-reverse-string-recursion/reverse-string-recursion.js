// versi substring
// function reverseString(str) {
//   if (!str) return '';

//   return reverseString(str.substring(1)) + str[0];
// }

// versi slice
// const reverseString = (str) => {
//   if (!str) return '';

//   return str.slice(-1) + reverseString(str.slice(0, -1));
// };

// versi index
// const reverseString = (str, index = str.length - 1) => {
//   if (index < 0) return '';

//   return str[index] + reverseString(str, index - 1);
// };

// versi helper index
const reverseString = (str) => {
  if (typeof str !== 'string') return '';

  const helper = (index) => {
    if (index < 0) return '';

    return str[index] + helper(index - 1);
  };

  return helper(str.length - 1);
};

const result = reverseString('hello');

console.log(result); // olleh

module.exports = reverseString;
