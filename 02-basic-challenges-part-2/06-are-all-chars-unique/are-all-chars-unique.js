// const areAllCharactersUnique = (str) => {
//   const charSet = new Set();

//   for (const char of str) {
//     if (charSet.has(char)) {
//       return false;
//     }

//     charSet.add(char);
//   }

//   return true;
// };

const areAllCharactersUnique = (str) => {
  const charCount = {};

  for (const char of str) {
    if (charCount[char]) {
      return false;
    }

    charCount[char] = true;
  }

  return true;
};

const result1 = areAllCharactersUnique('abcdefg');
const result2 = areAllCharactersUnique('abcdefgA');
const result3 = areAllCharactersUnique('programming');

console.log(result1);
console.log(result2);
console.log(result3);

module.exports = areAllCharactersUnique;
