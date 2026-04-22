# 📥 Implementasi Queue (Antrean)

> **Queue** adalah struktur data yang mengikuti prinsip **FIFO** (*First-In, First-Out*) — elemen yang masuk pertama akan keluar pertama, layaknya antrean di kehidupan nyata. Dokumen ini memandu Anda membangun class `Queue` dari nol menggunakan **JavaScript**.

---

## 🧐 Apa itu Queue?

Dalam pelajaran sebelumnya, kita telah melihat bagaimana cara kerja struktur data **queue**. Struktur ini menggunakan prinsip **First-In, First-Out** atau **FIFO**. Elemen **pertama** yang ditambahkan ke dalam queue akan menjadi elemen **pertama** yang dihapus.

> 💡 **Analogi Dunia Nyata:** Bayangkan antrean di loket tiket — orang yang datang **pertama** akan dilayani **pertama**, dan orang yang datang terakhir harus menunggu di belakang.

Meskipun kita bisa menggunakan **array** biasa sebagai queue, membuat **class** sendiri memberikan kontrol lebih baik terhadap performa dan batasan data melalui properti `maxSize`.

---

## 📊 Visualisasi Operasi Queue (FIFO)

Agar lebih mudah memahami pergerakan pointer `head` dan `tail`, perhatikan diagram ASCII berikut secara bertahap:

```text
═══════════════════════════════════════════════════════════════
  LANGKAH 1: Kondisi Awal (Kosong)
═══════════════════════════════════════════════════════════════

  Indeks:   0     1     2     3
          ┌─────┬─────┬─────┬─────┐
  Queue:  │     │     │     │     │
          └─────┴─────┴─────┴─────┘
            ▲
            head = 0
            tail = 0

  length = tail - head = 0 - 0 = 0  →  isEmpty() = true

═══════════════════════════════════════════════════════════════
  LANGKAH 2: enqueue(10)  →  Masukkan 10 ke antrean
═══════════════════════════════════════════════════════════════

  Indeks:   0     1     2     3
          ┌─────┬─────┬─────┬─────┐
  Queue:  │  10 │     │     │     │
          └─────┴─────┴─────┴─────┘
            ▲       ▲
           head=0  tail=1

  length = 1 - 0 = 1

═══════════════════════════════════════════════════════════════
  LANGKAH 3: enqueue(20)  →  Masukkan 20 ke antrean
═══════════════════════════════════════════════════════════════

  Indeks:   0     1     2     3
          ┌─────┬─────┬─────┬─────┐
  Queue:  │  10 │  20 │     │     │
          └─────┴─────┴─────┴─────┘
            ▲             ▲
           head=0        tail=2

  length = 2 - 0 = 2

═══════════════════════════════════════════════════════════════
  LANGKAH 4: enqueue(30)  →  Masukkan 30 ke antrean
═══════════════════════════════════════════════════════════════

  Indeks:   0     1     2     3
          ┌─────┬─────┬─────┬─────┐
  Queue:  │  10 │  20 │  30 │     │
          └─────┴─────┴─────┴─────┘
            ▲                   ▲
           head=0              tail=3

  length = 3 - 0 = 3
  peek() = queue[head] = queue[0] = 10

═══════════════════════════════════════════════════════════════
  LANGKAH 5: dequeue()  →  Keluarkan elemen terdepan (10)
═══════════════════════════════════════════════════════════════

  Return: 10

  Indeks:   0     1     2     3
          ┌─────┬─────┬─────┬─────┐
  Queue:  │ ░░░ │  20 │  30 │     │
          └─────┴─────┴─────┴─────┘
                  ▲                ▲
                 head=1           tail=3

  length = 3 - 1 = 2
  peek() = queue[head] = queue[1] = 20

═══════════════════════════════════════════════════════════════
  LANGKAH 6: dequeue()  →  Keluarkan elemen terdepan (20)
═══════════════════════════════════════════════════════════════

  Return: 20

  Indeks:   0     1     2     3
          ┌─────┬─────┬─────┬─────┐
  Queue:  │ ░░░ │ ░░░ │  30 │     │
          └─────┴─────┴─────┴─────┘
                        ▲          ▲
                       head=2     tail=3

  length = 3 - 2 = 1
  peek() = queue[head] = queue[2] = 30
```

