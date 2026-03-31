// versi push / concat
// function permutations(str) {
//   if (str.length <= 1) return [str];

//   // const result = [];
//   let result = [];

//   for (let i = 0; i < str.length; i++) {
//     const remainingChars = str.slice(0, i) + str.slice(i + 1);
//     const recursiveResult = permutations(remainingChars);
//     const mappedResult = recursiveResult.map((perm) => str[i] + perm);

//     // result.push(...mappedResult);
//     result = result.concat(mappedResult);
//   }

//   return result;
// }

// versi flatMap
// const permutations = (str) => {
//   if (str.length <= 1) return [str];

//   return [...str].flatMap((char, i) => {
//     const remainingChars = str.slice(0, i) + str.slice(i + 1);
//     return permutations(remainingChars).map((perm) => char + perm);
//   });
// };

// versi flatMap + filter
const permutations = (str) => {
  if (str.length <= 1) return [str];

  return [...str].flatMap((char, i) => {
    const remainingChars = [...str].filter((_, j) => j !== i).join('');

    return permutations(remainingChars).map((perm) => char + perm);
  });
};

const result = permutations('dog');

console.log(result); // ['dog', 'dgo', 'odg', 'ogd', 'gdo', 'god']

module.exports = permutations;
