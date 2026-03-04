# 🧮 Tantangan: Get Sum

> **Ini adalah tantangan latihan dasar** untuk membiasakan kamu dengan pola penyelesaian soal. Cocok untuk pemula yang baru mulai belajar pemrograman!

---

## 📋 Instruksi

Tulis sebuah function bernama `getSum` yang menerima **dua buah angka** dan mengembalikan **hasil penjumlahan** dari kedua angka tersebut.

---

## ✍️ Function Signature

```js
/**
 * Mengembalikan jumlah dari dua angka.
 * @param {number} a - Angka pertama.
 * @param {number} b - Angka kedua.
 * @returns {number} - Jumlah dari kedua angka.
 */
function getSum(a: number, b: number): number;
```

---

## 💡 Contoh Penggunaan

```js
getSum(1, 2)   // 3
getSum(10, 5)  // 15
getSum(2, 2)   // 4
getSum(10, 5)  // 15
```

---

## ⚠️ Batasan

- Function **wajib** mengembalikan nilai bertipe `number`

---

## 🔍 Petunjuk

- Kamu bisa menggunakan operator `+` untuk menjumlahkan dua angka.

---

## ✅ Solusi

<details>
  <summary>👆 Klik untuk Melihat Solusi</summary>

```js
function getSum(a, b) {
  return a + b;
}
```

### 📖 Penjelasan

Ini adalah tantangan yang cukup sederhana. Kita membuat sebuah function yang menerima **dua nilai**, lalu **menjumlahkan** kedua nilai tersebut, dan mengembalikan hasilnya.

</details>

---

## 🧪 Test Cases

```js
test('Calculating the sum of two numbers', () => {
  // Input untuk test case
  const num1 = 5;
  const num2 = 7;

  // Memanggil function
  const result = getSum(num1, num2);
  
  // Memeriksa apakah hasilnya sesuai dengan yang diharapkan
  expect(result).toBe(12);
});
```