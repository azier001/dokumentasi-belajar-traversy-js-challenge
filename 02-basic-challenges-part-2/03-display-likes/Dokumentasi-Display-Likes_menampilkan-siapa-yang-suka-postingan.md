# 👍 Challenge: Display Likes

Dokumentasi pribadi dari video tutorial JavaScript — buat pemula yang baru belajar ngoding!

---

## 📋 Daftar Isi

- 🎯 [Apa yang Mau Kita Buat?](#apa-yang-mau-kita-buat)
- 📌 [Aturan Fungsi](#aturan-fungsi)
- 🔍 [Contoh Input & Output](#contoh-input--output)
- 🏗️ [Membangun Fungsinya Step by Step](#membangun-fungsinya-step-by-step)
- 💡 [Penjelasan Logika](#penjelasan-logika)
- ✅ [Kode Lengkap](#kode-lengkap)
- 🧪 [Menjalankan & Testing](#menjalankan--testing)

---

<a name="apa-yang-mau-kita-buat"></a>
## 🎯 Apa yang Mau Kita Buat?

Kita akan membuat sebuah **fungsi bernama `displayLikes`** yang menerima array berisi nama-nama orang yang menyukai sebuah postingan, lalu mengembalikan kalimat yang mendeskripsikan siapa saja yang like.

Kebayang kayak fitur "likes" di Facebook atau Instagram — tapi dalam bentuk teks!

---

<a name="aturan-fungsi"></a>
## 📌 Aturan Fungsi

Fungsinya harus menghasilkan output yang berbeda tergantung **berapa banyak orang** yang like:

| Jumlah Orang | Format Output |
|---|---|
| 0 orang | `no one likes this` |
| 1 orang | `{nama} likes this` |
| 2 orang | `{nama1} and {nama2} like this` |
| 3 orang | `{nama1}, {nama2} and {nama3} like this` |
| Lebih dari 3 | `{nama1}, {nama2} and {x} others like this` |

> ⚠️ **Catatan:** Input array hanya boleh berisi string (nama orang).

---

<a name="contoh-input--output"></a>
## 🔍 Contoh Input & Output

```js
displayLikes([])
// → 'no one likes this'

displayLikes(['Peter'])
// → 'Peter likes this'

displayLikes(['Jacob', 'Alex'])
// → 'Jacob and Alex like this'

displayLikes(['Max', 'John', 'Mark'])
// → 'Max, John and Mark like this'

displayLikes(['Alex', 'Jacob', 'Mark', 'Max'])
// → 'Alex, Jacob and 2 others like this'

displayLikes(['Alex', 'Jacob', 'Mark', 'Max', 'Jill'])
// → 'Alex, Jacob and 3 others like this'
```

---

<a name="membangun-fungsinya-step-by-step"></a>
## 🏗️ Membangun Fungsinya Step by Step

### Langkah 1 — Buat fungsi dan ambil panjang array

Pertama, kita buat fungsinya dan simpan panjang array ke variabel `length`. Ini berguna biar nggak harus nulis `names.length` berulang kali.

```js
function displayLikes(names) {
  const length = names.length;
  // ...
}
```

---

### Langkah 2 — Tangani kasus 0 orang (array kosong)

Kalau arraynya kosong, langsung return string khusus.

```js
if (length === 0) {
  return 'no one likes this';
}
```

---

### Langkah 3 — Tangani kasus 1 orang

Kalau ada tepat 1 nama, ambil nama pertama dengan index `[0]` dan gunakan **template literal** untuk menyisipkannya ke dalam kalimat.

```js
else if (length === 1) {
  return `${names[0]} likes this`;
}
```

> 💬 **Template literal** itu string yang pakai backtick `` ` `` dan bisa menyisipkan variabel pakai `${}`.

---

### Langkah 4 — Tangani kasus 2 orang

Ambil nama pertama (`[0]`) dan kedua (`[1]`), gabungkan dengan kata `and`.

```js
else if (length === 2) {
  return `${names[0]} and ${names[1]} like this`;
}
```

---

### Langkah 5 — Tangani kasus 3 orang

Tampilkan semua tiga nama, dipisah koma, dengan `and` sebelum nama terakhir.

```js
else if (length === 3) {
  return `${names[0]}, ${names[1]} and ${names[2]} like this`;
}
```

---

### Langkah 6 — Tangani kasus lebih dari 3 orang

Tampilkan hanya 2 nama pertama, lalu hitung sisanya dengan `length - 2`.

```js
else {
  return `${names[0]}, ${names[1]} and ${length - 2} others like this`;
}
```

> 🤔 **Kenapa `length - 2`?** Karena kita sudah menampilkan 2 nama duluan, jadi sisanya adalah total orang dikurangi 2.
>
> Contoh: 5 orang, tampil 2 nama → `5 - 2 = 3 others`

---

<a name="penjelasan-logika"></a>
## 💡 Penjelasan Logika

Solusinya menggunakan kondisi yang mengecek nilai `length` — bisa pakai **`if / else if / else`** atau **`switch`**, keduanya menghasilkan output yang sama persis.

Pola alurnya seperti ini:

```
Array masuk
    ↓
Cek length
    ↓
0? → "no one likes this"
1? → "{nama} likes this"
2? → "{nama1} and {nama2} like this"
3? → "{nama1}, {nama2} and {nama3} like this"
lainnya? → "{nama1}, {nama2} and {x} others like this"
```

---

<a name="kode-lengkap"></a>
## ✅ Kode Lengkap

**`display-likes.js`** — Versi `if/else if`

```js
// Versi if/else
function displayLikes(names) {
  const length = names.length;

  if (length === 0) {
    return 'no one likes this';
  } else if (length === 1) {
    return `${names[0]} likes this`;
  } else if (length === 2) {
    return `${names[0]} and ${names[1]} like this`;
  } else if (length === 3) {
    return `${names[0]}, ${names[1]} and ${names[2]} like this`;
  } else {
    return `${names[0]}, ${names[1]} and ${length - 2} others like this`;
  }
}

module.exports = displayLikes;
```

---

**`display-likes.js`** — Versi `switch` (alternatif yang lebih rapi)

Cara kerja `switch` adalah mengecek nilai `length` sekali, lalu langsung lompat ke `case` yang cocok. Hasilnya sama persis, tapi strukturnya lebih bersih kalau kasusnya banyak.

```js
// Versi switch
function displayLikes(names) {
  const length = names.length;

  switch (length) {
    case 0:
      return 'no one likes this';

    case 1:
      return `${names[0]} likes this`;

    case 2:
      return `${names[0]} and ${names[1]} like this`;

    case 3:
      return `${names[0]}, ${names[1]} and ${names[2]} like this`;

    default:
      return `${names[0]}, ${names[1]} and ${length - 2} others like this`;
  }
}

module.exports = displayLikes;
```

> 💡 **`default`** di `switch` itu sama fungsinya kayak `else` — dijalankan kalau nggak ada `case` yang cocok, yaitu saat `length` lebih dari 3.

---

**`display-likes-run.js`** — file untuk coba jalanin langsung

```js
const displayLikes = require('./display-likes');

const result = displayLikes(['Alex', 'Jacob', 'Mark', 'Max', 'Jill']);

console.log(result);
// Output: Alex, Jacob and 3 others like this
```

---

<a name="menjalankan--testing"></a>
## 🧪 Menjalankan & Testing

### Coba jalankan langsung:

```bash
node display-likes-run.js
```

Output yang diharapkan:

```
Alex, Jacob and 3 others like this
```

---

### Jalankan unit test:

```bash
npm test
```

Test mencakup semua kasus (0, 1, 2, 3, dan lebih dari 3 orang). Kalau semua ✅ passed, artinya fungsinya sudah benar!

**`display-likes.test.js`**

```js
test('Display Likes', () => {
  expect(displayLikes([])).toEqual('no one likes this');
  expect(displayLikes(['Peter'])).toEqual('Peter likes this');
  expect(displayLikes(['Jacob', 'Alex'])).toEqual('Jacob and Alex like this');
  expect(displayLikes(['Max', 'John', 'Mark'])).toEqual('Max, John and Mark like this');
  expect(displayLikes(['Alex', 'Jacob', 'Mark', 'Max'])).toEqual('Alex, Jacob and 2 others like this');
  expect(displayLikes(['Alex', 'Jacob', 'Mark', 'Max', 'Jill'])).toEqual('Alex, Jacob and 3 others like this');
});
```

---

> 🎉 **Challenge selesai!** Konsep utama yang dipraktikkan: array, `.length`, `if/else if/else`, `switch/case`, dan template literals.