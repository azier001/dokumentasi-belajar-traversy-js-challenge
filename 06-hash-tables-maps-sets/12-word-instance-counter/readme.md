# 🧩 Tantangan: Word Frequency Counter menggunakan HashTable

> Buatlah fungsi bernama `wordInstanceCounter` yang menerima sebuah **string** dan sebuah **word** sebagai input dan mengembalikan jumlah **instance** dari kata tersebut dalam **string**. Fungsi ini harus menghitung kemunculan kata yang ditentukan, dengan mengabaikan **case** (huruf besar/kecil) dan tidak menyertakan tanda baca.

---

## 📜 Instruksi

Tulis sebuah fungsi bernama `wordInstanceCounter` yang menerima **string** dan **word** sebagai input dan mengembalikan jumlah kemunculan kata tersebut dalam **string**.

### 🖋️ Signature Fungsi

```js
/**
 * Mengembalikan jumlah instance dari kata yang ditentukan dalam input string.
 * @param {string} str - Input string yang berisi kata-kata.
 * @param {string} word - Kata yang akan dihitung jumlah kemunculannya.
 * @returns {number} - Jumlah instance dari kata yang ditentukan.
 */
function wordInstanceCounter(str: string, word: string): number
```

---

## 💡 Contoh

```js
console.log(
  wordInstanceCounter('The quick brown fox jumps over the lazy dog.', 'the')
); // Output: 2

console.log(
  wordInstanceCounter(
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    'ipsum'
  )
); // Output: 1

console.log(wordInstanceCounter('Hello, world!', 'hello')); // Output: 1

console.log(wordInstanceCounter('Hello, Hello, Hello!', 'hello')); // Output: 3
```

---

## ⚙️ Batasan (Constraints)

- Input **string** hanya akan berisi huruf, spasi, dan tanda baca.

---

## 🥦 Petunjuk (Hints)

- Anda dapat menggunakan `HashTable` untuk menyimpan frekuensi kata, di mana **word** adalah **key**, dan **count** adalah **value**. Lakukan **loop** pada setiap kata, perbarui **count** di dalam `HashTable`, dan kembalikan **count** dari kata yang ditentukan.

---

## ✅ Solusi

<details>
  <summary>Klik Untuk Melihat Solusi</summary>

```js
function wordInstanceCounter(str, word) {
  const words = str.toLowerCase().split(/\W+/);

  const wordFrequency = new HashTable();

  const targetWord = word.toLowerCase();
  let count = 0;

  for (const currentWord of words) {
    if (currentWord === '') continue;

    if (wordFrequency.has(currentWord)) {
      wordFrequency.set(currentWord, wordFrequency.get(currentWord) + 1);
    } else {
      wordFrequency.set(currentWord, 1);
    }

    if (currentWord === targetWord) {
      count = wordFrequency.get(currentWord);
    }
  }

  return count;
}
```

</details>

---

## 🚀 Alternatif Solusi (Menggunakan Built-in Map)

Selain menggunakan custom `HashTable`, kita juga bisa menggunakan built-in `Map` yang jauh lebih ringkas dan sudah dioptimalkan oleh mesin JavaScript (**modern approach**).

```js
function wordInstanceCounter(str, word) {
  // Pecah string menjadi array kata (lowercased & tanpa tanda baca)
  const words = str.toLowerCase().split(/\W+/);
  const wordFrequency = new Map();

  for (const currentWord of words) {
    if (currentWord === '') continue;

    // Menggunakan logical OR || untuk menangani kata baru (default 0)
    wordFrequency.set(currentWord, (wordFrequency.get(currentWord) || 0) + 1);
  }

  // Mengambil hasil untuk kata target, fallback ke 0 jika tidak ditemukan
  return wordFrequency.get(word.toLowerCase()) || 0;
}
```

> **Penjelasan Singkat:** Pendekatan ini lebih **clean** dan sangat direkomendasikan untuk pengembangan aplikasi nyata karena `Map` sudah menangani mekanisme **hashing** secara internal dengan sangat efisien.

---

## 🧪 Test Cases

```js
test('Counting instances of a word in a string', () => {
  expect(
    wordInstanceCounter('The quick brown fox jumps over the lazy dog.', 'the')
  ).toBe(2);
  expect(
    wordInstanceCounter(
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      'ipsum'
    )
  ).toBe(1);
  expect(wordInstanceCounter('Hello, world!', 'hello')).toBe(1);
  expect(wordInstanceCounter('Hello, Hello, Hello!', 'hello')).toBe(3);
});
```
