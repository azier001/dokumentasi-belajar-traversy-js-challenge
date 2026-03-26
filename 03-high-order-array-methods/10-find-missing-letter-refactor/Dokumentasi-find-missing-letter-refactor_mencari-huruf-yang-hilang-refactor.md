# 🔤 Find Missing Letter — Refactor dengan Higher-Order Array Methods

> **Catatan pribadi:** Ini adalah versi refactor dari challenge yang sebelumnya diselesaikan pakai `for` loop. Sekarang kita pakai higher-order array methods seperti `map`, `find`, `filter`, dan `reduce`.

---

## 📋 Daftar Isi

- 🎯 [Apa yang Mau Dikerjakan?](#apa-yang-mau-dikerjakan)
- 🧠 [Konsep Kunci: Character Code](#konsep-kunci-character-code)
- 🔍 [Solusi 1 — `map` + `find`](#solusi-1--map--find)
- 🧹 [Solusi 2 — `filter`](#solusi-2--filter)
- ♻️ [Solusi 3 — `reduce`](#solusi-3--reduce)
- ✅ [Test Cases](#test-cases)

---

<a name="apa-yang-mau-dikerjakan"></a>
## 🎯 Apa yang Mau Dikerjakan?

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

<a name="konsep-kunci-character-code"></a>
## 🧠 Konsep Kunci: Character Code

Setiap karakter punya **unicode number** (disebut juga character code). Misalnya:

| Huruf | Character Code |
|-------|---------------|
| `a`   | 97            |
| `b`   | 98            |
| `c`   | 99            |
| ...   | ...           |

Karena huruf-huruf berurutan, character code-nya juga **selisih 1**. Kalau ada yang selisihnya lebih dari 1, berarti ada huruf yang hilang di sana!

**Dua method penting yang dipakai:**

```js
// Mengambil character code dari sebuah huruf
'a'.charCodeAt(0); // => 97

// Kebalikannya: mengubah character code jadi huruf
String.fromCharCode(97); // => "a"
```

---

<a name="solusi-1--map--find"></a>
## 🔍 Solusi 1 — `map` + `find`

**Idenya:** Ubah semua huruf jadi character code dulu (pakai `map`), lalu cari mana yang "lompat" (pakai `find`).

```js
function findMissingLetter(arr) {
  // Simpan character code huruf pertama sebagai patokan awal
  let start = arr[0].charCodeAt(0);

  const missingCharCode = arr
    .map((char) => char.charCodeAt(0)) // ubah semua huruf jadi angka
    .find((current) => {
      // Kalau selisih antara current dan start lebih dari 1, berarti ada yang hilang!
      if (current - start > 1) {
        return true;
      }
      // Kalau tidak, update start ke angka sekarang dan lanjut
      start = current;
      return false;
    });

  // missingCharCode adalah angka SETELAH yang hilang, jadi kita kurangi 1
  return missingCharCode ? String.fromCharCode(missingCharCode - 1) : '';
}
```

**Alur berpikirnya:**

1. `map` mengubah `['a', 'b', 'c', 'e']` → `[97, 98, 99, 101]`
2. `find` menelusuri array angka tersebut
3. Ketemu `101` (e) — selisih dari `99` (c) adalah 2, lebih dari 1 ✅
4. `missingCharCode` = `101`, jadi jawabannya = `String.fromCharCode(101 - 1)` = `"d"` 🎉

> 💡 **Kenapa dikurangi 1?** Karena `find` mengembalikan angka yang *setelah* lompatan — bukan yang hilang. Yang hilang ada tepat sebelumnya.

---

<a name="solusi-2--filter"></a>
## 🧹 Solusi 2 — `filter`

**Idenya:** Pakai `filter` untuk menyaring huruf yang "lompat" dari huruf sebelumnya. Filter bekerja langsung di array huruf asli (tidak diubah ke angka dulu).

```js
function findMissingLetter(arr) {
  const missingCharCode = arr.filter((char, index) => {
    // Huruf pertama (index 0) pasti bukan yang hilang, skip
    if (index === 0) return false;

    // Ambil character code huruf sebelumnya dan sekarang
    const prevCharCode = arr[index - 1].charCodeAt(0);
    const currentCharCode = char.charCodeAt(0);

    // Return true kalau selisihnya lebih dari 1 (ada yang hilang)
    return currentCharCode - prevCharCode > 1;
  })[0]; // ambil elemen pertama dari hasil filter

  // missingCharCode di sini adalah HURUF (bukan angka), jadi kita perlu convert dulu
  return missingCharCode
    ? String.fromCharCode(missingCharCode.charCodeAt(0) - 1)
    : '';
}
```

**Perbedaan penting dari Solusi 1:**

| | Solusi 1 (`map` + `find`) | Solusi 2 (`filter`) |
|---|---|---|
| Yang disimpan di variabel | Character code (angka) | Huruf asli (string) |
| Cara ambil hasilnya | Langsung dari `find` | Pakai `[0]` karena `filter` return array |
| Cara convert ke huruf | `String.fromCharCode(missingCharCode - 1)` | `String.fromCharCode(missingCharCode.charCodeAt(0) - 1)` |

> 💡 **Kenapa ada `.charCodeAt(0)` lagi di akhir?** Karena Solusi 2 menyimpan huruf (bukan angka), jadi kita perlu convert ke angka dulu sebelum dikurangi 1.

---

<a name="solusi-3--reduce"></a>
## ♻️ Solusi 3 — `reduce`

**Idenya:** Pakai `reduce` untuk "menumpuk" hasil sambil menelusuri array. Kalau sudah ketemu yang hilang, simpan di accumulator.

```js
function findMissingLetter(arr) {
  let start = arr[0].charCodeAt(0);

  const missingCharCode = arr.reduce((missing, char) => {
    const current = char.charCodeAt(0);

    // Kalau selisih > 1 dan belum pernah ketemu yang hilang sebelumnya
    if (current - start > 1 && missing === null) {
      missing = start + 1; // simpan character code yang hilang
    }

    start = current; // update start
    return missing;  // teruskan accumulator
  }, null); // nilai awal accumulator adalah null

  // Di sini missingCharCode langsung character code yang hilang (bukan yang sesudahnya)
  return missingCharCode ? String.fromCharCode(missingCharCode) : '';
}
```

> 💡 **Perbedaan dari Solusi 1 & 2:** Kalau di solusi sebelumnya kita menyimpan angka *setelah* lompatan (lalu dikurangi 1), di `reduce` kita langsung menghitung dan menyimpan angka yang hilang (`start + 1`). Jadi tidak perlu dikurangi 1 lagi di akhir.

---

<a name="test-cases"></a>
## ✅ Test Cases

```js
test('Find Missing Letter', () => {
  expect(findMissingLetter(['a', 'b', 'c', 'e'])).toBe('d');   // d hilang
  expect(findMissingLetter(['X', 'Z'])).toBe('Y');              // Y hilang (uppercase)
  expect(findMissingLetter(['m', 'n', 'o', 'q', 'r'])).toBe('p'); // p hilang
  expect(findMissingLetter(['F', 'G', 'H', 'J'])).toBe('I');   // I hilang (uppercase)
});
```

Jalankan test dengan:

```bash
npm test
```

---

> 📝 **Ringkasan:** Ketiga solusi punya logika inti yang sama — cari di mana ada "lompatan" di antara character code yang berurutan. Bedanya hanya di method yang dipakai dan bagaimana hasilnya disimpan.