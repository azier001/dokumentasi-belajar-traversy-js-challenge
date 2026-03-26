# 🔐 Password Validator — Catatan Belajar JavaScript

> 📝 **Catatan pribadi** dari video tutorial: membuat fungsi validasi password dengan JavaScript menggunakan metode array `some`.

---

## 📚 Daftar Isi

- 🎯 [Pengenalan](#pengenalan)
- 📋 [Kriteria Validasi](#kriteria-validasi)
- 🏗️ [Struktur Kode](#struktur-kode)
- 🔍 [Cek Panjang Password](#cek-panjang-password)
- 🔠 [Cek Huruf Kapital](#cek-huruf-kapital)
- 🔡 [Cek Huruf Kecil](#cek-huruf-kecil)
- 🔢 [Cek Angka (Digit)](#cek-angka-digit)
- ✅ [Return Hasil Akhir](#return-hasil-akhir)
- 🧪 [Test Cases](#test-cases)
- 💡 [Rangkuman & Tips](#rangkuman--tips)
- 🔄 [Versi Alternatif](#versi-alternatif)

---

<a name="pengenalan"></a>
## 🎯 Pengenalan

Di challenge ini, kita membuat fungsi bernama `validatePassword` yang menerima satu argumen berupa **string password**, lalu mengecek apakah password tersebut memenuhi syarat keamanan tertentu.

Fungsinya akan mengembalikan:
- `true` → kalau password **valid**
- `false` → kalau password **tidak memenuhi syarat**

---

<a name="kriteria-validasi"></a>
## 📋 Kriteria Validasi

Password dianggap valid kalau **semua syarat di bawah ini terpenuhi**:

| # | Syarat | Contoh |
|---|--------|--------|
| 1 | Minimal **8 karakter** | `Abc12345` ✅ |
| 2 | Ada minimal **1 huruf kapital** | `A` |
| 3 | Ada minimal **1 huruf kecil** | `a` |
| 4 | Ada minimal **1 angka** | `1` |

**Contoh nyata:**

```js
validatePassword('Abc12345');    // ✅ true  — semua syarat terpenuhi
validatePassword('password123'); // ❌ false — tidak ada huruf kapital
validatePassword('Pass');        // ❌ false — kurang dari 8 karakter
validatePassword('HelloWorld');  // ❌ false — tidak ada angka
```

---

<a name="struktur-kode"></a>
## 🏗️ Struktur Kode

Pendekatan yang dipakai adalah **memecah setiap pengecekan ke variabel terpisah**, supaya kodenya rapi dan mudah dikembangkan ke depannya.

```js
function validatePassword(password) {
  const isLengthValid = // ... cek panjang
  const hasUppercase  = // ... cek huruf kapital
  const hasLowercase  = // ... cek huruf kecil
  const hasDigit      = // ... cek angka

  return isLengthValid && hasUppercase && hasLowercase && hasDigit;
}
```

> 💬 **Kenapa dipisah?** Supaya kalau nanti mau tambah syarat baru (misal: harus ada karakter spesial), tinggal tambah variabel baru dan sambungkan dengan `&&` di bagian `return`.

---

<a name="cek-panjang-password"></a>
## 🔍 Cek Panjang Password

Yang paling simpel: tinggal cek properti `.length` dari string.

```js
const isLengthValid = password.length >= 8;
```

Kalau panjangnya **8 atau lebih**, nilainya `true`. Kalau kurang, `false`.

---

<a name="cek-huruf-kapital"></a>
## 🔠 Cek Huruf Kapital

Di sinilah metode `.some()` mulai dipakai. Idenya:

1. **Pecah string** menjadi array karakter dengan `.split('')`
2. **Cek setiap karakter** menggunakan `.some()`

```js
const hasUppercase = password
  .split('')
  .some((char) => char === char.toUpperCase() && char !== char.toLowerCase());
```

**Cara bacanya:**
- `.split('')` → ubah `"Abc12345"` jadi `['A', 'b', 'c', '1', '2', '3', '4', '5']`
- `.some(...)` → kembalikan `true` kalau **minimal satu** elemen memenuhi kondisi
- Kondisinya: karakter itu sama dengan versi uppercase-nya **DAN** berbeda dari versi lowercase-nya

> 🤔 **Kenapa perlu dua kondisi?** Karena angka seperti `'1'` kalau di-`toUpperCase()` tetap `'1'` dan di-`toLowerCase()` juga tetap `'1'`. Kalau cuma cek `char === char.toUpperCase()`, angka akan terhitung sebagai "uppercase" — padahal bukan. Dengan menambahkan `&& char !== char.toLowerCase()`, kita pastikan yang lolos hanya **huruf kapital beneran**.

---

<a name="cek-huruf-kecil"></a>
## 🔡 Cek Huruf Kecil

Logikanya sama persis dengan cek huruf kapital, tapi dibalik:

```js
const hasLowercase = password
  .split('')
  .some((char) => char === char.toLowerCase() && char !== char.toUpperCase());
```

- Kondisi pertama: karakter sama dengan versi lowercase → berarti dia huruf kecil atau angka
- Kondisi kedua: karakter **berbeda** dari versi uppercase → menyaring agar angka tidak ikut terhitung

---

<a name="cek-angka-digit"></a>
## 🔢 Cek Angka (Digit)

Untuk mengecek apakah sebuah karakter adalah angka, kita pakai kombinasi `isNaN()` dan `parseInt()`:

```js
const hasDigit = password
  .split('')
  .some((char) => !isNaN(parseInt(char, 10)));
```

**Penjelasan langkah demi langkah:**

| Ekspresi | Arti |
|----------|------|
| `parseInt(char, 10)` | Coba ubah karakter ke bilangan bulat basis 10 |
| `isNaN(...)` | Cek apakah hasilnya **bukan angka** (is Not a Number) |
| `!isNaN(...)` | Dibalik → `true` kalau hasilnya **adalah angka** |

Contoh:
- `parseInt('5', 10)` → `5` → `isNaN(5)` → `false` → `!false` → **`true`** ✅
- `parseInt('a', 10)` → `NaN` → `isNaN(NaN)` → `true` → `!true` → **`false`** ❌

---

<a name="return-hasil-akhir"></a>
## ✅ Return Hasil Akhir

Setelah semua variabel pengecekan siap, tinggal gabungkan dengan operator `&&`:

```js
return isLengthValid && hasUppercase && hasLowercase && hasDigit;
```

> Operator `&&` artinya **"dan"**. Kalau **salah satu saja** bernilai `false`, maka keseluruhan ekspresi langsung `false`. Password baru dianggap valid kalau **semua** kondisi bernilai `true`.

---

<a name="test-cases"></a>
## 🧪 Test Cases

```js
test('Password Validation', () => {
  expect(validatePassword('Abc12345')).toBe(true);    // ✅ Semua syarat terpenuhi
  expect(validatePassword('password123')).toBe(false); // ❌ Tidak ada huruf kapital
  expect(validatePassword('Pass')).toBe(false);        // ❌ Kurang dari 8 karakter
  expect(validatePassword('HelloWorld')).toBe(false);  // ❌ Tidak ada angka
});
```

Semua test **pass** ✅

---

<a name="rangkuman--tips"></a>
## 💡 Rangkuman & Tips

**Konsep kunci yang dipakai di challenge ini:**

- **`.split('')`** → mengubah string menjadi array karakter
- **`.some(callback)`** → mengembalikan `true` jika minimal satu elemen memenuhi kondisi di callback
- **`toUpperCase()` / `toLowerCase()`** → cara cerdas untuk mendeteksi jenis karakter tanpa regex
- **`parseInt()` + `isNaN()`** → cara untuk mengecek apakah sebuah karakter adalah angka

**Kode lengkap:**

```js
function validatePassword(password) {
  const isLengthValid = password.length >= 8;

  const hasUppercase = password
    .split('')
    .some((char) => char === char.toUpperCase() && char !== char.toLowerCase());

  const hasLowercase = password
    .split('')
    .some((char) => char === char.toLowerCase() && char !== char.toUpperCase());

  const hasDigit = password
    .split('')
    .some((char) => !isNaN(parseInt(char, 10)));

  return isLengthValid && hasUppercase && hasLowercase && hasDigit;
}

module.exports = validatePassword;
```

> 🚀 **Mudah dikembangkan!** Kalau nanti mau tambah syarat baru — misalnya password harus mengandung karakter spesial seperti `!@#$` — tinggal tambah variabel `hasSpecialChar` dan sambungkan di bagian `return`. Strukturnya sudah siap untuk itu.

---

<a name="versi-alternatif"></a>
## 🔄 Versi Alternatif

Selain versi dari tutorial, ada beberapa cara lain yang umum dipakai untuk menyelesaikan problem yang sama. Masing-masing punya gaya dan pendekatan berbeda.

---

### 2️⃣ Early Return

```js
function validatePassword(password) {
  if (password.length < 8) return false;

  if (!/[A-Z]/.test(password)) return false;
  if (!/[a-z]/.test(password)) return false;
  if (!/\d/.test(password)) return false;

  return true;
}
```

Prinsipnya: **"kalau gagal, langsung keluar"**. Begitu satu syarat tidak terpenuhi, fungsi langsung `return false` tanpa mengecek sisanya. Pakai regex (`/[A-Z]/`, `/[a-z]/`, `/\d/`) untuk mengecek karakter.

> 💬 Kode ini pendek dan mudah dibaca — cocok untuk dipakai sehari-hari.

---

### 3️⃣ Named Variables

```js
const validatePassword = (password) => {
  if (password.length < 8) return false;

  const hasLowerCase = /[a-z]/.test(password);
  const hasUpperCase = /[A-Z]/.test(password);
  const hasDigit = /\d/.test(password);

  return hasLowerCase && hasUpperCase && hasDigit;
};
```

Gabungan dari dua pendekatan: early return untuk cek panjang, lalu named variables + regex untuk sisanya. Nama variabelnya eksplisit sehingga kode mudah dipahami sekilas.

> 💬 Versi paling seimbang — tidak terlalu panjang, tapi tetap mudah dibaca.

---

### 4️⃣ Single Regex

```js
const validatePassword = (password) => {
  const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/;

  return regex.test(password);
};
```

Semua pengecekan digabung dalam **satu regex**. Pakai fitur bernama **lookahead** (`(?=...)`) untuk mengecek beberapa kondisi sekaligus. Karakter apapun diizinkan (termasuk simbol seperti `!@#$`).

> 💬 Paling ringkas, tapi butuh pemahaman regex yang lebih dalam. Penjelasan detail tentang lookahead akan dibahas di dokumentasi terpisah.

---

### 5️⃣ Single Regex (Karakter Dibatasi)

```js
const validatePassword = (password) => {
  const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[a-zA-Z\d]{8,}$/;

  return regex.test(password);
};
```

Hampir sama dengan versi 4, bedanya di bagian `.{8,}` diganti dengan `[a-zA-Z\d]{8,}` — artinya **hanya huruf dan angka yang diizinkan**, karakter spesial seperti `!@#$` akan ditolak.

> ⚠️ Ini bukan sekadar gaya penulisan berbeda — fungsinya memang berbeda! Pilih versi ini kalau sistem memang sengaja membatasi input hanya huruf dan angka.

---

### 📊 Perbandingan Semua Versi

| # | Versi | Panjang Kode | Keterbacaan | Catatan |
|---|-------|-------------|-------------|---------|
| 1 | Tutorial (split + some) | Panjang | Lumayan | Bagus untuk belajar array methods |
| 2 | Early Return | Pendek | Mudah | Praktis untuk sehari-hari |
| 3 | Named Variables | Sedang | Paling mudah | Paling seimbang |
| 4 | Single Regex | Paling pendek | Butuh paham regex | Karakter bebas |
| 5 | Single Regex (restricted) | Paling pendek | Butuh paham regex | Karakter dibatasi huruf & angka |