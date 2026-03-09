// versi for of, includes
function arrayIntersection(firstArray, secondArray) {
  const result = [];

  for (const item of firstArray) {
    if (secondArray.includes(item) && !result.includes(item)) {
      result.push(item);
    }
  }

  return result;
}

// versi set
const arrayIntersection = (arr1, arr2) => {
  const result = [];
  const newSet = new Set(arr1);

  for (const element of arr2) {
    if (newSet.has(element)) {
      result.push(element);
    }
  }

  return result;
};

module.exports = arrayIntersection;
