# 🧩 Tantangan: Temukan Karakter Pertama yang Tidak Berulang

> **Tantangan ini mirip dengan tantangan sebelumnya.** Jika kamu sudah memahami yang sebelumnya, kamu seharusnya bisa menyelesaikan ini sendiri.

---

## 📋 Instruksi

Tulis sebuah function bernama `findFirstNonRepeatingCharacter` yang menerima sebuah string dan mengembalikan **karakter pertama yang tidak berulang** dalam string tersebut.

Jika **tidak ada** karakter yang tidak berulang, function harus mengembalikan `null`.

---

## ✍️ Tanda Tangan Function

```js
/**
 * Mengembalikan karakter pertama yang tidak berulang dalam sebuah string.
 * @param {string} str - String yang akan dicari.
 * @returns {string | null} - Karakter pertama yang tidak berulang, atau null jika tidak ada.
 */
function findFirstNonRepeatingCharacter(str: string): string | null;
```

---

## 💡 Contoh Penggunaan

```js
findFirstNonRepeatingCharacter('aabccdeff'); // harus mengembalikan 'b'
findFirstNonRepeatingCharacter('aabbcc');    // harus mengembalikan null
findFirstNonRepeatingCharacter('abcdef');    // harus mengembalikan 'a'
```

---

## 🚧 Batasan

- String input **hanya akan mengandung huruf kecil dan spasi**

---

## 🔍 Petunjuk

- Kamu bisa menggunakan **object** atau **map** untuk melacak jumlah kemunculan setiap karakter dalam string.
- Kamu bisa melakukan iterasi melalui string dan memeriksa apakah karakter saat ini hanya muncul **satu kali**.

---

## ✅ Solusi

<details>
  <summary>Klik untuk Solusi 1</summary>

Menggunakan `Map`:

```js
function findFirstNonRepeatingCharacter(str) {
  const charCount = new Map();

  for (const char of str) {
    charCount.set(char, (charCount.get(char) || 0) + 1);
  }

  for (const char of str) {
    if (charCount.get(char) === 1) {
      return char;
    }
  }

  return null;
}
```

### 📖 Penjelasan

- **Inisialisasi** sebuah map untuk melacak jumlah kemunculan setiap karakter dalam string.
- **Iterasi** melalui string dan tambahkan setiap karakter ke dalam map. Jika karakter sudah ada di map, tambahkan hitungannya sebesar 1. Jika belum ada, atur hitungannya menjadi 1.
- **Iterasi kembali** melalui string dan periksa map untuk melihat apakah karakter saat ini memiliki hitungan 1. Jika ya, kembalikan karakter tersebut karena itulah karakter pertama yang tidak berulang.
- Jika sudah melewati seluruh string tanpa mengembalikan karakter apapun, kembalikan `null` karena tidak ada karakter yang tidak berulang.

</details>

<details>
  <summary>Klik untuk Solusi 2</summary>

Menggunakan object:

```js
function findFirstNonRepeatingCharacter(str) {
  const charCount = {};

  for (const char of str) {
    charCount[char] = (charCount[char] || 0) + 1;
  }

  for (const char of str) {
    if (charCount[char] === 1) {
      return char;
    }
  }

  return null;
}
```

### 📖 Penjelasan

- **Inisialisasi** sebuah object kosong untuk melacak jumlah kemunculan setiap karakter dalam string.
- **Iterasi** melalui string dan tambahkan setiap karakter ke dalam object. Jika karakter sudah ada di object, tambahkan hitungannya sebesar 1. Jika belum ada, atur hitungannya menjadi 1.
- **Iterasi kembali** melalui string dan periksa object untuk melihat apakah karakter saat ini memiliki hitungan 1. Jika ya, kembalikan karakter tersebut karena itulah karakter pertama yang tidak berulang.
- Jika sudah melewati seluruh string tanpa mengembalikan karakter apapun, kembalikan `null` karena tidak ada karakter yang tidak berulang.

</details>

---

## 🧪 Test Cases

```js
test('Find First Non-Repeating Character', () => {
  expect(findFirstNonRepeatingCharacter('aabccdeff')).toBe('b');
  expect(findFirstNonRepeatingCharacter('aabbcc')).toBe(null);
  expect(findFirstNonRepeatingCharacter('hello world')).toBe('h');
});
```