# 🔄 Challenge: Membalik String Menggunakan Queue

> Tantangan ini meminta kita menulis fungsi yang membalik urutan karakter dalam sebuah string, menggunakan struktur data **Queue**.

---

## 📋 Instruksi

Tulis sebuah fungsi bernama `reverseStringQueue` yang menerima sebuah string dan mengembalikan **kebalikan** dari string tersebut.

Fungsi harus mengembalikan string yang sudah dibalik, tetapi kamu **wajib menggunakan class `Queue`** untuk melakukannya.

---

## 📝 Function Signature

```js
/**
 * Returns the reverse of a string.
 * @param {string} str - The string to reverse.
 * @returns {string} - The reverse of the string.
 */
function reverseStringQueue(str: string): string;
```

---

## 📎 Contoh

```js
reverseStringQueue('hello'); // olleh
reverseStringQueue('Howdy'); // ydwoH
reverseStringQueue('Greetings from Earth'); // htraE morf sgniteerG
```

---

## 🔒 Constraint

- String hanya akan berisi huruf kecil dan spasi

---

## 💡 Hints

- **Enqueue** semua karakter dari string ke dalam queue — tetapi mulai dari **indeks terakhir** ke indeks pertama
- **Dequeue** semua karakter dari queue dan gabungkan menjadi string baru

---

## ✅ Solusi

<details>
  <summary>Klik Untuk Melihat Solusi</summary>

```js
const Queue = require('./queue');

const reverseStringWithQueue = (str) => {
  const queue = new Queue();

  for (let i = str.length - 1; i >= 0; i--) {
    queue.enqueue(str[i]);
  }

  let reversedString = '';
  while (!queue.isEmpty()) {
    reversedString += queue.dequeue();
  }

  return reversedString;
};
```

### 📖 Penjelasan

1. Import class `Queue` dan buat instance queue baru
2. Iterasi string **dari belakang ke depan** (`str.length - 1` hingga `0`) dan **enqueue** setiap karakter ke dalam queue
3. Buat string kosong, lalu **dequeue** setiap karakter dari queue dan tambahkan ke string tersebut
4. Kembalikan string hasil pembalikan

---

### 🎨 Visualisasi ASCII

```
Input: "hello"

=== TAHAP 1: Enqueue dari belakang ke depan ===

String:   h   e   l   l   o
Index:    0   1   2   3   4
                          ↓ mulai dari sini (i = 4)

Loop iterasi:
  i=4 → enqueue('o')   Queue: [o]
  i=3 → enqueue('l')   Queue: [o, l]
  i=2 → enqueue('l')   Queue: [o, l, l]
  i=1 → enqueue('e')   Queue: [o, l, l, e]
  i=0 → enqueue('h')   Queue: [o, l, l, e, h]

State queue setelah semua karakter di-enqueue:
  ┌─────────────────────────┐
  │  o → l → l → e → h     │
  │  ↑                 ↑    │
  │ front             rear  │
  └─────────────────────────┘

=== TAHAP 2: Dequeue satu per satu ===

Queue FIFO → yang masuk pertama, keluar pertama

  dequeue() → 'o'   reversedString = "o"
  dequeue() → 'l'   reversedString = "ol"
  dequeue() → 'l'   reversedString = "oll"
  dequeue() → 'e'   reversedString = "olle"
  dequeue() → 'h'   reversedString = "olleh"

=== HASIL ===

  Input:  "hello"
  Output: "olleh" ✅
```

### 🧠 Mengapa Ini Bekerja?

```
Kunci utamanya ada di URUTAN ENQUEUE:

  ❌ BUKAN enqueue dari depan → itu akan menghasilkan string yang SAMA
     i=0 → 'h', i=1 → 'e', ... → Queue: [h, e, l, l, o] → "hello"

  ✅ Enqueue dari BELAKANG → menghasilkan string TERBALIK
     i=4 → 'o', i=3 → 'l', ... → Queue: [o, l, l, e, h] → "olleh"

  Karena Queue bersifat FIFO (First In, First Out):
  - Karakter yang di-enqueue PERTAMA akan di-dequeue PERTAMA
  - Dengan memasukkan dari belakang, karakter terakhir string
    menjadi yang pertama keluar dari queue
```

</details>

---

## 🧪 Test Cases

```js
test('Reversing a string', () => {
  expect(reverseStringQueue('Hello')).toBe('olleH');
  expect(reverseStringQueue('JavaScript')).toBe('tpircSavaJ');
  expect(reverseStringQueue('12345')).toBe('54321');
});
```
