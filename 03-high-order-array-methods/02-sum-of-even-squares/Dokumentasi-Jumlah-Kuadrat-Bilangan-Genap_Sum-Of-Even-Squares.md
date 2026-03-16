# 🧮 Sum of Squares of Even Numbers

> 📓 **Catatan pribadi** — dokumentasi ini dibuat dari video tutorial tentang penggunaan `filter`, `map`, dan `reduce` secara berantai untuk memecahkan sebuah tantangan JavaScript.

---

## 📋 Daftar Isi

- 🎯 [Pengenalan Challenge](#pengenalan)
- 🔍 [Langkah 1 — Filter Angka Genap](#langkah-1-filter)
- 🔄 [Langkah 2 — Kuadratkan dengan Map](#langkah-2-map)
- ➕ [Langkah 3 — Jumlahkan dengan Reduce](#langkah-3-reduce)
- ⛓️ [Chaining Ketiga Method Sekaligus](#chaining)
- ✅ [Test Cases](#test-cases)

---

<a name="pengenalan"></a>
## 🎯 Pengenalan Challenge

Tugasnya cukup sederhana: buat fungsi `sumOfEvenSquares` yang menerima sebuah **array angka**, lalu mengembalikan **jumlah dari kuadrat semua angka genapnya**.

Misalnya:

```js
sumOfEvenSquares([1, 2, 3, 4, 5]); // → 20
// Karena: 2² + 4² = 4 + 16 = 20
```

Tantangan ini menggunakan tiga method array secara **berantai (chaining)**:
- `filter` → untuk menyaring angka genap
- `map` → untuk mengkuadratkan setiap angka
- `reduce` → untuk menjumlahkan semuanya

---

<a name="langkah-1-filter"></a>
## 🔍 Langkah 1 — Filter Angka Genap

Hal pertama yang perlu dilakukan adalah **menyaring (filter) angka ganjil** dari array, sehingga kita hanya menyisakan angka genap.

Cara cek apakah suatu angka itu genap: gunakan **operator modulus `%`**. Kalau `num % 2 === 0`, artinya angkanya genap.

```js
const evenNumbers = numbers.filter((num) => num % 2 === 0);
```

> 💡 `filter` akan mengembalikan **array baru** yang hanya berisi elemen-elemen yang lolos kondisi di dalamnya.

Contoh hasilnya:

```js
// Input:  [1, 2, 3, 4, 5, 6, 7, 8]
// Output: [2, 4, 6, 8]
```

---

<a name="langkah-2-map"></a>
## 🔄 Langkah 2 — Kuadratkan dengan Map

Setelah kita punya array berisi angka genap saja, langkah berikutnya adalah **mengkuadratkan setiap angka** di dalamnya.

Untuk memangkatkan angka di JavaScript, gunakan **operator `**`** (double asterisk):

```js
const squaredNumbers = evenNumbers.map((num) => num ** 2);
```

> 💡 `map` akan mengembalikan **array baru** dengan setiap elemen sudah diproses oleh fungsi di dalamnya.

Contoh hasilnya:

```js
// Input:  [2, 4, 6, 8]
// Output: [4, 16, 36, 64]
```

---

<a name="langkah-3-reduce"></a>
## ➕ Langkah 3 — Jumlahkan dengan Reduce

Langkah terakhir adalah **menjumlahkan semua angka** yang sudah dikuadratkan tadi.

`reduce` bekerja dengan cara mengakumulasi nilai satu per satu. Parameter pertamanya adalah **akumulator** (tempat menyimpan total sementara), dan parameter kedua adalah **nilai awal** akumulator tersebut — kita set ke `0` agar hasilnya tetap `0` kalau array-nya kosong.

```js
const total = squaredNumbers.reduce((sum, square) => sum + square, 0);
```

> 💡 Angka `0` di akhir adalah **nilai awal** untuk `sum`. Ini penting! Kalau array-nya kosong, hasilnya akan tetap `0` dan tidak error.

---

<a name="chaining"></a>
## ⛓️ Chaining Ketiga Method Sekaligus

Ketiga langkah di atas bisa digabung menjadi satu ekspresi yang bersih menggunakan **method chaining** — tinggal sambung satu method ke method berikutnya.

Saat melakukan chaining, setiap method menerima **hasil dari method sebelumnya**, bukan array aslinya. Jadi `map` di bawah ini hanya akan melihat angka-angka genap (hasil `filter`), bukan seluruh array asli.

```js
function sumOfEvenSquares(numbers) {
  const evenSquares = numbers
    .filter((num) => num % 2 === 0)  // 1️⃣ Ambil angka genap saja
    .map((num) => num ** 2)           // 2️⃣ Kuadratkan setiap angka
    .reduce((sum, square) => sum + square, 0); // 3️⃣ Jumlahkan semuanya

  return evenSquares;
}

module.exports = sumOfEvenSquares;
```

Atau kalau mau lebih ringkas pakai arrow function:

```js
const sumOfEvenSquares = (numbers) =>
  numbers
    .filter((num) => num % 2 === 0)
    .map((num) => num ** 2)
    .reduce((sum, square) => sum + square, 0);
```

Keduanya menghasilkan output yang sama, tinggal pilih gaya mana yang lebih nyaman dibaca.

---

<a name="test-cases"></a>
## ✅ Test Cases

Berikut test yang digunakan untuk memverifikasi fungsi ini sudah benar:

```js
test('Sum of even squares', () => {
  expect(sumOfEvenSquares([1, 2, 3, 4, 5])).toBe(20);
  // 2² + 4² = 4 + 16 = 20 ✅

  expect(sumOfEvenSquares([-1, 0, 1, 2, 3, 4])).toBe(20);
  // 0² + 2² + 4² = 0 + 4 + 16 = 20 ✅

  expect(sumOfEvenSquares([])).toBe(0);
  // Array kosong → 0 ✅
});
```

> 🧪 Jalankan test dengan perintah: `npm test`

Perlu diperhatikan:
- **Angka negatif** seperti `-1` dan `-3` tetap **ganjil**, jadi ikut tersaring keluar.
- **Angka 0** dianggap **genap** (`0 % 2 === 0`), tapi kuadratnya tetap `0` jadi tidak mempengaruhi hasil.
- **Array kosong** langsung mengembalikan `0` berkat nilai awal `reduce`.