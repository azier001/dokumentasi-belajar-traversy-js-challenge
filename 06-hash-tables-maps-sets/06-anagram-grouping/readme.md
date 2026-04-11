# 🔤 Challenge: Anagram Grouping *(Pengelompokan Anagram)*

> **Anagram** adalah kata atau frasa yang dibentuk dengan **menyusun ulang huruf-huruf** dari kata atau frasa lain. Sebagai contoh, `cinema` adalah anagram dari `iceman`.

---

## 📋 Instruksi

Tulis sebuah function bernama `anagramGrouping` yang menerima sebuah **array of strings** sebagai input dan mengembalikan **array of arrays**, di mana setiap sub-array berisi kata-kata yang merupakan anagram satu sama lain.

---

### ✍️ Function Signature

```js
/**
 * Mengembalikan array of arrays, di mana setiap sub-array berisi kata-kata yang merupakan anagram satu sama lain.
 * @param {string[]} words - Array input berisi string kata-kata.
 * @returns {string[][]} - Array of arrays yang berisi kelompok-kelompok anagram.
 */
function anagramGrouping(words: string[]): string[][];
```

---

### 💡 Contoh Penggunaan

```js
anagramGrouping(['cat', 'act', 'dog', 'god', 'tac']);
// Output: [['cat', 'act', 'tac'], ['dog', 'god']]

anagramGrouping(['listen', 'silent', 'enlist', 'hello', 'world']);
// Output: [['listen', 'silent', 'enlist'], ['hello'], ['world']]
```

---

### ⚠️ Batasan / Constraints

- Array input `words` **hanya akan mengandung huruf alfabet kecil** *(lowercase)*.

---

### 🧩 Petunjuk / Hints

- Gunakan sebuah **map** untuk menyimpan kelompok anagram, di mana **key**-nya adalah karakter-karakter setiap kata yang telah diurutkan, dan **value**-nya adalah array berisi kata-kata dengan karakter yang sama setelah diurutkan.
- Kamu bisa mengurutkan sebuah string dengan cara **memecahnya menjadi array karakter** menggunakan `.split('')`, lalu memanggil `.sort()`, kemudian menyatukannya kembali ke string menggunakan `.join('')`.
- Gunakan `Array.from()` untuk **mengonversi map menjadi array**.

---

## ✅ Solusi

<details>
  <summary>Klik untuk Melihat Solusi</summary>

```js
function anagramGrouping(words) {
  const anagramGroups = new Map();

  for (const word of words) {
    const sortedChars = word.split('').sort().join('');
    
    if (anagramGroups.has(sortedChars)) {
      anagramGroups.get(sortedChars).push(word);
    } else {
      anagramGroups.set(sortedChars, [word]);
    }
  }

  return Array.from(anagramGroups.values());
}
```

### 🔍 Penjelasan

- Buat sebuah map baru bernama `anagramGroups` untuk **menyimpan kelompok-kelompok anagram**.
- **Iterasi setiap kata** dalam array input `words`. Untuk setiap kata, pecah karakternya menjadi array, urutkan array secara **ascending**, lalu gabungkan kembali karakter yang sudah diurutkan menjadi sebuah string. String yang telah diurutkan ini menjadi **key** pada map `anagramGroups`.
- **Periksa apakah key sudah ada** di dalam map. Jika sudah ada, ambil array yang bersesuaian dan tambahkan kata tersebut ke dalamnya.
- Jika key **belum ada** di dalam map, buat array baru dengan kata tersebut sebagai elemen pertama, lalu tambahkan ke map dengan key tersebut.
- Setelah semua kata diproses, **ekstrak array kelompok anagram** dari map `anagramGroups` menggunakan `Array.from(anagramGroups.values())` dan kembalikan sebagai hasil akhir.

</details>

---

### 🧪 Test Cases

```js
test('Grouping anagrams', () => {
  const result1 = anagramGrouping(['cat', 'act', 'dog', 'god', 'tac']);
  const result2 = anagramGrouping([
    'listen',
    'silent',
    'enlist',
    'hello',
    'world',
  ]);

  expect(result1).toEqual([
    ['cat', 'act', 'tac'],
    ['dog', 'god'],
  ]);
  expect(result2).toEqual([
    ['listen', 'silent', 'enlist'],
    ['hello'],
    ['world'],
  ]);
});
```
