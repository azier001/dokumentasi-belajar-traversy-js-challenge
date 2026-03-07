# 🔁 JavaScript Challenge: Palindrome

Dokumentasi ini dibuat berdasarkan video tutorial tentang **Palindrome Challenge** — salah satu tantangan klasik dalam belajar JavaScript!

---

## 📑 Daftar Isi

- 🎯 [Apa Itu Palindrome?](#apa-itu-palindrome)
- 📋 [Spesifikasi Fungsi](#spesifikasi-fungsi)
- ✨ [Solusi 1: Menggunakan Regular Expression](#solusi-1-menggunakan-regular-expression)
- 🔧 [Solusi 2: Tanpa Regular Expression](#solusi-2-tanpa-regular-expression)
- ⚡ [Solusi 3: Two-Pointer](#solusi-3-two-pointer)
- 🧪 [Testing](#testing)

---

<a name="apa-itu-palindrome"></a>
## 🎯 Apa Itu Palindrome?

Palindrome adalah kata, frasa, angka, atau urutan karakter apapun yang **dibaca sama baik dari depan maupun dari belakang**.

Contoh palindrome:
- `"madam"` → m-a-d-a-m, sama kalau dibaca terbalik ✅
- `"racecar"` → r-a-c-e-c-a-r, sama kalau dibaca terbalik ✅
- `"race car"` → tanpa spasi jadi `"racecar"`, tetap palindrome ✅
- `""` → string kosong dianggap palindrome ✅

---

<a name="spesifikasi-fungsi"></a>
## 📋 Spesifikasi Fungsi

Kita akan membuat fungsi bernama `isPalindrome` yang:

- **Menerima**: sebuah string
- **Mengembalikan**: `true` jika palindrome, `false` jika bukan
- **Aturan penting**: abaikan spasi dan karakter non-alphanumeric (tanda baca, simbol, dll)

```js
isPalindrome('racecar')                    // true
isPalindrome('racecars')                   // false
isPalindrome('A man, a plan, a canal, Panama') // true (setelah strip karakter)
isPalindrome('12321')                      // true
isPalindrome('')                           // true
```

---

<a name="solusi-1-menggunakan-regular-expression"></a>
## ✨ Solusi 1: Menggunakan Regular Expression

Ini adalah cara **paling singkat dan simpel** — hanya 3 baris kode!

### Langkah 1 — Bersihkan & Format String

Pertama, kita ubah string jadi lowercase, lalu hapus semua karakter yang bukan huruf atau angka:

```js
function isPalindrome(str) {
  const formattedStr = str.toLowerCase().replace(/[^a-z0-9]/g, '');
}
```

💡 **Apa yang terjadi di sini?**
- `str.toLowerCase()` → ubah semua huruf jadi kecil supaya perbandingan tidak case-sensitive
- `.replace(/[^a-z0-9]/g, '')` → hapus semua karakter yang **bukan** huruf a-z atau angka 0-9
  - `/[^a-z0-9]/g` adalah **regular expression**: `^` artinya "bukan", `g` artinya cek seluruh string (global)
  - Hasilnya diganti dengan `''` (string kosong) = dihapus

### Langkah 2 — Balik String

Setelah bersih, kita balik string menggunakan trik `split → reverse → join`:

```js
function isPalindrome(str) {
  const formattedStr = str.toLowerCase().replace(/[^a-z0-9]/g, '');
  const reversedStr = formattedStr.split('').reverse().join('');
}
```

💡 **Apa yang terjadi di sini?**
- `.split('')` → pecah string jadi array karakter, misal `"abc"` → `['a','b','c']`
- `.reverse()` → balik urutan array → `['c','b','a']`
- `.join('')` → gabungkan kembali jadi string → `"cba"`

### Langkah 3 — Bandingkan dan Return

Terakhir, bandingkan string asli (yang sudah diformat) dengan string yang sudah dibalik:

```js
function isPalindrome(str) {
  const formattedStr = str.toLowerCase().replace(/[^a-z0-9]/g, '');
  const reversedStr = formattedStr.split('').reverse().join('');
  return formattedStr === reversedStr;
}
```

💡 **Apa yang terjadi di sini?**
- `formattedStr === reversedStr` → kalau sama berarti palindrome → return `true`
- Kalau tidak sama → return `false`
- JavaScript otomatis return nilai boolean dari ekspresi `===`

---

<a name="solusi-2-tanpa-regular-expression"></a>
## 🔧 Solusi 2: Tanpa Regular Expression

Cara kedua ini **lebih panjang** tapi membantu kamu memahami cara kerja lebih dalam. Kita akan buat beberapa **helper function** (fungsi pembantu).

### Gambaran Besar

```
isPalindrome(str)
  ├── removeNonAlphanumeric(str)   → bersihin karakter aneh
  │     └── isAlphaNumeric(char)  → cek satu karakter
  └── reverseString(str)          → balik string
```

---

### Helper 1 — `isAlphaNumeric(char)`

Fungsi ini mengecek apakah **satu karakter** adalah huruf atau angka, menggunakan **Unicode character code**.

Setiap karakter punya nomor unik (Unicode). Kita manfaatkan itu:
- Angka `0–9` → kode **48–57**
- Huruf kecil `a–z` → kode **97–122**

```js
function isAlphaNumeric(char) {
  const code = char.charCodeAt(0);
  return (
    (code >= 48 && code <= 57) ||  // Angka 0-9
    (code >= 97 && code <= 122)    // Huruf kecil a-z
  );
}
```

💡 **Apa yang terjadi di sini?**
- `char.charCodeAt(0)` → ambil kode Unicode dari karakter (index 0 karena hanya 1 karakter)
- Kita cek apakah kodenya ada di range angka (48-57) **atau** range huruf kecil (97-122)
- Return `true` kalau ya, `false` kalau tidak
- Contoh: `isAlphaNumeric('a')` → `true`, `isAlphaNumeric('@')` → `false`

---

### Helper 2 — `removeNonAlphanumeric(str)`

Fungsi ini loop melalui seluruh string dan hanya **menyimpan karakter alphanumeric**:

```js
function removeNonAlphanumeric(str) {
  let formattedStr = '';
  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    if (isAlphaNumeric(char)) {
      formattedStr += char;
    }
  }
  return formattedStr;
}
```

💡 **Apa yang terjadi di sini?**
- Mulai dengan `formattedStr` yang kosong
- Loop dari index `0` sampai akhir string
- `str[i]` → ambil satu karakter di posisi `i`
- Kalau karakter itu alphanumeric (cek pakai `isAlphaNumeric`), tambahkan ke `formattedStr`
- Kalau bukan (spasi, koma, dll), skip saja
- Kembalikan string yang sudah bersih

---

### Helper 3 — `reverseString(str)`

Fungsi ini membalik string menggunakan **for loop mundur** (kebalikan dari loop biasa):

```js
function reverseString(str) {
  let reversed = '';
  for (let i = str.length - 1; i >= 0; i--) {
    reversed += str[i];
  }
  return reversed;
}
```

💡 **Apa yang terjadi di sini?**
- Mulai dari index terakhir (`str.length - 1`) sampai index `0`
- `i--` → decrement, jadi loop berjalan mundur
- Setiap karakter ditambahkan ke string `reversed`
- Hasilnya adalah string yang terbalik

---

### Fungsi Utama `isPalindrome`

Sekarang kita gabungkan semua helper:

```js
function isPalindrome(str) {
  const formattedStr = removeNonAlphanumeric(str.toLowerCase());
  const reversedStr = reverseString(formattedStr);
  return formattedStr === reversedStr;
}
```

💡 **Apa yang terjadi di sini?**
- `str.toLowerCase()` dulu baru masuk ke `removeNonAlphanumeric` — karena fungsi itu hanya cek huruf kecil
- Hasil bersihannya dibalik pakai `reverseString`
- Lalu bandingkan keduanya — kalau sama, palindrome!

---

### Kode Lengkap Solusi 2

```js
function isPalindrome(str) {
  const formattedStr = removeNonAlphanumeric(str.toLowerCase());
  const reversedStr = reverseString(formattedStr);
  return formattedStr === reversedStr;
}

function removeNonAlphanumeric(str) {
  let formattedStr = '';
  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    if (isAlphaNumeric(char)) {
      formattedStr += char;
    }
  }
  return formattedStr;
}

function isAlphaNumeric(char) {
  const code = char.charCodeAt(0);
  return (
    (code >= 48 && code <= 57) ||  // Angka 0-9
    (code >= 97 && code <= 122)    // Huruf kecil a-z
  );
}

function reverseString(str) {
  let reversed = '';
  for (let i = str.length - 1; i >= 0; i--) {
    reversed += str[i];
  }
  return reversed;
}

module.exports = isPalindrome;
```

---

<a name="solusi-3-two-pointer"></a>
## ⚡ Solusi 3: Two-Pointer

> ⚠️ Bagian ini tidak dijelaskan di video, coba eksplorasi sendiri!

Solusi ini menggunakan pendekatan **two-pointer** — alih-alih membalik string dulu, kita langsung bandingkan karakter dari **dua ujung sekaligus** bergerak ke tengah.

### 🧠 Visualisasi

Untuk string `"racecar"`:

```
r  a  c  e  c  a  r
↑                 ↑   → sama? lanjut
   ↑           ↑      → sama? lanjut
      ↑     ↑         → sama? lanjut
         ↑            → tengah, selesai ✅
```

Kalau ada satu pasang yang tidak cocok, langsung berhenti — tidak perlu cek sisanya.

### Langkah 1 — Normalisasi String

Sama seperti solusi sebelumnya, ubah jadi lowercase dan hapus karakter non-alphanumeric:

```js
function isPalindrome(str) {
  const normalizedStr = str.toLowerCase().replace(/[^a-z0-9]/g, '');
}
```

💡 **Apa yang terjadi di sini?**
- `str.toLowerCase()` → semua huruf jadi kecil supaya perbandingan tidak case-sensitive
- `.replace(/[^a-z0-9]/g, '')` → hapus spasi, tanda baca, dan simbol apapun
- Hasilnya disimpan di `normalizedStr` — ini string "bersih" yang siap dicek

---

### Langkah 2 — Setup Loop Setengah Jalan

Kita tidak perlu loop seluruh string — cukup sampai **tengah**:

```js
function isPalindrome(str) {
  const normalizedStr = str.toLowerCase().replace(/[^a-z0-9]/g, '');
  for (let i = 0; i < Math.floor(normalizedStr.length / 2); i++) {

  }
}
```

💡 **Apa yang terjadi di sini?**
- `normalizedStr.length / 2` → hitung setengah panjang string
- `Math.floor(...)` → bulatkan ke bawah kalau panjangnya ganjil (misal `"racecar"` panjang 7 → `Math.floor(3.5)` = `3`)
- Karakter di posisi tengah tidak punya pasangan, jadi tidak perlu dicek

---

### Langkah 3 — Ambil Karakter Kiri dan Kanan

Di dalam loop, ambil karakter dari dua ujung sekaligus:

```js
function isPalindrome(str) {
  const normalizedStr = str.toLowerCase().replace(/[^a-z0-9]/g, '');
  for (let i = 0; i < Math.floor(normalizedStr.length / 2); i++) {
    const leftChar = normalizedStr[i];
    const rightChar = normalizedStr[normalizedStr.length - 1 - i];
  }
}
```

💡 **Apa yang terjadi di sini?**
- `leftChar = normalizedStr[i]` → pointer kiri, mulai dari index `0` dan bergerak ke kanan setiap iterasi
- `rightChar = normalizedStr[normalizedStr.length - 1 - i]` → pointer kanan, mulai dari index terakhir dan bergerak ke kiri setiap iterasi
- Contoh untuk `"racecar"` (panjang 7):

| `i` | `leftChar` | index kanan (`7-1-i`) | `rightChar` |
|---|---|---|---|
| 0 | `r` | 6 | `r` |
| 1 | `a` | 5 | `a` |
| 2 | `c` | 4 | `c` |

---

### Langkah 4 — Early Exit & Return

Kalau ada pasangan yang tidak cocok, langsung berhenti. Kalau semua lolos, return `true`:

```js
function isPalindrome(str) {
  const normalizedStr = str.toLowerCase().replace(/[^a-z0-9]/g, '');
  for (let i = 0; i < Math.floor(normalizedStr.length / 2); i++) {
    const leftChar = normalizedStr[i];
    const rightChar = normalizedStr[normalizedStr.length - 1 - i];
    if (leftChar !== rightChar) return false;
  }
  return true;
}
```

💡 **Apa yang terjadi di sini?**
- `if (leftChar !== rightChar) return false` → begitu ketemu pasangan yang berbeda, **langsung stop** tanpa cek sisa karakter (inilah yang disebut *early exit*)
- `return true` di luar loop → kalau semua pasangan berhasil dilewati tanpa ada yang berbeda, string pasti palindrome

---

<a name="testing"></a>
## 🧪 Testing

Jalankan test dengan perintah berikut di terminal:

```bash
npm test
```

Test cases yang digunakan:

```js
test('Checking for palindrome strings', () => {
  expect(isPalindrome('racecar')).toBe(true);
  expect(isPalindrome('Hello')).toBe(false);
  expect(isPalindrome('A man, a plan, a canal, Panama')).toBe(true);
  expect(isPalindrome('12321')).toBe(true);
});
```

Kalau semua ✅ pass, berarti solusimu benar!

---

## 🏁 Kesimpulan

| | Solusi 1 (Regex) | Solusi 2 (Manual) | Solusi 3 (Two-Pointer) |
|---|---|---|---|
| **Panjang kode** | ~3 baris | ~20+ baris | ~7 baris |
| **Kemudahan baca** | Singkat tapi perlu paham regex | Verbose tapi mudah dipahami | Cukup singkat dan logis |
| **Efisiensi** | Loop `n` karakter | Loop `n` karakter | Loop `n/2` karakter + early exit |
| **Cocok untuk** | Production / kode ringkas | Belajar logika dasar | Interview / performa optimal |

Ketiga solusi menghasilkan output yang sama dan lulus semua test! 🎉