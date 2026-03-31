# 🔀 Tantangan: Permutations

> **Dokumentasi ini menjelaskan cara membuat fungsi `permutations` yang menghasilkan semua kemungkinan susunan karakter dari sebuah string, lengkap dengan solusi dan penjelasan langkah demi langkah.**

---

## 📋 Instruksi

Tulis sebuah fungsi bernama `permutations` yang menerima sebuah **string** sebagai parameter dan mengembalikan sebuah array berisi semua kemungkinan permutasi dari karakter-karakter dalam string tersebut.

---

## ✍️ Tanda Tangan Fungsi

```js
/**
 * Mengembalikan semua kemungkinan permutasi dari karakter-karakter dalam sebuah string.
 * @param {string} str - String yang akan dipermutasi.
 * @returns {string[]} - Array berisi semua kemungkinan permutasi dari karakter-karakter dalam string.
 */
function permutations(str: string): string[];
```

---

## 💡 Contoh Penggunaan

```js
permutations('abc'); // ['abc', 'acb', 'bac', 'bca', 'cab', 'cba']
permutations('dog'); // ['dog', 'dgo', 'odg', 'ogd', 'gdo', 'god']
```

---

## ⚠️ Batasan

- String input hanya akan mengandung **huruf kecil**
- String input **tidak akan** mengandung karakter duplikat

---

## 🗝️ Petunjuk

- Pikirkan bagaimana kamu dapat memecah masalah pembuatan permutasi menggunakan **rekursi**.
- Pertimbangkan apa yang seharusnya menjadi **base case** pada rekursimu.
- Kamu dapat menggunakan method `slice` untuk menghapus sebuah karakter dari string.
- Kamu dapat menggunakan `for loop` untuk mengiterasi karakter-karakter dalam string, dan `for loop` lain untuk mengiterasi sub-permutasi yang dihasilkan.

---

## ✅ Solusi

<details>
  <summary>🔍 Klik untuk Melihat Solusi</summary>

```js
function permutations(str) {
  const result = [];

  if (str.length === 0) {
    result.push('');
    return result;
  }

  for (let i = 0; i < str.length; i++) {
    const firstChar = str[i];
    const restOfString = str.slice(0, i) + str.slice(i + 1);
    const subPermutations = permutations(restOfString);

    for (let j = 0; j < subPermutations.length; j++) {
      result.push(firstChar + subPermutations[j]);
    }
  }

  return result;
}
```

### 🧠 Penjelasan

- Inisialisasi array kosong `result` untuk menyimpan hasil permutasi.
- **Base case** diperiksa di awal fungsi. Jika string input `str` kosong (panjangnya 0), berarti tidak ada karakter yang perlu dipermutasi. Dalam kasus ini, string kosong ditambahkan ke array `result`, yang merepresentasikan satu-satunya permutasi dari string kosong. Fungsi kemudian mengembalikan array `result`.
- Jika string input **tidak kosong**, fungsi akan melanjutkan proses pembuatan permutasi menggunakan rekursi dan perulangan.
- **Loop luar** mengiterasi setiap karakter dari string input `str`.
- Di dalam loop, karakter saat ini (`firstChar`) diekstrak dari string input.
- `restOfString` dibuat dengan **menghapus karakter saat ini** dari string input. `restOfString` ini akan digunakan untuk menghasilkan permutasi dari karakter-karakter yang tersisa.
- Fungsi **memanggil dirinya sendiri secara rekursif** dengan `restOfString` untuk mendapatkan semua kemungkinan permutasi dari karakter yang tersisa.
- **Loop dalam** mengiterasi setiap permutasi yang diperoleh dari pemanggilan rekursif (`subPermutations`).
- Pada loop dalam, fungsi **menggabungkan** karakter saat ini `firstChar` ke setiap permutasi yang diperoleh dari pemanggilan rekursif, sehingga menghasilkan permutasi baru dengan menyisipkan karakter saat ini di berbagai posisi.
- Permutasi-permutasi baru tersebut ditambahkan ke array `result`.
- Setelah loop luar selesai, fungsi telah menghasilkan **semua kemungkinan permutasi** dari string input.
- Terakhir, array `result` yang berisi semua permutasi dikembalikan sebagai output fungsi.

---

### 💡 Solusi Alternatif (Modern ES6+)

```js
const permutations = (str) => {
  if (str.length <= 1) return [str]

  const result = []

  for (let i = 0; i < str.length; i++) {
    const remainingChars = str.slice(0, i) + str.slice(i + 1)
    const recursiveResult = permutations(remainingChars)
    const mappedResult = recursiveResult.map(perm => str[i] + perm)

    result.push(...mappedResult)
  }

  return result
}
```

### 🧠 Penjelasan

- **Base case** menggunakan `str.length <= 1`, sehingga meng-cover dua kondisi sekaligus: string kosong `''` dan string satu karakter — keduanya langsung dikembalikan sebagai `[str]`.
- Logika utama sama dengan solusi pertama, namun ditulis dengan gaya **ES6+** yang lebih ringkas.
- Menggunakan `.map()` untuk menggabungkan karakter saat ini `str[i]` di depan setiap permutasi dari `recursiveResult`, menggantikan **inner `for loop`**.
- Menggunakan **spread operator** `...` untuk memasukkan semua elemen `mappedResult` ke dalam `result` sekaligus, menggantikan `result.push()` satu per satu.

</details>

---

## 🧪 Test Cases

```js
test('Permutations', () => {
  expect(permutations('abc')).toEqual([
    'abc',
    'acb',
    'bac',
    'bca',
    'cab',
    'cba',
  ]);
  expect(permutations('dog')).toEqual([
    'dog',
    'dgo',
    'odg',
    'ogd',
    'gdo',
    'god',
  ]);
  expect(permutations('')).toEqual(['']);
});
```