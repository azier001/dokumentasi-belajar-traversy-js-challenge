# 🔁 Array Sum dengan Rekursi

> 📝 *Dokumentasi pribadi — berdasarkan video tutorial JavaScript Recursion*

---

## 📚 Daftar Isi

- 🎯 [Pengenalan](#pengenalan)
- 🧩 [Apa yang Ingin Kita Selesaikan?](#apa-yang-ingin-kita-selesaikan)
- 🏗️ [Membangun Fungsi arraySum](#membangun-fungsi-arraysum)
- 🤔 [3 Pertanyaan Inti Rekursi](#3-pertanyaan-inti-rekursi)
- 🔍 [Base Case — Kondisi Berhenti](#base-case)
- 🔄 [Recursive Case — Memanggil Diri Sendiri](#recursive-case)
- 🎬 [Kode Lengkap](#kode-lengkap)
- 🎞️ [Simulasi Langkah demi Langkah](#simulasi)
- ⏪ [Proses Unwinding — Nilai Mulai Terkumpul](#unwinding)
- ✅ [Test Cases](#test-cases)

---

<a name="pengenalan"></a>
## 🎯 Pengenalan

Challenge ini sengaja dibuat **lebih mudah** dari challenge rekursi sebelumnya. Tujuannya supaya kamu yang masih berjuang bisa merasakan berhasil mengerjakan rekursi sendiri. Jadi jangan khawatir kalau belum bisa — ini memang titik awal yang bagus!

> 💡 **Ingat:** Di dunia nyata, kamu bisa pakai `reduce()` untuk menjumlahkan array. Tapi di sini kita latihan rekursi, jadi kita gunakan cara rekursif.

---

<a name="apa-yang-ingin-kita-selesaikan"></a>
## 🧩 Apa yang Ingin Kita Selesaikan?

Kita ingin membuat fungsi bernama `arraySum` yang:

- **Menerima** sebuah array berisi angka
- **Mengembalikan** total penjumlahan semua angka di dalamnya

Contohnya:

```js
arraySum([1, 2, 3, 4, 5]); // → 15
arraySum([-1, -2, -3, -4, -5]); // → -15
arraySum([]); // → 0
```

Array bisa berisi angka **positif maupun negatif**.

---

<a name="membangun-fungsi-arraysum"></a>
## 🏗️ Membangun Fungsi arraySum

Setiap fungsi rekursif punya dua bagian penting:

| Bagian | Artinya |
|---|---|
| **Base Case** | Kondisi berhenti — supaya rekursi tidak jalan selamanya |
| **Recursive Case** | Bagian yang memanggil fungsi itu sendiri dengan data yang lebih kecil |

---

<a name="3-pertanyaan-inti-rekursi"></a>
## 🤔 3 Pertanyaan Inti Rekursi

Sebelum nulis kode rekursi apapun, ada framework sederhana yang bisa selalu dipakai sebagai titik awal berpikir. Cukup jawab 3 pertanyaan ini, dan struktur fungsinya akan terbentuk sendiri.

> 💡 **Kenapa 3 pertanyaan ini penting?** Karena setiap fungsi rekursif — apapun topiknya — selalu punya tiga hal: titik mulai, arah gerak, dan kondisi berhenti. Kalau ketiga ini sudah jelas, nulis kodenya jadi jauh lebih mudah. Framework ini bisa kamu pakai ulang untuk challenge rekursi lain di masa depan.

Diterapkan ke Array Sum:

| Pertanyaan | Jawaban |
|---|---|
| 🚀 Mulai dari mana? | Array yang di-pass ke fungsi (`arr`) |
| ➡️ Bergerak ke mana? | Ke depan — membuang elemen pertama dengan `arr.slice(1)` setiap langkah |
| 🛑 Berhenti kapan? | Saat `arr.length === 0` (array sudah kosong, base case tercapai) |

Dari tabel di atas, kita sudah bisa "membaca" struktur kodenya sebelum menulisnya:

- **Mulai dari `arr`** → parameter fungsi kita adalah `arr`
- **Bergerak ke `arr.slice(1)`** → recursive call-nya adalah `arraySum(arr.slice(1))`
- **Berhenti saat `arr.length === 0`** → base case-nya adalah `if (arr.length === 0) return 0`

---

<a name="base-case"></a>
## 🔍 Base Case — Kondisi Berhenti

**Pertanyaan:** Kapan kita harus berhenti?

**Jawaban:** Ketika array sudah **kosong** — tidak ada lagi yang perlu dijumlahkan, jadi kita kembalikan `0`.

```js
if (arr.length === 0) {
  return 0; // array kosong → jumlahnya 0
}
```

> 🛑 Tanpa base case, fungsi akan terus memanggil dirinya sendiri tanpa henti dan menyebabkan error!

---

<a name="recursive-case"></a>
## 🔄 Recursive Case — Memanggil Diri Sendiri

**Idenya:** Ambil elemen **pertama** dari array, lalu tambahkan dengan hasil penjumlahan **sisa arraynya**.

```js
return arr[0] + arraySum(arr.slice(1));
```

Penjelasan tiap bagian:

- `arr[0]` → elemen pertama array
- `arr.slice(1)` → array baru yang dimulai dari index ke-1 (membuang elemen pertama)
- `arraySum(arr.slice(1))` → memanggil fungsi yang sama dengan array yang sudah lebih kecil

> 🔑 **Kuncinya:** Setiap pemanggilan rekursif, array mengecil satu elemen, sampai akhirnya kosong dan menyentuh base case.

---

<a name="kode-lengkap"></a>
## 🎬 Kode Lengkap

### `array-sum.js`

Ini isi fungsi utamanya:

```js
function arraySum(arr) {
  // Base case: kalau array kosong, kembalikan 0
  if (arr.length === 0) {
    return 0;
  } else {
    // Recursive case: elemen pertama + jumlah sisa array
    return arr[0] + arraySum(arr.slice(1));
  }
}

module.exports = arraySum;
```

### `array-sum-run.js`

File untuk mencoba menjalankan fungsi:

```js
const arraySum = require('./array-sum');

const result = arraySum([1, 2, 3, 4, 5]);

console.log(result); // Output: 15
```

---

<a name="simulasi"></a>
## 🎞️ Simulasi Langkah demi Langkah

Supaya lebih paham, mari kita telusuri apa yang terjadi saat kita memanggil `arraySum([1, 2, 3, 4, 5])`:

```
arraySum([1, 2, 3, 4, 5])
  → 1 + arraySum([2, 3, 4, 5])
         → 2 + arraySum([3, 4, 5])
                → 3 + arraySum([4, 5])
                       → 4 + arraySum([5])
                              → 5 + arraySum([])
                                     → 0  ✅ BASE CASE!
```

Di sini fungsi terus memanggil dirinya sendiri dengan array yang semakin kecil, sampai akhirnya array kosong dan base case tercapai.

---

<a name="unwinding"></a>
## ⏪ Proses Unwinding — Nilai Mulai Terkumpul

Setelah base case tercapai, semua pemanggilan yang "menunggu" tadi mulai **kembali dan menghitung nilainya**. Ini disebut **unwinding**:

```
arraySum([])           → 0
arraySum([5])          → 5 + 0  = 5
arraySum([4, 5])       → 4 + 5  = 9
arraySum([3, 4, 5])    → 3 + 9  = 12
arraySum([2, 3, 4, 5]) → 2 + 12 = 14
arraySum([1, 2, 3, 4, 5]) → 1 + 14 = 15 🎉
```

> 🧠 **Analogi:** Bayangkan kamu menaruh buku satu per satu ke tumpukan. Base case itu saat kamu berhenti menambah buku. Unwinding itu saat kamu mengambilnya satu per satu dari atas — dan menghitung nilainya.

---

<a name="test-cases"></a>
## ✅ Test Cases

### `array-sum.test.js`

```js
const arraySum = require('./array-sum');

test('Calculate Sum of Array Using Recursion', () => {
  expect(arraySum([1, 2, 3, 4, 5])).toEqual(15);   // angka positif
  expect(arraySum([-1, -2, -3, -4, -5])).toEqual(-15); // angka negatif
  expect(arraySum([])).toEqual(0);                  // array kosong
});
```

Jalankan dengan:

```bash
npm test
```

Kalau semua test hijau ✅ — berarti fungsi kamu sudah benar!

---

> 🎓 **Takeaway:** Rekursi itu pada dasarnya adalah memecah masalah besar jadi masalah kecil yang sama, sampai kamu mencapai kasus paling sederhana (base case). Setelah itu, hasilnya dikumpulkan kembali saat proses unwinding.