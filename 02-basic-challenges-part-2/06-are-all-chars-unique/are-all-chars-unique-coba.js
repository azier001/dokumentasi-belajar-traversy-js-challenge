// function areAllCharactersUnique(str) {
//   for (let i = 0; i < str.length - 1; i++) {
//     for (let j = i + 1; j < str.length; j++) {
//       if (str[i] === str[j]) return false;
//     }
//   }

//   return true;
// }

const areAllCharactersUnique = (str) => {
  const charSet = new Set(str);

  return charSet.size === str.length;
};

const areAllCharactersUnique = (str) => {
  const charSet = {};

  for (const char of str) {
    console.log('current char:', char);
    console.log('already seen:', charSet[char]);

    if (charSet[char]) {
      return false;
    }

    charSet[char] = true;

    console.log('object:', charSet);
    console.log('------');
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
