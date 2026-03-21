# 🏷️ Catatan Belajar: Hashtag Generator

> 📝 Dokumentasi pribadi dari video tutorial JavaScript — Challenge: Hashtag Generator

---

## 📚 Daftar Isi

- 🔍 [Apa Itu Challenge Ini?](#pengenalan)
- 📋 [Aturan & Contoh Output](#aturan)
- 💡 [Tips & Method yang Dipakai](#tips)
- 🛠️ [Solusi 1 — Pakai `map()`](#solusi-1)
- ⚡ [Solusi 2 — Pakai `reduce()`](#solusi-2)
- 🧪 [Hasil Test](#test)

---

<a name="pengenalan"></a>
## 🔍 Apa Itu Challenge Ini?

Kita diminta membuat sebuah **function** bernama `generateHashtag` yang menerima satu argumen berupa string, lalu mengembalikan string yang sudah diformat jadi hashtag.

```js
function generateHashtag(str) {
  // ... logika di sini
}
```

Simpelnya: input teks biasa → output string hashtag dengan kapitalisasi di tiap kata.

---

<a name="aturan"></a>
## 📋 Aturan & Contoh Output

Ada dua kondisi di mana function harus mengembalikan **`false`**:

| Kondisi | Return |
|---|---|
| Input string **kosong** atau hanya spasi | `false` |
| Hashtag yang dihasilkan **lebih dari 140 karakter** | `false` |

### Contoh output yang benar:

```js
generateHashtag("JavaScript is awesome")  // "#JavaScriptIsAwesome"
generateHashtag("hello world")            // "#HelloWorld"
generateHashtag("")                       // false
generateHashtag("teks sangat panjang...") // false (jika > 140 karakter)
```

> 💡 Perhatikan: huruf pertama **setiap kata** harus kapital, apapun inputnya.

---

<a name="tips"></a>
## 💡 Tips & Method yang Dipakai

Sebelum nulis kode, ada beberapa method JavaScript yang berguna banget di sini:

| Method | Fungsi |
|---|---|
| `trim()` | Menghapus spasi di awal dan akhir string |
| `split()` | Memecah string jadi array (berdasarkan pemisah tertentu) |
| `map()` | Mengubah setiap elemen array jadi nilai baru |
| `join()` | Menggabungkan array kembali jadi string |
| `charAt(0)` | Mengambil karakter di index ke-0 (huruf pertama) |
| `toUpperCase()` | Mengubah huruf jadi kapital |
| `slice(1)` | Mengambil sisa string mulai index ke-1 |
| `reduce()` | Mereduksi array menjadi satu nilai (bisa string!) |

---

<a name="solusi-1"></a>
## 🛠️ Solusi 1 — Pakai `map()`

Solusi pertama ini lebih mudah dibaca karena langkah-langkahnya jelas satu per satu.

### Langkah-langkahnya:

**① Cek dulu apakah string kosong**

```js
if (str.trim() === '') {
  return false;
}
```

`trim()` dipakai dulu biar string yang isinya cuma spasi juga ketangkap. Kalau setelah di-trim hasilnya string kosong `''`, langsung return `false`.

---

**② Pecah string jadi array kata-kata**

```js
const words = str.trim().split(/\s+/);
```

`split(/\s+/)` — ini pakai **regular expression** `/\s+/` yang artinya: pecah di setiap whitespace (spasi, tab, newline), satu atau lebih. Lebih akurat dibanding `split(' ')` biasa, karena bisa menangani spasi ganda atau spasi aneh.

Contoh hasil: `"hello world"` → `["hello", "world"]`

---

**③ Kapitalkan huruf pertama tiap kata pakai `map()`**

```js
const capitalizedWords = words.map(
  (word) => word.charAt(0).toUpperCase() + word.slice(1)
);
```

Di sini `map()` menelusuri setiap kata, lalu:
- `word.charAt(0).toUpperCase()` → ambil huruf pertama, jadikan kapital
- `word.slice(1)` → ambil sisa kata (dari index ke-1 sampai akhir), biarkan apa adanya

Contoh: `"hello"` → `"H"` + `"ello"` → `"Hello"` ✅

---

**④ Gabung jadi string dengan prefix `#`**

```js
const hashtag = '#' + capitalizedWords.join('');
```

`join('')` menggabungkan semua elemen array tanpa pemisah apapun.

Contoh: `["Hello", "World"]` → `"HelloWorld"` → lalu ditambah `#` di depan → `"#HelloWorld"` 🎉

---

**⑤ Cek panjang hashtag**

```js
return hashtag.length > 140 ? false : hashtag;
```

Pakai **ternary operator** — kalau panjang lebih dari 140 karakter, return `false`, kalau tidak, return hashtagnya.

---

### Kode Lengkap Solusi 1:

```js
function generateHashtag(str) {
  if (str.trim() === '') {
    return false;
  }

  const words = str.trim().split(/\s+/);

  const capitalizedWords = words.map(
    (word) => word.charAt(0).toUpperCase() + word.slice(1)
  );

  const hashtag = '#' + capitalizedWords.join('');

  return hashtag.length > 140 ? false : hashtag;
}
```

---

<a name="solusi-2"></a>
## ⚡ Solusi 2 — Pakai `reduce()`

Solusi kedua ini lebih ringkas. Kuncinya ada di penggunaan `reduce()` dengan **nilai awal berupa string `'#'`**.

> 🤔 Biasanya `reduce()` dipakai buat menjumlahkan angka, tapi ternyata bisa juga dipakai buat membangun string!

```js
function generateHashtag(str) {
  const hashtag = str.split(' ').reduce(function (tag, word) {
    return tag + word.charAt(0).toUpperCase() + word.substring(1);
  }, '#');

  return hashtag.length == 1 || hashtag.length > 140 ? false : hashtag;
}
```

### Cara kerjanya:

**`reduce(callback, '#')`** — nilai awal akumulator (`tag`) adalah string `'#'`.

Di setiap iterasi, `tag` digabung dengan:
- `word.charAt(0).toUpperCase()` → huruf pertama kata, kapital
- `word.substring(1)` → sisa kata (sama fungsinya dengan `slice(1)`)

Jadi prosesnya seperti ini:
```
Iterasi 1: tag = '#'        + 'H' + 'ello' = '#Hello'
Iterasi 2: tag = '#Hello'   + 'W' + 'orld' = '#HelloWorld'
```

---

### Pengecekan false:

```js
return hashtag.length == 1 || hashtag.length > 140 ? false : hashtag;
```

Kenapa cek `length == 1`? Karena kalau input string kosong atau spasi semua, `reduce()` tetap jalan tapi hasilnya cuma `'#'` (panjang = 1). Jadi kondisi ini menggantikan `trim() === ''` dari solusi pertama.

---

### Perbandingan Solusi 1 vs Solusi 2:

| | Solusi 1 (`map`) | Solusi 2 (`reduce`) |
|---|---|---|
| Keterbacaan | ✅ Lebih mudah dibaca | 🔶 Lebih ringkas |
| Pengecekan input kosong | `trim() === ''` | `length == 1` |
| Method pemisah spasi | `/\s+/` (regex) | `' '` (spasi biasa) |
| Pengecekan panjang | Terpisah di akhir | Di ternary langsung |

---

<a name="test"></a>
## 🧪 Hasil Test

File test mengecek empat kasus:

```js
// ✅ Kalimat normal dengan spasi
generateHashtag(' Hello there thanks for trying my Kata')
// Expected: '#HelloThereThanksForTryingMyKata'

// ✅ Spasi ganda dan leading/trailing space
generateHashtag('    Hello     World   ')
// Expected: '#HelloWorld'

// ✅ String kosong
generateHashtag('')
// Expected: false

// ✅ Lebih dari 140 karakter
generateHashtag('This is a very very very...')
// Expected: false
```

Kedua solusi **lulus semua test** ✅

---

> 🗒️ **Catatan pribadi:** Solusi 1 lebih gampang dipahami saat pertama belajar. Solusi 2 lebih keren karena compact, tapi perlu paham dulu cara `reduce()` bekerja dengan string. Latih dua-duanya!