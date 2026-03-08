# 🔤 Count Vowels — Catatan Belajar Pribadi

> 📝 Dokumentasi ini dibuat berdasarkan video tutorial **Count Vowels Challenge** menggunakan JavaScript.

---

## 📚 Daftar Isi

- 🎯 [Pengenalan Challenge](#pengenalan)
- 💡 [Contoh Kasus](#contoh-kasus)
- 🏗️ [Cara Membangun Solusinya](#cara-membangun)
  - 🔡 [Langkah 1 — Ubah ke Lowercase](#langkah-1)
  - 🔢 [Langkah 2 — Siapkan Counter](#langkah-2)
  - 🔁 [Langkah 3 — Loop Tiap Karakter](#langkah-3)
  - ✅ [Langkah 4 — Cek Apakah Vokal](#langkah-4)
  - 📤 [Langkah 5 — Return Hasilnya](#langkah-5)
- 📄 [Kode Lengkap](#kode-lengkap)
- 🧪 [Test Cases](#test-cases)
- 🚀 [Cara Menjalankan](#cara-menjalankan)
- 🔀 [Solusi Alternatif](#solusi-alternatif)
  - 📦 [Alternatif 1 — String.includes()](#alternatif-1)
  - 🔍 [Alternatif 2 — Regex match()](#alternatif-2)

---

<a name="pengenalan"></a>
## 🎯 Pengenalan Challenge

Challenge ini namanya **Count Vowels**. Idenya simpel banget:

> Buat sebuah fungsi yang menerima sebuah **string** (kalimat/kata), lalu **kembalikan berapa banyak huruf vokal** yang ada di dalamnya.

Huruf vokal yang dihitung adalah: **a, e, i, o, u**

---

<a name="contoh-kasus"></a>
## 💡 Contoh Kasus

Sebelum nulis kode, kita lihat dulu contohnya biar makin jelas:

| Input | Output | Kenapa? |
|---|---|---|
| `'hello'` | `2` | Ada **e** dan **o** |
| `'why'` | `0` | Tidak ada vokal sama sekali |
| `'mississippi'` | `4` | Ada **i**, **i**, **i**, **i** |

> 💬 **Catatan penting:** Tidak peduli hurufnya besar (`HELLO`) atau kecil (`hello`) — hasilnya harus tetap sama. Jadi kita perlu handle soal *case* ini di kode kita.

---

<a name="cara-membangun"></a>
## 🏗️ Cara Membangun Solusinya

Kita akan membangun solusinya langkah demi langkah. Tidak ada yang perlu dikhawatirkan!

---

<a name="langkah-1"></a>
### 🔡 Langkah 1 — Ubah ke Lowercase

Masalah pertama: bagaimana kalau input-nya huruf besar semua? Misal `'HELLO'`? Supaya kita tidak perlu cek huruf besar **dan** kecil sekaligus, kita **ubah dulu semuanya ke lowercase** sebelum mulai ngecek.

```javascript
const formattedStr = str.toLowerCase();
```

Setelah baris ini, apapun yang dimasukkan user — `'HELLO'`, `'Hello'`, `'hElLo'` — semuanya jadi `'hello'`. Bersih!

---

<a name="langkah-2"></a>
### 🔢 Langkah 2 — Siapkan Counter

Kita butuh tempat untuk "menghitung". Caranya dengan membuat variabel `count` yang dimulai dari nol.

```javascript
let count = 0;
```

Setiap kali kita ketemu huruf vokal, angka ini akan kita tambah satu.

---

<a name="langkah-3"></a>
### 🔁 Langkah 3 — Loop Tiap Karakter

Sekarang kita perlu melihat **satu per satu** setiap huruf dalam string. Caranya pakai `for` loop.

```javascript
for (let i = 0; i < formattedStr.length; i++) {
  const char = formattedStr[i];
  // ...
}
```

Penjelasannya:
- `let i = 0` → mulai dari huruf pertama (index 0)
- `i < formattedStr.length` → lanjut selama masih ada huruf
- `i++` → maju ke huruf berikutnya
- `formattedStr[i]` → ambil karakter di posisi `i` dan simpan ke variabel `char`

---

<a name="langkah-4"></a>
### ✅ Langkah 4 — Cek Apakah Vokal

Di dalam loop, kita cek apakah karakter saat ini (`char`) adalah salah satu dari lima vokal. Kalau iya, tambah counter-nya.

```javascript
if (
  char === 'a' ||
  char === 'e' ||
  char === 'i' ||
  char === 'o' ||
  char === 'u'
) {
  count++;
}
```

Simbol `||` artinya **"atau"**. Jadi kondisi di atas berarti: *"kalau char-nya a, atau e, atau i, atau o, atau u..."*

---

<a name="langkah-5"></a>
### 📤 Langkah 5 — Return Hasilnya

Setelah loop selesai memeriksa semua karakter, kita kembalikan nilai `count`.

```javascript
return count;
```

---

<a name="kode-lengkap"></a>
## 📄 Kode Lengkap

Ini dia kode finalnya setelah semua langkah digabung:

```javascript
function countVowels(str) {
  // Ubah semua huruf ke lowercase agar tidak perlu cek huruf besar
  const formattedStr = str.toLowerCase();

  // Siapkan counter mulai dari 0
  let count = 0;

  // Loop setiap karakter satu per satu
  for (let i = 0; i < formattedStr.length; i++) {
    const char = formattedStr[i];

    // Kalau karakternya vokal, tambah counter
    if (
      char === 'a' ||
      char === 'e' ||
      char === 'i' ||
      char === 'o' ||
      char === 'u'
    ) {
      count++;
    }
  }

  // Kembalikan total vokal yang ditemukan
  return count;
}

module.exports = countVowels;
```

---

<a name="test-cases"></a>
## 🧪 Test Cases

Kita bisa verifikasi fungsi kita sudah benar pakai file test berikut:

```javascript
const countVowels = require('./count-vowels');

test('Counting vowels in a string', () => {
  expect(countVowels('Hello, World!')).toBe(3);   // e, o, o
  expect(countVowels('JavaScript')).toBe(3);       // a, a, i
  expect(countVowels('OpenAI Chatbot')).toBe(6);   // O, e, A, I, a, o
  expect(countVowels('Coding Challenge')).toBe(5); // o, i, a, e, e
});
```

> ✅ Kalau semua test **passed**, berarti fungsi kita sudah bekerja dengan benar!

---

<a name="cara-menjalankan"></a>
## 🚀 Cara Menjalankan

**Jalankan kode secara langsung:**
```bash
node count-vowels-run.js
```

**Jalankan test:**
```bash
npm test
```

Setelah `npm test`, kalau semua berjalan lancar kamu akan lihat **9 passed tests** ✅

---

> 💬 *Challenge ini termasuk yang paling mudah — tapi justru bagus buat latihan konsep dasar: loop, kondisional, dan manipulasi string!*

---

<a name="solusi-alternatif"></a>
## 🔀 Solusi Alternatif

Solusi utama di atas bagus untuk pemula karena sangat eksplisit dan mudah dibaca. Tapi ada cara lain yang lebih ringkas untuk menyelesaikan challenge yang sama. Keduanya menghasilkan output yang **persis sama**!

---

<a name="alternatif-1"></a>
### 📦 Alternatif 1 — Pakai `String.includes()`

Daripada nulis `char === 'a' || char === 'e' || ...` yang panjang, kita bisa simpan semua vokal dalam satu string, lalu cek apakah karakter kita ada di dalamnya.

```javascript
function countVowels(inputString) {
  const vowelChars = 'aiueoAIUEO';
  let vowelCount = 0;

  for (const char of inputString) {
    if (vowelChars.includes(char)) vowelCount++;
  }

  return vowelCount;
}
```

**Dua hal baru di sini:**

**① `String.includes()`**

Method `.includes()` mengecek apakah sebuah karakter/kata ada di dalam string. Hasilnya `true` atau `false`.

```javascript
'aiueoAIUEO'.includes('a')  // true
'aiueoAIUEO'.includes('z')  // false
```

Jadi kita tidak perlu menulis 5 kondisi `||` secara manual — cukup satu baris `vowelChars.includes(char)`. Karena `vowelChars` sudah menyertakan huruf besar dan kecil (`'aiueoAIUEO'`), kita juga tidak perlu `.toLowerCase()` lagi!

**② `for...of` loop**

Ini cara loop yang lebih modern dan lebih bersih. Dibanding `for (let i = 0; ...)`, kita tidak perlu urus index sama sekali — JavaScript langsung kasih kita setiap karakternya satu per satu.

```javascript
// Cara lama (pakai index)
for (let i = 0; i < str.length; i++) {
  const char = str[i];
}

// Cara baru (for...of) — lebih simpel!
for (const char of str) {
  // char langsung berisi karakternya
}
```

---

<a name="alternatif-2"></a>
### 🔍 Alternatif 2 — Pakai Regex `match()`

Ini cara yang paling ringkas. Kita pakai **Regular Expression (Regex)** untuk langsung menemukan semua vokal sekaligus, lalu hitung berapa yang ketemu.

```javascript
function countVowels(inputString) {
  const matches = inputString.match(/[aeiou]/gi);
  return matches ? matches.length : 0;
}
```

**Apa itu `match()` dan Regex?**

`.match()` adalah method yang mencari pola tertentu di dalam string. Polanya ditulis di antara dua garis miring `/pola/`.

```javascript
'hello world'.match(/[aeiou]/gi)
// → ['e', 'o', 'o']  ← array berisi semua vokal yang ditemukan
```

Mari kita bedah polanya: `/[aeiou]/gi`

| Bagian | Artinya |
|---|---|
| `[aeiou]` | Cari salah satu karakter: a, e, i, o, atau u |
| `g` | *global* — cari **semua** yang cocok, bukan hanya yang pertama |
| `i` | *case-insensitive* — tidak peduli huruf besar atau kecil |

Kalau tidak ada vokal sama sekali, `.match()` mengembalikan `null` (bukan array kosong). Makanya ada pengecekan ekstra:

```javascript
return matches ? matches.length : 0;
//     ↑ kalau matches tidak null → kembalikan panjang array
//                           ↑ kalau null → kembalikan 0
```

---

### 🆚 Perbandingan Ketiga Solusi

| | Solusi Utama | Alternatif 1 | Alternatif 2 |
|---|---|---|---|
| **Teknik** | `for` + `===` | `for...of` + `.includes()` | Regex `.match()` |
| **Panjang kode** | Paling panjang | Sedang | Paling pendek |
| **Kemudahan dibaca** | ⭐⭐⭐ Paling jelas | ⭐⭐ Cukup jelas | ⭐ Perlu tahu regex |
| **Cocok untuk** | Pemula | Pemula–Menengah | Menengah ke atas |

> 💡 **Tips:** Tidak ada yang "paling benar" — semua valid. Solusi utama bagus karena paling mudah dipahami saat belajar. Seiring waktu, kamu akan mulai lebih nyaman dengan cara yang lebih ringkas.