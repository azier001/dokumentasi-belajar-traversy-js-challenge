# 🧩 Custom Anagram Grouping — Menggunakan HashTable Buatan Sendiri

> **Ringkasan:** Di challenge ini, kita akan mengelompokkan kata-kata anagram menggunakan **custom HashTable** yang sudah kita buat sebelumnya. Ini mirip dengan challenge anagram grouping yang dulu pakai `Map`, tapi sekarang kita pakai struktur data buatan sendiri!

---

## 📑 Daftar Isi

- 🎯 [Pengenalan Challenge](#pengenalan-challenge)
- 📝 [Deskripsi Tantangan](#deskripsi-tantangan)
- 💡 [Petunjuk & Tips](#petunjuk-dan-tips)
- 🏗️ [Langkah 1 — Membuat Fungsi & Inisialisasi HashTable](#langkah-1)
- 🔤 [Langkah 2 — Mengurutkan Karakter Setiap Kata](#langkah-2)
- 🔍 [Langkah 3 — Cek & Kelompokkan Anagram di HashTable](#langkah-3)
- 📦 [Langkah 4 — Mengembalikan Hasil dengan getValues](#langkah-4)
- ✅ [Kode Lengkap](#kode-lengkap)
- 🔄 [Solusi Alternatif — Arrow Function & .has()](#solusi-alternatif)
- 🧪 [Menjalankan & Testing](#menjalankan-dan-testing)
- 🎓 [Penutup](#penutup)

---

<a name="pengenalan-challenge"></a>
## 🎯 Pengenalan Challenge

Kita pernah mengerjakan challenge **Anagram Grouping** sebelumnya menggunakan `Map`. Sekarang, kita akan mengerjakan challenge yang **sama persis**, tapi menggunakan **custom HashTable** yang sudah kita buat di video-video sebelumnya.

**Apa itu Anagram?**
Anagram adalah kata yang huruf-hurufnya bisa disusun ulang menjadi kata lain. Contoh: `listen` dan `silent` — keduanya punya huruf yang sama, cuma urutannya beda.

**Tujuan challenge ini:**
Membuat fungsi `anagramGrouping` yang menerima **array of words** dan mengembalikan **array of arrays**, di mana setiap inner array berisi kata-kata yang merupakan anagram satu sama lain.

---

<a name="deskripsi-tantangan"></a>
## 📝 Deskripsi Tantangan

### Function Signature

```js
/**
 * Groups anagrams from the input array of words using a HashTable.
 * @param {string[]} words - An array of words.
 * @returns {string[][]} - An array of arrays, each representing a group of anagrams.
 */
function anagramGrouping(words: string[]): string[][];
```

### Contoh Input & Output

```js
anagramGrouping(['listen', 'silent', 'hello', 'world', 'act', 'cat']);
// Output: [['listen', 'silent'], ['act', 'cat'], ['hello'], ['world']]
```

**Penjelasan output:**
| Grup | Kata-kata | Alasan |
|------|-----------|--------|
| Grup 1 | `['listen', 'silent']` | Anagram satu sama lain |
| Grup 2 | `['act', 'cat']` | Anagram satu sama lain |
| Grup 3 | `['hello']` | Tidak punya pasangan anagram |
| Grup 4 | `['world']` | Tidak punya pasangan anagram |

---

<a name="petunjuk-dan-tips"></a>
## 💡 Petunjuk & Tips

1. **Gunakan class `HashTable`** yang sudah kita buat untuk menyimpan grup anagram secara efisien
2. **Ubah setiap kata menjadi sorted string** — ini trik untuk mengidentifikasi anagram. Contoh: `"listen"` → `"eilnst"`, `"silent"` → `"eilnst"` (hasilnya sama!)
3. **Gunakan sorted string sebagai key** di HashTable, lalu simpan kata-kata aslinya sebagai value
4. **Gunakan method `getValues()`** yang sudah kita buat di video sebelumnya untuk mengambil semua value dari HashTable

---

<a name="langkah-1"></a>
## 🏗️ Langkah 1 — Membuat Fungsi & Inisialisasi HashTable

Pertama, kita buat fungsi `anagramGrouping` yang menerima parameter `words` (array of words). Di dalamnya, kita inisialisasi instance baru dari `HashTable`.

```js
const HashTable = require('./HashTable');

function anagramGrouping(words) {
  // Buat instance baru dari HashTable buatan kita
  const anagramGroups = new HashTable();
}
```

> ⚠️ **Penting:** Pastikan `HashTable` yang kamu gunakan sudah memiliki method `getValues()`. Kita butuh method itu nanti untuk mengambil semua value dari tabel.

---

<a name="langkah-2"></a>
## 🔤 Langkah 2 — Mengurutkan Karakter Setiap Kata

Selanjutnya, kita loop semua kata dan **urutkan karakter-karakter** dalam setiap kata secara alfabet. Ini adalah **kunci utama** untuk mengidentifikasi anagram.

```js
for (const word of words) {
  // Urutkan karakter kata secara alfabet
  const sortedChars = word.split('').sort().join('');
}
```

**Bagaimana cara kerjanya?** Mari kita breakdown step by step:

```
Kata: "listen"

1. word.split('')   → ['l', 'i', 's', 't', 'e', 'n']   // Pecah jadi array karakter
2. .sort()          → ['e', 'i', 'l', 'n', 's', 't']   // Urutkan alfabet
3. .join('')        → "eilnst"                           // Gabung jadi string lagi
```

**Kenapa ini penting?** Karena semua anagram akan menghasilkan **sorted string yang sama**:

| Kata | Sorted String |
|------|---------------|
| `listen` | `eilnst` |
| `silent` | `eilnst` ← **Sama!** |
| `cat` | `act` |
| `act` | `act` ← **Sama!** |
| `hello` | `ehllo` |
| `world` | `dlorw` |

---

<a name="langkah-3"></a>
## 🔍 Langkah 3 — Cek & Kelompokkan Anagram di HashTable

Sekarang kita cek: apakah sorted string ini sudah ada di HashTable?
- **Jika sudah ada** → tambahkan kata ke array yang sudah ada (pakai `.push()`)
- **Jika belum ada** → buat entry baru dengan array berisi kata tersebut

```js
for (const word of words) {
  const sortedChars = word.split('').sort().join('');

  if (anagramGroups.get(sortedChars)) {
    // Key sudah ada → tambahkan kata ke grup yang sudah ada
    anagramGroups.get(sortedChars).push(word);
  } else {
    // Key belum ada → buat grup baru dengan kata ini
    anagramGroups.set(sortedChars, [word]);
  }
}
```

**Simulasi proses untuk input** `['cat', 'act', 'silent', 'listen', 'tac', 'hello']`:

| Iterasi | Kata | Sorted | Sudah ada? | Aksi | Isi HashTable |
|---------|------|--------|------------|------|---------------|
| 1 | `cat` | `act` | ❌ | `set('act', ['cat'])` | `{act: ['cat']}` |
| 2 | `act` | `act` | ✅ | `push('act')` | `{act: ['cat', 'act']}` |
| 3 | `silent` | `eilnst` | ❌ | `set('eilnst', ['silent'])` | `{act: ['cat', 'act'], eilnst: ['silent']}` |
| 4 | `listen` | `eilnst` | ✅ | `push('listen')` | `{act: ['cat', 'act'], eilnst: ['silent', 'listen']}` |
| 5 | `tac` | `act` | ✅ | `push('tac')` | `{act: ['cat', 'act', 'tac'], eilnst: ['silent', 'listen']}` |
| 6 | `hello` | `ehllo` | ❌ | `set('ehllo', ['hello'])` | `{..., ehllo: ['hello']}` |

---

<a name="langkah-4"></a>
## 📦 Langkah 4 — Mengembalikan Hasil dengan getValues

Terakhir, kita tinggal mengambil **semua value** dari HashTable menggunakan method `getValues()`. Method ini mengembalikan array of arrays — persis seperti yang kita butuhkan!

```js
return anagramGroups.getValues();
```

`getValues()` akan mengeluarkan semua value dari HashTable tanpa key-nya. Jadi yang kita dapat adalah:

```js
[
  ['cat', 'act', 'tac'],     // anagram grup 1
  ['silent', 'listen'],       // anagram grup 2
  ['hello']                   // tidak ada pasangan
]
```

---

<a name="kode-lengkap"></a>
## ✅ Kode Lengkap

<details>
  <summary>Klik Untuk Melihat Solusi Lengkap</summary>

```js
const HashTable = require('./HashTable');

function anagramGrouping(words) {
  // Buat instance baru dari HashTable
  const anagramGroups = new HashTable();

  // Loop setiap kata dalam array
  for (const word of words) {
    // Urutkan karakter kata secara alfabet untuk dijadikan key
    const sortedChars = word.split('').sort().join('');

    // Cek apakah sorted string sudah ada di HashTable
    if (anagramGroups.get(sortedChars)) {
      // Sudah ada → tambahkan kata ke grup yang sudah ada
      anagramGroups.get(sortedChars).push(word);
    } else {
      // Belum ada → buat entry baru dengan array berisi kata ini
      anagramGroups.set(sortedChars, [word]);
    }
  }

  // Kembalikan semua value dari HashTable (array of arrays)
  return anagramGroups.getValues();
}

module.exports = anagramGrouping;
```

</details>

---

<a name="solusi-alternatif"></a>
## 🔄 Solusi Alternatif — Arrow Function & `.has()`

Selain solusi di atas, kita bisa menulis versi yang sedikit berbeda menggunakan **Arrow Function** dan method `.has()`:

```js
const anagramGrouping = (words) => {
  const anagramGroups = new HashTable();

  for (const word of words) {
    const sortedChars = word.split('').sort().join('');

    // Cek keberadaan key dengan .has() — lebih eksplisit
    if (!anagramGroups.has(sortedChars)) {
      anagramGroups.set(sortedChars, []);
    }

    // Selalu push, karena array pasti sudah ada
    anagramGroups.get(sortedChars).push(word);
  }

  return anagramGroups.getValues();
};
```

---

### 🎨 Visualisasi ASCII — Perbandingan Alur Kedua Pendekatan

**Solusi Utama (`.get()`) — Dua jalur berbeda:**

```
                         ┌─────────────────┐
                         │   Untuk setiap   │
                         │      word        │
                         └────────┬────────┘
                                  │
                                  ▼
                     ┌────────────────────────┐
                     │  sortedChars = word     │
                     │  .split('').sort()      │
                     │  .join('')              │
                     └────────────┬───────────┘
                                  │
                                  ▼
                    ┌──────────────────────────┐
                    │  .get(sortedChars) ada?   │
                    └─────┬──────────────┬─────┘
                          │              │
                     ✅ TRUE        ❌ FALSE
                          │              │
                          ▼              ▼
                  ┌──────────────┐ ┌──────────────────┐
                  │ .get(key)    │ │ .set(key, [word]) │
                  │  .push(word) │ │  ← buat baru     │
                  └──────────────┘ └──────────────────┘
```

**Solusi Alternatif (`.has()`) — Satu jalur konsisten:**

```
                         ┌─────────────────┐
                         │   Untuk setiap   │
                         │      word        │
                         └────────┬────────┘
                                  │
                                  ▼
                     ┌────────────────────────┐
                     │  sortedChars = word     │
                     │  .split('').sort()      │
                     │  .join('')              │
                     └────────────┬───────────┘
                                  │
                                  ▼
                    ┌──────────────────────────┐
                    │  .has(sortedChars)?       │
                    └─────┬──────────────┬─────┘
                          │              │
                     ✅ TRUE        ❌ FALSE
                          │              │
                          │              ▼
                          │    ┌──────────────────┐
                          │    │ .set(key, [])     │
                          │    │  ← array kosong   │
                          │    └────────┬─────────┘
                          │             │
                          ▼             ▼
                    ┌──────────────────────────┐
                    │  .get(key).push(word)     │
                    │  ← SELALU dijalankan      │
                    └──────────────────────────┘
```

> 💡 **Perhatikan:** Di pendekatan `.has()`, `push(word)` **selalu** dijalankan di setiap iterasi, tidak peduli key itu baru atau sudah ada. Ini membuat alur kode lebih **sederhana** dan **konsisten**.

---

### 🔬 Visualisasi Step-by-Step — Pendekatan `.has()`

Input: `['cat', 'act', 'hello']`

```
══════════════════════════════════════════════════════════════
  Iterasi 1: word = "cat"
══════════════════════════════════════════════════════════════

  "cat" ──split──▶ ['c','a','t'] ──sort──▶ ['a','c','t'] ──join──▶ "act"

  .has("act") ? ── ❌ TIDAK ADA
                     │
                     └──▶ .set("act", [])    ← Buat array kosong dulu

  .get("act").push("cat")                   ← Tambahkan kata

  HashTable: { "act": ["cat"] }

══════════════════════════════════════════════════════════════
  Iterasi 2: word = "act"
══════════════════════════════════════════════════════════════

  "act" ──split──▶ ['a','c','t'] ──sort──▶ ['a','c','t'] ──join──▶ "act"

  .has("act") ? ── ✅ SUDAH ADA
                     │
                     └──▶ (skip set, langsung push)

  .get("act").push("act")                   ← Tambahkan ke grup yang sama

  HashTable: { "act": ["cat", "act"] }

══════════════════════════════════════════════════════════════
  Iterasi 3: word = "hello"
══════════════════════════════════════════════════════════════

  "hello" ──split──▶ ['h','e','l','l','o'] ──sort──▶ ['e','h','l','l','o'] ──join──▶ "ehllo"

  .has("ehllo") ? ── ❌ TIDAK ADA
                      │
                      └──▶ .set("ehllo", [])  ← Buat array kosong dulu

  .get("ehllo").push("hello")                ← Tambahkan kata

  HashTable: { "act": ["cat", "act"], "ehllo": ["hello"] }
```

---

### 🗄️ Visualisasi HashTable Bucket — Hasil Akhir

```
┌─────────────────────────────────────────────────────────┐
│                    HASH TABLE (limit: 14)                │
├──────────┬──────────────────────────────────────────────┤
│  Bucket  │  Isi                                         │
├──────────┼──────────────────────────────────────────────┤
│    0     │  (kosong)                                     │
│    1     │  (kosong)                                     │
│    2     │  ┌─────────────────────────────────────┐     │
│          │  │ ["act", ["cat", "act"]]              │     │
│          │  └─────────────────────────────────────┘     │
│    3     │  (kosong)                                     │
│    4     │  (kosong)                                     │
│    5     │  ┌─────────────────────────────────────┐     │
│          │  │ ["eilnst", ["silent", "listen"]]     │     │
│          │  └─────────────────────────────────────┘     │
│    6     │  (kosong)                                     │
│    7     │  ┌─────────────────────────────────────┐     │
│          │  │ ["ehllo", ["hello"]]                 │     │
│          │  └─────────────────────────────────────┘     │
│    8     │  (kosong)                                     │
│   ...    │  ...                                          │
├──────────┴──────────────────────────────────────────────┤
│                                                          │
│  getValues() mengambil HANYA value-nya:                  │
│                                                          │
│  ┌──────────────────┐  ┌────────────────────────┐       │
│  │ ["cat", "act"]   │  │ ["silent", "listen"]   │       │
│  └──────────────────┘  └────────────────────────┘       │
│  ┌──────────────────┐                                    │
│  │ ["hello"]         │                                    │
│  └──────────────────┘                                    │
│                                                          │
│  Result: [["cat","act"], ["silent","listen"], ["hello"]]  │
└─────────────────────────────────────────────────────────┘
```

---

### 🆚 Tabel Perbandingan Kedua Pendekatan

| Aspek | Solusi Utama (`.get()`) | Solusi Alternatif (`.has()`) |
|-------|------------------------|----------------------------|
| **Pengecekan key** | `if (anagramGroups.get(sortedChars))` | `if (!anagramGroups.has(sortedChars))` |
| **Inisialisasi** | Langsung `set(key, [word])` | `set(key, [])` lalu `push(word)` |
| **Push** | Hanya di blok `if` (true) | **Selalu** dilakukan di setiap iterasi |
| **Jalur kode** | 2 jalur berbeda (if/else) | 1 jalur konsisten + guard clause |
| **Keamanan** | Bisa bermasalah jika value-nya *falsy* (`0`, `""`, `false`) | Lebih aman karena `.has()` hanya cek **keberadaan** key |

> 💡 **Catatan:** Kedua pendekatan menghasilkan output yang sama. Pendekatan `.has()` sedikit lebih **aman** dan **konsisten** secara logika karena memisahkan proses inisialisasi dan penambahan data.

---

<a name="menjalankan-dan-testing"></a>
## 🧪 Menjalankan & Testing

### File untuk Menjalankan Manual

```js
// custom-anagram-grouping-run.js
const anagramGrouping = require('./custom-anagram-grouping');

const words = ['cat', 'act', 'silent', 'listen', 'tac', 'hello', 'foo', 'bar'];

const result = anagramGrouping(words);

console.log(result);
```

**Output yang dihasilkan:**

```
[
  ['hello'],
  ['foo'],
  ['bar'],
  ['cat', 'act', 'tac'],
  ['silent', 'listen']
]
```

Kata-kata yang tidak punya pasangan anagram (`hello`, `foo`, `bar`) masing-masing berada di array sendiri. Sedangkan `cat`, `act`, `tac` dikelompokkan bersama karena mereka saling anagram.

### Test Case

```js
// custom-anagram-grouping.test.js
const anagramGrouping = require('./custom-anagram-grouping');

describe('Anagram Grouping', () => {
  test('Grouping anagrams', () => {
    const words = [
      'listen',
      'silent',
      'hello',
      'world',
      'act',
      'cat',
      'dog',
      'god',
    ];

    const result = anagramGrouping(words);

    expect(result).toEqual(
      expect.arrayContaining([
        expect.arrayContaining(['listen', 'silent']),
        expect.arrayContaining(['act', 'cat']),
        expect.arrayContaining(['dog', 'god']),
        expect.arrayContaining(['hello']),
        expect.arrayContaining(['world']),
      ])
    );
  });
});
```

> ⚠️ **Catatan dari video:** Awalnya test sempat gagal karena nama module yang di-require salah (`anagram-grouping` harusnya `custom-anagram-grouping`). Pastikan nama file yang di-require di test sesuai dengan nama file kode solusi kamu.



---

<a name="penutup"></a>
## 🎓 Penutup

Dengan challenge ini, kita sudah berhasil **menggunakan custom HashTable** yang kita buat sendiri dalam sebuah kasus nyata. Method `getValues()` yang kita tambahkan di video sebelumnya sangat berguna di sini untuk mengambil semua grup anagram sekaligus.

Ini juga menandai **akhir dari section Hash Tables, Maps, dan Sets**. Di section selanjutnya, kita akan masuk ke **data structures** lain seperti **Stacks**, **Queues**, dan **Linked Lists**! 🚀
