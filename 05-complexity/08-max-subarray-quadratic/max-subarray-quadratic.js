function maxSubarraySum(arr, k) {
  const n = arr.length;

  let maxSum = -Infinity;

  for (let i = 0; i <= n - k; i++) {
    let sum = 0;
    for (let j = i; j < i + k; j++) {
      sum += arr[j];
    }

    if (sum > maxSum) {
      maxSum = sum;
    }
  }

  return maxSum;
}

const arr = [2, 5, 3, 1, 11, 7, 6, 4];

const result = maxSubarraySum(arr, 3);

console.log(result); // 24

module.exports = maxSubarraySum;
