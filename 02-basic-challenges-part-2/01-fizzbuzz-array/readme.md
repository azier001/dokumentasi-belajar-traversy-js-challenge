# 🎯 Tantangan: FizzBuzz Array

> **FizzBuzz** adalah salah satu soal wawancara paling terkenal untuk developer pemula — sebuah masalah sederhana yang menguji kemampuan berpikir logis dan menulis kode yang bersih.

---

## 📋 Instruksi

FizzBuzz mungkin adalah pertanyaan wawancara yang paling umum untuk developer entry level. Setidaknya, begitulah dulu. Mungkin sekarang tidak sepopuler itu karena sudah terlalu sering digunakan. Ini adalah masalah sederhana yang menguji kemampuanmu untuk berpikir logis dan menulis kode yang bersih.

Secara tradisional, kamu melakukan loop dari 1 hingga 100 dan mencetak setiap angka. Namun, jika angka tersebut **habis dibagi 3**, kamu mencetak `"Fizz"`. Jika **habis dibagi 5**, kamu mencetak `"Buzz"`. Jika **habis dibagi keduanya (3 dan 5)**, kamu mencetak `"FizzBuzz"`.

Dalam tantangan ini, kamu akan menulis sebuah function bernama `fizzBuzzArray` yang menerima sebuah angka dan **mengembalikan sebuah array**. Array tersebut harus berisi semua angka dari 1 hingga angka yang dimasukkan. Namun, jika angka habis dibagi 3, ganti dengan `"Fizz"`. Jika habis dibagi 5, ganti dengan `"Buzz"`. Jika habis dibagi keduanya, ganti dengan `"FizzBuzz"`.

---

## ✍️ Function Signature

```js
/**
 * Mengembalikan array angka dari 1 hingga angka yang dimasukkan.
 * @param {number} num - Angka batas atas loop.
 * @returns {any[]} - Array berisi angka-angka hasil FizzBuzz.
 */
function fizzBuzzArray(num: number): any[];
```

---

## 💡 Contoh

```js
fizzBuzzArray(5);  // [1, 2, "Fizz", 4, "Buzz"]
fizzBuzzArray(15); // [1, 2, "Fizz", 4, "Buzz", "Fizz", 7, 8, "Fizz", "Buzz", 11, "Fizz", 13, 14, "FizzBuzz"]
```

---

## 🚧 Batasan

- Angka yang dimasukkan akan **selalu lebih besar dari 0**
- Angka yang dimasukkan akan **selalu berupa bilangan bulat** (integer)

---

## 🔍 Hints

- Daripada menggunakan `console.log` untuk setiap angka, kamu perlu **mendorong (push)** setiap nilai ke dalam sebuah array.

---

## ✅ Solusi

<details>
  <summary>👆 Klik untuk Melihat Solusi</summary>

```js
function fizzBuzz(num) {
  const arr = [];

  for (let i = 1; i <= num; i++) {
    if (i % 3 === 0 && i % 5 === 0) {
      arr.push('FizzBuzz');
    } else if (i % 3 === 0) {
      arr.push('Fizz');
    } else if (i % 5 === 0) {
      arr.push('Buzz');
    } else {
      arr.push(i);
    }
  }

  return arr;
}
```

### 📖 Penjelasan

- Buat sebuah **array kosong** untuk menyimpan hasil.
- Lakukan **loop dari 1** hingga angka yang dimasukkan.
- Cek terlebih dahulu apakah angka **habis dibagi 3 dan 5 sekaligus**. Jika ya, `push` `'FizzBuzz'` ke dalam array.
- Jika tidak, cek apakah angka **habis dibagi 3**. Jika ya, `push` `'Fizz'` ke dalam array.
- Jika tidak, cek apakah angka **habis dibagi 5**. Jika ya, `push` `'Buzz'` ke dalam array.
- Jika tidak ada kondisi yang terpenuhi, `push` **angkanya langsung** ke dalam array.
- **Return** array tersebut.

</details>

---

## 🧪 Test Cases

```js
test('FizzBuzz Array', () => {
  expect(fizzBuzzArray(15)).toEqual([
    1,
    2,
    'Fizz',
    4,
    'Buzz',
    'Fizz',
    7,
    8,
    'Fizz',
    'Buzz',
    11,
    'Fizz',
    13,
    14,
    'FizzBuzz',
  ]);
});
```