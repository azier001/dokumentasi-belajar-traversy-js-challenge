# 🧩 Tantangan: Maximum Subarray Sum — Solusi O(n)

> **Dokumentasi ini menjelaskan cara menemukan jumlah maksimum dari subarray dengan panjang tertentu menggunakan teknik _sliding window_ yang efisien.**

---

## 📋 Instruksi

Tulis sebuah fungsi bernama `maxSubarraySum` yang menerima sebuah array berisi bilangan bulat dan sebuah bilangan bulat positif `k` sebagai input. Fungsi ini harus **menemukan jumlah maksimum** dari subarray mana pun dengan panjang `k`, menggunakan solusi O(n) dengan memanfaatkan teknik **sliding window**.

---

## ✍️ Function Signature

```javascript
/**
 * Menemukan jumlah maksimum dari subarray dengan panjang k dalam array input menggunakan solusi O(n^2).
 * @param {number[]} arr - Array input berisi bilangan bulat.
 * @param {number} k - Panjang subarray.
 * @returns {number} - Jumlah maksimum dari subarray dengan panjang k.
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

- Nilai integer `k` akan berada di antara **1** dan **panjang array** yang diberikan.

---

## 🔍 Petunjuk

- Kamu dapat menggunakan teknik **sliding window** untuk melacak jumlah subarray dengan panjang `k` secara efisien saat iterasi melalui array.

---

## ✅ Solusi

<details>
  <summary>👆 Klik untuk Melihat Solusi</summary>

```javascript
function maxSubarraySum(arr, k) {
  let maxSum = 0;
  let currentSum = 0;

  for (let i = 0; i < k; i++) {
    maxSum += arr[i];
  }

  currentSum = maxSum;

  for (let i = k; i < arr.length; i++) {
    currentSum = currentSum - arr[i - k] + arr[i];
    console.log(`${currentSum} - ${arr[i - k]} + ${arr[i]}`); // Opsional
    maxSum = Math.max(maxSum, currentSum);
  }

  return maxSum;
}
```

### 🧠 Penjelasan

- **`maxSum`** dan **`currentSum`** diinisialisasi dengan nilai `0`. Kedua variabel ini digunakan untuk melacak jumlah maksimum dan jumlah dari _sliding window_ saat ini.

- **Loop pertama** (`for loop`) menghitung jumlah dari `k` elemen pertama dalam array `arr` dan menyimpannya ke `maxSum`. Ini menginisialisasi `currentSum` dan `maxSum` untuk _sliding window_ pertama.

- `currentSum` kemudian disetel ke nilai `maxSum`. Ini menetapkan jumlah awal dari _sliding window_ saat ini.

- **Loop kedua** (`for loop`) dimulai dari indeks `k` dan melakukan iterasi melalui array `arr`. Loop ini mengimplementasikan teknik **sliding window**.

- Di dalam loop kedua, `currentSum` diperbarui menggunakan konsep _sliding window_: elemen yang **keluar** dari window (pada indeks `i - k`) dikurangi, dan elemen **baru** yang masuk ke dalam window (pada indeks `i`) ditambahkan.

- Pernyataan `console.log` yang bersifat opsional mencatat pembaruan `currentSum` untuk tujuan visualisasi, menunjukkan bagaimana window bergeser dan bagaimana jumlah saat ini berubah.

- `maxSum` diperbarui menggunakan fungsi `Math.max` untuk melacak jumlah maksimum yang ditemukan selama traversal _sliding window_.

- Terakhir, fungsi mengembalikan **`maxSum`**, yang merepresentasikan jumlah maksimum dari subarray mana pun dengan panjang `k` dalam array input.

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
  expect(maxSubarraySum(arr2, k2)).toBe(-11);
});
```

---

> 📌 **Catatan:** Solusi yang diberikan memiliki **time complexity O(n²)** karena adanya nested loop (loop bersarang).