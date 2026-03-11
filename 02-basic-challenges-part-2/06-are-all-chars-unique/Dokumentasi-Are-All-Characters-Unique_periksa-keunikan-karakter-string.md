# 🔤 Challenge: Are All Characters Unique?

> 📝 **Catatan Pribadi** — Dokumentasi ini dibuat dari video tutorial tentang challenge JavaScript: mengecek apakah semua karakter dalam sebuah string bersifat unik.

---

## 📚 Daftar Isi

- 🔍 [Apa itu Challenge Ini?](#pengenalan)
- 🧪 [Contoh Input & Output](#contoh)
- 🏗️ [Solusi 1 — Pakai Object](#solusi-object)
- ⚡ [Solusi 2 — Pakai Set](#solusi-set)
- ✨ [Solusi 3 — One-liner](#solusi-oneliner)
- 🔬 [Perbandingan Semua Solusi](#perbandingan)
- ✅ [Test Cases](#test-cases)

---

<a name="pengenalan"></a>
## 🔍 Apa itu Challenge Ini?

Kita diminta membuat sebuah fungsi bernama `areAllCharactersUnique` yang:
- **Menerima** satu argumen: sebuah `string`
- **Mengembalikan** `true` kalau semua karakter di string itu unik (tidak ada yang berulang)
- **Mengembalikan** `false` kalau ada karakter yang muncul lebih dari sekali

> 💡 **Penting:** Fungsi ini **case-sensitive** — artinya huruf kecil `a` dan huruf besar `A` dianggap sebagai dua karakter yang **berbeda**.

---

<a name="contoh"></a>
## 🧪 Contoh Input & Output

| Input | Output | Alasan |
|-------|--------|--------|
| `'abcdefg'` | `true` | Semua huruf berbeda |
| `'abcdefgA'` | `true` | `a` kecil dan `A` besar dianggap beda |
| `'programming'` | `false` | Ada huruf `m` dan `g` yang muncul 2x |
| `''` | `true` | String kosong dianggap unik secara default |
| `'a'` | `true` | Satu karakter pasti unik |

---

<a name="solusi-object"></a>
## 🏗️ Solusi 1 — Pakai Object

### Ide Dasarnya

Kita buat sebuah **object kosong** sebagai "buku catatan". Setiap kali ketemu karakter baru, kita catat di sana. Kalau ketemu karakter yang sudah tercatat sebelumnya → langsung return `false`.

Kalau loop selesai tanpa masalah → return `true`.

Bayangkan seperti ini, kalau kita masukkan string `'abc'`, object-nya akan terbentuk seperti ini:

```js
{ a: true, b: true, c: true }
```

Tapi kalau kita masukkan `'aba'`, begitu ketemu `a` yang kedua, kita langsung berhenti dan return `false`.

### Versi `for` loop

Loop klasik dengan index. Karakter diambil manual lewat `str[i]`.

```js
function areAllCharactersUnique(str) {
  const charCount = {};

  for (let i = 0; i < str.length; i++) {
    // Ambil karakter di posisi ke-i
    const char = str[i];

    // Kalau karakter ini sudah ada di object → ada duplikat!
    if (charCount[char]) {
      return false;
    }

    // Kalau belum ada, catat ke object dengan nilai true
    charCount[char] = true;
  }

  return true;
}
```

### Versi `for...of`

Lebih ringkas — `for...of` langsung kasih karakternya tanpa perlu index.

```js
function areAllCharactersUnique(str) {
  const charCount = {};

  for (const char of str) {
    if (charCount[char]) {
      return false;
    }
    charCount[char] = true;
  }

  return true;
}
```

> 💬 **Bedanya:** `for...of` lebih bersih karena kita tidak perlu urusin `i` dan `str[i]` — langsung dapat `char`-nya.

### Cara Kerjanya Step by Step

Misalnya input: `'aba'`

| Iterasi | `char` | `charCount` sebelum cek | Hasil cek |
|---------|--------|--------------------------|-----------|
| 1 | `'a'` | `{}` | Belum ada → tambahkan |
| 2 | `'b'` | `{ a: true }` | Belum ada → tambahkan |
| 3 | `'a'` | `{ a: true, b: true }` | **Sudah ada! → return `false`** |

---

<a name="solusi-set"></a>
## ⚡ Solusi 2 — Pakai Set

### Apa itu `Set`?

`Set` adalah struktur data bawaan JavaScript yang **hanya menyimpan nilai unik** — tidak ada duplikat di dalamnya. Cocok banget untuk kasus ini!

`Set` punya dua method yang kita pakai:
- `.has(value)` → cek apakah nilai sudah ada di Set (return `true`/`false`)
- `.add(value)` → tambahkan nilai ke Set

### Versi `for` loop

```js
function areAllCharactersUnique(str) {
  const charSet = new Set();

  for (let i = 0; i < str.length; i++) {
    // Ambil karakter di posisi ke-i
    const char = str[i];

    // Kalau Set sudah punya karakter ini → ada duplikat!
    if (charSet.has(char)) {
      return false;
    }

    // Kalau belum ada, tambahkan ke Set
    charSet.add(char);
  }

  return true;
}
```

### Versi `for...of`

```js
function areAllCharactersUnique(str) {
  const charSet = new Set();

  for (const char of str) {
    if (charSet.has(char)) {
      return false;
    }
    charSet.add(char);
  }

  return true;
}
```

### Cara Kerjanya Step by Step

Misalnya input: `'aba'`

| Iterasi | `char` | `charSet` sebelum cek | Hasil cek |
|---------|--------|-----------------------|-----------|
| 1 | `'a'` | `Set {}` | `.has('a')` → `false` → add |
| 2 | `'b'` | `Set { 'a' }` | `.has('b')` → `false` → add |
| 3 | `'a'` | `Set { 'a', 'b' }` | **`.has('a')` → `true` → return `false`** |

---

<a name="solusi-oneliner"></a>
## ✨ Solusi 3 — One-liner

### Ide Dasarnya

Ini yang paling elegan! Tidak perlu loop sama sekali.

Triknya: `new Set(str)` otomatis membuang semua karakter duplikat. Kalau ukuran Set (`size`) sama dengan panjang string aslinya (`length`) → berarti tidak ada yang dibuang → semua karakter unik!

```js
'abc'  → Set { 'a', 'b', 'c' } → size 3 === length 3 → true  ✅
'aba'  → Set { 'a', 'b' }      → size 2 !== length 3 → false ❌
```

### Kodenya

```js
const areAllCharactersUnique = (str) => {
  const charSet = new Set(str);

  return charSet.size === str.length;
};
```

> 🔥 **Kenapa keren?** Satu baris logika menggantikan seluruh loop. `new Set(str)` langsung menerima string dan otomatis memecahnya per karakter.

---

<a name="perbandingan"></a>
## 🔬 Perbandingan Semua Solusi

| | Struktur Data | Loop | Gaya |
|---|---|---|---|
| **Solusi 1a** (Object + for) | `{}` | `for (let i...)` | Klasik |
| **Solusi 1b** (Object + for...of) | `{}` | `for...of` | Lebih clean |
| **Solusi 2a** (Set + for) | `Set` | `for (let i...)` | Klasik |
| **Solusi 2b** (Set + for...of) | `Set` | `for...of` | Lebih clean |
| **Solusi 3** (One-liner) | `Set` | ❌ Tanpa loop | Paling ringkas |

> 💬 **Kapan pakai yang mana?**
> - **Lagi belajar** → Solusi 1 atau 2 versi `for` loop, biar logikanya kelihatan jelas
> - **Sudah familiar** → Solusi 1 atau 2 versi `for...of`, lebih enak dibaca
> - **Mau yang paling singkat** → Solusi 3, cocok untuk kode production

---

<a name="test-cases"></a>
## ✅ Test Cases

```js
test('Unique Characters in a String', () => {
  expect(areAllCharactersUnique('abcdefg')).toBe(true);      // semua unik ✅
  expect(areAllCharactersUnique('abcdefgA')).toBe(true);     // a ≠ A, masih unik ✅
  expect(areAllCharactersUnique('programming')).toBe(false); // ada m & g dobel ❌
  expect(areAllCharactersUnique('')).toBe(true);             // string kosong ✅
  expect(areAllCharactersUnique('a')).toBe(true);            // satu karakter ✅
});
```

### Jalankan file run-nya

```js
const areAllCharactersUnique = require('./are-all-chars-unique');

const result1 = areAllCharactersUnique('abcdefg');     // true
const result2 = areAllCharactersUnique('abcdefgA');    // true
const result3 = areAllCharactersUnique('programming'); // false

console.log(result1); // true
console.log(result2); // true
console.log(result3); // false
```

---

> 🎉 **Done!** Ada 3 pendekatan berbeda untuk challenge ini — semuanya valid, tinggal pilih sesuai kebutuhan dan selera!