// function validateEmail(email) {
//   const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

//   return emailRegex.test(email);
// }

const validateEmail = (email) => {
  if (email.indexOf('@') === -1) return false;

  const [localPart, domain] = email.split('@');

  if (!localPart.length || domain.length < 3) return false;

  const domainExtension = domain.split('.');

  if (domainExtension.length < 2 || domainExtension[1].length < 2) return false;

  return true;
};

const result1 = validateEmail('brad@gmail.com');
const result2 = validateEmail('bradgmailcom');

console.log(result1); // true
console.log(result2); // false

module.exports = validateEmail;
