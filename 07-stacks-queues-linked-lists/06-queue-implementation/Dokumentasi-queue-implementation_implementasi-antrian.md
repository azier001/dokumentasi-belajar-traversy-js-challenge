# 📦 Queue Implementation

> **Implementasi struktur data Queue (antrian) di JavaScript menggunakan Class**

---

## 📑 Daftar Isi

- 🔍 [Apa itu Queue?](#apa-itu-queue)
- 🏗️ [Class Queue & Constructor](#class-queue--constructor)
- ➕ [Method `enqueue` — Menambah Item](#method-enqueue)
- ➖ [Method `dequeue` — Menghapus Item](#method-dequeue)
- 👀 [Method `peek` — Mengintip Item Terdepan](#method-peek)
- 📏 [Method `getLength` — Panjang Antrian](#method-getlength)
- 🕳️ [Method `isEmpty` — Cek Kosong](#method-isempty)
- 🚫 [Method `isFull` — Cek Penuh](#method-isfull)
- 🧪 [Menjalankan & Menguji](#menjalankan--menguji)
- 📝 [Kode Lengkap](#kode-lengkap)
- ✅ [Test Cases](#test-cases)

---

<a name="apa-itu-queue"></a>
## 🔍 Apa itu Queue?

Queue itu kayak **antrian** di kehidupan nyata. Siapa yang datang duluan, dia yang dilayani duluan. Prinsip ini disebut **FIFO** — *First In, First Out*.

Bedanya sama Stack (yang pakai prinsip LIFO), di Queue kita **menambah dari belakang** dan **mengambil dari depan**.

```
╔══════════════════════════════════════════════════════════╗
║                   🏪 ANTRIAN KASIR                       ║
╠══════════════════════════════════════════════════════════╣
║                                                          ║
║   enqueue (masuk)                    dequeue (keluar)    ║
║       ──►                                ──►             ║
║                                                          ║
║            ┌─────┬─────┬─────┬─────┐                     ║
║            │  D  │  C  │  B  │  A  │ ──► keluar duluan   ║
║            └─────┴─────┴─────┴─────┘                     ║
║              ▲                   ▲                        ║
║             TAIL               HEAD                      ║
║          (belakang)           (depan)                     ║
║                                                          ║
║   💡 Yang PERTAMA masuk, PERTAMA keluar (FIFO)           ║
╚══════════════════════════════════════════════════════════╝
```

> 🧠 **Analogi:** Bayangin antrian beli kopi. Orang pertama yang ngantri pasti dilayani duluan. Orang baru datang langsung ke belakang antrian.

---

<a name="class-queue--constructor"></a>
## 🏗️ Class Queue & Constructor

Langkah pertama, kita bikin **class `Queue`** dan isi constructor-nya dengan properti yang dibutuhkan:

```js
class Queue {
  constructor() {
    this.queue = [];      // 📦 Array buat nyimpen data
    this.head = 0;        // 👆 Index item paling depan
    this.tail = 0;        // 👇 Index item paling belakang
    this.maxSize = 100;   // 🚧 Batas maksimal antrian
  }
}
```

**Penjelasan tiap properti:**

| Properti | Tipe | Fungsi |
|----------|------|--------|
| `this.queue` | Array | Tempat nyimpen semua item |
| `this.head` | Number | Penanda posisi **depan** antrian |
| `this.tail` | Number | Penanda posisi **belakang** antrian |
| `this.maxSize` | Number | Kapasitas maksimal (default: 100) |

```
State awal setelah new Queue():

  queue = []
  head  = 0
  tail  = 0

  ┌───────────────────────────┐
  │      (kosong / empty)     │
  └───────────────────────────┘
    ▲
  HEAD = TAIL = 0
```

> 💡 Kenapa `head` dan `tail` mulai dari 0? Karena belum ada item sama sekali! Keduanya nunjuk ke posisi yang sama artinya antrian masih kosong.

---

<a name="method-enqueue"></a>
## ➕ Method `enqueue` — Menambah Item

Method `enqueue` tugasnya **menambahkan item ke belakang antrian** (posisi tail).

```js
enqueue(item) {
  // 🚧 Cek dulu, kalau penuh ya jangan ditambah
  if (this.isFull()) {
    return false;
  }

  // 📥 Taruh item di posisi tail
  this.queue[this.tail] = item;

  // ➡️ Geser tail ke posisi berikutnya
  this.tail++;

  return true;
}
```

**Visualisasi langkah demi langkah:**

```
═══════════════════════════════════════════════════
  📥 queue.enqueue('a')
═══════════════════════════════════════════════════

  Sebelum:   queue = []       head = 0, tail = 0

  Proses:    queue[0] = 'a'   ← taruh di index tail (0)
             tail++           ← tail jadi 1

  Sesudah:   ┌─────┐
             │  a  │
             └─────┘
              ▲     ▲
            HEAD   TAIL
            (0)    (1)

═══════════════════════════════════════════════════
  📥 queue.enqueue('b')
═══════════════════════════════════════════════════

  Proses:    queue[1] = 'b'   ← taruh di index tail (1)
             tail++           ← tail jadi 2

  Sesudah:   ┌─────┬─────┐
             │  a  │  b  │
             └─────┴─────┘
              ▲           ▲
            HEAD         TAIL
            (0)          (2)

═══════════════════════════════════════════════════
  📥 queue.enqueue('c')
═══════════════════════════════════════════════════

  Proses:    queue[2] = 'c'   ← taruh di index tail (2)
             tail++           ← tail jadi 3

  Sesudah:   ┌─────┬─────┬─────┐
             │  a  │  b  │  c  │
             └─────┴─────┴─────┘
              ▲                 ▲
            HEAD               TAIL
            (0)                (3)

  📊 getLength() = tail - head = 3 - 0 = 3
```

> 🔑 **Kunci:** Item selalu ditambahkan di posisi `tail`, lalu `tail` di-increment. Seperti orang baru yang langsung ke **belakang** antrian.

---

<a name="method-dequeue"></a>
## ➖ Method `dequeue` — Menghapus Item

Method `dequeue` tugasnya **mengambil item dari depan antrian** (posisi head). Yang masuk duluan, keluar duluan!

```js
dequeue() {
  // 📤 Ambil item yang ada di posisi head
  const item = this.queue[this.head];

  // ➡️ Geser head ke posisi berikutnya
  this.head++;

  // 🔙 Kembalikan item yang diambil
  return item;
}
```

> ⚠️ **Catatan menarik:** Perhatiin bahwa kita **tidak benar-benar menghapus** item dari array! Kita cuma menggeser pointer `head` ke depan. Item lama masih ada di array, tapi sudah "tidak terlihat" oleh Queue kita. Ini salah satu pendekatan implementasi yang valid.

**Visualisasi proses dequeue:**

```
═══════════════════════════════════════════════════
  State awal (setelah enqueue a, b, c):
═══════════════════════════════════════════════════

             ┌─────┬─────┬─────┐
             │  a  │  b  │  c  │
             └─────┴─────┴─────┘
              ▲                 ▲
            HEAD               TAIL
            (0)                (3)

═══════════════════════════════════════════════════
  📤 queue.dequeue()  →  return 'a'
═══════════════════════════════════════════════════

  Proses:    item = queue[0]   ← ambil 'a' dari head
             head++            ← head jadi 1

             ┌─────┬─────┬─────┐
             │ (a) │  b  │  c  │
             └─────┴─────┴─────┘
                    ▲           ▲
                  HEAD         TAIL
                  (1)          (3)

             (a) masih ada di array, tapi sudah
             "di luar" jangkauan head

═══════════════════════════════════════════════════
  📤 queue.dequeue()  →  return 'b'
═══════════════════════════════════════════════════

  Proses:    item = queue[1]   ← ambil 'b' dari head
             head++            ← head jadi 2

             ┌─────┬─────┬─────┐
             │ (a) │ (b) │  c  │
             └─────┴─────┴─────┘
                          ▲     ▲
                        HEAD   TAIL
                        (2)    (3)

  📊 getLength() = tail - head = 3 - 2 = 1
     (hanya tersisa 1 item aktif: 'c')
```

---

<a name="method-peek"></a>
## 👀 Method `peek` — Mengintip Item Terdepan

Method `peek` cuma **ngintip** siapa yang ada di posisi paling depan, **tanpa mengeluarkannya** dari antrian.

```js
peek() {
  return this.queue[this.head];
}
```

Simpel banget! Tinggal ambil value di index `head`.

```
═══════════════════════════════════════════════════
  Contoh penggunaan peek:
═══════════════════════════════════════════════════

  State:     ┌─────┬─────┬─────┐
             │  a  │  b  │  c  │
             └─────┴─────┴─────┘
              ▲                 ▲
            HEAD               TAIL

  queue.peek()  →  'a'   ✅ Item tidak dihapus!
  queue.peek()  →  'a'   ✅ Tetap 'a', tidak berubah

  ─── setelah queue.dequeue() ───

             ┌─────┬─────┬─────┐
             │ (a) │  b  │  c  │
             └─────┴─────┴─────┘
                    ▲           ▲
                  HEAD         TAIL

  queue.peek()  →  'b'   ✅ Sekarang 'b' di depan
```

> 💡 `peek` berguna banget misalnya di **Task Queue** pada Event Loop — kita mau tau callback mana yang bakal dieksekusi berikutnya tanpa harus mengeluarkannya.

---

<a name="method-getlength"></a>
## 📏 Method `getLength` — Panjang Antrian

Method ini menghitung berapa banyak item **aktif** di dalam antrian.

```js
getLength() {
  return this.tail - this.head;
}
```

**Kenapa `tail - head`?**

```
═══════════════════════════════════════════════════
  Logika tail - head:
═══════════════════════════════════════════════════

  Setelah enqueue a, b, c:
             ┌─────┬─────┬─────┐
             │  a  │  b  │  c  │
             └─────┴─────┴─────┘
              ▲                 ▲
            HEAD=0            TAIL=3

  getLength() = 3 - 0 = 3  ✅

  ─── setelah 1x dequeue ───

             ┌─────┬─────┬─────┐
             │ (a) │  b  │  c  │
             └─────┴─────┴─────┘
                    ▲           ▲
                  HEAD=1      TAIL=3

  getLength() = 3 - 1 = 2  ✅

  ─── setelah 2x dequeue ───

             ┌─────┬─────┬─────┐
             │ (a) │ (b) │  c  │
             └─────┴─────┴─────┘
                          ▲     ▲
                        HEAD=2 TAIL=3

  getLength() = 3 - 2 = 1  ✅
```

> 🧠 `tail` selalu nunjuk ke posisi kosong berikutnya, `head` nunjuk ke item terdepan. Selisihnya = jumlah item aktif.

---

<a name="method-isempty"></a>
## 🕳️ Method `isEmpty` — Cek Kosong

Cek apakah antrian kosong. Kalau panjangnya 0, berarti kosong!

```js
isEmpty() {
  return this.getLength() === 0;
}
```

```
  Kapan isEmpty() = true?

  ┌───────────────────────────────┐
  │         (tidak ada item)      │
  └───────────────────────────────┘
    ▲
  HEAD = TAIL

  getLength() = tail - head = 0 - 0 = 0
  isEmpty()   = (0 === 0) = true ✅
```

---

<a name="method-isfull"></a>
## 🚫 Method `isFull` — Cek Penuh

Cek apakah antrian sudah mencapai kapasitas maksimal.

```js
isFull() {
  return this.getLength() === this.maxSize;
}
```

```
  Contoh: maxSize = 3

  ┌─────┬─────┬─────┐
  │  1  │  2  │  3  │   ← 3 item (penuh!)
  └─────┴─────┴─────┘

  getLength() = 3
  isFull()    = (3 === 3) = true ✅

  ─── setelah dequeue ───

  ┌─────┬─────┬─────┐
  │ (1) │  2  │  3  │   ← 2 item aktif
  └─────┴─────┴─────┘

  getLength() = 2
  isFull()    = (2 === 3) = false ✅
```

> 💡 Method `isFull` dipanggil di dalam `enqueue` — kalau penuh, `enqueue` langsung return `false` dan item tidak ditambahkan.

---

<a name="menjalankan--menguji"></a>
## 🧪 Menjalankan & Menguji

### File `queue-run.js`

```js
const Queue = require('./queue');

const queue = new Queue();

queue.enqueue('a');
queue.enqueue('b');
queue.enqueue('c');

queue.dequeue();
queue.dequeue();

console.log(queue.peek()); // 'c'
```

**Alur eksekusi lengkap:**

```
═══════════════════════════════════════════════════════
  🎬 SIMULASI LENGKAP queue-run.js
═══════════════════════════════════════════════════════

  1️⃣  queue.enqueue('a')
      queue: [ a ]         head=0  tail=1

  2️⃣  queue.enqueue('b')
      queue: [ a, b ]      head=0  tail=2

  3️⃣  queue.enqueue('c')
      queue: [ a, b, c ]   head=0  tail=3

  4️⃣  queue.dequeue()  →  return 'a'
      queue: [(a), b, c ]   head=1  tail=3

  5️⃣  queue.dequeue()  →  return 'b'
      queue: [(a),(b), c ]  head=2  tail=3

  6️⃣  queue.peek()  →  'c'  ✅
      Item di posisi head (index 2) adalah 'c'

═══════════════════════════════════════════════════════

  Output di console:  c
═══════════════════════════════════════════════════════
```

### Menjalankan Test

```bash
npm test
```

---

<a name="kode-lengkap"></a>
## 📝 Kode Lengkap

### `queue.js`

```js
class Queue {
  constructor() {
    this.queue = [];
    this.head = 0;
    this.tail = 0;
    this.maxSize = 100;
  }

  // ➕ Menambah item ke belakang antrian
  enqueue(item) {
    if (this.isFull()) {
      return false;
    }

    this.queue[this.tail] = item;
    this.tail++;

    return true;
  }

  // ➖ Mengambil item dari depan antrian
  dequeue() {
    const item = this.queue[this.head];
    this.head++;

    return item;
  }

  // 👀 Mengintip item terdepan tanpa menghapus
  peek() {
    return this.queue[this.head];
  }

  // 📏 Menghitung jumlah item aktif
  getLength() {
    return this.tail - this.head;
  }

  // 🕳️ Cek apakah antrian kosong
  isEmpty() {
    return this.getLength() === 0;
  }

  // 🚫 Cek apakah antrian penuh
  isFull() {
    return this.getLength() === this.maxSize;
  }
}

module.exports = Queue;
```

### Perbandingan Stack vs Queue

```
╔═══════════════════════════════════════════════════╗
║           🔄 STACK vs QUEUE                       ║
╠═══════════════════════════════════════════════════╣
║                                                   ║
║   STACK (LIFO)          QUEUE (FIFO)              ║
║   Last In, First Out    First In, First Out       ║
║                                                   ║
║   ┌─────┐                                        ║
║   │  C  │ ← push/pop   enqueue ──►  ┌───┬───┬───┐║
║   ├─────┤              (belakang)    │ A │ B │ C │║
║   │  B  │                            └───┴───┴───┘║
║   ├─────┤                              ──► dequeue║
║   │  A  │                              (depan)    ║
║   └─────┘                                         ║
║                                                   ║
║   push('D') → D di atas  enqueue('D') → D di     ║
║   pop()     → D keluar   belakang                 ║
║                           dequeue()  → A keluar   ║
╚═══════════════════════════════════════════════════╝
```

---

<a name="test-cases"></a>
## ✅ Test Cases

```js
const Queue = require('./queue');

describe('Queue', () => {
  let queue;

  beforeEach(() => {
    queue = new Queue();
  });

  afterEach(() => {
    queue = null;
  });

  test('enqueue should add an element to the queue', () => {
    queue.enqueue(1);
    expect(queue.getLength()).toBe(1);
    expect(queue.peek()).toBe(1);
  });

  test('dequeue should remove and return the front element from the queue', () => {
    queue.enqueue(1);
    queue.enqueue(2);
    expect(queue.dequeue()).toBe(1);
    expect(queue.getLength()).toBe(1);
    expect(queue.peek()).toBe(2);
  });

  test('peek should return the front element without removing it', () => {
    queue.enqueue(1);
    queue.enqueue(2);
    expect(queue.peek()).toBe(1);
    expect(queue.getLength()).toBe(2);
  });

  test('getLength should return the number of elements in the queue', () => {
    expect(queue.getLength()).toBe(0);
    queue.enqueue(1);
    queue.enqueue(2);
    queue.enqueue(3);
    expect(queue.getLength()).toBe(3);
    queue.dequeue();
    expect(queue.getLength()).toBe(2);
  });

  test('isEmpty should return true if the queue is empty', () => {
    expect(queue.isEmpty()).toBe(true);
    queue.enqueue(1);
    expect(queue.isEmpty()).toBe(false);
    queue.dequeue();
    expect(queue.isEmpty()).toBe(true);
  });

  test('isFull should return true if the queue is full', () => {
    const maxSize = 3;
    const fullQueue = new Queue();
    fullQueue.maxSize = maxSize;
    fullQueue.enqueue(1);
    fullQueue.enqueue(2);
    fullQueue.enqueue(3);
    expect(fullQueue.isFull()).toBe(true);
    fullQueue.dequeue();
    expect(fullQueue.isFull()).toBe(false);
  });
});
```

---

> 🎯 **Kesimpulan:** Queue itu sederhana tapi powerful. Intinya cuma main `head` dan `tail` — enqueue nambah di tail, dequeue ambil dari head. Konsep FIFO ini banyak dipakai di dunia nyata: Task Queue di Event Loop, antrian printer, BFS (Breadth-First Search), dan masih banyak lagi!
