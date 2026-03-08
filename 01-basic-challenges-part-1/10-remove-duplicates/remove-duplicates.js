// versi for of
function removeDuplicates(arr) {
  const unique = [];

  for (const element of arr) {
    if (!unique.includes(element)) {
      unique.push(element);
    }
  }

  return unique;
}

// Menggunakan `Set`
const removeDuplicates = (arr) => {
  return [...new Set(arr)];
};

module.exports = removeDuplicates;
