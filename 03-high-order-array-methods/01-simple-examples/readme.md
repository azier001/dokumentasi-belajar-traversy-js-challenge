# 🚀 Apa Itu High Order Array Methods?

> **Dokumentasi ini membahas high order array methods dalam JavaScript** — teknik modern untuk menulis kode yang lebih bersih, elegan, dan mudah dipahami dibandingkan loop konvensional.

---

## 🔄 Pendahuluan

Sebagian besar tantangan yang telah kita kerjakan sejauh ini menggunakan **loop**. Loop adalah salah satu fundamental terbesar dalam ilmu komputer secara umum. Penting bagi kamu untuk mengetahui cara menggunakannya. Untuk batch tantangan berikutnya, kita akan memanfaatkan beberapa **high order array methods** dalam JavaScript, seperti `map` dan `filter`.

Method-method ini sangat berguna dan dapat membantu kamu menulis **kode yang lebih bersih**. Menggunakan loop biasanya sedikit lebih efisien, tetapi perbedaannya dapat diabaikan kecuali kamu berurusan dengan dataset yang sangat besar. Dalam kode sehari-hari, **lebih baik menulis kode yang bersih**, mudah dibaca, dan dipahami.

Sebagian besar dari kalian mungkin sudah tahu apa itu high order array methods, tapi saya ingin meninjau secara singkat beberapa yang umum sebelum kita masuk ke tantangan.

Sebuah **high order array method** adalah method yang menerima sebuah fungsi sebagai argumen *atau* mengembalikan sebuah fungsi sebagai hasilnya. High order array methods yang paling umum adalah `map`, `filter`, dan `reduce`. Ada beberapa yang lain, tetapi ini adalah yang paling sering digunakan. Method-method ini memungkinkan kita untuk **mengiterasi sebuah array** dan melakukan operasi tertentu pada setiap elemennya.

Mari gunakan array berikut sebagai contoh kita:

```js
const numbers = [1, 2, 3, 4, 5];
```

---

## 🗺️ Map

Method `map` menerima sebuah fungsi sebagai argumen dan **mengembalikan array baru** dengan hasil pemanggilan fungsi tersebut pada setiap elemen dalam array. Berikut contohnya:

```js
const doubledNumbers = numbers.map((num) => {
  return num * 2;
});

console.log(doubledNumbers);

// Output: [2, 4, 6, 8, 10]
```

Pada contoh di atas, kita memiliki array berisi angka-angka. Kita memanggil method `map` pada array tersebut dan mengoper sebuah fungsi sebagai argumen. Fungsi tersebut menerima sebuah angka sebagai argumen dan mengembalikan angka yang dikalikan 2. Method `map` kemudian mengembalikan array baru dengan hasil pemanggilan fungsi pada setiap elemen dalam array.

Dalam contoh ini saya mengalikan setiap angka dengan 2, tetapi kamu bisa melakukan **apapun yang kamu inginkan** di dalam fungsinya.

---

## 🔍 Filter

Method `filter` menerima sebuah fungsi sebagai argumen dan **mengembalikan array baru** dengan semua elemen yang lolos pengujian yang diimplementasikan oleh fungsi tersebut. Berikut contohnya:

```js
const numbers = [1, 2, 3, 4, 5];

const evenNumbers = numbers.filter((num) => {
  return num % 2 === 0;
});

console.log(evenNumbers);

// Output: [2, 4]
```

Pada contoh di atas, kita memiliki array berisi angka-angka. Kita memanggil method `filter` pada array tersebut dan mengoper sebuah fungsi sebagai argumen. Fungsi tersebut menerima sebuah angka sebagai argumen dan mengembalikan `true` jika angkanya **genap** dan `false` jika angkanya **ganjil**. Method `filter` kemudian mengembalikan array baru dengan semua elemen yang lolos pengujian tersebut.

Dalam contoh ini saya menyaring semua angka ganjil, tetapi kamu bisa melakukan **apapun yang kamu inginkan** di dalam fungsinya.

---

## ➕ Reduce

Method `reduce` menerima sebuah fungsi sebagai argumen dan **mengembalikan satu nilai tunggal**. Berikut contohnya:

```js
const numbers = [1, 2, 3, 4, 5];

const sum = numbers.reduce((total, num) => {
  return total + num;
}, 0);

console.log(sum);

// Output: 15
```

Pada contoh di atas, kita memiliki array berisi angka-angka. Kita memanggil method `reduce` pada array tersebut dan mengoper sebuah fungsi sebagai argumen. Fungsi tersebut menerima dua argumen, `total` dan `num`. Argumen `total` adalah **nilai yang sedang kita akumulasikan**. Argumen `num` adalah **nilai saat ini** dalam array. Fungsi mengembalikan jumlah dari `total` dan `num`. Method `reduce` kemudian mengembalikan satu nilai tunggal.

---

## 🔁 forEach

Method `forEach` menerima sebuah fungsi sebagai argumen dan **mengeksekusi fungsi tersebut pada setiap elemen** dalam array. Berikut contohnya:

```js
const numbers = [1, 2, 3, 4, 5];

numbers.forEach((num) => {
  console.log(num);
});

// Output: 1 2 3 4 5
```

Pada contoh di atas, kita memiliki array berisi angka-angka. Kita memanggil method `forEach` pada array tersebut dan mengoper sebuah fungsi sebagai argumen. Fungsi tersebut menerima sebuah angka sebagai argumen dan mencatat angka ke console. Method `forEach` kemudian mengeksekusi fungsi pada setiap elemen dalam array.

---

## 📚 Method Lainnya

Berikut beberapa high order array methods lain yang mungkin akan kamu temui:

| Method | Deskripsi |
|--------|-----------|
| `some` | Mengembalikan `true` jika **setidaknya satu** elemen dalam array lolos pengujian yang diimplementasikan oleh fungsi |
| `every` | Mengembalikan `true` jika **semua** elemen dalam array lolos pengujian yang diimplementasikan oleh fungsi |
| `find` | Mengembalikan **nilai** dari elemen pertama dalam array yang lolos pengujian yang diimplementasikan oleh fungsi |
| `findIndex` | Mengembalikan **indeks** dari elemen pertama dalam array yang lolos pengujian yang diimplementasikan oleh fungsi |
| `sort` | **Mengurutkan** elemen-elemen dalam array |
| `reverse` | **Membalik urutan** elemen-elemen dalam array |
| `includes` | Mengembalikan `true` jika array **mengandung** elemen tertentu |