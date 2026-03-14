# 📧 Challenge: Validate Email

> **Tantangan pemrograman** ini menguji kemampuanmu dalam memvalidasi format alamat email menggunakan JavaScript — tersedia dua solusi: dengan dan tanpa regular expression.

---

## 📋 Instruksi

Tulis sebuah fungsi bernama `validateEmail` yang menerima sebuah string dan mengembalikan apakah string tersebut merupakan alamat email yang valid. Untuk keperluan tantangan ini, sebuah alamat email dianggap **valid** jika mengandung simbol `@` dan simbol `.`.

---

## ✍️ Function Signature

```js
/**
 * Mengembalikan apakah string merupakan alamat email yang valid.
 * @param {string} email - Alamat email yang akan divalidasi.
 * @returns {boolean} - Apakah alamat email tersebut valid.
 */
function validateEmail(email: string): boolean;
```

---

## 💡 Contoh Penggunaan

```js
validateEmail('john@gmail.com'); // true
validateEmail('john@gmail');     // false
```

---

## 🔍 Petunjuk

- Jika kamu sudah familiar dengan **regular expressions**, ini adalah tempat yang tepat untuk menggunakannya. Akan diberikan dua solusi: satu menggunakan regular expression, dan satu lagi tanpa regular expression.

---

## ✅ Solusi

<details>
  <summary>👆 Klik untuk Solusi 1 — Menggunakan Regular Expression</summary>

Menggunakan regular expression:

```js
function validateEmail(email) {
  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  return emailRegex.test(email);
}
```

### 🧩 Penjelasan

Regular expression di atas cukup kompleks, namun ini adalah contoh yang baik tentang betapa **kuatnya regular expressions**. Mari kita uraikan bagian per bagian:

- `^` — memastikan pencarian dimulai dari **awal string**.
- `[A-Za-z0-9._%+-]+` — mencocokkan satu atau lebih karakter berupa huruf (besar/kecil), angka, titik, underscore, tanda persen, tanda plus, dan tanda hubung. Ini merepresentasikan **bagian lokal** dari alamat email (sebelum simbol `@`).
- `@` — mencocokkan simbol `@`.
- `[A-Za-z0-9.-]+` — mencocokkan satu atau lebih huruf, angka, titik, dan tanda hubung. Ini merepresentasikan **nama domain** dari alamat email.
- `\.` — mencocokkan karakter titik `"."`. Perlu di-escape dengan backslash karena titik memiliki makna khusus dalam regular expressions.
- `[A-Za-z]{2,}` — mencocokkan dua atau lebih huruf. Ini merepresentasikan **top-level domain (TLD)** dari alamat email.
- `$` — memastikan pencarian berakhir di **akhir string**.

</details>

<details>
  <summary>👆 Klik untuk Solusi 2 — Tanpa Regular Expression</summary>

Tanpa menggunakan regular expression:

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
  if (
    domainExtension.length < 2 ||
    domainExtension[domainExtension.length - 1].length < 2
  ) {
    return false;
  }

  return true;
}
```

### 🧩 Penjelasan

Solusi ini sedikit lebih panjang, namun **tidak menggunakan regular expressions** sama sekali.

- Gunakan method `indexOf` untuk memeriksa apakah alamat email mengandung simbol `@`. Jika tidak ditemukan, kembalikan `false`.
- Gunakan method `split` untuk memisahkan alamat email menjadi dua bagian: **bagian lokal** dan **domain**. Gunakan destructuring untuk menetapkan keduanya ke variabel.
- Periksa apakah bagian lokal kosong atau apakah domain kurang dari tiga karakter. Jika salah satu kondisi ini terpenuhi, kembalikan `false`.
- Pisahkan domain menggunakan method `split`. Periksa apakah domain memiliki setidaknya dua bagian dan apakah bagian terakhirnya minimal dua karakter panjangnya.
- Jika salah satu kondisi tersebut tidak terpenuhi, kembalikan `false`.

Terakhir, jika **semua kondisi lolos**, kembalikan `true`.

</details>

---

## 🧪 Test Cases

```js
test('Alamat Email Valid', () => {
  expect(validateEmail('john@example.com')).toBe(true);
  expect(validateEmail('jane.doe@domain.org')).toBe(true);
});

test('Alamat Email Tidak Valid', () => {
  expect(validateEmail('invalid-email')).toBe(false);
  expect(validateEmail('@domain.com')).toBe(false);
  expect(validateEmail('user@domain')).toBe(false);
});
```