# 🎯 Tantangan: Membalikkan String Menggunakan Stack

> **Tantangan ini fokus pada pemahaman struktur data Stack dengan menerapkan prinsip LIFO (Last-In-First-Out) untuk membalikkan urutan karakter dalam sebuah string.**

---

## 📝 Instruksi

Tulis sebuah fungsi bernama `reverseStringStack` yang menerima sebuah string sebagai argumen dan mengembalikan versi string yang dibalik. **Pastikan Anda menggunakan class `Stack`** yang telah kita buat sebelumnya.

Saya akan meminta Anda melakukan tantangan membalikkan string menggunakan berbagai struktur data yang berbeda. Meskipun ini mungkin terasa **berlebihan (overkill)**, latihan ini akan sangat membantu Anda dalam memahami cara kerja dan karakteristik unik dari setiap struktur data.

---

## 🖋️ Signature Fungsi

```js
/**
 * Mengembalikan versi terbalik dari sebuah string.
 * @param {string} str - String yang akan dibalik.
 * @returns {string} - Hasil string yang sudah dibalik.
 */
function reverseStringStack(str: string): string;
```

---

## ⚙️ Batasan (Constraints)

- String hanya akan berisi **huruf kecil** dan **spasi**.

---

## 🖼️ Visualisasi ASCII

Berikut adalah representasi bagaimana **Stack** bekerja untuk membalikkan string `"hello"`:

```text
STRING INPUT: "hello"

[ LANGKAH 1: PUSH ]
Memasukkan setiap karakter satu per satu ke dalam Stack (LIFO).

       STACK
    +---------+
 5. |    o    |  <-- TOP (Karakter terakhir yang masuk)
    +---------+
 4. |    l    |
    +---------+
 3. |    l    |
    +---------+
 2. |    e    |
    +---------+
 1. |    h    |  <-- BOTTOM
    +---------+

[ LANGKAH 2: POP ]
Mengambil karakter dari atas stack dan menyusunnya menjadi string baru.

    1. Pop 'o'  -> Bersisa: [h, e, l, l]     | Hasil: "o"
    2. Pop 'l'  -> Bersisa: [h, e, l]        | Hasil: "ol"
    3. Pop 'l'  -> Bersisa: [h, e]           | Hasil: "oll"
    4. Pop 'e'  -> Bersisa: [h]              | Hasil: "olle"
    5. Pop 'h'  -> Bersisa: []               | Hasil: "olleH"

HASIL AKHIR: "olleh"
```

---

## 💡 Petunjuk

- **Push** setiap karakter dari string ke dalam stack.
- **Pop** setiap karakter dari stack untuk menyusun kembali string dalam urutan terbalik.

---

## ✅ Solusi

<details>
  <summary>Klik Untuk Melihat Solusi</summary>

```js
const Stack = require('./stack');

function reverseStringStack(str) {
  const stack = new Stack();

  // Push setiap karakter ke dalam stack
  for (let i = 0; i < str.length; i++) {
    stack.push(str[i]);
  }

  let reversedString = '';

  // Pop karakter dari stack untuk menyusun string yang dibalik
  while (!stack.isEmpty()) {
    reversedString += stack.pop();
  }

  return reversedString;
}
```

### 📖 Penjelasan

1.  **Inisialisasi**: Membuat instance baru dari class `Stack`.
2.  **Iterasi Input**: Melakukan perulangan melalui string input dan melakukan `push` pada setiap karakter ke dalam stack. Karena stack bersifat LIFO, karakter terakhir akan berada di bagian paling atas.
3.  **Variabel Penampung**: Membuat variabel `reversedString` dan menginisialisasinya dengan string kosong.
4.  **Ekstraksi Data**: Melakukan perulangan `while` selama stack tidak kosong, kemudian melakukan `pop` pada setiap karakter dan menambahkannya ke variabel `reversedString`.
5.  **Output**: Mengembalikan variabel `reversedString` yang sekarang berisi string dalam urutan terbalik.

---

### 📊 Kompleksitas Waktu & Ruang

- **Time Complexity (Kompleksitas Waktu)**: `O(n)`, di mana `n` adalah panjang dari input string `str`. Hal ini dikarenakan fungsi melakukan perulangan melalui seluruh string satu kali untuk proses `push`, dan kemudian melakukan perulangan lagi pada stack untuk proses `pop`. Kedua operasi tersebut berjalan dalam waktu linear.
- **Space Complexity (Kompleksitas Ruang)**: `O(n)`, di mana `n` adalah panjang dari input string `str`. Hal ini dikarenakan fungsi menggunakan stack untuk menyimpan setiap karakter dari string input, dan ukuran stack berbanding lurus dengan panjang input string tersebut.

</details>

---

## 🧪 Kasus Uji (Test Cases)

```js
test('Membalikkan sebuah string', () => {
  expect(reverseStringStack('Hello')).toBe('olleH');
  expect(reverseStringStack('JavaScript')).toBe('tpircSavaJ');
  expect(reverseStringStack('12345')).toBe('54321');
});
```
