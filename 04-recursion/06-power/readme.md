# ⚡ Power

> **Tantangan rekursi** — Implementasikan fungsi `power` yang menghitung hasil perpangkatan bilangan menggunakan pendekatan **rekursif**.

---

## 📋 Instruksi

Tulis sebuah fungsi bernama `power` yang menerima `base` dan `exponent`, lalu mengembalikan hasil perpangkatan `base` terhadap `exponent`. Gunakan **rekursi** untuk menyelesaikan masalah ini.

### ✍️ Function Signature

```js
/**
 * Mengembalikan hasil perpangkatan base terhadap exponent.
 * @param {number} base - Bilangan pokok (basis).
 * @param {number} exponent - Pangkat (eksponen).
 * @returns {number} - Hasil perhitungan.
 */
function power(base: number, exponent: number): number;
```

---

### 💡 Contoh Penggunaan

```js
power(2, 3); // 8 (2^3 = 2 * 2 * 2 = 8)
power(5, 2); // 25 (5^2 = 5 * 5 = 25)
power(3, 4); // 81 (3^4 = 3 * 3 * 3 * 3 = 81)
```

---

### 🚧 Batasan

- `base` dan `exponent` selalu berupa **bilangan bulat positif**

---

### 🔍 Petunjuk

- Ingat bahwa **bilangan apapun yang dipangkatkan 0 bernilai 1** — ini adalah *base case* yang perlu kamu gunakan
- Pikirkan bagaimana kamu bisa **memecah masalah menjadi bagian-bagian lebih kecil** menggunakan rekursi

---

## ✅ Solusi

<details>
  <summary>👆 Klik untuk Melihat Solusi</summary>

```js
function power(base, exponent) {
  if (exponent === 0) {
    return 1;
  } else {
    return base * power(base, exponent - 1);
  }
}
```

### 🧠 Penjelasan

- **Base case** dari rekursi terjadi saat `exponent === 0`. Pada kondisi ini, kita mengembalikan `1` karena bilangan apapun yang dipangkatkan 0 adalah 1.
- Untuk nilai `exponent` lainnya, kita **memecah masalah menjadi bagian yang lebih kecil**. Untuk menghitung `base` pangkat `exponent`, kita mengalikan `base` dengan hasil pemanggilan fungsi yang sama menggunakan `base` yang sama dan `exponent` yang dikurangi 1. Langkah rekursif ini adalah **inti dari algoritma**, karena terus menyederhanakan masalah hingga mencapai *base case*.

Mari kita telusuri `power(2, 5)` secara mendetail — mulai dari pemanggilan awal hingga *base case* tercapai, lalu proses *unwinding* (penguraian balik) berlangsung:

```js
base = 2
exponent = 5
exponent !== 0, maka base case dilewati
return 2 * power(2, 4)
exponent = 4
return 2 * power(2, 3)
exponent = 3
return 2 * power(2, 2)
exponent = 2
return 2 * power(2, 1)
exponent = 1
return 2 * power(2, 0)
exponent = 0
return 1
```

Sekarang proses *unwinding* dimulai:

```js
return 1 * 2 = 2
return 2 * 2 = 4
return 4 * 2 = 8
return 8 * 2 = 16
return 16 * 2 = 32
```

</details>

---

### 🧪 Test Cases

```js
test('Calculate Power of Base to Exponent', () => {
  expect(power(2, 3)).toEqual(8);
  expect(power(5, 2)).toEqual(25);
  expect(power(3, 4)).toEqual(81);
});
```