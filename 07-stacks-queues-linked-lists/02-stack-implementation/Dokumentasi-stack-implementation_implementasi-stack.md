# 🏗️ Implementasi Stack

> Sekarang setelah kita paham cara kerja **Stack** (Last In, First Out), saatnya kita **mengimplementasikannya sendiri** di JavaScript! Kita akan membuat **Class** `Stack` lengkap dengan method `push`, `pop`, dan `peek`.

> 💡 **Catatan penting:** Kalau kamu cari "JavaScript Stack" di Google, kamu akan menemukan **ribuan implementasi berbeda**. Banyak hal yang tidak baku — mulai dari nama method, properti apa saja yang dipakai, apakah ada batas maksimum atau tidak. **Selama implementasinya tetap berfungsi sebagai Stack (Last In, First Out), itu sudah benar.** Jadi jangan bingung kalau lihat versi yang berbeda!

---

## 📑 Daftar Isi

- 🧱 [Class Stack & Constructor](#class-stack--constructor)
- ⬆️ [Method `push` — Menambah ke Stack](#method-push--menambah-ke-stack)
- 📏 [Method `isFull` & `isEmpty` — Cek Kondisi Stack](#method-isfull--isempty--cek-kondisi-stack)
- 🧪 [Uji Coba Pertama](#uji-coba-pertama)
- ⬇️ [Method `pop` — Mengeluarkan dari Stack](#method-pop--mengeluarkan-dari-stack)
- 👁️ [Method `peek` — Mengintip Atas Stack](#method-peek--mengintip-atas-stack)
- 🧪 [Uji Coba Lengkap](#uji-coba-lengkap)
- 📦 [Kode Lengkap](#kode-lengkap)
- 🧪 [Test Cases](#test-cases)
- 💼 [Tips Interview](#tips-interview)

---

<a name="class-stack--constructor"></a>

## 🧱 Class Stack & Constructor

Langkah pertama, kita buat **class** bernama `Stack`. Di dalam **constructor**, kita siapkan 3 properti:

| Properti | Nilai Awal | Fungsi |
|----------|-----------|--------|
| `maxSize` | `100` | Batas maksimum elemen dalam stack |
| `stack` | `[]` | Array kosong untuk menyimpan data |
| `top` | `-1` | Index elemen teratas (dimulai dari -1 karena stack masih kosong) |

> 🤔 **Kenapa `top` dimulai dari `-1`?**
> Karena elemen pertama yang masuk akan punya index `0`. Jadi `-1` artinya **"belum ada elemen sama sekali"**. Kalau ada 1 item → `top = 0`, ada 2 item → `top = 1`, dan seterusnya.

```js
class Stack {
  constructor() {
    this.maxSize = 100;  // Batas maksimum elemen
    this.stack = [];      // Tempat penyimpanan data
    this.top = -1;        // Index elemen teratas (-1 = kosong)
  }
}
```

**Visualisasi kondisi awal Stack:**

```
Stack baru dibuat (kosong):

  top = -1 (belum ada elemen)

  ┌─────────────┐
  │  (kosong)    │
  └─────────────┘
  maxSize = 100
```

---

<a name="method-push--menambah-ke-stack"></a>

## ⬆️ Method `push` — Menambah ke Stack

Method `push` digunakan untuk **menambahkan elemen ke atas stack**. Langkah-langkahnya:

1. **Cek dulu** apakah stack sudah penuh (`isFull()`) → kalau penuh, return `false`
2. **Tambah** `top` sebanyak 1 (`this.top++`)
3. **Simpan** value ke posisi `top` di dalam array
4. **Return** `true` (berhasil ditambahkan)

```js
push(value) {
    // Kalau stack sudah penuh, tolak!
    if (this.isFull()) {
      return false;
    }

    // Naikkan index top
    this.top++;

    // Simpan value di posisi top
    this.stack[this.top] = value;

    return true;
  }
```

**Visualisasi proses `push`:**

```
push(1):               push(2):               push(3):
top: -1 → 0            top: 0 → 1             top: 1 → 2

┌─────────────┐        ┌─────────────┐        ┌─────────────┐
│             │        │             │        │  [2] = 3    │ ← TOP
├─────────────┤        ├─────────────┤        ├─────────────┤
│             │        │  [1] = 2    │ ← TOP  │  [1] = 2    │
├─────────────┤        ├─────────────┤        ├─────────────┤
│  [0] = 1    │ ← TOP  │  [0] = 1    │        │  [0] = 1    │
└─────────────┘        └─────────────┘        └─────────────┘
```

> 🔑 Perhatikan: setiap kali `push`, `top` naik 1. Value pertama yang masuk punya index `0`, lalu `1`, lalu `2`, dst.

---

<a name="method-isfull--isempty--cek-kondisi-stack"></a>

## 📏 Method `isFull` & `isEmpty` — Cek Kondisi Stack

Kita butuh dua method pembantu untuk mengecek kondisi stack.

### `isFull()` — Apakah Stack Penuh?

Caranya simpel: cek apakah `top` sudah mencapai `maxSize - 1`. Kenapa minus 1? Karena index dimulai dari 0, jadi kalau `maxSize = 100`, index terakhir adalah `99`.

```js
isFull() {
    return this.top === this.maxSize - 1;
  }
```

### `isEmpty()` — Apakah Stack Kosong?

Lebih simpel lagi: cek apakah `top === -1`. Kita sudah sepakat bahwa `-1` artinya kosong.

```js
isEmpty() {
    return this.top === -1;
  }
```

**Visualisasi:**

```
isEmpty() → true          isFull() → true
top = -1                  top = 99 (maxSize - 1)

┌─────────────┐           ┌─────────────┐
│  (kosong)    │           │  [99] = ...  │ ← TOP (penuh!)
└─────────────┘           ├─────────────┤
                          │  [98] = ...  │
                          ├─────────────┤
                          │     ...      │
                          ├─────────────┤
                          │  [0]  = ...  │
                          └─────────────┘
```

---

<a name="uji-coba-pertama"></a>

## 🧪 Uji Coba Pertama

Sekarang kita sudah punya `push`, `isFull`, dan `isEmpty`. Mari kita coba!

```js
const Stack = require('./stack');

const stack = new Stack();

stack.push(1);
stack.push(2);
stack.push(3);

console.log(stack);
```

**Output:**

```js
Stack {
  maxSize: 100,
  stack: [ 1, 2, 3 ],
  top: 2
}
```

> ⚠️ **Perhatikan:** `top: 2` ini adalah **index**, bukan **value**. Artinya elemen di posisi index `2` (yaitu angka `3`) sedang berada di atas stack. Index `0` = angka `1`, index `1` = angka `2`, index `2` = angka `3`.

---

<a name="method-pop--mengeluarkan-dari-stack"></a>

## ⬇️ Method `pop` — Mengeluarkan dari Stack

Method `pop` mengeluarkan elemen **teratas** dari stack dan **mengembalikan nilainya**.

> 💡 **Ada banyak cara implementasi `pop`!** Di beberapa implementasi, data tidak benar-benar dihapus dari array — cukup geser `top` saja. Tapi di implementasi kita, data **benar-benar dihapus** menggunakan built-in method `.pop()` milik JavaScript Array, supaya array-nya tetap bersih.

### Cara lain (tanpa menghapus data):

```js
// Cara alternatif — data TIDAK dihapus dari array
pop() {
    if (this.isEmpty()) return null;

    const valueToReturn = this.stack[this.top]; // simpan dulu nilainya
    this.top--;                                  // geser top ke bawah
    return valueToReturn;                        // kembalikan nilainya
}
// ⚠️ Masalah: angka 3 masih ada di dalam array, cuma "tidak terlihat"
```

### Cara yang kita pakai (data benar-benar dihapus):

```js
pop() {
    // Kalau stack kosong, kembalikan null
    if (this.isEmpty()) {
      return null;
    }

    // Kurangi top (karena elemen teratas akan dihapus)
    this.top--;

    // Hapus dan kembalikan elemen terakhir dari array
    return this.stack.pop();
  }
```

**Visualisasi proses `pop`:**

```
Sebelum pop():            Setelah pop():
top = 2                   top = 1

┌─────────────┐
│  [2] = 3    │ ← POP!   Return: 3
├─────────────┤           ┌─────────────┐
│  [1] = 2    │           │  [1] = 2    │ ← TOP (sekarang ini paling atas)
├─────────────┤           ├─────────────┤
│  [0] = 1    │           │  [0] = 1    │
└─────────────┘           └─────────────┘

stack: [1, 2, 3]          stack: [1, 2]
```

> 🔑 **Ingat:** `pop()` selalu me-**return** nilai yang dikeluarkan. Ini salah satu "aturan" Stack — saat kamu pop, kamu juga dapat tahu **apa** yang di-pop.

---

<a name="method-peek--mengintip-atas-stack"></a>

## 👁️ Method `peek` — Mengintip Atas Stack

Method `peek` digunakan untuk **melihat value elemen teratas** tanpa mengeluarkannya. Bedanya dengan `pop`: `peek` hanya **mengintip**, data tetap di tempatnya.

```js
peek() {
    // Kalau stack kosong, kembalikan null
    if (this.isEmpty()) {
      return null;
    }

    // Kembalikan value di posisi top (tanpa menghapus)
    return this.stack[this.top];
  }
```

**Visualisasi `peek` vs `pop`:**

```
         peek()                        pop()
  ┌─────────────┐              ┌─────────────┐
  │  [2] = 3    │ ← 👁️ Lihat   │  [2] = 3    │ ← 🗑️ Ambil & Hapus
  ├─────────────┤              ├─────────────┤
  │  [1] = 2    │              │  [1] = 2    │
  ├─────────────┤              ├─────────────┤
  │  [0] = 1    │              │  [0] = 1    │
  └─────────────┘              └─────────────┘

  Return: 3                    Return: 3
  Stack tetap: [1, 2, 3]      Stack berubah: [1, 2]
  top tetap: 2                 top berubah: 1
```

> 💡 `peek` mengembalikan **value** (isi data), bukan **index**. Jadi kalau `top = 1`, `peek()` tidak return `1`, tapi return `this.stack[1]` yaitu value yang ada di index tersebut.

---

<a name="uji-coba-lengkap"></a>

## 🧪 Uji Coba Lengkap

Sekarang mari kita coba semua method sekaligus:

```js
const Stack = require('./stack');

const stack = new Stack();

stack.push(1);
stack.push(2);
stack.push(3);

console.log(stack.pop());   // → 3 (pop elemen teratas)
console.log(stack.peek());  // → 2 (intip elemen teratas yang baru)
```

**Penjelasan step-by-step:**

```
1. Setelah push(1), push(2), push(3):

   ┌─────────────┐
   │  [2] = 3    │ ← TOP
   ├─────────────┤
   │  [1] = 2    │
   ├─────────────┤
   │  [0] = 1    │
   └─────────────┘

2. stack.pop() → Mengeluarkan 3, return 3:

   ┌─────────────┐
   │  [1] = 2    │ ← TOP (sekarang ini paling atas)
   ├─────────────┤
   │  [0] = 1    │
   └─────────────┘

3. stack.peek() → Mengintip atas, return 2 (data TIDAK dihapus):

   ┌─────────────┐
   │  [1] = 2    │ ← 👁️ peek = 2
   ├─────────────┤
   │  [0] = 1    │
   └─────────────┘
```

> ⚠️ **Hati-hati!** `peek()` mengembalikan **value** `2` (isi datanya), bukan index `1`. Walaupun `top = 1`, yang di-return adalah `this.stack[1]` yaitu angka `2`.

---

<a name="kode-lengkap"></a>

## 📦 Kode Lengkap

<details>
<summary>📄 <b>stack.js</b> — Class Stack lengkap</summary>

```js
class Stack {
  constructor() {
    // Batas maksimum elemen dalam stack
    this.maxSize = 100;
    // Tempat penyimpanan data (array)
    this.stack = [];
    // Index elemen teratas (-1 = kosong)
    this.top = -1;
  }

  // Menambahkan elemen ke atas stack
  push(value) {
    if (this.isFull()) {
      return false;
    }
    this.top++;
    this.stack[this.top] = value;
    return true;
  }

  // Mengeluarkan elemen teratas dari stack
  pop() {
    if (this.isEmpty()) {
      return null;
    }
    this.top--;
    return this.stack.pop();
  }

  // Mengintip value elemen teratas (tanpa menghapus)
  peek() {
    if (this.isEmpty()) {
      return null;
    }
    return this.stack[this.top];
  }

  // Cek apakah stack kosong
  isEmpty() {
    return this.top === -1;
  }

  // Cek apakah stack penuh
  isFull() {
    return this.top === this.maxSize - 1;
  }
}

module.exports = Stack;
```

</details>

<details>
<summary>📄 <b>stack-run.js</b> — File untuk menjalankan & menguji</summary>

```js
const Stack = require('./stack');

const stack = new Stack();

stack.push(1);
stack.push(2);
stack.push(3);

console.log(stack.pop());   // → 3
console.log(stack.peek());  // → 2
```

</details>

---

<a name="test-cases"></a>

## 🧪 Test Cases

<details>
<summary>📄 <b>stack-test.js</b> — Unit tests menggunakan Jest</summary>

```js
const Stack = require('./stack');

describe('Stack', () => {
  let stack;

  beforeEach(() => {
    stack = new Stack();
  });

  afterEach(() => {
    stack = null;
  });

  test('push should add an element to the stack', () => {
    stack.push(1);
    expect(stack.peek()).toBe(1);
  });

  test('pop should remove and return the top element from the stack', () => {
    stack.push(1);
    stack.push(2);
    const poppedElement = stack.pop();
    expect(poppedElement).toBe(2);
    expect(stack.peek()).toBe(1);
  });

  test('peek should return the top element without removing it', () => {
    stack.push(1);
    stack.push(2);
    expect(stack.peek()).toBe(2);
    expect(stack.pop()).toBe(2);
    expect(stack.peek()).toBe(1);
  });

  test('isEmpty should return true if the stack is empty', () => {
    expect(stack.isEmpty()).toBe(true);
    stack.push(1);
    expect(stack.isEmpty()).toBe(false);
    stack.pop();
    expect(stack.isEmpty()).toBe(true);
  });

  test('isFull should return true if the stack is full', () => {
    expect(stack.isFull()).toBe(false);
    for (let i = 0; i < stack.maxSize; i++) {
      stack.push(i);
    }
    expect(stack.isFull()).toBe(true);
  });
});
```

</details>

---

<a name="tips-interview"></a>

## 💼 Tips Interview

Kalau kamu berencana menghadapi **tech interview**, ada baiknya **hafalkan** cara membuat Stack ini. Implementasinya jauh **lebih sederhana** dibanding Hash Table — hanya beberapa method pendek yang mudah diingat.

Dalam pengalaman, interviewer sering bertanya tentang:
- 📚 **Stack** & **Queue**
- 🔗 **Linked Lists**
- 🌳 **Trees**

Stack adalah yang **paling mudah diingat**, jadi mulai dari sini adalah langkah yang tepat! 💪

---

> 🔜 **Selanjutnya:** Kita akan mengerjakan beberapa **challenges** menggunakan Stack yang sudah kita buat ini. Setelah itu, kita akan belajar tentang **Queue** yang cara implementasinya cukup mirip!
