# 🔄 Reverse String dengan Rekursi

> 📝 *Dokumentasi pribadi — Catatan belajar dari video tutorial JavaScript Recursion*

---

## 📚 Daftar Isi

- 🔍 [Rekursi — Kilasan Singkat](#rekursi-kilasan-singkat)
- 🎯 [Framework: 3 Pertanyaan Inti Rekursi](#framework-3-pertanyaan-inti-rekursi)
- 🔬 [Method Penting Sebelum Masuk Kode](#method-penting-sebelum-masuk-kode)
- 📄 [Versi Awal — Kupas dari Depan](#versi-awal-kupas-dari-depan)
- 📄 [Kode 1 — Kupas dari Belakang](#kode-1-kupas-dari-belakang)
- 📄 [Kode 2 — Geser Index](#kode-2-geser-index)
- 📄 [Kode 3 — Helper Function & Defensive Programming](#kode-3-helper-function-defensive-programming)
- 📊 [Peta Perbandingan — 4 Versi](#peta-perbandingan-4-versi)
- ✅ [Test Cases](#test-cases)

---

<a id="rekursi-kilasan-singkat"></a>
## 🔍 Rekursi — Kilasan Singkat

Rekursi adalah sebuah **fungsi yang memanggil dirinya sendiri** sampai kondisi tertentu terpenuhi (*base case*).

Proses rekursi ada dua fase:
1. **Menyelam ke bawah** — fungsi terus memanggil dirinya sendiri
2. **Naik kembali (unwind)** — setelah base case tercapai, nilai-nilai dikembalikan dalam **urutan terbalik**

> 💡 **Kunci penting:** Saat *unwind*, nilai dikembalikan dalam urutan yang berlawanan dari urutan pemanggilan. Inilah yang kita manfaatkan untuk membalik string!

---

<a id="framework-3-pertanyaan-inti-rekursi"></a>
## 🎯 Framework: 3 Pertanyaan Inti Rekursi

Sebelum membaca kode rekursi apapun, tanya 3 pertanyaan ini:

| Pertanyaan | Artinya |
|---|---|
| **Mulai dari mana?** | Di mana titik awal fungsi bekerja? |
| **Bergerak ke mana?** | Ke arah mana setiap rekursi bergerak? |
| **Berhenti kapan?** | Apa kondisi yang menghentikan rekursi? *(base case)* |

> 💡 Kalau kamu bisa jawab 3 pertanyaan ini untuk sembarang fungsi rekursi — kamu sudah **benar-benar paham** fungsi tersebut.

---

<a id="method-penting-sebelum-masuk-kode"></a>
## 🔬 Method Penting Sebelum Masuk Kode

### `substr` vs `slice`

Keduanya bisa "mengupas" string, tapi caranya berbeda:

```javascript
// substr — skip N karakter dari depan
'hello'.substr(1)      // → 'ello'  (skip index 0)
'hello'.substr(2)      // → 'llo'   (skip index 0 dan 1)

// slice — potong dari posisi tertentu
'hello'.slice(-1)      // → 'o'     (1 karakter dari belakang)
'hello'.slice(0, -1)   // → 'hell'  (semua kecuali karakter terakhir)
```

| Method | Kupas dari | Contoh | Hasil |
|---|---|---|---|
| `substr(1)` | Depan | `'hello'.substr(1)` | `'ello'` |
| `slice(0, -1)` | Belakang | `'hello'.slice(0,-1)` | `'hell'` |
| `slice(-1)` | Ambil terakhir | `'hello'.slice(-1)` | `'o'` |
| `charAt(0)` | Ambil pertama | `'hello'.charAt(0)` | `'h'` |
| `str[index]` | Ambil per index | `'hello'[4]` | `'o'` |

> 💡 `substr` dipakai di versi awal. `slice` dipakai di Kode 1. Keduanya menghasilkan pembalikan yang sama, hanya arah kupasnnya berbeda.

### Index Negatif di JavaScript

Index negatif menghitung dari belakang string:

```
 h   e   l   l   o
 0   1   2   3   4    ← index normal
-5  -4  -3  -2  -1   ← index negatif
```

Jadi `slice(-1)` selalu menunjuk karakter paling ujung kanan.

---

<a id="versi-awal-kupas-dari-depan"></a>
## 📄 Versi Awal — Kupas dari Depan

```javascript
function reverseString(str) {
  if (str === '') {
    return '';
  } else {
    return reverseString(str.substr(1)) + str.charAt(0);
  }
}
```

### Cara Kerjanya

- **Base case:** kalau `str === ''`, langsung return `''`
- **Recursive case:** potong karakter pertama (`substr(1)`), tempel di bagian **AKHIR** setelah unwind

### Visualisasi `'hello'`

```
⬇️ Fase Turun:
reverseString('hello')
  └─ reverseString('ello') + 'h'
       └─ reverseString('llo') + 'e'
            └─ reverseString('lo') + 'l'
                 └─ reverseString('o') + 'l'
                      └─ reverseString('') + 'o'
                           └─ return ''  ← 🛑 BASE CASE

⬆️ Fase Naik:
''           ← base case
'' + 'o'   → 'o'
'o' + 'l'  → 'ol'
'ol' + 'l' → 'oll'
'oll' + 'e'→ 'olle'
'olle' + 'h'→ 'olleh' ✅
```

### 3 Pertanyaan Inti

| Pertanyaan | Jawaban |
|---|---|
| **Mulai dari mana?** | Karakter paling depan (`charAt(0)`) |
| **Bergerak ke mana?** | Ke kanan, potong 1 karakter depan per langkah (`substr(1)`) |
| **Berhenti kapan?** | Saat `str === ''` (string kosong) |

---

<a id="kode-1-kupas-dari-belakang"></a>
## 📄 Kode 1 — Kupas dari Belakang

```javascript
const reverseString = (str) => {
  if (!str) return ''
  return str.slice(-1) + reverseString(str.slice(0, -1))
}
```

### Yang Beda dari Versi Awal

| | Versi Awal | Kode 1 |
|---|---|---|
| **Kupas dari** | Depan (`charAt(0)`) | Belakang (`slice(-1)`) |
| **Taruh karakter di** | Belakang `+ char` | Depan `char +` |
| **Sisa string** | `substr(1)` | `slice(0, -1)` |
| **Base case** | `str === ''` | `!str` *(falsy check)* |

`!str` bernilai `true` untuk string kosong `''` karena string kosong dianggap **falsy** di JavaScript — lebih singkat dari `str === ''`.

### Visualisasi `'hello'`

```
⬇️ Fase Turun:
reverseString('hello')
  └─ 'o' + reverseString('hell')
              └─ 'l' + reverseString('hel')
                          └─ 'l' + reverseString('he')
                                      └─ 'e' + reverseString('h')
                                                  └─ 'h' + reverseString('')
                                                               └─ return ''  ← 🛑 BASE CASE

⬆️ Fase Naik:
''            ← base case
'h' + ''    → 'h'
'e' + 'h'   → 'eh'
'l' + 'eh'  → 'leh'
'l' + 'leh' → 'lleh'
'o' + 'lleh'→ 'olleh' ✅
```

### 3 Pertanyaan Inti

| Pertanyaan | Jawaban |
|---|---|
| **Mulai dari mana?** | Karakter paling belakang (`slice(-1)`) |
| **Bergerak ke mana?** | Ke kiri, buang 1 karakter belakang per langkah (`slice(0,-1)`) |
| **Berhenti kapan?** | Saat `!str` (string kosong / falsy) |

---

<a id="kode-2-geser-index"></a>
## 📄 Kode 2 — Geser Index

```javascript
const reverseString = (str, index = str.length - 1) => {
  if (index < 0) return ''
  return str[index] + reverseString(str, index - 1)
}
```

### Perbedaan Utama

**Kode sebelumnya** — string dipotong-potong setiap rekursi:
```
'hello' → 'hell' → 'hel' → 'he' → 'h' → ''   (string berubah terus)
```

**Kode 2** — string tidak pernah berubah, yang bergerak hanya indexnya:
```
'hello' → 'hello' → 'hello' → ...   (string tetap sama!)
index=4   index=3   index=2   ...
```

### Default Parameter

Karena ada default parameter, user cukup panggil dengan satu argumen:

```javascript
reverseString('hello')
// otomatis sama dengan:
reverseString('hello', 4)  // karena 'hello'.length - 1 = 4
```

### Visualisasi `'hello'`

```
⬇️ Fase Turun:
reverseString('hello', 4)
  └─ 'o' + reverseString('hello', 3)
              └─ 'l' + reverseString('hello', 2)
                          └─ 'l' + reverseString('hello', 1)
                                      └─ 'e' + reverseString('hello', 0)
                                                  └─ 'h' + reverseString('hello', -1)
                                                               └─ return ''  ← 🛑 BASE CASE

⬆️ Fase Naik:
''            ← base case
'h' + ''    → 'h'
'e' + 'h'   → 'eh'
'l' + 'eh'  → 'leh'
'l' + 'leh' → 'lleh'
'o' + 'lleh'→ 'olleh' ✅
```

### 3 Pertanyaan Inti

| Pertanyaan | Jawaban |
|---|---|
| **Mulai dari mana?** | Index paling kanan (`str.length - 1`) via default parameter |
| **Bergerak ke mana?** | Ke kiri, `index - 1` setiap langkah |
| **Berhenti kapan?** | Saat `index < 0` (sudah melewati batas kiri) |

> 💡 **Kode 2 paling mirip cara pikir manusia** — kamu tidak memotong kertasnya, kamu hanya menggeser jari dari kanan ke kiri membaca satu per satu.

---

<a id="kode-3-helper-function-defensive-programming"></a>
## 📄 Kode 3 — Helper Function & Defensive Programming

```javascript
const reverseString = (str) => {
  if (typeof str !== 'string') return ''

  const helper = (index) => {
    if (index < 0) return ''
    return str[index] + helper(index - 1)
  }
  
  return helper(str.length - 1)
}
```

### Dua Konsep Baru

#### 1. Defensive Programming (Guard Clause)

```javascript
if (typeof str !== 'string') return ''
```

Validasi input **sebelum** rekursi dimulai. Kalau user salah kirim tipe data, fungsi tidak crash:

```javascript
reverseString(123)     // → '' (tidak crash!)
reverseString(null)    // → '' (tidak crash!)
reverseString(true)    // → '' (tidak crash!)
reverseString('hello') // → 'olleh' ✅
```

#### 2. Closure — Helper Function

`helper` adalah fungsi di dalam fungsi. Dia bisa akses `str` dari luar tanpa perlu menerimanya sebagai parameter:

```javascript
const reverseString = (str) => {
  //  str = 'hello'  ← ada di sini
  //          ↑
  const helper = (index) => {
    return str[index]  // helper 'lihat ke atas' dan temukan str ✅
  }
}
```

Ini disebut **closure** — sebuah fungsi yang "mengingat" variabel dari scope di luar dirinya.

### Keuntungan: Interface Bersih

| | Kode 2 | Kode 3 |
|---|---|---|
| **Cara panggil** | `reverseString(str, index)` | `reverseString(str)` |
| **User perlu tahu index?** | Bisa tidak sengaja dioper | Tidak perlu, tersembunyi |
| **Validasi input** | Tidak ada | Ada (`typeof` check) |

### Visualisasi `'hello'`

```
reverseString('hello')
  └─ typeof 'hello' === 'string' ✅
  └─ helper(4)
       └─ 'o' + helper(3)
                  └─ 'l' + helper(2)
                              └─ 'l' + helper(1)
                                          └─ 'e' + helper(0)
                                                      └─ 'h' + helper(-1)
                                                                   └─ ''  ← 🛑 BASE CASE
→ 'olleh' ✅
```

### 3 Pertanyaan Inti

| Pertanyaan | Jawaban |
|---|---|
| **Mulai dari mana?** | Index paling kanan (`str.length - 1`), dioper ke `helper` |
| **Bergerak ke mana?** | Ke kiri, `index - 1` setiap langkah |
| **Berhenti kapan?** | Saat `index < 0` |

> 💡 Kode 3 menggabungkan 3 konsep sekaligus: **defensive programming**, **clean interface**, dan **closure**. Pola ini sangat umum dipakai di dunia nyata.

---

<a id="peta-perbandingan-4-versi"></a>
## 📊 Peta Perbandingan — 4 Versi

### Strategi

| Versi | Strategi | Arah Kupas | Yang Bergerak |
|---|---|---|---|
| Versi Awal | Kupas dari depan | → Kanan | String (mengecil) |
| Kode 1 | Kupas dari belakang | ← Kiri | String (mengecil) |
| Kode 2 | Geser index | ← Kiri | Index (string tetap) |
| Kode 3 | Helper + validasi | ← Kiri | Index (string tetap) |

### Fitur

| Fitur | Versi Awal | Kode 1 | Kode 2 | Kode 3 |
|---|---|---|---|---|
| **String berubah?** | ✅ Ya | ✅ Ya | ❌ Tidak | ❌ Tidak |
| **Validasi input** | ❌ | ❌ | ❌ | ✅ |
| **Helper function** | ❌ | ❌ | ❌ | ✅ |
| **Closure** | ❌ | ❌ | ❌ | ✅ |
| **Base case** | `str === ''` | `!str` | `index < 0` | `index < 0` |
| **Method** | `substr` + `charAt` | `slice` | `str[index]` | `str[index]` |

### Kapan Pakai yang Mana?

| Situasi | Rekomendasi |
|---|---|
| Belajar rekursi pertama kali | Versi Awal — paling mudah dibayangkan |
| Input bisa tipe data apapun | Kode 3 — ada validasi `typeof` |
| Performa (string panjang) | Kode 2 atau 3 — string tidak dipotong-potong |
| Mau kode sependek mungkin | Kode 1 — paling ringkas |
| Untuk production / tim | Kode 3 — paling matang dan defensif |

---

<a id="test-cases"></a>
## ✅ Test Cases

File test menggunakan Jest:

```javascript
// reverse-string-recursion.test.js

const reverseString = require('./reverse-string-recursion');

test('Reversing a string', () => {
  expect(reverseString('hello')).toBe('olleh');           // ✅
  expect(reverseString('Hello')).toBe('olleH');           // ✅
  expect(reverseString('JavaScript')).toBe('tpircSavaJ'); // ✅
  expect(reverseString('12345')).toBe('54321');           // ✅
  expect(reverseString('')).toBe('');                     // ✅
  expect(reverseString('racecar')).toBe('racecar');       // ✅ palindrome
});

// Khusus Kode 3 (validasi input):
test('Invalid input returns empty string', () => {
  expect(reverseString(123)).toBe('');    // ✅
  expect(reverseString(null)).toBe('');   // ✅
  expect(reverseString(true)).toBe('');  // ✅
});
```

Jalankan test dengan:
```bash
npm test
```

---

> 🚀 **Selanjutnya:** Fibonacci Sequence — juga diselesaikan dengan rekursi!
