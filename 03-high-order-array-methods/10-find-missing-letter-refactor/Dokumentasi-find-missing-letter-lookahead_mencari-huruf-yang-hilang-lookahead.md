# 🔤 Find Missing Letter — Lookahead Pattern

> **Catatan pribadi:** Ini adalah versi alternatif dari challenge Find Missing Letter. Kalau di versi sebelumnya kita selalu "lihat ke belakang" (bandingkan dengan huruf sebelumnya), di sini kita pakai pendekatan **lookahead** — lihat ke depan untuk cek huruf berikutnya. Kedua solusi di dokumentasi ini punya benang merah yang sama: lookahead + optional chaining (`?.`).

---

## 📋 Daftar Isi

- 🎯 [Problem Statement](#problem-statement)
- 🧠 [Konsep Kunci](#konsep-kunci)
- 🔍 [Solusi 1 — `find`](#solusi-1--find)
- ♻️ [Solusi 2 — `reduce`](#solusi-2--reduce)
- ⚖️ [Perbandingan Kedua Solusi](#perbandingan-kedua-solusi)
- ✅ [Test Cases](#test-cases)

---

<a name="problem-statement"></a>
## 🎯 Problem Statement

Kita punya array berisi huruf-huruf yang berurutan, tapi **ada satu huruf yang hilang**. Tugas kita: temukan huruf yang hilang itu.

```js
findMissingLetter(['a', 'b', 'c', 'd', 'f']); // => "e"
findMissingLetter(['O', 'Q', 'R', 'S']);       // => "P"
findMissingLetter(['t', 'u', 'v', 'w', 'x', 'z']); // => "y"
```

**Aturannya:**
- Array selalu berisi minimal 2 huruf
- Semua huruf dalam satu array pasti satu case (semua kecil, atau semua besar)
- ⛔ **Dilarang pakai `for` loop** — harus pakai higher-order array methods

---

<a name="konsep-kunci"></a>
## 🧠 Konsep Kunci

### 1. Character Code

Setiap karakter punya **nomor unik** yang disebut character code. Huruf-huruf alfabet punya nomor yang berurutan:

```
a → 97
b → 98
c → 99
d → 100
e → 101
... dan seterusnya
```

Karena urutannya selalu +1, kalau ada yang "lompat" lebih dari 1, berarti ada huruf yang hilang di sana.

**Dua method penting:**

```js
// Ambil character code dari sebuah huruf
'a'.charCodeAt(0); // => 97
'e'.charCodeAt(0); // => 101

// Kebalikannya: ubah character code jadi huruf
String.fromCharCode(97);  // => "a"
String.fromCharCode(101); // => "e"
```

**Visualisasi:**

```
Huruf :  a    b    c    [?]   e
Code  :  97   98   99   100   101
                        ↑
                    yang hilang!
                    selisih c→e = 2, harusnya 1
```

---

### 2. Lookahead Pattern

Di dokumentasi ini, kita pakai pendekatan **lookahead** — artinya saat kita berada di huruf ke-`i`, kita "intip" huruf berikutnya (`arr[i + 1]`) untuk cek apakah ada lompatan.

**Analogi:** Bayangkan kamu lagi ngecek nomor antrian. Kamu pegang nomor 5, lalu lihat nomor berikutnya — kalau langsung 7, berarti nomor 6 tidak ada!

```js
// Saat di huruf 'c' (index 2), kita lihat ke depan:
const current = 'c'.charCodeAt(0); // => 99
const next    = 'e'.charCodeAt(0); // => 101

next - current; // => 2 (lebih dari 1, berarti ada yang hilang!)
```

---

### 3. Optional Chaining (`?.`)

Saat kita akses `arr[i + 1]`, ada satu masalah: **bagaimana kalau `i` adalah elemen terakhir?** Tidak ada `arr[i + 1]`-nya!

Tanpa optional chaining:
```js
arr[i + 1].charCodeAt(0); // 💥 Error! arr[i+1] adalah undefined
```

Dengan optional chaining:
```js
arr[i + 1]?.charCodeAt(0); // ✅ Aman! Hasilnya undefined (bukan error)
```

Lalu `undefined - 99` = `NaN`, dan `NaN > 1` = `false`, jadi kondisi tidak terpenuhi — aman!

```
arr = ['a', 'b', 'c']
              ↑
         saat di sini (index 2, elemen terakhir):
         arr[3] tidak ada → arr[3]?.charCodeAt(0) = undefined
         undefined - 99 = NaN
         NaN > 1 = false ✅ (tidak dianggap ada lompatan)
```

---

<a name="solusi-1--find"></a>
## 🔍 Solusi 1 — `find`

### Kode

```js
const findMissingLetter = (arr) => {
  const found = arr.find((char, i) => {
    const current = char.charCodeAt(0);
    const next = arr[i + 1]?.charCodeAt(0);

    return next - current > 1;
  });

  return found ? String.fromCharCode(found.charCodeAt(0) + 1) : '';
};
```

---

### Ide Dasarnya

> Cari huruf yang "sebelum lompatan". Begitu ketemu, huruf yang hilang pasti tepat sesudahnya.

`find` menelusuri array satu per satu dan berhenti begitu menemukan elemen yang memenuhi syarat. Di sini, syaratnya adalah: **huruf sesudahnya tidak berurutan** (selisihnya lebih dari 1).

---

### Breakdown Baris per Baris

```js
const found = arr.find((char, i) => {
```
`find` menerima callback dengan dua parameter: `char` (huruf saat ini) dan `i` (index-nya). `find` akan mengembalikan elemen pertama yang membuat callback return `true`.

```js
  const current = char.charCodeAt(0);
```
Ubah huruf saat ini jadi angka (character code). Misalnya `'c'` → `99`.

```js
  const next = arr[i + 1]?.charCodeAt(0);
```
Ambil character code huruf **berikutnya**. Pakai `?.` supaya aman kalau sudah di elemen terakhir (lihat penjelasan Optional Chaining di atas).

```js
  return next - current > 1;
```
Kalau selisihnya lebih dari 1, berarti ada huruf yang hilang di antara keduanya. Return `true` untuk menghentikan `find`.

```js
return found ? String.fromCharCode(found.charCodeAt(0) + 1) : '';
```
`found` berisi huruf **sebelum** lompatan. Huruf yang hilang ada tepat sesudahnya, jadi kita tambahkan 1 pada character code-nya.

---

### Visualisasi Alur

Input: `['a', 'b', 'c', 'e']`

```
Iterasi 1 — char = 'a', i = 0
  current = 97  (a)
  next    = 98  (b)
  98 - 97 = 1  → tidak lebih dari 1, lanjut

Iterasi 2 — char = 'b', i = 1
  current = 98  (b)
  next    = 99  (c)
  99 - 98 = 1  → tidak lebih dari 1, lanjut

Iterasi 3 — char = 'c', i = 2
  current = 99  (c)
  next    = 101 (e)
  101 - 99 = 2  → lebih dari 1! ✅ return true, find berhenti

found = 'c'  ← huruf sebelum lompatan

String.fromCharCode('c'.charCodeAt(0) + 1)
= String.fromCharCode(99 + 1)
= String.fromCharCode(100)
= 'd' 🎉
```

---

### 💡 Aha! Moment

> **Kenapa ditambah 1, bukan dikurangi 1?**

Karena `found` menyimpan huruf **sebelum** lompatan (bukan sesudahnya). Huruf yang hilang ada tepat di antara `found` dan huruf berikutnya — jadi kita perlu maju satu langkah (`+1`).

```
found = 'c' (99)
           ↓
      99 + 1 = 100 = 'd'  ← yang hilang!
                    ↓
                   'e' (101) ← huruf berikutnya
```

Ini berbeda dari versi lookbehind di dokumentasi lama, di mana hasilnya dikurangi 1 karena yang tersimpan adalah huruf **setelah** lompatan.

---

<a name="solusi-2--reduce"></a>
## ♻️ Solusi 2 — `reduce`

### Kode

```js
const findMissingLetter = (arr) => {
  const result = arr.reduce((acc, char, i) => {
    if (acc) return acc;

    const current = char.charCodeAt(0);
    const next = arr[i + 1]?.charCodeAt(0);

    if (next - current > 1) {
      return current + 1;
    }

    return acc;
  }, null);

  return result ? String.fromCharCode(result) : '';
};
```

---

### Ide Dasarnya

> Telusuri seluruh array sambil "menampung" hasil. Kalau sudah ketemu lompatan, simpan character code huruf yang hilang dan skip sisa iterasi.

`reduce` biasanya dipakai untuk menggabungkan semua elemen jadi satu nilai (seperti menjumlahkan angka). Di sini kita manfaatkan itu untuk menyimpan karakter yang hilang — kalau belum ketemu, `acc` tetap `null`; kalau sudah ketemu, `acc` berisi character code yang dicari.

---

### Breakdown Baris per Baris

```js
const result = arr.reduce((acc, char, i) => {
```
`reduce` menerima callback dengan `acc` (accumulator — tempat menyimpan hasil sementara), `char` (huruf saat ini), dan `i` (index-nya). Nilai awal `acc` adalah `null`.

```js
  if (acc) return acc;
```
**Early exit pattern.** Kalau `acc` sudah berisi nilai (sudah ketemu yang hilang), langsung kembalikan `acc` tanpa melakukan apa-apa. Ini membuat iterasi sisa array jadi tidak berguna secara efektif.

> ⚠️ Catatan: `reduce` tidak bisa benar-benar berhenti di tengah jalan seperti `find`. Tapi dengan early return ini, setiap iterasi setelah ketemu hanya menjalankan satu baris `if (acc) return acc` — sangat ringan.

```js
  const current = char.charCodeAt(0);
  const next = arr[i + 1]?.charCodeAt(0);
```
Sama seperti Solusi 1 — ambil character code huruf sekarang dan huruf berikutnya.

```js
  if (next - current > 1) {
    return current + 1;
  }
```
Kalau ada lompatan, simpan character code **yang hilang** langsung ke `acc`. Berbeda dari Solusi 1 yang menyimpan huruf sebelum lompatan, di sini kita langsung hitung (`current + 1`) dan simpan hasilnya.

```js
  return acc;
}, null);
```
Kalau tidak ada lompatan, kembalikan `acc` yang masih `null`. Nilai awal `acc` adalah `null`.

```js
return result ? String.fromCharCode(result) : '';
```
`result` sudah berisi character code yang hilang (bukan hurufnya), jadi langsung `fromCharCode` tanpa perlu `+1` atau `-1` lagi.

---

### Visualisasi Alur

Input: `['a', 'b', 'c', 'e']`

```
Mulai: acc = null

Iterasi 1 — char = 'a', i = 0
  acc = null → lanjut (tidak early exit)
  current = 97, next = 98
  98 - 97 = 1 → tidak lompat
  return null

Iterasi 2 — char = 'b', i = 1
  acc = null → lanjut
  current = 98, next = 99
  99 - 98 = 1 → tidak lompat
  return null

Iterasi 3 — char = 'c', i = 2
  acc = null → lanjut
  current = 99, next = 101
  101 - 99 = 2 → lompat! ✅
  return 99 + 1 = 100

Iterasi 4 — char = 'e', i = 3
  acc = 100 → early exit! return 100 langsung

result = 100

String.fromCharCode(100) = 'd' 🎉
```

---

### 💡 Aha! Moment

> **Kenapa di Solusi 2 tidak perlu `+1` atau `-1` di akhir?**

Karena di `reduce` kita langsung menyimpan character code huruf yang hilang (`current + 1`), bukan huruf sebelum atau sesudah lompatan.

```
current = 99 (c)
next    = 101 (e)

Yang hilang = current + 1 = 99 + 1 = 100 = 'd' ✅
```

Jadi `result` sudah langsung siap di-convert dengan `String.fromCharCode(result)` tanpa operasi tambahan.

---

> **Apa itu `null` sebagai initial value?**

`null` dipilih karena:
- Nilai falsy → `if (acc) return acc` tidak akan terpicu di awal
- Mudah dicek di akhir: `result ? ... : ''`
- Berbeda dari `0` atau `''` yang bisa membingungkan

---

<a name="perbandingan-kedua-solusi"></a>
## ⚖️ Perbandingan Kedua Solusi

| | Solusi 1 (`find`) | Solusi 2 (`reduce`) |
|---|---|---|
| **Method** | `find` | `reduce` |
| **Yang disimpan** | Huruf sebelum lompatan | Character code huruf yang hilang |
| **Bisa early exit?** | ✅ Ya, `find` berhenti saat ketemu | ⚠️ Tidak benar-benar berhenti, tapi pakai early return |
| **Operasi di akhir** | `+1` pada character code | Tidak perlu, langsung `fromCharCode` |
| **Jumlah baris** | Lebih pendek | Sedikit lebih panjang |
| **Keterbacaan** | Lebih mudah dibaca | Perlu paham pola accumulator |

**Keduanya punya benang merah yang sama:**
- ✅ Pakai **lookahead** (`arr[i + 1]`) bukan lookbehind
- ✅ Pakai **optional chaining** (`?.`) untuk handle elemen terakhir
- ✅ Tidak ada variabel eksternal yang di-mutate di dalam callback

---

<a name="test-cases"></a>
## ✅ Test Cases

```js
test('Find Missing Letter', () => {
  expect(findMissingLetter(['a', 'b', 'c', 'e'])).toBe('d');        // d hilang
  expect(findMissingLetter(['X', 'Z'])).toBe('Y');                   // Y hilang (uppercase)
  expect(findMissingLetter(['m', 'n', 'o', 'q', 'r'])).toBe('p');   // p hilang
  expect(findMissingLetter(['F', 'G', 'H', 'J'])).toBe('I');        // I hilang (uppercase)
});
```

Jalankan test dengan:

```bash
npm test
```

---

> 📝 **Ringkasan:** Kedua solusi pakai pola yang sama — lookahead ke `arr[i + 1]` dengan optional chaining `?.`. Perbedaannya ada di *apa yang disimpan*: `find` menyimpan huruf sebelum lompatan (perlu `+1` di akhir), sedangkan `reduce` langsung menyimpan character code yang hilang (tidak perlu operasi tambahan). Pilih sesuai selera — `find` lebih ringkas, `reduce` lebih eksplisit soal apa yang dicari.