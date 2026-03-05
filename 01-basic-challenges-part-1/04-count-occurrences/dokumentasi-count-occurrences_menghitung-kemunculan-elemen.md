# 🔢 Count Occurrences — Catatan Belajar JavaScript

> 📌 **Challenge:** Hitung berapa kali sebuah karakter muncul dalam sebuah string.

---

## 📋 Daftar Isi

- 🎯 [Apa yang Harus Dibuat?](#apa-yang-harus-dibuat)
- 🧪 [Contoh Penggunaan](#contoh-penggunaan)
- ⚙️ [Aturan Penting](#aturan-penting)
- 🛠️ [Solusi 1 — Pakai For Loop](#solusi-1--pakai-for-loop)
- ✂️ [Solusi 2 — Pakai `.split()`](#solusi-2--pakai-split)
- 🔄 [Solusi 3 — Pakai `for...of`](#solusi-3--pakai-forof)
- 🧠 [Perbandingan Ketiga Solusi](#perbandingan-ketiga-solusi)
- ✅ [Test Cases](#test-cases)

---

<a name="apa-yang-harus-dibuat"></a>
## 🎯 Apa yang Harus Dibuat?

Buat fungsi bernama `countOccurrences()` yang menerima dua parameter:
- **`str`** → string yang mau dicek
- **`char`** → karakter yang mau dihitung kemunculannya

Fungsi ini harus **mengembalikan angka** — berapa kali `char` muncul di dalam `str`.

---

<a name="contoh-penggunaan"></a>
## 🧪 Contoh Penggunaan

```js
countOccurrences('hello', 'l'); // 2 → ada dua huruf 'l' di 'hello'
countOccurrences('hello', 'z'); // 0 → tidak ada huruf 'z' di 'hello'
```

> 💡 `'hello world'` punya **tiga** huruf `l` lho (dua di "hello", satu di "world")!

---

<a name="aturan-penting"></a>
## ⚙️ Aturan Penting

> 🔡 **Huruf besar dan kecil dianggap BERBEDA.**

```js
countOccurrences('hellLo', 'l'); // 2 → hanya lowercase 'l' yang dihitung
countOccurrences('hellLo', 'L'); // 1 → hanya uppercase 'L' yang dihitung
```

Jadi `'l'` dan `'L'` bukan karakter yang sama. Kalau mau bikin case-insensitive (tidak peduli besar/kecil), kamu bisa modifikasi fungsinya sendiri — tapi untuk challenge ini, versi default-nya case-sensitive.

---

<a name="solusi-1--pakai-for-loop"></a>
## 🛠️ Solusi 1 — Pakai For Loop

Ini cara yang lebih **"manual"** tapi mudah dipahami. Idenya sederhana: kita jalan satu per satu dari awal string sampai akhir, terus cek apakah karakter saat ini sama dengan yang kita cari.

> 💡 **Ingat:** String bisa di-loop sama seperti array! `str[0]` adalah karakter pertama, `str[1]` karakter kedua, dan seterusnya.

```js
function countOccurrences(str, char) {
  // Mulai dari nol, belum ada yang ditemukan
  let count = 0;

  // Loop dari index 0 sampai akhir string
  for (let i = 0; i < str.length; i++) {
    // Kalau karakter saat ini sama dengan yang dicari, tambah count
    if (str[i] === char) {
      count++;
    }
  }

  // Kembalikan hasilnya
  return count;
}
```

**Cara kerjanya step by step untuk `countOccurrences('hello', 'l')`:**

| Iterasi | `i` | `str[i]` | Sama dengan `'l'`? | `count` |
|---------|-----|----------|--------------------|---------|
| 1       | 0   | `'h'`    | ❌                  | 0       |
| 2       | 1   | `'e'`    | ❌                  | 0       |
| 3       | 2   | `'l'`    | ✅                  | 1       |
| 4       | 3   | `'l'`    | ✅                  | 2       |
| 5       | 4   | `'o'`    | ❌                  | 2       |

Hasil akhir: **2** ✅

---

<a name="solusi-2--pakai-split"></a>
## ✂️ Solusi 2 — Pakai `.split()`

Ini cara yang lebih **ringkas**. Triknya memanfaatkan method `.split()` bawaan JavaScript.

### Dulu kenalan dulu sama `.split()` 👋

Method `.split()` memecah sebuah string jadi array berdasarkan pemisah yang kita tentukan.

```js
// Split pakai empty string → setiap huruf jadi elemen array
'hello'.split('');
// ['h', 'e', 'l', 'l', 'o']

// Split pakai 'l' → string dipotong di setiap 'l'
'hello'.split('l');
// ['he', '', 'o']
```

> 🔍 Perhatikan: huruf `'l'` sendiri **hilang** dari array karena dia jadi "pemotong". Yang tersisa adalah bagian-bagian di antara `'l'`.

### Trik hitungnya 🧮

Kalau `'hello'.split('l')` menghasilkan array dengan **3 elemen**, berarti ada **2** huruf `'l'` di dalamnya.

Polanya: **jumlah elemen array - 1 = jumlah kemunculan karakter**

```js
'hello'.split('l').length;     // 3
'hello'.split('l').length - 1; // 2 → ini jumlah 'l' yang ada!
```

### Kodenya

```js
// Versi panjang dulu
const countOccurrences = (str, char) => {
  return str.split(char).length - 1;
};

// Versi singkat pakai implicit return (arrow function)
const countOccurrences = (str, char) => str.split(char).length - 1;
```

> 💡 **Implicit return** artinya kita bisa hapus kata `return` dan kurung kurawal `{}` kalau ekspresinya cuma satu baris di arrow function.

---

<a name="solusi-3--pakai-forof"></a>
## 🔄 Solusi 3 — Pakai `for...of`

`for...of` adalah versi yang lebih modern dan bersih dari for loop biasa. Cocok dipakai kalau kamu **nggak butuh index** dari karakternya.

> 💡 Bedanya sama Solusi 1: di `for...of`, kamu langsung dapat **nilai karakternya** — nggak perlu tulis `str[i]` lagi.

```js
function countOccurrences(str, char) {
  let count = 0;

  // 'letter' langsung berisi karakternya, bukan index-nya
  for (let letter of str) {
    if (letter === char) {
      count++;
    }
  }

  return count;
}
```

**Cara kerjanya untuk `countOccurrences('hello', 'l')`:**

| Iterasi | `letter` | Sama dengan `'l'`? | `count` |
|---------|----------|--------------------|---------|
| 1       | `'h'`    | ❌                  | 0       |
| 2       | `'e'`    | ❌                  | 0       |
| 3       | `'l'`    | ✅                  | 1       |
| 4       | `'l'`    | ✅                  | 2       |
| 5       | `'o'`    | ❌                  | 2       |

Hasil akhir: **2** ✅

> 🆚 **Kapan pakai `for` biasa vs `for...of`?**
> - Butuh tahu posisi/index karakternya → pakai `for` biasa (ada `i`-nya)
> - Cukup tahu nilai karakternya saja → pakai `for...of`, lebih simpel dan bersih

---

<a name="perbandingan-ketiga-solusi"></a>
## 🧠 Perbandingan Ketiga Solusi

| | Solusi 1 (`for`) | Solusi 2 (`.split()`) | Solusi 3 (`for...of`) |
|---|---|---|---|
| **Panjang kode** | Sedang | Sangat singkat (1 baris) | Sedang |
| **Mudah dibaca?** | ✅ Eksplisit | Perlu tahu trik `.split()` | ✅ Paling bersih |
| **Performa** | ✅ Efisien | Sedikit lebih lambat | ✅ Efisien |
| **Akses index?** | ✅ Bisa (via `i`) | ❌ | ❌ Tidak perlu |
| **Gaya** | Klasik / prosedural | Fungsional | Modern / idiomatik |

> ⚡ Solusi 1 dan 3 sama-sama efisien karena langsung menghitung tanpa membuat struktur data baru. Solusi 2 sedikit lebih lambat karena harus membuat array terlebih dahulu, tapi perbedaannya sangat kecil untuk string normal.

Ketiganya **benar** dan lulus test! Pilih yang paling masuk akal buatmu.

---

<a name="test-cases"></a>
## ✅ Test Cases

```js
test('Count Occurrences of a Character', () => {
  expect(countOccurrences('hello', 'l')).toBe(2);        // dua 'l' di 'hello'
  expect(countOccurrences('programming', 'm')).toBe(2);  // dua 'm' di 'programming'
  expect(countOccurrences('banana', 'a')).toBe(3);       // tiga 'a' di 'banana'
});
```

Jalankan dengan:

```bash
npm test
```

Kalau semua hijau ✅ — selamat, tantangan selesai! 🎉