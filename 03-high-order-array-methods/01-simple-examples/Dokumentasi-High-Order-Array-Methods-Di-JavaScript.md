# 🚀 High Order Array Methods di JavaScript

> 📝 **Catatan:** Dokumentasi ini dibuat dari tutorial video tentang array methods di JavaScript. Cocok banget buat kamu yang masih newbie atau mau ngerefresh ingatan!

---

## 📋 Daftar Isi

- 🎯 [Pengenalan](#pengenalan)
- 🗺️ [map — Transformasi Tiap Elemen](#map)
- 🔽 [filter — Saring Elemen Berdasarkan Kondisi](#filter)
- ➕ [reduce — Akumulasi Jadi Satu Nilai](#reduce)
- 🔁 [forEach — Loop Sederhana](#foreach)
- 🔍 [find — Cari Elemen Pertama yang Cocok](#find)
- ✅ [some — Cek Minimal Satu yang Cocok](#some)
- 💯 [every — Cek Semua Harus Cocok](#every)
- 📊 [Perbandingan Cepat](#perbandingan)

---

<a name="pengenalan"></a>
## 🎯 Pengenalan

Selama ini kita sering pakai **loop** (terutama `for` loop) untuk iterasi array. Loop memang penting — itu salah satu fondasi utama di JavaScript maupun ilmu komputer secara umum.

Tapi, JavaScript punya cara yang lebih **bersih dan lebih pendek** untuk melakukan hal serupa: yaitu **High Order Array Methods** seperti `map`, `filter`, `reduce`, dan lainnya.

> 💡 **Perlu tahu:** Pakai `for` loop memang sedikit lebih efisien secara performa, tapi perbedaannya sangat kecil — kecuali kamu bekerja dengan data yang sangat besar. Untuk kode sehari-hari, **kode yang bersih dan mudah dibaca** jauh lebih berharga.

Semua contoh di bawah menggunakan array sederhana ini:

```javascript
const numbers = [1, 2, 3, 4, 5];
```

---

<a name="map"></a>
## 🗺️ `map` — Transformasi Tiap Elemen

**Apa itu?**
`map` akan memproses setiap elemen dalam array menggunakan sebuah fungsi, lalu **mengembalikan array baru** berisi hasil transformasinya. Array aslinya **tidak berubah**.

> ⚠️ Bedanya sama `forEach`: kalau `forEach` cuma iterasi tanpa mengembalikan apa-apa, `map` **selalu mengembalikan array baru**.

**Contoh — menggandakan setiap angka:**

```javascript
// Cara panjang (dengan return eksplisit)
const doubledNumbers = numbers.map((num) => {
  return num * 2;
});

// Cara pendek (implicit return — lebih umum dipakai)
const doubledNumbers = numbers.map((num) => num * 2);

console.log(doubledNumbers); // [2, 4, 6, 8, 10]
```

**Parameter yang bisa dipakai di dalam callback:**

```javascript
numbers.map((num, index, array) => {
  console.log(num);    // nilai elemen: 1, 2, 3, 4, 5
  console.log(index);  // indeks elemen: 0, 1, 2, 3, 4
  console.log(array);  // array asli: [1, 2, 3, 4, 5]
});
```

> 💡 Dalam praktiknya, kamu hampir selalu cukup pakai `num` saja. `index` dan `array` hanya kalau memang dibutuhkan.

---

<a name="filter"></a>
## 🔽 `filter` — Saring Elemen Berdasarkan Kondisi

**Apa itu?**
`filter` membuat **array baru** yang hanya berisi elemen-elemen yang **memenuhi kondisi** tertentu. Array aslinya tetap tidak berubah.

**Contoh — ambil hanya angka genap:**

```javascript
const evenNumbers = numbers.filter((num) => num % 2 === 0);

console.log(evenNumbers); // [2, 4]
console.log(numbers);     // [1, 2, 3, 4, 5] — array asli tidak berubah!
```

**Contoh lain — ambil angka yang lebih besar dari 2:**

```javascript
const bigNumbers = numbers.filter((num) => num > 2);

console.log(bigNumbers); // [3, 4, 5]
```

> 🔑 **Intinya:** `filter` hanya memasukkan elemen ke array baru kalau kondisi yang kamu tulis **bernilai `true`**.

---

<a name="reduce"></a>
## ➕ `reduce` — Akumulasi Jadi Satu Nilai

**Apa itu?**
`reduce` "merangkum" semua elemen array menjadi **satu nilai tunggal** menggunakan sebuah fungsi. Sangat berguna misalnya untuk menghitung total belanja, menjumlahkan angka, dan sebagainya.

**Struktur dasarnya:**

```javascript
array.reduce((accumulator, currentElement) => {
  return accumulator + currentElement;
}, nilaiAwal);
```

- `accumulator` (biasa disebut `total`) → nilai yang terus diakumulasikan
- `currentElement` (biasa disebut `num`) → elemen array saat ini
- `nilaiAwal` → nilai awal dari accumulator (biasanya `0`)

**Contoh — menjumlahkan semua angka:**

```javascript
const sum = numbers.reduce((total, num) => total + num, 0);

console.log(sum); // 15 (karena 1+2+3+4+5 = 15)
```

**Kalau accumulator dimulai dari nilai lain:**

```javascript
const sum = numbers.reduce((total, num) => total + num, 15);

console.log(sum); // 30 (mulai dari 15, lalu ditambah 1+2+3+4+5)
```

> 💡 Untuk kebanyakan kasus, kamu akan set nilai awal ke `0`.

---

<a name="foreach"></a>
## 🔁 `forEach` — Loop Sederhana

**Apa itu?**
`forEach` adalah versi lebih ringkas dari `for` loop biasa. Dia **tidak mengembalikan** apa-apa — murni untuk iterasi dan menjalankan sesuatu untuk tiap elemen.

**Perbandingan `for` loop vs `forEach`:**

```javascript
// Cara lama — for loop
for (let i = 0; i < numbers.length; i++) {
  console.log(numbers[i]);
}

// Cara baru — forEach (lebih bersih!)
numbers.forEach((num) => console.log(num));
// Output: 1, 2, 3, 4, 5
```

> 🤔 **Kapan pakai `forEach`?** Kalau kamu cuma mau *melakukan sesuatu* untuk tiap elemen (misalnya log ke console, update DOM, kirim data) tanpa perlu array baru. Kalau kamu butuh array baru hasil transformasi, pakai `map`.

---

<a name="find"></a>
## 🔍 `find` — Cari Elemen Pertama yang Cocok

**Apa itu?**
`find` mengembalikan **elemen pertama** yang memenuhi kondisi tertentu. Bukan array — tapi langsung nilainya.

**Contoh — cari angka pertama yang lebih besar dari 2:**

```javascript
const foundNumber = numbers.find((num) => num > 2);

console.log(foundNumber); // 3  (bukan [3, 4, 5] — hanya yang pertama!)
```

> 🆚 **Bedanya sama `filter`:**
> - `filter` → mengembalikan **semua** elemen yang cocok (dalam bentuk array)
> - `find` → mengembalikan **hanya elemen pertama** yang cocok (nilainya langsung)

---

<a name="some"></a>
## ✅ `some` — Cek Minimal Satu yang Cocok

**Apa itu?**
`some` mengecek apakah **setidaknya satu** elemen dalam array memenuhi kondisi. Hasilnya adalah **boolean** (`true` atau `false`).

**Contoh — cek apakah ada angka genap:**

```javascript
const hasEvenNumber = numbers.some((num) => num % 2 === 0);

console.log(hasEvenNumber); // true (ada 2 dan 4)
```

**Contoh — cek apakah ada angka lebih dari 5:**

```javascript
const hasNumGreaterThanFive = numbers.some((num) => num > 5);

console.log(hasNumGreaterThanFive); // false (tidak ada yang > 5)
```

---

<a name="every"></a>
## 💯 `every` — Cek Semua Harus Cocok

**Apa itu?**
`every` mirip dengan `some`, tapi dia mengecek apakah **semua** elemen memenuhi kondisi. Hasilnya juga **boolean**.

**Contoh — cek apakah semua angka lebih besar dari 0:**

```javascript
const allNumsGreaterThanZero = numbers.every((num) => num > 0);

console.log(allNumsGreaterThanZero); // true
```

**Kalau ada satu saja yang tidak memenuhi syarat, hasilnya `false`:**

```javascript
const numbers2 = [1, 2, 3, 4, 5, -1]; // ada -1!
const result = numbers2.every((num) => num > 0);

console.log(result); // false (karena ada -1)
```

> 🆚 **Bedanya `some` vs `every`:**
> - `some` → `true` kalau **minimal satu** elemen cocok
> - `every` → `true` kalau **semua** elemen cocok

---

<a name="perbandingan"></a>
## 📊 Perbandingan Cepat

| Method | Mengembalikan | Kapan Dipakai |
|--------|--------------|---------------|
| `map` | Array baru (hasil transformasi) | Ubah setiap elemen jadi sesuatu yang lain |
| `filter` | Array baru (elemen yang lolos) | Saring elemen berdasarkan kondisi |
| `reduce` | Satu nilai | Akumulasi/jumlahkan semua elemen |
| `forEach` | `undefined` (tidak ada) | Lakukan sesuatu untuk tiap elemen |
| `find` | Satu elemen pertama yang cocok | Cari satu elemen spesifik |
| `some` | `true` / `false` | Cek apakah ada yang cocok |
| `every` | `true` / `false` | Cek apakah semua cocok |

---

> ✨ **Tips akhir:** Jangan khawatir kalau belum hafal semua. Mulai dari `map` dan `filter` — dua method itu yang paling sering kamu pakai di dunia nyata!