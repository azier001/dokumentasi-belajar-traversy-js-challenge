# 📘 Dokumentasi Pribadi: Challenge `getSum`

> 🗂️ Seri: JavaScript Challenges untuk Pemula

---

## 📑 Daftar Isi

- 🔍 [Pengenalan Challenge](#pengenalan)
- 🎯 [Apa yang Diminta?](#apa-yang-diminta)
- 🏗️ [Membuat Fungsi `getSum`](#membuat-fungsi)
- ▶️ [Menjalankan File Secara Manual](#menjalankan-manual)
- 🧪 [Testing dengan Jest](#testing-jest)
- ❌ [Melihat Test yang Gagal](#test-gagal)
- ✅ [Memperbaiki & Lulus Test](#memperbaiki)
- 📝 [Rangkuman](#rangkuman)

---

<a name="pengenalan"></a>
## 🔍 Pengenalan Challenge

Challenge ini adalah latihan dasar yang dirancang buat kamu yang baru mulai belajar JavaScript. Tujuannya bukan cuma bikin kodenya jalan, tapi juga **membiasakan diri dengan alur kerja developer**: nulis fungsi → jalankan → test otomatis.

---

<a name="apa-yang-diminta"></a>
## 🎯 Apa yang Diminta?

Buatlah sebuah fungsi bernama `getSum` yang:
- Menerima **dua angka** sebagai parameter (sebut saja `a` dan `b`)
- **Mengembalikan hasil penjumlahan** dari kedua angka tersebut

### Contoh hasil yang diharapkan:

| Input | Output |
|-------|--------|
| `getSum(1, 2)` | `3` |
| `getSum(10, 5)` | `15` |
| `getSum(2, 2)` | `4` |

> 💡 **Hint:** Gunakan operator `+` untuk menjumlahkan dua angka.

---

<a name="membuat-fungsi"></a>
## 🏗️ Membuat Fungsi `getSum`

Buat file baru bernama `get-sum.js`, lalu tulis fungsi berikut:

```javascript
// get-sum.js

function getSum(a, b) {
  return a + b;  // ← cukup kembalikan hasil penjumlahan a dan b
}

module.exports = getSum;  // ← ekspor agar bisa dipakai di file lain
```

Sesederhana itu! Fungsi ini terima dua nilai, tambahkan keduanya, lalu kembalikan hasilnya.

> 📌 `module.exports` digunakan supaya fungsi `getSum` bisa di-*import* dari file lain menggunakan `require()`.

---

<a name="menjalankan-manual"></a>
## ▶️ Menjalankan File Secara Manual

Sebelum pakai testing otomatis, kamu bisa cek fungsinya secara manual lewat file `get-sum-run.js`:

```javascript
// get-sum-run.js

const getSum = require('./get-sum');  // ambil fungsi dari get-sum.js

const result = getSum(1, 10);        // panggil fungsinya

console.log(result);                 // tampilkan hasilnya di terminal
```

Jalankan di terminal dengan perintah:

```bash
node get-sum-run.js
```

**Output yang muncul:**
```
11
```

> ✅ Karena `1 + 10 = 11`, hasilnya benar!

---

<a name="testing-jest"></a>
## 🧪 Testing dengan Jest

Testing manual itu bagus, tapi cara yang lebih *proper* adalah pakai **testing otomatis** menggunakan Jest.

File test-nya adalah `get-sum-test.js` (perlu di-*rename* jadi `get-sum.test.js` agar Jest bisa mengenalinya):

```javascript
// get-sum.test.js

const getSum = require('./get-sum');

test('Calculating the sum of two numbers', () => {
  const num1 = 5;
  const num2 = 7;

  const result = getSum(num1, num2);  // panggil fungsi dengan 5 dan 7

  expect(result).toBe(12);            // hasilnya harus 12
});
```

Lalu jalankan test dengan:

```bash
npm test
```

**Kalau berhasil, outputnya akan seperti ini:**
```
✓ Calculating the sum of two numbers

Tests: 2 passed
```

> 🔎 Jest akan mendeteksi **semua file `.test.js`** di project, jadi angka "2 passed" bisa termasuk test dari challenge lain juga.

---

<a name="test-gagal"></a>
## ❌ Melihat Test yang Gagal

Supaya kamu paham cara kerja Jest, coba sengaja buat fungsinya salah — ganti `+` dengan `-`:

```javascript
// get-sum.js (versi salah — hanya untuk percobaan!)

function getSum(a, b) {
  return a - b;  // ← sengaja salah: harusnya +, bukan -
}

module.exports = getSum;
```

Jalankan lagi `npm test`, dan Jest akan menampilkan pesan error seperti ini:

```
✕ Calculating the sum of two numbers

  ● Calculating the sum of two numbers

    expect(received).toBe(expected)

    Expected: 12
    Received: -2
```

> 💬 Jest bilang: *"Aku harapkan hasilnya 12 (karena 5+7), tapi malah dapat -2 (karena 5-7)."*

Ini sangat membantu! Jest langsung menunjukkan **di mana letak kesalahannya** dan **apa yang seharusnya terjadi**.

---

<a name="memperbaiki"></a>
## ✅ Memperbaiki & Lulus Test

Kembalikan tanda operator ke `+`:

```javascript
// get-sum.js (versi benar)

function getSum(a, b) {
  return a + b;  // ← sudah benar lagi
}

module.exports = getSum;
```

Jalankan `npm test` sekali lagi:

```bash
npm test
```

```
✓ Calculating the sum of two numbers

Tests: passed ✅
```

---

<a name="rangkuman"></a>
## 📝 Rangkuman

| Konsep | Penjelasan Singkat |
|--------|--------------------|
| `function getSum(a, b)` | Fungsi yang menerima dua parameter angka |
| `return a + b` | Mengembalikan hasil penjumlahan |
| `module.exports` | Mengekspor fungsi agar bisa dipakai file lain |
| `require('./get-sum')` | Mengimpor fungsi dari file lain |
| `npm test` | Menjalankan semua file `.test.js` dengan Jest |
| `expect(result).toBe(12)` | Mengecek apakah hasil fungsi sesuai yang diharapkan |

> 🚀 **Selanjutnya:** Challenge berikutnya adalah membuat fungsi kalkulator yang lebih lengkap!