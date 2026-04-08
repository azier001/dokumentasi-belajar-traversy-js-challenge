# 🗺️ Maps dalam JavaScript

> **Maps** merupakan struktur data yang ditambahkan ke JavaScript pada pembaruan `ES2015`. Dalam JavaScript, sebuah `map` adalah **kumpulan pasangan key-value**. Maps juga dikenal sebagai *dictionaries*, *hashmaps*, dan *associative arrays* di bahasa pemrograman lain. Maps digunakan untuk menyimpan data dengan cara yang **mengidentifikasi setiap elemen secara unik** dalam koleksi, yaitu dengan menggunakan sebuah **key** sebagai pengenal unik. Key tersebut kemudian digunakan untuk mengambil nilai (*value*) yang terkait.

---

## 🆚 Maps vs Objects

Maps mirip dengan objects karena keduanya memungkinkan kamu menetapkan keys ke values, mengambil values tersebut, menghapus keys, dan mendeteksi apakah sesuatu tersimpan pada sebuah key. **Objects lebih sering digunakan** karena sudah ada lebih lama, namun maps lebih unggul dalam kasus-kasus tertentu.

Perbedaan terbesar antara maps dan objects adalah:

- **Maps** → mengizinkan keys bertipe apa pun
- **Objects** → hanya mengizinkan `string`, `number`, dan `symbol` sebagai keys

Artinya, maps dapat menggunakan fungsi, objek, dan tipe primitif apa pun sebagai key.

Maps juga bisa memiliki **performa lebih baik** dalam skenario yang melibatkan penambahan dan penghapusan key-value pairs secara sering. Di sisi lain, **objects lebih unggul** dalam hal pencarian (*lookup*) key-value pairs.

---

## 🏗️ Membuat Map

Untuk membuat map, kita menggunakan keyword `new` dan constructor `Map()`. Mari kita buat sebuah map bernama `nameMap`:

```js
const nameMap = new Map();
```

Kita juga bisa meneruskan array of arrays ke dalam constructor `Map()`. Elemen pertama di setiap sub-array akan menjadi **key**, dan elemen kedua akan menjadi **value**. Kita bisa membuat map dengan beberapa key-value pairs seperti ini:

```js
const nameMap = new Map([
  [1, 'John'],
  [2, 'Jane'],
  [3, 'Joe'],
]);
```

Mari kita log mapnya:

```js
console.log(nameMap);
```

Kita bisa melihat bahwa map tersebut memiliki tiga key-value pairs. Keys-nya adalah angka `1`, `2`, dan `3`, dan values-nya adalah string `'John'`, `'Jane'`, dan `'Joe'`. Perhatikan bahwa contoh ini menggunakan **angka sebagai keys**. Kita bisa menggunakan tipe data apa pun sebagai key, termasuk objects dan functions. Mari kita buat map dengan berbagai tipe keys yang berbeda:

```js
const myFunction = () => {};
const emptyObj = {};

const map2 = new Map([
  ['name', 'John'],
  [1, 'number one'],
  [true, 'really true'],
  [null, 'null'],
  [myFunction, 'empty function'],
  [emptyObj, 'empty object'],
]);
```

---

## 🔍 Mengambil Data

Untuk mengambil data dari sebuah map, kita menggunakan method `get()`. Mari kita ambil value yang terkait dengan key `1` dari map `nameMap`:

```js
console.log(nameMap.get(1)); // John
```

Mari kita ambil values dari function dan object di map `map2`:

```js
console.log(map2.get(myFunction));
console.log(map2.get(emptyObj));
```

---

## ✏️ Menyimpan Data

Untuk menyimpan data ke dalam map, kita menggunakan method `set()`. Mari kita tambahkan beberapa key-value pairs baru ke map `nameMap`:

```js
nameMap.set(4, 'Jack');
nameMap.set(5, 'Jill');
```

Mari kita log mapnya:

```js
console.log(nameMap); // Map(5) { 1 => 'John', 2 => 'Jane', 3 => 'Joe', 4 => 'Jack', 5 => 'Jill' }
```

---

## ✅ Mengecek Apakah Key Ada

Untuk mengecek apakah sebuah key ada di dalam map, kita menggunakan method `has()`. Mari kita cek apakah key `1` ada di dalam map `nameMap`:

```js
console.log(nameMap.has(1)); // true
console.log(nameMap.has(6)); // false
```

---

## 🗑️ Menghapus Data

Untuk menghapus data dari sebuah map, kita menggunakan method `delete()`. Mari kita hapus key-value pair dengan key `1` dari map `nameMap`:

```js
nameMap.delete(1);
console.log(nameMap.has(1)); // false
```

---

## 📏 Mendapatkan Ukuran Map

Untuk mendapatkan ukuran sebuah map, kita menggunakan properti `size`. Mari kita log ukuran map `nameMap`:

```js
console.log(nameMap.size); // 4
```

---

## 🔄 Melakukan Iterasi pada Map

Untuk melakukan iterasi/loop pada sebuah map, kita bisa menggunakan loop `for...of`. Mari kita loop melalui map `nameMap` dan log setiap key-value pair:

```js
for (const [key, value] of nameMap) {
  console.log(key, value);
}
```

Kamu juga bisa menggunakan method `forEach()` untuk loop pada sebuah map. Mari kita log setiap key-value pair menggunakan method `forEach()`:

```js
nameMap.forEach((value, key) => {
  console.log(key, value);
});
```

Kamu juga bisa mendapatkan semua keys atau values dari sebuah map menggunakan method `keys()` dan `values()`. Mari kita log semua keys dan values dari map `nameMap`:

```js
console.log(nameMap.keys());   // MapIterator { 2, 3, 4, 5 }
console.log(nameMap.values()); // MapIterator { 'Jane', 'Joe', 'Jack', 'Jill' }
```

---

## 🧹 Mengosongkan Map

Untuk mengosongkan sebuah map, kita menggunakan method `clear()`. Mari kita kosongkan map `nameMap`:

```js
nameMap.clear();
console.log(nameMap.size);
```

---

> 💡 Sekarang saatnya mencoba beberapa tantangan (*challenges*)!
