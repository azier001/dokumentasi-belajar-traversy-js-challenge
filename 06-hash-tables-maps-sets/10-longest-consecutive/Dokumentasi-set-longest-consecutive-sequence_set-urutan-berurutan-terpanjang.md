# 🔗 Challenge: Longest Consecutive Sequence

> **Tantangan ini menguji kemampuanmu dalam menemukan urutan bilangan bulat berurutan (_consecutive_) terpanjang di dalam sebuah array, menggunakan struktur data `Set` untuk efisiensi optimal.**

---

## 📑 Daftar Isi

- 🎯 [Pengenalan](#pengenalan)
- 📋 [Instruksi Challenge](#instruksi-challenge)
- 📌 [Contoh Input & Output](#contoh-input--output)
- ⚠️ [Batasan](#batasan)
- 💡 [Petunjuk](#petunjuk)
- 🏗️ [Langkah-Langkah Membangun Solusi](#langkah-langkah-membangun-solusi)
  - 🧱 [Langkah 1 — Buat Set dari Array](#langkah-1--buat-set-dari-array)
  - 🔍 [Langkah 2 — Cari Titik Awal Sequence](#langkah-2--cari-titik-awal-sequence)
  - 🔄 [Langkah 3 — Telusuri Sequence dengan While Loop](#langkah-3--telusuri-sequence-dengan-while-loop)
  - 📊 [Langkah 4 — Simpan Sequence Terpanjang](#langkah-4--simpan-sequence-terpanjang)
- ✅ [Kode Solusi Lengkap](#kode-solusi-lengkap)
- 🔬 [Cara Kerja Step-by-Step](#cara-kerja-step-by-step)
- 🧪 [Test Cases](#test-cases)
- 📝 [Catatan Penting](#catatan-penting)

---

<a name="pengenalan"></a>
## 🎯 Pengenalan

Dalam challenge ini, kita akan membuat fungsi bernama `longestConsecutiveSequence`. Fungsi ini menerima sebuah **array berisi bilangan bulat** sebagai input, dan tugasnya adalah mengembalikan **panjang urutan bilangan berurutan terpanjang** yang ada di dalam array tersebut.

### Apa itu *Consecutive Sequence*?

**Consecutive sequence** (urutan berurutan) adalah rangkaian angka di mana setiap angka **tepat satu lebih besar** dari angka sebelumnya. Contoh: `1, 2, 3, 4` — itu adalah consecutive sequence dengan panjang 4.

> 💡 **Poin penting:** Angka-angka yang berurutan **tidak harus bersebelahan** di dalam array. Mereka bisa tersebar di mana saja. Yang penting adalah angka-angka tersebut membentuk urutan berurutan secara nilai (1→2→3→4), bukan secara posisi di array.

---

<a name="instruksi-challenge"></a>
## 📋 Instruksi Challenge

Buatlah sebuah fungsi bernama `longestConsecutiveSequence` yang:
- **Menerima** sebuah array berisi bilangan bulat (`nums`)
- **Mengembalikan** panjang urutan bilangan berurutan terpanjang di dalam array tersebut

### 🔧 Function Signature

```js
/**
 * Returns the length of the longest consecutive sequence in the array.
 * @param {number[]} nums - An array of integers.
 * @returns {number} - The length of the longest consecutive sequence.
 */
function longestConsecutiveSequence(nums: number[]): number
```

---

<a name="contoh-input--output"></a>
## 📌 Contoh Input & Output

**Contoh 1:**

```js
longestConsecutiveSequence([100, 4, 200, 1, 3, 2]);
// Output: 4
```

Kenapa hasilnya **4**? Karena di dalam array tersebut ada angka `1, 2, 3, 4` — itu adalah **4 angka berurutan** (*consecutive*). Angka-angka itu tidak harus berada di awal atau di akhir array, dan tidak harus bersebelahan. Yang penting mereka membentuk urutan: **1 → 2 → 3 → 4**.

**Contoh 2:**

```js
longestConsecutiveSequence([0, 3, 7, 2, 5, 8, 4, 6, 9, 1]);
// Output: 10
```

Kenapa hasilnya **10**? Karena semua angka di array ini membentuk satu urutan panjang: **0 → 1 → 2 → 3 → 4 → 5 → 6 → 7 → 8 → 9** — total 10 angka berurutan!

---

<a name="batasan"></a>
## ⚠️ Batasan

- Array input hanya akan berisi **bilangan bulat** (*integers*)
- Array input **mungkin mengandung bilangan duplikat** — tapi jangan khawatir, karena kita pakai `Set` yang secara otomatis **mengabaikan duplikat**

---

<a name="petunjuk"></a>
## 💡 Petunjuk

- Gunakan `Set` untuk menemukan urutan berurutan di dalam array secara **efisien**
- `Set` memungkinkan kita memeriksa apakah suatu angka ada atau tidak dalam waktu **konstan** (*O(1)*)

---

<a name="langkah-langkah-membangun-solusi"></a>
## 🏗️ Langkah-Langkah Membangun Solusi

Mari kita bangun solusinya **step by step**, persis seperti di video tutorial.

---

<a name="langkah-1--buat-set-dari-array"></a>
### 🧱 Langkah 1 — Buat Set dari Array

Pertama, kita buat fungsinya dan konversi array input menjadi `Set`:

```js
function longestConsecutiveSequence(nums) {
  // Buat Set dari array input
  const numSet = new Set(nums);
  // Variabel untuk menyimpan panjang sequence terpanjang
  let longestSequence = 0;
}
```

**Kenapa pakai `Set`?**
- `Set` secara otomatis **menghilangkan angka duplikat**
- `Set` memungkinkan kita **mengecek keberadaan angka** dengan sangat cepat menggunakan method `.has()`
- Kita juga inisialisasi `longestSequence` dengan `0` — ini nanti akan menyimpan panjang sequence terpanjang yang kita temukan

---

<a name="langkah-2--cari-titik-awal-sequence"></a>
### 🔍 Langkah 2 — Cari Titik Awal Sequence

Sekarang kita loop semua angka di `Set`, dan cari mana yang merupakan **titik awal** dari sebuah sequence:

```js
for (const num of numSet) {
  // Cek apakah angka sebelumnya (num - 1) TIDAK ada di Set
  if (!numSet.has(num - 1)) {
    let currentNum = num;
    let currentSequence = 1;
  }
}
```

**Ini bagian paling pintar dari algoritma ini!** 🧠

Logikanya begini: kalau kita menemukan angka `num` di mana `num - 1` **tidak ada** di Set, berarti **tidak ada angka yang lebih kecil** yang bisa datang sebelum `num` untuk membentuk sequence. Artinya, `num` adalah **titik awal** dari sebuah consecutive sequence!

> **Contoh:** Dengan array `[100, 4, 200, 1, 3, 2]`:
> - Angka `1` → apakah `0` ada di Set? **Tidak!** ✅ Jadi `1` adalah titik awal sequence
> - Angka `2` → apakah `1` ada di Set? **Ya!** ❌ Jadi `2` bukan titik awal (dia bagian dari sequence yang dimulai dari `1`)
> - Angka `100` → apakah `99` ada di Set? **Tidak!** ✅ Jadi `100` adalah titik awal sequence (tapi sequence-nya cuma 1 angka)

Kita set `currentNum` ke angka saat ini dan `currentSequence` ke `1` karena kita sudah menemukan elemen pertama.

---

<a name="langkah-3--telusuri-sequence-dengan-while-loop"></a>
### 🔄 Langkah 3 — Telusuri Sequence dengan While Loop

Masih di dalam `if`, kita tambahkan `while` loop untuk menelusuri angka-angka berikutnya:

```js
while (numSet.has(currentNum + 1)) {
  currentNum++;
  currentSequence++;
}
```

Loop ini akan **terus berjalan** selama angka berikutnya (`currentNum + 1`) ada di Set. Setiap kali ketemu, kita:
- **Naikkan** `currentNum` (pindah ke angka berikutnya)
- **Naikkan** `currentSequence` (tambah panjang sequence)

> **Contoh proses:** Dimulai dari angka `1`:
> - Apakah `2` ada? ✅ → `currentNum = 2`, `currentSequence = 2`
> - Apakah `3` ada? ✅ → `currentNum = 3`, `currentSequence = 3`
> - Apakah `4` ada? ✅ → `currentNum = 4`, `currentSequence = 4`
> - Apakah `5` ada? ❌ → **Berhenti!** Sequence-nya adalah `[1, 2, 3, 4]` dengan panjang **4**

---

<a name="langkah-4--simpan-sequence-terpanjang"></a>
### 📊 Langkah 4 — Simpan Sequence Terpanjang

Setelah `while` loop selesai, kita bandingkan panjang sequence yang baru ditemukan dengan yang sebelumnya:

```js
longestSequence = Math.max(longestSequence, currentSequence);
```

`Math.max()` akan memilih nilai yang **lebih besar** antara `longestSequence` (sequence terpanjang sebelumnya) dan `currentSequence` (sequence yang baru saja kita temukan). Ini memastikan kita selalu menyimpan yang terpanjang.

> Ingat, bisa saja ada **lebih dari satu sequence** di dalam array. Makanya kita perlu membandingkan setiap kali menemukan sequence baru.

---

<a name="kode-solusi-lengkap"></a>
## ✅ Kode Solusi Lengkap

<details>
  <summary>Klik Untuk Melihat Solusi</summary>

```js
function longestConsecutiveSequence(nums) {
  // Buat Set dari array input
  const numSet = new Set(nums);
  // Variabel untuk menyimpan panjang sequence terpanjang
  let longestSequence = 0;

  // Loop setiap angka di Set
  for (const num of numSet) {
    // Jika num - 1 TIDAK ada di Set, berarti num adalah titik awal sequence
    if (!numSet.has(num - 1)) {
      let currentNum = num;
      let currentSequence = 1;

      // Telusuri angka berikutnya selama masih berurutan
      while (numSet.has(currentNum + 1)) {
        currentNum++;
        currentSequence++;
      }

      // Simpan sequence terpanjang
      longestSequence = Math.max(longestSequence, currentSequence);
    }
  }

  // Kembalikan panjang sequence terpanjang
  return longestSequence;
}

module.exports = longestConsecutiveSequence;
```

</details>

---

<a name="cara-kerja-step-by-step"></a>
## 🔬 Cara Kerja Step-by-Step

Mari kita telusuri bagaimana fungsi ini bekerja dengan input `[100, 4, 200, 1, 3, 2]`:

**1️⃣ Buat Set:**

```
numSet = {100, 4, 200, 1, 3, 2}
longestSequence = 0
```

**2️⃣ Loop dimulai:**

| Iterasi | `num` | `num - 1` ada? | Titik awal? | Proses |
|---------|-------|-----------------|-------------|--------|
| 1 | `100` | `99` → ❌ | ✅ Ya | Cek `101` → ❌. Sequence: `[100]`, panjang: **1** |
| 2 | `4` | `3` → ✅ | ❌ Bukan | *Skip* — `4` bukan titik awal |
| 3 | `200` | `199` → ❌ | ✅ Ya | Cek `201` → ❌. Sequence: `[200]`, panjang: **1** |
| 4 | `1` | `0` → ❌ | ✅ Ya | Cek `2` → ✅, `3` → ✅, `4` → ✅, `5` → ❌. Sequence: `[1,2,3,4]`, panjang: **4** |
| 5 | `3` | `2` → ✅ | ❌ Bukan | *Skip* |
| 6 | `2` | `1` → ✅ | ❌ Bukan | *Skip* |

**3️⃣ Hasil akhir:** `longestSequence = 4` ✅

> 💡 Perhatikan bahwa angka `4`, `3`, dan `2` di-*skip* karena mereka **bukan titik awal** sequence. Ini membuat algoritma sangat **efisien** — kita tidak perlu mengecek sequence dari setiap angka, cukup dari titik awalnya saja!

---

<a name="test-cases"></a>
## 🧪 Test Cases

```js
test('Longest Consecutive Sequence', () => {
  expect(longestConsecutiveSequence([100, 4, 200, 1, 3, 2])).toBe(4);
  expect(longestConsecutiveSequence([0, 3, 7, 2, 5, 8, 4, 6, 9, 1])).toBe(10);
});
```

### 🏃 Cara Menjalankan

Kamu bisa menjalankan fungsi ini secara manual dengan file runner:

```js
const longestConsecutiveSequence = require('./longest-consecutive');

const result = longestConsecutiveSequence([100, 4, 200, 1, 3, 2]);
console.log(result); // Output: 4
```

Kalau kamu tambahkan angka `5` ke array → `[100, 4, 200, 1, 3, 2, 5]`, hasilnya akan menjadi **5** karena sekarang sequence terpanjangnya adalah `[1, 2, 3, 4, 5]`.

---

<a name="catatan-penting"></a>
## 📝 Catatan Penting

> ⚡ **Kenapa `let` bukan `const`?** Di video, awalnya variabel `longestSequence` dideklarasikan dengan `const`, yang menyebabkan error `"Assignment to constant variable"`. Ini karena `const` tidak bisa di-*reassign*. Solusinya: gunakan `let` karena nilainya akan berubah di dalam loop.

> 🎓 **Tentang `Set`:** Ingat bahwa `Set` secara otomatis **mengabaikan nilai duplikat**. Jadi kalau array input punya angka duplikat, kita tidak perlu khawatir — `Set` akan menanganinya.

> 🔑 **Kunci efisiensi:** Trik utama algoritma ini adalah **hanya memulai pengecekan sequence dari titik awalnya** (angka yang `num - 1`-nya tidak ada di Set). Ini menghindari pengecekan berulang dan membuat algoritmanya sangat efisien.
