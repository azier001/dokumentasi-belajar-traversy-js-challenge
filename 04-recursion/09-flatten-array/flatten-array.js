// versi for of
// function flattenArray(arr) {
//   const result = [];

//   for (const item of arr) {
//     if (!Array.isArray(item)) {
//       result.push(item);
//     } else {
//       result.push(...flattenArray(item));
//     }
//   }

//   return result;
// }

// versi Rekursi + .reduce() + Spread Operator
// const flattenArray = (arr) => {
//   const flatten = (item) => {
//     if (!Array.isArray(item)) return [item];

//     return item.reduce((acc, current) => [...acc, ...flatten(current)], []);
//   };

//   return flatten(arr);
// };

// versi Rekursi + .reduce() + .concat()
// const flattenArray = (arr) => {
//   const flatten = (item) => {
//     if (!Array.isArray(item)) return item;

//     return item.reduce((acc, current) => acc.concat(flatten(current)), []);
//   };

//   return flatten(arr);
// };

// versi Rekursi + .map() + .concat()
// const flattenArray = (arr) => {
//   const flatten = (item) => {
//     if (!Array.isArray(item)) return [item];

//     const mapped = item.map((value) => flatten(value));

//     return [].concat(...mapped);
//   };

//   return flatten(arr);
// };

// versi Rekursi + .reduce() + Spread Operator, Tanpa Inner Function
// const flattenArray = (arr) => {
//   return arr.reduce((acc, item) => {
//     return Array.isArray(item)
//       ? [...acc, ...flattenArray(item)]
//       : [...acc, item];
//   }, []);
// };

// versi Rekursi + .reduce() + .concat(), Ternary
// const flattenArray = (arr) => {
//   return arr.reduce((acc, item) => {
//     return Array.isArray(item)
//       ? acc.concat(flattenArray(item))
//       : acc.concat(item);
//   }, []);
// };

// versi Rekursi + .reduce() + .concat(), Ternary ringkas
// const flattenArray = (arr) => {
//   return arr.reduce((acc, item) => {
//     return acc.concat(Array.isArray(item) ? flattenArray(item) : item);
//   }, []);
// };

// versi video
const flattenArray = (arr) => {
  let result = [];

  for (const item of arr) {
    if (Array.isArray(item)) {
      result = result.concat(flattenArray(item));
    } else {
      result.push(item);
    }
  }

  return result;
};

const result = flattenArray([1, 2, 3, [4, 5, [6, 7, 8], 9], 10]);

console.log(result); // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

module.exports = flattenArray;
