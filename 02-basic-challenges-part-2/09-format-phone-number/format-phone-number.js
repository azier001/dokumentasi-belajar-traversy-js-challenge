function formatPhoneNumber(numbers) {
  const firstSection = `(${numbers.slice(0, 3).join('')})`;
  const midSection = ` ${numbers.slice(3, 6).join('')}`;
  const lastSection = `-${numbers.slice(6, 10).join('')}`;

  return firstSection + midSection + lastSection;
}

const result = formatPhoneNumber([1, 2, 3, 4, 5, 6, 7, 8, 9, 0]);

console.log(result); // (123) 456-7890

module.exports = formatPhoneNumber;
