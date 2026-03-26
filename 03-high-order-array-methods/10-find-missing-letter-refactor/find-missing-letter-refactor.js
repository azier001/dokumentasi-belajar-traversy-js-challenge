// versi find
// function findMissingLetter(arr) {
//   const found = arr.find((char, i) => {
//     const current = char.charCodeAt(0);
//     const next = arr[i + 1]?.charCodeAt(0);

//     return next - current > 1;
//   });

//   return found ? String.fromCharCode(found.charCodeAt(0) + 1) : '';
// }

// versi reduce
const findMissingLetter = (arr) => {
  const result = arr.reduce((acc, char, i) => {
    if (acc) return acc;

    const current = char.charCodeAt(0);
    const next = arr[i + 1]?.charCodeAt(0);

    if (next - current > 1) {
      return current + 1;
    }

    return acc;
  }, null);

  return result ? String.fromCharCode(result) : '';
};

const result = findMissingLetter(['a', 'b', 'c', 'e']); // d

console.log(result);

const testCases = [
  // Basic cases (lowercase)
  {
    input: ['a', 'b', 'c', 'd', 'f'],
    expected: 'e',
    desc: "Missing huruf 'e' di tengah",
  },
  {
    input: ['t', 'u', 'v', 'w', 'x', 'z'],
    expected: 'y',
    desc: "Missing huruf 'y' di akhir",
  },

  // Uppercase
  {
    input: ['O', 'Q', 'R', 'S'],
    expected: 'P',
    desc: "Missing huruf uppercase 'P'",
  },

  // Edge cases
  { input: ['a', 'c'], expected: 'b', desc: "Range kecil, missing 'b'" },
  {
    input: ['X', 'Z'],
    expected: 'Y',
    desc: "Range kecil uppercase, missing 'Y'",
  },

  // Near end alphabet
  {
    input: ['w', 'x', 'y', 'z'],
    expected: '',
    desc: 'Tidak ada huruf yang hilang',
  },

  // Larger gap (tetap 1 missing)
  { input: ['m', 'n', 'o', 'q'], expected: 'p', desc: "Missing huruf 'p'" },
];
testCases.forEach(({ input, expected, desc }, index) => {
  const result = findMissingLetter(input);
  const status = result === expected ? '✅ PASS' : '❌ FAIL';

  console.log(
    `Test Case #${index + 1}: ${status} - ${desc} | findMissingLetter(${JSON.stringify(input)}) = ${result}`,
  );

  if (status === '❌ FAIL') {
    console.log('Input   :', input);
    console.log('Expected:', expected);
    console.log('Result  :', result);
  }
});

module.exports = findMissingLetter;
