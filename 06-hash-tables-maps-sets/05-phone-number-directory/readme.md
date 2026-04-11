# 📞 Challenge: Phone Number Directory

> **Tantangan ini mengajak kamu membangun sebuah direktori nomor telepon** menggunakan struktur data `Map` di JavaScript — cara modern dan efisien untuk menyimpan pasangan data _key-value_.

---

## 📋 Instruksi

Kamu sedang membangun aplikasi direktori nomor telepon. Implementasikan sebuah fungsi bernama `phoneNumberDirectory` yang menerima sebuah array berisi nomor-nomor telepon sebagai input, lalu mengembalikan sebuah `Map` dengan nama sebagai _key_ dan nomor telepon yang sesuai sebagai _value_.

---

## ✍️ Function Signature

```js
/**
 * Membangun direktori nomor telepon dari sebuah array berisi string nomor telepon.
 *
 * @param {string[]} phoneNumbers - Array berisi nomor telepon dalam format "Name:PhoneNumber".
 * @returns {Map<string, string>} - Sebuah Map dengan nama sebagai key dan nomor telepon sebagai value.
 */
function phoneNumberDirectory(phoneNumbers: string[]): Map<string, string>
```

---

## 💡 Contoh Penggunaan

```js
const phoneNumbers = [
  'John:123-456-7890',
  'Jane:987-654-3210',
  'Joe:555-555-5555',
];

console.log(phoneNumberDirectory(phoneNumbers));
// Output: Map { 'John' => '123-456-7890', 'Jane' => '987-654-3210', 'Joe' => '555-555-5555' }
```

---

## ⚠️ Batasan

- Setiap elemen dalam array input **harus** diformat sebagai `NAME:PHONENUMBER`

---

## 🔍 Petunjuk

- Iterasi melalui array input dan gunakan method **`split()`** untuk memisahkan nama dan nomor telepon pada setiap elemen array `phoneNumbers` sebelum menambahkannya ke dalam `Map`

---

## ✅ Solusi

<details>
  <summary>Klik untuk Melihat Solusi</summary>

```js
function phoneNumberDirectory(phoneNumbers) {
  const directory = new Map();

  for (const entry of phoneNumbers) {
    const [name, phoneNumber] = entry.split(':');
    directory.set(name, phoneNumber);
  }

  return directory;
}
```

### 🧠 Penjelasan

- Buat sebuah `Map` baru bernama `directory`
- Iterasi melalui array `phoneNumbers` menggunakan loop **`for...of`**
- Gunakan method **`split()`** untuk memisahkan nama dan nomor telepon dari setiap entri menggunakan karakter titik dua `:` sebagai pemisah
- Set setiap nama sebagai _key_ dan nomor telepon yang sesuai sebagai _value_ di dalam `Map`
- Kembalikan `directory` yang kini sudah berisi seluruh data direktori nomor telepon

</details>

---

## 🧪 Test Cases

```js
test('Building a phone number directory from an array of phone numbers', () => {
  const phoneNumbers = [
    'John:123-456-7890',
    'Jane:987-654-3210',
    'Joe:555-555-5555',
  ];

  const result = phoneNumberDirectory(phoneNumbers);

  expect(result.get('John')).toBe('123-456-7890');
  expect(result.get('Jane')).toBe('987-654-3210');
  expect(result.get('Joe')).toBe('555-555-5555');
});
```
