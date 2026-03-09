# 🎮 Dokumentasi Pribadi: FizzBuzz Array

> 📝 *Catatan belajar dari video tutorial — dibuat biar gampang dibaca ulang kapan aja.*

---

## 📚 Daftar Isi

- 🔍 [Apa itu FizzBuzz?](#apa-itu-fizzbuzz)
- 📋 [Aturan Main FizzBuzz](#aturan-main-fizzbuzz)
- 🔄 [Versi Array: FizzBuzzArray](#versi-array-fizzbuzzarray)
- 💡 [Konsep Kunci: Modulus `%`](#konsep-kunci-modulus)
- 🏗️ [Membangun Fungsinya](#membangun-fungsinya)
- ✅ [Kode Lengkap](#kode-lengkap)
- 🧪 [Testing dengan Jest](#testing-dengan-jest)
- ⚡ [Shortcut: Cek Divisible by 15](#shortcut-cek-divisible-by-15)

---

<a name="apa-itu-fizzbuzz"></a>
## 🔍 Apa itu FizzBuzz?

FizzBuzz adalah soal klasik yang sering muncul di **interview kerja** untuk posisi entry-level. Hampir semua perusahaan tech pernah pakai soal ini buat ngetes calon developer baru.

Intinya sederhana: **loop dari 1 sampai angka tertentu**, dan print tiap angkanya — tapi dengan aturan khusus.

---

<a name="aturan-main-fizzbuzz"></a>
## 📋 Aturan Main FizzBuzz

| Kondisi | Yang Diprint |
|---|---|
| Angka biasa | Angkanya sendiri |
| Habis dibagi **3** | `"Fizz"` |
| Habis dibagi **5** | `"Buzz"` |
| Habis dibagi **3 dan 5** | `"FizzBuzz"` |

Contoh output kalau loop dari 1 sampai 15:

```
1, 2, Fizz, 4, Buzz, Fizz, 7, 8, Fizz, Buzz, 11, Fizz, 13, 14, FizzBuzz
```

> 💡 Angka **15** adalah yang pertama kena `"FizzBuzz"` karena 15 = 3 × 5.

---

<a name="versi-array-fizzbuzzarray"></a>
## 🔄 Versi Array: FizzBuzzArray

Di video ini, soalnya dimodifikasi sedikit dari versi standar:

1. **Dibungkus dalam fungsi** bernama `fizzBuzzArray`
2. **Menerima parameter** — angka batasnya bisa ditentukan sendiri (bukan hardcode sampai 100)
3. **Return array** — bukan cuma `console.log` tiap angka, tapi semua hasilnya dikumpulkan ke dalam array

### Contoh Input & Output

**Input:** `fizzBuzzArray(5)`
```javascript
// Output:
[1, 2, 'Fizz', 4, 'Buzz']
```

**Input:** `fizzBuzzArray(15)`
```javascript
// Output:
[1, 2, 'Fizz', 4, 'Buzz', 'Fizz', 7, 8, 'Fizz', 'Buzz', 11, 'Fizz', 13, 14, 'FizzBuzz']
```

### Asumsi yang Berlaku
- Angka yang dimasukkan **selalu lebih dari 0**
- Angka yang dimasukkan **selalu bilangan bulat (integer)**

---

<a name="konsep-kunci-modulus"></a>
## 💡 Konsep Kunci: Modulus `%`

Untuk ngecek apakah suatu angka habis dibagi angka lain, kita pakai **operator modulus** (`%`).

Modulus itu ngitung **sisa bagi**. Kalau sisanya `0`, berarti habis dibagi.

```javascript
10 % 3  // → 1  (10 dibagi 3, sisa 1)
9  % 3  // → 0  (9 dibagi 3, sisa 0 ✅ habis dibagi!)
15 % 5  // → 0  (15 dibagi 5, sisa 0 ✅ habis dibagi!)
15 % 3  // → 0  (15 dibagi 3, sisa 0 ✅ habis dibagi!)
```

Jadi cara ngeceknya:
```javascript
if (i % 3 === 0) {
  // i habis dibagi 3
}
```

---

<a name="membangun-fungsinya"></a>
## 🏗️ Membangun Fungsinya

Mari kita bangun step by step.

### Step 1 — Buat fungsi dan inisialisasi array kosong

Karena kita mau mengumpulkan hasil ke dalam array, mulai dengan bikin array kosong dulu.

```javascript
function fizzBuzzArray(num) {
  const arr = []; // array kosong sebagai wadah hasil
}
```

### Step 2 — Buat loop dari 1 sampai `num`

Perhatikan: loop dimulai dari **`i = 1`**, bukan `0`. Dan kondisinya `i <= num` (pakai `<=` biar angka terakhirnya ikut masuk).

```javascript
for (let i = 1; i <= num; i++) {
  // pengecekan akan ada di sini
}
```

### Step 3 — Cek kondisi, urutan ini penting!

> ⚠️ **Urutan `if-else if` sangat penting!** Cek `FizzBuzz` (habis dibagi 3 DAN 5) harus dilakukan **paling pertama**. Kalau cek `Fizz` duluan, angka 15 bakal kena `Fizz` padahal harusnya `FizzBuzz`.

```javascript
if (i % 3 === 0 && i % 5 === 0) {
  // habis dibagi 3 DAN 5 → FizzBuzz
  arr.push('FizzBuzz');
} else if (i % 3 === 0) {
  // habis dibagi 3 saja → Fizz
  arr.push('Fizz');
} else if (i % 5 === 0) {
  // habis dibagi 5 saja → Buzz
  arr.push('Buzz');
} else {
  // angka biasa → push angkanya langsung
  arr.push(i);
}
```

### Step 4 — Return array-nya

Setelah loop selesai, kembalikan array yang sudah terisi.

```javascript
return arr;
```

---

<a name="kode-lengkap"></a>
## ✅ Kode Lengkap

**`fizzbuzz-array.js`**

```javascript
function fizzBuzzArray(num) {
  // Buat array kosong untuk menampung hasil
  const arr = [];

  // Loop dari 1 sampai num (inklusif)
  for (let i = 1; i <= num; i++) {
    // Cek FizzBuzz dulu (habis dibagi 3 DAN 5)
    if (i % 3 === 0 && i % 5 === 0) {
      arr.push('FizzBuzz');
    // Lalu cek Fizz (habis dibagi 3)
    } else if (i % 3 === 0) {
      arr.push('Fizz');
    // Lalu cek Buzz (habis dibagi 5)
    } else if (i % 5 === 0) {
      arr.push('Buzz');
    // Kalau tidak ada yang cocok, push angkanya
    } else {
      arr.push(i);
    }
  }

  return arr;
}

module.exports = fizzBuzzArray;
```

**`fizzbuzz-array-run.js`** — file buat nyoba jalanin langsung

```javascript
const fizzBuzzArray = require('./fizzbuzz-array');

const result = fizzBuzzArray(15);
console.log(result);
```

---

<a name="testing-dengan-jest"></a>
## 🧪 Testing dengan Jest

File test dipakai untuk memastikan fungsi kita menghasilkan output yang benar secara otomatis.

**`fizzbuzz-array.test.js`**

```javascript
const fizzBuzzArray = require('./fizzbuzz-array');

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

Untuk jalankan test:

```bash
npm test
```

Kalau semua benar, terminal bakal menampilkan **✅ passed**.

---

<a name="shortcut-cek-divisible-by-15"></a>
## ⚡ Shortcut: Cek Divisible by 15

Daripada nulis `i % 3 === 0 && i % 5 === 0`, kita bisa langsung cek **`i % 15 === 0`**.

Kenapa? Karena 15 = 3 × 5, jadi kalau suatu angka habis dibagi 15, otomatis dia juga habis dibagi 3 dan 5.

```javascript
// Cara panjang
if (i % 3 === 0 && i % 5 === 0) { ... }

// Cara shortcut — hasil sama persis ✅
if (i % 15 === 0) { ... }
```

Versi shortcut tetap lulus test yang sama. Ini lebih ringkas tapi logikanya identik.

---

> 🎯 **Takeaway:** FizzBuzz kelihatan simpel, tapi banyak hal yang bisa diuji dari sini — pemahaman loop, kondisional, modulus, dan cara berpikir terstruktur. Wajar banget kalau ini jadi soal favorit interviewer!