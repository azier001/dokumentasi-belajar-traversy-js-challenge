# 🔄 Reverse String — Catatan Belajar Pribadi

> 📌 **Topik:** Algoritma dasar — membalik string
> 🎯 **Level:** Pemula | Cocok untuk persiapan interview entry-level

---

## 📋 Daftar Isi

- 🔍 [Pengenalan](#pengenalan)
- 💡 [Konsep Dasar](#konsep-dasar)
- 🛠️ [Solusi 1: Pakai Built-in Methods](#solusi-1)
- 🔁 [Solusi 2: Pakai For Loop](#solusi-2)
- ✅ [Testing](#testing)
- 📝 [Kesimpulan](#kesimpulan)

---

<a name="pengenalan"></a>
## 🔍 Pengenalan

**Reverse String** adalah salah satu soal paling umum di interview untuk posisi **entry-level**. Idenya sederhana: kita diberi sebuah string, lalu kita kembalikan string itu dalam urutan terbalik.

```
"hello"  →  "olleh"
"world"  →  "dlrow"
""       →  ""
```

> 💬 *Soal ini nggak akan muncul di interview senior, tapi bagus banget buat latihan logika dasar.*

---

<a name="konsep-dasar"></a>
## 💡 Konsep Dasar

### Apa yang diminta?

Buat fungsi `reverseString` yang:
- Menerima satu parameter: string (`str`)
- Mengembalikan string tersebut dalam urutan terbalik

### Aturan input
- String hanya berisi **huruf kecil** dan **spasi**
- Kalau input string kosong `""`, kembalikan string kosong juga

---

<a name="solusi-1"></a>
## 🛠️ Solusi 1: Pakai Built-in Methods

Cara ini lebih pendek dan memanfaatkan tiga method bawaan JavaScript: `split`, `reverse`, dan `join`.

### Kenapa tidak bisa langsung `str.reverse()`?

Di JavaScript, **tidak ada method `.reverse()` untuk string**. Tapi array punya! Jadi triknya: ubah string jadi array dulu, balik arraynya, baru gabung lagi jadi string.

### Step by step

**Step 1 — `split('')`**: Pecah string jadi array karakter

```js
"hello".split('')
// → ["h", "e", "l", "l", "o"]
```

> ⚠️ Perhatikan argumennya adalah **string kosong** `''` (bukan spasi). Kalau pakai spasi, string akan dipecah per kata, bukan per huruf.

**Step 2 — `.reverse()`**: Balik urutan array

```js
["h", "e", "l", "l", "o"].reverse()
// → ["o", "l", "l", "e", "h"]
```

**Step 3 — `.join('')`**: Gabungkan array kembali jadi string

```js
["o", "l", "l", "e", "h"].join('')
// → "olleh"
```

> ⚠️ Argumen `.join('')` juga harus **string kosong**. Kalau tidak diisi, hasilnya akan ada koma: `"o,l,l,e,h"` — bukan yang kita mau!

### Kode lengkap

```js
// Versi panjang
function reverseString(str) {
  return str.split('').reverse().join('');
}

// Versi pendek pakai arrow function
const reverseString = str => str.split('').reverse().join('');
```

Keduanya menghasilkan output yang sama. Versi arrow function lebih ringkas karena tidak perlu kata kunci `return` (implicit return).

---

<a name="solusi-2"></a>
## 🔁 Solusi 2: Pakai For Loop

Cara ini sedikit lebih panjang, tapi **lebih menunjukkan kemampuan logika** dibandingkan hanya menyambung method-method bawaan.

### Idenya

Kita loop dari belakang string ke depan, lalu tambahkan satu per satu karakter ke variabel baru.

### Step by step

**Step 1**: Siapkan variabel kosong untuk menampung hasil

```js
let reversed = '';
```

**Step 2**: Loop mundur — mulai dari index terakhir, turun sampai 0

```js
for (let i = str.length - 1; i >= 0; i--) {
  // ...
}
```

Kenapa `str.length - 1`? Karena index array/string dimulai dari `0`. Jadi string `"hello"` (panjang 5) punya index `0` sampai `4`. Index terakhirnya adalah `4`, bukan `5`.

**Step 3**: Di tiap iterasi, **tambahkan** karakter ke `reversed`

```js
reversed += str[i];  // ✅ Append (tambah ke belakang)
// BUKAN:
reversed = str[i];   // ❌ Replace (ganti, hasilnya cuma 1 huruf!)
```

> ⚠️ Pastikan pakai `+=` bukan `=`. Kalau pakai `=`, variabel `reversed` akan terus *diganti* di setiap iterasi, bukan ditambahi — sehingga hasilnya hanya huruf terakhir yang diproses.

### Kode lengkap

```js
function reverseString(str) {
  let reversed = '';

  for (let i = str.length - 1; i >= 0; i--) {
    reversed += str[i];
  }

  return reversed;
}
```

### Visualisasi perjalanan loop untuk `"hello"`

| Iterasi | `i` | `str[i]` | `reversed` setelah iterasi |
|---------|-----|----------|---------------------------|
| 1       | 4   | `'o'`    | `'o'`                     |
| 2       | 3   | `'l'`    | `'ol'`                    |
| 3       | 2   | `'l'`    | `'oll'`                   |
| 4       | 1   | `'e'`    | `'olle'`                  |
| 5       | 0   | `'h'`    | `'olleh'`                 |

---

<a name="testing"></a>
## ✅ Testing

File test menggunakan **Jest**. Jalankan dengan:

```bash
npm test
```

### Isi test

```js
const reverseString = require('./reverse-string');

test('Reversing a string', () => {
  expect(reverseString('Hello')).toBe('olleH');
  expect(reverseString('JavaScript')).toBe('tpircSavaJ');
  expect(reverseString('12345')).toBe('54321');
});
```

### File run (untuk coba manual)

```js
// reverse-string-run.js
const reverseString = require('./reverse-string');

const result = reverseString('hello world');
console.log(result); // → "dlrow olleh"
```

Jalankan dengan:
```bash
node reverse-string-run.js
```

---

<a name="kesimpulan"></a>
## 📝 Kesimpulan

| | Solusi 1 (Methods) | Solusi 2 (For Loop) |
|---|---|---|
| **Panjang kode** | Pendek | Lebih panjang |
| **Mudah dibaca** | ✅ Ya | ✅ Ya |
| **Tampilkan logika** | ❌ Kurang | ✅ Ya |
| **Direkomendasikan saat interview** | Boleh, tapi... | ⭐ Lebih baik ini |

> 💡 **Tips interview:** Kalau ditanya soal ini, gunakan **Solusi 2 (for loop)**. Ini menunjukkan kamu paham logika iterasi, bukan sekadar hafal method bawaan.

---

> 🚀 **Selanjutnya:** Palindromes — cek apakah sebuah string sama kalau dibaca dari depan maupun belakang.