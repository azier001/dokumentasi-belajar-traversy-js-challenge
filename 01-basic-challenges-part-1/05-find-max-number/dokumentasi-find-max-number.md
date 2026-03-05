# 🔢 Find Max Number — Catatan Belajar JavaScript

> 📝 **Catatan pribadi** dari video tutorial. Dokumentasi ini dibuat biar gampang dibaca ulang kapan aja!

---

## 📚 Daftar Isi

- 🔍 [Apa itu Challenge Ini?](#pengenalan)
- 🎯 [Tujuan Fungsi](#tujuan-fungsi)
- ✨ [Solusi 1 — Cara Singkat dengan `Math.max()`](#solusi-1)
- 🔄 [Solusi 2 — Cara Manual dengan `for` Loop](#solusi-2)
- 🌀 [Solusi 3 — Lebih Clean dengan `for...of`](#solusi-3)
- 🧪 [Test Cases](#test-cases)
- 💡 [Kesimpulan](#kesimpulan)

---

<a name="pengenalan"></a>
## 🔍 Apa itu Challenge Ini?

Challenge ini namanya **Find Max Number**. Tugasnya sederhana: cari angka terbesar dari sebuah array.

Ini adalah latihan yang bagus buat pemula karena mengajarkan dua hal sekaligus:
1. Cara pakai **built-in method** bawaan JavaScript
2. Cara berpikir lebih **low-level** dengan loop manual

---

<a name="tujuan-fungsi"></a>
## 🎯 Tujuan Fungsi

```js
/**
 * @param {number[]} arr - array berisi angka-angka
 * @returns {number} - angka terbesar dari array tersebut
 */
function findMaxNumber(arr) { ... }
```

> 💡 **Catatan:** Kalau kamu lihat notasi `number[]`, itu artinya "array yang isinya angka-angka". Kurung siku `[]` di belakang tipe data = array dari tipe tersebut.

**Contoh perilaku yang diharapkan:**

| Input | Output |
|-------|--------|
| `[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]` | `10` |
| `[2, 1, 9, 16, 10]` | `16` |
| `[1, 5, 3, 9, 2]` | `9` |

---

<a name="solusi-1"></a>
## ✨ Solusi 1 — Cara Singkat dengan `Math.max()`

JavaScript punya object bawaan bernama `Math` yang berisi berbagai fungsi matematika. Salah satunya adalah `Math.max()` — fungsi ini bisa menerima beberapa angka dan langsung mengembalikan yang terbesar.

```js
// Contoh penggunaan Math.max() biasa:
Math.max(3, 7, 2); // → 7
```

Tapi masalahnya, kita punya **array**, bukan angka-angka yang diketik satu per satu. Di sinilah **spread operator** (`...`) berguna — fungsinya "membuka" array jadi elemen-elemen individual.

```js
// Tanpa spread — ini TIDAK bisa:
Math.max([3, 7, 2]); // → NaN (tidak berhasil)

// Dengan spread — ini BISA! ✅
Math.max(...[3, 7, 2]); // → 7
```

### Kode lengkapnya:

```js
// Solusi 1: Pakai Math.max() + spread operator
const findMaxNumber = (numbers) => Math.max(...numbers);
```

> ⚡ **Singkat banget!** Tapi di tutorial ini, cara ini dianggap "jalan pintas". Boleh dipakai, tapi ada baiknya juga paham cara manualnya.

---

<a name="solusi-2"></a>
## 🔄 Solusi 2 — Cara Manual dengan `for` Loop

Ini cara yang lebih **low-level** — kita sendiri yang ngecek satu per satu elemen array-nya.

### Logika dasarnya:

1. Anggap elemen **pertama** sebagai angka terbesar sementara (`max`)
2. Loop mulai dari elemen **kedua** (karena elemen pertama sudah jadi `max`)
3. Kalau ada elemen yang **lebih besar** dari `max`, ganti nilai `max` dengan elemen itu
4. Setelah loop selesai, kembalikan nilai `max`

### Kode lengkapnya:

```js
// Solusi 2: Manual pakai for loop
function findMaxNumber(arr) {
  // Langkah 1: set elemen pertama sebagai max awal
  let max = arr[0];

  // Langkah 2: mulai loop dari index 1 (elemen kedua)
  for (let i = 1; i < arr.length; i++) {
    // Langkah 3: kalau elemen ini lebih besar, dia jadi max baru
    if (arr[i] > max) {
      max = arr[i];
    }
  }

  // Langkah 4: kembalikan max setelah loop selesai
  return max;
}
```

### 🔍 Ilustrasi cara kerjanya:

Misalnya array-nya `[2, 9, 4, 16, 1]`:

| Iterasi | `i` | `arr[i]` | `max` sekarang | Keterangan |
|---------|-----|----------|----------------|------------|
| Awal    | —   | —        | `2`            | `arr[0]` jadi nilai awal |
| 1       | 1   | `9`      | `9`            | 9 > 2, jadi `max` diganti |
| 2       | 2   | `4`      | `9`            | 4 < 9, `max` tetap |
| 3       | 3   | `16`     | `16`           | 16 > 9, jadi `max` diganti |
| 4       | 4   | `1`      | `16`           | 1 < 16, `max` tetap |

✅ **Hasil:** `16` — benar!

> 💡 **Kenapa mulai dari `i = 1`?** Karena kita sudah menetapkan `arr[0]` sebagai nilai `max` awal. Kalau mulai dari `i = 0` lagi, itu cuma akan membandingkan elemen pertama dengan dirinya sendiri — buang-buang langkah.

---

<a name="solusi-3"></a>
## 🌀 Solusi 3 — Lebih Clean dengan `for...of`

Ini variasi dari Solusi 2, tapi lebih bersih karena kita **tidak perlu index** (`i`) sama sekali. Cukup langsung akses nilainya.

Bedanya sama Solusi 2:
- Nilai awal `max` di-set ke `-Infinity` — angka yang pasti lebih kecil dari angka apapun
- Loop bisa mulai dari elemen **pertama** langsung, tidak perlu skip

```js
// Solusi 3: Pakai for...of — lebih simpel!
function findMaxNumber(numbers) {
  let max = -Infinity;

  for (const number of numbers) {
    if (number > max) max = number;
  }

  return max;
}
```

### Kenapa pakai `-Infinity` sebagai nilai awal?

Kalau kita pakai `arr[0]` seperti Solusi 2, kita harus hati-hati dengan index. Dengan `-Infinity`, semua angka — termasuk angka negatif sekalipun — pasti lebih besar, jadi loop bisa berjalan dari awal tanpa masalah.

```js
-Infinity < -999999  // → true ✅
-Infinity < 0        // → true ✅
-Infinity < 999999   // → true ✅
```

> 🧹 **Kapan pakai `for...of` vs `for` biasa?** Kalau kamu tidak butuh index (`i`), `for...of` selalu jadi pilihan yang lebih bersih dan mudah dibaca!

---

<a name="test-cases"></a>
## 🧪 Test Cases

Untuk memastikan fungsi bekerja dengan benar, kita jalankan test pakai **Jest** dengan perintah `npm test`.

```js
// find-max-number.test.js
const findMaxNumber = require('./find-max-number');

test('Finding the maximum number in an array', () => {
  expect(findMaxNumber([1, 5, 3, 9, 2])).toBe(9);    // max jelas di tengah
  expect(findMaxNumber([0, -1, -5, 2])).toBe(2);      // ada angka negatif
  expect(findMaxNumber([10, 10, 10, 10])).toBe(10);   // semua angka sama
});
```

Ketiga test case ini menguji berbagai kondisi:
- **Test 1:** Angka terbesar ada di tengah-tengah array
- **Test 2:** Ada angka negatif — fungsi harus tetap bisa menemukan yang terbesar
- **Test 3:** Semua angka sama — hasilnya ya angka itu sendiri

✅ **Ketiga solusi di atas lulus semua test!**

---

<a name="kesimpulan"></a>
## 💡 Kesimpulan

| | Solusi 1 (`Math.max`) | Solusi 2 (`for` loop) | Solusi 3 (`for...of`) |
|---|---|---|---|
| **Panjang kode** | 1 baris | ~8 baris | ~6 baris |
| **Kemudahan baca** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| **Nilai belajar** | Tahu method bawaan JS | Paham logika & index | Paham logika, kode lebih clean |
| **Direkomendasikan untuk belajar?** | Boleh, tapi jangan hanya ini | ✅ Ya! | ✅ Ya, bahkan lebih disarankan! |

> 🎓 **Pesan dari tutorial:** Tidak ada yang "salah" dari pakai `Math.max()`. Tapi dengan latihan cara manual, kamu benar-benar **mengerti** apa yang terjadi di balik layar — dan itu jauh lebih berharga untuk jangka panjang!