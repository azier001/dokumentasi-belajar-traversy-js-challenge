# 🧩 Tantangan: Hapus Duplikat

> **Dokumentasi tantangan pemrograman** untuk membuat fungsi yang menghapus elemen duplikat dari sebuah array, lengkap dengan solusi dan test cases.

---

## 📋 Instruksi

Tulislah sebuah fungsi bernama `removeDuplicates` yang menerima sebuah array dan mengembalikan array baru dengan duplikat yang telah dihapus.

### ✍️ Tanda Tangan Fungsi

```js
/**
 * Mengembalikan array baru dengan duplikat yang telah dihapus.
 * @param {any[]} arr - Array yang akan dihapus duplikatnya.
 * @returns {any[]} - Array baru tanpa duplikat.
 */
function removeDuplicates(arr: any[]): any[];
```

---

### 💡 Contoh Penggunaan

```js
removeDuplicates([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]); // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
removeDuplicates([1, 1, 1, 1, 1, 1, 1, 1, 1, 1]); // [1]
removeDuplicates([1, 2, 3, 4, 5, true, 1, 'hello' 2, 3, 'hello', true]); // [1, 2, 3, 4, 5, true, 'hello']
```

---

### 🚧 Batasan

- Array dapat mengandung **tipe data apa pun**

---

### 🔍 Petunjuk

- Kamu bisa menyelesaikan ini dengan perulangan `for` biasa, tetapi jika kamu sudah familiar dengan objek `Set`, kamu bisa menggunakannya untuk menyelesaikan masalah ini. Coba kedua cara sekaligus!

---

## ✅ Solusi

<details>
  <summary>👆 Klik untuk Solusi 1</summary>

Menggunakan perulangan `for`

```js
function removeDuplicates(arr) {
  const uniqueArr = [];

  for (let i = 0; i < arr.length; i++) {
    if (!uniqueArr.includes(arr[i])) {
      uniqueArr.push(arr[i]);
    }
  }

  return uniqueArr;
}
```

### 📖 Penjelasan

- Buat array baru bernama `uniqueArr`.
- Buat perulangan `for` yang akan melewati setiap elemen dalam array dan memeriksa apakah elemen saat ini sudah ada di dalam `uniqueArr`.
- Jika **belum ada**, kita masukkan elemen tersebut ke dalam `uniqueArr` menggunakan `push`.
- Setelah seluruh array telah dilewati, kita kembalikan `uniqueArr`.

</details>

<details>
  <summary>👆 Klik untuk Solusi 2</summary>

Menggunakan `Set`

```js
function removeDuplicates(arr) {
  return Array.from(new Set(arr));
}
```

### 📖 Penjelasan

Solusi ini sangat **sederhana**. Kita menerima array yang mengandung duplikat, lalu membuat `Set` baru dari array tersebut. Kemudian kita konversi kembali `Set` itu menjadi array dan mengembalikannya.

Alasan ini berhasil adalah karena sebuah `Set` hanya dapat mengandung **nilai unik**. Jadi ketika kita membuat `Set` dari sebuah array, semua duplikat akan dihapus secara otomatis.

</details>

<details>
  <summary>👆 Klik untuk Solusi 3 — ⭐ Best Practice</summary>

Menggunakan `for...of` dengan penamaan variabel yang lebih clean

```js
function removeDuplicates(arr) {
  const unique = [];

  for (const element of arr) {
    if (!unique.includes(element)) {
      unique.push(element);
    }
  }

  return unique;
}
```

### 📖 Penjelasan

- Buat array baru bernama `unique` — lebih **semantic** dibanding `uniqueArr` karena suffix `Arr` bersifat redundant.
- Gunakan `for...of` yang lebih **modern dan readable** dibanding `for` loop tradisional dengan index.
- Untuk setiap `element`, periksa apakah sudah ada di dalam `unique`.
- Jika **belum ada**, masukkan ke dalam `unique` menggunakan `push`.
- Kembalikan `unique` setelah seluruh array selesai diiterasi.

> 💡 **Catatan:** Solusi ini secara logika identik dengan Solusi 1, namun menggunakan **naming convention** dan **syntax** yang lebih mengikuti best practice modern JavaScript.

</details>

---

## 🧪 Test Cases

```js
test('Menghapus duplikat dari sebuah array', () => {
  expect(removeDuplicates([1, 2, 3, 2, 4, 1, 5])).toEqual([1, 2, 3, 4, 5]);
  expect(
    removeDuplicates(['apple', 'banana', 'orange', 'banana', 'kiwi'])
  ).toEqual(['apple', 'banana', 'orange', 'kiwi']);
  expect(removeDuplicates([true, true, false, true, false])).toEqual([
    true,
    false,
  ]);
});
```