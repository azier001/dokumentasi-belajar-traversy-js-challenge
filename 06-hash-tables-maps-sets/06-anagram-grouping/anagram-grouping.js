// versi for of object
// function anagramGrouping(words) {
//   const grouped = {};

//   for (const word of words) {
//     const sortedWord = word.split('').sort().join('');

//     if (!grouped[sortedWord]) grouped[sortedWord] = [];

//     grouped[sortedWord].push(word);
//   }

//   return Object.values(grouped);
// }

// versi for of map
// const anagramGrouping = (words) => {
//   const grouped = new Map();

//   for (const word of words) {
//     const sortedWord = word.split('').sort().join('');

//     if (!grouped[sortedWord]) grouped.set(sortedWord, [word]);

//     grouped.get(sortedWord).push(word);
//   }

//   return [...grouped.values()];
// };

// versi reduce object
// const anagramGrouping = (words) => {
//   const grouped = words.reduce((acc, word) => {
//     const sortedWord = word.split('').sort().join('');

//     if (!acc[sortedWord]) acc[sortedWord] = [];

//     acc[sortedWord].push(word);

//     return acc;
//   }, {});

//   return Object.values(grouped);
// };

// versi reduce map
const anagramGrouping = (words) => {
  const grouped = words.reduce((acc, word) => {
    const sortedWord = word.split('').sort().join('');

    if (!acc.has(sortedWord)) acc.set(sortedWord, []);

    acc.get(sortedWord).push(word);

    return acc;
  }, new Map());

  return Array.from(grouped.values());
};

const result = anagramGrouping(['cat', 'act', 'dog', 'god', 'tac']);

console.log(result); // Output: [['cat', 'act', 'tac'], ['dog', 'god']]

module.exports = anagramGrouping;
