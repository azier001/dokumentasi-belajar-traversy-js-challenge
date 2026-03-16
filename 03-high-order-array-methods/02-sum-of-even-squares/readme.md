# 🧮 Tantangan: Jumlah Kuadrat dari Bilangan Genap

> **Tantangan ini cukup sederhana**, namun melatih penggunaan beberapa _array method_ sekaligus — cocok untuk mengasah pemahaman tentang `filter`, `map`, dan `reduce`.

---

## 📋 Instruksi

Tulislah sebuah fungsi bernama `sumOfEvenSquares` yang menerima sebuah array berisi angka-angka, lalu mengembalikan **jumlah dari kuadrat bilangan genap** yang ada di dalam array tersebut.

---

## ✍️ Function Signature

```js
/**
 * Mengembalikan jumlah kuadrat dari bilangan genap dalam array.
 * @param {number[]} numbers - Array berisi angka-angka.
 * @returns {number} - Jumlah kuadrat dari bilangan genap.
 */
function sumOfEvenSquares(numbers: number[]): number
```

---

## 💡 Contoh Penggunaan

```js
sumOfEvenSquares([1, 2, 3, 4, 5]); // 20 (2^2 + 4^2)
sumOfEvenSquares([-1, 0, 1, 2, 3, 4]); // 20 (0^2 + 2^2 + 4^2)
sumOfEvenSquares([]); // 0
```

---

## 🔍 Petunjuk

- Gunakan method `filter` untuk memilih hanya bilangan genap dari array.
- Kemudian, gunakan method `map` untuk mengkuadratkan setiap bilangan genap tersebut.
- Terakhir, gunakan method `reduce` untuk menjumlahkan semua hasil kuadrat.

---

## ✅ Solusi

<details>
  <summary>🔓 Klik untuk Melihat Solusi</summary>

```js
function sumOfEvenSquares(numbers) {
  const evenSquares = numbers
    .filter((num) => num % 2 === 0)
    .map((num) => num ** 2);

  return evenSquares.reduce((sum, square) => sum + square, 0);
}
```

### 📖 Penjelasan

Kode ini bisa ditulis dalam banyak cara berbeda — berikut adalah salah satu contohnya.

- Buat variabel bernama `evenSquares` dan isi dengan hasil pemanggilan method `filter` pada array `numbers`, dilanjutkan dengan memanggil method `map` pada hasilnya.

- Pada method `filter`, masukkan fungsi _callback_ yang menerima sebuah angka dan mengembalikan `true` jika angka tersebut genap, dan `false` jika tidak. Kita menggunakan operator modulo (`%`) untuk mengecek apakah angka tersebut genap.

- Pada method `map`, masukkan fungsi _callback_ yang menerima sebuah angka dan mengembalikan **kuadrat** dari angka tersebut. Hasilnya adalah array berisi kuadrat dari bilangan-bilangan genap.

- Terakhir, panggil method `reduce` pada array `evenSquares` dan masukkan fungsi _callback_ yang menerima `sum` dan `square`, lalu mengembalikan `sum` ditambah `square`. Nilai awal `sum` diset ke `0`.

Kita bahkan bisa mempersingkat kode ini dengan **menggabungkan semua method secara berantai** (_method chaining_) dan menggunakan _arrow function_:

```js
const sumOfEvenSquares = (numbers) =>
  numbers
    .filter((num) => num % 2 === 0)
    .map((num) => num ** 2)
    .reduce((sum, square) => sum + square, 0);
```

</details>

---

## 🧪 Test Cases

```js
test('Sum of even squares', () => {
  expect(sumOfEvenSquares([1, 2, 3, 4, 5])).toBe(20);
  expect(sumOfEvenSquares([-1, 0, 1, 2, 3, 4])).toBe(20);
  expect(sumOfEvenSquares([])).toBe(0);
});
```