# 🧹 Remove Duplicates — Catatan Belajar JavaScript

> 📌 *Dokumentasi pribadi dari video tutorial: bekerja dengan array dan menghapus duplikat*

---

## 📋 Daftar Isi

- 🎯 [Pengenalan](#pengenalan)
- 🧩 [Apa itu Masalahnya?](#masalah)
- 🔁 [Solusi 1: For Loop + Includes](#solusi-1)
- ✨ [Solusi 2: For...of + Includes](#solusi-2)
- 🗂️ [Solusi 3: Set Object](#solusi-3)
- ⚖️ [Perbandingan Ketiga Solusi](#perbandingan)
- 🧪 [Test Cases](#test-cases)

---

<a name="pengenalan"></a>
## 🎯 Pengenalan

Challenge ini adalah bagian dari latihan bekerja dengan **array** di JavaScript. Kita akan membuat sebuah fungsi bernama `removeDuplicates` yang tugasnya sederhana: terima array apapun → kembalikan array baru tanpa duplikat.

Challenge ini masih pakai pendekatan **low-level** (for loop biasa), karena *higher-order array methods* seperti `forEach`, `map`, dll. baru dibahas di section selanjutnya.

---

<a name="masalah"></a>
## 🧩 Apa itu Masalahnya?

Kita punya array yang mungkin berisi nilai-nilai yang sama lebih dari sekali. Tugas kita: **buang yang duplikat, sisakan yang unik saja**.

### Contoh kasus:

| Input | Output |
|-------|--------|
| `[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]` | `[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]` ✅ (udah unik) |
| `[1, 1, 1, 1, 1]` | `[1]` ✅ (sisa 1 aja) |
| `[1, 2, true, 'hello', 2, true]` | `[1, 2, true, 'hello']` ✅ |

> 💡 **Catatan:** Array bisa berisi **tipe data apapun** — angka, string, boolean, semuanya harus ditangani.

---

<a name="solusi-1"></a>
## 🔁 Solusi 1: For Loop + `includes()`

Cara pertama dari tutorial: pakai `for` loop klasik dengan index.

```javascript
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

### 🔍 Penjelasan langkah demi langkah:

**1. Buat array kosong `uniqueArr`**
Array ini yang akan jadi "tempat penampungan" nilai-nilai unik. Awalnya kosong dulu.

**2. Loop pakai `for`**
Kita iterasi dari index `0` sampai akhir array (`arr.length`), akses nilainya lewat `arr[i]`.

**3. Cek dengan `.includes()`**
Method `.includes()` akan mengembalikan `true` jika nilai sudah ada di dalam array, dan `false` jika belum. Kita pakai `!` (NOT) supaya kondisinya terbalik — kita hanya masuk ke `if` kalau nilai **belum** ada.

**4. `.push()` nilai yang unik**
Kalau nilai belum ada di `uniqueArr`, kita tambahkan pakai `.push()`.

**5. Return `uniqueArr`**
Setelah semua elemen dicek, kembalikan array yang sudah bersih.

> 🔄 **Alternatif:** Daripada pakai `.includes()`, kita bisa pakai **nested for loop** untuk ngecek secara manual. Tapi `.includes()` lebih ringkas dan mudah dibaca.

---

<a name="solusi-2"></a>
## ✨ Solusi 2: For...of + `includes()`

Versi yang lebih clean dari Solusi 1 — logikanya sama, tapi pakai `for...of` sehingga tidak perlu index.

```javascript
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

### 🔍 Apa bedanya dengan Solusi 1?

| | Solusi 1 (`for`) | Solusi 2 (`for...of`) |
|--|--|--|
| **Akses nilai** | `arr[i]` — lewat index | `element` — langsung nilainya |
| **Perlu index?** | Ya (`let i = 0`) | Tidak perlu |
| **Keterbacaan** | Lebih verbose | Lebih bersih |

`for...of` cocok dipakai kalau kita **tidak butuh index** — tinggal langsung pakai nilainya saja.

---

<a name="solusi-3"></a>
## 🗂️ Solusi 3: `Set` Object

Cara ketiga jauh lebih singkat! Kita manfaatkan struktur data bawaan JavaScript: **Set**.

```javascript
function removeDuplicates(arr) {
  // Set otomatis buang duplikat — lalu kita ubah kembali ke array
  return Array.from(new Set(arr));
}
```

### 💡 Apa itu Set?

`Set` adalah **struktur data bawaan JavaScript** yang punya satu aturan spesial: **tidak boleh ada nilai yang sama dua kali**. Jadi kalau kita masukin duplikat, otomatis diabaikan.

```javascript
// Contoh Set:
const mySet = new Set([1, 2, 2, 3, 3, 3]);
console.log(mySet); // Set(3) { 1, 2, 3 } — duplikat hilang otomatis!
```

### 🔍 Penjelasan `Array.from(new Set(arr))`:

| Bagian | Artinya |
|--------|---------|
| `new Set(arr)` | Ubah array jadi Set — duplikat langsung hilang |
| `Array.from(...)` | Ubah kembali Set itu menjadi array biasa |

> 📚 **Catatan:** Set dan struktur data lainnya (Map, HashTable) akan dibahas lebih dalam di section berikutnya. Untuk sekarang, cukup tahu bahwa **Set = koleksi nilai unik**.

---

<a name="perbandingan"></a>
## ⚖️ Perbandingan Ketiga Solusi

| | Solusi 1 (`for`) | Solusi 2 (`for...of`) | Solusi 3 (Set) |
|--|--|--|--|
| **Panjang kode** | Sedang | Sedang | Sangat singkat (1 baris) |
| **Keterbacaan** | Eksplisit, verbose | Bersih & mudah dibaca | Paling elegan |
| **Perlu index?** | Ya | Tidak | Tidak |
| **Kapan dipakai** | Belajar dasar loop | Versi clean dari loop | Butuh solusi cepat |

> ✅ Ketiganya menghasilkan output yang **sama** dan **lulus semua test** — pilih sesuai kebutuhan!

---

<a name="test-cases"></a>
## 🧪 Test Cases

Test yang dipakai untuk memverifikasi fungsi ini:

```javascript
test('Removing duplicates from an array', () => {
  // Test dengan array angka
  expect(removeDuplicates([1, 2, 3, 2, 4, 1, 5])).toEqual([1, 2, 3, 4, 5]);

  // Test dengan array string
  expect(
    removeDuplicates(['apple', 'banana', 'orange', 'banana', 'kiwi'])
  ).toEqual(['apple', 'banana', 'orange', 'kiwi']);

  // Test dengan array boolean
  expect(removeDuplicates([true, true, false, true, false])).toEqual([
    true,
    false,
  ]);
});
```

Kalau semua test hijau ✅ — berarti fungsinya sudah benar untuk berbagai tipe data!

---

> 🚀 *Selanjutnya: Basic Challenges 2 — masih pakai loop, tapi levelnya lebih menantang!*