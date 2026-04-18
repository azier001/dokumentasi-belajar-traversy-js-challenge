# 📝 Word Frequency Counter

> **Challenge:** Hitung frekuensi kemunculan setiap kata dalam sebuah string menggunakan JavaScript `Map`.

---

## 📑 Daftar Isi

- 🔍 [Pengenalan](#pengenalan)
- 🎯 [Tujuan Challenge](#tujuan-challenge)
- 🪜 [Langkah-langkah Penyelesaian](#langkah-langkah-penyelesaian)
  - 🔡 [Langkah 1 – Ubah ke Lowercase & Pisah Jadi Array](#langkah-1)
  - 🗺️ [Langkah 2 – Buat Map Kosong](#langkah-2)
  - 🔁 [Langkah 3 – Loop & Hitung Frekuensi](#langkah-3)
  - 📤 [Langkah 4 – Return Map](#langkah-4)
- 💻 [Kode Lengkap](#kode-lengkap)
- 🧪 [Contoh Output](#contoh-output)
- 🧠 [Kenapa Pakai Map, Bukan Object?](#kenapa-pakai-map)

---

<a name="pengenalan"></a>
## 🔍 Pengenalan

Challenge ini menggunakan **JavaScript `Map`** — sebuah struktur data yang menyimpan pasangan **key → value**. Kita akan pakai Map untuk menghitung seberapa sering setiap kata muncul dalam sebuah kalimat.

> 💡 Challenge ini mirip dengan challenge sebelumnya yang menghitung kemunculan *karakter*, bedanya sekarang kita menghitung kemunculan *kata*.

---

<a name="tujuan-challenge"></a>
## 🎯 Tujuan Challenge

Buat fungsi bernama `wordFrequencyCounter` yang:

- Menerima **satu string** sebagai input
- Mengabaikan **perbedaan huruf besar/kecil** (case-insensitive)
- Mengabaikan **tanda baca** (punctuation)
- Mengembalikan sebuah **`Map`** berisi kata sebagai key dan jumlah kemunculannya sebagai value

### Contoh input → output:

```js
wordFrequencyCounter('The quick brown fox jumps over the lazy dog.');
// Map { 'the' => 2, 'quick' => 1, 'brown' => 1, 'fox' => 1, ... }
```

Perhatikan: kata `"the"` muncul **2 kali** (satu di awal, satu di tengah kalimat), dan semuanya sudah dikonversi jadi huruf kecil.

---

<a name="langkah-langkah-penyelesaian"></a>
## 🪜 Langkah-langkah Penyelesaian

<a name="langkah-1"></a>
### 🔡 Langkah 1 – Ubah ke Lowercase & Pisah Jadi Array

Langkah pertama adalah mengubah seluruh string menjadi huruf kecil, lalu memisahkannya menjadi array of words (array berisi kata-kata).

```js
const words = str.toLowerCase().split(/\W+/);
```

**Penjelasan:**
- `.toLowerCase()` → mengubah semua huruf jadi huruf kecil, biar `"The"` dan `"the"` dianggap kata yang sama
- `.split(/\W+/)` → memisahkan string berdasarkan **regex** `/\W+/`

#### 🔎 Apa itu `/\W+/`?

| Simbol | Artinya |
|--------|---------|
| `\W`   | Cocok dengan karakter **bukan kata** (spasi, koma, titik, tanda seru, dll) |
| `+`    | Cocok dengan **satu atau lebih** karakter seperti itu secara berurutan |

> Kenapa tidak pakai `split(' ')` (spasi biasa) saja?
> Karena kalimat bisa mengandung tanda baca seperti titik atau koma yang nempel di kata. Dengan regex `\W+`, semua karakter non-kata (termasuk tanda baca dan spasi) langsung ikut dibuang sebagai pemisah.

**Hasilnya** adalah array of words, tapi hati-hati — bisa ada **string kosong `''`** di dalamnya, terutama di awal atau akhir array jika ada tanda baca di sana. Ini akan kita handle di langkah selanjutnya.

---

<a name="langkah-2"></a>
### 🗺️ Langkah 2 – Buat Map Kosong

```js
const wordFrequency = new Map();
```

Kita membuat sebuah `Map` kosong yang nantinya akan kita isi dengan pasangan **kata → jumlah kemunculan**.

---

<a name="langkah-3"></a>
### 🔁 Langkah 3 – Loop & Hitung Frekuensi

Sekarang kita loop melalui setiap kata dalam array, lalu update Map-nya.

```js
for (const word of words) {
  // Lewati string kosong
  if (word === '') continue;

  // Kalau kata sudah ada di Map, tambah 1
  if (wordFrequency.has(word)) {
    wordFrequency.set(word, wordFrequency.get(word) + 1);
  } else {
    // Kalau belum ada, set ke 1 (kemunculan pertama)
    wordFrequency.set(word, 1);
  }
}
```

**Penjelasan baris per baris:**

1. **`if (word === '') continue;`**
   Kalau kata ternyata string kosong (hasil split tadi), kita skip saja dengan `continue`.

2. **`wordFrequency.has(word)`**
   Cek apakah kata ini sudah ada di dalam Map. Method `.has()` mengembalikan `true` atau `false`.

3. **`wordFrequency.get(word) + 1`**
   Kalau sudah ada, ambil nilainya dengan `.get()`, lalu tambahkan 1.

4. **`wordFrequency.set(word, ...)`**
   Simpan/update nilai ke dalam Map dengan `.set(key, value)`.

5. **`wordFrequency.set(word, 1)`**
   Kalau kata belum pernah muncul, set nilainya ke `1`.

---

<a name="langkah-4"></a>
### 📤 Langkah 4 – Return Map

Setelah loop selesai, kembalikan Map yang sudah berisi semua frekuensi kata.

```js
return wordFrequency;
```

---

<a name="kode-lengkap"></a>
## 💻 Kode Lengkap

```js
function wordFrequencyCounter(str) {
  // Ubah ke lowercase dan pisah jadi array of words
  const words = str.toLowerCase().split(/\W+/);

  // Buat Map kosong untuk menyimpan frekuensi kata
  const wordFrequency = new Map();

  // Loop tiap kata dalam array
  for (const word of words) {
    // Lewati string kosong
    if (word === '') continue;

    // Kalau kata sudah ada, increment frekuensinya
    if (wordFrequency.has(word)) {
      wordFrequency.set(word, wordFrequency.get(word) + 1);
    } else {
      // Kalau belum ada, set ke 1
      wordFrequency.set(word, 1);
    }
  }

  return wordFrequency;
}

module.exports = wordFrequencyCounter;
```

---

<a name="contoh-output"></a>
## 🧪 Contoh Output

```js
const result = wordFrequencyCounter(
  'The quick brown fox jumps over the lazy dog.'
);

console.log(result);
// Map(8) {
//   'the'   => 2,
//   'quick' => 1,
//   'brown' => 1,
//   'fox'   => 1,
//   'jumps' => 1,
//   'over'  => 1,
//   'lazy'  => 1,
//   'dog'   => 1
// }
```

Kata `"the"` dengan huruf kapital di awal kalimat dan `"the"` di tengah kalimat dianggap **kata yang sama** berkat `.toLowerCase()`, sehingga nilainya `2`.

---

<a name="kenapa-pakai-map"></a>
## 🧠 Kenapa Pakai Map, Bukan Object?

Pertanyaan bagus! Sebenarnya kita bisa pakai plain object `{}` juga, tapi `Map` punya beberapa keuntungan:

| Fitur | `Map` | `Object` |
|-------|-------|----------|
| Method bawaan | `.has()`, `.get()`, `.set()` yang jelas | Harus pakai `hasOwnProperty` atau `in` |
| Urutan key | ✅ Terjaga sesuai urutan insert | ⚠️ Tidak selalu terjaga |
| Key tipe apa saja | ✅ Bisa angka, string, object, dll | ❌ Hanya string/symbol |
| Iterasi | ✅ Langsung bisa di-loop | ⚠️ Perlu `Object.entries()` dll |

Untuk kasus counting/frequency seperti ini, `Map` adalah pilihan yang **lebih ekspresif dan idiomatis** di JavaScript modern.
