// function titleCase(str) {
//   let result = '';

//   for (let i = 0; i < str.length; i++) {
//     if (i === 0 || str[i - 1] === ' ') {
//       result += str[i].toUpperCase();
//     } else {
//       result += str[i].toLowerCase();
//     }
//   }

//   return result;
// }

// const titleCase = (str) => {
//   const words = str.split(' ');

//   for (let i = 0; i < words.length; i++) {
//     words[i] = words[i][0].toUpperCase() + words[i].slice(1);
//   }

//   return words.join(' ');
// };

// const titleCase = (str) => {
//   return str.replace(/\w+/g, (word) => word[0].toUpperCase() + word.slice(1));
// };

// const titleCase = (str) => {
//   // Replace the first letter of each word with its uppercase equivalent
//   return str.replace(/\b\w/g, (match) => match.toUpperCase());
// };

function titleCase(str) {
  return str
    .split(' ')
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(' ');
}

module.exports = titleCase;
