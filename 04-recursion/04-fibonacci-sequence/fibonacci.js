function fibonacci(num) {
  console.log(`calculating fibonacci(${num})`);

  if (num <= 1) return num;

  return fibonacci(num - 1) + fibonacci(num - 2);
}

const result = fibonacci(6);

console.log(result); // 8

module.exports = fibonacci;
