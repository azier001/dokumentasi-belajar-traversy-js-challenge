function countVowels(inputString) {
  const vowelChars = 'aiueoAIUEO';
  let vowelCount = 0;

  for (const char of inputString) {
    if (vowelChars.includes(char)) vowelCount++;
  }

  return vowelCount;
}

module.exports = countVowels;
