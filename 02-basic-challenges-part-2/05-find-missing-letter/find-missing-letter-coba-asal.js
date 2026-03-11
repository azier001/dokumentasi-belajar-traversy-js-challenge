function findMissingLetter(arr) {
  let minCode = Infinity;
  let maxCode = -Infinity;

  for (const char of arr) {
    if (getCharCode(char) < minCode) minCode = getCharCode(char);
    if (getCharCode(char) > maxCode) maxCode = getCharCode(char);
  }

  let expectedSum = 0;

  for (let i = minCode; i <= maxCode; i++) {
    expectedSum += i;
  }

  let actualSum = arr.map(getCharCode).reduce((sum, num) => sum + num, 0);

  // console.log(minCode);
  // console.log(maxCode);
  // console.log(expectedSum);
  // console.log(actualSum);

  return String.fromCharCode(expectedSum - actualSum);
}

const getCharCode = (char) => {
  return char.charCodeAt(0);
};

result = findMissingLetter(['a', 'b', 'c', 'e']);

console.log(result);

module.exports = findMissingLetter;
