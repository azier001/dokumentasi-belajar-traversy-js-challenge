// const isValidIPv4 = (str) => {
//   const formatted = str.split('.');

//   if (formatted.length !== 4) return false;

//   const isValid = formatted.every((number) => {
//     if (number[0] === '0' && number.length > 1) return false;

//     if (/^\d+$/.test(number)) {
//       return Number(number) >= 0 && Number(number) <= 255;
//     }

//     return false;
//   });

//   return isValid;
// };

// versi dua

const isValidIPv4 = (str) => {
  const octets = str.split('.');

  if (octets.length !== 4) return false;

  return octets.every((octet) => {
    const num = parseInt(octet);

    return num >= 0 && num <= 255 && octet === num.toString();
  });
};

const result1 = isValidIPv4('122.164.23.21'); // true
const result2 = isValidIPv4('122.164.23.21.33'); // false

console.log(result1);
console.log(result2);

module.exports = isValidIPv4;
