# 🗂️ Sets — Koleksi Nilai Unik di JavaScript

> Pernah punya daftar nama tapi isinya duplikat semua? Nah, **Set** hadir untuk menyelesaikan masalah itu.
> Set adalah struktur data yang **hanya menyimpan nilai unik** — kalau kamu coba masukin nilai yang sama dua kali, yang kedua langsung diabaikan otomatis. Simpel tapi sangat berguna!

---

## 🤔 Apa Bedanya Set dengan Array?

Sebelum mulai, penting buat tahu perbedaannya dulu:

| Fitur | Array | Set |
|---|---|---|
| Boleh duplikat? | ✅ Ya | ❌ Tidak |
| Punya index? | ✅ Ya (`arr[0]`) | ❌ Tidak |
| Urutan tersimpan? | ✅ Ya | ✅ Ya (insertion order) |

Jadi **Set itu mirip array, tapi tanpa index dan tanpa duplikat.**

---

## 🏗️ Membuat Set

Oke, mulai dari yang paling dasar dulu — cara bikin Set kosong.
Kita pakai keyword `new` dan constructor `Set()`:

```js
const nameSet = new Set();
```

> Ini seperti bikin wadah kosong. Belum ada isinya, tapi siap diisi kapan saja.

---

Sekarang, kita bisa langsung isi Set-nya saat dibuat dengan **meneruskan sebuah array** ke dalam `Set()`:

```js
const nameSet = new Set(['John', 'Jane', 'Joe']);
```

Coba tampilkan ke console untuk lihat hasilnya:

```js
console.log(nameSet); // Set { 'John', 'Jane', 'Joe' }
```

> Yep, langsung keisi tiga nama. Mudah kan?

---

Nah, sekarang coba iseng — masukkan nilai **yang sama lebih dari sekali**:

```js
const nameSet = new Set(['John', 'Jane', 'Joe', 'Jane', 'Joe']);
```

```js
console.log(nameSet); // Set { 'John', 'Jane', 'Joe' }
```

> 🎉 Lihat? `'Jane'` dan `'Joe'` yang duplikat langsung dibuang. Set hanya menyimpan satu salinan dari setiap nilai. Inilah **kekuatan utama Set!**

---

## ➕ Menambahkan Nilai Baru

Setelah Set dibuat, kita bisa menambah nilai baru kapan saja pakai method `add()`.
Coba tambahkan dua nama baru ke `nameSet`:

```js
nameSet.add('Jack');
nameSet.add('Jill');
```

Tampilkan hasilnya:

```js
console.log(nameSet); // Set { 'John', 'Jane', 'Joe', 'Jack', 'Jill' }
```

> Nilai baru selalu ditambahkan di **bagian paling akhir**, sesuai urutan waktu kamu masukinnya (*insertion order*).

---

## 🔍 Cek — Apakah Nilai Ini Ada?

Kadang kita cuma perlu tahu: *"hei, apakah nilai ini ada di Set-ku?"*
Gunakan method `has()` — hasilnya `true` atau `false`:

```js
console.log(nameSet.has('Jack')); // true
console.log(nameSet.has('Budi')); // false
```

> Ini lebih cepat dan efisien dibanding pakai `.includes()` pada array untuk dataset besar.

---

## 🗑️ Menghapus Satu Nilai

Kalau mau hapus nilai tertentu, pakai method `delete()`.
Misal kita hapus `'Jack'`:

```js
nameSet.delete('Jack');
```

Cek hasilnya — `'Jack'` sudah tidak ada:

```js
console.log(nameSet); // Set { 'John', 'Jane', 'Joe', 'Jill' }
```

---

## 📏 Berapa Banyak Nilainya? — `size`

Untuk tahu **jumlah elemen** dalam Set, gunakan properti `size`.
Ini mirip seperti `.length` pada array, tapi namanya berbeda:

```js
console.log(nameSet.size); // 4
```

> Perhatikan: ini **properti**, bukan method. Jadi tidak pakai tanda kurung `()`.

---

## 📋 Ambil Semua Nilai — `values()`

Kalau mau lihat semua nilai yang ada di dalam Set, gunakan method `values()`:

```js
console.log(nameSet.values()); // [Set Iterator] { 'John', 'Jane', 'Joe', 'Jill' }
```

> Method ini mengembalikan sebuah **Set Iterator** — bukan array biasa, tapi objek khusus yang bisa kita iterasi. Untuk mengaksesnya satu per satu, kita butuh loop.

---

## 🔄 Looping — Baca Satu per Satu

Untuk membaca setiap nilai dalam Set, kita gunakan loop `for...of`.
Coba loop melalui `nameSet` dan tampilkan tiap nilainya:

```js
for (const value of nameSet) {
  console.log(value);
}

// Output:
// John
// Jane
// Joe
// Jill
```

> Loop ini mengikuti **insertion order** — urutan sesuai kapan nilai dimasukkan.

---

## 🔁 Konversi Set ➜ Array

Set itu bukan array, jadi kita tidak bisa langsung pakai method array seperti `.map()` atau `.filter()`.
Solusinya: **ubah dulu jadi array** pakai `Array.from()`:

```js
const nameArray = Array.from(nameSet);
console.log(nameArray); // [ 'John', 'Jane', 'Joe', 'Jill' ]
```

> Setelah jadi array, semua method array bisa digunakan bebas!

---

## 🔀 Konversi Array ➜ Set

Sebaliknya, kalau kamu punya array dan **mau buang semua duplikatnya**, tinggal lempar ke `Set()`:

```js
const names = ['Ali', 'Budi', 'Ali', 'Citra', 'Budi'];
const uniqueNames = new Set(names);

console.log(uniqueNames); // Set { 'Ali', 'Budi', 'Citra' }
```

> 💡 Trik ini sangat sering dipakai di dunia nyata untuk **deduplikasi data** dengan cepat dan bersih.

---

## 🧹 Hapus Semua Sekaligus — `clear()`

Kalau mau **kosongkan seluruh Set** dalam sekali jalan, gunakan method `clear()`:

```js
nameSet.clear();
console.log(nameSet.size); // 0
```

> Setelah `clear()`, Set masih ada — hanya isinya yang dikosongkan. Beda dengan menghapus variabelnya sama sekali.

---

## 🧠 Ringkasan Method & Properti

| Method / Properti | Kegunaan |
|---|---|
| `new Set()` | Membuat Set baru |
| `.add(value)` | Menambahkan nilai |
| `.has(value)` | Cek apakah nilai ada (`true`/`false`) |
| `.delete(value)` | Menghapus satu nilai |
| `.clear()` | Menghapus semua nilai |
| `.size` | Jumlah elemen dalam Set |
| `.values()` | Mengembalikan iterator semua nilai |
| `Array.from(set)` | Mengonversi Set menjadi Array |
| `new Set(array)` | Mengonversi Array menjadi Set |

---

> 🚀 Sudah paham dasarnya? Sekarang saatnya latihan dengan **challenges** menggunakan Sets!
