// versi satu
// function validatePassword(password) {
//   if (password.lenght < 8) return false;

//   if (!/[A-Z]/.test(password)) return false;
//   if (!/[a-z]/.test(password)) return false;
//   if (!/\d/.test(password)) return false;

//   return true;
// }

// versi dua
// const validatePassword = (password) => {
//   if (password.length < 8) return false;

//   const hasLowerCase = /[a-z]/.test(password);
//   const hasUpperCase = /[A-Z]/.test(password);
//   const hasDigit = /\d/.test(password);

//   return hasLowerCase && hasUpperCase && hasDigit;
// };

// versi tiga
const validatePassword = (password) => {
  // const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[a-zA-Z\d]{8,}$/;
  const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/;

  return regex.test(password);
};

const result1 = validatePassword('Abc12345'); // true
const result2 = validatePassword('password'); // false

console.log(result1, result2);

module.exports = validatePassword;
