# 🔄 Membalik String Menggunakan Queue

> Dokumentasi dari video tutorial yang membahas cara membalik string menggunakan struktur data **Queue** — pendekatan berbeda dari versi **Stack** yang sudah dibahas sebelumnya.

---

## 📑 Daftar Isi

- 🎯 [Pengenalan](#pengenalan)
- 📂 [Struktur File](#struktur-file)
- 🏗️ [Class Queue yang Digunakan](#class-queue)
- 🔨 [Membangun Fungsi Langkah demi Langkah](#membangun-fungsi)
- 🔁 [Tahap 1: Loop Terbalik & Enqueue](#tahap-1)
- 📤 [Tahap 2: Dequeue & Bangun String](#tahap-2)
- ⚖️ [Perbedaan dengan Pendekatan Stack](#perbedaan-stack)
- 🧪 [Menjalankan Test](#menjalankan-test)

---

<a name="pengenalan"></a>
## 🎯 Pengenalan

Challenge ini mirip dengan yang sudah dilakukan menggunakan **Stack** — kita membuat fungsi `reverseStringQueue` yang menerima string dan mengembalikan string yang sudah dibalik. Bedanya, kali ini kita **wajib menggunakan class `Queue`** untuk melakukannya.

**Constraint:** String hanya akan berisi huruf kecil dan spasi.

**Strategi utama:**
1. **Enqueue** semua karakter dari string ke dalam queue (dalam urutan terbalik)
2. **Dequeue** semua karakter dari queue dan gabungkan menjadi string baru

---

<a name="struktur-file"></a>
## 📂 Struktur File

```
07-reverse-string-queue/
├── queue.js                      ← Class Queue yang di-import
├── reverse-string-queue.js       ← Fungsi utama
├── reverse-string-queue-run.js   ← File untuk menjalankan manual
└── reverse-string-queue.test.js  ← Test cases
```

---

<a name="class-queue"></a>
## 🏗️ Class Queue yang Digunakan

Kita sudah punya file `queue.js` yang berisi class `Queue` dari challenge sebelumnya. File ini di-import ke dalam solusi kita.

```javascript
class Queue {
  constructor() {
    this.queue = [];
    this.head = 0;
    this.tail = 0;
    this.maxSize = 100;
  }

  enqueue(element) {
    if (this.isFull()) {
      return false;
    }
    this.queue[this.tail] = element;
    this.tail++;
    return true;
  }

  dequeue() {
    const item = this.queue[this.head];
    this.head++;
    return item;
  }

  peek() {
    return this.queue[this.head];
  }

  getLength() {
    return this.tail - this.head;
  }

  isEmpty() {
    return this.getLength() === 0;
  }

  isFull() {
    return this.getLength() === this.maxSize;
  }
}

module.exports = Queue;
```

> **Method penting yang dipakai di challenge ini:**
> - `enqueue(element)` — menambahkan elemen ke **belakang** queue
> - `dequeue()` — mengeluarkan elemen dari **depan** queue dan **mengembalikan nilainya**
> - `isEmpty()` — mengecek apakah queue kosong

---

<a name="membangun-fungsi"></a>
## 🔨 Membangun Fungsi Langkah demi Langkah

Pertama, kita import class `Queue` dan buat kerangka fungsinya:

```javascript
const Queue = require('./queue');

const reverseStringWithQueue = (str) => {
  // Langkah-langkah akan diisi di sini
};

module.exports = reverseStringWithQueue;
```

Kemudian, buat instance queue baru di dalam fungsi:

```javascript
const queue = new Queue();
```

---

<a name="tahap-1"></a>
## 🔁 Tahap 1: Loop Terbalik & Enqueue

Ini adalah **kunci utama** dari pendekatan queue. Kita loop string **dari belakang ke depan**, lalu enqueue setiap karakter:

```javascript
for (let i = str.length - 1; i >= 0; i--) {
  queue.enqueue(str[i]);
}
```

Perhatikan setup for loop-nya:
- **Inisialisasi:** `i = str.length - 1` → mulai dari karakter **terakhir**
- **Kondisi:** `i >= 0` → lanjut selama belum melewati indeks pertama
- **Update:** `i--` → decrement, bukan increment

> 💡 **Penting:** Kita pakai `i--` (minus minus), bukan `i++`! Karena kita bergerak mundur dari akhir string ke awal.

Di video, Brad sempat melakukan `console.log(str[i])` untuk membuktikan bahwa loop-nya benar-benar berjalan terbalik:

```
Input: "Hello World!"

Console output:
!
d
l
r
o
W

o
l
l
e
H
```

Karakter keluar dalam urutan terbalik — artinya loop kita sudah benar!

### 🎨 Visualisasi: Proses Enqueue

```
Input: "hello"

String asli:
  Index:  0   1   2   3   4
  Char:   h   e   l   l   o
                          ↑ mulai dari sini (i = 4)

Loop berjalan mundur (i-- setiap iterasi):

  i=4 → enqueue('o')   Queue: [ o ]
  i=3 → enqueue('l')   Queue: [ o, l ]
  i=2 → enqueue('l')   Queue: [ o, l, l ]
  i=1 → enqueue('e')   Queue: [ o, l, l, e ]
  i=0 → enqueue('h')   Queue: [ o, l, l, e, h ]

State akhir queue:
  ┌───────────────────────────┐
  │  o → l → l → e → h       │
  │  ↑                   ↑    │
  │ head (keluar dulu)  tail  │
  └───────────────────────────┘

Karena Queue = FIFO, 'o' yang masuk pertama akan keluar pertama!
```

---

<a name="tahap-2"></a>
## 📤 Tahap 2: Dequeue & Bangun String

Sekarang tinggal dequeue semua karakter dan gabungkan menjadi string baru:

```javascript
let reversedString = '';

while (!queue.isEmpty()) {
  reversedString += queue.dequeue();
}

return reversedString;
```

**Penjelasan:**
- Buat variable `reversedString` sebagai penampung, mulai dari string kosong `''`
- Selama queue **belum kosong** (`!queue.isEmpty()`), terus dequeue
- `queue.dequeue()` mengembalikan **nilai** karakter yang dikeluarkan — langsung ditambahkan ke `reversedString`
- Setelah queue habis, kembalikan hasilnya

### 🎨 Visualisasi: Proses Dequeue

```
Queue awal: [ o, l, l, e, h ]
                                      reversedString
  dequeue() → 'o'   Queue: [l,l,e,h]     "o"
  dequeue() → 'l'   Queue: [l,e,h]       "ol"
  dequeue() → 'l'   Queue: [e,h]         "oll"
  dequeue() → 'e'   Queue: [h]           "olle"
  dequeue() → 'h'   Queue: []            "olleh"

  queue.isEmpty() → true → keluar dari while loop

  return "olleh" ✅
```

---

## 📝 Kode Lengkap

Berikut kode solusi final yang sudah lengkap:

```javascript
const Queue = require('./queue');

const reverseStringWithQueue = (str) => {
  // Buat instance queue baru
  const queue = new Queue();

  // Enqueue setiap karakter dari BELAKANG ke DEPAN
  for (let i = str.length - 1; i >= 0; i--) {
    queue.enqueue(str[i]);
  }

  // Dequeue semua karakter dan bangun string terbalik
  let reversedString = '';
  while (!queue.isEmpty()) {
    reversedString += queue.dequeue();
  }

  // Kembalikan hasilnya
  return reversedString;
};

module.exports = reverseStringWithQueue;
```

File runner untuk menguji manual:

```javascript
const reverseStringQueue = require('./reverse-string-queue');

const result = reverseStringQueue('Hello World!');
console.log(result); // !dlroW olleH
```

---

<a name="perbedaan-stack"></a>
## ⚖️ Perbedaan dengan Pendekatan Stack

Brad menjelaskan perbedaan mendasar antara pendekatan **Stack** dan **Queue** untuk membalik string:

```
╔═══════════════════════════════════════════════════════════════╗
║                    STACK vs QUEUE                             ║
╠═══════════════════════════════════════════════════════════════╣
║                                                               ║
║  🥞 STACK (LIFO - Last In, First Out)                        ║
║  ──────────────────────────────────                           ║
║  • Push karakter dari DEPAN ke BELAKANG (urutan normal)       ║
║  • Pop otomatis memberikan urutan TERBALIK                    ║
║  • Stack SECARA ALAMI membalik urutan!                        ║
║                                                               ║
║    push h, e, l, l, o                                         ║
║    Stack: [h, e, l, l, o]  ← 'o' di atas                    ║
║    pop: o, l, l, e, h → "olleh" ✅                           ║
║                                                               ║
║  ─────────────────────────────────────────────                ║
║                                                               ║
║  📬 QUEUE (FIFO - First In, First Out)                       ║
║  ──────────────────────────────────                           ║
║  • Enqueue karakter dari BELAKANG ke DEPAN (urutan terbalik)  ║
║  • Dequeue mengeluarkan dalam urutan yang SAMA                ║
║  • Pembalikan dilakukan di FOR LOOP, bukan di struktur data!  ║
║                                                               ║
║    enqueue o, l, l, e, h  (loop dari belakang)                ║
║    Queue: [o, l, l, e, h]  ← 'o' di depan                   ║
║    dequeue: o, l, l, e, h → "olleh" ✅                       ║
║                                                               ║
╚═══════════════════════════════════════════════════════════════╝
```

**Kesimpulan:**
- Dengan **Stack** → pembalikan terjadi **secara alami** karena sifat LIFO. Kita cukup push secara normal, lalu pop
- Dengan **Queue** → kita harus **membalik urutannya sendiri** lewat for loop (loop dari belakang). Queue hanya menjaga urutan yang sudah kita masukkan

---

<a name="menjalankan-test"></a>
## 🧪 Menjalankan Test

```javascript
test('Reversing a string', () => {
  expect(reverseStringQueue('Hello')).toBe('olleH');
  expect(reverseStringQueue('JavaScript')).toBe('tpircSavaJ');
  expect(reverseStringQueue('12345')).toBe('54321');
});
```

Semua test **passed** ✅ — fungsi berhasil membalik string dengan benar menggunakan queue.

---

## 🔑 Poin Penting

| Konsep | Detail |
|--------|--------|
| **Struktur data** | Queue (FIFO) |
| **Trik utama** | Loop dari `str.length - 1` ke `0` (mundur) |
| **Enqueue** | Masukkan karakter dalam urutan **terbalik** |
| **Dequeue** | Keluarkan karakter — hasilnya sudah terbalik |
| **Beda dengan Stack** | Stack otomatis membalik (LIFO), Queue perlu loop terbalik |

> 🎯 **Selanjutnya:** Challenge **palindrome** yang menggunakan **KEDUA** class — Queue dan Stack — secara bersamaan!
