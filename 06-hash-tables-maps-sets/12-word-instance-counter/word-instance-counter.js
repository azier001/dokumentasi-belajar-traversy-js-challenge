const HashTable = require('./HashTable');

// function wordInstanceCounter(str, word) {
//   const words = str.toLowerCase().split(/\W+/);

//   const wordFrequency = new Map();

//   for (const word of words) {
//     if (word === '') continue;

//     wordFrequency.set(word, (wordFrequency.get(word) || 0) + 1);
//   }

//   return wordFrequency.get(word.toLowerCase());
// }

// versi revisi paling aman
function wordInstanceCounter(str, word) {
  const words = str.toLowerCase().split(/\W+/);
  const wordFrequency = new Map();

  for (const currentWord of words) {
    // Ganti nama agar tidak tabrakan dengan parameter
    if (currentWord === '') continue;

    wordFrequency.set(currentWord, (wordFrequency.get(currentWord) || 0) + 1);
  }

  // Gunakan || 0 agar jika tidak ditemukan, hasilnya 0, bukan undefined
  return wordFrequency.get(word.toLowerCase()) || 0;
}

console.log(
  wordInstanceCounter('The quick brown fox jumps over the lazy dog.', 'the'),
); // Output: 2

module.exports = wordInstanceCounter;
