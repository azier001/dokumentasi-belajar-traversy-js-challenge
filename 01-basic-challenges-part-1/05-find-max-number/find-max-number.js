function findMaxNumber(numbers) {
  let maxNumber = -Infinity;

  for (const number of numbers) {
    if (number > maxNumber) maxNumber = number;
  }

  return maxNumber;
}

const findMaxNumber = (numbers) => Math.max(...numbers);

module.exports = findMaxNumber;
