# 🔤 Catatan Belajar: Title Case

> 📅 Challenge: Ubah setiap huruf pertama kata menjadi huruf kapital

---

## 📋 Daftar Isi

- 🎯 [Apa Tantangannya?](#apa-tantangannya)
- 🧩 [Pendekatan 1 — Pakai For Loop Biasa](#pendekatan-1)
- ✂️ [Pendekatan 2 — Split, Loop, Join](#pendekatan-2)
- 🪄 [Pendekatan 3 — Regex Replace](#pendekatan-3)
- ⭐ [Pendekatan 4 — Regex `\b\w` (Paling Ringkas)](#pendekatan-4)
- 🧪 [Test Cases](#test-cases)
- 💡 [Rangkuman Konsep](#rangkuman-konsep)

---

<a name="apa-tantangannya"></a>
## 🎯 Apa Tantangannya?

Buat fungsi `titleCase` yang menerima sebuah string dan mengembalikan string yang sama tapi **huruf pertama setiap kata jadi kapital**.

```
Input  → "i'm a little teapot"
Output → "I'm A Little Teapot"

Input  → "HERE IS MY HANDLE"
Output → "Here Is My Handle"  ← semua caps pun tetap diformat ulang!
```

> ⚠️ **Penting:** Kalau inputnya sudah all-caps sekalipun, outputnya tetap hanya huruf pertama yang kapital, sisanya lowercase.

---

<a name="pendekatan-1"></a>
## 🧩 Pendekatan 1 — Pakai For Loop Biasa

Cara paling manual: loop karakter satu per satu, cek apakah posisinya adalah awal kata.

```javascript
function titleCase(str) {
  let result = '';

  for (let i = 0; i < str.length; i++) {
    // Huruf pertama (i===0) atau huruf setelah spasi → kapitalkan
    if (i === 0 || str[i - 1] === ' ') {
      result += str[i].toUpperCase();
    } else {
      result += str[i].toLowerCase();
    }
  }

  return result;
}
```

**Cara kerjanya:**
- Loop tiap karakter satu per satu
- Kalau posisi `i` adalah `0` (awal string) **atau** karakter sebelumnya adalah spasi → berarti ini huruf pertama kata baru → `.toUpperCase()`
- Selain itu, paksa jadi lowercase dengan `.toLowerCase()` — ini yang membuat `"HELLO"` jadi `"Hello"`, bukan `"HELLO"`

> 💬 Pendekatan ini mudah dipahami tapi agak panjang. Bagus untuk latihan logika dasar!

---

<a name="pendekatan-2"></a>
## ✂️ Pendekatan 2 — Split, Loop, Join

Cara yang lebih "JavaScript-ish": pecah string jadi array kata, proses tiap kata, lalu gabung lagi.

```javascript
const titleCase = (str) => {
  // 1. Ubah semua jadi lowercase dulu, lalu pecah jadi array per kata
  const words = str.toLowerCase().split(' ');

  // 2. Loop tiap kata, ganti huruf pertamanya jadi kapital
  for (let i = 0; i < words.length; i++) {
    words[i] = words[i][0].toUpperCase() + words[i].slice(1);
    //         ↑ huruf pertama kapital    ↑ sisanya dibiarkan
  }

  // 3. Gabung kembali jadi string dengan spasi
  return words.join(' ');
};
```

**3 langkah utama:**

| Langkah | Kode | Hasil contoh |
|--------|------|--------------|
| 1. Lowercase + Split | `.toLowerCase().split(' ')` | `['the', 'quick', 'fox']` |
| 2. Kapitalisasi tiap kata | `words[i][0].toUpperCase() + words[i].slice(1)` | `['The', 'Quick', 'Fox']` |
| 3. Gabung kembali | `.join(' ')` | `'The Quick Fox'` |

> 💡 `words[i][0]` → ambil karakter pertama dari kata  
> 💡 `.slice(1)` → ambil semua karakter mulai dari index ke-1 (buang huruf pertama)

**Versi dengan `.map()` — lebih ringkas:**

Kalau mau benar-benar "Split, **Map**, Join", ini versinya:

```javascript
const titleCase = (str) => {
  return str.toLowerCase()
    .split(' ')
    .map(word => word[0].toUpperCase() + word.slice(1))
    .join(' ');
};
```

`.map()` menggantikan for loop — dia loop tiap elemen array dan mengembalikan array baru yang sudah diproses. Hasilnya sama, tapi lebih ringkas dan bisa ditulis berantai (chaining).

---

<a name="pendekatan-3"></a>
## 🪄 Pendekatan 3 — Regex Replace (`.replace` + `/\w+/g`)

Menggunakan **regex** untuk mencocokkan setiap kata, lalu kapitalisasi huruf pertamanya.

```javascript
const titleCase = (str) => {
  return str.replace(/\w+/g, (word) => word[0].toUpperCase() + word.slice(1));
};
```

**Penjelasan regex `/\w+/g`:**
- `\w` → cocokkan karakter "kata" (huruf, angka, underscore)
- `+` → satu atau lebih karakter
- `g` → lakukan untuk **semua** kemunculan (global)

Jadi regex ini akan mencocokkan tiap "blok kata" dalam string, lalu callback-nya memproses setiap kata tersebut.

> ⚠️ Pendekatan ini tidak otomatis lowercase dulu, jadi `HELLO` jadi `HELLO` (H kapital, tapi sisanya tetap kapital). Kalau itu bukan yang diinginkan, tambahkan `.toLowerCase()` sebelum `.replace`.

---

<a name="pendekatan-4"></a>
## ⭐ Pendekatan 4 — Regex `\b\w` (Paling Ringkas!)

Ini yang dipakai di kode final — paling singkat dan elegan.

```javascript
const titleCase = (str) => {
  return str.replace(/\b\w/g, (match) => match.toUpperCase());
};
```

**Bedanya dengan Pendekatan 3:**

| | Pendekatan 3 `/\w+/g` | Pendekatan 4 `/\b\w/g` |
|--|--|--|
| Yang dicocokkan | Seluruh kata | Hanya huruf **pertama** tiap kata |
| Callback terima | Seluruh kata | Satu karakter saja |
| Perlu `slice(1)`? | ✅ Ya | ❌ Tidak perlu |

**Penjelasan regex `/\b\w/g`:**
- `\b` → **word boundary** (batas kata — posisi antara spasi dan huruf)
- `\w` → satu karakter kata (huruf pertama setelah batas)
- `g` → global, semua kata diproses

**`\b\w` vs `\w\b` — apa bedanya?**

| Regex | Posisi cocok | Yang diambil | Contoh pada `"hello world"` |
|---|---|---|---|
| `\b\w` | Tepat **setelah** batas kata | Huruf **pertama** tiap kata | `h`, `w` |
| `\w\b` | Tepat **sebelum** batas kata | Huruf **terakhir** tiap kata | `o`, `d` |

Kalau di-replace jadi `*`:
- `/\b\w/g` → `*ello *orld`
- `/\w\b/g` → `hell* worl*`

Makanya untuk title case, `\b\w` yang tepat karena kita mau sentuh huruf **pertama** tiap kata.

> ✨ Karena yang dicocokkan cuma satu huruf pertama, kita tinggal `.toUpperCase()` saja — tidak perlu repot dengan sisanya!

---

<a name="test-cases"></a>
## 🧪 Test Cases

```javascript
const titleCase = require('./title-case');

test('Converting string to title case', () => {
  expect(titleCase('hello world')).toBe('Hello World');
  expect(titleCase('javascript programming')).toBe('Javascript Programming');
  expect(titleCase('openai chatbot')).toBe('Openai Chatbot');
});
```

Jalankan test dengan:

```bash
npx jest title-case.test.js
```

Output kalau semua lulus: `✓ 6 passed` 🎉

---

<a name="rangkuman-konsep"></a>
## 💡 Rangkuman Konsep

Berikut method-method JavaScript yang dipakai di challenge ini:

| Method | Fungsi | Contoh |
|--------|--------|--------|
| `.toUpperCase()` | Huruf jadi kapital semua | `"hello".toUpperCase()` → `"HELLO"` |
| `.toLowerCase()` | Huruf jadi kecil semua | `"HELLO".toLowerCase()` → `"hello"` |
| `.split(' ')` | Pecah string jadi array | `"a b".split(' ')` → `['a', 'b']` |
| `.join(' ')` | Gabung array jadi string | `['a', 'b'].join(' ')` → `"a b"` |
| `.slice(1)` | Potong string dari index ke-1 | `"hello".slice(1)` → `"ello"` |
| `str[0]` | Ambil karakter pertama | `"hello"[0]` → `"h"` |
| `.replace(/regex/g, fn)` | Ganti bagian string pakai regex | Lihat contoh di atas |

> 🏁 **Next challenge:** Reverse a String — populer banget di interview!