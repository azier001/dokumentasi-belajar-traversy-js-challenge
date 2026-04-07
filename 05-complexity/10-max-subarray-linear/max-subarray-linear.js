function maxSubarraySum(arr, k) {
  let currentSum = 0;

  for (let i = 0; i < k; i++) {
    currentSum += arr[i];
  }

  let maxSum = currentSum;

  for (let i = k; i < arr.length; i++) {
    currentSum = currentSum - arr[i - k] + arr[i];

    if (currentSum > maxSum) {
      maxSum = currentSum;
    }
  }

  return maxSum;
}

const arr = [2, 5, 3, 1, 11, 7, 6, 4];

const result = maxSubarraySum(arr, 3);

console.log(result); // 24

module.exports = maxSubarraySum;
