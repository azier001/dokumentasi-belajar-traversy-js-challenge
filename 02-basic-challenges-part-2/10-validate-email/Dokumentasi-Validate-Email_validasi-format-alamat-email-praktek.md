# 📧 Challenge: Validate Email — Catatan Belajar JavaScript

> 🎥 Dokumentasi ini dibuat berdasarkan video tutorial JavaScript tentang membuat fungsi `validateEmail`.

---

## 📑 Daftar Isi

- 🎯 [Pengenalan Challenge](#pengenalan)
- 🔍 [Solusi 1 — Pakai Regular Expression](#solusi-regex)
- 🛠️ [Solusi 2 — Tanpa Regular Expression](#solusi-manual)
  - 🔎 [Langkah 1: Cek Simbol `@`](#langkah-1)
  - ✂️ [Langkah 2: Pisah Email dengan `.split()`](#langkah-2)
  - 📐 [Langkah 3: Destrukturisasi Array](#langkah-3)
  - ✅ [Langkah 4: Cek Panjang Local Part & Domain](#langkah-4)
  - 🌐 [Langkah 5: Cek Ekstensi Domain](#langkah-5)
  - 🏁 [Kode Lengkap Solusi 2](#kode-lengkap)
- 🧪 [Menjalankan Test](#test)

---

<a name="pengenalan"></a>
## 🎯 Pengenalan Challenge

Tugasnya sederhana: buat sebuah fungsi bernama `validateEmail` yang menerima sebuah string dan mengembalikan **`true`** kalau string itu adalah email yang valid, atau **`false`** kalau tidak valid.

Untuk challenge ini, email dianggap valid kalau mengandung **simbol `@`** dan **titik `.`**.

```js
validateEmail('john@gmail.com');  // ✅ true
validateEmail('john@gmail');      // ❌ false
```

Ada dua cara untuk menyelesaikannya — pakai **regular expression** (regex) atau **tanpa regex**. Keduanya akan dibahas di sini!

---

<a name="solusi-regex"></a>
## 🔍 Solusi 1 — Pakai Regular Expression

Regular expression (regex) adalah cara singkat dan powerful untuk mencocokkan pola teks. Cocok banget untuk validasi format seperti email ini.

Karena regex itu agak susah dihafal, kamu bisa tanya ke ChatGPT atau cari di Stack Overflow — tidak perlu hafal semua sintaksnya!

### Langkah 1: Buat fungsi dan simpan regex-nya

```js
function validateEmail(email) {
  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
}
```

### Langkah 2: Gunakan method `.test()` untuk mengecek

```js
function validateEmail(email) {
  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  return emailRegex.test(email);
}
```

💡 **Apa yang terjadi di sini?**

| Bagian Kode | Penjelasan |
|---|---|
| `const emailRegex = /.../ ` | Menyimpan pola regex di antara dua tanda `/` |
| `emailRegex.test(email)` | Mengecek apakah `email` cocok dengan pola regex — mengembalikan `true` atau `false` |

> 🔎 **Bedah regex-nya (bonus!):**
> - `^` → mulai dari awal string
> - `[A-Za-z0-9._%+-]+` → bagian sebelum `@` (huruf, angka, titik, dll)
> - `@` → harus ada simbol `@`
> - `[A-Za-z0-9.-]+` → nama domain (misal: `gmail`)
> - `\.` → titik yang di-*escape* (karena `.` punya arti khusus di regex)
> - `[A-Za-z]{2,}` → ekstensi domain minimal 2 huruf (misal: `com`, `io`)
> - `$` → sampai akhir string

---

<a name="solusi-manual"></a>
## 🛠️ Solusi 2 — Tanpa Regular Expression

Tidak mau pakai regex? Tenang, bisa kok! Kita cek satu per satu secara manual. Cara ini lebih panjang, tapi lebih mudah dibaca.

---

<a name="langkah-1"></a>
### 🔎 Langkah 1: Cek Simbol `@`

Pertama, kita cek dulu apakah email mengandung `@`. Kalau tidak ada, langsung kembalikan `false`.

```js
function validateEmail(email) {
  if (email.indexOf('@') === -1) {
    return false;
  }
}
```

💡 **Apa yang terjadi di sini?**

| Bagian Kode | Penjelasan |
|---|---|
| `email.indexOf('@')` | Mencari posisi karakter `@` dalam string |
| `=== -1` | Kalau hasilnya `-1`, berarti `@` **tidak ditemukan** di dalam string |
| `return false` | Langsung hentikan fungsi dan kembalikan `false` |

---

<a name="langkah-2"></a>
### ✂️ Langkah 2: Pisah Email dengan `.split()`

Sekarang kita pisah email menjadi dua bagian: **local part** (misal: `brad`) dan **domain** (misal: `gmail.com`).

```js
function validateEmail(email) {
  if (email.indexOf('@') === -1) {
    return false;
  }

  // Coba return dulu untuk lihat hasilnya
  return email.split('@');
}
```

Kalau kamu jalankan dengan `'brad@gmail.com'`, hasilnya adalah array:

```
[ 'brad', 'gmail.com' ]
```

💡 **Apa yang terjadi di sini?**

| Bagian Kode | Penjelasan |
|---|---|
| `email.split('@')` | Memecah string menjadi array berdasarkan karakter `@` |
| Hasil index `[0]` | Bagian sebelum `@` → `'brad'` |
| Hasil index `[1]` | Bagian setelah `@` → `'gmail.com'` |

---

<a name="langkah-3"></a>
### 📐 Langkah 3: Destrukturisasi Array

Daripada pakai index `[0]` dan `[1]`, kita bisa pakai **array destructuring** agar kodenya lebih bersih dan mudah dibaca.

```js
function validateEmail(email) {
  if (email.indexOf('@') === -1) {
    return false;
  }

  const [localPart, domain] = email.split('@');
}
```

💡 **Apa yang terjadi di sini?**

| Bagian Kode | Penjelasan |
|---|---|
| `const [localPart, domain]` | Destrukturisasi array — `localPart` dapat nilai index ke-0, `domain` dapat index ke-1 |
| `localPart` | Menyimpan `'brad'` |
| `domain` | Menyimpan `'gmail.com'` |

---

<a name="langkah-4"></a>
### ✅ Langkah 4: Cek Panjang Local Part & Domain

Sekarang kita tambahkan pengecekan: local part tidak boleh kosong, dan domain harus minimal 3 karakter (misal: `a.b` sudah 3 karakter).

```js
function validateEmail(email) {
  if (email.indexOf('@') === -1) {
    return false;
  }

  const [localPart, domain] = email.split('@');

  if (localPart.length === 0 || domain.length < 3) {
    return false;
  }
}
```

💡 **Apa yang terjadi di sini?**

| Bagian Kode | Penjelasan |
|---|---|
| `localPart.length === 0` | Kalau tidak ada nama sebelum `@` (misal: `@gmail.com`), kembalikan `false` |
| `domain.length < 3` | Domain `gmail.com` punya 9 karakter — jauh di atas 3. Ini menangkap domain yang terlalu pendek |
| `\|\|` | Operator "atau" — salah satu kondisi saja sudah cukup untuk `return false` |

---

<a name="langkah-5"></a>
### 🌐 Langkah 5: Cek Ekstensi Domain

Terakhir, kita pecah domain (misal: `gmail.com`) lagi menggunakan `.split('.')` untuk memastikan ada ekstensi yang valid (`.com`, `.io`, `.net`, dll).

```js
function validateEmail(email) {
  if (email.indexOf('@') === -1) {
    return false;
  }

  const [localPart, domain] = email.split('@');

  if (localPart.length === 0 || domain.length < 3) {
    return false;
  }

  const domainExtension = domain.split('.');

  if (domainExtension.length < 2 || domainExtension[1].length < 2) {
    return false;
  }
}
```

Kalau kamu coba `return domain.split('.')` dengan `'gmail.com'`, hasilnya:

```
[ 'gmail', 'com' ]
```

💡 **Apa yang terjadi di sini?**

| Bagian Kode | Penjelasan |
|---|---|
| `domain.split('.')` | Memecah domain berdasarkan titik `.` |
| `domainExtension[0]` | Nama domain → `'gmail'` |
| `domainExtension[1]` | Ekstensi → `'com'` |
| `domainExtension.length < 2` | Kalau tidak ada titik sama sekali (misal: `userdomain`), kembalikan `false` |
| `domainExtension[1].length < 2` | Ekstensi minimal 2 karakter — menangkap `.c` yang tidak valid. `io`, `me`, `it` sudah valid (2 karakter) |

---

<a name="kode-lengkap"></a>
### 🏁 Kode Lengkap Solusi 2

Kalau semua pengecekan di atas **tidak ada yang mengembalikan `false`**, berarti email valid! Kita tambahkan `return true` di akhir.

```js
function validateEmail(email) {
  // Cek 1: Harus ada simbol @
  if (email.indexOf('@') === -1) {
    return false;
  }

  // Cek 2: Pisah jadi local part dan domain
  const [localPart, domain] = email.split('@');

  // Cek 3: Local part tidak boleh kosong, domain minimal 3 karakter
  if (localPart.length === 0 || domain.length < 3) {
    return false;
  }

  // Cek 4: Domain harus punya ekstensi minimal 2 karakter
  const domainExtension = domain.split('.');
  if (domainExtension.length < 2 || domainExtension[1].length < 2) {
    return false;
  }

  // Semua pengecekan lolos → email valid!
  return true;
}

module.exports = validateEmail;
```

---

<a name="test"></a>
## 🧪 Menjalankan Test

Kamu bisa coba hasil kedua fungsi dengan file runner berikut:

```js
// validate-email-run.js
const validateEmail = require('./validate-email');

const result1 = validateEmail('brad@gmail.com');
const result2 = validateEmail('bradgmailcom');

console.log(result1); // true
console.log(result2); // false
```

Dan test case resminya menggunakan Jest:

```js
// validate-email.test.js
test('Valid Email Addresses', () => {
  expect(validateEmail('john@example.com')).toBe(true);
  expect(validateEmail('jane.doe@domain.org')).toBe(true);
});

test('Invalid Email Addresses', () => {
  expect(validateEmail('invalid-email')).toBe(false);
  expect(validateEmail('@domain.com')).toBe(false);
  expect(validateEmail('user@domain')).toBe(false);
});
```

> ⚠️ **Bagian ini tidak dijelaskan di video, coba eksplorasi sendiri!**
> Untuk menjalankan test Jest, pastikan kamu sudah install Jest di project-mu dan jalankan perintah `npx jest` di terminal.

---

> 💪 **Rangkuman:** Dua cara valid untuk memvalidasi email — regex lebih **singkat dan kuat**, sementara cara manual lebih **mudah dipahami langkah demi langkahnya**. Pilih sesuai kebutuhanmu!