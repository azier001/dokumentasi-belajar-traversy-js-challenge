# 🔁 Tantangan: Penjumlahan Array Menggunakan Rekursi

> **Dokumentasi ini memandu Anda** dalam memahami dan mengimplementasikan fungsi `arraySum` — sebuah solusi elegan untuk menghitung jumlah elemen array menggunakan teknik **rekursi**.

---

## 📋 Deskripsi

Mari berlatih menggunakan rekursi dengan membuat fungsi yang menghitung jumlah elemen dari sebuah array bilangan. Tulis sebuah fungsi bernama `arraySum` yang menerima sebuah array bilangan dan mengembalikan jumlahnya menggunakan rekursi.

---

## 📝 Instruksi

Tulis sebuah fungsi bernama `arraySum` yang menerima sebuah array bilangan dan mengembalikan jumlahnya menggunakan rekursi.

### ✍️ Tanda Tangan Fungsi

```js
/**
 * Menghitung jumlah elemen array bilangan menggunakan rekursi.
 * @param {Array} arr - Array bilangan yang akan dijumlahkan.
 * @returns {number} - Jumlah total dari seluruh bilangan.
 */
function arraySum(arr: Array): number;
```

---

### ⚠️ Batasan

- Array input dapat berisi bilangan bulat **positif** dan/atau **negatif**.

---

### 💡 Petunjuk

- Pikirkan apa yang menjadi **base case** (kasus dasar) ketika bekerja dengan array.
- Pikirkan bagaimana Anda dapat memecah masalah penjumlahan array menjadi **sub-masalah yang lebih kecil**.
- Anda dapat menggunakan `arr.slice(1)` untuk membuat array baru yang mengecualikan elemen pertama.

---

### 🧪 Contoh Penggunaan

```js
arraySum([1, 2, 3, 4, 5]);   // harus mengembalikan 15  (1 + 2 + 3 + 4 + 5 = 15)
arraySum([-1, -2, -3, -4, -5]); // harus mengembalikan -15 (-1 + -2 + -3 + -4 + -5 = -15)
arraySum([]);                // harus mengembalikan 0   (array kosong)
```

---

## ✅ Solusi

<details>
  <summary>🔍 Klik untuk Melihat Solusi</summary>

```js
function arraySum(arr) {
  if (arr.length === 0) {
    return 0;
  } else {
    return arr[0] + arraySum(arr.slice(1));
  }
}
```

### 🧠 Penjelasan

- Fungsi `arraySum` menggunakan pendekatan **rekursif** untuk menghitung jumlah elemen array bilangan.
- **Base case** terjadi ketika array kosong. Dalam kondisi ini, fungsi mengembalikan `0`, karena jumlah array kosong adalah `0`.
- Pada **recursive case**, fungsi menambahkan elemen pertama array (`arr[0]`) dengan jumlah sisa elemen array (`arraySum(arr.slice(1))`).
- Rekursi terus berlanjut hingga array menjadi kosong dan base case tercapai.

Berikut adalah **gambaran alur rekursi** saat menghitung jumlah dari `[1, 2, 3, 4, 5]`:

- `arraySum([1, 2, 3, 4, 5])` mengembalikan `1 + arraySum([2, 3, 4, 5])`
- `arraySum([2, 3, 4, 5])` mengembalikan `2 + arraySum([3, 4, 5])`
- `arraySum([3, 4, 5])` mengembalikan `3 + arraySum([4, 5])`
- `arraySum([4, 5])` mengembalikan `4 + arraySum([5])`
- `arraySum([5])` mengembalikan `5 + arraySum([])`
- `arraySum([])` mencapai base case dan mengembalikan `0`

Kemudian, panggilan rekursif mulai **"membuka diri"** (*unwinding*) dan nilai-nilainya dijumlahkan:

- `5 + 0  = 5`  → Dikembalikan dari `arraySum([5])`
- `4 + 5  = 9`  → Dikembalikan dari `arraySum([4, 5])`
- `3 + 9  = 12` → Dikembalikan dari `arraySum([3, 4, 5])`
- `2 + 12 = 14` → Dikembalikan dari `arraySum([2, 3, 4, 5])`
- `1 + 14 = 15` → Dikembalikan dari `arraySum([1, 2, 3, 4, 5])`

Sehingga, **hasil akhirnya adalah `15`**, yaitu jumlah dari semua bilangan dalam array `[1, 2, 3, 4, 5]`.

</details>

---

## 🧾 Test Cases

```js
test('Menghitung Jumlah Array Menggunakan Rekursi', () => {
  expect(arraySum([1, 2, 3, 4, 5])).toEqual(15);
  expect(arraySum([-1, -2, -3, -4, -5])).toEqual(-15);
  expect(arraySum([])).toEqual(0);
});
```