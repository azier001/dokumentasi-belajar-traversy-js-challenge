const HashTable = require('./HashTable');

// versi pakai map
// function anagramGrouping(words) {
//   const anagramMap = new Map();

//   for (const word of words) {
//     const sortedChars = word.split('').sort().join('');

//     if (!anagramMap.has(sortedChars)) {
//       anagramMap.set(sortedChars, []);
//     }

//     anagramMap.get(sortedChars).push(word);
//   }

//   return [...anagramMap.values()];
// }

// versi pakai HashTable

const anagramGrouping = (words) => {
  const anagramGroups = new HashTable();

  for (const word of words) {
    const sortedChars = word.split('').sort().join('');

    if (!anagramGroups.has(sortedChars)) {
      anagramGroups.set(sortedChars, []);
    }

    anagramGroups.get(sortedChars).push(word);
  }

  return anagramGroups.getValues();
};

const words = ['cat', 'act', 'silent', 'listen', 'tac', 'hello', 'foo', 'bar'];

const result = anagramGrouping(words);

console.log(result); // Output: [['cat', 'act', 'tac'], ['silent', 'listen'], ['hello'], ['foo'], ['bar']]

module.exports = anagramGrouping;
