# 🧮 Dokumentasi Pribadi: Calculator Challenge

## 📚 Daftar Isi

- 🔍 [Pengenalan](#pengenalan)
- 🎯 [Apa yang Harus Dibuat?](#apa-yang-harus-dibuat)
- 🏗️ [Solusi 1 — Pakai Switch Statement](#solusi-1)
- 🔀 [Solusi 2 — Pakai If-Else](#solusi-2)
- ✨ [Solusi 3 — Switch Versi Ringkas](#solusi-3)
- 🧪 [Testing dengan Jest](#testing)
- 💡 [Kesimpulan](#kesimpulan)

---

<a name="pengenalan"></a>
## 🔍 Pengenalan

Challenge ini sedikit lebih sulit dari sebelumnya, tapi masih sangat dasar dan bisa dikerjakan pemula. Kita akan membuat **fungsi kalkulator sederhana** yang menerima dua angka dan sebuah operator, lalu mengembalikan hasil perhitungannya.

---

<a name="apa-yang-harus-dibuat"></a>
## 🎯 Apa yang Harus Dibuat?

Buat fungsi bernama `calculator` dengan ketentuan:

- **Parameter:** `num1`, `num2` (angka), dan `operator` (string)
- **Return:** hasil perhitungan berupa angka
- **Error:** kalau operator tidak valid, fungsi harus **melempar error**

### ✅ Contoh Hasil yang Diharapkan
```js
calculator(1, 2, '+')   // → 3
calculator(10, 5, '-')  // → 5
calculator(2, 2, '*')   // → 4
calculator(10, 5, '/')  // → 2
```

---

<a name="solusi-1"></a>
## 🏗️ Solusi 1 — Pakai `switch` Statement

> Switch cocok dipakai ketika ada **banyak kondisi berbeda** dari satu variabel yang sama — dalam hal ini `operator`.
```js
function calculator(num1, num2, operator) {
  let result;

  switch (operator) {
    case '+':
      result = num1 + num2;
      break;
    case '-':
      result = num1 - num2;
      break;
    case '*':
      result = num1 * num2;
      break;
    case '/':
      result = num1 / num2;
      break;
    default:
      throw new Error('Invalid operator');
  }

  return result;
}

module.exports = calculator;
```

### 🔎 Penjelasan Baris per Baris

| Bagian | Penjelasan |
|---|---|
| `let result` | Variabel penampung hasil, belum diisi dulu |
| `switch (operator)` | Cek nilai `operator`, cocokkan ke tiap `case` |
| `case '+'` | Kalau operatornya `+`, jalankan penjumlahan |
| `break` | Hentikan switch setelah satu case selesai |
| `default` | Kalau tidak ada case yang cocok, lempar error |
| `return result` | Kembalikan hasilnya setelah switch selesai |

> 💡 **Kenapa `return` ada di luar switch?** Karena kita perlu semua case selesai dulu, baru hasilnya dikembalikan.

---

<a name="solusi-2"></a>
## 🔀 Solusi 2 — Pakai `if-else`

> Kalau lebih nyaman dengan `if-else`, cara ini juga valid sepenuhnya — hasilnya sama persis!
```js
function calculator(num1, num2, operator) {
  let result;

  if (operator === '+') {
    result = num1 + num2;
  } else if (operator === '-') {
    result = num1 - num2;
  } else if (operator === '*') {
    result = num1 * num2;
  } else if (operator === '/') {
    result = num1 / num2;
  } else {
    throw new Error('Invalid operator');
  }

  return result;
}
```

Setiap `else if` mengecek satu jenis operator. Blok `else` di paling bawah menangani semua kasus yang tidak valid.

> 🤔 **Switch vs If-Else?** Keduanya benar. Switch lebih rapi untuk banyak kondisi, if-else lebih fleksibel untuk kondisi yang kompleks.

---

<a name="solusi-3"></a>
## ✨ Solusi 3 — Switch Versi Ringkas

> Versi ini lebih pendek dari Solusi 1 — tidak pakai variabel `result` dan tidak pakai `break`. Langsung `return` di tiap case!
```js
function calculator(num1, num2, operator) {
  switch (operator) {
    case '+':
      return num1 + num2;
    case '-':
      return num1 - num2;
    case '*':
      return num1 * num2;
    case '/':
      return num1 / num2;
    default:
      throw new Error('Invalid operator');
  }
}

module.exports = calculator;
```

### 🔎 Apa Bedanya dengan Solusi 1?

| | Solusi 1 | Solusi 3 |
|---|---|---|
| Variabel `result` | ✅ Ada | ❌ Tidak perlu |
| `break` di tiap case | ✅ Ada | ❌ Tidak perlu |
| `return` | Di luar switch | Di dalam tiap case |
| Jumlah baris | Lebih panjang | Lebih ringkas |

> 💡 Kenapa `break` tidak diperlukan? Karena `return` langsung menghentikan fungsi sepenuhnya — jadi eksekusi tidak akan pernah lanjut ke case berikutnya.

> 🚀 Versi ini lebih banyak dipakai di dunia nyata karena lebih clean dan mudah dibaca!

---

<a name="testing"></a>
## 🧪 Testing dengan Jest

Setelah kode selesai, kita jalankan tes otomatis menggunakan **Jest** untuk memastikan fungsi bekerja benar.
```js
const calculator = require('./calculator');

test('Performing arithmetic operations using the calculator function', () => {
  const num1 = 5;
  const num2 = 7;

  expect(calculator(num1, num2, '+')).toBe(12);                         // ➕ Penjumlahan
  expect(calculator(num1, num2, '-')).toBe(-2);                         // ➖ Pengurangan
  expect(calculator(num1, num2, '*')).toBe(35);                         // ✖️ Perkalian
  expect(calculator(num1, num2, '/')).toBeCloseTo(0.7143, 4);           // ➗ Pembagian
  expect(() => calculator(num1, num2, '^')).toThrow('Invalid operator'); // ❌ Invalid
});
```

Jalankan dengan perintah `npm test` — kalau semua benar, hasilnya **3 passing tests, 0 failing**.

> 📝 Pembagian pakai `toBeCloseTo(0.7143, 4)` bukan `.toBe()` karena hasilnya desimal panjang — cukup cocokkan sampai 4 angka di belakang koma.

> ⚠️ Di `calculator-run.js`, kalau operator diganti ke `'_'`, program akan **melempar error** — itu memang perilaku yang diharapkan!

---

<a name="kesimpulan"></a>
## 💡 Kesimpulan

| Konsep | Yang Dipelajari |
|---|---|
| `switch` statement | Cara rapi untuk banyak kondisi dari satu variabel |
| `if-else` | Alternatif switch yang lebih fleksibel |
| `return` di dalam `case` | Bisa langsung return tanpa perlu `break` |
| `throw new Error()` | Cara melempar error secara eksplisit |
| `module.exports` | Cara ekspor fungsi agar bisa dipakai file lain |
| Jest `expect` | Cara menulis tes otomatis untuk fungsi |

> 🚀 Challenge ini melatih **logika percabangan** dan **penanganan error** — dua hal yang sangat sering dipakai di dunia nyata!