# 🔍 Challenge: Find The Missing Number

> **Tantangan ini menguji kemampuanmu** dalam menemukan angka yang hilang dari sebuah array menggunakan pendekatan matematis yang elegan.

---

## 📋 Instruksi

Tuliskan sebuah fungsi bernama `findMissingNumber` yang menerima sebuah array berisi angka unik dari 1 hingga n (inklusif), di mana **satu angka hilang**. Fungsi ini harus mengembalikan angka yang hilang tersebut.

### ✍️ Function Signature

```js
/**
 * Mengembalikan angka yang hilang dalam array berisi angka unik dari 1 hingga n (inklusif).
 * @param {number[]} arr - Array berisi angka-angka.
 * @returns {number} - Angka yang hilang.
 */
function findMissingNumber(arr: number[]): number;
```

---

### 💡 Contoh Penggunaan

```js
findMissingNumber([1, 2, 3, 4, 6, 7, 8, 9, 10]); // 5
findMissingNumber([10, 8, 6, 7, 5, 4, 2, 3, 1]); // 9
findMissingNumber([10, 5, 1, 2, 4, 6, 8, 3, 9]); // 7
```

---

### ⚠️ Batasan

- Jika array **kosong** yang diberikan, fungsi harus mengembalikan `1`
- Jika **tidak ada argumen** yang diberikan, fungsi harus mengembalikan `undefined`

---

### 🧩 Petunjuk

- Hitung **jumlah total angka** dari 1 hingga n (inklusif). Rumusnya adalah `n * (n + 1) / 2`. Nilai `n` adalah panjang array ditambah 1.
- Hitung **jumlah angka-angka** yang ada di dalam array.
- **Kurangkan** jumlah angka dalam array dari jumlah total angka 1 hingga n (inklusif).
- Kamu bisa menggunakan `for loop` atau method `reduce` untuk menghitung jumlah angka dalam array. Kita akan fokus pada method seperti `reduce` di bagian berikutnya, namun kedua cara akan ditampilkan di sini.

---

## ✅ Solusi

<details>
  <summary>🔓 Klik untuk Melihat Solusi</summary>

```js
function findMissingNumber(arr) {
  // Kasus 2: tidak ada argumen sama sekali
  if (arr === undefined) {
    return undefined;
  }

  // Kasus 1: array kosong
  if (arr.length === 0) {
    return 1;
  }

  const n = arr.length + 1;
  const expectedSum = (n * (n + 1)) / 2;

  let actualSum = 0;
  for (let i = 0; i < arr.length; i++) {
    actualSum += arr[i];
  }

  return expectedSum - actualSum;
}

// Menggunakan reduce
function findMissingNumber(arr) {
  // Kasus 2: tidak ada argumen sama sekali
  if (arr === undefined) {
    return undefined;
  }

  // Kasus 1: array kosong
  if (arr.length === 0) {
    return 1;
  }

  const n = arr.length + 1;
  const expectedSum = (n * (n + 1)) / 2;

  const actualSum = arr.reduce((sum, num) => sum + num, 0);

  return expectedSum - actualSum;
}
```

### 📖 Penjelasan

Fungsi `findMissingNumber` menerima sebuah array berisi angka unik dari 1 hingga n (inklusif), di mana satu angka hilang, lalu **mengembalikan angka yang hilang** tersebut.

Pengecekan dilakukan secara **berurutan dan eksplisit** untuk membedakan dua edge case:

1. `arr === undefined` → fungsi dipanggil **tanpa argumen**, kembalikan `undefined`
2. `arr.length === 0` → fungsi dipanggil dengan **array kosong**, kembalikan `1`

> ⚠️ **Catatan perbaikan:** Solusi asli menggunakan `!arr || arr.length === 0` yang mengembalikan `undefined` untuk kedua kasus — ini **tidak sesuai** dengan batasan yang menyatakan array kosong harus mengembalikan `1`. Pengecekan `arr === undefined` yang **eksplisit** adalah cara yang benar untuk membedakan keduanya.

Selanjutnya, kita menghitung jumlah total angka dari 1 hingga n (inklusif) menggunakan rumus `n * (n + 1) / 2`. Ini dikenal sebagai **rumus Gauss**. Nilai ini disimpan dalam variabel bernama `expectedSum`.

Sebagai contoh, jika kita memiliki array angka dari 1 hingga 10, jumlah totalnya adalah 55. Kita bisa menghitungnya dengan rumus Gauss: `10 * (10 + 1) / 2 = 55`. Kita juga bisa menghitungnya menggunakan `for loop` atau method `reduce`.

Selanjutnya, kita menghitung **jumlah angka-angka** yang ada di dalam array dan menyimpannya dalam variabel `actualSum`.

Terakhir, kita **mengembalikan selisih** antara `expectedSum` dan `actualSum`. Itulah angka yang hilang.

</details>

---

### 🧪 Test Cases

```js
test('Menemukan angka yang hilang', () => {
  expect(findMissingNumber([1, 2, 3, 5])).toBe(4);
  expect(findMissingNumber([10, 8, 6, 7, 5, 4, 2, 3, 1])).toBe(9);
  expect(findMissingNumber([1, 3, 4, 5, 6])).toBe(2);
});

test('Edge cases', () => {
  expect(findMissingNumber([])).toBe(1);       // array kosong → 1
  expect(findMissingNumber()).toBe(undefined);  // tanpa argumen → undefined
});
```