# 🏆 Tantangan: Kata dengan Skor Tertinggi

> **Temukan kata dengan nilai poin tertinggi dari sebuah kalimat** — setiap huruf memiliki nilai sesuai posisinya dalam alfabet. Siapa yang akan menang?

---

## 📋 Instruksi

Diberikan sebuah string berisi kata-kata, kamu perlu **menemukan kata dengan skor tertinggi**. Setiap huruf dari sebuah kata mendapatkan poin sesuai posisinya dalam alfabet: `a` = 1, `b` = 2, `c` = 3, dan seterusnya.

Kembalikan **kata dengan skor tertinggi** sebagai string.

Jika dua kata memiliki skor yang sama, kembalikan kata yang **muncul lebih awal** dalam string asli.

Semua huruf akan berupa **huruf kecil** dan semua input akan **valid**.

---

## 🔧 Tanda Tangan Fungsi

```js
/**
 * Mengembalikan kata dengan skor tertinggi dari sebuah string.
 * @param {string} str - String input.
 * @returns {string} - Kata dengan skor tertinggi.
 */
function highestScoringWord(str: string): string;
```

---

## 💡 Contoh

```js
highestScoringWord('man i need a taxi up to ubud'); // 'taxi'
highestScoringWord('what time are we climbing up the volcano'); // 'volcano'
highestScoringWord('take me to semynak'); // 'semynak'
```

---

## ⚠️ Batasan

- String input hanya akan mengandung **huruf kecil dan spasi**. Tidak boleh mengandung angka, karakter khusus, atau tanda baca.

---

## 🗝️ Petunjuk

- Kamu bisa menggunakan method `split` untuk memisahkan kata-kata.
- Kamu bisa menggunakan method `map` untuk menghitung skor setiap kata.
- Kamu bisa menggunakan method `reduce` untuk menemukan kata dengan skor tertinggi.
- Pertimbangkan untuk menangani **edge case** seperti input kosong agar fungsi lebih robust.
- Memisahkan logika scoring ke **helper function** terpisah bisa membuat kode lebih modular dan reusable.

---

## ✅ Solusi

<details>
  <summary>🔍 Klik untuk Solusi 1</summary>

```js
function highestScoringWord(str) {
  const words = str.split(' ');

  const scores = words.map((word) => {
    let score = 0;
    for (const letter of word) {
      score += letter.charCodeAt(0) - 96;
    }
    return score;
  });

  let highestScore = 0;
  let highestIndex = 0;

  for (let i = 0; i < scores.length; i++) {
    if (scores[i] > highestScore) {
      highestScore = scores[i];
      highestIndex = i;
    }
  }

  return words[highestIndex];
}
```

### 📖 Penjelasan

- Pisahkan string input menjadi array kata-kata menggunakan method `split`.
- Gunakan method `map` untuk **menghitung skor setiap kata**. Untuk setiap huruf dalam sebuah kata, kita mendapatkan kode karakternya menggunakan `charCodeAt(0)` dan mengurangi 96 untuk mendapatkan posisinya dalam alfabet (misalnya, `a` menjadi 1, `b` menjadi 2, dan seterusnya). Kita menjumlahkan posisi-posisi ini untuk mendapatkan skor kata tersebut.
- Temukan **indeks kata dengan skor tertinggi** menggunakan sebuah loop. Jika skor saat ini lebih besar dari skor tertinggi yang ditemukan sejauh ini, kita perbarui variabel `highestScore` dan `highestIndex`.
- Kembalikan kata dengan skor tertinggi menggunakan `highestIndex`.

</details>

<details>
  <summary>🔍 Klik untuk Solusi 2</summary>

Solusi ini terlihat sedikit lebih **bersih** dibanding solusi sebelumnya, namun tidak seefisien itu (perbedaannya bisa diabaikan). Solusi ini menggunakan method `reduce` untuk menghitung skor setiap kata, dan method `Math.max` untuk menemukan skor tertinggi.

```js
function highestScoringWord(str) {
  const words = str.split(' ');

  const scores = words.map((word) =>
    Array.from(word).reduce(
      (score, letter) => score + letter.charCodeAt(0) - 96,
      0
    )
  );

  const highestScore = Math.max(...scores);
  const highestIndex = scores.indexOf(highestScore);

  return words[highestIndex];
}
```

### 📖 Penjelasan

