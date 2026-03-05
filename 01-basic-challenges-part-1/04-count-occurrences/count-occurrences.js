// Solution 1
function countOccurrences(str, char) {
  let count = 0;

  // 'letter' langsung berisi karakternya, bukan index-nya
  for (let letter of str) {
    if (letter === char) {
      count++;
    }
  }

  return count;
}

// Solution 2
/// const countOccurrences = (str, char) => str.split(char).length - 1; // Split the string on the character and return the length of the resulting array minus 1

module.exports = countOccurrences;
