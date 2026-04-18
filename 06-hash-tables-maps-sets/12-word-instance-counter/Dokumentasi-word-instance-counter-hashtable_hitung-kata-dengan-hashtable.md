# 🧩 Word Instance Counter — Menggunakan Custom HashTable

> Tantangan ini mirip dengan **Word Frequency Counter** yang sudah kita buat sebelumnya menggunakan built-in `Map`.
> Bedanya, kali ini kita menggunakan **custom `HashTable` class** yang sudah kita buat di dua video sebelumnya.
> Dan alih-alih mengembalikan seluruh Map, kita hanya mengembalikan **jumlah kemunculan satu kata tertentu**.

---

## 📑 Daftar Isi

- 🎯 [Pengenalan](#pengenalan)
- 📝 [Instruksi Challenge](#instruksi-challenge)
- 🔧 [Langkah 1 — Menyiapkan Array Kata](#langkah-1)
- 🗄️ [Langkah 2 — Membuat HashTable & Target Word](#langkah-2)
- 🔁 [Langkah 3 — Loop & Hitung Frekuensi](#langkah-3)
- 🎯 [Langkah 4 — Cek Target Word & Return](#langkah-4)
- 🔢 [Bagaimana Word diubah menjadi Index?](#proses-hashing)
- 📦 [Kode Lengkap](#kode-lengkap)
- ▶️ [Menjalankan & Menguji](#menjalankan-dan-menguji)
- 🧪 [Test Cases](#test-cases)
- 🚀 [Alternatif Solusi — Menggunakan Built-in Map](#alternatif-solusi)

---

<a name="pengenalan"></a>
## 🎯 Pengenalan

Tantangan ini **sangat mirip** dengan Word Frequency Counter yang sudah kita kerjakan beberapa pelajaran lalu. Perbedaannya:

| | Word Frequency Counter (sebelumnya) | Word Instance Counter (sekarang) |
|---|---|---|
| **Struktur data** | Built-in `Map` | Custom `HashTable` class |
| **Yang dikembalikan** | Seluruh `Map` (semua kata + frekuensinya) | Hanya **jumlah kemunculan 1 kata** tertentu |
| **Methods yang dipakai** | `.set()`, `.get()`, `.has()` dari Map | `.set()`, `.get()`, `.has()` dari HashTable buatan sendiri |

> 💡 Karena kita menggunakan custom `HashTable`, pastikan kamu sudah membuat class `HashTable` dari video sebelumnya dan meng-import-nya ke dalam file ini.

---

<a name="instruksi-challenge"></a>
## 📝 Instruksi Challenge

Buatlah fungsi bernama `wordInstanceCounter` yang:
- Menerima **2 parameter**: sebuah **string** (kalimat) dan sebuah **word** (kata yang dicari)
- Mengembalikan **jumlah kemunculan** kata tersebut dalam string
- **Case insensitive** — huruf besar/kecil tidak berpengaruh
- **Mengabaikan tanda baca** — titik, koma, tanda seru, dll tidak ikut terhitung

### 🖋️ Function Signature

```js
/**
 * Mengembalikan jumlah kemunculan kata tertentu dalam string.
 * @param {string} str - Input string yang berisi kata-kata.
 * @param {string} word - Kata yang ingin dihitung kemunculannya.
 * @returns {number} - Jumlah kemunculan kata tersebut.
 */
function wordInstanceCounter(str, word)
```

### 💡 Contoh

```js
wordInstanceCounter('The quick brown fox jumps over the lazy dog.', 'the');
// → 2  (ada "The" di awal dan "the" di tengah, keduanya dihitung)

wordInstanceCounter('Hello, Hello, Hello!', 'hello');
// → 3
```

> Perhatikan: `"The"` dengan huruf besar T tetap dihitung sebagai `"the"` karena kita akan membuat semuanya **lowercase** terlebih dahulu.

---

<a name="langkah-1"></a>
## 🔧 Langkah 1 — Menyiapkan Array Kata

Pertama, kita perlu mengubah string input menjadi **array kata-kata** yang bersih (tanpa tanda baca, semua lowercase).

```js
const words = str.toLowerCase().split(/\W+/);
```

**Apa yang terjadi di sini:**

1. `str.toLowerCase()` → mengubah semua huruf menjadi kecil agar pencarian **case insensitive**
2. `.split(/\W+/)` → memecah string di setiap **non-word character** (spasi, koma, titik, tanda seru, dll)

```
Input:  "The quick brown fox jumps over the lazy dog."

Proses:
  toLowerCase() → "the quick brown fox jumps over the lazy dog."
  split(/\W+/)  → ["the", "quick", "brown", "fox", "jumps", "over", "the", "lazy", "dog", ""]
                                                                                          ↑
                                                                              string kosong (dari titik di akhir)
```

---

<a name="langkah-2"></a>
## 🗄️ Langkah 2 — Membuat HashTable & Target Word

Selanjutnya, kita siapkan **HashTable** untuk menyimpan frekuensi kata dan variabel **target word**.

```js
const wordFrequency = new HashTable();
const targetWord = word.toLowerCase();
let count = 0;
```

| Variabel | Fungsi |
|----------|--------|
| `wordFrequency` | Hash table untuk menyimpan **key-value pairs** (kata → frekuensi) |
| `targetWord` | Kata yang kita cari, sudah di-**lowercase**-kan agar seragam |
| `count` | Penghitung yang akan kita kembalikan di akhir, dimulai dari `0` |

> 💡 Kenapa `targetWord` juga harus di-lowercase? Karena semua kata di array `words` sudah lowercase. Jadi kita harus mencocokkan dengan format yang sama agar perbandingannya akurat.

---

<a name="langkah-3"></a>
## 🔁 Langkah 3 — Loop & Hitung Frekuensi

Sekarang kita loop setiap kata dan simpan frekuensinya ke dalam HashTable.

```js
for (const currentWord of words) {
  // Skip string kosong (muncul karena tanda baca di awal/akhir)
  if (currentWord === '') continue;

  // Cek apakah kata sudah ada di HashTable
  if (wordFrequency.has(currentWord)) {
    // Sudah ada → tambah 1
    wordFrequency.set(currentWord, wordFrequency.get(currentWord) + 1);
  } else {
    // Belum ada → set ke 1
    wordFrequency.set(currentWord, 1);
  }
}
```

### 🔍 Simulasi — Input: `"The quick brown fox jumps over the lazy dog."`

```
Loop iterasi 1: currentWord = "the"
  → wordFrequency.has("the") → false
  → wordFrequency.set("the", 1)
  → HashTable: { "the" => 1 }

Loop iterasi 2: currentWord = "quick"
  → wordFrequency.has("quick") → false
  → wordFrequency.set("quick", 1)
  → HashTable: { "the" => 1, "quick" => 1 }

... (kata-kata lainnya ditambahkan satu per satu)

Loop iterasi 7: currentWord = "the"
  → wordFrequency.has("the") → true ✅ sudah ada!
  → wordFrequency.get("the") → 1
  → wordFrequency.set("the", 1 + 1) → 2
  → HashTable: { "the" => 2, "quick" => 1, "brown" => 1, ... }

Loop iterasi 10: currentWord = ""
  → if ('' === '') continue → ⏭️ skip!
```

---

<a name="langkah-4"></a>
## 🎯 Langkah 4 — Cek Target Word & Return

Di dalam loop yang sama, setelah if/else untuk menghitung frekuensi, kita juga **cek apakah kata saat ini adalah kata yang dicari**.

```js
  // Masih di dalam for loop:
  if (currentWord === targetWord) {
    count = wordFrequency.get(currentWord);
  }
}

// Di luar loop — kembalikan hasilnya
return count;
```

### 🔍 Kenapa ceknya di dalam loop?

Karena setiap kali `currentWord` cocok dengan `targetWord`, kita ambil **nilai terbaru** dari HashTable. Jadi di akhir loop, `count` akan berisi jumlah kemunculan final dari kata tersebut.

```
Contoh — targetWord = "the":

Iterasi 1: currentWord = "the" → cocok! → count = 1
Iterasi 2: currentWord = "quick" → bukan target → count tetap 1
...
Iterasi 7: currentWord = "the" → cocok! → count = 2 (nilai terbaru)
...
Loop selesai → return 2 ✅
```

---

<a name="proses-hashing"></a>
## 🔢 Bagaimana Word diubah menjadi Index? (Proses Hashing)

Mungkin kamu bertanya-tanya: *"Bagaimana bisa sebuah kata seperti 'the' berubah menjadi angka index dalam array?"*. Inilah tugas dari method `_hash()`.

### 🧮 Logika di Balik `_hash`

1.  Setiap karakter memiliki angka unik (**Character Code** atau ASCII).
2.  Kita menjumlahkan semua angka tersebut.
3.  Hasilnya kita **Modulo (%)** dengan limit (ukuran array) agar angka index-nya tidak melebihi batas.

### 🖼️ Visualisasi ASCII — Kata: `"the"` (Limit: 14)

```text
Karakter:      't'           'h'           'e'
                |             |             |
ASCII Code:    116    +      104    +      101   =  321 (Total Sum)
                |             |             |
                └─────────────┴─────────────┘
                               |
                        Operasi Modulo (%)
                         321  %  14
                               |
Hasil Index:                  13  ✅
```

> **Kenapa pakai Modulo?**
> Jika total jumlahnya 321 dan kita cuma punya 14 slot array, kita tidak bisa menyimpan di index 321. Modulo memastikan hasilnya selalu di antara `0` sampai `limit - 1` (dalam hal ini `0` sampai `13`).

---

<a name="kode-lengkap"></a>
## 📦 Kode Lengkap

### File `HashTable.js`

> ⚠️ File ini harus ada di folder yang sama. Ini adalah class custom `HashTable` yang sudah kita buat di video sebelumnya.

```js
class HashTable {
  constructor(limit = 14) {
    this.storage = [];
    this.limit = limit;
  }

  _hash(key, max) {
    let hash = 0;

    for (let i = 0; i < key.length; i++) {
      hash += key.charCodeAt(i);
    }

    return hash % max;
  }

  set(key, value) {
    const index = this._hash(key, this.limit);

    if (this.storage[index] === undefined) {
      this.storage[index] = [[key, value]];
    } else {
      let inserted = false;

      for (let i = 0; i < this.storage[index].length; i++) {
        if (this.storage[index][i][0] === key) {
          this.storage[index][i][1] = value;
          inserted = true;
        }
      }

      if (inserted === false) {
        this.storage[index].push([key, value]);
      }
    }
  }

  get(key) {
    const index = this._hash(key, this.limit);

    if (this.storage[index] === undefined) {
      return undefined;
    } else {
      for (let i = 0; i < this.storage[index].length; i++) {
        if (this.storage[index][i][0] === key) {
          return this.storage[index][i][1];
        }
      }
    }
  }

  remove(key) {
    const index = this._hash(key, this.limit);

    if (this.storage[index]) {
      if (
        this.storage[index].length === 1 &&
        this.storage[index][0][0] === key
      ) {
        delete this.storage[index];
      } else {
        for (let i = 0; i < this.storage[index].length; i++) {
          if (this.storage[index][i][0] === key) {
            delete this.storage[index][i];
          }
        }
      }
    }
  }

  has(key) {
    const index = this._hash(key, this.limit);

    if (this.storage[index]) {
      for (let i = 0; i < this.storage[index].length; i++) {
        if (this.storage[index][i][0] === key) {
          return true;
        }
      }
    }

    return false;
  }

  printTable() {
    for (let i = 0; i < this.storage.length; i++) {
      if (this.storage[i] !== undefined) {
        console.log(`Bucket ${i}: ${JSON.stringify(this.storage[i])}`);
      } else {
        console.log(`Bucket ${i} Empty`);
      }
    }
  }

  clear() {
    this.storage = [];
  }
}

module.exports = HashTable;
```

### File `word-instance-counter.js`

```js
const HashTable = require('./HashTable');

function wordInstanceCounter(str, word) {
  // Ubah string menjadi lowercase lalu pecah menjadi array kata
  const words = str.toLowerCase().split(/\W+/);

  // Buat instance baru dari HashTable untuk menyimpan frekuensi kata
  const wordFrequency = new HashTable();

  // Ubah target word menjadi lowercase untuk perbandingan case-insensitive
  const targetWord = word.toLowerCase();

  // Inisialisasi counter mulai dari 0
  let count = 0;

  // Loop setiap kata dalam array
  for (const currentWord of words) {
    // Abaikan string kosong (dari tanda baca di ujung)
    if (currentWord === '') continue;

    // Cek apakah kata sudah ada di HashTable
    if (wordFrequency.has(currentWord)) {
      // Sudah ada → increment frekuensinya
      wordFrequency.set(currentWord, wordFrequency.get(currentWord) + 1);
    } else {
      // Belum ada → set frekuensi ke 1
      wordFrequency.set(currentWord, 1);
    }

    // Cek apakah kata saat ini adalah target word
    if (currentWord === targetWord) {
      // Ambil frekuensi terbaru dari HashTable
      count = wordFrequency.get(currentWord);
    }
  }

  // Kembalikan jumlah kemunculan target word
  return count;
}

module.exports = wordInstanceCounter;
```

### File `word-instance-counter-run.js`

```js
const wordInstanceCounter = require('./word-instance-counter');

const result = wordInstanceCounter(
  'The quick brown fox jumps over the lazy dog.',
  'the'
);

console.log(result); // 2
```

---

<a name="menjalankan-dan-menguji"></a>
## ▶️ Menjalankan & Menguji

Jalankan file eksekusi untuk melihat hasilnya:

```bash
node word-instance-counter-run.js
```

```
2
```

Ubah kata yang dicari untuk menguji:

```js
// Cari kata "brown"
wordInstanceCounter('The quick brown fox jumps over the lazy dog.', 'brown');
// → 1

// Cari kata "the" (ada 2: "The" dan "the")
wordInstanceCounter('The quick brown fox jumps over the lazy dog.', 'the');
// → 2
```

> 💡 Tidak masalah bahwa `"The"` memiliki huruf besar T karena kita sudah membuat **semua kata** menjadi lowercase. Begitu juga `targetWord` yang kita lowercase-kan, sehingga perbandingannya selalu akurat.

Untuk menjalankan **test**:

```bash
npm test
```

---

<a name="test-cases"></a>
## 🧪 Test Cases

```js
const wordInstanceCounter = require('./word-instance-counter');

test('Counting instances of a word in a string', () => {
  expect(
    wordInstanceCounter('The quick brown fox jumps over the lazy dog.', 'the')
  ).toBe(2);
  expect(
    wordInstanceCounter(
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      'ipsum'
    )
  ).toBe(1);
  expect(wordInstanceCounter('Hello, world!', 'hello')).toBe(1);
  expect(wordInstanceCounter('Hello, Hello, Hello!', 'hello')).toBe(3);
});
```

---

<a name="alternatif-solusi"></a>
## 🚀 Alternatif Solusi — Menggunakan Built-in `Map`

Selain menggunakan custom `HashTable`, kita juga bisa menggunakan built-in `Map` yang jauh **lebih ringkas** dan sudah dioptimalkan oleh mesin JavaScript.

```js
function wordInstanceCounter(str, word) {
  const words = str.toLowerCase().split(/\W+/);
  const wordFrequency = new Map();

  for (const currentWord of words) {
    if (currentWord === '') continue;
    wordFrequency.set(currentWord, (wordFrequency.get(currentWord) || 0) + 1);
  }

  return wordFrequency.get(word.toLowerCase()) || 0;
}
```

### 🖼️ Visualisasi Alur Kerja — Input: `"Hello, Hello, Hello!"`, word: `"hello"`

```text
╔══════════════════════════════════════════════════════════════════════╗
║  LANGKAH 1: Pecah string menjadi array kata (lowercase)            ║
╠══════════════════════════════════════════════════════════════════════╣
║                                                                      ║
║  "Hello, Hello, Hello!"                                              ║
║       │                                                              ║
║       ▼  .toLowerCase()                                              ║
║  "hello, hello, hello!"                                              ║
║       │                                                              ║
║       ▼  .split(/\W+/)                                               ║
║  ┌─────────┬─────────┬─────────┬────┐                                ║
║  │ "hello" │ "hello" │ "hello" │ "" │                                ║
║  └─────────┴─────────┴─────────┴────┘                                ║
║    [0]        [1]        [2]     [3]                                 ║
║                                  ↑ string kosong (akan di-skip)      ║
╚══════════════════════════════════════════════════════════════════════╝
```

```text
╔══════════════════════════════════════════════════════════════════════╗
║  LANGKAH 2: Loop setiap kata & hitung frekuensi menggunakan Map    ║
╠══════════════════════════════════════════════════════════════════════╣
║                                                                      ║
║  Iterasi 1: currentWord = "hello"                                    ║
║  ┌─────────────────────────────────────────────────────────────┐     ║
║  │ wordFrequency.get("hello")  →  undefined  (belum ada)      │     ║
║  │ (undefined || 0)            →  0          (fallback ke 0)   │     ║
║  │ (0 + 1)                     →  1                            │     ║
║  │ wordFrequency.set("hello", 1)                               │     ║
║  └─────────────────────────────────────────────────────────────┘     ║
║  Map: ┌─────────┬───────┐                                           ║
║       │   Key   │ Value │                                           ║
║       ├─────────┼───────┤                                           ║
║       │ "hello" │   1   │                                           ║
║       └─────────┴───────┘                                           ║
║                                                                      ║
║  ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─      ║
║                                                                      ║
║  Iterasi 2: currentWord = "hello"                                    ║
║  ┌─────────────────────────────────────────────────────────────┐     ║
║  │ wordFrequency.get("hello")  →  1          (sudah ada!)     │     ║
║  │ (1 || 0)                    →  1          (1 = truthy)      │     ║
║  │ (1 + 1)                     →  2                            │     ║
║  │ wordFrequency.set("hello", 2)                               │     ║
║  └─────────────────────────────────────────────────────────────┘     ║
║  Map: ┌─────────┬───────┐                                           ║
║       │   Key   │ Value │                                           ║
║       ├─────────┼───────┤                                           ║
║       │ "hello" │   2   │  ← diperbarui!                           ║
║       └─────────┴───────┘                                           ║
║                                                                      ║
║  ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─      ║
║                                                                      ║
║  Iterasi 3: currentWord = "hello"                                    ║
║  ┌─────────────────────────────────────────────────────────────┐     ║
║  │ wordFrequency.get("hello")  →  2          (sudah ada!)     │     ║
║  │ (2 || 0)                    →  2          (2 = truthy)      │     ║
║  │ (2 + 1)                     →  3                            │     ║
║  │ wordFrequency.set("hello", 3)                               │     ║
║  └─────────────────────────────────────────────────────────────┘     ║
║  Map: ┌─────────┬───────┐                                           ║
║       │   Key   │ Value │                                           ║
║       ├─────────┼───────┤                                           ║
║       │ "hello" │   3   │  ← diperbarui!                           ║
║       └─────────┴───────┘                                           ║
║                                                                      ║
║  ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─      ║
║                                                                      ║
║  Iterasi 4: currentWord = ""                                         ║
║  ┌─────────────────────────────────────────────────────────────┐     ║
║  │ if ('' === '') continue  →  ⏭️ SKIP!                       │     ║
║  └─────────────────────────────────────────────────────────────┘     ║
╚══════════════════════════════════════════════════════════════════════╝
```

```text
╔══════════════════════════════════════════════════════════════════════╗
║  LANGKAH 3: Ambil hasil dari Map & Return                          ║
╠══════════════════════════════════════════════════════════════════════╣
║                                                                      ║
║  return wordFrequency.get(word.toLowerCase()) || 0;                  ║
║                            │                                         ║
║                            ▼                                         ║
║                    word = "hello"  (parameter fungsi, BUKAN loop!)   ║
║                            │                                         ║
║                            ▼  .toLowerCase()                         ║
║                         "hello"                                      ║
║                            │                                         ║
║                            ▼  .get("hello")                          ║
║                            3                                         ║
║                            │                                         ║
║                            ▼  (3 || 0)                               ║
║                            3  ← 3 adalah truthy, jadi tetap 3       ║
║                            │                                         ║
║                            ▼                                         ║
║                     return 3  ✅                                     ║
╚══════════════════════════════════════════════════════════════════════╝
```

### 💡 Kenapa `|| 0` di Return?

Jika kata yang dicari **tidak ada** di dalam string, `.get()` mengembalikan `undefined`:

```text
Contoh: wordInstanceCounter("Hello world", "xyz")

  Map setelah loop: { "hello" => 1, "world" => 1 }

  wordFrequency.get("xyz")  →  undefined
  (undefined || 0)           →  0        ← fallback ke 0, bukan undefined
  return 0  ✅

  Tanpa || 0:
  return undefined  ❌  ← kita ingin angka, bukan undefined!
```

### 🔍 Perbedaan dengan Versi HashTable

| Aspek | Custom `HashTable` | Built-in `Map` |
|-------|-------------------|----------------|
| **Import** | Perlu import `HashTable.js` | Tidak perlu, sudah bawaan JS |
| **Cek keberadaan key** | `if/else` dengan `.has()` | Langsung pakai `\|\| 0` |
| **Jumlah baris kode** | ~20 baris | ~7 baris |
| **Tujuan** | 🎓 Belajar cara kerja hash table | 🚀 Penggunaan di dunia nyata |

### ⚠️ Catatan Penting: Variable Shadowing

Perhatikan bahwa di versi `Map`, kita menggunakan nama `currentWord` di dalam loop, **bukan** `word`. Ini penting karena `word` sudah menjadi **nama parameter fungsi**. Jika kita pakai `word` lagi di dalam `for...of`, maka parameter asli akan **ter-shadow** (tertutup) dan tidak bisa diakses.

```js
// ❌ Bermasalah — variabel 'word' di loop menutupi parameter 'word'
function wordInstanceCounter(str, word) {
  const words = str.toLowerCase().split(/\W+/);
  const wordFrequency = new Map();

  for (const word of words) {     // ← 'word' di sini menutupi parameter!
    if (word === '') continue;
    wordFrequency.set(word, (wordFrequency.get(word) || 0) + 1);
  }

  return wordFrequency.get(word.toLowerCase());
  //                       ↑ ini mengacu ke 'word' dari loop terakhir,
  //                         BUKAN parameter fungsi! ❌
}

// ✅ Benar — gunakan nama berbeda
function wordInstanceCounter(str, word) {
  const words = str.toLowerCase().split(/\W+/);
  const wordFrequency = new Map();

  for (const currentWord of words) {  // ← nama berbeda, aman!
    if (currentWord === '') continue;
    wordFrequency.set(currentWord, (wordFrequency.get(currentWord) || 0) + 1);
  }

  return wordFrequency.get(word.toLowerCase()) || 0;
  //                       ↑ ini mengacu ke parameter fungsi ✅
}
```

> 💡 **Versi `HashTable`** digunakan untuk memahami bagaimana hash table bekerja di balik layar. **Versi `Map`** adalah yang akan kamu pakai di proyek nyata karena lebih ringkas, efisien, dan tidak perlu import file tambahan.
