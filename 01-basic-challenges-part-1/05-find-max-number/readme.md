# 🔢 Tantangan: Temukan Angka Terbesar

> **Uji kemampuan looping-mu!** Tulis sebuah fungsi yang mampu menemukan angka terbesar dari sebuah array — tanpa bergantung pada shortcut bawaan.

---

## 📋 Instruksi

Tulis sebuah fungsi bernama `findMaxNumber` yang menerima sebuah array berisi angka-angka, lalu **mengembalikan angka terbesar** dalam array tersebut.

---

## ✍️ Function Signature

```js
/**
 * Mengembalikan angka terbesar dalam sebuah array.
 * @param {number[]} arr - Array yang berisi angka-angka.
 * @returns {number} - Angka terbesar dalam array.
 */
function findMaxNumber(arr: number[]): number;
```

---

## 💡 Contoh Penggunaan

```js
findMaxNumber([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]); // 10
findMaxNumber([10, 9, 8, 7, 6, 5, 4, 3, 2, 1]); // 10
findMaxNumber([1, 2, 3, 4, 5, 10, 9, 8, 7, 6]); // 10
```

---

## 🗝️ Petunjuk

- Sebenarnya ada cara yang **sangat mudah** untuk menyelesaikan ini menggunakan method bawaan tertentu. Namun, disarankan untuk **tidak** menggunakan cara tersebut. Cobalah selesaikan tantangan ini menggunakan `for` loop.

---

## ✅ Solusi

<details>
  <summary>👆 Klik untuk Solusi 1</summary>

Ini adalah cara mudahnya. Terdapat sebuah method bernama `Math.max()` yang akan mengembalikan angka terbesar dalam sebuah array. Cara ini **tidak disarankan** untuk latihan, namun penting untuk diketahui bahwa method ini ada.

```js
function findMaxNumber(arr) {
  return Math.max(...arr);
}
```

### 📖 Penjelasan

Tidak banyak yang perlu dijelaskan di sini — `Math.max()` melakukan semuanya secara otomatis.

</details>

<details>
  <summary>👆 Klik untuk Solusi 2</summary>

Berikut adalah cara lain untuk menyelesaikannya menggunakan `for` loop.

```js
function findMaxNumber(arr) {
  let max = arr[0];

  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > max) {
      max = arr[i];
    }
  }

  return max;
}
```

### 📖 Penjelasan

- Buat sebuah variabel bernama `max` dan **set nilainya** ke elemen pertama dalam array.
- Lakukan perulangan melalui array mulai dari elemen **kedua**.
- Periksa apakah elemen saat ini **lebih besar** dari nilai `max` yang sekarang. Jika iya, set `max` menjadi elemen tersebut.
- **Kembalikan** nilai `max` setelah perulangan selesai.

</details>

---

## 🧪 Test Cases

```js
test('Menemukan angka maksimum dalam sebuah array', () => {
  expect(findMaxNumber([1, 5, 3, 9, 2])).toBe(9);
  expect(findMaxNumber([0, -1, -5, 2])).toBe(2);
  expect(findMaxNumber([10, 10, 10, 10])).toBe(10);
});
```