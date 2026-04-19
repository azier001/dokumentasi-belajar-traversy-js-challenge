# 🔄 Reverse String Menggunakan Stack

> **Tantangan klasik membalikkan string, kali ini menggunakan struktur data Stack!**
> Dengan prinsip **LIFO (Last-In, First-Out)**, Stack secara alami membalik urutan data — cocok banget buat challenge ini.

---

## 📑 Daftar Isi

- 🎯 [Pengenalan](#pengenalan)
- 📐 [Function Signature](#function-signature)
- ⚙️ [Batasan & Contoh](#batasan-dan-contoh)
- 💡 [Petunjuk](#petunjuk)
- 🛠️ [Langkah-Langkah Membangun Solusi](#langkah-langkah-membangun-solusi)
- 🎬 [File Runner — Menjalankan Fungsi](#file-runner)
- ✅ [Solusi Lengkap](#solusi-lengkap)
- 📖 [Penjelasan Detail](#penjelasan-detail)
- 🖼️ [Visualisasi ASCII](#visualisasi-ascii)
- 📊 [Kompleksitas Waktu & Ruang](#kompleksitas-waktu-dan-ruang)
- 🧪 [Kasus Uji (Test Cases)](#kasus-uji)
- 🔑 [Poin Penting](#poin-penting)

---

<a name="pengenalan"></a>
## 🎯 Pengenalan

Ini adalah tantangan **membalikkan string yang ketiga**, tapi kali ini kita pakai **Stack**. Kenapa harus berkali-kali? Karena dengan mengerjakan tantangan yang **sama** menggunakan **struktur data yang berbeda** (Stack, Queue, Linked List, dll.), kita bisa melihat masalah dari banyak sudut pandang — mirip kayak bikin project yang sama pakai framework berbeda.

Dan yang menarik, **Stack itu secara alami cocok banget** buat membalikkan string. Kenapa? Karena sifat dasarnya: **Last-In, First-Out (LIFO)**. Data yang terakhir dimasukkan akan keluar duluan. Jadi kalau kita masukkan huruf-huruf satu per satu, saat dikeluarkan urutannya otomatis terbalik!

**Tugas kita:**
Buat fungsi `reverseStringStack` yang menerima sebuah string dan mengembalikan versi terbaliknya, **menggunakan class `Stack`** yang sudah kita buat sebelumnya.

---

<a name="function-signature"></a>
## 📐 Function Signature

```js
/**
 * Mengembalikan versi terbalik dari sebuah string.
 * @param {string} str - String yang akan dibalik.
 * @returns {string} - Hasil string yang sudah dibalik.
 */
function reverseStringStack(str: string): string;
```

---

<a name="batasan-dan-contoh"></a>
## ⚙️ Batasan & Contoh

### Batasan (Constraints)

- String hanya akan berisi **huruf kecil** dan **spasi**

### Contoh (Examples)

```js
reverseStringStack('hello');              // 'olleh'
reverseStringStack('Howdy');              // 'ydwoH'
reverseStringStack('Greetings from Earth'); // 'htraE morf sgniteerG'
```

---

<a name="petunjuk"></a>
## 💡 Petunjuk

Sebelum lihat solusi, coba pikirkan dua langkah utama ini:

1. **Push** setiap karakter dari string ke dalam stack
2. **Pop** karakter satu per satu dari stack untuk menyusun string terbalik

> 💭 Ingat sifat stack: yang **terakhir masuk** akan **pertama keluar**. Jadi kalau kamu push `h`, `e`, `l`, `l`, `o` — saat di-pop, yang keluar duluan adalah `o`, `l`, `l`, `e`, `h`. Voilà, string terbalik!

---

<a name="langkah-langkah-membangun-solusi"></a>
## 🛠️ Langkah-Langkah Membangun Solusi

Yuk kita bangun solusinya **step by step**, persis seperti di video.

### Langkah 1 — Import Stack dan Buat Fungsi

Pertama, kita import class `Stack` yang sudah kita buat dan definisikan fungsi utamanya:

```js
const Stack = require('./stack');

function reverseStringStack(str) {
  // Kode solusi akan ditulis di sini
}
```

### Langkah 2 — Inisialisasi Stack Baru

Di dalam fungsi, buat instance baru dari `Stack`:

```js
const stack = new Stack();
```

### Langkah 3 — Push Setiap Karakter ke Stack

Loop melalui string dan push setiap karakter satu per satu:

```js
for (let i = 0; i < str.length; i++) {
  stack.push(str[i]);
}
```

> 🧠 Setelah loop ini selesai, semua karakter sudah ada di stack. Karakter pertama (`h`) ada di **paling bawah**, dan karakter terakhir (`o`) ada di **paling atas**.

### Langkah 4 — Siapkan Variabel Penampung

Buat variabel kosong untuk menampung string hasil:

```js
let reversedString = '';
```

> ⚠️ **Catatan dari video:** Brad sempat lupa menginisialisasi variabel ini dengan string kosong `''`, sehingga hasilnya `undefined`. Pastikan selalu inisialisasi variabel string dengan `''` ya!

### Langkah 5 — Pop Karakter dan Susun String Terbalik

Gunakan `while` loop — selama stack belum kosong, pop karakter dan tambahkan ke `reversedString`:

```js
while (!stack.isEmpty()) {
  reversedString += stack.pop();
}
```

> 💡 Method `pop()` tidak hanya menghapus elemen dari atas stack, tapi juga **mengembalikan nilainya** (return). Jadi kita bisa langsung menambahkannya ke string.

### Langkah 6 — Return Hasilnya

```js
return reversedString;
```

---

<a name="file-runner"></a>
## 🎬 File Runner — Menjalankan Fungsi

Ini adalah file yang dipakai Brad untuk menguji fungsi secara cepat sebelum menjalankan test:

```js
// reverse-string-stack-run.js

const reverseStringStack = require('./reverse-string-stack');

const result = reverseStringStack('Hello World!');

console.log(result); // Output: !dlroW olleH
```

```
Jalankan dengan:  node reverse-string-stack-run.js
Hasil:            !dlroW olleH ✅
```

---

<a name="solusi-lengkap"></a>
## ✅ Solusi Lengkap

<details>
  <summary>Klik Untuk Melihat Solusi Lengkap</summary>

```js
const Stack = require('./stack');

function reverseStringStack(str) {
  // Buat stack baru
  const stack = new Stack();

  // Push setiap karakter ke dalam stack
  for (let i = 0; i < str.length; i++) {
    stack.push(str[i]);
  }

  // Buat variabel untuk menampung string terbalik
  let reversedString = '';

  // Pop karakter dari stack untuk menyusun string terbalik
  while (!stack.isEmpty()) {
    reversedString += stack.pop();
  }

  // Kembalikan string hasilnya
  return reversedString;
}

module.exports = reverseStringStack;
```

</details>

---

<a name="penjelasan-detail"></a>
## 📖 Penjelasan Detail

Mari kita bedah alur kerjanya satu per satu:

| No | Langkah | Kode | Penjelasan |
|----|---------|------|------------|
| 1 | Buat stack | `new Stack()` | Inisialisasi stack kosong sebagai wadah sementara |
| 2 | Push karakter | `stack.push(str[i])` | Masukkan setiap huruf ke stack, satu per satu |
| 3 | Siapkan penampung | `let reversedString = ''` | String kosong untuk menampung hasil akhir |
| 4 | Pop & susun | `reversedString += stack.pop()` | Ambil huruf dari atas stack (LIFO), tambahkan ke hasil |
| 5 | Return | `return reversedString` | Kembalikan string yang sudah terbalik |

**Kenapa Stack cocok untuk ini?**

Karena prinsip **LIFO** — data yang **terakhir masuk** akan **pertama keluar**. Saat kita push string `"hello"` ke stack, huruf `o` berada di paling atas. Saat di-pop, `o` keluar duluan, lalu `l`, `l`, `e`, `h` — menghasilkan `"olleh"`. **Otomatis terbalik!**

---

<a name="visualisasi-ascii"></a>
## 🖼️ Visualisasi ASCII

### Proses Lengkap: Membalikkan String `"Hello"`

```
╔══════════════════════════════════════════════════════════════════╗
║                    INPUT STRING: "Hello"                        ║
╚══════════════════════════════════════════════════════════════════╝


═══════════════════════════════════════════════════════════════════
  FASE 1: PUSH — Memasukkan karakter ke Stack
═══════════════════════════════════════════════════════════════════

 Iterasi i=0          i=1          i=2          i=3          i=4
 Push 'H'         Push 'e'     Push 'l'     Push 'l'     Push 'o'
 ─────────       ─────────    ─────────    ─────────    ─────────
                                                        |   o   | ← TOP
                                           |   l   |    |   l   |
                              |   l   |    |   l   |    |   l   |
               |   e   |     |   e   |    |   e   |    |   e   |
 |   H   |     |   H   |    |   H   |    |   H   |    |   H   |
 ─────────     ─────────    ─────────    ─────────    ─────────
  BOTTOM        BOTTOM       BOTTOM       BOTTOM       BOTTOM

 Size: 1        Size: 2      Size: 3      Size: 4      Size: 5


═══════════════════════════════════════════════════════════════════
  FASE 2: POP — Mengambil karakter dari Stack (LIFO)
═══════════════════════════════════════════════════════════════════

 Pop #1          Pop #2        Pop #3        Pop #4        Pop #5
 Ambil 'o'      Ambil 'l'    Ambil 'l'    Ambil 'e'    Ambil 'H'
 ─────────      ─────────    ─────────    ─────────    ─────────
 |   o   | ←
 |   l   |     |   l   | ←
 |   l   |     |   l   |    |   l   | ←
 |   e   |     |   e   |    |   e   |    |   e   | ←
 |   H   |     |   H   |    |   H   |    |   H   |    |   H   | ←
 ─────────     ─────────    ─────────    ─────────    ─────────

 reversed =    reversed =   reversed =   reversed =   reversed =
    "o"          "ol"         "oll"        "olle"       "olleH"


╔══════════════════════════════════════════════════════════════════╗
║                  HASIL AKHIR: "olleH"  ✅                       ║
╚══════════════════════════════════════════════════════════════════╝
```

### Alur Eksekusi Kode — Step by Step

```
reverseStringStack("Hello")
│
├─ 1. const stack = new Stack()
│     stack: [] (kosong)
│
├─ 2. LOOP: Push setiap karakter
│     ┌──────────┬────────────────────────┐
│     │ Iterasi  │ Isi Stack              │
│     ├──────────┼────────────────────────┤
│     │ i = 0    │ ['H']                  │
│     │ i = 1    │ ['H', 'e']             │
│     │ i = 2    │ ['H', 'e', 'l']        │
│     │ i = 3    │ ['H', 'e', 'l', 'l']   │
│     │ i = 4    │ ['H', 'e', 'l', 'l', 'o'] ← TOP │
│     └──────────┴────────────────────────┘
│
├─ 3. let reversedString = ''
│
├─ 4. WHILE LOOP: Pop & susun
│     ┌──────┬────────────┬────────────────┐
│     │ Pop  │ Nilai      │ reversedString │
│     ├──────┼────────────┼────────────────┤
│     │  #1  │ 'o'        │ "o"            │
│     │  #2  │ 'l'        │ "ol"           │
│     │  #3  │ 'l'        │ "oll"          │
│     │  #4  │ 'e'        │ "olle"         │
│     │  #5  │ 'H'        │ "olleH"        │
│     └──────┴────────────┴────────────────┘
│     stack.isEmpty() → true → keluar loop
│
└─ 5. return "olleH" ✅
```

### Kenapa LIFO = Terbalik?

```
  MASUK (Push)              KELUAR (Pop)
  ──────────►               ──────────►

  H → e → l → l → o        o → l → l → e → H
  ─────────────────         ─────────────────
  (urutan asli)             (urutan terbalik!)

  🔑 Yang TERAKHIR masuk (o), PERTAMA keluar
     Yang PERTAMA masuk (H), TERAKHIR keluar
```

---

<a name="kompleksitas-waktu-dan-ruang"></a>
## 📊 Kompleksitas Waktu & Ruang

| Jenis | Kompleksitas | Penjelasan |
|-------|:------------:|------------|
| **Time** | `O(n)` | Loop pertama (`for`) iterasi `n` kali untuk push. Loop kedua (`while`) iterasi `n` kali untuk pop. Total: `n + n = 2n` → tetap `O(n)` |
| **Space** | `O(n)` | Stack menyimpan `n` karakter. Variabel `reversedString` juga berisi `n` karakter. Total ruang ekstra sebanding dengan panjang input |

> 📝 `n` = panjang string input (`str.length`)

```
Time Complexity:

  Push loop     Pop loop
  ─────────     ─────────
  O(n)    +     O(n)      =  O(2n)  →  O(n)
     │              │
     ▼              ▼
  n iterasi     n iterasi


Space Complexity:

  Stack             reversedString
  ┌───┬───┬───┐     ┌───┬───┬───┐
  │ H │ e │...│     │ o │ l │...│
  └───┴───┴───┘     └───┴───┴───┘
     n elemen          n karakter     =  O(n)
```

---

<a name="kasus-uji"></a>
## 🧪 Kasus Uji (Test Cases)

```js
// reverse-string-stack.test.js

const reverseStringStack = require('./reverse-string-stack');

test('Reversing a string', () => {
  expect(reverseStringStack('Hello')).toBe('olleH');
  expect(reverseStringStack('JavaScript')).toBe('tpircSavaJ');
  expect(reverseStringStack('12345')).toBe('54321');
});
```

**Hasil test:**

```
✅ PASS  ./reverse-string-stack.test.js
  ✓ Reversing a string

Tests:  1 passed, 1 total
```

---

<a name="poin-penting"></a>
## 🔑 Poin Penting

1. **Stack secara alami membalik urutan** — berkat prinsip LIFO, kita tidak perlu logika tambahan yang rumit
2. **Selalu inisialisasi variabel string** dengan `''` — Brad sempat dapat `undefined` karena lupa bagian ini!
3. **`pop()` mengembalikan nilai** — method `pop()` bukan cuma menghapus, tapi juga me-return elemen yang dihapus
4. **Tantangan yang sama, cara berbeda** — mengerjakan reverse string dengan Stack, Queue, dan Linked List membantu kita memahami **kekuatan masing-masing struktur data**
5. **Kompleksitas `O(n)`** untuk waktu dan ruang — solusi ini efisien dan linear
