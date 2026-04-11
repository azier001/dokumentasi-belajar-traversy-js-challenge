# 🔤 Catatan Belajar: Anagram Grouping

> 📝 **Catatan pribadi** ini dibuat dari gabungan video tutorial + kode praktik.
> Ditulis dengan bahasa santai agar mudah dipahami, terutama buat yang baru mulai belajar JavaScript.

---

## 📚 Daftar Isi

- 🔍 [Apa itu Anagram?](#apa-itu-anagram)
- 🎯 [Apa yang Harus Kita Buat?](#apa-yang-harus-kita-buat)
- 🗺️ [Strategi: Pakai Map sebagai Pelacak](#strategi-pakai-map-sebagai-pelacak)
- 🔠 [Trik Mengurutkan Karakter dalam String](#trik-mengurutkan-karakter-dalam-string)
- 🏗️ [Membangun Solusi Langkah demi Langkah](#membangun-solusi-langkah-demi-langkah)
- ✅ [Kode Lengkap + Penjelasan](#kode-lengkap--penjelasan)
- 🔄 [Alternatif Solusi — Guard Clause Pattern](#alternatif-solusi--guard-clause-pattern)
- 🆚 [Perbandingan Dua Pendekatan](#perbandingan-dua-pendekatan)
- 🚀 [Cara Menjalankan Kode](#cara-menjalankan-kode)
- 🧪 [Hasil Test](#hasil-test)

---

<a name="apa-itu-anagram"></a>
## 🔍 Apa itu Anagram?

**Anagram** adalah kata atau frasa yang dibentuk dari **huruf-huruf yang sama**, hanya urutannya yang berbeda.

Contoh sederhana:

| Kata 1 | Kata 2 | Anagram? |
|--------|--------|----------|
| `cinema` | `iceman` | ✅ Ya — huruf sama, urutan beda |
| `cat` | `act` | ✅ Ya |
| `cat` | `tac` | ✅ Ya |
| `dog` | `god` | ✅ Ya |
| `hello` | `world` | ❌ Tidak |

Intinya: dua kata disebut anagram kalau **jumlah dan jenis hurufnya sama persis**, walau posisinya beda.

---

<a name="apa-yang-harus-kita-buat"></a>
## 🎯 Apa yang Harus Kita Buat?

Kita diminta membuat function `anagramGrouping` yang:

- **Menerima:** array berisi kumpulan kata (semua huruf kecil)
- **Mengembalikan:** array of arrays — setiap sub-array berisi kata-kata yang merupakan anagram satu sama lain

**Contoh:**

```js
anagramGrouping(['cat', 'act', 'dog', 'god', 'tac']);
// Output: [['cat', 'act', 'tac'], ['dog', 'god']]
```

Pengelompokannya:
- `cat`, `act`, `tac` → anagram satu sama lain → masuk **satu group**
- `dog`, `god` → anagram satu sama lain → masuk **satu group**

```js
anagramGrouping(['listen', 'silent', 'enlist', 'hello', 'world']);
// Output: [['listen', 'silent', 'enlist'], ['hello'], ['world']]
```

- `listen`, `silent`, `enlist` → satu group
- `hello` dan `world` tidak punya pasangan anagram → **masing-masing di group sendiri**

> 💡 **Constraint:** Input hanya berisi huruf kecil (lowercase), jadi kita tidak perlu khawatir soal uppercase atau karakter aneh.

---

<a name="strategi-pakai-map-sebagai-pelacak"></a>
## 🗺️ Strategi: Pakai Map sebagai Pelacak

Nah, sekarang pertanyaannya: **gimana cara kita tahu dua kata adalah anagram?**

Triknya simpel: kalau kita **urutkan huruf-hurufnya**, anagram akan menghasilkan string yang **persis sama**.

Contoh:
- `cat` → diurutkan → `act`
- `act` → diurutkan → `act`
- `tac` → diurutkan → `act`

Ketiganya menghasilkan `"act"` setelah diurutkan! Ini yang kita jadikan **key** di dalam Map.

```
Map {
  'act' => ['cat', 'act', 'tac'],   ← semua punya key yang sama: 'act'
  'dgo' => ['dog', 'god']           ← 'dog' dan 'god' sama-sama jadi 'dgo'
}
```

Kita pakai **Map** karena:
- Mudah untuk menyimpan data key-value
- Bisa langsung cek apakah key sudah ada dengan `.has()`
- Bisa ambil value-nya dengan `.get()`
- Bisa tambah entry baru dengan `.set()`

---

<a name="trik-mengurutkan-karakter-dalam-string"></a>
## 🔠 Trik Mengurutkan Karakter dalam String

JavaScript tidak punya method bawaan untuk langsung mengurutkan **karakter dalam sebuah string**. Tapi kita bisa pakai trik 3 langkah:

```js
const word = 'cat';

// Langkah 1: Pecah string jadi array karakter
word.split('') // ['c', 'a', 't']

// Langkah 2: Urutkan array-nya secara alfabetis
word.split('').sort() // ['a', 'c', 't']

// Langkah 3: Gabungkan kembali jadi string
word.split('').sort().join('') // 'act'
```

Kalau kita log hasilnya untuk setiap kata di input `['cat', 'act', 'dog', 'god', 'tac']`:

```
cat  → act
act  → act
dog  → dgo
god  → dgo
tac  → act
```

Kata-kata yang punya hasil sortir sama = anagram! 🎉

---

<a name="membangun-solusi-langkah-demi-langkah"></a>
## 🏗️ Membangun Solusi Langkah demi Langkah

### Langkah 1 — Buat Map kosong untuk menampung group

```js
function anagramGrouping(words) {
  const anagramGroups = new Map();
  // Map ini akan kita isi saat looping
}
```

### Langkah 2 — Loop setiap kata, lalu urutkan karakternya

```js
for (const word of words) {
  const sortedChars = word.split('').sort().join('');
  // sortedChars adalah "tanda pengenal" / key untuk anagram group
}
```

### Langkah 3 — Cek apakah key sudah ada di Map

Kalau sudah ada → tinggal **tambahkan kata** ke array yang ada.
Kalau belum ada → **buat array baru** dengan kata itu sebagai elemen pertama.

```js
if (anagramGroups.has(sortedChars)) {
  // Key sudah ada → push kata ke array yang sudah ada
  anagramGroups.get(sortedChars).push(word);
} else {
  // Key belum ada → buat entry baru di Map
  anagramGroups.set(sortedChars, [word]);
}
```

### Langkah 4 — Konversi Map ke Array sebelum di-return

Kita tidak mau return Map-nya langsung, karena yang diminta adalah **array of arrays**.

```js
return Array.from(anagramGroups.values());
```

- `.values()` → mengambil semua **value** dari Map (tiap value adalah array kata-kata)
- `Array.from()` → mengonversi **Map iterator** itu menjadi array biasa

> 💡 **Kenapa perlu `Array.from()`?** Karena `.values()` menghasilkan `MapIterator`, bukan array biasa. `Array.from()` mengubahnya menjadi array yang bisa kita pakai dan kembalikan.

---

<a name="kode-lengkap--penjelasan"></a>
## ✅ Kode Lengkap + Penjelasan

### `anagram-grouping.js`

```js
function anagramGrouping(words) {
  const anagramGroups = new Map();

  for (const word of words) {
    // Urutkan karakter tiap kata secara alfabetis → jadi "key" anagram
    const sortedChars = word.split('').sort().join('');

    if (anagramGroups.has(sortedChars)) {
      // Kalau key sudah ada di Map → tambahkan kata ke array yang ada
      anagramGroups.get(sortedChars).push(word);
    } else {
      // Kalau key belum ada → buat array baru dengan kata ini sebagai elemen pertama
      anagramGroups.set(sortedChars, [word]);
    }
  }

  // Ubah nilai-nilai Map menjadi array biasa, lalu kembalikan
  return Array.from(anagramGroups.values());
}

module.exports = anagramGrouping;
```

**Ringkasan alur kerja:**

```
Input: ['cat', 'act', 'dog', 'god', 'tac']
         ↓
Loop setiap kata → sort karakternya
         ↓
Simpan di Map { sortedKey => [kata-kata anagram] }
         ↓
Map = { 'act' => ['cat', 'act', 'tac'], 'dgo' => ['dog', 'god'] }
         ↓
Array.from(map.values())
         ↓
Output: [['cat', 'act', 'tac'], ['dog', 'god']]
```

---

<a name="alternatif-solusi--guard-clause-pattern"></a>
## 🔄 Alternatif Solusi — Guard Clause Pattern

Ada gaya penulisan lain yang sering dipakai di production code — menggunakan operator `!` (NOT) sebagai **guard clause**.

> 💡 **Guard clause** artinya: *"selesaikan kondisi khusus (edge case) dulu di awal, baru lakukan aksi utamanya."*

```js
function anagramGrouping(words) {
  const anagramMap = new Map();

  for (const word of words) {
    const sortedWord = word.split('').sort().join('');

    // Kalau key belum ada → buat array kosong dulu
    if (!anagramMap.has(sortedWord)) {
      anagramMap.set(sortedWord, []);
    }

    // Selalu push ke array (tidak perlu dua cabang if/else)
    anagramMap.get(sortedWord).push(word);
  }

  // Spread operator sebagai alternatif Array.from()
  return [...anagramMap.values()];
}
```

### Bagaimana cara kerjanya?

Dengan pattern ini, logikanya dipecah menjadi dua tanggung jawab yang jelas:

1. **Inisialisasi** — `if (!has)` → pastikan array-nya sudah ada di Map
2. **Aksi** — `.push()` → selalu tambahkan kata, apapun kondisinya

Hasilnya: baris `.push()` hanya ditulis **satu kali**, tidak perlu diulang di dua cabang `if/else`.

### Catatan: `[...map.values()]` vs `Array.from(map.values())`

Dua cara ini menghasilkan output yang **persis sama** — sama-sama mengonversi Map iterator menjadi array biasa:

```js
// Cara 1 — Array.from() (eksplisit, lebih deskriptif)
return Array.from(anagramMap.values());

// Cara 2 — Spread operator (lebih ringkas, gaya ES6 modern)
return [...anagramMap.values()];
```

---

<a name="perbandingan-dua-pendekatan"></a>
## 🆚 Perbandingan Dua Pendekatan

| Aspek | Solusi Tutorial (`if/else`) | Solusi Alternatif (`!` guard clause) |
|---|---|---|
| **Pengecekan key** | `if (has)` → push atau set | `if (!has)` → set kosong dulu |
| **Baris `.push()`** | Ditulis **2x** (di tiap cabang) | Ditulis **1x** di luar kondisi |
| **Return** | `Array.from(map.values())` | `[...map.values()]` |
| **Gaya** | if/else klasik | Guard clause |
| **Hasil output** | ✅ Sama | ✅ Sama |

> 🎯 **Kapan pakai yang mana?**
> Keduanya benar. Guard clause (`!`) lebih disukai karena **menghindari duplikasi kode** dan alurnya lebih linear — inisialisasi dulu, baru aksi.

---

<a name="cara-menjalankan-kode"></a>
## 🚀 Cara Menjalankan Kode

### File `anagram-grouping-run.js` — untuk coba-coba manual

```js
const anagramGrouping = require('./anagram-grouping');

const result = anagramGrouping(['cat', 'act', 'dog', 'god', 'tac']);

console.log(result);
```

Jalankan dengan:

```bash
node anagram-grouping-run.js
```

Output yang muncul di terminal:

```
[ [ 'cat', 'act', 'tac' ], [ 'dog', 'god' ] ]
```

---

<a name="hasil-test"></a>
## 🧪 Hasil Test

### File `anagram-grouping.test.js`

```js
const anagramGrouping = require('./anagram-grouping');

test('Grouping anagrams', () => {
  const result1 = anagramGrouping(['cat', 'act', 'dog', 'god', 'tac']);
  const result2 = anagramGrouping([
    'listen',
    'silent',
    'enlist',
    'hello',
    'world',
  ]);

  expect(result1).toEqual([
    ['cat', 'act', 'tac'],
    ['dog', 'god'],
  ]);
  expect(result2).toEqual([
    ['listen', 'silent', 'enlist'],
    ['hello'],
    ['world'],
  ]);
});
```

Jalankan test dengan:

```bash
npm test
```

Kalau semua benar → tidak ada failure, semua test ✅ pass.

> 🎉 Mantap! Kita berhasil menyelesaikan challenge Anagram Grouping. Kunci utamanya adalah **pakai Map** dengan sorted characters sebagai key, lalu **konversi ke array** dengan `Array.from()` atau spread `[...]` di akhir.
