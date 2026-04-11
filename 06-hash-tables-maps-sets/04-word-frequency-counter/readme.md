# 🧩 Challenge: Word Frequency Counter

> **Tantangan ini memintamu untuk membuat sebuah fungsi yang menghitung frekuensi kemunculan setiap kata dalam sebuah string — mengabaikan huruf besar/kecil dan tanda baca.**

---

## 📋 Instruksi

Tulislah sebuah fungsi bernama `wordFrequencyCounter` yang menerima sebuah `string` sebagai input dan mengembalikan sebuah `map` yang merepresentasikan **frekuensi kemunculan setiap kata** dalam string tersebut. Kita pernah mengerjakan tantangan serupa yang menghitung kemunculan sebuah karakter. Fungsi ini harus menghitung kemunculan setiap **kata**, dengan **mengabaikan huruf besar/kecil** dan **mengecualikan tanda baca**.

---

## ✍️ Function Signature

```js
/**
 * Returns a map that represents the frequency of each word in the input string.
 * @param {string} str - The input string containing words.
 * @returns {Map<string, number>} - The map with word frequency.
 */
function wordFrequencyCounter(str) {
  // Your code here
}
```

---

## 💡 Contoh Penggunaan

```js
wordFrequencyCounter('The quick brown fox jumps over the lazy dog.');
// Output: Map { 'the' => 2, 'quick' => 1, 'brown' => 1, 'fox' => 1, 'jumps' => 1, 'over' => 1, 'lazy' => 1, 'dog' => 1 }

wordFrequencyCounter(
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
);
// Output: Map { 'lorem' => 1, 'ipsum' => 1, 'dolor' => 1, 'sit' => 1, 'amet' => 1, 'consectetur' => 1, 'adipiscing' => 1, 'elit' => 1 }
```

---

## ⚠️ Batasan

- String input **hanya akan mengandung** huruf, spasi, dan tanda baca.

---

## 🔍 Petunjuk

- Gunakan method `toLowerCase()` untuk mengonversi string input menjadi huruf kecil, sehingga kamu dapat **mengabaikan perbedaan huruf besar/kecil** saat menghitung frekuensi kata.
- **Regular expressions** dapat sangat membantu untuk memecah string menjadi kata-kata dan menghilangkan tanda baca.
- Gunakan sebuah `map` untuk menyimpan frekuensi kata, di mana **kata** adalah `key` dan **jumlah kemunculan** adalah `value`. Loop melalui setiap kata, perbarui hitungan di dalam map, lalu kembalikan map tersebut.

---

## ✅ Solusi

<details>
  <summary>Klik untuk Melihat Solusi</summary>

```js
function wordFrequencyCounter(str) {
  // Ubah string menjadi huruf kecil dan pecah menjadi array kata-kata
  const words = str.toLowerCase().split(/\W+/);
  // Buat map kosong untuk menyimpan frekuensi kata
  const wordFrequency = new Map();
  // Loop melalui setiap kata dalam array
  for (const word of words) {
    // Abaikan string kosong (disebabkan oleh spasi berturutan atau tanda baca)
    if (word === '') continue;
    // Jika kata sudah ada di dalam map, tambahkan frekuensinya
    if (wordFrequency.has(word)) {
      wordFrequency.set(word, wordFrequency.get(word) + 1);
    } else {
      // Jika kata belum ada di dalam map, tambahkan dengan frekuensi awal 1
      wordFrequency.set(word, 1);
    }
  }
  return wordFrequency;
}

```

</details>

---

## 🧠 Penjelasan

- Buat variabel `words` untuk menyimpan versi **huruf kecil** dari string input, yang dipecah menjadi sebuah array kata-kata. Regular expression `/\W+/` mencocokkan satu atau lebih karakter **bukan kata** (non-word characters), yang mencakup spasi dan tanda baca. Ini akan memecah string menjadi array kata-kata, mengabaikan spasi dan tanda baca.

- Buat sebuah `Map` kosong bernama `wordFrequency` untuk menyimpan **frekuensi setiap kata**.

- Iterasi melalui setiap kata dalam array. Jika kata tersebut adalah string kosong (yang bisa disebabkan oleh beberapa spasi atau tanda baca berturutan), lewati menggunakan `continue`. Jika tidak, periksa apakah kata tersebut sudah ada di dalam map.
  - Jika **sudah ada**, tambahkan frekuensinya sebesar 1.
  - Jika **belum ada**, tambahkan ke dalam map dengan frekuensi awal 1.
- Kembalikan `map` `wordFrequency`, yang berisi frekuensi setiap kata dalam string input.

---

## 🧪 Test Cases

```js
test('Counting word frequencies in a string', () => {
  const result1 = wordFrequencyCounter(
    'The quick brown fox jumps over the lazy dog.'
  );
  const result2 = wordFrequencyCounter(
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
  );

  expect(result1.get('the')).toBe(2);
  expect(result1.get('quick')).toBe(1);
  expect(result1.get('brown')).toBe(1);
  expect(result1.get('fox')).toBe(1);
  expect(result1.get('jumps')).toBe(1);
  expect(result1.get('over')).toBe(1);
  expect(result1.get('lazy')).toBe(1);
  expect(result1.get('dog')).toBe(1);

  expect(result2.get('lorem')).toBe(1);
  expect(result2.get('ipsum')).toBe(1);
  expect(result2.get('dolor')).toBe(1);
  expect(result2.get('sit')).toBe(1);
  expect(result2.get('amet')).toBe(1);
  expect(result2.get('consectetur')).toBe(1);
  expect(result2.get('adipiscing')).toBe(1);
  expect(result2.get('elit')).toBe(1);
});
```