---

## 🏗️ Queue Class & Constructor

Mari kita mulai dengan membuat **class** bernama `Queue`. Di dalam `constructor`, kita mendefinisikan empat properti utama:

| Properti   | Tipe     | Nilai Awal | Deskripsi                                      |
|------------|----------|------------|-------------------------------------------------|
| `queue`    | `Array`  | `[]`       | Array internal untuk menyimpan elemen           |
| `head`     | `Number` | `0`        | Indeks elemen **terdepan** dalam antrean        |
| `tail`     | `Number` | `0`        | Indeks posisi **berikutnya** untuk elemen baru  |
| `maxSize`  | `Number` | `100`      | Kapasitas **maksimum** antrean                  |

```js
class Queue {
  constructor() {
    this.queue = [];
    this.head = 0;
    this.tail = 0;
    this.maxSize = 100;
  }
}
```

```text
  ┌──────────────────────────────────┐
  │         new Queue()              │
  ├──────────────────────────────────┤
  │  queue   →  []                   │
  │  head    →  0                    │
  │  tail    →  0                    │
  │  maxSize →  100                  │
  └──────────────────────────────────┘
```

---

## 📏 Method `getLength`

Method `getLength` mengembalikan jumlah elemen yang **aktif** di dalam antrean dengan menghitung **selisih** antara indeks `tail` dan `head`.

```js
getLength() {
    return this.tail - this.head;
  }
```

```text
  Contoh: head = 2, tail = 5
  ┌───┬───┬───┬───┬───┬───┐
  │ ░ │ ░ │ A │ B │ C │   │
  └───┴───┴───┴───┴───┴───┘
            ▲           ▲
          head=2      tail=5

  getLength() = 5 - 2 = 3  ✓ (ada 3 elemen aktif: A, B, C)
```

---

## ❓ Method `isEmpty`

Method `isEmpty` mengembalikan nilai **boolean** — bernilai `true` jika antrean sedang **kosong** (panjangnya sama dengan 0).

```js
isEmpty() {
    return this.getLength() === 0;
  }
```

```text
  head = 0, tail = 0  →  getLength() = 0  →  isEmpty() = true  ✅
  head = 0, tail = 2  →  getLength() = 2  →  isEmpty() = false ❌
```

---

## 🔋 Method `isFull`

Method `isFull` mengembalikan nilai **boolean** — bernilai `true` jika jumlah elemen sudah mencapai kapasitas `maxSize`.

```js
isFull() {
    return this.getLength() === this.maxSize;
  }
```

```text
  maxSize = 3

  ┌─────┬─────┬─────┐
  │  A  │  B  │  C  │   ← 3 elemen = maxSize
  └─────┴─────┴─────┘
  isFull() = true  🔴  (antrean penuh, tidak bisa enqueue lagi)
```

---

## 📥 Method `enqueue`

Method `enqueue` digunakan untuk **menambahkan** elemen baru ke **belakang** antrean.

**Alur Kerja:**
1. Periksa apakah antrean sudah penuh via `isFull()`. Jika **ya**, kembalikan `false`.
2. Simpan `element` pada posisi `queue[tail]`.
3. **Increment** nilai `tail` sebesar 1.
4. Kembalikan `true` sebagai tanda sukses.

```js
enqueue(element) {
    if (this.isFull()) {
      return false;
    }

    this.queue[this.tail] = element;
    this.tail++;
    
    return true;
  }
```

