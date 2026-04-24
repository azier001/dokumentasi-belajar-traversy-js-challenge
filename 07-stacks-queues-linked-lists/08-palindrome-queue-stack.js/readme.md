# 🔄 Cek Palindrome Menggunakan Queue dan Stack

> Dokumentasi dari challenge yang menggabungkan **dua struktur data** — **Queue** dan **Stack** — untuk mengecek apakah sebuah string merupakan **palindrome**.

---

## 📑 Daftar Isi

- 🎯 [Pengenalan](#pengenalan)
- 📂 [Struktur File](#struktur-file)
- 🏗️ [Class yang Digunakan](#class-yang-digunakan)
- 📐 [Function Signature](#function-signature)
- 💡 [Contoh](#contoh)
- 🧩 [Hints](#hints)
- 🔨 [Membangun Solusi Langkah demi Langkah](#membangun-solusi)
- ✏️ [Tahap 1: Bersihkan String](#tahap-1)
- 📥 [Tahap 2: Enqueue & Push](#tahap-2)
- ⚖️ [Tahap 3: Bandingkan Dequeue vs Pop](#tahap-3)
- 📝 [Kode Lengkap (Solusi Original)](#kode-lengkap)
- 🔀 [Kode Alternatif: Modern ES6+](#kode-alternatif)
- 🧪 [Test Cases](#test-cases)
- 🔑 [Poin Penting](#poin-penting)

---

<a name="pengenalan"></a>
## 🎯 Pengenalan

Kita akan mengunjungi kembali challenge **Palindrome**, tapi kali ini menggunakan **KEDUA** struktur data — `Queue` dan `Stack` — secara bersamaan untuk menyelesaikannya.

Buat fungsi bernama `isPalindromeQueueStack` yang menerima sebuah string dan mengecek apakah string tersebut merupakan **palindrome**.

Fungsi harus mengembalikan `true` jika string adalah palindrome, dan `false` jika bukan. **Wajib** gunakan struktur data `Queue` dan `Stack`. Jika tidak berhasil sendiri, tidak masalah — ini challenge yang cukup sulit. Yang penting kamu **memahami solusinya**.

> 💡 **Apa itu palindrome?** String yang dibaca sama dari depan maupun belakang, contoh: `"racecar"`, `"madam"`.

---

<a name="struktur-file"></a>
## 📂 Struktur File

```
08-palindrome-queue-stack.js/
├── queue.js                          ← Class Queue yang di-import
├── stack.js                          ← Class Stack yang di-import
├── palindrome-queue-stack.js         ← Solusi kita
├── palindrome-queue-stack-solution.js← Solusi original dari tutorial
├── palindrome-queue-stack-run.js     ← File untuk menjalankan manual
└── palindrome-queue-stack.test.js    ← Test cases
```

---

<a name="class-yang-digunakan"></a>
## 🏗️ Class yang Digunakan

Challenge ini menggunakan **dua class** sekaligus dari challenge sebelumnya:

### Class Stack (LIFO)

```javascript
class Stack {
  constructor() {
    this.maxSize = 100;
    this.stack = [];
    this.top = -1;
  }

  push(value) {
    if (this.isFull()) return false;
    this.top++;
    this.stack[this.top] = value;
    return true;
  }

  pop() {
    if (this.isEmpty()) return null;
    this.top--;
    return this.stack.pop();
  }

  peek() {
    if (this.isEmpty()) return null;
    return this.stack[this.top];
  }

  isEmpty() {
    return this.top === -1;
  }

  isFull() {
    return this.top === this.maxSize - 1;
  }
}
```

### Class Queue (FIFO)

```javascript
class Queue {
  constructor() {
    this.queue = [];
    this.head = 0;
    this.tail = 0;
    this.maxSize = 100;
  }

  enqueue(element) {
    if (this.isFull()) return false;
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
```

> **Method penting yang dipakai:**
> | Method | Stack | Queue |
> |--------|-------|-------|
> | **Tambah** | `push(value)` | `enqueue(element)` |
> | **Ambil** | `pop()` — dari **atas** (terakhir masuk) | `dequeue()` — dari **depan** (pertama masuk) |
> | **Cek kosong** | `isEmpty()` | `isEmpty()` |

---

<a name="function-signature"></a>
## 📐 Function Signature

```javascript
/**
 * Mengecek apakah sebuah string adalah palindrome.
 * @param {string} str - String yang akan dicek.
 * @returns {boolean} - True jika palindrome, false jika bukan.
 */
function isPalindromeQueueStack(str: string): boolean;
```

---

<a name="contoh"></a>
## 💡 Contoh

```javascript
isPalindromeQueueStack('racecar');                      // true
isPalindromeQueueStack('hello');                        // false
isPalindromeQueueStack('A man, a plan, a canal: Panama'); // true
```

---

<a name="hints"></a>
## 🧩 Hints

1. Hapus semua karakter **non-alphanumeric** dari string
2. **Enqueue** dan **push** karakter string ke queue dan stack
3. **Dequeue** dan **pop** karakter dari queue dan stack
4. **Bandingkan** karakter yang keluar dari queue dan stack

---

<a name="membangun-solusi"></a>
## 🔨 Membangun Solusi Langkah demi Langkah

Pertama, import kedua class dan buat kerangka fungsinya:

```javascript
const Queue = require('./queue');
const Stack = require('./stack');

function isPalindromeQueueStack(str) {
  // Langkah-langkah akan diisi di sini
}

module.exports = isPalindromeQueueStack;
```

---

<a name="tahap-1"></a>
## ✏️ Tahap 1: Bersihkan String

Hapus semua karakter non-alphanumeric dan ubah ke huruf kecil:

```javascript
const formattedStr = str.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
```

**Penjelasan regex `/[^a-zA-Z0-9]/g`:**
- `[^...]` — match karakter yang **BUKAN** ada di dalam bracket
- `a-zA-Z` — semua huruf (kecil dan besar)
- `0-9` — semua angka
- `g` — global flag, ganti **semua** kemunculan

```
Input:  "A man, a plan, a canal: Panama"
                ↓ replace + toLowerCase
Output: "amanaplanacanalpanama"
```

---

<a name="tahap-2"></a>
## 📥 Tahap 2: Enqueue & Push

Masukkan setiap karakter ke **KEDUA** struktur data:

```javascript
const charQueue = new Queue();
const charStack = new Stack();

for (let i = 0; i < formattedStr.length; i++) {
  const char = formattedStr.charAt(i);
  charQueue.enqueue(char);
  charStack.push(char);
}
```

### 🎨 Visualisasi: Proses Pengisian

```
Input (sudah dibersihkan): "racecar"

Setiap karakter dimasukkan ke Queue DAN Stack secara bersamaan:

  Iterasi 0: char = 'r'
    Queue: [ r ]                  ← masuk dari belakang
    Stack: [ r ]                  ← masuk dari atas

  Iterasi 1: char = 'a'
    Queue: [ r, a ]
    Stack: [ r, a ]

  ... (lanjut sampai semua karakter)

  Iterasi 6: char = 'r'
    Queue: [ r, a, c, e, c, a, r ]
    Stack: [ r, a, c, e, c, a, r ]

State akhir:

  Queue (FIFO):
  ┌─────────────────────────────────┐
  │  r → a → c → e → c → a → r    │
  │  ↑                         ↑   │
  │ head (keluar duluan)     tail   │
  └─────────────────────────────────┘
  Urutan keluar: r, a, c, e, c, a, r  (dari DEPAN)

  Stack (LIFO):
  ┌─────────────────────────────────┐
  │  r ← a ← c ← e ← c ← a ← r  │
  │                             ↑   │
  │                           top   │
  │                    (keluar duluan)│
  └─────────────────────────────────┘
  Urutan keluar: r, a, c, e, c, a, r  (dari ATAS/belakang)
```

---

<a name="tahap-3"></a>
## ⚖️ Tahap 3: Bandingkan Dequeue vs Pop

Ini adalah **inti dari logika palindrome**. Keluarkan karakter dari kedua struktur data dan bandingkan:

```javascript
while (!charQueue.isEmpty()) {
  if (charQueue.dequeue() !== charStack.pop()) {
    return false;
  }
}

return true;
```

### 🎨 Visualisasi: Proses Perbandingan (Palindrome ✅)

```
String: "racecar"

  Queue mengeluarkan dari DEPAN  →  r, a, c, e, c, a, r
  Stack mengeluarkan dari ATAS   →  r, a, c, e, c, a, r

  Perbandingan tiap iterasi:
  ┌──────────┬──────────────────┬──────────────────┬─────────┐
  │ Iterasi  │ dequeue (Queue)  │  pop (Stack)     │ Cocok?  │
  ├──────────┼──────────────────┼──────────────────┼─────────┤
  │    1     │       'r'        │       'r'        │  ✅ Ya  │
  │    2     │       'a'        │       'a'        │  ✅ Ya  │
  │    3     │       'c'        │       'c'        │  ✅ Ya  │
  │    4     │       'e'        │       'e'        │  ✅ Ya  │
  │    5     │       'c'        │       'c'        │  ✅ Ya  │
  │    6     │       'a'        │       'a'        │  ✅ Ya  │
  │    7     │       'r'        │       'r'        │  ✅ Ya  │
  └──────────┴──────────────────┴──────────────────┴─────────┘

  Semua cocok → return true ✅  (Palindrome!)
```

### 🎨 Visualisasi: Proses Perbandingan (Bukan Palindrome ❌)

```
String: "hello"

  Queue mengeluarkan dari DEPAN  →  h, e, l, l, o
  Stack mengeluarkan dari ATAS   →  o, l, l, e, h

  Perbandingan:
  ┌──────────┬──────────────────┬──────────────────┬──────────────┐
  │ Iterasi  │ dequeue (Queue)  │  pop (Stack)     │ Cocok?       │
  ├──────────┼──────────────────┼──────────────────┼──────────────┤
  │    1     │       'h'        │       'o'        │  ❌ BEDA!    │
  └──────────┴──────────────────┴──────────────────┴──────────────┘

  Langsung return false ❌  (Bukan palindrome!)
```

### 💡 Kenapa Ini Bekerja?

```
Kunci logikanya:

  Queue (FIFO) → mengeluarkan karakter dari DEPAN ke BELAKANG
                 Urutan: karakter ke-1, ke-2, ke-3, ... ke-n

  Stack (LIFO) → mengeluarkan karakter dari BELAKANG ke DEPAN
                 Urutan: karakter ke-n, ke-(n-1), ... ke-1

  Jika SEMUA karakter yang keluar dari Queue === Stack:
  → Berarti string dibaca SAMA dari depan dan belakang
  → Berarti string adalah PALINDROME! ✅
```

---

<a name="kode-lengkap"></a>
## 📝 Kode Lengkap (Solusi Original)

<details>
  <summary>Klik Untuk Melihat Solusi</summary>

```javascript
const Queue = require('./queue');
const Stack = require('./stack');

function isPalindromeQueueStack(str) {
  const formattedStr = str.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();

  const charQueue = new Queue();
  const charStack = new Stack();

  for (let i = 0; i < formattedStr.length; i++) {
    const char = formattedStr.charAt(i);
    charQueue.enqueue(char);
    charStack.push(char);
  }

  while (!charQueue.isEmpty()) {
    if (charQueue.dequeue() !== charStack.pop()) {
      return false;
    }
  }

  return true;
}

module.exports = isPalindromeQueueStack;
```

</details>

---

<a name="kode-alternatif"></a>
## 🔀 Kode Alternatif: Modern ES6+

Berikut adalah versi kode yang lebih **modern** menggunakan fitur-fitur **ES6+**:

```javascript
const isPalindromeQueueStack = (str) => {
  const formattedStr = str.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();

  const charQueue = new Queue();
  const charStack = new Stack();

  for (const char of formattedStr) {
    charQueue.enqueue(char);
    charStack.push(char);
  }

  while (!charQueue.isEmpty()) {
    if (charQueue.dequeue() !== charStack.pop()) {
      return false;
    }
  }

  return true;
};
```

### 🆚 Perbedaan dengan Solusi Original

```
╔══════════════════════════════════════════════════════════════════╗
║               ORIGINAL  vs  ALTERNATIF (ES6+)                   ║
╠══════════════════════════════════════════════════════════════════╣
║                                                                  ║
║  📌 DEKLARASI FUNGSI                                            ║
║  ────────────────────                                            ║
║  Original:    function isPalindromeQueueStack(str) { ... }      ║
║  Alternatif:  const isPalindromeQueueStack = (str) => { ... };  ║
║                                                                  ║
║  → Arrow function (=>) lebih ringkas dan merupakan              ║
║    gaya penulisan JavaScript modern (ES6+)                       ║
║  → Disimpan dalam const agar tidak bisa di-reassign             ║
║                                                                  ║
║  ─────────────────────────────────────────────────               ║
║                                                                  ║
║  📌 LOOP                                                        ║
║  ────────────────────                                            ║
║  Original:                                                       ║
║    for (let i = 0; i < formattedStr.length; i++) {              ║
║      const char = formattedStr.charAt(i);                       ║
║      charQueue.enqueue(char);                                    ║
║      charStack.push(char);                                       ║
║    }                                                             ║
║                                                                  ║
║  Alternatif:                                                     ║
║    for (const char of formattedStr) {                           ║
║      charQueue.enqueue(char);                                    ║
║      charStack.push(char);                                       ║
║    }                                                             ║
║                                                                  ║
║  → for...of lebih BERSIH — tidak perlu indeks & charAt          ║
║  → Langsung dapat karakter di setiap iterasi                     ║
║  → Cocok dipakai ketika kita TIDAK butuh indeks (i)              ║
║                                                                  ║
╚══════════════════════════════════════════════════════════════════╝
```

### 📊 Kapan Pakai yang Mana?

| Aspek | `for` tradisional | `for...of` |
|-------|-------------------|------------|
| **Butuh indeks?** | ✅ Ya, punya `i` | ❌ Tidak ada indeks |
| **Keterbacaan** | Lebih verbose | ✅ Lebih bersih |
| **Performa** | Sedikit lebih cepat (mikro) | Hampir sama |
| **Kapan pakai** | Butuh indeks / kontrol manual | Hanya butuh **nilai** elemennya |

> 💡 **Kesimpulan:** Kedua kode menghasilkan output yang **persis sama**. Versi alternatif lebih ringkas dan menggunakan fitur modern JavaScript, tapi logika intinya **identik**. Untuk challenge belajar struktur data seperti ini, pilih yang paling mudah kamu pahami!

---

<a name="test-cases"></a>
## 🧪 Test Cases

```javascript
test('Checking for palindrome strings', () => {
  expect(isPalindromeQueueStack('racecar')).toBe(true);
  expect(isPalindromeQueueStack('Hello')).toBe(false);
  expect(isPalindromeQueueStack('A man, a plan, a canal, Panama')).toBe(true);
  expect(isPalindromeQueueStack('12321')).toBe(true);
});
```

Semua test **passed** ✅ — baik solusi original maupun alternatif memberikan hasil yang sama.

---

## 🔑 Poin Penting

| Konsep | Detail |
|--------|--------|
| **Struktur data** | Queue (FIFO) + Stack (LIFO) digunakan **bersamaan** |
| **Preprocessing** | Hapus karakter non-alphanumeric, ubah ke lowercase |
| **Queue** | Mengeluarkan karakter dari **depan** (urutan normal) |
| **Stack** | Mengeluarkan karakter dari **atas** (urutan terbalik) |
| **Logika palindrome** | Jika urutan normal === urutan terbalik → palindrome |
| **Alternatif ES6+** | `for...of` + arrow function → lebih ringkas, hasil sama |

> 🎯 **Insight:** Challenge ini menunjukkan kekuatan menggabungkan dua struktur data. Queue membaca dari depan, Stack membaca dari belakang — jika cocok semua, maka palindrome!
