# 🧩 Tantangan: Validasi Alamat IPv4

> **Dokumentasi ini menjelaskan cara membuat fungsi untuk memvalidasi alamat IPv4 dalam format dot-decimal menggunakan JavaScript/TypeScript.**

---

## 📋 Instruksi

Buatlah sebuah fungsi bernama `isValidIPv4` yang menerima sebuah string sebagai input dan mengembalikan `true` jika input tersebut merupakan alamat IPv4 yang valid dalam format dot-decimal, dan `false` jika sebaliknya. Sebuah alamat IPv4 harus terdiri dari **empat oktet**, dengan nilai antara **0 hingga 255**, inklusif.

---

## ✍️ Function Signature

```js
/**
 * Memeriksa apakah string yang diberikan adalah alamat IPv4 yang valid.
 * @param {string} input - String input yang akan diperiksa.
 * @returns {boolean} - True jika input adalah alamat IPv4 yang valid, false jika sebaliknya.
 */
function isValidIPv4(input: string): boolean;
```

---

## 💡 Contoh Penggunaan

```js
isValidIPv4('1.2.3.4');           // true
isValidIPv4('123.45.67.89');      // true
isValidIPv4('1.2.3');             // false
isValidIPv4('1.2.3.4.5');         // false
isValidIPv4('123.456.78.90');     // false
isValidIPv4('123.045.067.089');   // false
```

---

## ⚠️ Batasan

- Input akan selalu berupa **satu string tunggal**.

---

## 🔍 Petunjuk

- Kamu dapat menggunakan method `split()` untuk memecah string menjadi beberapa bagian berdasarkan karakter titik (`.`).
- Kamu dapat menggunakan `every()` untuk memeriksa apakah semua oktet berada dalam rentang valid **0 hingga 255**.

---

## ✅ Solusi

<details>
  <summary>👁️ Klik untuk Melihat Solusi</summary>

```js
function isValidIPv4(input) {
  const octets = input.split('.');
  
  if (octets.length !== 4) {
    return false;
  }

  return octets.every((octet) => {
    const num = parseInt(octet);
    return num >= 0 && num <= 255 && octet === num.toString();
  });
}
```

### 🧠 Penjelasan

- Pecah string input menjadi array of string menggunakan method `split()`.
- Periksa apakah array tersebut memiliki **tepat empat elemen**. Jika tidak, kembalikan `false`.
- Gunakan method `every()` untuk memeriksa apakah semua oktet valid:
  - Ubah oktet menjadi angka menggunakan `parseInt()`.
  - Periksa apakah angka tersebut berada di antara **0 dan 255**, inklusif.
  - Periksa apakah oktet sama dengan angka yang dikonversi kembali ke string — ini bertujuan untuk **mendeteksi leading zeros** (angka nol di depan).

</details>

---

## 🔀 Solusi Alternatif

<details>
  <summary>👁️ Klik untuk Melihat Solusi Alternatif</summary>

```js
const isValidIPv4 = (str) => {
  const formatted = str.split('.');

  if (formatted.length !== 4) return false;

  const isValid = formatted.every((number) => {
    if (number[0] === '0' && number.length > 1) return false;

    if (/^\d+$/.test(number)) {
      return Number(number) >= 0 && Number(number) <= 255;
    }

    return false;
  });

  return isValid;
};
```

### 🧠 Penjelasan

- Pecah string input menjadi array menggunakan `split('.')`, lalu simpan ke variabel `formatted`.
- Periksa apakah array memiliki **tepat empat elemen**. Jika tidak, langsung kembalikan `false`.
- Gunakan `every()` untuk memvalidasi setiap elemen:
  - Jika karakter pertama adalah `'0'` dan panjangnya lebih dari 1, kembalikan `false` — ini menangani **leading zeros** seperti `'045'`.
  - Gunakan regex `/^\d+$/` sebagai **gate** untuk memastikan oktet hanya berisi digit murni — sekaligus menolak string kosong, whitespace, desimal, dan karakter non-digit.
  - Baru setelah lolos regex, periksa apakah nilainya berada dalam rentang **0 hingga 255**.

### ✨ Keunggulan Pendekatan Ini

- **Lebih strict** dibanding `parseInt()` — regex `/^\d+$/` menolak input seperti `'1a'` atau `' 1'` yang bisa lolos `parseInt`.
- **Urutan pengecekan yang logis** — leading zero dicek lebih dulu, baru validasi digit, baru cek range.
- **Lebih readable** — setiap kondisi punya tujuan yang jelas dan terpisah.

</details>

---

## 🧪 Test Cases

```js
test('Memeriksa Alamat IPv4 yang Valid', () => {
  expect(isValidIPv4('1.2.3.4')).toBe(true);
  expect(isValidIPv4('123.45.67.89')).toBe(true);
  expect(isValidIPv4('1.2.3')).toBe(false);
  expect(isValidIPv4('1.2.3.4.5')).toBe(false);
  expect(isValidIPv4('123.456.78.90')).toBe(false);
  expect(isValidIPv4('123.045.067.089')).toBe(false);
});
```

---

> 🚀 Gunakan template ini sebagai dasar tantanganmu untuk **memvalidasi alamat IPv4 dalam format dot-decimal**!