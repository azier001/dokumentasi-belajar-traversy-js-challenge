# 🔀 Array Intersection — Catatan Belajar

> Dokumentasi pribadi dari video tutorial JavaScript: **Array Intersection Challenge**

---

## 📋 Daftar Isi

- 🔍 [Apa itu Array Intersection?](#apa-itu-array-intersection)
- 🎯 [Contoh Kasus](#contoh-kasus)
- 📌 [Batasan Soal](#batasan-soal)
- 🏗️ [Solusi 1 — Pakai `for` Loop + `includes()`](#solusi-1)
- ⚡ [Solusi 2 — Pakai `Set` + `has()`](#solusi-2)
- 🧹 [Solusi 3 — Pakai `for...of` + `includes()`](#solusi-3)
- 🔬 [Perbandingan Tiga Solusi](#perbandingan)
- ✅ [Menjalankan Test](#menjalankan-test)

---

<a name="apa-itu-array-intersection"></a>
## 🔍 Apa itu Array Intersection?

**Array intersection** adalah operasi untuk mencari **elemen-elemen yang ada di dua array sekaligus** — alias elemen yang sama-sama muncul di kedua array itu.

Bayangin dua lingkaran yang tumpang tindih (seperti diagram Venn). Bagian yang tumpang tindih itu lah yang disebut **intersection**.

Fungsinya menerima dua array sebagai input, lalu mengembalikan satu array baru berisi elemen yang ada di keduanya.

```
arrayIntersection(arr1, arr2) → [elemen yang ada di arr1 DAN arr2]
```

---

<a name="contoh-kasus"></a>
## 🎯 Contoh Kasus

| Input Array 1 | Input Array 2 | Output |
|---|---|---|
| `[1, 2, 3, 4, 5]` | `[1, 3, 7, 9]` | `[1, 3]` |
| `[1, 1, 1]` | `[2, 2, 2]` | `[]` ← tidak ada elemen sama |
| `[1, 2, 3, 4, 5]` | `[5, 4, 3, 2, 1]` | `[1, 2, 3, 4, 5]` ← semua sama |
| `[1, 2, 3, 4, 5]` | `[3, 4, 5, 6, 7]` | `[3, 4, 5]` |

> 💡 **Catatan:** Kalau tidak ada elemen yang sama sama sekali, hasilnya adalah **array kosong** `[]`, bukan error atau `null`.

---

<a name="batasan-soal"></a>
## 📌 Batasan Soal

- Array input bisa berisi **berapa pun elemen** (tidak ada batasan jumlah)
- Elemen di dalam array adalah **bilangan bulat positif**
- Elemen yang sama tidak perlu ditulis dua kali di output (unik)

---

<a name="solusi-1"></a>
## 🏗️ Solusi 1 — Pakai `for` Loop + `includes()`

Pendekatan paling klasik dan mudah dipahami. Idenya sederhana:
1. Loop satu per satu elemen di array pertama
2. Cek apakah elemen itu ada di array kedua pakai `.includes()`
3. Kalau ada, dan belum masuk ke hasil, tambahkan ke array hasil

```javascript
function arrayIntersection(arr1, arr2) {
  // Siapkan array kosong untuk menampung hasil
  const intersection = [];

  // Loop satu per satu elemen di arr1
  for (let i = 0; i < arr1.length; i++) {

    // Cek dua kondisi sekaligus:
    // 1. Apakah arr1[i] ada di arr2?
    // 2. Apakah arr1[i] belum ada di intersection? (hindari duplikat)
    if (arr2.includes(arr1[i]) && !intersection.includes(arr1[i])) {
      intersection.push(arr1[i]); // Kalau lolos dua kondisi, masukkan ke hasil
    }
  }

  return intersection; // Kembalikan array hasil
}
```

### 🧩 Penjelasan Baris per Baris

| Baris | Penjelasan |
|---|---|
| `const intersection = []` | Buat "wadah" kosong untuk menampung elemen yang cocok |
| `for (let i = 0; i < arr1.length; i++)` | Loop dari elemen pertama sampai terakhir di `arr1` |
| `arr2.includes(arr1[i])` | Cek apakah elemen ini ada di `arr2` |
| `!intersection.includes(arr1[i])` | Pastikan elemen ini belum pernah dimasukkan sebelumnya (cegah duplikat) |
| `intersection.push(arr1[i])` | Kalau lolos, tambahkan ke array hasil |
| `return intersection` | Kembalikan hasilnya |

> 💡 **Method `.includes()`** akan mengembalikan `true` jika elemen ditemukan di array, dan `false` kalau tidak. Mirip kayak nanya: *"hei array, apakah kamu punya angka ini?"*

---

<a name="solusi-2"></a>
## ⚡ Solusi 2 — Pakai `Set` + `has()`

Cara kedua ini menggunakan struktur data bernama **Set**. Perbedaannya dengan array biasa: **Set selalu menyimpan nilai yang unik** — tidak ada duplikat di dalamnya.

```javascript
function arrayIntersection(arr1, arr2) {
  // Buat Set dari arr1 — otomatis semua nilainya unik
  const set1 = new Set(arr1);

  // Siapkan array kosong untuk hasil
  const intersection = [];

  // Loop pakai "for...of" — cara lain yang lebih ringkas dari for biasa
  for (let num of arr2) {

    // Cek apakah num ada di set1 pakai method .has()
    if (set1.has(num)) {
      intersection.push(num);
    }
  }

  return intersection;
}
```

### 🧩 Penjelasan Baris per Baris

| Baris | Penjelasan |
|---|---|
| `new Set(arr1)` | Buat Set dari `arr1`. Kalau ada duplikat di `arr1`, otomatis dihapus |
| `for (let num of arr2)` | Loop melalui setiap elemen `arr2`. `num` = nilai elemen saat itu |
| `set1.has(num)` | Cek apakah `num` ada di Set. Method `.has()` khusus untuk Set |
| `intersection.push(num)` | Kalau ada, masukkan ke hasil |

### 🗂️ Apa itu `Set`?

`Set` adalah struktur data di JavaScript yang:
- Menyimpan nilai-nilai unik (tidak ada duplikat)
- Punya method `.has()` untuk mengecek apakah suatu nilai ada di dalamnya

Contoh singkat:
```javascript
const mySet = new Set([1, 2, 2, 3, 3, 3]);
console.log(mySet); // Set { 1, 2, 3 } ← duplikat dihapus otomatis

mySet.has(2); // true
mySet.has(5); // false
```

> 💡 Di solusi ini, karena `Set` sudah otomatis unik, kita tidak perlu cek `!intersection.includes()` seperti di Solusi 1. Caranya lebih ringkas!

---

<a name="solusi-3"></a>
## 🧹 Solusi 3 — Pakai `for...of` + `includes()`

Solusi ini menggabungkan yang terbaik dari Solusi 1 dan Solusi 2 — logikanya sama dengan Solusi 1, tapi ditulis lebih bersih dengan `for...of` seperti Solusi 2. Nama variabelnya juga lebih deskriptif.

```javascript
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

### 🧩 Penjelasan Baris per Baris

| Baris | Penjelasan |
|---|---|
| `const result = []` | Buat array kosong untuk menampung hasil |
| `for (const item of firstArray)` | Loop tiap elemen di `firstArray`. `item` = nilai elemen saat itu |
| `secondArray.includes(item)` | Cek apakah `item` ada di `secondArray` |
| `!result.includes(item)` | Pastikan `item` belum ada di hasil (cegah duplikat) |
| `result.push(item)` | Kalau lolos dua kondisi, masukkan ke hasil |
| `return result` | Kembalikan hasilnya |

---

<a name="perbandingan"></a>
## 🔬 Perbandingan Tiga Solusi

| Aspek | Solusi 1 (`for` + `includes`) | Solusi 2 (`Set` + `has`) | Solusi 3 (`for...of` + `includes`) |
|---|---|---|---|
| **Kesulitan** | Mudah dipahami | Butuh tahu tentang `Set` | Mudah dipahami |
| **Loop yang dipakai** | `for` biasa dengan index `i` | `for...of` | `for...of` (lebih ringkas) |
| **Cara cek** | `.includes()` pada array | `.has()` pada Set | `.includes()` pada array |
| **Cegah duplikat** | Manual dengan `!intersection.includes()` | Otomatis karena `Set` unik | Manual dengan `!result.includes()` |
| **Nama variabel** | Singkat (`arr1`, `i`) | Singkat (`arr1`, `num`) | Deskriptif (`firstArray`, `item`) |
| **Hasil** | Sama ✅ | Sama ✅ | Sama ✅ |

Keduanya menghasilkan output yang **sama persis**. Pilih yang mana pun sesuai yang lebih kamu mengerti!

---

<a name="menjalankan-test"></a>
## ✅ Menjalankan Test

File test sudah siap di `array-intersection.test.js`. Untuk menjalankannya:

```bash
npm test
```

Isi test yang diuji:

```javascript
// Test 1: Elemen yang sama ada di tengah
arrayIntersection([1, 2, 3, 4, 5], [3, 4, 5, 6, 7]) // → [3, 4, 5]

// Test 2: Hanya satu elemen yang sama
arrayIntersection([10, 20, 30], [30, 40, 50]) // → [30]

// Test 3: Tidak ada elemen yang sama → array kosong
arrayIntersection([1, 2, 3], [4, 5, 6]) // → []
```

Kalau semua test hijau ✅, berarti solusimu sudah benar!

---

> 📝 **Catatan pribadi:** Challenge ini mirip dengan challenge *Find Duplicates* yang sebelumnya. Bedanya, kalau duplicates mencari elemen yang muncul lebih dari sekali dalam **satu** array, sedangkan intersection mencari elemen yang muncul di **dua** array berbeda.