// versi slice
// function arraySum(arr) {
//   if (!arr.length) return 0;

//   return arr[0] + arraySum(arr.slice(1));
// }

// versi index parameter
// const arraySum = (arr, index = arr.length - 1) => {
//   if (index < 0) return 0;

//   if (arr[index] > 0) {
//     return arr[index] + arraySum(arr, index - 1);
//   } else {
//     return arraySum(arr, index - 1);
//   }
// };

// versi pakai helper
const arraySum = (arr) => {
  if (!Array.isArray(arr)) return 0;

  const helper = (index) => {
    if (index < 0) return 0;

    if (arr[index] > 0) {
      return arr[index] + helper(index - 1);
    } else {
      return helper(index - 1);
    }
  };

  return helper(arr.length - 1);
};

const result = arraySum([1, 2, 3, 4, 5]);

console.log(result); // 15
console.log(arraySum([1, -2, 3])); // 4

module.exports = arraySum;
