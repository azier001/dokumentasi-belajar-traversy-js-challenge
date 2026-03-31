// versi concat maju
// function numberRange(start, end) {
//   if (start === end) return [start];

//   return [start].concat(numberRange(start + 1, end));
// }

// versi concat mundur
// const numberRange = (start, end) => {
//   if (start === end) return [end];

//   return numberRange(start, end - 1).concat(end);
// };

// versi spread mundur
const numberRange = (start, end) => {
  if (start === end) return [end];

  return [...numberRange(start, end - 1), end];
};

const result = numberRange(1, 5);

console.log(result);

module.exports = numberRange;
