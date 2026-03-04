# 🧮 Tantangan: Calculator

> **Uji kemampuan pemrogramanmu** dengan membuat fungsi kalkulator sederhana yang mampu melakukan operasi aritmatika dasar menggunakan dua angka dan sebuah operator.

---

## 📋 Instruksi

Tulis sebuah fungsi bernama `calculator` yang menerima **2 angka** dan sebuah **operator**, lalu mengembalikan hasil perhitungannya.

---

## ✍️ Function Signature

```js
/**
 * Mengembalikan hasil dari sebuah perhitungan.
 * @param {number} num1 - Angka pertama.
 * @param {number} num2 - Angka kedua.
 * @param {string} operator - Operator yang digunakan dalam perhitungan.
 * @returns {number} - Hasil dari perhitungan.
 */
function calculator(num1: number, num2: number, operator: string): number;
```

---

## 💡 Contoh Penggunaan

```js
calculator(1, 2, '+') // 3
calculator(10, 5, '-') // 5
calculator(2, 2, '*') // 4
calculator(10, 5, '/') // 2
```

---

## ⛓️ Batasan

- Fungsi **harus** mengembalikan nilai bertipe `number`
- Fungsi **harus** melempar atau mencatat error apabila operator yang diberikan **tidak valid**

---

## 🔍 Petunjuk

- Kamu dapat menggunakan pernyataan `if` atau `switch` untuk menentukan operator mana yang diberikan.

---

## ✅ Solusi

<details>
  <summary>👆 Klik untuk Solusi 1</summary>

#### Menggunakan `switch`:

```js
function calculator(num1, num2, operator) {
  let result;

  switch (operator) {
    case '+':
      result = num1 + num2;
      break;
    case '-':
      result = num1 - num2;
      break;
    case '*':
      result = num1 * num2;
      break;
    case '/':
      result = num1 / num2;
      break;
    default:
      throw new Error('Invalid operator');
  }

  return result;
}
```

### 📖 Penjelasan

- Membuat fungsi bernama `calculator` yang menerima tiga argumen: `num1`, `num2`, dan `operator`.
- Membuat variabel bernama `result` untuk menyimpan hasil perhitungan.
- Menggunakan pernyataan `switch` untuk menentukan operator yang diberikan. Jika operatornya adalah `+`, `-`, `*`, atau `/`, maka perhitungan dilakukan. Jika operator bernilai lain, maka sebuah **error dilempar**.

</details>

<details>
  <summary>👆 Klik untuk Solusi 2</summary>

#### Menggunakan pernyataan `if`:

```js
function calculator(num1, num2, operator) {
  let result;

  if (operator === '+') {
    result = num1 + num2;
  } else if (operator === '-') {
    result = num1 - num2;
  } else if (operator === '*') {
    result = num1 * num2;
  } else if (operator === '/') {
    result = num1 / num2;
  } else {
    throw new Error('Invalid operator');
  }

  return result;
}
```

### 📖 Penjelasan

- Membuat fungsi bernama `calculator` yang menerima tiga argumen: `num1`, `num2`, dan `operator`.
- Membuat variabel bernama `result` untuk menyimpan hasil perhitungan.
- Menggunakan pernyataan `if` untuk menentukan operator yang diberikan. Jika operatornya adalah `+`, `-`, `*`, atau `/`, maka perhitungan dilakukan. Jika operator bernilai lain, maka sebuah **error dilempar**.

</details>

<details>
  <summary>👆 Klik untuk Solusi 3</summary>

#### Menggunakan `switch` dengan `return` langsung:

```js
function calculator(num1, num2, operator) {
  switch (operator) {
    case '+':
      return num1 + num2;

    case '-':
      return num1 - num2;

    case '*':
      return num1 * num2;

    case '/':
      return num1 / num2;

    default:
      throw new Error('Invalid operator');
  }
}
```

### 📖 Penjelasan

- Membuat fungsi bernama `calculator` yang menerima tiga argumen: `num1`, `num2`, dan `operator`.
- Menggunakan pernyataan `switch` seperti Solusi 1, namun **tanpa variabel `result`** dan **tanpa `break`**.
- Setiap `case` langsung me-`return` hasil perhitungan, sehingga kode menjadi **lebih ringkas**. Jika operator tidak valid, maka sebuah **error dilempar**.

</details>

---

## 🧪 Test Cases

```js
test('Performing arithmetic operations using the calculator function', () => {
  // Input untuk test case
  const num1 = 5;
  const num2 = 7;

  // Penjumlahan
  expect(calculator(num1, num2, '+')).toBe(12);

  // Pengurangan
  expect(calculator(num1, num2, '-')).toBe(-2);

  // Perkalian
  expect(calculator(num1, num2, '*')).toBe(35);

  // Pembagian
  expect(calculator(num1, num2, '/')).toBeCloseTo(0.7143, 4);

  // Operator tidak valid
  expect(() => calculator(num1, num2, '^')).toThrow('Invalid operator');
});
```