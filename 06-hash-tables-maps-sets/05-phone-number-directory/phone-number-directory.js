function phoneNumberDirectory(phoneNumbers) {
  const directory = new Map();

  for (const entry of phoneNumbers) {
    const [name, phoneNumber] = entry.split(':');

    directory.set(name, phoneNumber);
  }

  return directory;
}

const phoneNumbers = [
  'John:123-456-7890',
  'Jane:987-654-3210',
  'Joe:555-555-5555',
];

const result = phoneNumberDirectory(phoneNumbers); // 123-456-7890

console.log(result.get('John'));

module.exports = phoneNumberDirectory;
