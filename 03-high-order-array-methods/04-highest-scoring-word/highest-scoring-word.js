// versi for of

/*
function highestScoringWord(str) {
  const words = str.split(' ');

  let highestScore = -Infinity;
  let highestWord = '';

  for (const word of words) {
    let score = 0;

    for (const char of word) {
      score += char.charCodeAt(0) - 96;
    }

    if (score > highestScore) {
      highestScore = score;
      highestWord = word;
    }
  }

  return highestWord;
}
*/

// versi map() + .reduce()

/*
const getWordScore = (word) => {
  return [...word].reduce((score, char) => score + char.charCodeAt(0) - 96, 0);
};

const highestScoringWord = (str) => {
  if (!str) return '';

  return str
    .split(' ')
    .map((word) => ({ word, score: getWordScore(word) }))
    .reduce((best, current) => (current.score > best.score ? current : best))
    .word;
};
*/

// versi video alternatif satu
/*
const highestScoringWord = (str) => {
  const words = str.split(' ');

  const scores = words.map((word) => {
    let score = 0;

    for (const letter of word) {
      score += letter.charCodeAt(0) - 96;
    }

    return score;
  });

  let highestScore = 0;
  let highestIndex = 0;

  for (let i = 0; i < scores.length; i++) {
    if (scores[i] > highestScore) {
      highestScore = scores[i];
      highestIndex = i;
    }
  }

  return words[highestIndex];
};
*/

// versi video alternatif dua

const highestScoringWord = (str) => {
  const words = str.split(' ');

  const scores = words.map((word) => {
    return Array.from(word).reduce(
      (score, letter) => score + letter.charCodeAt(0) - 96,
      0,
    );
  });

  const highestScore = Math.max(...scores);
  const highestIndex = scores.indexOf(highestScore);

  return words[highestIndex];
};

const testCases = [
  {
    input: 'man i need a taxi up to ubud',
    expected: 'taxi',
    desc: 'taxi memiliki skor alfabet tertinggi',
  },
  {
    input: 'what time are we climbing up the volcano',
    expected: 'volcano',
    desc: 'volcano memiliki skor alfabet tertinggi',
  },
  {
    input: 'take me to semynak',
    expected: 'semynak',
    desc: 'semynak memiliki skor alfabet tertinggi',
  },
  { input: '', expected: '', desc: 'input kosong' },
  { input: 'a', expected: 'a', desc: 'hanya satu huruf' },
  { input: 'javascript', expected: 'javascript', desc: 'hanya satu kata' },
  { input: 'aa b', expected: 'aa', desc: 'skor sama, pilih kata pertama' },
  {
    input: 'abc cab',
    expected: 'abc',
    desc: 'skor sama, kata pertama dipilih',
  },
  {
    input: 'a bb ccc dddd',
    expected: 'dddd',
    desc: 'kata terpanjang memiliki skor terbesar',
  },
  {
    input: 'wyn nyx',
    expected: 'nyx',
    desc: 'skor sangat berdekatan, nyx(63) menang atas wyn(62)',
  },
];

testCases.forEach(({ input, expected, desc }, index) => {
  const result = highestScoringWord(input);
  const status = result === expected ? '✅ PASS' : '❌ FAIL';
  console.log(`Test Case #${index + 1}: ${status} - ${desc}`);
  if (status === '❌ FAIL') {
    console.log('Expected:', expected);
    console.log('Result  :', result);
  }
});

module.exports = highestScoringWord;
