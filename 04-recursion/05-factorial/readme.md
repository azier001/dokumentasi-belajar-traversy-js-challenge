# 🧮 Tantangan: Factorial Menggunakan Rekursi

> **Dokumen ini menjelaskan konsep factorial dan cara mengimplementasikannya menggunakan pendekatan rekursif dalam pemrograman.**

---

## 📖 Deskripsi

Factorial dari sebuah bilangan/integer adalah hasil perkalian bilangan tersebut dengan semua bilangan di bawahnya. Ditulis sebagai `5!` (factorial dari 5).

```text
- 0! = 1
- 1! = 1
- 2! = 2 * 1 = 2
- 3! = 3 * 2 * 1 = 6
- 4! = 4 * 3 * 2  * 1 = 24
- 5! = 5 * 4 * 3 * 2 * 1 = 120
```

Fungsi factorial banyak digunakan dalam berbagai aplikasi matematika dan pemrograman. Nilainya **tumbuh sangat cepat** seiring bertambahnya `n`, sehingga menjadikannya tantangan yang menarik untuk mengeksplorasi **fungsi rekursif**.

---

## 📝 Instruksi

Tulislah sebuah function bernama `factorial` yang menerima sebuah bilangan dan mengembalikan nilai factorial dari bilangan tersebut.

### ✍️ Function Signature

```js
/**
 * Mengembalikan nilai factorial dari sebuah bilangan.
 * @param {number} num - Bilangan yang akan dihitung.
 * @returns {number} - Nilai factorial dari bilangan tersebut.
 */
function factorial(num: number): number;
```

---

### 🚧 Constraints

- Bilangan input akan **selalu berupa integer positif**

---

### 💡 Hints

- Periksa apakah bilangan tersebut adalah `0` atau `1`. Jika iya, kembalikan nilai `1`.
- Kamu dapat menggunakan **rekursi** untuk menghitung factorial dengan mengalikan bilangan saat ini dengan factorial dari bilangan sebelumnya, hingga mencapai *base case*.

---

### 📌 Contoh Penggunaan

```js
factorial(0); // 1
factorial(5); // 120 (5! = 5 * 4 * 3 * 2 * 1 = 120)
factorial(10); // 3628800 (10! = 10 * 9 * 8 * 7 * 6 * 5 * 4 * 3 * 2 * 1 = 3628800)
```

---

## ✅ Solusi

<details>
  <summary>Klik untuk Melihat Solusi</summary>

```js
function factorial(num) {
  if (num === 0 || num === 1) {
    return 1;
  }

  return num * factorial(num - 1);
}
```

### 🔍 Penjelasan

Fungsi `factorial` menghitung nilai factorial dari bilangan yang diberikan menggunakan **rekursi**.

Jika bilangan input adalah `0` atau `1`, maka *base case* tercapai, dan fungsi mengembalikan nilai `1` — karena `0!` dan `1!` keduanya didefinisikan sebagai `1`.

Untuk bilangan input lainnya, *recursive case* dijalankan. Fungsi menghitung factorial dengan mengalikan bilangan saat ini `num` dengan factorial dari `num - 1`, yang dihitung secara rekursif. Proses ini berlanjut hingga *base case* tercapai, di mana rekursi mulai **"berbalik arah"** (*unwinding*) dan hasil akhir diperoleh.

Mari kita telusuri langkah demi langkah untuk menghitung `factorial(5)`:

```js
factorial(5) = 5 * factorial(4)
factorial(4) = 4 * factorial(3)
factorial(3) = 3 * factorial(2)
factorial(2) = 2 * factorial(1)
factorial(1) = 1 (base case)
```

Proses *unwinding* rekursi:

```js
factorial(2) = 2 * 1 = 2
factorial(3) = 3 * 2 = 6
factorial(4) = 4 * 6 = 24
factorial(5) = 5 * 24 = 120
```

Hasil akhirnya adalah **120**, yang merupakan nilai factorial yang benar dari `5`.

</details>

---

## 🧪 Test Cases

```js
test('Factorial dari 0 harus bernilai 1', () => {
  expect(factorial(0)).toBe(1);
});

test('Factorial dari 5 harus bernilai 120', () => {
  expect(factorial(5)).toBe(120);
});

test('Factorial dari 10 harus bernilai 3628800', () => {
  expect(factorial(10)).toBe(3628800);
});
```