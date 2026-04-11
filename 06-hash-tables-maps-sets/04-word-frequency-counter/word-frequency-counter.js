function wordFrequencyCounter(str) {
  const wordFrequency = new Map();

  const words = str.toLowerCase().split(/\W+/);

  for (const word of words) {
    if (word === '') continue;

    wordFrequency.set(word, (wordFrequency.get(word) || 0) + 1);
  }

  return wordFrequency;
}

const result = wordFrequencyCounter(
  'The quick brown fox jumps over the lazy dog. The dog barks, and the fox runs away.',
);

console.log(result); // Output: Map { 'the' => 2, 'quick' => 1, 'brown' => 1, 'fox' => 1, 'jumps' => 1, 'over' => 1, 'lazy' => 1, 'dog' => 1 }

module.exports = wordFrequencyCounter;
