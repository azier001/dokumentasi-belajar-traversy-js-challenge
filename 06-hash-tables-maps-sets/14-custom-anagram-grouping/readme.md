> Dokumentasi ini menjelaskan tantangan algoritma untuk mengelompokkan kata-kata yang merupakan **anagram** satu sama lain menggunakan struktur data **HashTable** khusus.

---

# 🧩 Tantangan: Anagram Grouping Challenge

## 📜 Instruksi

Buatlah sebuah fungsi bernama `anagramGrouping` untuk menggunakan class `HashTable` yang telah kita buat sebelumnya. Fungsi ini harus menerima sebuah **array of words** sebagai input dan mengembalikan sebuah **array of arrays**, di mana setiap inner array mewakili sekelompok anagram.

### 🖋️ Signature Fungsi

```js
/**
 * Mengelompokkan anagram dari input array kata-kata menggunakan HashTable.
 * @param {string[]} words - Sebuah array berisi kata-kata.
 * @returns {string[][]} - Sebuah array dari array, masing-masing mewakili grup anagram.
 */
function anagramGrouping(words: string[]): string[][];
```

---

### 💡 Contoh

```js
anagramGrouping(['listen', 'silent', 'hello', 'world', 'act', 'cat']);
// Output: [['listen', 'silent'], ['act', 'cat'], ['hello'], ['world']]
```

---

### 🔍 Petunjuk

- Anda dapat menggunakan class `HashTable` yang disediakan untuk mengimplementasikan pengelompokan anagram secara efisien.
- Ubah setiap kata menjadi **sorted string** berisi karakter-karakter untuk mengidentifikasi anagram.
- Untuk setiap **sorted string**, simpan anagram di dalam `HashTable` dengan **sorted string** tersebut sebagai **key**.

---

## 🛠️ Solusi

<details>
  <summary>Klik Untuk Melihat Solusi</summary>

```js
const HashTable = require('./HashTable');

function anagramGrouping(words) {
  const anagramGroups = new HashTable();

  for (const word of words) {
    // Memisahkan karakter, mengurutkan, dan menggabungkannya kembali untuk dijadikan key
    const sortedChars = word.split('').sort().join('');
    
    if (anagramGroups.get(sortedChars)) {
      // Jika key sudah ada, tambahkan kata ke dalam array yang sudah ada
      anagramGroups.get(sortedChars).push(word);
    } else {
      // Jika key belum ada, buat entry baru dengan array berisi kata tersebut
      anagramGroups.set(sortedChars, [word]);
    }
  }

  // Mengambil semua value dari HashTable
  return anagramGroups.getValues();
}

module.exports = anagramGrouping;
```

---

### 🔄 Solusi Alternatif (Arrow Function & .has())

```js
const anagramGrouping = (words) => {
  const anagramGroups = new HashTable();

  for (const word of words) {
    const sortedChars = word.split('').sort().join('');

    if (!anagramGroups.has(sortedChars)) {
      anagramGroups.set(sortedChars, []);
    }

    anagramGroups.get(sortedChars).push(word);
  }

  return anagramGroups.getValues();
};
```

> **Catatan:** Solusi ini menggunakan **Arrow Function** dan method `.has()` untuk memeriksa keberadaan key. Pendekatan ini lebih eksplisit dalam menginisialisasi array kosong sebelum menambahkan kata ke dalamnya.

---

### 📝 Penjelasan

Pendekatan ini sangat mirip dengan pengelompokan anagram saat kita menggunakan `Map`.

- Ganti `Map` dengan `HashTable` untuk mengelompokkan anagram secara efisien.
- Lakukan iterasi melalui setiap kata dalam input **array** dan buat versi karakter yang sudah diurutkan (**sorted version**) dari kata tersebut.
- **Sorted string** ini digunakan sebagai **key** di dalam `HashTable`. Jika **key** sudah ada di dalam `HashTable`, kita tambahkan kata saat ini ke dalam daftar anagram. Jika **key** tidak ada, kita buat entry baru di dalam `HashTable` dengan **key** tersebut dan sebuah **array** yang berisi kata saat ini.
- Setelah melakukan iterasi ke semua kata, gunakan method `getValues` dari `HashTable` untuk mendapatkan **array of arrays**, di mana setiap inner array mewakili sekelompok anagram.
- Kembalikan **array** hasil pengelompokan anagram tersebut.

</details>

---

### 🧪 Test Cases

```js
test('Mengelompokkan anagram dari sebuah array kata-kata', () => {
  const result1 = anagramGrouping([
    'listen',
    'silent',
    'hello',
    'world',
    'act',
    'cat',
  ]);
  expect(result1).toEqual(
    expect.arrayContaining([
      expect.arrayContaining(['listen', 'silent']),
      expect.arrayContaining(['act', 'cat']),
      expect.arrayContaining(['hello']),
      expect.arrayContaining(['world']),
    ])
  );
});
```
