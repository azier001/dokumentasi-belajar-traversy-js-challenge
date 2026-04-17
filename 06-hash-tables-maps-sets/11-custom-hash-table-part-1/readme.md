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

> 💡 Parameter `limit` punya **default value** `= 14`, jadi kalau tidak diisi, otomatis bernilai 14.

---

<a name="hash-function"></a>
## 🔐 Hash Function — Jantung dari Hash Table

Hash function adalah **inti** dari sebuah hash table. Tugasnya sederhana tapi sangat penting:

> **Mengubah sebuah key (input) menjadi angka tetap (index)** — angka ini menentukan di mana data akan disimpan dalam array.

### 📬 Analogi Kotak Surat

Bayangkan kamu punya **deretan kotak surat** dan ingin mengatur surat berdasarkan alamat. Hash function itu seperti **formula yang mengubah setiap alamat menjadi nomor kotak surat tertentu**. Jadi kalau kamu perlu mencari surat, kamu langsung ke kotak yang tepat tanpa harus mengecek semua kotak satu per satu! 📮

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

**Langkah-langkahnya:**

1. **Inisialisasi** variabel `hash` dengan nilai `0`
2. **Loop** setiap karakter dalam `key`
3. **Tambahkan** character code setiap karakter ke `hash` (pakai `charCodeAt()`)
4. **Kembalikan** `hash % max` — modulus memastikan hasil selalu **kurang dari** `max`

> ⚠️ Nama method diawali **underscore** (`_hash`) karena ini method **private** — seharusnya hanya dipakai di dalam class, bukan dari luar.

### 📊 Contoh: Hash untuk Key `"John"`

Mari kita hitung manual hash dari key `"John"` dengan limit `14`:

| Karakter | Character Code (`charCodeAt`) |
|:---:|:---:|
| `J` | 74 |
| `o` | 111 |
| `h` | 104 |
| `n` | 110 |
| **Total** | **399** |

```
hash = 399
hash % 14 = 399 % 14 = 7 ✅
```

> 🎯 Jadi key `"John"` akan disimpan di **bucket ke-7** dalam array storage!

**Kenapa pakai modulus (`%`)?**
Supaya hasilnya **selalu dalam jangkauan** array kita. Kalau limit-nya 14, maka hasilnya pasti antara `0` sampai `13` — tidak mungkin keluar dari range bucket.

---

<a name="menguji-hash-function"></a>
### 🧪 Menguji Hash Function

Meskipun `_hash` adalah method private, kita bisa tes langsung untuk memahami cara kerjanya:

```js
const myHashTable = new HashTable();

const result = myHashTable._hash('John', myHashTable.limit);
console.log(result); // 7
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
      console.log(`Bucket ${i}: `);
    } else {
      console.log(`Bucket ${i} Empty`);
    }
  }
}
```

### Penjelasan:

1. **Loop** melalui semua index dalam `storage`
2. **Cek** apakah bucket tersebut ada isinya (`!== undefined`)
   - ✅ **Ada isi** → tampilkan nomor bucket + isinya (pakai `JSON.stringify` supaya array-nya terbaca)
   - ❌ **Kosong** → tampilkan `"Bucket X Empty"`

Kalau dipanggil saat hash table masih kosong:

```js
const myHashTable = new HashTable();
myHashTable.printTable();
// (tidak ada output karena storage masih kosong)
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

### Alur Kerja `set` — Step by Step:

**Step 1: Dapatkan index** dari hash function

```js
const index = this._hash(key, this.limit);
```
Key yang kita masukkan di-hash menjadi nomor index (bucket).

---

**Step 2: Cek apakah bucket kosong?**

```js
if (this.storage[index] === undefined) {
  this.storage[index] = [[key, value]];
}
```

Kalau bucket di index tersebut **belum ada isinya** (`undefined`), langsung masukkan key-value pair ke sana. Perhatikan formatnya:

```
[[key, value]]
```

Ini adalah **array di dalam array** — karena satu bucket bisa menampung **lebih dari satu** key-value pair (untuk menangani collision).

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

**Apa yang terjadi di sini?**

1. Buat flag `inserted = false`
2. **Loop** semua key-value pair yang sudah ada di bucket tersebut
3. **Cek** — apakah key yang mau kita masukkan **sudah ada** di bucket?
   - ✅ **Sudah ada** → **Update** value-nya saja, set `inserted = true`
   - ❌ **Belum ada** → Setelah loop selesai, cek `inserted`. Kalau masih `false`, berarti key-nya baru → **Push** key-value pair baru ke bucket

### 🗺️ Peta Alur Logika `set`

```
set(key, value) dipanggil
        │
        ▼
  Hitung index dari key
        │
        ▼
  Apakah bucket[index] kosong?
      /        \
    YA          TIDAK
     │            │
     ▼            ▼
  Masukkan     Loop semua pair
  [[key, val]]  di bucket
                  │
                  ▼
              Key sudah ada?
               /        \
             YA          TIDAK
              │            │
              ▼            ▼
          Update value   Push pair baru
                         ke bucket
```

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

**Output:**

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

### 📊 Visualisasi Hasilnya

```
Bucket  0  │ Empty
Bucket  1  │ Empty
Bucket  2  │ Empty
Bucket  3  │ Empty
Bucket  4  │ Empty
Bucket  5  │ Empty
Bucket  6  │ ✅ James → 555-373-3948
Bucket  7  │ ✅ Jhon  → 555-234-3455
Bucket  8  │ Empty
Bucket  9  │ Empty
Bucket 10  │ Empty
Bucket 11  │ Empty
Bucket 12  │ Empty
Bucket 13  │ ✅ Sara  → 555-328-3384
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
        console.log(`Bucket ${i}: `);
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

Dan setelah hash table selesai, kursus akan berlanjut ke struktur data lain yang lebih kompleks seperti **Stacks**, **Queues**, dan **Trees**! 🌳

---

> 📝 **Catatan Pribadi**: Hash table ini memang bukan implementasi paling canggih — hash function kita cukup sederhana dan masih bisa menghasilkan collision. Tapi tujuannya adalah untuk **memahami konsep dasar** bagaimana hash table bekerja di balik layar, mirip seperti `Map` bawaan JavaScript.
