function sumOfEvenSquares(numbers) {
  const evenSquares = numbers.filter((number) => number % 2 === 0);

  return evenSquares
    .map((number) => number * number)
    .reduce((total, number) => total + number, 0);
}

const result = sumOfEvenSquares([1, 2, 3, 4, 5]);

console.log(result); // 20

module.exports = sumOfEvenSquares;
