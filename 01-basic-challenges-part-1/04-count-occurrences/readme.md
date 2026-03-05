# 🧩 Tantangan: Hitung Kemunculan Karakter

> **Latihan pemrograman** untuk menghitung berapa kali sebuah karakter muncul di dalam sebuah string — lengkap dengan solusi, penjelasan, dan test cases.

---

## 📋 Instruksi

Tulis sebuah fungsi bernama `countOccurrences()` yang menerima sebuah **string** dan sebuah **karakter**, lalu mengembalikan **jumlah kemunculan** karakter tersebut di dalam string.

### ✍️ Function Signature

```js
/**
 * Mengembalikan jumlah kemunculan sebuah karakter dalam string.
 * @param {string} str - String yang akan dicari.
 * @param {string} char - Karakter yang dicari.
 * @returns {number} - Jumlah kemunculan karakter dalam string.
 */
function countOccurrences(str: string, char: string): number;
```

---

### 💡 Contoh Penggunaan

```js
countOccurrences('hello', 'l'); // 2
countOccurrences('hello', 'z'); // 0
```

---

### ⚠️ Batasan

- Huruf **kecil** dan **kapital** dianggap sebagai karakter yang **berbeda**. Jika mau, kamu bisa membuat fungsi ini bersifat *case insensitive*.

---

### 🔎 Petunjuk

- Kamu bisa **melakukan iterasi** pada string sama seperti melakukan iterasi pada array.
- Kamu bisa menggunakan operator `++` untuk **menambah nilai** sebuah variabel.
- Kamu juga bisa menggunakan pendekatan lain dengan memanfaatkan method `split()` untuk memecah string menjadi array berdasarkan karakter yang diberikan.

---

## ✅ Solusi

<details>
  <summary>👆 Klik untuk Solusi 1</summary>

```JavaScript
function countOccurrences(str, char) {
  let count = 0;

  for (let i = 0; i < str.length; i++) {
    if (str[i] === char) {
      count++;
    }
  }

  return count;
}

// Versi case insensitive
// function countOccurrences(str, char) {
//   const lowerStr = str.toLowerCase();
//   const lowerChar = char.toLowerCase();

//   let count = 0;

//   for (let i = 0; i < lowerStr.length; i++) {
//     if (lowerStr[i] === lowerChar) {
//       count++;
//     }
//   }

//   return count;
// }
```

### 🧠 Penjelasan

- **Inisialisasi** variabel `count` dengan nilai 0.

- **Iterasi** melalui string dan periksa apakah karakter saat ini sama dengan karakter yang dicari. Jika ya, **tambahkan** variabel `count`.

- Setelah loop selesai, **kembalikan** variabel `count`.

- Untuk membuat fungsi bersifat *case insensitive*, ubah string dan karakter menjadi **huruf kecil** menggunakan `toLowerCase()` sebelum melakukan iterasi.

</details>

<details>
  <summary>👆 Klik untuk Solusi 2</summary>

```JavaScript
const countOccurrences = (str, char) => str.split(char).length - 1;
```

### 🧠 Penjelasan

- Manfaatkan method `split` pada string untuk **memecahnya** menjadi array berdasarkan karakter yang diberikan.

- Karena proses pemecahan menghilangkan karakter tersebut, array yang dihasilkan akan memiliki **satu elemen lebih sedikit** dari jumlah kemunculan karakter. Oleh karena itu, cukup **kurangi 1** dari panjang array untuk mendapatkan jumlah kemunculan.

> ⚡ **Catatan Performa:** Solusi ini terlihat lebih elegan, namun sebenarnya **kurang efisien** dibandingkan solusi loop. Solusi `for` loop langsung menghitung kemunculan saat iterasi, sedangkan solusi `split` memecah string menjadi array dan melakukan operasi tambahan. Perbedaannya memang kecil, namun tetap penting untuk diketahui.

</details>

---

## 🧪 Test Cases

```js
test('Count Occurrences of a Character', () => {
  expect(countOccurrences('hello', 'l')).toBe(2);
  expect(countOccurrences('programming', 'm')).toBe(2);
  expect(countOccurrences('banana', 'a')).toBe(3);
});
```