const nameMap = new Map([
  [1, 'John'],
  [2, 'Jack'],
  [3, 'Jill'],
]);

const myFunction = () => {};
const myObj = {};

const map2 = new Map([
  ['name', 'Jhon'],
  [1, 'number one'],
  [true, 'really true'],
  [null, 'null'],
  [myFunction, 'my function'],
  [myObj, 'my object'],
]);

// Get Values
// console.log(nameMap.get(1));
// console.log(map2.get(myFunction));
// console.log(map2.get(myObj));

// Set Values
nameMap.set(4, 'Mike');
nameMap.set(5, 'Sarah');

// Check Values
console.log(nameMap.has(1));
console.log(nameMap.has(6));

// Remove Values
nameMap.delete(1);
console.log(nameMap.has(1));

// Get Size
console.log(nameMap.size);

// Iterating over a map
// for (const [key, value] of nameMap) {
//   console.log(key, value);
// }

// nameMap.forEach((value, key) => console.log(key, value));

// Get Keys
console.log(nameMap.keys());

// Get Values
console.log(nameMap.values());

// Clear Map
nameMap.clear();

console.log(nameMap.size);
