# 🔤 Valid Anagrams — Catatan Belajar Pribadi

> Dokumentasi ini dibuat berdasarkan video tutorial challenge **Valid Anagrams**.  
> Ditulis ulang dengan bahasa santai biar gampang dicerna pas review nanti 😄

---

## 📋 Daftar Isi

- 🔍 [Apa itu Anagram?](#apa-itu-anagram)
- 🎯 [Pendekatan Solusi](#pendekatan-solusi)
- 🏗️ [Langkah 1 — Bikin Objek Frekuensi Karakter](#langkah-1)
- 🔄 [Langkah 2 — Lakukan untuk String Kedua](#langkah-2)
- ⚖️ [Langkah 3 — Bandingkan Keduanya](#langkah-3)
- ✅ [Kode Lengkap](#kode-lengkap)
- 🔀 [Solusi Alternatif](#solusi-alternatif)
  - 📌 [Versi 2 — `for...of` Semua](#versi-2)
  - 📌 [Versi 3 — Hybrid `reduce` + `for...of`](#versi-3)
  - 📌 [Versi 4 — `sort`](#versi-4)
- 📊 [Perbandingan Semua Versi](#perbandingan)
- 🧪 [Test Cases](#test-cases)

---

<a name="apa-itu-anagram"></a>
## 🔍 Apa itu Anagram?

Anagram itu adalah kata atau frasa yang terbentuk dari **susunan ulang huruf-huruf** dari kata atau frasa lain — dengan catatan, **semua huruf aslinya harus dipakai semua, tepat sekali**.

Contoh gampangnya:

| String 1 | String 2 | Anagram? |
|---|---|---|
| `"listen"` | `"silent"` | ✅ Ya |
| `"hello"` | `"world"` | ❌ Tidak |
| `"astronomer"` | `"moonstarer"` | ✅ Ya |

Intinya: **karakter yang dipakai sama, dan frekuensinya juga sama**.

---

<a name="pendekatan-solusi"></a>
## 🎯 Pendekatan Solusi

Cara yang dipakai di video ini ada dua langkah utama:

1. **Pecah** setiap string jadi array karakter, lalu **hitung frekuensi** kemunculan tiap karakter → simpan ke dalam sebuah objek.
2. **Bandingkan** kedua objek frekuensi itu. Kalau semua karakternya cocok → anagram ✅

Bayangkan hasilnya seperti ini untuk string `"app"`:

```js
// freqCount1 untuk "app" akan jadi:
{ a: 1, p: 2 }
```

Keren kan? Setiap huruf jadi *key*, dan berapa kali dia muncul jadi *value*-nya.

---

<a name="langkah-1"></a>
## 🏗️ Langkah 1 — Bikin Objek Frekuensi Karakter

Kita pakai kombinasi `.split('')` dan `.reduce()` untuk ini.

```js
const freqCount1 = str1.split('').reduce((acc, char) => {
  acc[char] = (acc[char] || 0) + 1;
  return acc;
}, {});
```

Mari kita bedah satu per satu:

**`.split('')`** — memecah string menjadi array karakter.
```js
"app".split('') // → ['a', 'p', 'p']
```
> ⚠️ Jangan kasih spasi di dalam `''` ya! Kalau dikasih spasi, dia malah split per kata, bukan per karakter.

**`.reduce((acc, char) => { ... }, {})`** — ini yang bikin objek frekuensinya.
- `acc` adalah **accumulator** — awalnya sebuah objek kosong `{}`
- `char` adalah karakter yang sedang diproses satu per satu
- `acc[char] || 0` → kalau karakter belum pernah muncul, anggap nilainya `0`
- `+ 1` → tambah 1 setiap kali karakter itu ketemu
- `return acc` → wajib dikembalikan supaya objeknya terus diupdate

Hasil akhir untuk `"app"`:
```js
{ a: 1, p: 2 }
```

---

<a name="langkah-2"></a>
## 🔄 Langkah 2 — Lakukan untuk String Kedua

Persis sama seperti langkah 1, tapi untuk `str2`:

```js
const freqCount2 = str2.split('').reduce((acc, char) => {
  acc[char] = (acc[char] || 0) + 1;
  return acc;
}, {});
```

Sekarang kita punya dua objek frekuensi yang siap dibandingkan.

---

<a name="langkah-3"></a>
## ⚖️ Langkah 3 — Bandingkan Keduanya

Setelah dua objek frekuensi terbentuk, kita bandingkan menggunakan `Object.keys()` dan `.every()`:

```js
return Object.keys(freqCount1).every(
  (char) => freqCount1[char] === freqCount2[char]
);
```

Penjelasannya:

- **`Object.keys(freqCount1)`** → ambil semua *key* (huruf-huruf) dari objek pertama, hasilnya berupa array.
  ```js
  Object.keys({ a: 1, p: 2 }) // → ['a', 'p']
  ```

- **`.every(char => ...)`** → loop semua huruf, dan cek apakah **semuanya** cocok. Kalau ada satu saja yang tidak cocok, langsung return `false`.
  > 💡 Bedain sama `.some()` ya — kalau `.some()` cukup *satu* yang cocok baru return `true`. Sedangkan `.every()` *semua* harus cocok.

- **`freqCount1[char] === freqCount2[char]`** → cek apakah frekuensi karakter yang sama di kedua string itu sama nilainya.

---

<a name="kode-lengkap"></a>
## ✅ Kode Lengkap

```js
function validAnagrams(str1, str2) {
  // Buat objek frekuensi untuk string pertama
  const freqCount1 = str1.split('').reduce((acc, char) => {
    acc[char] = (acc[char] || 0) + 1;
    return acc;
  }, {});

  // Buat objek frekuensi untuk string kedua
  const freqCount2 = str2.split('').reduce((acc, char) => {
    acc[char] = (acc[char] || 0) + 1;
    return acc;
  }, {});

  // Bandingkan frekuensi tiap karakter
  return Object.keys(freqCount1).every(
    (char) => freqCount1[char] === freqCount2[char]
  );
}
```

---

<a name="solusi-alternatif"></a>
## 🔀 Solusi Alternatif

Versi 1 di atas bukan satu-satunya cara! Ada beberapa pendekatan lain yang bisa dipakai — masing-masing punya kelebihan sendiri.

---

<a name="versi-2"></a>
### 📌 Versi 2 — `for...of` Semua

Bedanya dari versi 1: cukup pakai **satu objek** saja, bukan dua. Loop pertama mengisi frekuensi, loop kedua menguranginya.

```js
function validAnagrams(str1, str2) {
  if (str1.length !== str2.length) return false;

  const freq = {};

  for (const char of str1) {
    freq[char] = (freq[char] || 0) + 1;
  }

  for (const char of str2) {
    if (!freq[char]) return false;
    freq[char]--;
  }

  return true;
}
```

Bedah kodenya:

- **`if (str1.length !== str2.length) return false`** → ini namanya *early exit* — kalau panjang stringnya beda, sudah pasti bukan anagram, langsung keluar tanpa proses lebih lanjut.
- **Loop pertama `for...of str1`** → isi objek `freq` dengan frekuensi tiap karakter dari `str1`. Persis seperti versi 1.
- **Loop kedua `for...of str2`** → untuk tiap karakter di `str2`, kurangi (`--`) nilainya di `freq`.
  - Kalau karakter tidak ada di `freq` atau nilainya sudah `0` (falsy) → berarti tidak cocok, langsung `return false`.
- Kalau lolos semua → `return true` ✅

> 💡 Lebih hemat memori karena hanya pakai **satu objek**, bukan dua seperti versi 1.

---

<a name="versi-3"></a>
### 📌 Versi 3 — Hybrid `reduce` + `for...of`

Ini perpaduan gaya versi 1 dan versi 2 — bangun frequency map pakai `reduce`, tapi bandingkannya pakai `for...of` dengan early exit.

```js
function validAnagrams(str1, str2) {
  if (str1.length !== str2.length) return false;

  const freq = [...str1].reduce((acc, char) => {
    acc[char] = (acc[char] || 0) + 1;
    return acc;
  }, {});

  for (const char of str2) {
    if (!freq[char]) return false;
    freq[char]--;
  }

  return true;
}
```

Bedah kodenya:

- **`[...str1].reduce(...)`** → spread operator `[...str1]` di sini fungsinya sama persis kayak `.split('')` — memecah string jadi array karakter. Lalu `reduce` membangun objek frekuensinya.
- **`for...of str2`** → sama seperti loop kedua di versi 2 — kurangi frekuensi, dan kalau tidak ketemu langsung `return false`.

> 💡 Gaya penulisannya lebih *declarative* di bagian build-nya, tapi tetap dapat keuntungan *early exit* dari `for...of`.

---

<a name="versi-4"></a>
### 📌 Versi 4 — `sort`

Ini yang paling ringkas! Cukup urutkan karakter kedua string lalu bandingkan hasilnya.

```js
const validAnagrams = (str1, str2) => {
  if (str1.length !== str2.length) return false;
  return str1.split('').sort().join('') === str2.split('').sort().join('');
};
```

Bedah kodenya:

- **`.split('')`** → pecah string jadi array karakter seperti biasa.
- **`.sort()`** → urutkan karakternya secara alfabetis.
- **`.join('')`** → gabungkan kembali jadi string.
- Kalau kedua string adalah anagram, hasil sort-nya pasti **identik**.

Contoh:
```js
'listen'.split('').sort().join('') // → 'eilnst'
'silent'.split('').sort().join('') // → 'eilnst'
// keduanya sama → true ✅
```

> ⚠️ Cara ini paling mudah dibaca, tapi paling lambat karena proses `.sort()` itu kompleksitasnya **O(n log n)** — sedangkan versi 1, 2, 3 semuanya **O(n)**. Untuk string pendek sih tidak masalah, tapi perlu diingat kalau nanti ketemu data yang besar.

---

<a name="perbandingan"></a>
## 📊 Perbandingan Semua Versi

| | Versi 1 (`reduce` × 2) | Versi 2 (`for...of` semua) | Versi 3 (Hybrid) | Versi 4 (`sort`) |
|---|---|---|---|---|
| **Keterbacaan** | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| **Kompleksitas** | O(n) | O(n) | O(n) | O(n log n) |
| **Memory** | O(n) × 2 | O(n) | O(n) | O(n) |
| **Early exit** | ✅ | ✅ | ✅ | ❌ |
| **Gaya** | Functional | Imperative | Hybrid | Functional |

---

<a name="test-cases"></a>
## 🧪 Test Cases

```js
validAnagrams('listen', 'silent');     // ✅ true
validAnagrams('hello', 'world');       // ❌ false
validAnagrams('astronomer', 'moonstarer'); // ✅ true
validAnagrams('apple', 'banana');      // ❌ false
```

Semua test di atas sudah **passed** sesuai video! 🎉

---

> 📝 **Catatan pribadi:** Trik `(acc[char] || 0) + 1` ini berguna banget dan sering muncul di challenge lain yang butuh hitung frekuensi. Ingat ini!