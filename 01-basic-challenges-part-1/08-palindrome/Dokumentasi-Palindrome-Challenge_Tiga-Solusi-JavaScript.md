# 🔄 Palindrome Challenge — Dokumentasi Pribadi

> **Catatan:** Dokumentasi ini dibuat dari video tutorial tentang JavaScript Palindrome Challenge. Cocok banget buat kamu yang baru mulai belajar coding!

---

## 📋 Daftar Isi

- 🔍 [Apa itu Palindrome?](#apa-itu-palindrome)
- 🎯 [Tujuan Challenge](#tujuan-challenge)
- ⚙️ [Solusi 1 — Pakai Regular Expression](#solusi-1)
- 🛠️ [Solusi 2 — Tanpa Regular Expression](#solusi-2)
  - 🧩 [Helper: `isAlphaNumeric`](#helper-isalphanumeric)
  - 🧹 [Helper: `removeNonAlphanumeric`](#helper-removenonalphanumeric)
  - ↩️ [Helper: `reverseString`](#helper-reversestring)
  - 🔗 [Menggabungkan Semua Helper](#menggabungkan-semua-helper)
- 👆 [Solusi 3 — Two Pointer](#solusi-3)
- ✅ [Menjalankan Test](#menjalankan-test)
- 📊 [Perbandingan Ketiga Solusi](#perbandingan-solusi)

---

<a name="apa-itu-palindrome"></a>
## 🔍 Apa itu Palindrome?

**Palindrome** adalah kata, frasa, atau urutan karakter yang kalau dibaca dari depan maupun dari belakang hasilnya **sama persis**.

Contoh-contohnya:

| Teks | Palindrome? |
|------|-------------|
| `madam` | ✅ Ya — m-a-d-a-m |
| `racecar` | ✅ Ya — r-a-c-e-c-a-r |
| `race car` | ✅ Ya — kalau spasi dihapus: racecar |
| `hello` | ❌ Tidak |
| *(string kosong)* | ✅ Ya — dianggap sama |

> 💡 **Ingat:** String kosong `''` dianggap palindrome karena membacanya dari arah mana pun tetap sama (kosong).

---

<a name="tujuan-challenge"></a>
## 🎯 Tujuan Challenge

Buat fungsi bernama `isPalindrome` yang:

- Menerima input berupa **string**
- Mengembalikan **`true`** kalau string tersebut adalah palindrome
- Mengembalikan **`false`** kalau bukan

### Aturan Tambahan ⚠️

Fungsi harus **mengabaikan** karakter-karakter berikut sebelum memeriksa:
- Spasi
- Tanda baca
- Karakter spesial (misalnya `@`, `!`, `,`, dll)
- Huruf kapital — semua dikonversi ke **huruf kecil** dulu

Jadi `"A man, a plan, a canal, Panama"` tetap dianggap palindrome!

---

<a name="solusi-1"></a>
## ⚙️ Solusi 1 — Pakai Regular Expression

Ini cara yang paling **ringkas dan elegan**. Cukup 3 baris kode!

### Cara Kerjanya

1. Ubah semua huruf menjadi **huruf kecil** dengan `.toLowerCase()`
2. **Hapus semua karakter non-alphanumeric** pakai `.replace()` dan regex
3. **Balik string** dengan `.split('').reverse().join('')`
4. **Bandingkan** string asli (yang sudah diformat) dengan string yang sudah dibalik

### Kodenya

```js
function isPalindrome(str) {
  // Langkah 1 & 2: Jadikan lowercase, lalu hapus karakter non-alphanumeric
  const formattedStr = str.toLowerCase().replace(/[^a-z0-9]/g, '');

  // Langkah 3: Balik string yang sudah diformat
  const reversedStr = formattedStr.split('').reverse().join('');

  // Langkah 4: Bandingkan keduanya
  return formattedStr === reversedStr;
}
```

### Memahami Regex `/[^a-z0-9]/g` 🔎

Regex ini mungkin terlihat aneh, tapi sebenarnya simpel:

| Bagian | Artinya |
|--------|---------|
| `[ ]` | "Karakter apa pun yang ada di dalam kurung ini" |
| `^` | Kalau di dalam `[ ]`, artinya **"BUKAN"** |
| `a-z` | Huruf a sampai z |
| `0-9` | Angka 0 sampai 9 |
| `g` | Global — cari **semua** kemunculan, bukan hanya yang pertama |

Jadi `/[^a-z0-9]/g` artinya: **"Temukan semua karakter yang BUKAN huruf atau angka"** — lalu ganti dengan `''` (string kosong / hapus).

### Memahami `.split('').reverse().join('')` 🔎

Ini trik klasik untuk membalik string di JavaScript:

```js
"racecar"
  .split('')        // ["r","a","c","e","c","a","r"]  → pecah jadi array huruf
  .reverse()        // ["r","a","c","e","c","a","r"]  → balik urutan array
  .join('')         // "racecar"                       → gabung kembali jadi string
```

---

<a name="solusi-2"></a>
## 🛠️ Solusi 2 — Tanpa Regular Expression

Solusi ini **lebih panjang**, tapi bagus buat latihan karena kita membangun sendiri logika yang biasanya dilakukan oleh regex. Kita pakai beberapa **helper function** agar kode tetap rapi.

### Gambaran Besar

```
isPalindrome(str)
    │
    ├─► removeNonAlphanumeric(str)  → pakai isAlphaNumeric(char)
    │         (hapus karakter non-alfanumerik)
    │
    └─► reverseString(str)
              (balik string tanpa .reverse())
```

---

<a name="helper-isalphanumeric"></a>
### 🧩 Helper: `isAlphaNumeric`

Fungsi ini mengecek apakah **satu karakter** adalah huruf atau angka.

Triknya: setiap karakter punya **kode Unicode** (angka unik). Kita tinggal cek apakah kodenya ada dalam rentang yang kita mau.

| Rentang Kode | Karakter |
|-------------|----------|
| 48 – 57 | Angka `0` sampai `9` |
| 97 – 122 | Huruf kecil `a` sampai `z` |

Kita dapat kode Unicode dengan method `.charCodeAt(0)`.

```js
function isAlphaNumeric(char) {
  const code = char.charCodeAt(0); // Ambil kode Unicode-nya

  return (
    (code >= 48 && code <= 57) ||   // Angka 0-9
    (code >= 97 && code <= 122)     // Huruf kecil a-z
  );
}
```

**Contoh:**
```js
isAlphaNumeric('a')  // true  (kode: 97)
isAlphaNumeric('1')  // true  (kode: 49)
isAlphaNumeric('@')  // false (kode: 64)
isAlphaNumeric(' ')  // false (kode: 32)
```

> 💡 Makanya kita perlu `.toLowerCase()` sebelumnya — karena huruf kapital `A` punya kode 65 (berbeda dari `a` = 97), dan kita hanya cek rentang 97–122.

---

<a name="helper-removenonalphanumeric"></a>
### 🧹 Helper: `removeNonAlphanumeric`

Fungsi ini menerima sebuah string dan mengembalikan **string baru** yang hanya berisi huruf dan angka — karakter lain dihapus.

Caranya: loop karakter satu per satu, kalau alphanumeric masukkan ke hasil, kalau tidak skip.

```js
function removeNonAlphanumeric(str) {
  let formattedStr = ''; // Mulai dengan string kosong

  for (let i = 0; i < str.length; i++) {
    const char = str[i]; // Ambil karakter ke-i

    if (isAlphaNumeric(char)) {
      formattedStr += char; // Kalau alphanumeric, tambahkan ke hasil
    }
    // Kalau tidak alphanumeric, dilewati saja
  }

  return formattedStr;
}
```

---

<a name="helper-reversestring"></a>
### ↩️ Helper: `reverseString`

Fungsi ini membalik string dengan cara **loop dari belakang ke depan**.

```js
function reverseString(str) {
  let reversed = ''; // Mulai dengan string kosong

  // Mulai dari indeks terakhir, mundur sampai indeks 0
  for (let i = str.length - 1; i >= 0; i--) {
    reversed += str[i]; // Tambahkan karakter dari belakang
  }

  return reversed;
}
```

**Contoh visual:**
```
str = "racecar"  (indeks 0–6)

Loop:  i=6 → 'r'
       i=5 → 'a'
       i=4 → 'c'
       i=3 → 'e'
       i=2 → 'c'
       i=1 → 'a'
       i=0 → 'r'

Hasil: "racecar"  ✅ (palindrome!)
```

---

<a name="menggabungkan-semua-helper"></a>
### 🔗 Menggabungkan Semua Helper

Dengan semua helper siap, fungsi utamanya jadi simpel:

```js
function isPalindrome(str) {
  // 1. Hapus non-alphanumeric (setelah dijadikan lowercase)
  const formattedStr = removeNonAlphanumeric(str.toLowerCase());

  // 2. Balik string yang sudah diformat
  const reversedStr = reverseString(formattedStr);

  // 3. Bandingkan — kalau sama, berarti palindrome
  return formattedStr === reversedStr;
}
```

---

<a name="solusi-3"></a>
## 👆 Solusi 3 — Two Pointer

Solusi ini paling **efisien** dari ketiga cara. Idenya sederhana: cukup bandingkan karakter dari **ujung kiri dan ujung kanan** secara bersamaan, lalu jalan menuju tengah. Tidak perlu membuat reversed string sama sekali!

### Cara Kerjanya

1. Normalisasi string — lowercase + hapus non-alphanumeric
2. Siapkan dua "pointer": satu dari kiri (`i = 0`), satu dari kanan (`normalizedStr.length - 1 - i`)
3. Bandingkan karakter di kedua pointer setiap iterasi
4. Kalau ada yang tidak cocok → langsung `return false`
5. Kalau sampai tengah semua cocok → `return true`

Loop hanya berjalan sampai **setengah panjang string** saja, makanya lebih hemat.

### Kodenya

```js
function isPalindrome(str) {
  // Normalisasi: lowercase + hapus non-alphanumeric
  const normalizedStr = str.toLowerCase().replace(/[^a-z0-9]/g, '');

  // Loop hanya sampai setengah string
  for (let i = 0; i < Math.floor(normalizedStr.length / 2); i++) {
    const leftChar = normalizedStr[i];                             // Karakter dari kiri
    const rightChar = normalizedStr[normalizedStr.length - 1 - i]; // Karakter dari kanan

    // Kalau tidak cocok, langsung berhenti → bukan palindrome
    if (leftChar !== rightChar) return false;
  }

  // Kalau semua cocok → palindrome
  return true;
}
```

### Visualisasi Two Pointer 🔎

```
String: "r a c e c a r"
Indeks:  0 1 2 3 4 5 6

Iterasi 1: i=0  →  leftChar='r'  vs  rightChar='r'  ✅ cocok
Iterasi 2: i=1  →  leftChar='a'  vs  rightChar='a'  ✅ cocok
Iterasi 3: i=2  →  leftChar='c'  vs  rightChar='c'  ✅ cocok
           i=3  →  tengah, loop selesai

✅ return true
```

Contoh kalau bukan palindrome:

```
String: "h e l l o"
Indeks:  0 1 2 3 4

Iterasi 1: i=0  →  leftChar='h'  vs  rightChar='o'  ❌ tidak cocok

❌ return false  (langsung berhenti di sini!)
```

### Memahami `Math.floor(normalizedStr.length / 2)` 🔎

Ini batas loop agar kita hanya periksa sampai **setengah string**:

| String | Length | `/ 2` | `Math.floor` | Yang dicek |
|--------|--------|-------|--------------|------------|
| `racecar` | 7 | 3.5 | 3 | indeks 0, 1, 2 |
| `madam` | 5 | 2.5 | 2 | indeks 0, 1 |
| `abba` | 4 | 2.0 | 2 | indeks 0, 1 |

`Math.floor` membulatkan ke bawah — karakter di tengah (untuk panjang ganjil) tidak perlu dibandingkan karena pasti cocok dengan dirinya sendiri.

### Kenapa Lebih Efisien? 🚀

| | Solusi 1 & 2 | Solusi 3 (Two Pointer) |
|---|---|---|
| **Reversed string dibuat?** | ✅ Ya (butuh memori ekstra) | ❌ Tidak |
| **Jumlah iterasi** | Seluruh string | Maksimal setengah string |
| **Berhenti lebih awal?** | ❌ Tidak | ✅ Ya, begitu ada yang tidak cocok |

---

<a name="menjalankan-test"></a>
## ✅ Menjalankan Test

### File Test (`palindrome.test.js`)

```js
const isPalindrome = require('./palindrome');

test('Checking for palindrome strings', () => {
  expect(isPalindrome('racecar')).toBe(true);
  expect(isPalindrome('Hello')).toBe(false);
  expect(isPalindrome('A man, a plan, a canal, Panama')).toBe(true);
  expect(isPalindrome('12321')).toBe(true);
});
```

### Cara Menjalankan

```bash
npm test
```

Kalau semua test hijau (passing), berarti kode kamu sudah benar! 🎉

### File Run Manual (`palindrome-run.js`)

Untuk mencoba sendiri di luar test:

```js
const isPalindrome = require('./palindrome');

const result1 = isPalindrome('racecar');   // true
const result2 = isPalindrome('racecars');  // false

console.log(result1, result2); // Output: true false
```

---

<a name="perbandingan-solusi"></a>
## 📊 Perbandingan Ketiga Solusi

| | Solusi 1 (Regex) | Solusi 2 (Manual) | Solusi 3 (Two Pointer) |
|---|---|---|---|
| **Panjang kode** | ~3 baris | ~30+ baris | ~8 baris |
| **Kemudahan dibaca** | ✅ Ringkas | ⚠️ Panjang | ✅ Ringkas |
| **Konsep yang dipelajari** | Regex, chaining method | Charcode, loop, helper functions | Two pointer, early return |
| **Membuat reversed string?** | ✅ Ya | ✅ Ya | ❌ Tidak |
| **Berhenti lebih awal?** | ❌ Tidak | ❌ Tidak | ✅ Ya |
| **Efisiensi** | ⚡ Baik | ⚡ Baik | ⚡⚡ Terbaik |
| **Cocok untuk** | Kode production | Latihan logika | Production & interview |
| **Pakai regex?** | ✅ Ya | ❌ Tidak | ✅ Ya |

> 🏆 **Kesimpulan:** Untuk latihan paham logika, pelajari **Solusi 2**. Untuk kode sehari-hari, **Solusi 1** paling praktis. Untuk efisiensi optimal dan sering muncul di coding interview, **Solusi 3 (Two Pointer)** adalah pilihan terbaik!