# 🏷️ Challenge: Hashtag Generator

> **Tantangan pemrograman** untuk membuat fungsi yang menghasilkan string hashtag dari input teks, lengkap dengan aturan validasi dan dua solusi alternatif.

---

## 📋 Instruksi

Tulis sebuah fungsi bernama `generateHashtag` yang menerima sebuah string sebagai input dan mengembalikan string hashtag yang dihasilkan sesuai dengan aturan di bawah ini. Jika string hashtag yang dihasilkan **lebih panjang dari 140 karakter** atau input/hasilnya adalah string kosong, fungsi harus mengembalikan `false`.

---

## ✍️ Function Signature

```js
/**
 * Menghasilkan hashtag dari string input.
 * @param {string} str - String input.
 * @returns {string|boolean} - String hashtag yang dihasilkan atau false.
 */
function generateHashtag(str: string): string | boolean;
```

---

## 💡 Contoh Penggunaan

```js
generateHashtag("JavaScript is awesome"); // "#JavaScriptIsAwesome"
generateHashtag("hello world");           // "#HelloWorld"
generateHashtag("This is a very very very very very very very very very very very very very very long input that should result in a false hashtag because it exceeds the character limit of 140"); // false
generateHashtag("");                      // false
```

---

## 🚧 Batasan (Constraints)

- Kembalikan `false` jika string input **kosong** atau hanya mengandung karakter whitespace.
- Kembalikan `false` jika string hashtag yang dihasilkan **lebih panjang dari 140 karakter**.
- Setiap kata dalam hashtag harus **diawali dengan huruf kapital**.
- String input **boleh mengandung** leading/trailing whitespace characters.

---

## 🔍 Petunjuk (Hints)

- Kamu bisa menggunakan string manipulation methods `trim()`, `split()`, dan `join()` untuk mengolah string input.
- Kamu bisa menggunakan string method `charAt()` untuk mendapatkan karakter pada indeks tertentu.
- Gunakan string methods untuk mengkapitalkan huruf pertama setiap kata.

---

## 🧩 Solusi

<details>
  <summary>👆 Klik untuk Solusi 1</summary>

```js
function generateHashtag(str) {
  if (str.trim() === '') {
    return false;
  }

  const words = str.trim().split(/\s+/);
  const capitalizedWords = words.map(
    (word) => word.charAt(0).toUpperCase() + word.slice(1)
  );

  const hashtag = '#' + capitalizedWords.join('');

  if (hashtag.length > 140) {
    return false;
  }

  return hashtag;
}
```

### 📖 Penjelasan

- Periksa apakah string input **kosong** atau hanya mengandung karakter whitespace. Jika ya, kembalikan `false`.
- Pisahkan string input menjadi array kata-kata menggunakan method `split()`. Method `split()` menerima regular expression sebagai argumen. Regular expression `/\s+/` cocok dengan **satu atau lebih** whitespace characters.
- Gunakan method `map()` untuk membuat array baru berisi kata-kata yang telah dikapitalkan. Method `map()` menerima callback function sebagai argumen. Callback function dipanggil untuk setiap elemen dalam array, menerima elemen saat ini sebagai argumen, dan mengembalikan kata yang telah dikapitalkan.
- Gabungkan kata-kata yang telah dikapitalkan menjadi sebuah string menggunakan method `join()`. Method `join()` menerima string sebagai argumen yang digunakan untuk menggabungkan elemen-elemen array. Dalam kasus ini, kita menggabungkan elemen-elemen tanpa karakter apapun di antara mereka.
- Periksa apakah string hashtag yang dihasilkan **lebih panjang dari 140 karakter**. Jika ya, kembalikan `false`.
- Kembalikan string hashtag yang dihasilkan.

</details>

<details>
  <summary>👆 Klik untuk Solusi 2</summary>

```js
function generateHashtag(str) {
  const hashtag = str.split(' ').reduce(function (tag, word) {
    return tag + word.charAt(0).toUpperCase() + word.substring(1);
  }, '#');

  return hashtag.length == 1 || hashtag.length > 140 ? false : hashtag;
}
```

### 📖 Penjelasan

- Pisahkan string input menjadi array kata-kata menggunakan method `split()`.
- Gunakan method `reduce()` untuk membuat string hashtag. Kita memberikan karakter `#` sebagai **nilai awal accumulator**. Kemudian kita menggabungkan accumulator dengan kata yang dikapitalkan, lalu menggabungkannya dengan sisa kata tersebut. Proses ini dilakukan untuk setiap kata dalam array.
- Periksa apakah string hashtag yang dihasilkan **lebih panjang dari 140 karakter**. Jika ya, kembalikan `false`.
- Kembalikan string hashtag yang dihasilkan.

</details>

---

> 💾 **Tips:** Coba implementasikan sendiri sebelum melihat solusi untuk memaksimalkan pemahaman!