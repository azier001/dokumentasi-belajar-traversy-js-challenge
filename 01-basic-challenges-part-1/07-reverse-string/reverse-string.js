// loop for mundur
function reverseString(str) {
  let result = '';

  for (let i = str.length - 1; i >= 0; i--) {
    result += str[i];
  }

  return result;
}

// loop pakai while
function reverseString(str) {
  let result = '';
  let i = str.length - 1;

  while (i >= 0) {
    result += str[i];

    i--;
  }

  return result;
}

// loop for maju
const reverseString = (str) => {
  let result = '';

  for (let i = 0; i < str.length; i++) {
    result = str[i] + result;
  }

  return result;
};

// method bawaan
const reverseString = (str) => {
  return str.split('').reverse().join('');
};

module.exports = reverseString;
