# 🏗️ Custom Hash Table — Part 1: Fondasi & Method `set`

> **Mulai dari sini, kita masuk ke bagian yang lebih seru — membangun struktur data sendiri (custom data structure) menggunakan class! 🔥 Di Part 1 ini, kita akan membangun fondasi Custom Hash Table lengkap dengan constructor, hash function, serta method `set` dan `printTable`.**

---

## 📋 Daftar Isi

- 🎯 [Pengenalan — Apa yang Akan Kita Bangun?](#pengenalan)
- 🧱 [Constructor — Fondasi Class HashTable](#constructor)
- 🔐 [Hash Function — Jantung dari Hash Table](#hash-function)
  - 🧮 [Cara Kerja Hash Function Kita](#cara-kerja-hash-function)
  - 🧪 [Menguji Hash Function](#menguji-hash-function)
- 🖨️ [Method `printTable` — Menampilkan Isi Hash Table](#print-table)
- ✏️ [Method `set` — Menyimpan Data ke Hash Table](#method-set)
  - 🔄 [Collision Handling — Menangani Tabrakan](#collision-handling)
  - 🧪 [Menguji Method `set`](#menguji-method-set)
- 📦 [Kode Lengkap Part 1](#kode-lengkap)
- 🔮 [Apa Selanjutnya?](#selanjutnya)

---

<a name="pengenalan"></a>
## 🎯 Pengenalan — Apa yang Akan Kita Bangun?

Mulai dari video ini, kita memasuki fase yang **lebih menantang** dibanding challenge-challenge sebelumnya. Kenapa? Karena sekarang kita akan **mengimplementasikan struktur data sendiri** menggunakan class JavaScript!

Kita akan membuat sebuah **Custom Hash Table** class yang bekerja mirip seperti `Map` bawaan JavaScript. Nanti class ini akan punya:

| Method | Fungsi |
|---|---|
| `set(key, value)` | Menyimpan key-value pair |
| `get(key)` | Mengambil value berdasarkan key |
| `remove(key)` | Menghapus key-value pair |
| `getValues()` | Mengambil semua values |
| `printTable()` | Menampilkan isi hash table |

> 💡 **Catatan**: Video ini mengasumsikan kamu sudah paham dasar **OOP (Object-Oriented Programming)** — seperti cara membuat class, constructor, dan menginstansiasi object. Kalau belum familiar, sebaiknya pelajari dulu dasar-dasarnya.

Di **Part 1** ini, kita akan fokus membangun:
1. ✅ Constructor
2. ✅ Hash Function (`_hash`)
3. ✅ Method `printTable`
4. ✅ Method `set` (dengan collision handling)

### 🗺️ Gambaran Besar — Apa Itu Hash Table?

```
┌─────────────────────────────────────────────────────────────┐
│                    HASH TABLE (Array)                       │
├─────────┬───────────────────────────────────────────────────┤
│ Index 0 │ ❌ Empty                                          │
│ Index 1 │ ❌ Empty                                          │
│ Index 2 │ ✅ [["Sara", "555-328-3384"]]                     │
│ Index 3 │ ❌ Empty                                          │
│ Index 4 │ ❌ Empty                                          │
│ Index 5 │ ✅ [["James","555-373-3948"],["Bob","555-111-22"]]│
│ Index 6 │ ❌ Empty                                          │
│ Index 7 │ ✅ [["Jhon", "555-234-3455"]]                     │
│   ...   │ ...                                               │
│ Index 13│ ❌ Empty                                          │
├─────────┴───────────────────────────────────────────────────┤
│  🔑 Key → di-HASH → menjadi Index → disimpan di Bucket     │
└─────────────────────────────────────────────────────────────┘
```

---

<a name="constructor"></a>
## 🧱 Constructor — Fondasi Class HashTable

Langkah pertama, kita buat kerangka class `HashTable` dengan constructor-nya:

```js
class HashTable {
  constructor(limit = 14) {
    this.storage = [];
    this.limit = limit;
  }
}
```

### 🔍 Visualisasi — Apa yang Terjadi Saat `new HashTable()` Dipanggil?

```
const myHashTable = new HashTable();
                         │
                         ▼
        ┌─────────────────────────────────┐
        │     Object: myHashTable         │
        ├─────────────────────────────────┤
        │  limit: 14                      │
        │                                 │
        │  storage: [                     │
        │    (0)  → empty                 │
        │    (1)  → empty                 │
        │    (2)  → empty                 │
        │    (3)  → empty                 │
        │    (4)  → empty                 │
        │    (5)  → empty                 │
        │    (6)  → empty                 │
        │    (7)  → empty                 │
        │    (8)  → empty                 │
        │    (9)  → empty                 │
        │    (10) → empty                 │
        │    (11) → empty                 │
        │    (12) → empty                 │
        │    (13) → empty                 │
        │  ]                              │
        │                                 │
        │  ↑ 14 slot kosong, siap diisi!  │
        └─────────────────────────────────┘
```

### Penjelasan:

| Property | Deskripsi |
|---|---|
| `limit` | Jumlah maksimal **bucket** (slot) yang tersedia. Default-nya `14`, tapi bisa diubah saat membuat instance baru |
| `storage` | Array kosong yang menjadi **tempat penyimpanan utama** semua data. Semua key-value pair akan disimpan di sini |

Cara memakainya:

```js
// Menggunakan limit default (14)
const myHashTable = new HashTable();

// Atau tentukan limit sendiri
const myHashTable = new HashTable(100);
```

```
new HashTable()      →  limit = 14  (default)
new HashTable(100)   →  limit = 100 (custom)
                              │
                              ▼
                    Jumlah bucket yang tersedia
```

> 💡 Parameter `limit` punya **default value** `= 14`, jadi kalau tidak diisi, otomatis bernilai 14.

---

<a name="hash-function"></a>
## 🔐 Hash Function — Jantung dari Hash Table

Hash function adalah **inti** dari sebuah hash table. Tugasnya sederhana tapi sangat penting:

> **Mengubah sebuah key (input) menjadi angka tetap (index)** — angka ini menentukan di mana data akan disimpan dalam array.

```
           ┌──────────┐
  "John" → │   HASH   │ → 7
           │ FUNCTION │
           └──────────┘
  Input       Proses      Output
  (Key)     (Algoritma)   (Index)
```

### 📬 Analogi Kotak Surat

Bayangkan kamu punya **deretan kotak surat** dan ingin mengatur surat berdasarkan alamat. Hash function itu seperti **formula yang mengubah setiap alamat menjadi nomor kotak surat tertentu**. Jadi kalau kamu perlu mencari surat, kamu langsung ke kotak yang tepat tanpa harus mengecek semua kotak satu per satu! 📮

```
 Tanpa Hash Table:                    Dengan Hash Table:
 ┌─────────────────┐                 ┌─────────────────┐
 │ Cari "John"...  │                 │ Hash("John") = 7│
 │                  │                 │                  │
 │ Cek box 0 ❌    │                 │ Langsung ke      │
 │ Cek box 1 ❌    │                 │ box 7 ✅         │
 │ Cek box 2 ❌    │                 │                  │
 │ Cek box 3 ❌    │                 │ KETEMU! 🎉       │
 │ ...              │                 │                  │
 │ Cek box 7 ✅    │                 │ Cuma 1 langkah!  │
 │                  │                 │                  │
 │ 8 langkah! 😩   │                 │                  │
 └─────────────────┘                 └─────────────────┘
```

### Algoritma Hashing yang Ada di Dunia Nyata

Ada banyak algoritma hashing yang lebih canggih, seperti:
- `MD5`
- `SHA-1`
- `SHA-256`

Tapi di sini kita akan pakai yang **sederhana** — cukup untuk belajar konsepnya.

---

<a name="cara-kerja-hash-function"></a>
### 🧮 Cara Kerja Hash Function Kita

Berikut kode hash function kita:

```js
_hash(key, max) {
  let hash = 0;

  for (let i = 0; i < key.length; i++) {
    hash += key.charCodeAt(i);
  }

  return hash % max;
}
```

### 🔍 Visualisasi — Step by Step Eksekusi `_hash`

```
_hash("John", 14)
│
├─ Step 0: hash = 0
│
├─ 🔄 Loop i = 0
│   "John"[0] = "J"
│   "J".charCodeAt(0) = 74
│   hash = 0 + 74 = 74
│
├─ 🔄 Loop i = 1
│   "John"[1] = "o"
│   "o".charCodeAt(0) = 111
│   hash = 74 + 111 = 185
│
├─ 🔄 Loop i = 2
│   "John"[2] = "h"
│   "h".charCodeAt(0) = 104
│   hash = 185 + 104 = 289
│
├─ 🔄 Loop i = 3
│   "John"[3] = "n"
│   "n".charCodeAt(0) = 110
│   hash = 289 + 110 = 399
│
├─ Loop selesai (i = 4, key.length = 4)
│
├─ return 399 % 14 = 7
│
└─ ✅ Output: 7 → Data disimpan di Bucket 7!
```

**Langkah-langkahnya:**

1. **Inisialisasi** variabel `hash` dengan nilai `0`
2. **Loop** setiap karakter dalam `key`
3. **Tambahkan** character code setiap karakter ke `hash` (pakai `charCodeAt()`)
4. **Kembalikan** `hash % max` — modulus memastikan hasil selalu **kurang dari** `max`

> ⚠️ Nama method diawali **underscore** (`_hash`) karena ini method **private** — seharusnya hanya dipakai di dalam class, bukan dari luar.

### 📊 Contoh: Hash untuk Key `"John"`

Mari kita hitung manual hash dari key `"John"` dengan limit `14`:

| Karakter | Character Code (`charCodeAt`) | Running Total |
|:---:|:---:|:---:|
| `J` | 74 | 74 |
| `o` | 111 | 185 |
| `h` | 104 | 289 |
| `n` | 110 | **399** |

```
  Penjumlahan:    74 + 111 + 104 + 110 = 399

  Modulus:        399 % 14 = 7

  ┌──────────────────────────────────────┐
  │  399 ÷ 14 = 28 sisa 7               │
  │  28 × 14 = 392                       │
  │  399 - 392 = 7 ← ini hasil modulus!  │
  └──────────────────────────────────────┘

  Jadi: _hash("John", 14) → 7 ✅
```

> 🎯 Jadi key `"John"` akan disimpan di **bucket ke-7** dalam array storage!

**Kenapa pakai modulus (`%`)?**
Supaya hasilnya **selalu dalam jangkauan** array kita. Kalau limit-nya 14, maka hasilnya pasti antara `0` sampai `13` — tidak mungkin keluar dari range bucket.

```
Tanpa Modulus:    hash bisa = 399, 1500, 99999... 💥 OUT OF RANGE!

Dengan Modulus:   hash % 14 selalu antara 0-13 ✅
                  ┌─────────────────────────┐
                  │  0, 1, 2, ... 12, 13    │
                  │  ← selalu dalam range → │
                  └─────────────────────────┘
```

---

<a name="menguji-hash-function"></a>
### 🧪 Menguji Hash Function

Meskipun `_hash` adalah method private, kita bisa tes langsung untuk memahami cara kerjanya:

```js
const myHashTable = new HashTable();

const result = myHashTable._hash('John', myHashTable.limit);
console.log(result); // 7
```

```
  myHashTable._hash('John', myHashTable.limit)
       │                          │
       │                          └─ myHashTable.limit = 14
       │
       └─ _hash('John', 14)
                   │
                   ▼
            ┌─────────────┐
            │ J = 74      │
            │ o = 111     │  Total = 399
            │ h = 104     │  399 % 14 = 7
            │ n = 110     │
            └──────┬──────┘
                   │
                   ▼
             result = 7
             console.log(7) // 7 ✅
```

> ⚠️ Di kode production, kamu **tidak seharusnya** memanggil `_hash` dari luar class. Kita melakukan ini hanya untuk **learning/testing** saja.

---

<a name="print-table"></a>
## 🖨️ Method `printTable` — Menampilkan Isi Hash Table

Kita perlu cara untuk **melihat isi** hash table kita. Method `printTable` akan menampilkan setiap bucket beserta isinya:

```js
printTable() {
  for (let i = 0; i < this.storage.length; i++) {
    if (this.storage[i] !== undefined) {
      console.log(`Bucket ${i}: ${JSON.stringify(this.storage[i])}`);
    } else {
      console.log(`Bucket ${i} Empty`);
    }
  }
}
```

### 🔍 Visualisasi — Alur Logika `printTable`

```
printTable() dipanggil
       │
       ▼
  Loop setiap index di this.storage
       │
       ├─ i = 0: storage[0] === undefined?
       │         ├─ YA  → console.log("Bucket 0 Empty")
       │         └─ TIDAK → console.log("Bucket 0: [data...]")
       │
       ├─ i = 1: storage[1] === undefined?
       │         ├─ YA  → console.log("Bucket 1 Empty")
       │         └─ TIDAK → console.log("Bucket 1: [data...]")
       │
       ├─ ... (lanjut sampai storage.length)
       │
       └─ Loop selesai ✅
```

### Penjelasan:

1. **Loop** melalui semua index dalam `storage`
2. **Cek** apakah bucket tersebut ada isinya (`!== undefined`)
   - ✅ **Ada isi** → tampilkan nomor bucket + isinya (pakai `JSON.stringify` supaya array-nya terbaca)
   - ❌ **Kosong** → tampilkan `"Bucket X Empty"`

### 🔍 Visualisasi — Contoh Output `printTable`

```
Misalnya storage berisi data John di bucket 7:

this.storage = [
  (0)  undefined,      ← Bucket 0 Empty
  (1)  undefined,      ← Bucket 1 Empty
  (2)  undefined,      ← Bucket 2 Empty
  (3)  undefined,      ← Bucket 3 Empty
  (4)  undefined,      ← Bucket 4 Empty
  (5)  undefined,      ← Bucket 5 Empty
  (6)  undefined,      ← Bucket 6 Empty
  (7)  [["John","555-234"]]  ← Bucket 7: [["John","555-234"]]  ✅
]

Output di console:
┌──────────────────────────────────────────────┐
│ Bucket 0 Empty                               │
│ Bucket 1 Empty                               │
│ Bucket 2 Empty                               │
│ Bucket 3 Empty                               │
│ Bucket 4 Empty                               │
│ Bucket 5 Empty                               │
│ Bucket 6 Empty                               │
│ Bucket 7: [["John","555-234"]]  ← ADA DATA! │
└──────────────────────────────────────────────┘
```

Kalau dipanggil saat hash table masih kosong:

```js
const myHashTable = new HashTable();
myHashTable.printTable();
// (tidak ada output karena storage.length = 0, loop tidak jalan)
```

```
this.storage = []   ← length = 0
                         │
                         ▼
              Loop: i < 0? TIDAK
                         │
                         ▼
               Loop TIDAK dijalankan
                         │
                         ▼
               Tidak ada output sama sekali
```

> 💡 Method ini **tidak** pakai underscore karena memang dirancang untuk dipanggil dari luar class.

---

<a name="method-set"></a>
## ✏️ Method `set` — Menyimpan Data ke Hash Table

Ini method paling penting di Part 1! Fungsinya mirip seperti `Map.set()` — menyimpan pasangan key-value ke dalam hash table.

```js
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
```

### 🗺️ Peta Alur Logika `set` — Flowchart

```
set(key, value) dipanggil
        │
        ▼
┌─────────────────────┐
│ Hitung index dari   │
│ key via _hash()     │
└────────┬────────────┘
         │
         ▼
┌─────────────────────────────┐
│ Apakah storage[index]       │
│ === undefined?              │
└────────┬───────────┬────────┘
         │           │
        YA        TIDAK
         │           │
         ▼           ▼
┌──────────────┐ ┌───────────────────┐
│ Masukkan     │ │ Loop semua pair   │
│ [[key, val]] │ │ di bucket         │
│ langsung     │ └────────┬──────────┘
└──────────────┘          │
                          ▼
                 ┌─────────────────┐
                 │ Key sudah ada?  │
                 └───┬─────────┬───┘
                     │         │
                    YA      TIDAK
                     │         │
                     ▼         ▼
              ┌───────────┐ ┌──────────────┐
              │ Update    │ │ Push pair    │
              │ value-nya │ │ baru ke      │
              │ saja      │ │ bucket       │
              └───────────┘ └──────────────┘
```

### Alur Kerja `set` — Step by Step:

---

**Step 1: Dapatkan index** dari hash function

```js
const index = this._hash(key, this.limit);
```

```
set("Jhon", "555-234-3455")
      │
      ▼
  _hash("Jhon", 14)
      │
      ├─ J(74) + h(104) + o(111) + n(110) = 399
      ├─ 399 % 14 = 7
      │
      └─ index = 7 ✅
```

Key yang kita masukkan di-hash menjadi nomor index (bucket).

---

**Step 2: Cek apakah bucket kosong?**

```js
if (this.storage[index] === undefined) {
  this.storage[index] = [[key, value]];
}
```

```
Kondisi: storage[7] === undefined? → YA! (belum ada apa-apa)

SEBELUM:
  storage[7] = undefined

SESUDAH:
  storage[7] = [ ["Jhon", "555-234-3455"] ]

Detail Struktur:
  storage[7] = [                          ← Array luar (Bucket)
                 ["Jhon", "555-234-3455"] ← Array dalam (Pair)
               ]                            [0]=Key  [1]=Value
```

Kalau bucket di index tersebut **belum ada isinya** (`undefined`), langsung masukkan key-value pair ke sana. Perhatikan formatnya:

```
[[key, value]]
│ │          │
│ └── Pair ──┘
│
└── Bucket (bisa menampung banyak pair)

Kenapa array di dalam array?
┌────────────────────────────────────────────────────┐
│ Bucket bisa menampung BANYAK pair jika terjadi     │
│ collision (2 key berbeda menghasilkan index sama)  │
│                                                     │
│ Contoh Bucket dengan 1 pair:                        │
│   [ ["John", "555"] ]                               │
│                                                     │
│ Contoh Bucket dengan 2 pair (collision):            │
│   [ ["John", "555"], ["Alice", "999"] ]             │
│      ↑ Pair 0            ↑ Pair 1                   │
└────────────────────────────────────────────────────┘
```

---

<a name="collision-handling"></a>
### 🔄 Collision Handling — Menangani Tabrakan

**Step 3: Kalau bucket SUDAH ada isinya** (kemungkinan collision!)

```js
else {
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
```

### 🔍 Visualisasi — Skenario A: Key Sudah Ada (Update Value)

```
Misalnya kita panggil: set("Jhon", "999-NEW-NUMBER")

State saat ini:
  storage[7] = [ ["Jhon", "555-234-3455"] ]
                     ↑
                 Key = "Jhon"

Langkah:
  1. index = _hash("Jhon", 14) = 7
  2. storage[7] !== undefined → masuk ELSE
  3. inserted = false
  4. Loop i=0:
     │  storage[7][0][0] === "Jhon"?
     │  "Jhon" === "Jhon"? → YA! ✅
     │  │
     │  ▼
     │  storage[7][0][1] = "999-NEW-NUMBER"  ← UPDATE!
     │  inserted = true
     │
  5. inserted === false? → TIDAK (sudah true)
     → Tidak push apa-apa

HASIL:
  SEBELUM: storage[7] = [ ["Jhon", "555-234-3455"] ]
  SESUDAH: storage[7] = [ ["Jhon", "999-NEW-NUMBER"] ]
                                      ↑
                                 Value DIUPDATE!
```

### 🔍 Visualisasi — Skenario B: Key Baru di Bucket yang Sama (Collision)

```
Misalnya _hash("Alice", 14) juga = 7 (collision!)

State saat ini:
  storage[7] = [ ["Jhon", "555-234-3455"] ]

Langkah:
  1. index = _hash("Alice", 14) = 7
  2. storage[7] !== undefined → masuk ELSE
  3. inserted = false
  4. Loop i=0:
     │  storage[7][0][0] === "Alice"?
     │  "Jhon" === "Alice"? → TIDAK ❌
     │
  5. Loop selesai, inserted masih false
  6. inserted === false? → YA!
     │
     ▼
     storage[7].push(["Alice", "555-999-0000"])

HASIL:
  SEBELUM: storage[7] = [ ["Jhon","555-234-3455"] ]

  SESUDAH: storage[7] = [ ["Jhon","555-234-3455"],
                           ["Alice","555-999-0000"] ]
                            ↑
                       DITAMBAHKAN! (collision handled)

Visualisasi Bucket 7:
  ┌──────────────────────────────────────────────┐
  │ Bucket 7                                      │
  │ ┌──────────────────────────────┐              │
  │ │ Pair 0: ["Jhon","555-234"]   │ ← Existing  │
  │ └──────────────────────────────┘              │
  │ ┌──────────────────────────────┐              │
  │ │ Pair 1: ["Alice","555-999"]  │ ← NEW!      │
  │ └──────────────────────────────┘              │
  └──────────────────────────────────────────────┘
```

**Apa yang terjadi di sini? (Ringkasan)**

1. Buat flag `inserted = false`
2. **Loop** semua key-value pair yang sudah ada di bucket tersebut
3. **Cek** — apakah key yang mau kita masukkan **sudah ada** di bucket?
   - ✅ **Sudah ada** → **Update** value-nya saja, set `inserted = true`
   - ❌ **Belum ada** → Setelah loop selesai, cek `inserted`. Kalau masih `false`, berarti key-nya baru → **Push** key-value pair baru ke bucket

> 💡 **Collision** terjadi ketika dua key berbeda menghasilkan hash yang sama. Semakin canggih hash function-nya, semakin kecil kemungkinan collision.

---

<a name="menguji-method-set"></a>
### 🧪 Menguji Method `set`

Sekarang mari kita coba masukkan beberapa data:

```js
const HashTable = require('./custom-hash-table');

const myHashTable = new HashTable();

myHashTable.set('Jhon', '555-234-3455');
myHashTable.set('James', '555-373-3948');
myHashTable.set('Sara', '555-328-3384');

myHashTable.printTable();
```

### 🔍 Visualisasi — Proses Penyimpanan Step by Step

```
═══════════════════════════════════════════════════
  Step 1: set('Jhon', '555-234-3455')
═══════════════════════════════════════════════════

  _hash("Jhon", 14):
    J(74) + h(104) + o(111) + n(110) = 399
    399 % 14 = 7

  storage[7] = undefined → Langsung masukkan!
  storage[7] = [["Jhon", "555-234-3455"]]

  Storage sekarang:
  ┌───────┬────────────────────────────────┐
  │ Idx 7 │ [["Jhon", "555-234-3455"]]     │
  └───────┴────────────────────────────────┘
  (bucket lainnya masih kosong)

═══════════════════════════════════════════════════
  Step 2: set('James', '555-373-3948')
═══════════════════════════════════════════════════

  _hash("James", 14):
    J(74) + a(97) + m(109) + e(101) + s(115) = 496
    496 % 14 = 6

  storage[6] = undefined → Langsung masukkan!
  storage[6] = [["James", "555-373-3948"]]

  Storage sekarang:
  ┌───────┬────────────────────────────────┐
  │ Idx 6 │ [["James", "555-373-3948"]]    │
  │ Idx 7 │ [["Jhon", "555-234-3455"]]     │
  └───────┴────────────────────────────────┘

═══════════════════════════════════════════════════
  Step 3: set('Sara', '555-328-3384')
═══════════════════════════════════════════════════

  _hash("Sara", 14):
    S(83) + a(97) + r(114) + a(97) = 391
    391 % 14 = 13

  storage[13] = undefined → Langsung masukkan!
  storage[13] = [["Sara", "555-328-3384"]]

  Storage sekarang:
  ┌────────┬────────────────────────────────┐
  │ Idx 6  │ [["James", "555-373-3948"]]    │
  │ Idx 7  │ [["Jhon", "555-234-3455"]]     │
  │ Idx 13 │ [["Sara", "555-328-3384"]]     │
  └────────┴────────────────────────────────┘
```

**Output `printTable()`:**

```
Bucket 0 Empty
Bucket 1 Empty
Bucket 2 Empty
Bucket 3 Empty
Bucket 4 Empty
Bucket 5 Empty
Bucket 6: [["James","555-373-3948"]]
Bucket 7: [["Jhon","555-234-3455"]]
Bucket 8 Empty
Bucket 9 Empty
Bucket 10 Empty
Bucket 11 Empty
Bucket 12 Empty
Bucket 13: [["Sara","555-328-3384"]]
```

### 📊 Visualisasi Final — State Lengkap Hash Table

```
┌────────────────────────────────────────────────────────┐
│              🗄️  HASH TABLE (limit: 14)                │
├─────────┬──────────────────────────────────────────────┤
│ Bucket  │ Isi                                          │
├─────────┼──────────────────────────────────────────────┤
│    0    │ ░░░░░░░░ Empty ░░░░░░░░                      │
│    1    │ ░░░░░░░░ Empty ░░░░░░░░                      │
│    2    │ ░░░░░░░░ Empty ░░░░░░░░                      │
│    3    │ ░░░░░░░░ Empty ░░░░░░░░                      │
│    4    │ ░░░░░░░░ Empty ░░░░░░░░                      │
│    5    │ ░░░░░░░░ Empty ░░░░░░░░                      │
│    6    │ ✅ James → 555-373-3948                       │
│    7    │ ✅ Jhon  → 555-234-3455                       │
│    8    │ ░░░░░░░░ Empty ░░░░░░░░                      │
│    9    │ ░░░░░░░░ Empty ░░░░░░░░                      │
│   10    │ ░░░░░░░░ Empty ░░░░░░░░                      │
│   11    │ ░░░░░░░░ Empty ░░░░░░░░                      │
│   12    │ ░░░░░░░░ Empty ░░░░░░░░                      │
│   13    │ ✅ Sara  → 555-328-3384                       │
├─────────┴──────────────────────────────────────────────┤
│   📊 Terpakai: 3/14 bucket (21.4%)                     │
└────────────────────────────────────────────────────────┘
```

> 🎯 Setiap nama (key) di-hash dan mendapat **nomor bucket yang berbeda**. Data tersimpan rapi di lokasi yang tepat — itulah keindahan hash table!

---

<a name="kode-lengkap"></a>
## 📦 Kode Lengkap Part 1

<details>
  <summary>📄 Klik Untuk Melihat Kode Lengkap</summary>

### `custom-hash-table.js`

```js
class HashTable {
  constructor(limit = 14) {
    this.storage = [];
    this.limit = limit;
  }

  // 🔐 Hash function (private)
  _hash(key, max) {
    let hash = 0;

    for (let i = 0; i < key.length; i++) {
      hash += key.charCodeAt(i);
    }

    return hash % max;
  }

  // 🖨️ Print isi hash table
  printTable() {
    for (let i = 0; i < this.storage.length; i++) {
      if (this.storage[i] !== undefined) {
        console.log(`Bucket ${i}: ${JSON.stringify(this.storage[i])}`);
      } else {
        console.log(`Bucket ${i} Empty`);
      }
    }
  }

  // ✏️ Set key-value pair
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
}

module.exports = HashTable;
```

### `custom-hash-table-run.js`

```js
const HashTable = require('./custom-hash-table');

const myHashTable = new HashTable();

myHashTable.set('Jhon', '555-234-3455');
myHashTable.set('James', '555-373-3948');
myHashTable.set('Sara', '555-328-3384');

myHashTable.printTable();
```

</details>

---

<a name="selanjutnya"></a>
## 🔮 Apa Selanjutnya?

Di **Part 2**, kita akan menambahkan method-method lain ke class `HashTable`:

| Method | Fungsi |
|---|---|
| `get(key)` | Mengambil value berdasarkan key |
| `remove(key)` | Menghapus key-value pair dari hash table |
| `getValues()` | Mengambil semua values yang tersimpan |

```
Part 1 (Sekarang)          Part 2 (Berikutnya)
┌──────────────────┐      ┌──────────────────┐
│ ✅ constructor    │      │ 📋 get()          │
│ ✅ _hash()        │  →   │ 📋 remove()       │
│ ✅ printTable()   │      │ 📋 getValues()    │
│ ✅ set()          │      │                    │
└──────────────────┘      └──────────────────┘
```

Dan setelah hash table selesai, kursus akan berlanjut ke struktur data lain yang lebih kompleks seperti **Stacks**, **Queues**, dan **Trees**! 🌳

---

> 📝 **Catatan Pribadi**: Hash table ini memang bukan implementasi paling canggih — hash function kita cukup sederhana dan masih bisa menghasilkan collision. Tapi tujuannya adalah untuk **memahami konsep dasar** bagaimana hash table bekerja di balik layar, mirip seperti `Map` bawaan JavaScript.
