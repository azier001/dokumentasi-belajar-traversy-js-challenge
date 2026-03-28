# 🌀 Tantangan: Deret Fibonacci Menggunakan Rekursi

> **Deret Fibonacci** adalah salah satu contoh paling populer dalam pemrograman rekursif — sangat sering muncul dalam sesi wawancara teknis. Pelajari cara kerjanya dan kuasai polanya!

---

## 📐 Apa itu Deret Fibonacci?

Deret Fibonacci adalah serangkaian angka yang dimulai dengan **0** dan **1**, di mana setiap angka berikutnya merupakan **jumlah dari dua angka sebelumnya**. Deret ini terlihat seperti berikut:

`0, 1, 1, 2, 3, 5, 8, 13, 21, 34...`

Rumus deret Fibonacci adalah:

**`F(n) = F(n-1) + F(n-2)`**

- **`F(n)`** adalah angka ke-n dalam deret.
- **`F(n-1)`** adalah angka sebelumnya.
- **`F(n-2)`** adalah angka dua posisi sebelumnya.

### 🔍 Contoh: Mencari angka ke-5

```
F(5) = F(4) + F(3)
F(4) = F(3) + F(2)
F(3) = F(2) + F(1)
F(2) = F(1) + F(0)
F(1) = 1
F(0) = 0
```

Sehingga: `F(2) = 1 + 0 = 1`, `F(3) = 1 + 1 = 2`, `F(4) = 2 + 1 = 3`, dan **`F(5) = 3 + 2 = 5`**.

Jadi angka ke-5 dalam deret Fibonacci adalah **5**.

---

## 📋 Instruksi

Tulis sebuah function bernama `fibonacci` yang menerima sebuah angka dan mengembalikan angka pada indeks tersebut dalam deret Fibonacci.

### ✍️ Tanda Tangan Function

```js
/**
 * Mengembalikan angka pada indeks yang diberikan dalam deret Fibonacci.
 * @param {number} num - Indeks dalam deret Fibonacci.
 * @returns {number} - Angka pada indeks yang diberikan dalam deret Fibonacci.
 */
function fibonacci(num: number): number;
```

---

### 💡 Contoh Penggunaan

```js
fibonacci(4); // 3
fibonacci(6); // 8
fibonacci(10); // 55
```

---

### ⚠️ Batasan

- Angka yang diberikan selalu berupa **bilangan bulat positif**

---

### 🗝️ Petunjuk

- Kamu sudah tahu bahwa rumusnya adalah `F(n) = F(n-1) + F(n-2)`. `F` adalah function-nya, dan `n` adalah angka dalam deret.
- Kamu juga tahu bahwa dua angka pertama dalam deret adalah `0` dan `1`. Jadi jika angka yang diberikan **kurang dari 2**, kamu bisa langsung mengembalikan angka tersebut.

---

## ✅ Solusi

<details>
  <summary>👁️ Klik untuk Melihat Solusi</summary>

```js
function fibonacci(num) {
  // Base case (kasus dasar)
  if (num < 2) return num;

  // Recursive case (kasus rekursif)
  return fibonacci(num - 1) + fibonacci(num - 2);
}
```

### 📖 Penjelasan

- Kita memiliki yang disebut **`base case`** (kasus dasar), yaitu ketika angkanya kurang dari 2.
- Jika kondisi ini terpenuhi, kita langsung **mengembalikan angka tersebut**.
- Jika tidak, kita menjalankan **`recursive case`** (kasus rekursif), yang akan mengembalikan jumlah dari dua angka sebelumnya. Proses ini berlanjut hingga angkanya kurang dari 2.

---

### 🪜 Langkah demi Langkah — Contoh dengan `num = 5`

1. **Panggilan Awal:** `fibonacci(5)` dipanggil.
2. **Panggilan Rekursif 1:** `fibonacci(5)` memanggil `fibonacci(4) + fibonacci(3)`.
3. **Panggilan Rekursif 2:** `fibonacci(4)` memanggil `fibonacci(3) + fibonacci(2)`.
4. **Panggilan Rekursif 3:** `fibonacci(3)` memanggil `fibonacci(2) + fibonacci(1)`.
5. **Base Case 1:** `fibonacci(2)` mengembalikan `1`.
6. **Base Case 2:** `fibonacci(1)` mengembalikan `1`.
7. **Proses Unwinding:** Saat panggilan rekursif mulai kembali, function mengakumulasi hasilnya:

   - `fibonacci(1)` mengembalikan `1`.
   - `fibonacci(2)` mengembalikan `1`.
   - `fibonacci(3)` mengembalikan `fibonacci(2) + fibonacci(1)` = 1 + 1 = **`2`**.
   - `fibonacci(4)` mengembalikan `fibonacci(3) + fibonacci(2)` = 2 + 1 = **`3`**.
   - `fibonacci(5)` mengembalikan `fibonacci(4) + fibonacci(3)` = 3 + 2 = **`5`**.

Jadi, `fibonacci(5)` mengembalikan **`5`**, yang merupakan angka ke-5 dalam deret Fibonacci.

---

### ⚡ Versi One-Liner menggunakan Ternary Operator

```js
const fibonacci = (num) =>
  num < 2 ? num : fibonacci(num - 1) + fibonacci(num - 2);
```

</details>

---

## 🧪 Test Cases

```js
describe('fibonacci', () => {
  it('should return the correct Fibonacci number', () => {
    expect(fibonacci(0)).toBe(0); // Fibonacci ke-0 adalah 0
    expect(fibonacci(1)).toBe(1); // Fibonacci ke-1 adalah 1
    expect(fibonacci(2)).toBe(1); // Fibonacci ke-2 adalah 1 (0 + 1)
    expect(fibonacci(3)).toBe(2); // Fibonacci ke-3 adalah 2 (1 + 1)
    expect(fibonacci(4)).toBe(3); // Fibonacci ke-4 adalah 3 (1 + 2)
    expect(fibonacci(5)).toBe(5); // Fibonacci ke-5 adalah 5 (2 + 3)
    expect(fibonacci(6)).toBe(8); // Fibonacci ke-6 adalah 8 (3 + 5)
    expect(fibonacci(7)).toBe(13); // Fibonacci ke-7 adalah 13 (5 + 8)
  });
});
```