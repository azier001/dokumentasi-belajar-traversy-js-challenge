# 📞 Tantangan: Format Nomor Telepon

> **Terjemahan dokumentasi tantangan pemrograman** — Implementasikan fungsi untuk memformat array angka menjadi string nomor telepon berformat standar.

---

## 📋 Instruksi

Tuliskan sebuah fungsi bernama `formatPhoneNumber` yang menerima sebuah array berisi angka-angka dan mengembalikan string yang merepresentasikan nomor telepon, dibentuk dengan menggabungkan angka-angka tersebut dalam format yang telah ditentukan.

---

## ✍️ Tanda Tangan Fungsi

```js
/**
 * Mengembalikan string yang merepresentasikan nomor telepon.
 * @param {number[]} numbers - Angka-angka yang digunakan dalam nomor telepon.
 * @returns {string} - Nomor telepon yang sudah diformat.
 */
function formatPhoneNumber(numbers: number[]): string;
```

---

## 💡 Contoh Penggunaan

```js
formatPhoneNumber([1, 2, 3, 4, 5, 6, 7, 8, 9, 0]); // => "(123) 456-7890"
formatPhoneNumber([5, 1, 9, 5, 5, 5, 4, 4, 6, 8]); // => "(519) 555-4468"
formatPhoneNumber([3, 4, 5, 5, 0, 1, 2, 5, 2, 7]); // => "(345) 501-2527"
```

---

## ⚠️ Batasan

- Array input **selalu memiliki tepat 10 angka**
- Setiap angka dapat berupa bilangan bulat dari **0 hingga 9**

---

## 🔍 Petunjuk

- Kamu dapat menggunakan method `Array.join` untuk menggabungkan angka-angka dalam array.
- Kamu dapat menggunakan method `Array.slice` untuk mengambil sebagian elemen dari array.

---

## ✅ Solusi

<details>
  <summary>🔓 Klik untuk Solusi 1</summary>

```js
function formatPhoneNumber(numbers) {
  const areaCode = numbers.slice(0, 3).join('');
  const prefix = numbers.slice(3, 6).join('');
  const lineNumber = numbers.slice(6).join('');

  return `(${areaCode}) ${prefix}-${lineNumber}`;
}
```

### 📖 Penjelasan

- Buat **3 variabel** untuk menyimpan area code, prefix, dan line number.
- Gunakan method `Array.slice` untuk mengambil sebagian elemen dari array.
- Gunakan method `Array.join` untuk menggabungkan angka-angka dalam array.

</details>

<details>
  <summary>🔓 Klik untuk Solusi 2</summary>

```js
function formatPhoneNumber(numbers) {
  const formatted = numbers.join('');
  return `(${formatted.substring(0, 3)}) ${formatted.substring(
    3,
    6
  )}-${formatted.substring(6)}`;
}
```

### 📖 Penjelasan

- Buat sebuah variabel untuk menyimpan hasil penggabungan semua angka dalam array menjadi satu string.
- Gunakan method `String.substring` untuk mengambil sebagian karakter dari string tersebut.

</details>

<details>
  <summary>🔓 Klik untuk Solusi 3</summary>

Arrow function **satu baris**:

```js
const formatPhoneNumber = (numbers) =>
  `(${numbers.slice(0, 3).join('')}) ${numbers.slice(3, 6).join('')}-${numbers
    .slice(6)
    .join('')}`;
```

### 📖 Penjelasan

Solusi ini serupa dengan solusi kedua, namun menggunakan **arrow function** dan chaining method `Array.slice`.

</details>

---

## 🧪 Test Cases

```js
test('Format Phone Number', () => {
  expect(formatPhoneNumber([1, 2, 3, 4, 5, 6, 7, 8, 9, 0])).toBe(
    '(123) 456-7890'
  );
  expect(formatPhoneNumber([5, 0, 2, 4, 8, 1, 9, 6, 3, 7])).toBe(
    '(502) 481-9637'
  );
  expect(formatPhoneNumber([9, 9, 9, 9, 9, 9, 9, 9, 9, 9])).toBe(
    '(999) 999-9999'
  );
});
```