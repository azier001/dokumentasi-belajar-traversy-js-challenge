# 🧩 Tantangan: Maximum Subarray Sum — Solusi O(n²)

> **Dokumentasi ini menjelaskan cara menemukan jumlah maksimum dari subarray dengan panjang tertentu menggunakan pendekatan O(n²) berbasis nested loop. Solusi ini akan dikunjungi kembali menggunakan teknik sliding window untuk efisiensi O(n).**

---

## 📋 Instruksi

Tulis sebuah fungsi bernama `maxSubarraySum` yang menerima sebuah array berisi bilangan bulat dan sebuah bilangan bulat positif `k` sebagai input. Fungsi ini harus menemukan **jumlah maksimum** dari subarray mana pun dengan panjang `k`, menggunakan **solusi O(n²)** dengan nested for loop.

Kita akan **mengunjungi kembali** tantangan ini dan menggunakan teknik **sliding window** untuk solusi O(n).

---

## ✍️ Function Signature

```javascript
/**
 * Menemukan jumlah maksimum dari subarray dengan panjang k dalam array input menggunakan solusi O(n^2).
 * @param {number[]} arr - Array input berisi bilangan bulat.
 * @param {number} k - Panjang subarray.
 * @returns {number} - Jumlah maksimum dari subarray mana pun dengan panjang k.
 */
function maxSubarraySum(arr: number[], k: number): number
```

---

## 💡 Contoh Penggunaan

```javascript
const arr1 = [2, 5, 3, 1, 11, 7, 6, 4];
const k1 = 3;
console.log(maxSubarraySum(arr1, k1)); // Output: 24

const arr2 = [-2, -5, -3, -1, -11, -7, -6, -4];
const k2 = 4;
console.log(maxSubarraySum(arr2, k2)); // Output: -9
```

---

## ⚠️ Batasan

- Nilai integer `k` akan berada di antara **1** dan **panjang array** input.

---

## 🔍 Petunjuk

- Kamu dapat menggunakan **dua nested loop** untuk mengiterasi semua kemungkinan subarray dengan panjang `k` dan menghitung jumlahnya.

---

## ✅ Solusi

<details>
  <summary>👆 Klik untuk Melihat Solusi</summary>

```javascript
function maxSubarraySum(arr, k) {
  let maxSum = 0;

  for (let i = 0; i <= arr.length - k; i++) {
    let currentSum = 0;

    for (let j = i; j < i + k; j++) {
      currentSum += arr[j];
    }

    maxSum = Math.max(maxSum, currentSum);
  }

  return maxSum;
}
```

### 🧠 Penjelasan

- Fungsi `maxSubarraySum` menggunakan **dua nested loop** untuk mengiterasi semua kemungkinan subarray dengan panjang `k`.
- Untuk setiap subarray, jumlahnya dihitung menggunakan **nested loop** dan **nilai maksimum** yang ditemukan terus dilacak.
- Pada akhirnya, fungsi mengembalikan **jumlah maksimum** tersebut.

</details>

---

## 🧪 Test Cases

```javascript
test('Mencari jumlah subarray maksimum menggunakan solusi O(n^2)', () => {
  const arr1 = [2, 5, 3, 1, 11, 7, 6, 4];
  const k1 = 3;
  expect(maxSubarraySum(arr1, k1)).toBe(24);

  const arr2 = [-2, -5, -3, -1, -11, -7, -6, -4];
  const k2 = 4;
  expect(maxSubarraySum(arr2, k2)).toBe(-9);
});
```

---

> ⏱️ **Catatan:** Solusi yang diberikan memiliki **time complexity O(n²)** karena penggunaan nested loop.