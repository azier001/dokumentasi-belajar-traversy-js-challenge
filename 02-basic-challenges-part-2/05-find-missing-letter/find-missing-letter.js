// function findMissingLetter(arr) {
//   const alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
//   const startIndex = alphabet.indexOf(arr[0]);

//   for (let i = 0; i < arr.length; i++) {
//     if (arr[i] !== alphabet[startIndex + i]) {
//       return alphabet[startIndex + i];
//     }
//   }

//   return '';
// }

const findMissingLetter = (arr) => {
  let previous = arr[0].charCodeAt(0);

  for (let i = 1; i < arr.length; i++) {
    const current = arr[i].charCodeAt(0);

    if (current - previous > 1) {
      return String.fromCharCode(previous + 1);
    }

    previous = current;
  }

  return '';
};

result = findMissingLetter(['a', 'b', 'c', 'e']);

console.log(result);

module.exports = findMissingLetter;
