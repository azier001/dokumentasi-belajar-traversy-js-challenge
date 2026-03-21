// versi pakai sort
/*
function validAnagrams(str1, str2) {
  return str1.split('').sort().join('') === str2.split('').sort().join('');
}
*/

// versi counter
/*
const validAnagrams = (str1, str2) => {
  if (str1.length !== str2.length) return false;

  const count = {};

  for (const char of str1) {
    count[char] = (count[char] || 0) + 1;
  }

  for (const char of str2) {
    if (!count[char]) return false;

    count[char]--;
  }

  return true;
};
*/

const validAnagrams = (str1, str2) => {
  if (str1.length !== str2.length) return false;

  const count = [...str1].reduce((acc, char) => {
    acc[char] = (acc[char] || 0) + 1;

    return acc;
  }, {});

  for (const char of str2) {
    if (!count[char]) return false;

    count[char]--;
  }

  return true;
};

const result = validAnagrams('app', 'ppa');

console.log(result); // true

module.exports = validAnagrams;
