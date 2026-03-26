# 🔐 Tantangan: Validasi Password

> **Tulis sebuah fungsi** yang memvalidasi kekuatan password berdasarkan sejumlah kriteria keamanan — kembalikan `true` jika valid, `false` jika tidak.

---

## 📋 Instruksi

Tulis sebuah fungsi bernama `validatePassword` yang menerima sebuah string dan memvalidasinya berdasarkan kriteria berikut:

1. Password **harus memiliki panjang minimal 8 karakter**.
2. Password **harus mengandung setidaknya satu huruf kapital (uppercase)**.
3. Password **harus mengandung setidaknya satu huruf kecil (lowercase)**.
4. Password **harus mengandung setidaknya satu angka (digit)**.

Fungsi ini harus mengembalikan `true` jika password **valid** sesuai kriteria, dan `false` jika sebaliknya.

---

### ✍️ Tanda Tangan Fungsi

```js
/**
 * Memvalidasi password berdasarkan kriteria tertentu.
 * @param {string} password - Password yang akan divalidasi.
 * @returns {boolean} - True jika password valid, false jika tidak.
 */
function validatePassword(password: string): boolean;
```

---

### 💡 Contoh Penggunaan

```js
validatePassword('Abc12345');   // harus mengembalikan true
validatePassword('password123'); // harus mengembalikan false (tidak ada huruf kapital)
validatePassword('Pass');        // harus mengembalikan false (panjang kurang dari 8 karakter)
validatePassword('HelloWorld');  // harus mengembalikan false (tidak ada angka)
```

---

### ⚠️ Batasan

- Input password dapat berisi **kombinasi huruf dan angka** apa pun.
- Input password dapat mengandung **huruf kapital maupun huruf kecil**.

---

### 🧩 Petunjuk

- Kamu dapat menggunakan fungsi `split` untuk mengubah string menjadi array karakter, lalu gunakan fungsi `some` untuk memeriksa apakah **setidaknya satu karakter** memenuhi kondisi tertentu.

---

## ✅ Solusi

<details>
  <summary>Klik untuk Melihat Solusi</summary>

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
```

### 🔍 Penjelasan

- Buat variabel bernama `isLengthValid` dan beri nilai `true` jika password **memiliki panjang minimal 8 karakter**, atau `false` jika tidak.
- Buat variabel bernama `hasUppercase` dan beri nilai `true` jika password **mengandung setidaknya satu huruf kapital**, atau `false` jika tidak.
- Buat variabel bernama `hasLowercase` dan beri nilai `true` jika password **mengandung setidaknya satu huruf kecil**, atau `false` jika tidak.
- Buat variabel bernama `hasDigit` dan beri nilai `true` jika password **mengandung setidaknya satu angka**, atau `false` jika tidak.
- Kembalikan hasil dari ekspresi `isLengthValid && hasUppercase && hasLowercase && hasDigit`.

Fungsi `some` digunakan untuk memeriksa apakah **setidaknya satu karakter** dalam password memenuhi kondisi tertentu. Fungsi `some` menerima sebuah *callback function* sebagai argumen. *Callback function* tersebut dipanggil untuk setiap karakter dalam password. Jika *callback function* mengembalikan `true` untuk **setidaknya satu karakter**, maka fungsi `some` mengembalikan `true`. Jika tidak, fungsi `some` mengembalikan `false`.

</details>

---

## 🔄 Solusi Alternatif

### Versi 1 — Early Return

```js
function validatePassword(password) {
  if (password.length < 8) return false;

  if (!/[A-Z]/.test(password)) return false;
  if (!/[a-z]/.test(password)) return false;
  if (!/\d/.test(password)) return false;

  return true;
}
```

Memeriksa setiap kondisi satu per satu dan **langsung mengembalikan `false`** begitu ada kondisi yang tidak terpenuhi, tanpa memeriksa kondisi berikutnya.

---

### Versi 2 — Named Variables

```js
const validatePassword = (password) => {
  if (password.length < 8) return false;

  const hasLowerCase = /[a-z]/.test(password);
  const hasUpperCase = /[A-Z]/.test(password);
  const hasDigit = /\d/.test(password);

  return hasLowerCase && hasUpperCase && hasDigit;
};
```

Hasil setiap pengecekan regex disimpan ke **variabel bernama deskriptif**, lalu dikembalikan sekaligus di akhir dengan operator `&&`.

---

### Versi 3 — Single Regex

```js
const validatePassword = (password) => {
  const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/;

  return regex.test(password);
};
```

Semua validasi digabung dalam **satu regex** menggunakan *lookahead* (`(?=...)`), sehingga kode menjadi sangat ringkas. Menggunakan `.{8,}` agar password dengan karakter spesial seperti `Hello@123` tetap dianggap valid.

---

### 🧪 Test Cases

```js
test('Password Validation', () => {
  expect(validatePassword('Abc12345')).toBe(true);
  expect(validatePassword('password123')).toBe(false);
  expect(validatePassword('Pass')).toBe(false);
  expect(validatePassword('HelloWorld')).toBe(false);
});
```