```text
  Sebelum enqueue("D"):
  ┌─────┬─────┬─────┬─────┐
  │  A  │  B  │  C  │     │
  └─────┴─────┴─────┴─────┘
    ▲                   ▲
   head=0             tail=3

                  enqueue("D")
                      │
                      ▼

  Sesudah enqueue("D"):
  ┌─────┬─────┬─────┬─────┐
  │  A  │  B  │  C  │  D  │
  └─────┴─────┴─────┴─────┘
    ▲                         ▲
   head=0                   tail=4
```

---

## 📤 Method `dequeue`

Method `dequeue` **mengeluarkan** dan mengembalikan elemen yang berada di posisi **paling depan** (indeks `head`).

**Alur Kerja:**
1. Ambil item pada `queue[head]` dan simpan ke variabel `item`.
2. **Increment** nilai `head` sebesar 1 (menggeser pointer ke depan).
3. Kembalikan `item`.

```js
dequeue() {
    const item = this.queue[this.head];
    this.head++;
    return item;
  }
```

```text
  Sebelum dequeue():
  ┌─────┬─────┬─────┬─────┐
  │  A  │  B  │  C  │  D  │
  └─────┴─────┴─────┴─────┘
    ▲                         ▲
   head=0                   tail=4

                  dequeue()  →  return "A"
                      │
                      ▼

  Sesudah dequeue():
  ┌─────┬─────┬─────┬─────┐
  │ ░░░ │  B  │  C  │  D  │
  └─────┴─────┴─────┴─────┘
           ▲                    ▲
          head=1               tail=4
```

---

## 👁️ Method `peek`

Method `peek` digunakan untuk **mengintip** elemen terdepan **tanpa menghapusnya** dari antrean. Berguna saat Anda ingin tahu siapa berikutnya tanpa mengubah state.

```js
peek() {
    return this.queue[this.head];
  }
```

```text
  ┌─────┬─────┬─────┐
  │  B  │  C  │  D  │
  └─────┴─────┴─────┘
    ▲
   head

  peek() → "B"  (elemen tetap di dalam antrean)
```

---

## 🧩 Kode Lengkap

Berikut adalah keseluruhan class `Queue` dalam satu blok kode:

```js
class Queue {
  constructor() {
    this.queue = [];
    this.head = 0;
    this.tail = 0;
    this.maxSize = 100;
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
}
```

---

## 🚀 Contoh Penggunaan

Sekarang Anda bisa menjalankan dan menguji **class** `Queue` tersebut:

```js
const queue = new Queue();

console.log(queue.isEmpty()); // true
console.log(queue.isFull());  // false

console.log(queue.enqueue(1)); // true
console.log(queue.enqueue(2)); // true
console.log(queue.enqueue(3)); // true

console.log(queue.peek());      // 1
console.log(queue.dequeue());   // 1
console.log(queue.peek());      // 2
console.log(queue.getLength()); // 2
```

```text
  Alur eksekusi langkah demi langkah:
  ═══════════════════════════════════════════════════════
  Operasi            │ Return │ head │ tail │ length
  ═══════════════════════════════════════════════════════
  new Queue()        │   -    │  0   │  0   │   0
  isEmpty()          │  true  │  0   │  0   │   0
  isFull()           │ false  │  0   │  0   │   0
  enqueue(1)         │  true  │  0   │  1   │   1
  enqueue(2)         │  true  │  0   │  2   │   2
  enqueue(3)         │  true  │  0   │  3   │   3
  peek()             │   1    │  0   │  3   │   3
  dequeue()          │   1    │  1   │  3   │   2
  peek()             │   2    │  1   │  3   │   2
  getLength()        │   2    │  1   │  3   │   2
  ═══════════════════════════════════════════════════════
```

---

## 🧪 Test Cases

Gunakan unit test berikut untuk memvalidasi bahwa setiap method berjalan sesuai ekspektasi:

<details>
<summary>📋 Klik untuk melihat Test Cases (Jest)</summary>

```js
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

</details>

---
