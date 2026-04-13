function symmetricDifference(arr1, arr2) {
  const result = [];

  const set1 = new Set(arr1);
  const set2 = new Set(arr2);

  for (const num of set1) {
    if (!set2.has(num)) result.push(num);
  }

  for (const num of set2) {
    if (!set1.has(num)) result.push(num);
  }

  return result;
}

const result = symmetricDifference([1, 2, 3], [2, 3, 4]);

console.log(result); // Output: [1, 4]

module.exports = symmetricDifference;
