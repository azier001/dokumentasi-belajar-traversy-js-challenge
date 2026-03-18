# 📘 Dokumentasi: Highest Scoring Word

Catatan belajar pribadi dari video tutorial JavaScript — challenge menemukan kata dengan skor alfabet tertinggi.

---

## 📋 Daftar Isi

- 🎯 [Pengenalan Challenge](#pengenalan)
- 🔢 [Sistem Penilaian Huruf](#sistem-penilaian)
- 💡 [Konsep Kunci: charCodeAt](#charcodes)
- 🛠️ [Solusi 1 — Video: Map + For Loop + Manual Loop](#solusi-1)
- ✨ [Solusi 2 — Video: Map + Reduce + Math.max](#solusi-2)
- 🔁 [Solusi 3 — For...of Langsung (Tanpa Array Scores)](#solusi-3)
- 🚀 [Solusi 4 — Full Pipeline (Map + Reduce Berantai)](#solusi-4)
- 🧪 [Test Cases](#test-cases)
  - 📋 Test Resmi
  - 📊 Test Cases Tambahan
  - ▶️ Runner Test Manual

---

<a name="pengenalan"></a>
## 🎯 Pengenalan Challenge

Tantangannya sederhana: diberikan sebuah string berisi beberapa kata, **temukan kata yang memiliki skor paling tinggi**.

```js
highestScoringWord('man i need a taxi up to ubud'); // 'taxi'
```

> Kenapa `taxi`? Karena huruf **X** nilainya tinggi — dia dekat dengan akhir alfabet!

### Aturan Main
- Setiap huruf punya nilai sesuai posisi di alfabet: `a = 1`, `b = 2`, ..., `z = 26`
- Jumlahkan nilai semua huruf dalam satu kata → itulah skor kata tersebut
- Kembalikan kata dengan skor tertinggi
- Kalau ada dua kata dengan skor sama → pilih yang muncul lebih awal
- Input dijamin hanya huruf kecil dan spasi, tidak ada angka atau tanda baca

---

<a name="sistem-penilaian"></a>
## 🔢 Sistem Penilaian Huruf

Bayangkan ini seperti **Scrabble** — huruf-huruf yang jarang dipakai (dan letaknya di akhir alfabet) nilainya lebih tinggi.

| Huruf | Nilai |
|-------|-------|
| `a`   | 1     |
| `b`   | 2     |
| `z`   | 26    |
| `x`   | 24    |
| `y`   | 25    |

Contoh perhitungan skor dari tutorial:

| Kata    | Skor |
|---------|------|
| hello   | 52   |
| my      | 38   |
| name    | 33   |
| is      | 28   |
| xavier  | 79   ✅ |

> `xavier` menang karena punya huruf `x` (24) dan beberapa huruf bernilai tinggi lainnya.

---

<a name="charcodes"></a>
## 💡 Konsep Kunci: `charCodeAt`

Sebelum ke solusinya, kita perlu paham satu trik JavaScript penting:

```js
'a'.charCodeAt(0); // 97
'b'.charCodeAt(0); // 98
'z'.charCodeAt(0); // 122
```

JavaScript punya sistem Unicode — setiap karakter punya nomor uniknya. Huruf kecil `a` dimulai dari **97**.

**Trik-nya:** karena kita mau `a = 1`, tinggal kurangi 96:

```js
'a'.charCodeAt(0) - 96; // 97 - 96 = 1  ✅
'b'.charCodeAt(0) - 96; // 98 - 96 = 2  ✅
'z'.charCodeAt(0) - 96; // 122 - 96 = 26 ✅
```

> 💬 Ingat: `charCodeAt(0)` — angka `0` artinya kita ambil karakter di indeks pertama. Karena kita memanggil ini pada satu huruf saja, selalu pakai `0`.

---

<a name="solusi-1"></a>
## 🛠️ Solusi 1 — Video: Map + For Loop + Manual Loop

Pendekatan dari video — lebih panjang tapi mudah dibaca dan dipahami langkah per langkahnya.

**Pola pikir solusi ini:** pisahkan dua pekerjaan — *hitung semua skor dulu*, baru *cari yang tertinggi*.

### Langkah 1 — Pecah string jadi array kata

```js
const words = str.split(' ');
// 'hello my name' → ['hello', 'my', 'name']
```

### Langkah 2 — Hitung skor tiap kata dengan `map`

```js
const scores = words.map((word) => {
  let score = 0;

  for (const letter of word) {
    score += letter.charCodeAt(0) - 96;
  }

  return score;
});
// ['hello', 'my', 'name'] → [52, 38, 33]
```

Kita gunakan `for...of` untuk loop tiap huruf dalam sebuah kata, lalu tambahkan nilainya ke variabel `score`.

### Langkah 3 — Cari kata dengan skor tertinggi

```js
let highestScore = 0;
let highestIndex = 0;

for (let i = 0; i < scores.length; i++) {
  if (scores[i] > highestScore) {
    highestScore = scores[i];
    highestIndex = i;
  }
}

return words[highestIndex];
```

Loop biasa yang membandingkan skor satu per satu. Kalau skor saat ini lebih besar dari `highestScore`, update kedua variabel itu.

### Kode Lengkap Solusi 1

```js
function highestScoringWord(str) {
  const words = str.split(' ');

  const scores = words.map((word) => {
    let score = 0;
    for (const letter of word) {
      score += letter.charCodeAt(0) - 96;
    }
    return score;
  });

  let highestScore = 0;
  let highestIndex = 0;

  for (let i = 0; i < scores.length; i++) {
    if (scores[i] > highestScore) {
      highestScore = scores[i];
      highestIndex = i;
    }
  }

  return words[highestIndex];
}
```

---

<a name="solusi-2"></a>
## ✨ Solusi 2 — Video: Map + Reduce + Math.max

Solusi ini menghasilkan output yang sama dengan Solusi 1, tapi lebih pendek karena mengganti `for...of` di dalam `map` dengan `reduce`, dan mengganti manual loop dengan `Math.max`.

> ⚠️ Tidak lebih "cepat" secara performa, hanya lebih ringkas secara penulisan.

### Perbedaan Utama: Menghitung Skor dengan `reduce`

Daripada menulis `for...of` + variabel `score`, kita bisa pakai `reduce` langsung:

```js
// Ubah kata jadi array huruf dulu dengan Array.from()
Array.from('hello') // ['h', 'e', 'l', 'l', 'o']

// Lalu reduce untuk menjumlahkan skor tiap huruf
Array.from('hello').reduce(
  (score, letter) => score + letter.charCodeAt(0) - 96,
  0  // ← nilai awal accumulator (score dimulai dari 0)
);
```

`reduce` bekerja seperti ini:
- Mulai dari nilai awal `0`
- Tiap iterasi: `score` (akumulator) + nilai huruf saat ini
- Hasil akhir: total skor kata tersebut

### Mencari Nilai Tertinggi dengan `Math.max`

Setelah punya array skor, kita tidak perlu loop manual lagi:

```js
const scores = [52, 38, 33, 28, 79];

const highestScore = Math.max(...scores); // 79
// Spread operator (...) diperlukan karena Math.max butuh argumen terpisah,
// bukan array
```

### Mencari Indeks dengan `indexOf`

```js
const highestIndex = scores.indexOf(highestScore);
// Mencari posisi angka 79 di dalam array → index 4
```

> 💡 `indexOf` otomatis mengembalikan indeks **pertama** jika ada nilai duplikat — cocok dengan aturan "pilih kata yang muncul lebih awal"!

### Kode Lengkap Solusi 2

```js
const highestScoringWord = (str) => {
  const words = str.split(' ');

  const scores = words.map((word) =>
    Array.from(word).reduce(
      (score, letter) => score + letter.charCodeAt(0) - 96,
      0
    )
  );

  const highestScore = Math.max(...scores);
  const highestIndex = scores.indexOf(highestScore);

  return words[highestIndex];
};
```

---

<a name="solusi-3"></a>
## 🔁 Solusi 3 — For...of Langsung (Tanpa Array Scores)

Ini versi yang saya tulis sendiri. Bedanya dengan Solusi 1: **tidak membuat array `scores` terpisah**. Scoring dan pencarian kata terbaik dilakukan sekaligus dalam satu loop.

### 🏪 Analogi: Kasir yang Langsung Catat Pemenang

Bayangkan kamu adalah kasir di lomba kata. Di Solusi 1, kamu **mencatat semua total belanja dulu** ke selembar kertas, baru setelah selesai kamu lihat angka terbesar.

Di Solusi 3, kamu lebih efisien: **langsung di kepala** — kalau ada pelanggan baru yang totalnya lebih besar dari rekor sebelumnya, kamu update catatanmu. Tidak perlu kertas tambahan.

### 🔍 Visualisasi Alur Step-by-Step

Input: `'hello my xavier'`

```
str.split(' ')
→ ['hello', 'my', 'xavier']

Iterasi 1 — word: 'hello'
  h(8) + e(5) + l(12) + l(12) + o(15) = 52
  52 > highestScore(-Infinity)? ✅ → highestScore = 52, highestWord = 'hello'

Iterasi 2 — word: 'my'
  m(13) + y(25) = 38
  38 > highestScore(52)? ❌ → tidak ada update

Iterasi 3 — word: 'xavier'
  x(24) + a(1) + v(22) + i(9) + e(5) + r(18) = 79
  79 > highestScore(52)? ✅ → highestScore = 79, highestWord = 'xavier'

return 'xavier' ✅
```

### 🔄 Perbandingan dengan Solusi 1

| | Solusi 1 | Solusi 3 |
|---|---|---|
| Array `scores` | ✅ Ada | ❌ Tidak ada |
| Jumlah loop | 2 (map + for) | 1 (for...of luar + for...of dalam) |
| Variabel yang disimpan | `highestScore` + `highestIndex` | `highestScore` + `highestWord` |
| Simpan indeks atau kata? | Simpan **indeks**, ambil kata di akhir | Simpan **kata** langsung |

> 💡 Perbedaan paling menarik: Solusi 1 menyimpan `highestIndex` lalu ambil kata via `words[highestIndex]`. Solusi 3 langsung menyimpan `highestWord` — lebih langsung ke tujuan!

### Kode Lengkap Solusi 3

```js
function highestScoringWord(str) {
  const words = str.split(' ');

  let highestScore = -Infinity; // bukan 0, biar aman kalau semua skor negatif
  let highestWord = '';

  for (const word of words) {       // loop tiap kata
    let score = 0;

    for (const char of word) {      // loop tiap huruf dalam kata
      score += char.charCodeAt(0) - 96;
    }

    if (score > highestScore) {     // langsung bandingkan, langsung simpan kata
      highestScore = score;
      highestWord = word;           // simpan kata, bukan indeks!
    }
  }

  return highestWord;
}
```

### 🧠 Trik Mengingat

**Kata kunci:** *"Catat langsung pemenangnya, bukan nomornya"*

Kalau kamu lihat `highestWord = word` (bukan `highestIndex = i`), itu ciri khas Solusi 3. Kamu tidak perlu "terjemahan" di akhir — langsung pulang bawa kata pemenang.

---

<a name="solusi-4"></a>
## 🚀 Solusi 4 — Full Pipeline (Map + Reduce Berantai)

Ini versi paling ringkas yang saya tulis sendiri. Tidak ada variabel `scores`, `highestScore`, atau `highestIndex` — semuanya mengalir dalam satu ekspresi berantai.

### 🏭 Analogi: Ban Berjalan di Pabrik

Bayangkan pabrik dengan **ban berjalan (conveyor belt)**:

```
String masuk
  → [Stasiun 1: split]  → array kata
  → [Stasiun 2: map]    → setiap kata dibungkus jadi { word, score }
  → [Stasiun 3: reduce] → dari semua objek, ambil yang skornya tertinggi
  → .word               → ambil nama kata dari objek pemenang
  → Kata pemenang keluar
```

Tidak ada "gudang penyimpanan" di tengah — setiap produk langsung diproses ke stasiun berikutnya.

### 🔍 Visualisasi Alur Step-by-Step

Input: `'hello my xavier'`

```
SPLIT
'hello my xavier'
→ ['hello', 'my', 'xavier']

MAP — bungkus tiap kata jadi objek { word, score }
'hello'  → { word: 'hello',  score: 52 }
'my'     → { word: 'my',     score: 38 }
'xavier' → { word: 'xavier', score: 79 }
→ [{ word: 'hello', score: 52 }, { word: 'my', score: 38 }, { word: 'xavier', score: 79 }]

REDUCE — bandingkan antar objek, ambil yang score-nya lebih besar
  best={ word:'hello', score:52 } vs current={ word:'my', score:38 }
  38 > 52? ❌ → best tetap { word:'hello', score:52 }

  best={ word:'hello', score:52 } vs current={ word:'xavier', score:79 }
  79 > 52? ✅ → best = { word:'xavier', score:79 }

→ { word: 'xavier', score: 79 }

.word → 'xavier' ✅
```

### Memahami Bagian `map` — Membungkus Jadi Objek

Ini bagian yang paling berbeda dari solusi lain:

```js
.map((word) => ({ word, score: getWordScore(word) }))
```

Kenapa dibungkus jadi objek? Karena kita butuh **dua informasi sekaligus** saat `reduce` bekerja: nama katanya dan skornya. Kalau cuma array skor `[52, 38, 79]`, kita kehilangan info kata aslinya.

```js
// ❌ Kalau cuma simpan skor, kata hilang
[52, 38, 79]

// ✅ Bungkus jadi objek, kata dan skor jalan bersama
[
  { word: 'hello',  score: 52 },
  { word: 'my',     score: 38 },
  { word: 'xavier', score: 79 },
]
```

### Memahami Bagian `reduce` — Membandingkan Objek

```js
.reduce((best, current) => (current.score > best.score ? current : best))
```

Ini `reduce` tanpa nilai awal — jadi elemen pertama otomatis jadi `best` di iterasi pertama. Setiap iterasi berikutnya: kalau `current.score` lebih besar, dia jadi `best` baru. Kalau tidak, `best` tetap.

```js
// Ternary operator di atas sama dengan:
.reduce((best, current) => {
  if (current.score > best.score) {
    return current; // ganti pemenang
  } else {
    return best;    // pertahankan pemenang lama
  }
})
```

### Memahami Helper Function `getWordScore`

```js
const getWordScore = (word) => {
  return [...word].reduce((score, char) => score + char.charCodeAt(0) - 96, 0);
};
```

`[...word]` adalah cara lain dari `Array.from(word)` — keduanya mengubah string jadi array huruf. Spread syntax `[...]` lebih pendek penulisannya.

```js
[...'hello']        // ['h', 'e', 'l', 'l', 'o']
Array.from('hello') // ['h', 'e', 'l', 'l', 'o'] — sama persis
```

### Kode Lengkap Solusi 4

```js
const getWordScore = (word) => {
  return [...word].reduce((score, char) => score + char.charCodeAt(0) - 96, 0);
};

const highestScoringWord = (str) => {
  if (!str) return ''; // guard clause: langsung balik string kosong kalau input kosong

  return str
    .split(' ')                                           // pecah jadi array kata
    .map((word) => ({ word, score: getWordScore(word) })) // bungkus jadi { word, score }
    .reduce((best, current) =>                            // bandingkan, ambil terbaik
      current.score > best.score ? current : best
    )
    .word;                                                // ambil nama kata pemenang
};
```

### 🔄 Perbandingan dengan Solusi 2

| | Solusi 2 | Solusi 4 |
|---|---|---|
| Array `scores` terpisah | ✅ Ada `[52, 38, 79]` | ❌ Tidak ada |
| Data yang dibawa di `map` | Angka saja | Objek `{ word, score }` |
| Cara cari tertinggi | `Math.max` + `indexOf` | `reduce` langsung |
| Guard clause input kosong | ❌ Tidak ada | ✅ Ada `if (!str)` |
| Helper function | ❌ Inline saja | ✅ `getWordScore` dipisah |

> 💡 Solusi 2 memisahkan kata dan skor ke array berbeda, lalu "menyatukan" kembali via indeks. Solusi 4 tidak pernah memisahkan mereka — kata dan skor selalu jalan berdampingan dalam satu objek.

### 🧠 Trik Mengingat

**Kata kunci:** *"Bungkus dulu, baru pilih"*

Ciri khas Solusi 4 ada di langkah `map` — kamu **membungkus** kata jadi objek `{ word, score }` sebelum masuk ke `reduce`. Kalau kamu ingat "bungkus dulu", kamu akan ingat kenapa `reduce`-nya bisa langsung return `.word` di akhir — karena objeknya sudah bawa semua yang dibutuhkan.

**Visualisasi singkat:**
```
split → map(bungkus) → reduce(pilih terbaik) → .word
```

---

<a name="test-cases"></a>
## 🧪 Test Cases

### Test Resmi dari Challenge

```js
test('Finding the highest scoring word', () => {
  expect(highestScoringWord('hello my name is xavier')).toBe('xavier');
  expect(highestScoringWord('what time are we climbing up the volcano')).toBe('volcano');
  expect(highestScoringWord('take me to semynak')).toBe('semynak');
});
```

### Test Cases Tambahan (Semua Kasus Ekstrem)

| # | Input | Expected | Kenapa |
|---|-------|----------|--------|
| 1 | `'hello my name is xavier'` | `'xavier'` | Happy path dari tutorial |
| 2 | `'what time are we climbing up the volcano'` | `'volcano'` | Kata panjang dengan huruf tinggi |
| 3 | `'take me to semynak'` | `'semynak'` | Nama tempat sebagai input |
| 4 | `''` | `''` | Input kosong — butuh guard clause |
| 5 | `'a'` | `'a'` | Hanya satu huruf |
| 6 | `'javascript'` | `'javascript'` | Hanya satu kata |
| 7 | `'aa b'` | `'aa'` | Skor sama → pilih kata pertama |
| 8 | `'abc cab'` | `'abc'` | Skor sama (6 vs 6) → kata pertama |
| 9 | `'a bb ccc dddd'` | `'dddd'` | Kata terpanjang → skor terbesar |
| 10 | `'wyn nyx'` | `'nyx'` | Skor berdekatan: nyx(63) > wyn(62) |

> ⚠️ Test case #4 (input kosong) hanya lulus di **Solusi 3 dan 4** karena keduanya punya penanganan khusus. Solusi 1 dan 2 dari video tidak menangani input kosong.

### Runner Test Manual

Cara menjalankan semua test case di atas tanpa Jest — cukup jalankan file-nya langsung dengan Node.js.

```js
const testCases = [
  { input: 'hello my name is xavier',                    expected: 'xavier',     desc: 'happy path dari tutorial' },
  { input: 'what time are we climbing up the volcano',   expected: 'volcano',    desc: 'kata panjang dengan huruf tinggi' },
  { input: 'take me to semynak',                         expected: 'semynak',    desc: 'nama tempat sebagai input' },
  { input: '',                                           expected: '',           desc: 'input kosong' },
  { input: 'a',                                         expected: 'a',          desc: 'hanya satu huruf' },
  { input: 'javascript',                                 expected: 'javascript', desc: 'hanya satu kata' },
  { input: 'aa b',                                       expected: 'aa',         desc: 'skor sama, pilih kata pertama' },
  { input: 'abc cab',                                    expected: 'abc',        desc: 'skor sama (6 vs 6), kata pertama' },
  { input: 'a bb ccc dddd',                              expected: 'dddd',       desc: 'kata terpanjang memiliki skor terbesar' },
  { input: 'wyn nyx',                                    expected: 'nyx',        desc: 'skor sangat berdekatan, nyx(63) menang atas wyn(62)' },
];

testCases.forEach(({ input, expected, desc }, index) => {
  const result = highestScoringWord(input);
  const status = result === expected ? '✅ PASS' : '❌ FAIL';
  console.log(`Test Case #${index + 1}: ${status} - ${desc}`);
  if (status === '❌ FAIL') {
    console.log('  Expected:', expected);
    console.log('  Result  :', result);
  }
});
```

Cara menjalankan:
```bash
node highest-scoring-word.js
```

Output yang diharapkan jika semua lulus:
```
Test Case #1: ✅ PASS - happy path dari tutorial
Test Case #2: ✅ PASS - kata panjang dengan huruf tinggi
Test Case #3: ✅ PASS - nama tempat sebagai input
Test Case #4: ✅ PASS - input kosong
Test Case #5: ✅ PASS - hanya satu huruf
Test Case #6: ✅ PASS - hanya satu kata
Test Case #7: ✅ PASS - skor sama, pilih kata pertama
Test Case #8: ✅ PASS - skor sama (6 vs 6), kata pertama
Test Case #9: ✅ PASS - kata terpanjang memiliki skor terbesar
Test Case #10: ✅ PASS - skor sangat berdekatan, nyx(63) menang atas wyn(62)
```

---

> 📝 **Ringkasan 4 Solusi:**
> - **Solusi 1** — Paling eksplisit, dua fase terpisah (hitung semua → cari tertinggi)
> - **Solusi 2** — Lebih ringkas, ganti loop manual dengan `Math.max` + `indexOf`
> - **Solusi 3** — Satu loop, langsung simpan kata pemenang tanpa array skor
> - **Solusi 4** — Full pipeline, bungkus kata jadi objek agar tidak kehilangan info di tengah jalan