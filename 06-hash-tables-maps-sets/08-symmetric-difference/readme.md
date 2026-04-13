# 🔁 Challenge: Symmetric Difference

> **Tantangan ini menguji kemampuanmu** dalam menggunakan struktur data `Set` untuk menemukan elemen-elemen yang unik di antara dua array — elemen yang hanya muncul di **salah satu** array, bukan keduanya.

---

## 📋 Instruksi

Tulis sebuah fungsi bernama `symmetricDifference` yang menerima **dua buah array** dan mengembalikan sebuah array yang berisi **symmetric difference** dari kedua array tersebut.

**Symmetric difference** dari dua array adalah array baru yang hanya mengandung elemen-elemen yang ada di **salah satu** array tetapi **tidak di keduanya**, tanpa duplikat.

---

## 🧩 Function Signature

```js
/**
 * Mengembalikan array yang berisi symmetric difference dari dua array.
 * @param {number[]} arr1 - Array pertama berisi bilangan bulat.
 * @param {number[]} arr2 - Array kedua berisi bilangan bulat.
 * @returns {number[]} - Array yang berisi symmetric difference dari kedua array.
 */
function symmetricDifference(arr1: number[], arr2: number[]): number[]
```

---

## 💡 Contoh Penggunaan

```js
symmetricDifference([1, 2, 3], [3, 4, 5]);
// Output: [1, 2, 4, 5]

symmetricDifference([1, 2, 2, 3, 4], [2, 3, 3, 4, 5]);
// Output: [1, 5]

symmetricDifference([1, 2, 3, 4, 5], [5, 4, 3, 2, 1]);
// Output: []

symmetricDifference([1, 2, 3], [4, 5, 6]);
// Output: [1, 2, 3, 4, 5, 6]
```

---

## 🔍 Petunjuk

- Kamu bisa menggunakan dua buah `Set` untuk melacak elemen-elemen di masing-masing array, lalu temukan elemen yang hanya ada di salah satu `Set`.
- **Perhatikan elemen duplikat** dan tangani dengan tepat menggunakan sifat unik dari `Set`.

---

## ✅ Solusi

<details>
  <summary>👆 Klik untuk Melihat Solusi</summary>

```js
function symmetricDifference(arr1, arr2) {
  const set1 = new Set(arr1);
  const set2 = new Set(arr2);
  const result = [];

  for (const num of arr1) {
    if (!set2.has(num)) {
      result.push(num);
    }
  }

  for (const num of arr2) {
    if (!set1.has(num)) {
      result.push(num);
    }
  }

  return result;
}
```

### 🧠 Penjelasan Langkah demi Langkah

- **Buat dua objek `Set`** — `set1` dari `arr1` dan `set2` dari `arr2`. Struktur data `Set` memungkinkan kita memeriksa keberadaan elemen secara efisien dan **otomatis menghilangkan duplikat**.
- **Inisialisasi array kosong** bernama `result` untuk menyimpan hasil symmetric difference.
- **Iterasi setiap elemen di `arr1`** menggunakan loop `for...of`. Untuk setiap elemen, gunakan method `has()` dari `set2` untuk mengecek apakah elemen tersebut ada di `set2`. Jika **tidak ditemukan**, berarti elemen itu hanya ada di `arr1` — `push` ke dalam `result`.
- **Ulangi proses yang sama untuk `arr2`** menggunakan loop `for...of` lainnya. Gunakan method `has()` dari `set1` untuk memeriksa. Jika **tidak ditemukan** di `set1`, berarti elemen itu hanya ada di `arr2` — `push` ke dalam `result`.
- **Kembalikan array `result`** yang mengandung semua elemen yang hanya ada di salah satu array input, tanpa duplikat.

</details>

---

## 🧪 Test Cases

```js
test('Symmetric Difference of Two Arrays', () => {
  expect(symmetricDifference([1, 2, 3], [3, 4, 5])).toEqual([1, 2, 4, 5]);
  expect(symmetricDifference([1, 2, 2, 3, 4], [2, 3, 3, 4, 5])).toEqual([1, 5]);
  expect(symmetricDifference([1, 2, 3, 4, 5], [5, 4, 3, 2, 1])).toEqual([]);
  expect(symmetricDifference([1, 2, 3], [4, 5, 6])).toEqual([1, 2, 3, 4, 5, 6]);
});
```
