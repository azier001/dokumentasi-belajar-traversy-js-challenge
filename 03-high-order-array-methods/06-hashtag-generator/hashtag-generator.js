function generateHashtag(str) {
  if (!str.trim()) return false;

  const formated = str
    .trim()
    .split(/\s+/)
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join('');

  const result = `#${formated}`;

  if (result.length > 140) return false;

  return result;
}

const result = generateHashtag(' Hello there thanks for trying my Kata');
console.log(result); // '#HelloThereThanksForTryingMyKata'
console.log(generateHashtag('')); // false)
console.log(generateHashtag('  ')); // false)

module.exports = generateHashtag;
