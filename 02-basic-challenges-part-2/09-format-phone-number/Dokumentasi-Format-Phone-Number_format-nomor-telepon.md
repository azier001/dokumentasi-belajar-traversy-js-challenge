# 📞 Format Phone Number — Dokumentasi Pribadi

## 📋 Daftar Isi

- 🔍 [Pengenalan](#pengenalan)
- 🎯 [Tujuan Fungsi](#tujuan-fungsi)
- 🧩 [Konsep yang Dipakai](#konsep-yang-dipakai)
- 🏗️ [Solusi 1 — Slice per Bagian](#solusi-1)
- 🔡 [Solusi 2 — Join Semua, Lalu Substring](#solusi-2)
- ⚡ [Solusi 3 — Arrow Function Satu Baris](#solusi-3)
- 🧪 [Test Cases](#test-cases)
- 💡 [Mana yang Lebih Baik?](#mana-yang-lebih-baik)

---

<a name="pengenalan"></a>
## 🔍 Pengenalan

Challenge ini meminta kita membuat fungsi bernama `formatPhoneNumber`. Fungsinya sederhana: **terima array angka, kembalikan string nomor telepon yang sudah diformat**.

Contoh hasilnya seperti ini:

```
(123) 456-7890
```

---

<a name="tujuan-fungsi"></a>
## 🎯 Tujuan Fungsi

### Signature Fungsi

```js
/**
 * Mengubah array angka menjadi string nomor telepon terformat.
 * @param {number[]} numbers - Array berisi 10 angka (0–9)
 * @returns {string} - Nomor telepon dalam format (XXX) XXX-XXXX
 */
function formatPhoneNumber(numbers) { ... }
```

### Constraints (Batasan)

- ✅ Input **selalu** berisi tepat **10 angka**
- ✅ Setiap angka adalah integer antara **0 sampai 9**
- ✅ Format output mengikuti standar nomor telepon Amerika: `(XXX) XXX-XXXX`

### Contoh Input & Output

| Input | Output |
|---|---|
| `[1,2,3,4,5,6,7,8,9,0]` | `(123) 456-7890` |
| `[5,0,2,4,8,1,9,6,3,7]` | `(502) 481-9637` |
| `[9,9,9,9,9,9,9,9,9,9]` | `(999) 999-9999` |

---

<a name="konsep-yang-dipakai"></a>
## 🧩 Konsep yang Dipakai

Ada dua method array/string yang jadi kunci di challenge ini:

### `Array.slice(start, end)`
Mengambil **sebagian elemen** dari array, tanpa mengubah array aslinya.

```js
const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

nums.slice(0, 3);  // [1, 2, 3]   → 3 angka pertama
nums.slice(3, 6);  // [4, 5, 6]   → angka ke-4 sampai ke-6
nums.slice(6);     // [7, 8, 9, 0] → dari index 6 sampai habis
```

> 💡 Kalau `end` tidak ditulis, slice akan jalan sampai elemen terakhir.

---

### `Array.join(separator)`
Menggabungkan semua elemen array menjadi **satu string**.

```js
[1, 2, 3].join('');   // "123"  → tanpa pemisah
[1, 2, 3].join('-');  // "1-2-3"
```

> 💡 Kita pakai `join('')` (string kosong) supaya angkanya nyambung tanpa spasi atau karakter lain.

---

<a name="solusi-1"></a>
## 🏗️ Solusi 1 — Slice per Bagian

Cara paling jelas dan mudah dibaca. Kita **potong array jadi tiga bagian**, simpan di variabel masing-masing, lalu gabungkan pakai template literal.

```js
function formatPhoneNumber(numbers) {
  // Ambil 3 angka pertama → area code
  const areaCode = numbers.slice(0, 3).join('');

  // Ambil 3 angka berikutnya (index 3–5) → prefix
  const prefix = numbers.slice(3, 6).join('');

  // Ambil 4 angka terakhir (index 6 sampai akhir) → line number
  const lineNumber = numbers.slice(6).join('');

  // Gabungkan semuanya dalam format yang benar
  return `(${areaCode}) ${prefix}-${lineNumber}`;
}
```

### Penjelasan Langkah demi Langkah

1. **`areaCode`** → `slice(0, 3)` mengambil index 0, 1, 2 → lalu `.join('')` mengubahnya jadi string `"123"`
2. **`prefix`** → `slice(3, 6)` mengambil index 3, 4, 5 → jadi `"456"`
3. **`lineNumber`** → `slice(6)` mengambil index 6 sampai akhir → jadi `"7890"`
4. **Template literal** → menyusun ketiganya dengan tanda kurung, spasi, dan strip sesuai format

---

<a name="solusi-2"></a>
## 🔡 Solusi 2 — Join Semua, Lalu Substring

Pendekatan berbeda: **ubah seluruh array jadi satu string panjang dulu**, baru potong-potong pakai `substring`.

```js
function formatPhoneNumber(numbers) {
  // Gabungkan semua angka jadi satu string panjang
  const formatted = numbers.join('');
  // formatted = "1234567890"

  return `(${formatted.substring(0, 3)}) ${formatted.substring(3, 6)}-${formatted.substring(6)}`;
}
```

### Apa itu `substring(start, end)`?

Mirip seperti `slice`, tapi untuk **string** (bukan array). Mengambil karakter dari posisi `start` sampai sebelum `end`.

```js
"1234567890".substring(0, 3);  // "123"
"1234567890".substring(3, 6);  // "456"
"1234567890".substring(6);     // "7890"
```

### Perbedaan dari Solusi 1

| | Solusi 1 | Solusi 2 |
|---|---|---|
| Cara kerja | Slice array → join per bagian | Join semua → substring string |
| Variabel | 3 variabel terpisah | 1 variabel `formatted` |
| Method | `Array.slice` + `Array.join` | `Array.join` + `String.substring` |

---

<a name="solusi-3"></a>
## ⚡ Solusi 3 — Arrow Function Satu Baris

Versi **paling ringkas** — semua proses dilakukan langsung di dalam template literal menggunakan arrow function dengan implicit return.

```js
const formatPhoneNumber = (numbers) =>
  `(${numbers.slice(0, 3).join('')}) ${numbers.slice(3, 6).join('')}-${numbers.slice(6).join('')}`;
```

### Apa itu Implicit Return?

Arrow function **tanpa kurung kurawal `{}`** otomatis me-return ekspresi yang ada. Jadi tidak perlu menulis `return` secara eksplisit.

```js
// Eksplisit return (biasa)
const tambah = (a, b) => {
  return a + b;
};

// Implicit return (ringkas)
const tambah = (a, b) => a + b;
```

### Logikanya Sama Persis dengan Solusi 1

Bedanya hanya di gaya penulisan — slice dan join dilakukan **langsung di dalam template literal**, bukan disimpan ke variabel dulu.

---

<a name="test-cases"></a>
## 🧪 Test Cases

```js
test('Format Phone Number', () => {
  expect(formatPhoneNumber([1, 2, 3, 4, 5, 6, 7, 8, 9, 0])).toBe('(123) 456-7890');
  expect(formatPhoneNumber([5, 0, 2, 4, 8, 1, 9, 6, 3, 7])).toBe('(502) 481-9637');
  expect(formatPhoneNumber([9, 9, 9, 9, 9, 9, 9, 9, 9, 9])).toBe('(999) 999-9999');
});
```

Ketiga solusi di atas **lulus semua 3 test case** ini. ✅

---

<a name="mana-yang-lebih-baik"></a>
## 💡 Mana yang Lebih Baik?

Dari ketiga solusi, **Solusi 1 adalah yang paling direkomendasikan untuk pemula** karena:

- 👀 Paling **mudah dibaca** — setiap bagian punya nama variabel yang jelas (`areaCode`, `prefix`, `lineNumber`)
- 🐛 Paling **mudah di-debug** — bisa cek tiap variabel satu per satu
- 📖 Paling **ekspresif** — kode menjelaskan dirinya sendiri

Solusi 3 memang paling pendek, tapi ketika kode sudah sepanjang itu di dalam satu baris, justru jadi lebih susah dibaca. Arrow function dengan chaining panjang lebih cocok untuk ekspresi yang benar-benar singkat.

> 🗣️ **Takeaway:** *Kode yang bagus bukan yang paling pendek, tapi yang paling mudah dipahami oleh orang lain (atau dirimu sendiri 3 bulan kemudian).*