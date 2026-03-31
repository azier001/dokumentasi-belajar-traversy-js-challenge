# 🔄 Permutations — Catatan Belajar Pribadi

> _Dokumentasi ini dibuat berdasarkan video tutorial tentang rekursi dan permutasi string._

---

## 📋 Daftar Isi

- 🎯 [Apa itu Permutations?](#apa-itu-permutations)
- 🧠 [Strategi Penyelesaian](#strategi-penyelesaian)
- 🏗️ [Membangun Fungsinya Step by Step](#membangun-fungsinya)
- 🔁 [Cara Rekursi Bekerja di Sini](#cara-rekursi-bekerja)
- 💻 [Kode Lengkap](#kode-lengkap)
- ⚡ [Kode Alternatif](#kode-alternatif)
- ✅ [Test Cases](#test-cases)

---

<a name="apa-itu-permutations"></a>
## 🎯 Apa itu Permutations?

**Permutations** adalah semua kemungkinan susunan karakter dari sebuah string.

Misalnya, kalau kita punya string `"abc"`, maka semua permutasinya adalah:

```
abc, acb, bac, bca, cab, cba
```

> 💡 Intinya: **urutan karakter yang berbeda-beda, tapi semua karakter tetap dipakai.**

### ⚠️ Constraints (Batasan)

- Input hanya mengandung **huruf kecil**
- Input **tidak mengandung karakter duplikat**

---

<a name="strategi-penyelesaian"></a>
## 🧠 Strategi Penyelesaian

Cara kita menyelesaikan ini adalah dengan **rekursi** — fungsi yang memanggil dirinya sendiri.

Polanya seperti ini:

1. Ambil **satu karakter** dari string (misalnya `a`)
2. Cari semua permutasi dari **sisa string** (`bc`) → ini dilakukan secara rekursif
3. **Gabungkan** karakter tadi ke depan setiap permutasi yang didapat
4. Ulangi langkah 1–3 untuk setiap karakter

Ilustrasi untuk `"abc"`:

```
Ambil "a" → permutasi dari "bc" = [bc, cb] → hasil: [abc, acb]
Ambil "b" → permutasi dari "ac" = [ac, ca] → hasil: [bac, bca]
Ambil "c" → permutasi dari "ab" = [ab, ba] → hasil: [cab, cba]
```

---

<a name="membangun-fungsinya"></a>
## 🏗️ Membangun Fungsinya Step by Step

### Langkah 1 — Siapkan array penampung hasil

```js
const result = [];
```

Array ini akan menampung semua permutasi yang kita temukan.

---

### Langkah 2 — Buat base case (kondisi berhenti rekursi)

```js
if (str.length === 0) {
  result.push('');
  return result;
}
```

> 🛑 **Base case** adalah kondisi di mana rekursi berhenti. Kalau string sudah kosong, berarti tidak ada lagi karakter yang perlu dipermutasi — kita return array berisi string kosong `['']`.

Tanpa base case, rekursi akan jalan terus selamanya (infinite loop).

---

### Langkah 3 — Loop melalui setiap karakter

```js
for (let i = 0; i < str.length; i++) {
  const firstChar = str[i];
  const restOfString = str.slice(0, i) + str.slice(i + 1);
  ...
}
```

Di setiap iterasi:
- `firstChar` → karakter yang sedang kita proses sekarang
- `restOfString` → semua karakter **kecuali** karakter yang sedang diproses

Contoh saat `i = 0` dan `str = "abc"`:
- `firstChar` = `"a"`
- `restOfString` = `"" + "bc"` = `"bc"`

---

### Langkah 4 — Rekursi untuk sub-permutasi

```js
const subPermutations = permutations(restOfString);
```

Di sini kita **memanggil fungsi yang sama** tapi dengan string yang lebih pendek (`restOfString`). Ini yang disebut rekursi.

Fungsi akan terus terpanggil dengan string yang makin pendek, sampai akhirnya string kosong (base case) tercapai.

---

### Langkah 5 — Gabungkan karakter + sub-permutasi

```js
for (let j = 0; j < subPermutations.length; j++) {
  result.push(firstChar + subPermutations[j]);
}
```

Loop kedua ini menggabungkan `firstChar` ke depan setiap sub-permutasi yang sudah didapat.

Contoh:
- `firstChar` = `"a"`
- `subPermutations` = `["bc", "cb"]`
- Hasil yang di-push: `"abc"`, `"acb"`

---

### Langkah 6 — Return hasilnya

```js
return result;
```

Setelah semua karakter diproses, kembalikan array `result` yang sudah berisi semua permutasi.

---

<a name="cara-rekursi-bekerja"></a>
## 🔁 Cara Rekursi Bekerja di Sini

Mungkin agak bikin kepala muter 😅 — ini memang salah satu soal **paling sulit** di bagian rekursi. Coba bayangkan prosesnya seperti ini:

```
permutations("abc")
├── firstChar = "a", restOfString = "bc"
│   └── permutations("bc")
│       ├── firstChar = "b", restOfString = "c"
│       │   └── permutations("c")
│       │       ├── firstChar = "c", restOfString = ""
│       │       │   └── permutations("") → return [""]
│       │       └── result: ["c"]
│       │   → push "b" + "c" = "bc"
│       ├── firstChar = "c", restOfString = "b"
│       │   └── permutations("b") → return ["b"]
│       │   → push "c" + "b" = "cb"
│       └── result: ["bc", "cb"]
│   → push "a" + "bc" = "abc", "a" + "cb" = "acb"
├── firstChar = "b", restOfString = "ac"
│   └── permutations("ac") → ["ac", "ca"]
│   → push "bac", "bca"
└── firstChar = "c", restOfString = "ab"
    └── permutations("ab") → ["ab", "ba"]
    → push "cab", "cba"

Final result: ["abc", "acb", "bac", "bca", "cab", "cba"]
```

---

<a name="kode-lengkap"></a>
## 💻 Kode Lengkap

```js
function permutations(str) {
  // Tempat menyimpan semua permutasi
  const result = [];

  // Base case: kalau string kosong, kembalikan ['']
  if (str.length === 0) {
    result.push('');
    return result;
  }

  // Loop setiap karakter dalam string
  for (let i = 0; i < str.length; i++) {
    // Ambil karakter saat ini
    const firstChar = str[i];

    // Buat string sisanya (tanpa karakter saat ini)
    const restOfString = str.slice(0, i) + str.slice(i + 1);

    // Rekursi: cari permutasi dari sisa string
    const subPermutations = permutations(restOfString);

    // Gabungkan firstChar dengan setiap sub-permutasi
    for (let j = 0; j < subPermutations.length; j++) {
      result.push(firstChar + subPermutations[j]);
    }
  }

  return result;
}

module.exports = permutations;
```

---

<a name="kode-alternatif"></a>
## ⚡ Kode Alternatif

Versi yang lebih ringkas menggunakan **arrow function** dan method `.map()` + `.concat()`:

```js
const permutations = (str) => {
  // Base case: string 1 karakter atau kosong, langsung return
  if (str.length <= 1) return [str]

  let result = []

  for (let i = 0; i < str.length; i++) {
    // Sisa karakter selain index i
    const remainingChars = str.slice(0, i) + str.slice(i + 1)

    // Rekursi pada sisa karakter
    const recursiveResult = permutations(remainingChars)

    // Tambahkan karakter saat ini ke depan setiap permutasi
    const mappedResult = recursiveResult.map(perm => str[i] + perm)

    // Gabungkan ke result
    result = result.concat(mappedResult)
  }

  return result
}
```

### 🔍 Perbedaan vs Kode Utama

| | Kode Utama | Kode Alternatif |
|---|---|---|
| **Gaya penulisan** | `function` declaration | Arrow function `=>` |
| **Base case** | `str.length === 0` → return `['']` | `str.length <= 1` → return `[str]` |
| **Gabung hasil** | `for` loop + `result.push()` | `.map()` + `result.concat()` |
| **Semicolon** | Pakai `;` | Tanpa `;` |

### 💡 Catatan Penting

**Base case-nya berbeda**, tapi tetap benar:
- Kode utama berhenti saat string **kosong** (`length === 0`), lalu return `['']`
- Kode alternatif berhenti saat string **1 karakter atau kosong** (`length <= 1`), lalu return `[str]` langsung

Keduanya menghasilkan output yang **sama persis** karena logika rekursinya identik.

**`.map()` vs `for` loop:**
- `.map()` di kode alternatif lebih ringkas — intinya sama: gabungkan karakter saat ini ke depan setiap sub-permutasi
- `for` loop di kode utama lebih eksplisit dan mudah dibaca pemula

---

<a name="test-cases"></a>
## ✅ Test Cases

```js
test('Permutations', () => {
  // Test dengan "abc" → 6 permutasi
  expect(permutations('abc')).toEqual([
    'abc', 'acb',
    'bac', 'bca',
    'cab', 'cba',
  ]);

  // Test dengan "dog" → 6 permutasi
  expect(permutations('dog')).toEqual([
    'dog', 'dgo',
    'odg', 'ogd',
    'gdo', 'god',
  ]);

  // Test dengan string kosong → ['']
  expect(permutations('')).toEqual(['']);
});
```

> 🎉 Semua test passed! Rekursi bekerja dengan benar untuk semua kasus.

---

> 📌 **Catatan akhir:** Rekursi memang tricky di awal, tapi kuncinya adalah percaya bahwa fungsi akan berjalan dengan benar untuk versi yang lebih kecil dari masalah. Fokus dulu ke base case, lalu pikir bagaimana satu langkah rekursi bekerja — sisanya akan mengikuti!