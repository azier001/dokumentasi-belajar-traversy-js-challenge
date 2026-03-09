# 🔀 Tantangan: Array Intersection

> **Tujuan:** Memahami cara menemukan elemen-elemen yang sama (*intersection*) antara dua buah array menggunakan JavaScript.

---

## 📋 Instruksi

Tulis sebuah fungsi bernama `arrayIntersection` yang menerima **dua array** sebagai input dan mengembalikan array yang berisi hasil *intersection* dari kedua array tersebut (yaitu, elemen-elemen yang **muncul di kedua array**).

---

## ✍️ Function Signature

```js
/**
 * Mengembalikan intersection dari dua array.
 * @param {number[]} arr1 - Array pertama.
 * @param {number[]} arr2 - Array kedua.
 * @returns {number[]} - Hasil intersection dari kedua array.
 */
function arrayIntersection(arr1: number[], arr2: number[]): number[];
```

---

## 💡 Contoh Penggunaan

```js
arrayIntersection([1, 2, 3, 4, 5], [1, 3, 5, 7, 9]); // harus mengembalikan [1, 3, 5]
arrayIntersection([1, 1, 1, 1, 1], [2, 2, 2, 2, 2]); // harus mengembalikan []
arrayIntersection([1, 2, 3, 4, 5], [5, 4, 3, 2, 1]); // harus mengembalikan [1, 2, 3, 4, 5]
```

---

## ⚠️ Batasan

- Array input dapat berisi **jumlah elemen berapa pun**
- Array input dapat berisi **bilangan bulat positif apa pun**

---

## 🗝️ Petunjuk

- Kamu bisa menggunakan `for loop` untuk mengiterasi array pertama dan memeriksa apakah setiap elemen ada di array kedua menggunakan method `includes`.
- Kamu juga bisa menggunakan pendekatan `Set` untuk menyimpan elemen-elemen dari array pertama, lalu mengiterasi array kedua dan memeriksa apakah setiap elemen ada di dalam `Set` menggunakan method `has`.

---

## 🧩 Solusi

<details>
  <summary>👆 Klik untuk Solusi 1</summary>

```js
function arrayIntersection(arr1, arr2) {
  const intersection = [];

  for (let i = 0; i < arr1.length; i++) {
    if (arr2.includes(arr1[i]) && !intersection.includes(arr1[i])) {
      intersection.push(arr1[i]);
    }
  }

  return intersection;
}
```

### 📖 Penjelasan

- Iterasi melalui **array pertama**
- Untuk setiap elemen, periksa apakah elemen tersebut ada di array kedua menggunakan method `includes`
- Jika ada, periksa apakah elemen tersebut sudah ada di array `intersection` menggunakan method `includes`
- Jika belum ada, masukkan elemen tersebut ke dalam array `intersection` menggunakan `push`
- **Kembalikan** array `intersection`

</details>

<details>
  <summary>👆 Klik untuk Solusi 2</summary>

Pada solusi ini, kita akan menggunakan `Set`. `Set` adalah struktur data yang menyimpan **nilai-nilai unik**. Kita akan membahas tentang *maps* dan *sets* di bagian lain. Jika kamu belum familiar dengan `Set`, tidak apa-apa — kamu tetap bisa mengikuti solusi ini.

```js
function arrayIntersection(arr1, arr2) {
  const set1 = new Set(arr1);
  const intersection = [];

  for (let num of arr2) {
    if (set1.has(num)) {
      intersection.push(num);
    }
  }

  return intersection;
}
```

### 📖 Penjelasan

- Buat `Set` baru dari **array pertama**
- Iterasi melalui **array kedua** dan periksa apakah setiap elemen ada di dalam `set` menggunakan method `has`
- Jika ada, masukkan elemen tersebut ke dalam array `intersection` menggunakan `push`
- **Kembalikan** array `intersection`

</details>

<details>
  <summary>👆 Klik untuk Solusi 3</summary>

Solusi ini menggunakan pendekatan yang **bersih dan mudah dibaca** dengan penamaan variabel yang lebih deskriptif sesuai *best practice* bahasa Inggris, sekaligus **menangani duplikat**.

```js
function arrayIntersection(firstArray, secondArray) {
  const result = [];

  for (const item of firstArray) {
    if (secondArray.includes(item) && !result.includes(item)) {
      result.push(item);
    }
  }

  return result;
}
```

### 📖 Penjelasan

- `firstArray` / `secondArray` — lebih eksplisit dibanding `arr1` / `arr2`
- `item` — lebih *generic* dibanding `num`, karena array tidak selalu berisi angka
- Iterasi melalui **array pertama** menggunakan `for...of`
- Untuk setiap `item`, periksa apakah ada di `secondArray` menggunakan method `includes`
- Jika ada, periksa apakah `item` **belum ada** di `result` untuk menghindari duplikat
- Jika belum ada, masukkan ke dalam `result` menggunakan `push`
- **Kembalikan** array `result`

</details>

---

## 🧪 Test Cases

```js
test('Menemukan intersection dari dua array', () => {
  expect(arrayIntersection([1, 2, 3, 4, 5], [3, 4, 5, 6, 7])).toEqual([
    3, 4, 5,
  ]);
  expect(arrayIntersection([10, 20, 30], [30, 40, 50])).toEqual([30]);
  expect(arrayIntersection([1, 2, 3], [4, 5, 6])).toEqual([]);
});
```