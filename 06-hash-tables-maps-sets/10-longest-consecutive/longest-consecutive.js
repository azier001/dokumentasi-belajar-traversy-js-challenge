// versi pakai sort
// function longestConsecutiveSequence(nums) {
//   if (!nums.length) return 0;

//   const sortedNumbers = nums.sort((a, b) => a - b);

//   let currentLength = 1;
//   let longestLength = 1;

//   for (let i = 1; i < sortedNumbers.length; i++) {
//     const diff = sortedNumbers[i] - sortedNumbers[i - 1];

//     if (diff === 1) {
//       currentLength++;
//     } else if (diff > 1) {
//       currentLength = 1;
//     }

//     longestLength = Math.max(currentLength, longestLength);
//   }

//   return longestLength;
// }

// versi pakai set
const longestConsecutiveSequence = (nums) => {
  const numSet = new Set(nums);

  let longestLength = 0;

  for (const num of numSet) {
    if (!numSet.has(num - 1)) {
      let currentLength = 1;
      let currentNum = num;

      while (numSet.has(currentNum + 1)) {
        currentNum++;
        currentLength++;
      }

      longestLength = Math.max(currentLength, longestLength);
    }
  }

  return longestLength;
};

// Contoh 1
console.log(longestConsecutiveSequence([100, 4, 200, 1, 3, 2]));
// Output: 4

// Contoh 2
// console.log(longestConsecutiveSequence([0, 3, 7, 2, 5, 8, 4, 6, 9, 1]));
// Output: 10

module.exports = longestConsecutiveSequence;
