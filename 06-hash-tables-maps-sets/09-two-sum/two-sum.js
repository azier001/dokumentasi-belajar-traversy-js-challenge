// versi nested loop
// function twoSum(nums, target) {
//   const n = nums.length;
//   for (let i = 0; i < n; i++) {
//     for (let j = i + 1; j < n; j++) {
//       if (nums[i] + nums[j] === target) {
//         return [i, j];
//       }
//     }
//   }

//   return [];
// }

// versi hash map
// const twoSum = (nums, target) => {
//   const map = new Map();

//   for (let i = 0; i < nums.length; i++) {
//     const complement = target - nums[i];

//     if (map.has(complement)) {
//       return [map.get(complement), i];
//     }

//     map.set(nums[i], i);
//   }

//   return [];
// };

// versi hash map 2
// const twoSum = (nums, target) => {
//   const map = new Map();

//   for (let i = 0; i < nums.length; i++) {
//     const current = nums[i];
//     const needed = target - current;

//     if (map.has(needed)) {
//       return [map.get(needed), i];
//     }

//     map.set(current, i);
//   }

//   return [];
// };

// versi set
const twoSum = (nums, target) => {
  const numsSet = new Set();

  for (let i = 0; i < nums.length; i++) {
    const current = nums[i];
    const complement = target - current;

    if (numsSet.has(complement)) {
      return [nums.indexOf(complement), i];
    }

    numsSet.add(current);
  }

  return [];
};

console.log(twoSum([2, 7, 11, 15], 9));
// Output: [0, 1] (2 + 7 = 9)

console.log(twoSum([3, 2, 4], 6));
// Output: [1, 2] (2 + 4 = 6)

console.log(twoSum([3, 3], 6));
// Output: [0, 1] (3 + 3 = 6)

module.exports = twoSum;
