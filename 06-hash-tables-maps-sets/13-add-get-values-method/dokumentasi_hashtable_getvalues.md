# 📋 Menambahkan Method getValues pada HashTable

> Tantangan kali ini sedikit berbeda. Alih-alih **menggunakan** hash table untuk menyelesaikan masalah,
> kita akan **menambahkan** fungsionalitas baru ke dalam class `HashTable` yang sudah kita buat.
> Method `getValues()` akan mengembalikan array berisi semua **values** yang tersimpan — tanpa peduli **keys**-nya.
> Kita akan menggunakan method ini di tantangan berikutnya.

---

## 📑 Daftar Isi

- 🎯 [Pengenalan — Apa yang Berbeda?](#pengenalan)
- 📝 [Instruksi Challenge](#instruksi-challenge)
- 🔧 [Langkah 1 — Membuat Array Kosong](#langkah-1)
- 🔁 [Langkah 2 — Loop Outer (Semua Buckets)](#langkah-2)
- 🔄 [Langkah 3 — Loop Inner (Key-Value Pairs)](#langkah-3)
- 📤 [Langkah 4 — Return Array Values](#langkah-4)
- 🖼️ [Visualisasi Alur Kerja](#visualisasi)
- 📦 [Kode Lengkap](#kode-lengkap)
- ▶️ [Menjalankan & Menguji](#menjalankan-dan-menguji)
- 🧪 [Test Cases](#test-cases)

---

<a name="pengenalan"></a>
## 🎯 Pengenalan — Apa yang Berbeda?

Tantangan ini **berbeda** dari tantangan sebelumnya. Sebelumnya kita menggunakan `HashTable` untuk menyelesaikan masalah (seperti menghitung frekuensi kata). Kali ini, kita diminta untuk **menambahkan method baru** langsung ke dalam class `HashTable` itu sendiri.

Method yang akan kita buat: **`getValues()`**

| Aspek | Penjelasan |
|-------|------------|
| **Apa yang dilakukan** | Mengembalikan array yang berisi **semua values** di hash table |
| **Parameter** | Tidak ada — method ini tidak menerima argumen apapun |
| **Return** | Array berisi values saja (tanpa keys) |
| **Urutan** | Tidak harus sesuai urutan saat kita memasukkannya |

> 💡 Method ini akan digunakan di tantangan berikutnya, jadi pastikan kamu memahaminya dengan baik!

---

<a name="instruksi-challenge"></a>
## 📝 Instruksi Challenge

Tambahkan method `getValues()` ke dalam file `HashTable.js`.

**Contoh penggunaan:**

```js
const myHashTable = new HashTable();

myHashTable.set('name', 'Alice');
myHashTable.set('age', 30);
myHashTable.set('city', 'New York');

console.log(myHashTable.getValues());
// Output: ['Alice', 30, 'New York']
```

> ⚠️ Urutan outputnya **mungkin tidak sama** dengan urutan saat kita memasukkan data. Ini karena posisi penyimpanan ditentukan oleh hash function, bukan urutan pemasukkan.

---

<a name="langkah-1"></a>
## 🔧 Langkah 1 — Membuat Array Kosong

Pertama, kita buat array kosong bernama `values` yang nanti akan menampung semua value dari hash table.

```js
getValues() {
  const values = [];
```

Array ini akan menjadi "keranjang" tempat kita mengumpulkan semua value sebelum dikembalikan.

---

<a name="langkah-2"></a>
## 🔁 Langkah 2 — Loop Outer (Semua Buckets)

Selanjutnya, kita loop melalui seluruh **storage** array untuk mengecek setiap **bucket**.

```js
  for (let i = 0; i < this.storage.length; i++) {
    if (this.storage[i]) {
      // ... loop inner di sini
    }
  }
```

**Apa yang terjadi di sini:**

1. `this.storage` adalah array utama dari hash table kita
2. Setiap index di `storage` disebut **bucket** — ada yang terisi, ada yang kosong
3. `if (this.storage[i])` mengecek apakah bucket tersebut **ada isinya** — kita skip bucket kosong

```text
Storage array:
┌─────────┬─────────┬─────────┬─────────┬─────────┬─────────┐
│ Bucket 0│ Bucket 1│ Bucket 2│ Bucket 3│ Bucket 4│  . . .  │
├─────────┼─────────┼─────────┼─────────┼─────────┼─────────┤
│  [data] │  empty  │  [data] │  empty  │  [data] │  . . .  │
└─────────┴─────────┴─────────┴─────────┴─────────┴─────────┘
     ✅       ❌         ✅       ❌         ✅
   proses    skip      proses    skip      proses
```

---

<a name="langkah-3"></a>
## 🔄 Langkah 3 — Loop Inner (Key-Value Pairs)

Di dalam setiap bucket yang terisi, kita loop lagi untuk mengambil **value** dari setiap key-value pair.

```js
      for (const [key, value] of this.storage[i]) {
        values.push(value);
      }
```

**Penjelasan:**

- Setiap bucket berisi array dari key-value pairs, contoh: `[["name", "Alice"], ["age", 30]]`
- Kita menggunakan **destructuring** `[key, value]` untuk memisahkan key dan value dari setiap pair
- Kita hanya butuh **value**-nya saja, jadi kita `push(value)` ke array `values`

```text
Contoh bucket berisi 2 items (terjadi collision):

this.storage[5] = [ ["name", "Alice"], ["city", "New York"] ]
                         ↓                    ↓
                   [key, value]          [key, value]

Destructuring:
  Iterasi 1: key = "name",  value = "Alice"    → push "Alice"
  Iterasi 2: key = "city",  value = "New York" → push "New York"
```

> 💡 Kita menggunakan `for...of` di sini karena lebih bersih daripada `for` loop biasa. Awalnya di video sempat mau menggunakan `for` loop biasa, tapi kemudian diganti ke `for...of` dengan **destructuring** — cara yang lebih modern dan mudah dibaca.

---

<a name="langkah-4"></a>
## 📤 Langkah 4 — Return Array Values

Setelah semua bucket selesai di-loop, kita kembalikan array `values` yang berisi semua value.

```js
  return values;
}
```

---

<a name="visualisasi"></a>
## 🖼️ Visualisasi Alur Kerja

### Input:

```js
myHashTable.set('a', 1);
myHashTable.set('b', 2);
myHashTable.set('c', 3);
myHashTable.set('d', 4);
```

### Proses:

```text
╔══════════════════════════════════════════════════════════════════╗
║  STRUKTUR STORAGE HASH TABLE (limit: 14)                       ║
╠══════════════════════════════════════════════════════════════════╣
║                                                                  ║
║  Index:  0    1    2    3    4    5    6    7  ...  13           ║
║        ┌────┬────┬────┬────┬────┬────┬────┬────┬───┬────┐      ║
║        │    │    │    │    │    │    │    │    │...│    │      ║
║        │ ❌ │ ❌ │ ❌ │✅  │✅  │✅  │✅  │ ❌ │...│ ❌ │      ║
║        │    │    │    │    │    │    │    │    │...│    │      ║
║        └────┴────┴────┴────┴────┴────┴────┴────┴───┴────┘      ║
║                       │    │    │    │                           ║
║            ┌──────────┘    │    │    └──────────┐               ║
║            ▼               ▼    ▼               ▼               ║
║       [["d", 4]]    [["a", 1]] [["b", 2]]  [["c", 3]]         ║
║                                                                  ║
║  ⚠️ Urutan TIDAK sesuai urutan pemasukkan!                      ║
║     Posisi ditentukan oleh hash function.                       ║
╚══════════════════════════════════════════════════════════════════╝
```

```text
╔══════════════════════════════════════════════════════════════════╗
║  PROSES getValues() — Loop semua buckets                       ║
╠══════════════════════════════════════════════════════════════════╣
║                                                                  ║
║  values = []   ← mulai dari array kosong                        ║
║                                                                  ║
║  i=0:  this.storage[0]  → undefined  → ❌ SKIP                 ║
║  i=1:  this.storage[1]  → undefined  → ❌ SKIP                 ║
║  i=2:  this.storage[2]  → undefined  → ❌ SKIP                 ║
║                                                                  ║
║  i=3:  this.storage[3]  → [["d", 4]] → ✅ ADA ISI!            ║
║        ┌────────────────────────────────────────────┐           ║
║        │ for...of: [key, value] = ["d", 4]          │           ║
║        │ values.push(4)                             │           ║
║        └────────────────────────────────────────────┘           ║
║        values = [4]                                             ║
║                                                                  ║
║  i=4:  this.storage[4]  → [["a", 1]] → ✅ ADA ISI!            ║
║        ┌────────────────────────────────────────────┐           ║
║        │ for...of: [key, value] = ["a", 1]          │           ║
║        │ values.push(1)                             │           ║
║        └────────────────────────────────────────────┘           ║
║        values = [4, 1]                                          ║
║                                                                  ║
║  i=5:  this.storage[5]  → [["b", 2]] → ✅ ADA ISI!            ║
║        ┌────────────────────────────────────────────┐           ║
║        │ for...of: [key, value] = ["b", 2]          │           ║
║        │ values.push(2)                             │           ║
║        └────────────────────────────────────────────┘           ║
║        values = [4, 1, 2]                                       ║
║                                                                  ║
║  i=6:  this.storage[6]  → [["c", 3]] → ✅ ADA ISI!            ║
║        ┌────────────────────────────────────────────┐           ║
║        │ for...of: [key, value] = ["c", 3]          │           ║
║        │ values.push(3)                             │           ║
║        └────────────────────────────────────────────┘           ║
║        values = [4, 1, 2, 3]                                    ║
║                                                                  ║
║  i=7 ~ i=13:  → undefined → ❌ SKIP                            ║
║                                                                  ║
║  ────────────────────────────────────────────────               ║
║  return [4, 1, 2, 3]  ✅                                       ║
║                                                                  ║
║  ⚠️ Perhatikan: urutannya [4, 1, 2, 3] bukan [1, 2, 3, 4]     ║
║     Ini karena posisi bucket ditentukan oleh hash function!     ║
╚══════════════════════════════════════════════════════════════════╝
```

---

<a name="kode-lengkap"></a>
## 📦 Kode Lengkap

### Method `getValues()` (ditambahkan ke `HashTable.js`)

```js
getValues() {
  // Buat array kosong untuk menampung semua values
  const values = [];

  // Loop semua bucket di storage
  for (let i = 0; i < this.storage.length; i++) {
    // Cek apakah bucket ini ada isinya
    if (this.storage[i]) {
      // Loop setiap key-value pair di dalam bucket
      for (const [key, value] of this.storage[i]) {
        // Ambil value-nya saja, push ke array
        values.push(value);
      }
    }
  }

  // Kembalikan array berisi semua values
  return values;
}
```

### File `get-values-run.js`

```js
const HashTable = require('./HashTable');

const myHashTable = new HashTable();

myHashTable.set('a', 1);
myHashTable.set('b', 2);
myHashTable.set('c', 3);
myHashTable.set('d', 4);

console.log(myHashTable.getValues());
// Output: [4, 1, 2, 3] (urutan mungkin berbeda)
```

---

<a name="menjalankan-dan-menguji"></a>
## ▶️ Menjalankan & Menguji

Jalankan file eksekusi untuk melihat hasilnya:

```bash
node get-values-run.js
```

```
[4, 1, 2, 3]
```

> ⚠️ Urutan output **tidak sesuai** dengan urutan pemasukkan (`1, 2, 3, 4`). Ini normal! Hash table menyimpan data berdasarkan hasil hash function, bukan urutan insert. Yang penting semua value berhasil diambil.

Untuk menjalankan **test**:

```bash
npm test
```

---

<a name="test-cases"></a>
## 🧪 Test Cases

```js
const HashTable = require('./HashTable');

describe('HashTable', () => {
  let hashTable;

  beforeEach(() => {
    hashTable = new HashTable();
  });

  test('Get values from hash table', () => {
    hashTable.set('name', 'Alice');
    hashTable.set('age', 30);
    hashTable.set('city', 'New York');

    const values = hashTable.getValues();
    expect(values).toEqual(expect.arrayContaining(['Alice', 30, 'New York']));
    expect(values).toHaveLength(3);
  });

  test('Get values from an empty hash table', () => {
    const values = hashTable.getValues();
    expect(values).toEqual([]);
  });
});
```

> 💡 Perhatikan bahwa test menggunakan `expect.arrayContaining()` — artinya test hanya mengecek apakah semua value **ada** di dalam array, **tanpa mempedulikan urutan**. Ini karena hash table tidak menjamin urutan penyimpanan.