- Pisahkan string input menjadi array kata-kata menggunakan method `split`.
- Gunakan method `map` untuk **menghitung skor setiap kata**.
- Gunakan method `reduce` untuk **menjumlahkan skor** setiap huruf dalam sebuah kata. Untuk setiap huruf, kita mendapatkan kode karakternya menggunakan `charCodeAt(0)` dan mengurangi 96 untuk mendapatkan posisinya dalam alfabet (misalnya, `a` menjadi 1, `b` menjadi 2, dan seterusnya). Kita menjumlahkan posisi-posisi ini untuk mendapatkan skor kata tersebut.
- Temukan **skor tertinggi** menggunakan method `Math.max`.
- Temukan **indeks kata** dengan skor tertinggi menggunakan method `indexOf`.
- Kembalikan kata dengan skor tertinggi menggunakan `highestIndex`.

</details>

<details>
  <summary>🔍 Klik untuk Solusi 3 — Imperatif Teroptimasi</summary>

Solusi ini merupakan **penyempurnaan dari Solusi 1**. Menggunakan gaya imperatif dengan satu loop tunggal yang lebih efisien, ditambah **edge case handling** untuk input kosong, dan inisialisasi `highestScore` dengan `-Infinity` agar lebih mathematically correct.

```js
const highestScoringWord = (sentence) => {
  if (!sentence) return ''

  const words = sentence.split(' ')

  let highestScore = -Infinity
  let highestWord = ''

  for (const word of words) {
    let score = 0

    for (const char of word) {
      score += char.charCodeAt(0) - 96
    }

    if (score > highestScore) {
      highestScore = score
      highestWord = word
    }
  }

  return highestWord
}
```

### 📖 Penjelasan

- Tambahkan pengecekan `if (!sentence) return ''` untuk menangani **input kosong atau falsy** sejak awal.
- Pisahkan string menjadi array kata menggunakan `split`.
- Inisialisasi `highestScore` dengan `-Infinity` — lebih aman secara matematis dibanding `0`, karena memastikan skor pertama apapun pasti menang di iterasi awal.
- Gunakan **satu loop tunggal** — hitung skor dan bandingkan langsung tanpa membuat array `scores` terpisah, sehingga **lebih hemat memori**.
- Simpan langsung `highestWord` (string kata) alih-alih `highestIndex`, membuat kode lebih intuitif.

</details>

<details>
  <summary>🔍 Klik untuk Solusi 4 — Functional Modular</summary>

Solusi ini menggunakan pendekatan **functional programming** dengan memisahkan logika scoring ke helper function `getWordScore`. Cocok untuk kode yang mengutamakan **modularitas dan reusability**.

```js
const getWordScore = (word) =>
  [...word].reduce((score, char) => score + char.charCodeAt(0) - 96, 0)

const highestScoringWord = (str) => {
  if (!str) return ''
  
  return str
    .split(' ')
    .map(word => ({ word, score: getWordScore(word) }))
    .reduce((best, current) =>
      current.score > best.score ? current : best
    ).word
}
```

### 📖 Penjelasan

- `getWordScore` adalah **helper function** terpisah yang bertanggung jawab menghitung skor satu kata — bisa digunakan ulang di bagian kode lain jika dibutuhkan.
- Spread operator `[...word]` digunakan sebagai alternatif `Array.from(word)` yang lebih ringkas.
- `map` mengubah setiap kata menjadi object `{ word, score }` agar skor dan kata selalu berpasangan selama proses `reduce`.
- `reduce` membandingkan setiap object dan mempertahankan yang memiliki **skor tertinggi**.
- Di akhir chain, `.word` mengambil string kata dari object pemenang.

</details>

---

## 📊 Perbandingan Semua Solusi

| Aspek | Solusi 1 | Solusi 2 | Solusi 3 | Solusi 4 |
|---|---|---|---|---|
| **Gaya** | Imperatif | Functional | Imperatif | Functional |
| **Edge case handling** | ❌ | ❌ | ✅ | ✅ |
| **Efisiensi memori** | Sedang | Boros | ✅ Terbaik | Sedang |
| **Modularitas** | ❌ | ❌ | ❌ | ✅ Terbaik |
| **Keterbacaan** | ✅ Linear | Sedang | ✅ Linear | Sedang |
| **Jumlah iterasi** | 2x | 2x | 1x | 2x |

> 💡 **Rekomendasi:** Gunakan **Solusi 3** untuk performa terbaik, atau **Solusi 4** jika mengutamakan modularitas dan gaya functional programming.

---

## 🧪 Kasus Uji

```js
test('Menemukan kata dengan skor tertinggi', () => {
  expect(highestScoringWord('hello my name is xavier')).toBe('xavier');
  expect(highestScoringWord('what time are we climbing up the volcano')).toBe(
    'volcano'
  );
  expect(highestScoringWord('take me to semynak')).toBe('semynak');
});
```

> 💬 **Ingat** untuk menggunakan kasus uji yang disediakan guna **memverifikasi solusimu**!