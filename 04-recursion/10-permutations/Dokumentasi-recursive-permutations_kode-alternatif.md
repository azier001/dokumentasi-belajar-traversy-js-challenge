# 🔄 Permutations — Eksplorasi Kode Alternatif

> _Dokumentasi lanjutan dari catatan Permutations sebelumnya. File ini bisa dibaca secara mandiri (standalone)._

---

## 📋 Daftar Isi

- 🎯 [Recap Singkat: Apa itu Permutations?](#recap)
- 🤔 [3 Pertanyaan Inti Rekursi](#3-pertanyaan-inti-rekursi)
- 💻 [3 Kode Alternatif](#3-kode-alternatif)
  - [Alternatif 1 — `for` loop + `push(...spread)`](#alternatif-1)
  - [Alternatif 2 — `flatMap` + `[...str]`](#alternatif-2)
  - [Alternatif 3 — `flatMap` + `filter`](#alternatif-3)
- 🌳 [Diagram Rekursi Tree](#diagram-rekursi-tree)
- 📊 [Tabel Perbandingan Semua Varian](#tabel-perbandingan)
- 🎯 [Kapan Pakai Masing-masing?](#kapan-pakai)

---

<a name="recap"></a>
## 🎯 Recap Singkat: Apa itu Permutations?

**Permutations** adalah semua kemungkinan susunan karakter dari sebuah string.

Contoh untuk `"abc"`:

```
abc, acb, bac, bca, cab, cba
```

> 💡 **Intinya:** urutan karakter yang berbeda-beda, tapi semua karakter tetap dipakai.

Polanya selalu sama, apapun implementasinya:
1. Ambil satu karakter
2. Rekursi pada sisa karakter
3. Gabungkan karakter tadi ke depan setiap hasil rekursi
4. Ulangi untuk semua karakter

---

<a name="3-pertanyaan-inti-rekursi"></a>
## 🤔 3 Pertanyaan Inti Rekursi

Sebelum nulis kode rekursi apapun, ada framework sederhana yang bisa selalu dipakai sebagai titik awal berpikir. Cukup jawab 3 pertanyaan ini, dan struktur fungsinya akan terbentuk sendiri.

> 💡 **Kenapa 3 pertanyaan ini penting?** Karena setiap fungsi rekursif — apapun topiknya — selalu punya tiga hal: titik mulai, arah gerak, dan kondisi berhenti. Kalau ketiga ini sudah jelas, nulis kodenya jadi jauh lebih mudah. Framework ini bisa kamu pakai ulang untuk challenge rekursi lain di masa depan.

Diterapkan ke Permutations:

| Pertanyaan | Jawaban |
|---|---|
| 🚀 Mulai dari mana? | String yang di-pass ke fungsi (`str`) |
| ➡️ Bergerak ke mana? | Ke bawah — `str` yang makin pendek setiap langkah rekursi |
| 🛑 Berhenti kapan? | Saat `str.length <= 1` (base case sudah tercapai) |

Dari tabel di atas, kita sudah bisa "membaca" struktur kodenya sebelum menulisnya:
- **Mulai dari `str`** → parameter fungsi kita adalah `str`
- **Bergerak ke string lebih pendek** → recursive call-nya adalah `permutations(remainingChars)` di mana `remainingChars` selalu lebih pendek dari `str`
- **Berhenti saat `str.length <= 1`** → base case-nya adalah `if (str.length <= 1) return [str]`

---

<a name="3-kode-alternatif"></a>
## 💻 3 Kode Alternatif

---

<a name="alternatif-1"></a>
### Alternatif 1 — `for` loop + `push(...spread)`

```js
const permutations = (str) => {
  if (str.length <= 1) return [str]

  const result = []

  for (let i = 0; i < str.length; i++) {
    const remainingChars = str.slice(0, i) + str.slice(i + 1)
    const recursiveResult = permutations(remainingChars)
    const mappedResult = recursiveResult.map(perm => str[i] + perm)

    result.push(...mappedResult)
  }

  return result
}
```

#### 🔍 Penjelasan Step by Step

---

**① Base case — kondisi berhenti rekursi**
```js
if (str.length <= 1) return [str]
```

Kalau string hanya 1 karakter (atau kosong), tidak ada lagi yang perlu dipermutasi — hanya ada satu susunan yang mungkin, yaitu string itu sendiri. Maka langsung return array berisi string itu.

Contoh:
```js
permutations("a") // → ["a"]
permutations("")  // → [""]
```

> ⚠️ **Kenapa return `[str]` bukan `str` langsung?**
> Karena fungsi ini selalu harus return **array**. Kalau return string biasa, nanti `.map()` dan `.push()` di level atasnya akan error. Konsistensi tipe return itu penting di rekursi.

---

**② Siapkan array penampung hasil**
```js
const result = []
```

Array kosong ini akan diisi satu per satu dengan semua permutasi yang kita temukan selama loop berlangsung.

---

**③ Loop setiap karakter — ambil `str[i]` sebagai "karakter saat ini"**
```js
for (let i = 0; i < str.length; i++) {
```

Loop ini berjalan dari index `0` sampai `str.length - 1`. Di setiap iterasi, kita "memilih" satu karakter (`str[i]`) untuk dijadikan karakter pertama dari permutasi yang sedang dibangun.

Untuk `str = "abc"`, loop berjalan 3x:
```
i = 0 → str[i] = "a"
i = 1 → str[i] = "b"
i = 2 → str[i] = "c"
```

---

**④ Buat `remainingChars` — string tanpa karakter yang sedang diproses**
```js
const remainingChars = str.slice(0, i) + str.slice(i + 1)
```

`str.slice(0, i)` mengambil semua karakter **sebelum** index `i`.
`str.slice(i + 1)` mengambil semua karakter **setelah** index `i`.
Keduanya digabungkan → hasilnya adalah string tanpa karakter di index `i`.

Visualisasi lengkap untuk `str = "abc"`:

```
i = 0 → slice(0,0)="" + slice(1)="bc" → remainingChars = "bc"
i = 1 → slice(0,1)="a" + slice(2)="c" → remainingChars = "ac"
i = 2 → slice(0,2)="ab" + slice(3)="" → remainingChars = "ab"
```

---

**⑤ Rekursi — minta permutasi dari sisa string**
```js
const recursiveResult = permutations(remainingChars)
```

Di sini kita memanggil fungsi yang sama (`permutations`), tapi dengan string yang **1 karakter lebih pendek**. Fungsi akan terus terpanggil secara berantai sampai mencapai base case (`length <= 1`).

Contoh hasilnya:
```js
permutations("bc") // → ["bc", "cb"]
permutations("ac") // → ["ac", "ca"]
permutations("ab") // → ["ab", "ba"]
```

---

**⑥ Gabungkan karakter saat ini ke depan setiap sub-permutasi**
```js
const mappedResult = recursiveResult.map(perm => str[i] + perm)
```

`.map()` berjalan ke setiap elemen di `recursiveResult`, lalu menambahkan `str[i]` di depannya.

Contoh saat `i = 0` (karakter `"a"`):
```js
// recursiveResult = ["bc", "cb"]
// str[i] = "a"
["bc", "cb"].map(perm => "a" + perm)
// → ["abc", "acb"]
```

---

**⑦ Masukkan hasil ke `result` dengan spread**
```js
result.push(...mappedResult)
```

`...mappedResult` adalah **spread operator** — ia "membuka" array dan memasukkan setiap elemennya satu per satu ke `result`.

Perbedaan penting:
```js
result.push(mappedResult)    // ❌ push 1 array → result = [["abc", "acb"]]
result.push(...mappedResult) // ✅ push tiap elemen → result = ["abc", "acb"]
```

Setelah semua 3 iterasi loop selesai, `result` terkumpul jadi:
```js
["abc", "acb", "bac", "bca", "cab", "cba"]
```

---

**⑧ Return hasil akhir**
```js
return result
```

Setelah loop selesai, semua permutasi sudah terkumpul di `result`. Kembalikan array tersebut ke pemanggil fungsi (bisa level rekursi di atasnya, atau caller asli).

---

<a name="alternatif-2"></a>
### Alternatif 2 — `flatMap` + `[...str]`

```js
const permutations = (str) => {
  if (str.length <= 1) return [str];

  return [...str].flatMap((char, i) => {
    const remainingChars = str.slice(0, i) + str.slice(i + 1);
    return permutations(remainingChars).map((perm) => char + perm);
  });
};
```

#### 🔍 Penjelasan Step by Step

---

**① Base case — sama seperti Alternatif 1**
```js
if (str.length <= 1) return [str];
```

Tidak ada yang baru di sini — kalau string sudah 1 karakter atau kosong, langsung return array berisi string itu sendiri. Ini adalah titik berhenti rekursi.

---

**② `[...str]` — ubah string jadi array karakter**
```js
[...str]
```

Spread operator `...` bisa "membuka" string menjadi array karakter satu per satu.

```js
[..."abc"] // → ["a", "b", "c"]
[..."dog"] // → ["d", "o", "g"]
```

Kenapa perlu diubah ke array dulu? Karena `.flatMap()` hanya bisa dipanggil di array, bukan di string.

---

**③ `.flatMap((char, i) => ...)` — loop sekaligus ratakan hasil**
```js
[...str].flatMap((char, i) => {
  ...
})
```

`.flatMap()` adalah kombinasi dari dua operasi sekaligus:
- **`.map()`** → transformasi setiap elemen menjadi nilai baru (bisa berupa array)
- **`.flat()`** → ratakan satu level kedalaman array

Tanpa `flatMap`, kalau kita pakai `.map()` biasa, hasilnya akan **bersarang**:
```js
// Bayangkan pakai .map() biasa:
["a", "b", "c"].map(...) 
// → [["abc", "acb"], ["bac", "bca"], ["cab", "cba"]]  ❌ bersarang!

// Dengan .flatMap():
["a", "b", "c"].flatMap(...)
// → ["abc", "acb", "bac", "bca", "cab", "cba"]  ✅ rata!
```

`.flatMap()` juga menerima dua parameter di callback-nya:
- `char` → nilai elemen saat ini (karakter)
- `i` → index elemen saat ini

```js
[..."abc"].flatMap((char, i) => {
  // iterasi 1: char = "a", i = 0
  // iterasi 2: char = "b", i = 1
  // iterasi 3: char = "c", i = 2
})
```

---

**④ `remainingChars` pakai `str.slice` — identik dengan Alternatif 1**
```js
const remainingChars = str.slice(0, i) + str.slice(i + 1);
```

Logikanya sama persis dengan Alternatif 1 — ambil semua karakter kecuali yang di index `i`.

```
i = 0 → slice(0,0)="" + slice(1)="bc" → remainingChars = "bc"
i = 1 → slice(0,1)="a" + slice(2)="c" → remainingChars = "ac"
i = 2 → slice(0,2)="ab" + slice(3)="" → remainingChars = "ab"
```

---

**⑤ Rekursi + gabungkan — langsung di dalam `flatMap`**
```js
return permutations(remainingChars).map((perm) => char + perm);
```

Ini menggabungkan dua langkah dalam satu baris:
1. `permutations(remainingChars)` → dapatkan semua sub-permutasi dari sisa string
2. `.map((perm) => char + perm)` → tambahkan `char` ke depan setiap sub-permutasi

Contoh saat `char = "a"` dan `remainingChars = "bc"`:
```js
permutations("bc")              // → ["bc", "cb"]
  .map((perm) => "a" + perm)    // → ["abc", "acb"]
```

Nilai return ini (array `["abc", "acb"]`) langsung dikonsumsi oleh `.flatMap()` dan diratakan ke hasil akhir.

> 💡 **Perhatikan:** tidak ada variabel `result` yang dibuat secara manual di sini. `.flatMap()` menangani pengumpulan dan perataan hasil secara otomatis — inilah yang membuat Alternatif 2 lebih ringkas dari Alternatif 1.

---

<a name="alternatif-3"></a>
### Alternatif 3 — `flatMap` + `filter`

```js
const permutations = (str) => {
  if (str.length <= 1) return [str];

  return [...str].flatMap((char, i) => {
    const remainingChars = [...str].filter((_, j) => j !== i).join('');

    return permutations(remainingChars).map((perm) => char + perm);
  });
};
```

#### 🔍 Penjelasan Step by Step

Alternatif 3 strukturnya **identik dengan Alternatif 2** — base case, `flatMap`, rekursi, dan `.map()` semuanya sama. Satu-satunya perbedaan ada di cara membuat `remainingChars`.

---

**① Perbedaan utama: `remainingChars` pakai `filter` + `join`**

**Alternatif 2 — pakai `slice`:**
```js
const remainingChars = str.slice(0, i) + str.slice(i + 1);
```

**Alternatif 3 — pakai `filter`:**
```js
const remainingChars = [...str].filter((_, j) => j !== i).join('');
```

Mari bedah Alternatif 3 baris per baris:

---

**② `[...str]` — ubah string jadi array karakter (lagi)**
```js
[...str]
// "abc" → ["a", "b", "c"]
```

Perlu diubah ke array dulu karena `.filter()` adalah method array, bukan method string.

> 💡 Perhatikan bahwa di dalam `.flatMap()` kita sudah punya `[...str]` di luar. Tapi di dalam callback, kita buat `[...str]` lagi — ini adalah spread baru yang independen, bukan yang sama. Tidak masalah secara fungsional, hanya sedikit redundan.

---

**③ `.filter((_, j) => j !== i)` — buang karakter di index `i`**
```js
[...str].filter((_, j) => j !== i)
```

`.filter()` menerima callback dengan dua parameter:
- `_` → nilai elemen (karakter) — **sengaja diabaikan**, makanya pakai `_`
- `j` → index elemen saat ini

Kondisi `j !== i` artinya: **pertahankan semua elemen kecuali yang index-nya sama dengan `i`**.

Contoh lengkap saat `str = "abc"`:
```
i = 0 → filter semua j !== 0 → ["b", "c"]  (buang "a")
i = 1 → filter semua j !== 1 → ["a", "c"]  (buang "b")
i = 2 → filter semua j !== 2 → ["a", "b"]  (buang "c")
```

> 💡 **Kenapa parameter pertama pakai `_` (underscore)?**
> Ini adalah konvensi JavaScript yang sudah umum — `_` dipakai untuk menandai parameter yang **sengaja tidak dipakai**. Kita tidak butuh nilai karakternya di sini, hanya butuh index `j`-nya. Pakai `_` membuat niat kita jelas ke pembaca kode.

---

**④ `.join('')` — gabungkan array kembali jadi string**
```js
.filter((_, j) => j !== i).join('')
```

Setelah `.filter()` menghasilkan array karakter, `.join('')` menggabungkannya kembali jadi satu string. Separator-nya adalah string kosong `''` agar tidak ada spasi atau karakter pemisah di antara huruf.

```js
["b", "c"].join('') // → "bc"
["a", "c"].join('') // → "ac"
["a", "b"].join('') // → "ab"
```

---

**⑤ Alur lengkap `remainingChars` untuk `str = "abc"`, `i = 1`**

```js
// 1. Spread ke array
[..."abc"]                          // → ["a", "b", "c"]

// 2. Filter buang index i=1
.filter((_, j) => j !== 1)          // → ["a", "c"]

// 3. Join kembali jadi string
.join('')                           // → "ac"
```

Hasil: `remainingChars = "ac"` — sama persis dengan yang dihasilkan Alternatif 2 via `slice`.

---

**⑥ Sisanya identik dengan Alternatif 2**
```js
return permutations(remainingChars).map((perm) => char + perm);
```

Rekursi pada `remainingChars`, lalu gabungkan `char` ke depan setiap hasil. Tidak ada yang baru di sini.

---

<a name="diagram-rekursi-tree"></a>
## 🌳 Diagram Rekursi Tree

Diagram berikut menunjukkan bagaimana rekursi berjalan untuk input `"abc"`. Semua 3 alternatif mengikuti pola yang **sama persis** — hanya cara penulisannya yang berbeda.

```
permutations("abc")
│
├── char = "a", remainingChars = "bc"
│   └── permutations("bc")
│       ├── char = "b", remainingChars = "c"
│       │   └── permutations("c")
│       │       └── BASE CASE → return ["c"]
│       │   → map: "b" + "c" = "bc"
│       │
│       └── char = "c", remainingChars = "b"
│           └── permutations("b")
│               └── BASE CASE → return ["b"]
│           → map: "c" + "b" = "cb"
│
│       └── return ["bc", "cb"]
│   → map: "a" + "bc" = "abc", "a" + "cb" = "acb"
│
├── char = "b", remainingChars = "ac"
│   └── permutations("ac") → ["ac", "ca"]
│   → map: "b" + "ac" = "bac", "b" + "ca" = "bca"
│
└── char = "c", remainingChars = "ab"
    └── permutations("ab") → ["ab", "ba"]
    → map: "c" + "ab" = "cab", "c" + "ba" = "cba"

─────────────────────────────────────────
Final result: ["abc", "acb", "bac", "bca", "cab", "cba"]
─────────────────────────────────────────
```

### 📐 Pola Kedalaman Rekursi

Setiap level rekursi, panjang string berkurang 1:

```
Level 0:  permutations("abc")   ← panjang 3, dipanggil 1x
Level 1:  permutations("bc")    ← panjang 2, dipanggil 3x
          permutations("ac")
          permutations("ab")
Level 2:  permutations("c")     ← panjang 1, dipanggil 6x (BASE CASE)
          permutations("b")
          permutations("a")
          ... dst
```

> 💡 Kenapa level 2 dipanggil 6x? Karena ada **3 pilihan** di level 0 × **2 pilihan** di level 1 = **6 call** di level 2. Ini sesuai dengan rumus permutasi: `n! = 3! = 6`.

---

<a name="tabel-perbandingan"></a>
## 📊 Tabel Perbandingan Semua Varian

Termasuk kode utama dari dokumentasi sebelumnya untuk perbandingan lengkap.

| | Kode Utama | Alternatif 1 | Alternatif 2 | Alternatif 3 |
|---|---|---|---|---|
| **Gaya penulisan** | `function` declaration | Arrow function `=>` | Arrow function `=>` | Arrow function `=>` |
| **Base case** | `length === 0` → `['']` | `length <= 1` → `[str]` | `length <= 1` → `[str]` | `length <= 1` → `[str]` |
| **Loop** | `for` loop manual | `for` loop manual | `.flatMap()` | `.flatMap()` |
| **Buat `remainingChars`** | `slice + slice` | `slice + slice` | `slice + slice` | `filter + join` |
| **Gabung hasil** | `for` loop + `push()` | `.map()` + `push(...spread)` | `.map()` di dalam `flatMap` | `.map()` di dalam `flatMap` |
| **Semicolon** | Pakai `;` | Tanpa `;` | Pakai `;` | Pakai `;` |
| **Tingkat keterbacaan** | ⭐⭐⭐⭐⭐ Paling eksplisit | ⭐⭐⭐⭐ Jelas | ⭐⭐⭐ Ringkas | ⭐⭐⭐ Ringkas |
| **Kebutuhan pengetahuan JS** | Dasar | Dasar + spread | Menengah (`flatMap`) | Menengah (`filter`, `flatMap`) |

### 💡 Catatan Perbedaan Penting

**Perbedaan base case:**
- Kode utama: berhenti saat string **kosong** (`length === 0`), return `['']`
- Semua alternatif: berhenti saat string **1 karakter atau kosong** (`length <= 1`), return `[str]`

Keduanya menghasilkan output yang **sama persis** karena matematika rekursinya identik. Tapi versi `length <= 1` sedikit lebih efisien — tidak perlu satu level rekursi ekstra untuk string 1 karakter.

**Perbedaan `remainingChars` (Alternatif 2 vs 3):**
```js
// Alternatif 2 — slice (lebih umum)
str.slice(0, i) + str.slice(i + 1)

// Alternatif 3 — filter (lebih ekspresif)
[...str].filter((_, j) => j !== i).join('')
```
Keduanya menghasilkan hal yang sama. `filter` lebih mudah dibaca seperti kalimat ("ambil semua kecuali index i"), tapi sedikit lebih banyak operasi di belakang layar.

---

<a name="kapan-pakai"></a>
## 🎯 Kapan Pakai Masing-masing?

| Situasi | Rekomendasi |
|---|---|
| 🎓 Belajar rekursi untuk pertama kali | **Kode Utama** — paling eksplisit, mudah di-debug |
| 📝 Interview / whiteboard coding | **Alternatif 1** — jelas, mudah dijelaskan step by step |
| ⚡ Kode produksi, tim familiar dengan JS modern | **Alternatif 2** — paling ringkas dan idiomatik |
| 🔍 Ingin kode yang "berbunyi seperti kalimat" | **Alternatif 3** — `filter` sangat readable untuk yang terbiasa |

### 📌 Ringkasan Singkat

- **Kode Utama & Alternatif 1** → pilih kalau prioritasmu adalah **keterbacaan dan kejelasan**
- **Alternatif 2** → pilih kalau prioritasmu adalah **keringkasan dan gaya fungsional**
- **Alternatif 3** → pilih kalau prioritasmu adalah **ekspresivitas** (`filter` sangat deskriptif)

> 📌 **Catatan akhir:** Semua varian menghasilkan output yang identik. Tidak ada yang "lebih benar" dari yang lain — pilihannya tergantung konteks, preferensi tim, dan seberapa familiar pembaca dengan method JavaScript modern. Yang paling penting: pilih yang paling mudah kamu jelaskan ke orang lain!