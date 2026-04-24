# 🔄 Cek Palindrome Menggunakan Queue dan Stack

> Dokumentasi dari video tutorial yang membahas cara mengecek **palindrome** menggunakan **dua struktur data sekaligus** — **Queue** dan **Stack**. Challenge ini disebut sebagai salah satu yang paling menunjukkan **esensi** cara kerja kedua struktur data tersebut.

---

## 📑 Daftar Isi

- 🎯 [Pengenalan](#pengenalan)
- 📂 [Struktur File](#struktur-file)
- 🏗️ [Class yang Digunakan](#class-yang-digunakan)
- 🔨 [Membangun Fungsi Langkah demi Langkah](#membangun-fungsi)
- 🧹 [Langkah 1: Bersihkan String dengan Regex](#langkah-1)
- 📥 [Langkah 2: Inisialisasi Queue & Stack, Lalu Isi](#langkah-2)
- ⚖️ [Langkah 3: Bandingkan Dequeue vs Pop](#langkah-3)
- 💡 [Kenapa Ini Bekerja?](#kenapa-bekerja)
- 📝 [Kode Lengkap (Solusi Original)](#kode-lengkap)
- 🔀 [Kode Alternatif: Modern ES6+](#kode-alternatif)
- 🧪 [Menjalankan Test](#menjalankan-test)
- 🔑 [Poin Penting](#poin-penting)

---

<a name="pengenalan"></a>
## 🎯 Pengenalan

Kita akan mengunjungi kembali challenge **Palindrome**, tapi kali ini menggunakan **KEDUA** struktur data — `Queue` dan `Stack` — untuk menyelesaikannya. Challenge ini menarik karena benar-benar **menunjukkan esensi** dari cara kerja Queue dan Stack.

Buat fungsi bernama `isPalindromeQueueStack` yang menerima sebuah string dan mengecek apakah string tersebut adalah **palindrome** — yaitu kata atau kalimat yang dibaca **sama** dari depan maupun belakang.

Contoh palindrome terkenal: **"A man, a plan, a canal: Panama"** — yang disebut-sebut merupakan salah satu palindrome terpanjang yang ada.

### 📐 Function Signature

```javascript
/**
 * Mengecek apakah sebuah string adalah palindrome.
 * @param {string} str - String yang akan dicek.
 * @returns {boolean} - True jika palindrome, false jika bukan.
 */
function isPalindromeQueueStack(str: string): boolean;
```

### 💡 Contoh

```javascript
isPalindromeQueueStack('racecar');                        // true
isPalindromeQueueStack('hello');                          // false
isPalindromeQueueStack('A man, a plan, a canal: Panama'); // true
```

### 🧩 Hints

1. Hapus semua karakter **non-alphanumeric** dari string
2. **Enqueue** dan **push** karakter string ke queue dan stack
3. **Dequeue** dan **pop** karakter dari queue dan stack
4. **Bandingkan** karakter yang keluar dari queue dan stack

> 💡 Alasan ini bekerja: dengan **Stack**, karakter secara alami akan **terbalik** saat di-pop. Dengan **Queue**, karakter keluar dalam **urutan yang sama** (first in, first out). Jadi kita tinggal membandingkan keduanya!

---

<a name="struktur-file"></a>
## 📂 Struktur File

```
08-palindrome-queue-stack.js/
├── queue.js                          ← Class Queue yang di-import
├── stack.js                          ← Class Stack yang di-import
├── palindrome-queue-stack.js         ← Fungsi utama (tempat kita menulis kode)
├── palindrome-queue-stack-solution.js← Solusi original dari tutorial
├── palindrome-queue-stack-run.js     ← File untuk menjalankan manual
└── palindrome-queue-stack.test.js    ← Test cases
```

---

<a name="class-yang-digunakan"></a>
## 🏗️ Class yang Digunakan

Kita sudah punya file `queue.js` dan `stack.js` dari challenge sebelumnya yang di-import ke dalam solusi. Berikut method penting dari kedua class:

> **Method yang dipakai di challenge ini:**
>
> | Method | Queue | Stack |
> |--------|-------|-------|
> | **Tambah** | `enqueue(element)` — masuk dari **belakang** | `push(value)` — masuk dari **atas** |
> | **Ambil** | `dequeue()` — keluar dari **depan** | `pop()` — keluar dari **atas** |
> | **Cek kosong** | `isEmpty()` | `isEmpty()` |
>
> ⚠️ **Perhatikan:** pastikan panggil `enqueue()` untuk Queue, **bukan** `push()`! `push()` hanya untuk Stack.

---

<a name="membangun-fungsi"></a>
## 🔨 Membangun Fungsi Langkah demi Langkah

Kita akan membangun fungsi ini secara bertahap. Pertama, import kedua class:

```javascript
const Queue = require('./queue');
const Stack = require('./stack');

function isPalindromeQueueStack(str) {
  // Langkah-langkah akan diisi di sini
}
```

---

<a name="langkah-1"></a>
## 🧹 Langkah 1: Bersihkan String dengan Regex

Hal pertama yang perlu dilakukan adalah memformat string — menghapus semua karakter non-alphanumeric dan mengubahnya ke huruf kecil:

```javascript
const formattedStr = str.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
```

**Penjelasan regex:**
- `/[^a-zA-Z0-9]/g` — regex dengan **carrot character** (`^`) di dalam brackets
- `^` artinya: match karakter yang **BUKAN** huruf atau angka
- `a-z` lowercase, `A-Z` uppercase, `0-9` angka
- `g` — flag **global**, supaya tidak hanya mengganti yang pertama, tapi **seluruh string** dicek
- Karakter yang cocok diganti dengan string kosong `''` (dihapus)
- `.toLowerCase()` — ubah semua menjadi huruf kecil

Untuk membuktikannya, coba return `formattedStr` dan lihat hasilnya:

```
Input:  "A man, a plan, a canal: Panama"
                    ↓ replace + toLowerCase
Output: "amanaplanacanalpanama"
```

> 💡 Tanpa pembersihan ini, palindrome tidak akan terdeteksi karena spasi dan tanda baca akan mengganggu perbandingan.

---

<a name="langkah-2"></a>
## 📥 Langkah 2: Inisialisasi Queue & Stack, Lalu Isi

Setelah string bersih, buat instance Queue dan Stack, lalu loop melalui setiap karakter:

```javascript
const charQueue = new Queue();
const charStack = new Stack();

for (let i = 0; i < formattedStr.length; i++) {
  const char = formattedStr.charAt(i);
  charQueue.enqueue(char);
  charStack.push(char);
}
```

**Penting:** pastikan gunakan **formatted string**, bukan string asli yang masih ada spasi dan tanda bacanya.

### 🎨 Visualisasi: Proses Pengisian Queue & Stack

```
Input (sudah dibersihkan): "racecar"

Setiap karakter masuk ke Queue DAN Stack secara bersamaan:

  i=0  char='r'  →  Queue: [r]                    Stack: [r]
  i=1  char='a'  →  Queue: [r, a]                 Stack: [r, a]
  i=2  char='c'  →  Queue: [r, a, c]              Stack: [r, a, c]
  i=3  char='e'  →  Queue: [r, a, c, e]           Stack: [r, a, c, e]
  i=4  char='c'  →  Queue: [r, a, c, e, c]        Stack: [r, a, c, e, c]
  i=5  char='a'  →  Queue: [r, a, c, e, c, a]     Stack: [r, a, c, e, c, a]
  i=6  char='r'  →  Queue: [r, a, c, e, c, a, r]  Stack: [r, a, c, e, c, a, r]

State akhir:

  Queue (FIFO — First In, First Out):
  ┌─────────────────────────────────────┐
  │  r → a → c → e → c → a → r        │
  │  ↑                             ↑   │
  │ head (keluar duluan)         tail   │
  └─────────────────────────────────────┘
  Urutan keluar: r, a, c, e, c, a, r  (SAMA seperti urutan masuk)

  Stack (LIFO — Last In, First Out):
  ┌─────────────────────────────────────┐
  │  r, a, c, e, c, a, r               │
  │                       ↑            │
  │                     top            │
  │              (keluar duluan)        │
  └─────────────────────────────────────┘
  Urutan keluar: r, a, c, e, c, a, r  (TERBALIK dari urutan masuk)
```

---

<a name="langkah-3"></a>
## ⚖️ Langkah 3: Bandingkan Dequeue vs Pop

Sekarang kita bandingkan karakter yang keluar dari Queue dan Stack. Ingat: baik `dequeue()` maupun `pop()` **mengembalikan** karakter yang dikeluarkan.

```javascript
while (!charQueue.isEmpty()) {
  if (charQueue.dequeue() !== charStack.pop()) {
    return false;
  }
}

return true;
```

**Penjelasan:**
- Selama Queue **belum kosong**, terus keluarkan karakter dari keduanya
- Jika karakter dari `dequeue()` **tidak sama** dengan karakter dari `pop()`, langsung `return false` — bukan palindrome
- Jika loop selesai tanpa pernah return false, berarti semua karakter cocok → `return true`

### 🎨 Visualisasi: Perbandingan Palindrome ✅ (Contoh: "racecar")

```
  Queue mengeluarkan dari DEPAN  →  r, a, c, e, c, a, r
  Stack mengeluarkan dari ATAS   →  r, a, c, e, c, a, r

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

  Semua cocok → return true ✅  PALINDROME!
```

### 🎨 Visualisasi: Bukan Palindrome ❌ (Contoh: "hello")

```
  Queue mengeluarkan dari DEPAN  →  h, e, l, l, o
  Stack mengeluarkan dari ATAS   →  o, l, l, e, h

  ┌──────────┬──────────────────┬──────────────────┬──────────────┐
  │ Iterasi  │ dequeue (Queue)  │  pop (Stack)     │ Cocok?       │
  ├──────────┼──────────────────┼──────────────────┼──────────────┤
  │    1     │       'h'        │       'o'        │  ❌ BEDA!    │
  └──────────┴──────────────────┴──────────────────┴──────────────┘

  Langsung return false ❌  BUKAN PALINDROME!
```

---

<a name="kenapa-bekerja"></a>
## 💡 Kenapa Ini Bekerja?

Challenge ini sebenarnya **sangat simpel** kalau kamu sudah paham cara kerja Queue dan Stack:

```
╔══════════════════════════════════════════════════════════════════╗
║            KENAPA QUEUE + STACK = PALINDROME CHECKER?            ║
╠══════════════════════════════════════════════════════════════════╣
║                                                                  ║
║  🥞 STACK (LIFO)                                                ║
║  ─────────────                                                   ║
║  • Push semua karakter secara normal                             ║
║  • Saat di-pop, karakter keluar dalam urutan TERBALIK            ║
║  • Stack secara alami membalik urutan!                            ║
║                                                                  ║
║    push: r, a, c, e, c, a, r                                    ║
║    pop:  r, a, c, e, c, a, r  ← terbalik dari urutan masuk     ║
║                                                                  ║
║  ─────────────────────────────────────────────                   ║
║                                                                  ║
║  📬 QUEUE (FIFO)                                                ║
║  ─────────────                                                   ║
║  • Enqueue semua karakter secara normal                          ║
║  • Saat di-dequeue, karakter keluar dalam URUTAN YANG SAMA       ║
║  • "Queue itu first in, first out — urutannya tidak berubah"     ║
║                                                                  ║
║    enqueue: r, a, c, e, c, a, r                                 ║
║    dequeue: r, a, c, e, c, a, r  ← sama dengan urutan masuk    ║
║                                                                  ║
║  ─────────────────────────────────────────────                   ║
║                                                                  ║
║  🔑 KESIMPULAN:                                                 ║
║  • Queue = string TIDAK terbalik (urutan normal)                 ║
║  • Stack = string TERBALIK (urutan kebalikan)                    ║
║  • Jika keduanya sama → dibaca sama dari depan & belakang       ║
║  • Itu artinya = PALINDROME! ✅                                 ║
║                                                                  ║
╚══════════════════════════════════════════════════════════════════╝
```

> 💬 *"The way that they're added and removed is why we can just simply evaluate them and see if they're equal or not, because the stack is going to do it in reverse automatically."*

---

<a name="kode-lengkap"></a>
## 📝 Kode Lengkap (Solusi Original)

<details>
  <summary>Klik Untuk Melihat Solusi</summary>

```javascript
const Queue = require('./queue');
const Stack = require('./stack');

function isPalindromeQueueStack(str) {
  // Hapus semua karakter non-alphanumeric dan ubah ke lowercase
  const formattedStr = str.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();

  // Buat instance Queue dan Stack baru
  const charQueue = new Queue();
  const charStack = new Stack();

  // Enqueue dan push setiap karakter dari formatted string
  for (let i = 0; i < formattedStr.length; i++) {
    const char = formattedStr.charAt(i);
    charQueue.enqueue(char);
    charStack.push(char);
  }

  // Dequeue dan pop, lalu bandingkan
  while (!charQueue.isEmpty()) {
    if (charQueue.dequeue() !== charStack.pop()) {
      return false;
    }
  }

  // Jika loop selesai tanpa return false, berarti palindrome
  return true;
}

module.exports = isPalindromeQueueStack;
```

</details>

File runner untuk menguji manual:

```javascript
const isPalindromeQueueStack = require('./palindrome-queue-stack');

const result1 = isPalindromeQueueStack('A man, a plan, a canal: Panama');
const result2 = isPalindromeQueueStack('Hello');

console.log(result1, result2); // true false
```

Hasilnya: `true` untuk yang pertama dan `false` untuk yang kedua — sesuai ekspektasi.

---

<a name="kode-alternatif"></a>
## 🔀 Kode Alternatif: Modern ES6+

Berikut versi kode yang lebih **modern** menggunakan fitur-fitur **ES6+**:

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
║  → Arrow function (=>) lebih ringkas                             ║
║  → Disimpan dalam const agar tidak bisa di-reassign             ║
║                                                                  ║
║  ─────────────────────────────────────────────────               ║
║                                                                  ║
║  📌 LOOP                                                        ║
║  ────────────────────                                            ║
║  Original:                                                       ║
║    for (let i = 0; i < formattedStr.length; i++) {              ║
║      const char = formattedStr.charAt(i);                       ║
║      ...                                                         ║
║    }                                                             ║
║                                                                  ║
║  Alternatif:                                                     ║
║    for (const char of formattedStr) {                           ║
║      ...                                                         ║
║    }                                                             ║
║                                                                  ║
║  → for...of langsung dapat karakter tanpa perlu indeks          ║
║  → Tidak perlu charAt(i) — lebih bersih dan mudah dibaca        ║
║  → Cocok dipakai ketika kita TIDAK butuh indeks (i)              ║
║                                                                  ║
╚══════════════════════════════════════════════════════════════════╝
```

| Aspek | `for` tradisional | `for...of` |
|-------|-------------------|------------|
| **Butuh indeks?** | ✅ Ya, punya `i` | ❌ Tidak ada indeks |
| **Keterbacaan** | Lebih verbose | ✅ Lebih bersih |
| **Performa** | Sedikit lebih cepat (mikro) | Hampir sama |
| **Kapan pakai** | Butuh indeks / kontrol manual | Hanya butuh **nilai** elemennya |

> 💡 Kedua kode menghasilkan output yang **persis sama**. Versi alternatif lebih ringkas dan menggunakan fitur modern JavaScript, tapi logika intinya **identik**.

---

<a name="menjalankan-test"></a>
## 🧪 Menjalankan Test

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
| **Preprocessing** | Hapus karakter non-alphanumeric dengan regex, ubah ke lowercase |
| **Queue** | Mengeluarkan karakter dari **depan** (urutan normal) |
| **Stack** | Mengeluarkan karakter dari **atas** (urutan terbalik) |
| **Logika palindrome** | Jika urutan normal === urutan terbalik → palindrome |
| **Kode alternatif** | `for...of` + arrow function → lebih ringkas, hasil sama |

> 🎯 Challenge ini sebenarnya simpel kalau sudah paham cara kerja Queue dan Stack — dan ini menunjukkan esensi dari kedua struktur data serta bagaimana mereka bisa bekerja sama!
