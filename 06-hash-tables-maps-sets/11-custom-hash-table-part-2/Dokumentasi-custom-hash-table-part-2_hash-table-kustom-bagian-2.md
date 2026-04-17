# 🏗️ Custom Hash Table — Part 2: Method `get`, `remove`, `has`, & `clear`

> **Di Part 2 ini, kita akan melengkapi class `HashTable` kita dengan method-method penting: `get` untuk mengambil data, `remove` untuk menghapus data, `has` untuk mengecek keberadaan key, dan `clear` untuk mengosongkan seluruh hash table. Setelah ini, hash table kita punya fitur lengkap mirip `Map` bawaan JavaScript! 🎉**

---

## 📋 Daftar Isi

- 🎯 [Pengenalan — Apa yang Akan Kita Tambahkan?](#pengenalan)
- 🔍 [Method `get` — Mengambil Value Berdasarkan Key](#method-get)
  - 🧪 [Menguji Method `get`](#menguji-method-get)
- 🗑️ [Method `remove` — Menghapus Key-Value Pair](#method-remove)
  - 🧩 [Skenario 1: Bucket Hanya Punya Satu Pair](#skenario-satu-pair)
  - 🧩 [Skenario 2: Bucket Punya Banyak Pair (Collision)](#skenario-banyak-pair)
  - 🧪 [Menguji Method `remove`](#menguji-method-remove)
- ✅ [Method `has` — Mengecek Keberadaan Key](#method-has)
  - 🧪 [Menguji Method `has`](#menguji-method-has)
- 🧹 [Method `clear` — Mengosongkan Hash Table](#method-clear)
  - 🧪 [Menguji Method `clear`](#menguji-method-clear)
- 📦 [Kode Lengkap Part 2](#kode-lengkap)
- 🧪 [Menjalankan Test](#menjalankan-test)
- 🔮 [Apa Selanjutnya?](#selanjutnya)

---

<a name="pengenalan"></a>
## 🎯 Pengenalan — Apa yang Akan Kita Tambahkan?

Di Part 1 kita sudah membangun fondasi hash table dengan `constructor`, `_hash`, `set`, dan `printTable`. Sekarang saatnya menambahkan method-method yang membuat hash table kita **benar-benar fungsional** — bisa mengambil, menghapus, mengecek, dan membersihkan data!

### 📊 Progress Kita

```
Part 1 (Selesai ✅)              Part 2 (Sekarang 🏗️)
┌──────────────────────┐        ┌──────────────────────┐
│ ✅ constructor        │        │ 📋 get(key)           │
│ ✅ _hash(key, max)    │   →    │ 📋 remove(key)        │
│ ✅ set(key, value)    │        │ 📋 has(key)           │
│ ✅ printTable()       │        │ 📋 clear()            │
└──────────────────────┘        └──────────────────────┘
```

### 🗺️ Ringkasan Method Baru

| Method | Fungsi | Return |
|---|---|---|
| `get(key)` | Mengambil value berdasarkan key | Value atau `undefined` |
| `remove(key)` | Menghapus key-value pair | - |
| `has(key)` | Mengecek apakah key ada | `true` atau `false` |
| `clear()` | Mengosongkan seluruh hash table | - |

> 💡 Semua method ini bekerja mirip seperti method bawaan `Map` di JavaScript — jadi kalau kamu sudah familiar dengan `Map`, konsepnya akan terasa familiar!

---

<a name="method-get"></a>
## 🔍 Method `get` — Mengambil Value Berdasarkan Key

Method `get` memungkinkan kita mengambil value yang sudah tersimpan di hash table, cukup dengan memberikan key-nya saja. Mirip seperti `Map.get()`.

```js
get(key) {
  // Hash the key
  const index = this._hash(key, this.limit);
  
  // If the index is empty, return undefined
  if (this.storage[index] === undefined) {
    return undefined;
  } else {
    // If the index is not empty, iterate through the bucket
    for (let i = 0; i < this.storage[index].length; i++) {
      // If the key exists, return the value
      if (this.storage[index][i][0] === key) {
        return this.storage[index][i][1];
      }
    }
  }
}
```

### 🗺️ Flowchart — Alur Logika `get`

```
get(key) dipanggil
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
│ return       │ │ Loop semua pair   │
│ undefined    │ │ di bucket         │
└──────────────┘ └────────┬──────────┘
                          │
                          ▼
                 ┌─────────────────┐
                 │ Key ditemukan?  │
                 └───┬─────────┬───┘
                     │         │
                    YA      TIDAK
                     │         │
                     ▼         ▼
              ┌───────────┐ ┌──────────────┐
              │ return    │ │ Lanjut loop  │
              │ value     │ │ (atau selesai│
              │           │ │ tanpa return)│
              └───────────┘ └──────────────┘
```

### 🔍 Penjelasan Step by Step

---

**Step 1: Hash key menjadi index**

```js
const index = this._hash(key, this.limit);
```

Sama seperti di method `set`, langkah pertama selalu meng-hash key untuk mendapatkan **nomor bucket** tempat data kemungkinan disimpan.

```
get("Jhon")
     │
     ▼
  _hash("Jhon", 14) = 7
     │
     └─ Kita tahu: kalau "Jhon" ada, dia pasti di Bucket 7!
```

---

**Step 2: Cek apakah bucket kosong?**

```js
if (this.storage[index] === undefined) {
  return undefined;
}
```

Kalau bucket di index tersebut **kosong** (`undefined`), itu artinya key yang dicari **pasti tidak ada** di hash table. Langsung return `undefined`.

```
Misal get("test"):
  _hash("test", 14) = ??? (misalnya 3)

  storage[3] === undefined? → YA!
        │
        ▼
  return undefined  ← Key tidak ditemukan!
```

---

**Step 3: Loop dan cari key yang cocok**

```js
for (let i = 0; i < this.storage[index].length; i++) {
  if (this.storage[index][i][0] === key) {
    return this.storage[index][i][1];
  }
}
```

Kalau bucket **ada isinya**, kita perlu iterasi semua key-value pair di dalamnya. Kenapa? Karena bisa saja ada **collision** — beberapa pair berbagi bucket yang sama.

```
Misal Bucket 7 berisi 2 pair (ada collision):
  storage[7] = [ ["Jhon", "555-234"], ["Alice", "555-999"] ]
                   ↑ pair 0              ↑ pair 1

get("Alice"):
  Loop i=0: storage[7][0][0] = "Jhon"  → "Jhon" === "Alice"? ❌
  Loop i=1: storage[7][1][0] = "Alice" → "Alice" === "Alice"? ✅
            │
            └─ return storage[7][1][1] → "555-999" 🎉
```

### 🔍 Cara Mengakses Key dan Value dalam Array

Penting untuk memahami bagaimana kita mengakses data di dalam bucket:

```
this.storage[index][i][0]  ← KEY
this.storage[index][i][1]  ← VALUE

Penjelasan indeks:
┌──────────────────────────────────────────────────────────┐
│ this.storage[index]      → Mengambil bucket pada index   │
│ this.storage[index][i]   → Mengambil pair ke-i di bucket │
│ this.storage[index][i][0]→ Mengambil KEY dari pair       │
│ this.storage[index][i][1]→ Mengambil VALUE dari pair     │
└──────────────────────────────────────────────────────────┘

Contoh Konkret:
  storage[7] = [ ["Jhon", "555-234-3455"] ]

  storage[7]       → [ ["Jhon", "555-234-3455"] ]  (bucket)
  storage[7][0]    → ["Jhon", "555-234-3455"]       (pair)
  storage[7][0][0] → "Jhon"                         (key)
  storage[7][0][1] → "555-234-3455"                  (value)
```

---

<a name="menguji-method-get"></a>
### 🧪 Menguji Method `get`

```js
const HashTable = require('./custom-hash-table');

const myHashTable = new HashTable();

myHashTable.set('Jhon', '555-234-3455');
myHashTable.set('James', '555-373-3948');
myHashTable.set('Sara', '555-328-3384');

console.log(myHashTable.get('Jhon'));   // "555-234-3455"
console.log(myHashTable.get('Sara'));   // "555-328-3384"
console.log(myHashTable.get('test'));   // undefined
```

### 🔍 Visualisasi — Eksekusi `get` Step by Step

```
══════════════════════════════════════════════
  Test 1: get('Jhon')
══════════════════════════════════════════════

  _hash("Jhon", 14) = 7
  storage[7] = [["Jhon", "555-234-3455"]]
  storage[7] === undefined? → TIDAK
  
  Loop i=0:
    storage[7][0][0] === "Jhon"?
    "Jhon" === "Jhon"? → YA! ✅
    return storage[7][0][1] → "555-234-3455"

  Output: "555-234-3455" ✅

══════════════════════════════════════════════
  Test 2: get('Sara')
══════════════════════════════════════════════

  _hash("Sara", 14) = 13
  storage[13] = [["Sara", "555-328-3384"]]
  storage[13] === undefined? → TIDAK
  
  Loop i=0:
    storage[13][0][0] === "Sara"?
    "Sara" === "Sara"? → YA! ✅
    return storage[13][0][1] → "555-328-3384"

  Output: "555-328-3384" ✅

══════════════════════════════════════════════
  Test 3: get('test')
══════════════════════════════════════════════

  _hash("test", 14) = ???
  storage[???] === undefined? → YA!
  return undefined

  Output: undefined ✅ (key tidak ditemukan)
```

---

<a name="method-remove"></a>
## 🗑️ Method `remove` — Menghapus Key-Value Pair

Method `remove` menghapus key-value pair dari hash table berdasarkan key-nya. Tapi ada **dua skenario** yang harus kita tangani:

1. **Bucket hanya punya 1 pair** — hapus seluruh bucket
2. **Bucket punya banyak pair** (collision) — hapus pair yang spesifik saja

```js
remove(key) {
  // Hash the key
  const index = this._hash(key, this.limit);
  // Check if the bucket exists
  if (this.storage[index]) {
    // If the key matches and there is only one item in the bucket, delete the bucket
    if (
      this.storage[index].length === 1 &&
      this.storage[index][0][0] === key
    ) {
      delete this.storage[index];
    } else {
      // If there are multiple items, iterate through the bucket
      for (let i = 0; i < this.storage[index].length; i++) {
        // If the key exists, delete the key-value pair
        if (this.storage[index][i][0] === key) {
          delete this.storage[index][i];
        }
      }
    }
  }
}
```

### 🗺️ Flowchart — Alur Logika `remove`

```
remove(key) dipanggil
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
│ ada (truthy)?               │
└────────┬───────────┬────────┘
         │           │
        YA        TIDAK
         │           │
         ▼           ▼
┌──────────────┐  (tidak terjadi
│ Cek: apakah  │   apa-apa)
│ hanya 1 pair │
│ di bucket?   │
└───┬──────┬───┘
    │      │
   YA    TIDAK
    │      │
    ▼      ▼
┌────────┐ ┌───────────────────┐
│ Key    │ │ Loop semua pair   │
│ cocok? │ │ di bucket         │
└──┬──┬──┘ └────────┬──────────┘
   │  │             │
  YA TIDAK          ▼
   │  │    ┌─────────────────┐
   ▼  ▼   │ Key ditemukan?  │
┌──────┐  └───┬─────────┬───┘
│delete│      │         │
│bucket│     YA      TIDAK
│      │      │         │
└──────┘      ▼         ▼
         ┌──────────┐ (skip)
         │ delete   │
         │ pair itu │
         │ saja     │
         └──────────┘
```

### 🔍 Penjelasan Step by Step

---

**Step 1: Hash key menjadi index**

```js
const index = this._hash(key, this.limit);
```

Seperti biasa, kita hash key dulu untuk tahu di bucket mana data berada.

---

**Step 2: Cek apakah bucket ada?**

```js
if (this.storage[index]) {
```

Kalau bucket di index tersebut **tidak ada** (falsy/undefined), berarti key yang mau dihapus memang tidak pernah ada. Tidak perlu lakukan apa-apa.

> 💡 Di sini kita pakai **truthy check** (`if (this.storage[index])`) bukan perbandingan eksplisit (`!== undefined`). Keduanya bekerja sama dalam konteks ini.

---

<a name="skenario-satu-pair"></a>
### 🧩 Skenario 1: Bucket Hanya Punya Satu Pair

**Step 3a: Jika bucket hanya punya 1 pair dan key cocok — hapus seluruh bucket**

```js
if (
  this.storage[index].length === 1 &&
  this.storage[index][0][0] === key
) {
  delete this.storage[index];
}
```

Kenapa kita **hapus seluruh bucket** (bukan cuma pair-nya)? Karena kalau bucket hanya punya satu pair dan itu yang mau dihapus, maka bucket-nya pun jadi kosong — lebih bersih kalau langsung dihapus.

```
Skenario: remove("James")

SEBELUM:
  storage[6] = [ ["James", "555-373-3948"] ]
                  ↑ hanya 1 pair!

Pemeriksaan:
  storage[6].length === 1?          → YA ✅
  storage[6][0][0] === "James"?     → YA ✅

Aksi: delete this.storage[6]

SESUDAH:
  storage[6] = undefined  ← Bucket terhapus! 🗑️

Visualisasi:
  ┌───────┬───────────────────────────────┐
  │ Idx 6 │ [["James","555-373-3948"]] 🗑️ │  ← DIHAPUS
  │ Idx 7 │ [["Jhon","555-234-3455"]]     │  ← Tetap
  │Idx 13 │ [["Sara","555-328-3384"]]     │  ← Tetap
  └───────┴───────────────────────────────┘
                        ▼
  ┌───────┬───────────────────────────────┐
  │ Idx 6 │ ░░░░░░░░ Empty ░░░░░░░░      │  ← Sudah kosong
  │ Idx 7 │ [["Jhon","555-234-3455"]]     │  ← Tetap
  │Idx 13 │ [["Sara","555-328-3384"]]     │  ← Tetap
  └───────┴───────────────────────────────┘
```

---

<a name="skenario-banyak-pair"></a>
### 🧩 Skenario 2: Bucket Punya Banyak Pair (Collision)

**Step 3b: Jika bucket punya lebih dari 1 pair — loop dan hapus pair yang spesifik**

```js
else {
  for (let i = 0; i < this.storage[index].length; i++) {
    if (this.storage[index][i][0] === key) {
      delete this.storage[index][i];
    }
  }
}
```

Kalau ada **collision** (beberapa pair di bucket yang sama), kita tidak bisa hapus seluruh bucket — nanti data lain ikut hilang! Jadi kita **loop** dan cari pair yang key-nya cocok, lalu hapus pair itu saja.

```
Skenario: remove("Alice") — bucket punya 2 pair

SEBELUM:
  storage[7] = [ ["Jhon","555-234"], ["Alice","555-999"] ]
                  ↑ pair 0             ↑ pair 1

Pemeriksaan:
  storage[7].length === 1? → TIDAK (length = 2)
  → Masuk ke ELSE

Loop:
  i=0: storage[7][0][0] = "Jhon"  → "Jhon" === "Alice"? ❌ skip
  i=1: storage[7][1][0] = "Alice" → "Alice" === "Alice"? ✅ DELETE!

Aksi: delete this.storage[7][1]

SESUDAH:
  storage[7] = [ ["Jhon","555-234"], <empty> ]
                                      ↑ pair 1 terhapus!

Visualisasi Bucket 7:
  SEBELUM:                          SESUDAH:
  ┌──────────────────────────┐     ┌──────────────────────────┐
  │ Bucket 7                 │     │ Bucket 7                 │
  │ ┌──────────────────────┐ │     │ ┌──────────────────────┐ │
  │ │ Pair 0: Jhon → 555   │ │     │ │ Pair 0: Jhon → 555   │ │
  │ └──────────────────────┘ │     │ └──────────────────────┘ │
  │ ┌──────────────────────┐ │     │                          │
  │ │ Pair 1: Alice → 999  │ │     │ 🗑️ Pair 1: DELETED      │
  │ └──────────────────────┘ │     │                          │
  └──────────────────────────┘     └──────────────────────────┘
```

---

<a name="menguji-method-remove"></a>
### 🧪 Menguji Method `remove`

```js
const HashTable = require('./custom-hash-table');

const myHashTable = new HashTable();

myHashTable.set('Jhon', '555-234-3455');
myHashTable.set('James', '555-373-3948');
myHashTable.set('Sara', '555-328-3384');

// Hapus James
myHashTable.remove('James');

// Print untuk melihat hasilnya
myHashTable.printTable();

// Coba get James — harusnya undefined
console.log(myHashTable.get('James')); // undefined
```

### 🔍 Visualisasi — Hasil Setelah `remove('James')`

```
SEBELUM remove:
┌────────┬────────────────────────────────┐
│ Idx 6  │ ✅ [["James","555-373-3948"]]   │
│ Idx 7  │ ✅ [["Jhon","555-234-3455"]]    │
│ Idx 13 │ ✅ [["Sara","555-328-3384"]]    │
└────────┴────────────────────────────────┘

                    ▼ remove('James')

SESUDAH remove:
┌────────┬────────────────────────────────┐
│ Idx 6  │ ░░░░░░░░ Empty ░░░░░░░░ 🗑️    │  ← James DIHAPUS
│ Idx 7  │ ✅ [["Jhon","555-234-3455"]]    │
│ Idx 13 │ ✅ [["Sara","555-328-3384"]]    │
└────────┴────────────────────────────────┘

Output printTable():
  Bucket 0 Empty
  ...
  Bucket 6 Empty          ← James sudah tidak ada!
  Bucket 7: [["Jhon","555-234-3455"]]
  ...
  Bucket 13: [["Sara","555-328-3384"]]

console.log(myHashTable.get('James'));
  → undefined ✅
```

---

<a name="method-has"></a>
## ✅ Method `has` — Mengecek Keberadaan Key

Method `has` mengecek apakah sebuah key ada di dalam hash table. Return `true` kalau ada, `false` kalau tidak. Mirip seperti `Map.has()`.

```js
has(key) {
  // Hash the key to find the index
  const index = this._hash(key, this.limit);
  
  // Check if the bucket at the index exists
  if (this.storage[index]) {
    // Iterate through the bucket's key-value pairs
    for (let i = 0; i < this.storage[index].length; i++) {
      // Compare the current key with the target key
      if (this.storage[index][i][0] === key) {
        // If the key is found, return true
        return true;
      }
    }
  }
  
  // If the key is not found, return false
  return false;
}
```

### 🗺️ Flowchart — Alur Logika `has`

```
has(key) dipanggil
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
│ ada (truthy)?               │
└────────┬───────────┬────────┘
         │           │
        YA        TIDAK
         │           │
         ▼           │
┌───────────────────┐ │
│ Loop semua pair   │ │
│ di bucket         │ │
└────────┬──────────┘ │
         │            │
         ▼            │
┌─────────────────┐   │
│ Key ditemukan?  │   │
└───┬─────────┬───┘   │
    │         │        │
   YA      TIDAK       │
    │         │        │
    ▼         └────────┤
┌────────┐             │
│ return │             ▼
│ true ✅ │       ┌────────┐
└────────┘       │ return │
                 │false ❌│
                 └────────┘
```

### 🔍 Penjelasan Step by Step

Perhatikan bahwa logika `has` sangat mirip dengan `get`. Perbedaannya hanya di **apa yang di-return**:

| Method | Kalau key ditemukan | Kalau key tidak ditemukan |
|---|---|---|
| `get` | return **value** | return `undefined` |
| `has` | return **`true`** | return **`false`** |

---

**Step 1: Hash key menjadi index**

```js
const index = this._hash(key, this.limit);
```

---

**Step 2: Cek apakah bucket ada?**

```js
if (this.storage[index]) {
```

Kalau bucket tidak ada → langsung loncat ke `return false` di akhir function.

---

**Step 3: Loop dan cari key yang cocok**

```js
for (let i = 0; i < this.storage[index].length; i++) {
  if (this.storage[index][i][0] === key) {
    return true;
  }
}
```

Loop semua pair di bucket. Begitu ketemu key yang cocok → langsung `return true`.

---

**Step 4: Kalau tidak ketemu → return false**

```js
return false;
```

Kalau setelah loop selesai (atau bucket tidak ada) key tetap tidak ditemukan, return `false`.

> 💡 **Perhatikan**: `return false` ditempatkan di **luar** blok `if` — jadi dia jadi **default return** kalau bucket kosong ATAU key tidak ditemukan setelah loop. Kita tidak perlu `else` di sini.

```
Kenapa tanpa ELSE?

has("test") — key yang tidak ada:

  Step 1: _hash("test", 14) = ???
  Step 2: storage[???] → undefined (falsy)
  Step 3: if block TIDAK dimasuki
  Step 4: Langsung ke return false ↓

  ┌──────────────────────────────────────┐
  │  if (this.storage[index]) {          │ ← SKIP (falsy)
  │    // ... loop ...                   │
  │    // ... return true ...            │
  │  }                                   │
  │                                      │
  │  return false; ← LANGSUNG KE SINI!  │
  └──────────────────────────────────────┘
```

---

<a name="menguji-method-has"></a>
### 🧪 Menguji Method `has`

```js
const HashTable = require('./custom-hash-table');

const myHashTable = new HashTable();

myHashTable.set('Jhon', '555-234-3455');
myHashTable.set('James', '555-373-3948');
myHashTable.set('Sara', '555-328-3384');

// Hapus James dulu
myHashTable.remove('James');

// Cek keberadaan key
console.log(myHashTable.has('James')); // false  (sudah dihapus)
console.log(myHashTable.has('Jhon'));   // true   (masih ada)
```

### 🔍 Visualisasi — Eksekusi `has` Step by Step

```
State hash table setelah remove('James'):
  storage[7]  = [["Jhon", "555-234-3455"]]
  storage[13] = [["Sara", "555-328-3384"]]
  storage[6]  = undefined  ← James sudah dihapus!

══════════════════════════════════════════════
  Test 1: has('James')
══════════════════════════════════════════════

  _hash("James", 14) = 6
  storage[6] → undefined (falsy)
  if block TIDAK dimasuki
  return false ❌

  Output: false ✅ (benar, James sudah dihapus)

══════════════════════════════════════════════
  Test 2: has('Jhon')
══════════════════════════════════════════════

  _hash("Jhon", 14) = 7
  storage[7] → [["Jhon","555-234-3455"]] (truthy)
  if block DIMASUKI

  Loop i=0:
    storage[7][0][0] === "Jhon"?
    "Jhon" === "Jhon"? → YA! ✅
    return true

  Output: true ✅ (benar, Jhon masih ada)
```

---

<a name="method-clear"></a>
## 🧹 Method `clear` — Mengosongkan Hash Table

Method `clear` adalah method **paling sederhana** dari semuanya! Tugasnya hanya satu: mengosongkan seluruh hash table dengan mengganti `storage` dengan array kosong baru.

```js
clear() {
  this.storage = [];
}
```

Itu saja! 😄 Cukup set `this.storage` menjadi array kosong baru, dan semua data yang tersimpan langsung hilang.

### 🔍 Visualisasi — Apa yang Terjadi

```
SEBELUM clear():
┌────────────────────────────────────────────────────────┐
│              🗄️  HASH TABLE                            │
├─────────┬──────────────────────────────────────────────┤
│    6    │ ✅ James → 555-373-3948                       │
│    7    │ ✅ Jhon  → 555-234-3455                       │
│   13    │ ✅ Sara  → 555-328-3384                       │
├─────────┴──────────────────────────────────────────────┤
│   📊 Terpakai: 3/14 bucket                             │
└────────────────────────────────────────────────────────┘

                    ▼ clear()

SESUDAH clear():
┌────────────────────────────────────────────────────────┐
│              🗄️  HASH TABLE                            │
├────────────────────────────────────────────────────────┤
│                                                        │
│              🫙 Kosong! Tidak ada data.                 │
│                                                        │
├────────────────────────────────────────────────────────┤
│   📊 Terpakai: 0/14 bucket                             │
└────────────────────────────────────────────────────────┘
```

> 💡 `this.storage = []` membuat **array baru yang kosong** dan menggantikan array lama. Array lama (beserta semua datanya) akan di-*garbage collect* otomatis oleh JavaScript.

---

<a name="menguji-method-clear"></a>
### 🧪 Menguji Method `clear`

```js
const HashTable = require('./custom-hash-table');

const myHashTable = new HashTable();

myHashTable.set('Jhon', '555-234-3455');
myHashTable.set('James', '555-373-3948');
myHashTable.set('Sara', '555-328-3384');

// Kosongkan hash table
myHashTable.clear();

// Print — tidak ada output (storage kosong, length = 0)
myHashTable.printTable();
```

```
SESUDAH clear():
  this.storage = []
  storage.length = 0

  printTable():
    Loop: for (let i = 0; i < 0; i++)
                                ↑
                        0 < 0? → TIDAK!
                        Loop TIDAK dijalankan

  Output: (tidak ada) ← Hash table benar-benar kosong! ✅
```

---

<a name="kode-lengkap"></a>
## 📦 Kode Lengkap Part 2

<details>
  <summary>📄 Klik Untuk Melihat Kode Lengkap</summary>

### `custom-hash-table.js`

```js
class HashTable {
  constructor(limit = 14) {
    // Initialize the storage and limit variables
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

  // ✏️ Insert a key-value pair into the hash table
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

  // 🔍 Get a value from the hash table
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

  // 🗑️ Remove a key-value pair from the hash table
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

  // ✅ Check if a key exists in the hash table
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

  // 🖨️ Print all keys/values in the table
  printTable() {
    for (let i = 0; i < this.storage.length; i++) {
      if (this.storage[i] !== undefined) {
        console.log(`Bucket ${i}: ${JSON.stringify(this.storage[i])}`);
      } else {
        console.log(`Bucket ${i} Empty`);
      }
    }
  }

  // 🧹 Clear all key/values
  clear() {
    this.storage = [];
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

myHashTable.remove('James');

// console.log(myHashTable.has('James')); // false
// console.log(myHashTable.has('Sara'));   // true

myHashTable.clear();

myHashTable.printTable();
```

</details>

---

<a name="menjalankan-test"></a>
## 🧪 Menjalankan Test

Kursus ini juga menyediakan file test untuk memverifikasi semua method kita berfungsi dengan benar. File test menggunakan **Jest** dan menguji skenario-skenario berikut:

```js
// custom-hash-table.test.js

const HashTable = require('./custom-hash-table');

describe('HashTable', () => {
  let hashTable;

  beforeEach(() => {
    hashTable = new HashTable();
  });

  test('Set and get a key-value pair', () => {
    hashTable.set('firstName', 'John');
    expect(hashTable.get('firstName')).toBe('John');
  });

  test('Set and get multiple key-value pairs', () => {
    hashTable.set('firstName', 'John');
    hashTable.set('lastName', 'Smith');
    hashTable.set('age', 30);

    expect(hashTable.get('firstName')).toBe('John');
    expect(hashTable.get('lastName')).toBe('Smith');
    expect(hashTable.get('age')).toBe(30);
  });

  test('Get a value for a non-existent key', () => {
    expect(hashTable.get('city')).toBeUndefined();
  });

  test('Remove a key-value pair', () => {
    hashTable.set('firstName', 'John');
    hashTable.remove('firstName');

    expect(hashTable.get('firstName')).toBeUndefined();
  });

  test('Remove a non-existent key-value pair', () => {
    hashTable.set('firstName', 'John');
    hashTable.remove('lastName');

    expect(hashTable.get('firstName')).toBe('John');
  });
});
```

### 📊 Ringkasan Test

| Test Case | Yang Diuji | Expected |
|---|---|---|
| Set and get a key-value pair | `set` lalu `get` | Mendapat value yang benar |
| Set and get multiple pairs | Beberapa `set` lalu `get` | Semua value benar |
| Get non-existent key | `get` key yang tidak ada | `undefined` |
| Remove a pair | `set` → `remove` → `get` | `undefined` (terhapus) |
| Remove non-existent pair | `remove` key yang tidak ada | Data lain tidak terpengaruh |

### Menjalankan Test

```bash
npm test
```

```
Hasil yang diharapkan:
┌─────────────────────────────────────────────┐
│ PASS  ./custom-hash-table.test.js           │
│                                             │
│  HashTable                                  │
│   ✅ Set and get a key-value pair            │
│   ✅ Set and get multiple key-value pairs    │
│   ✅ Get a value for a non-existent key      │
│   ✅ Remove a key-value pair                 │
│   ✅ Remove a non-existent key-value pair    │
│                                             │
│ Test Suites: 1 passed, 1 total              │
│ Tests:       5 passed, 5 total              │
└─────────────────────────────────────────────┘
```

---

<a name="selanjutnya"></a>
## 🔮 Apa Selanjutnya?

Hash table kita sekarang sudah **lengkap**! 🎉 Kita punya semua operasi CRUD (Create, Read, Update, Delete) ditambah utilitas:

```
🏗️ HASH TABLE — FITUR LENGKAP
┌──────────────────────────────────────────────────┐
│                                                  │
│  ✅ constructor(limit)  → Inisialisasi            │
│  ✅ _hash(key, max)     → Hash function           │
│  ✅ set(key, value)     → Simpan/Update data      │
│  ✅ get(key)            → Ambil data               │
│  ✅ remove(key)         → Hapus data               │
│  ✅ has(key)            → Cek keberadaan key        │
│  ✅ printTable()        → Tampilkan isi table       │
│  ✅ clear()             → Kosongkan table           │
│                                                  │
│  📊 Mirip seperti Map bawaan JavaScript!          │
└──────────────────────────────────────────────────┘
```

### 🔄 Perbandingan dengan `Map` Bawaan JavaScript

| Operasi | Our HashTable | JavaScript Map |
|---|---|---|
| Simpan data | `set(key, value)` | `set(key, value)` |
| Ambil data | `get(key)` | `get(key)` |
| Hapus data | `remove(key)` | `delete(key)` |
| Cek key | `has(key)` | `has(key)` |
| Kosongkan | `clear()` | `clear()` |
| Lihat isi | `printTable()` | `forEach()` / `entries()` |

Selanjutnya, kursus akan menggunakan class `HashTable` ini dalam beberapa **challenge/exercises** untuk menyelesaikan problem-problem yang memanfaatkan hash table! 🚀

---

> 📝 **Catatan Pribadi**: For loop memang terasa repetitif, tapi seperti yang disebutkan di video — for loop adalah **fondasi computer science**. Kalau kamu cuma bikin UI kecil di React, mungkin jarang pakai. Tapi kalau sudah masuk ke data structure dan algorithm, for loop ada di mana-mana! Jadi pastikan kamu benar-benar paham cara kerjanya. 💪
