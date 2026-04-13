# 🔁 Catatan Belajar — Symmetric Difference

> Dokumentasi pribadi dari video tutorial. Ditulis ulang biar lebih mudah dipahami.

---

## 📚 Daftar Isi

- 🔍 [Apa itu Symmetric Difference?](#apa-itu-symmetric-difference)
- 💡 [Contoh-Contoh Kasusnya](#contoh-contoh-kasusnya)
- 🧰 [Senjata Utama: JavaScript `Set`](#senjata-utama-javascript-set)
- 🏗️ [Cara Bikin Solusinya](#cara-bikin-solusinya)
- 📄 [Kode Lengkap + Penjelasan Tiap Baris](#kode-lengkap--penjelasan-tiap-baris)
- 🧪 [Test Cases & Hasil](#test-cases--hasil)

---

<a name="apa-itu-symmetric-difference"></a>
## 🔍 Apa itu Symmetric Difference?

**Symmetric difference** adalah cara kita menemukan elemen-elemen yang **hanya ada di salah satu array**, tapi **tidak di keduanya sekaligus**.

Bayangkan dua kelompok orang:
- Kelompok A: { 1, 2, 3 }
- Kelompok B: { 3, 4, 5 }

Yang **ada di keduanya** → angka **3** (ini kita buang)
Yang **hanya di A atau hanya di B** → angka **1, 2, 4, 5** (ini yang kita ambil) ✅

> Satu aturan penting lagi: **tidak boleh ada duplikat** di hasil akhirnya.

---

<a name="contoh-contoh-kasusnya"></a>
## 💡 Contoh-Contoh Kasusnya

Mari kita lihat 4 contoh yang dibahas di video:

### Kasus 1 — Ada elemen yang sama di tengah
```js
symmetricDifference([1, 2, 3], [3, 4, 5]);
// Output: [1, 2, 4, 5]
```
> Angka **3** ada di kedua array → dibuang. Sisanya diambil semua.

---

### Kasus 2 — Ada duplikat di dalam array
```js
symmetricDifference([1, 2, 2, 3, 4], [2, 3, 3, 4, 5]);
// Output: [1, 5]
```
> Array pertama punya dua angka **2**, array kedua punya dua angka **3** — tapi karena 2, 3, dan 4 ada di keduanya, yang tersisa hanya **1** dan **5**.

---

### Kasus 3 — Semua elemen sama (urutan beda tidak masalah)
```js
symmetricDifference([1, 2, 3, 4, 5], [5, 4, 3, 2, 1]);
// Output: []
```
> Semua angka ada di kedua array → hasilnya array kosong `[]`.

---

### Kasus 4 — Tidak ada elemen yang sama sama sekali
```js
symmetricDifference([1, 2, 3], [4, 5, 6]);
// Output: [1, 2, 3, 4, 5, 6]
```
> Tidak ada yang sama → semua elemen dari kedua array diambil.

---

<a name="senjata-utama-javascript-set"></a>
## 🧰 Senjata Utama: JavaScript `Set`

Di challenge ini, kita pakai **`Set`** sebagai alat bantu utama. Kenapa `Set`? Karena `Set` punya dua keunggulan:

### ✅ Keunggulan 1 — `Set` otomatis buang duplikat

Ini yang didemonstrasikan langsung di video. Coba perhatikan:

```js
// Misalkan arr1 = [1, 2, 3, 3, 3, 3]  ← ada banyak angka 3
const set1 = new Set(arr1);
// set1 → {1, 2, 3}  ← angka 3 yang dobel dibuang otomatis!
```

> Jadi walaupun array aslinya penuh duplikat, `Set` akan menyimpan tiap nilai **hanya sekali**.

---

### ✅ Keunggulan 2 — Pengecekan elemen super cepat dengan `.has()`

Kita bisa dengan mudah mengecek apakah suatu angka ada di dalam `Set`:

```js
set2.has(num)   // → true kalau num ada di set2
                // → false kalau num tidak ada di set2
```

Ini yang kita pakai untuk memfilter elemen mana yang "unik" dan mana yang "dobel di keduanya".

---

<a name="cara-bikin-solusinya"></a>
## 🏗️ Cara Bikin Solusinya

Strateginya sederhana, cukup 3 langkah:

```
Langkah 1 → Buat Set dari arr1 dan arr2
                  (duplikat langsung hilang otomatis)

Langkah 2 → Loop arr1, cek tiap elemen:
                  "Apakah angka ini ADA di set2?"
                  Kalau TIDAK ada → masukkan ke result

Langkah 3 → Loop arr2, cek tiap elemen:
                  "Apakah angka ini ADA di set1?"
                  Kalau TIDAK ada → masukkan ke result
```

> Kenapa kita cek ke `Set`, bukan langsung ke array? Karena `Set` sudah bersih dari duplikat. Kalau kita cek ke array, duplikat bisa bocor ke hasil akhir.

---

<a name="kode-lengkap--penjelasan-tiap-baris"></a>
## 📄 Kode Lengkap + Penjelasan Tiap Baris

```js
function symmetricDifference(arr1, arr2) {
  // Buat Set dari kedua array
  // → duplikat di arr1 & arr2 langsung dihapus otomatis
  const set1 = new Set(arr1);
  const set2 = new Set(arr2);

  // Tempat menyimpan hasil akhir
  const result = [];

  // Loop pertama: periksa tiap angka di arr1
  // → kalau angka itu TIDAK ada di set2, berarti dia unik di arr1
  for (const num of arr1) {
    if (!set2.has(num)) {
      result.push(num);  // masukkan ke hasil
    }
  }

  // Loop kedua: periksa tiap angka di arr2
  // → kalau angka itu TIDAK ada di set1, berarti dia unik di arr2
  for (const num of arr2) {
    if (!set1.has(num)) {
      result.push(num);  // masukkan ke hasil
    }
  }

  // Kembalikan array berisi semua elemen yang unik
  return result;
}

module.exports = symmetricDifference;
```

---

### 🔎 Contoh Cara Kerjanya (Trace Manual)

Misalkan kita panggil:
```js
symmetricDifference([1, 2, 3], [2, 3, 4]);
```

**Setelah bikin Set:**
```
set1 = {1, 2, 3}
set2 = {2, 3, 4}
result = []
```

**Loop pertama (arr1 → cek ke set2):**
```
num = 1 → set2.has(1)? ❌ Tidak → result.push(1) → result = [1]
num = 2 → set2.has(2)? ✅ Ya   → skip
num = 3 → set2.has(3)? ✅ Ya   → skip
```

**Loop kedua (arr2 → cek ke set1):**
```
num = 2 → set1.has(2)? ✅ Ya   → skip
num = 3 → set1.has(3)? ✅ Ya   → skip
num = 4 → set1.has(4)? ❌ Tidak → result.push(4) → result = [1, 4]
```

**Hasil akhir:** `[1, 4]` ✅

---

### 📁 File Pendukung

File `symmetric-difference-run.js` dipakai buat **mencoba kode secara manual** sebelum test:

```js
// symmetric-difference-run.js
const symmetricDifference = require('./symmetric-difference');

const result = symmetricDifference([1, 2, 3], [2, 3, 4]);
console.log(result);
// Output: [1, 4]
```

> Di video, file ini sempat diutak-atik buat demo bahwa `Set` menghapus duplikat — misalnya memasukkan banyak angka 3, tapi `Set` tetap hanya menyimpan satu angka 3.

---

<a name="test-cases--hasil"></a>
## 🧪 Test Cases & Hasil

Semua test cases di bawah ini **lulus (pass)** setelah kode dijalankan:

```js
// symmetric-difference.test.js
const symmetricDifference = require('./symmetric-difference');

test('Symmetric Difference of Two Arrays', () => {
  expect(symmetricDifference([1, 2, 3], [3, 4, 5])).toEqual([1, 2, 4, 5]);
  expect(symmetricDifference([1, 2, 2, 3, 4], [2, 3, 3, 4, 5])).toEqual([1, 5]);
  expect(symmetricDifference([1, 2, 3, 4, 5], [5, 4, 3, 2, 1])).toEqual([]);
  expect(symmetricDifference([1, 2, 3], [4, 5, 6])).toEqual([1, 2, 3, 4, 5, 6]);
});
```

| Input | Hasil yang Diharapkan | Keterangan |
|---|---|---|
| `[1,2,3]` vs `[3,4,5]` | `[1,2,4,5]` | 3 ada di keduanya, dibuang |
| `[1,2,2,3,4]` vs `[2,3,3,4,5]` | `[1,5]` | 2,3,4 ada di keduanya |
| `[1,2,3,4,5]` vs `[5,4,3,2,1]` | `[]` | Semua sama, hasilnya kosong |
| `[1,2,3]` vs `[4,5,6]` | `[1,2,3,4,5,6]` | Tidak ada yang sama, semua masuk |

---

> 💬 **Kesimpulan singkat:** Pakailah `Set` saat kamu butuh data tanpa duplikat dan pengecekan elemen yang cepat. Di challenge ini, dua `Set` + dua `for...of` loop sudah cukup untuk menyelesaikan masalah dengan elegan.
