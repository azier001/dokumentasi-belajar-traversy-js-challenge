# 🗄️ Custom Hash Table (Hash Map)

> Kita telah mempelajari class `Map` bawaan yang merupakan **hash table**, tetapi sekarang saya ingin mengimplementasikan **custom hash table** kita sendiri dari awal. Ini tidak akan menjadi implementasi yang sangat tingkat lanjut. Implementasi ini bisa menjadi jauh lebih kompleks di mana ia dapat menangani **collisions** dengan lebih baik dan melakukan **dynamic resize**, tetapi ini akan menjadi titik awal yang baik.

---

## 🏗️ Class & Konstruktor

Saya akan mulai dengan membuat class `HashTable` dan kemudian saya akan menambahkan beberapa **methods** ke dalamnya.

```js
class HashTable {
  constructor(limit = 14) {
    this.storage = [];
    this.limit = limit;
}
```

**Constructor** akan menerima parameter `limit`, yang akan menjadi ukuran dari **hash table**. Saya akan menetapkan nilai default 14, tetapi kita dapat mengubahnya saat kita membuat instance baru dari class `HashTable`.

Saya juga akan menginisialisasi array `storage`, yang akan menjadi **hash table** tersebut. Saya akan menetapkannya sebagai array kosong untuk saat ini.

---

## 🔢 Fungsi `_hash`

Selanjutnya, saya akan membuat sebuah **hash function**. Fungsi ini akan menerima sebuah **key** dan mengembalikan sebuah **index**.

Tujuan dari **hashing** adalah untuk mendapatkan **index** yang unik untuk setiap **key**. Ada berbagai macam algoritma **hashing** yang dapat digunakan seperti `MD5`, `SHA-1`, `SHA-256`, dll. Kita akan menggunakan algoritma **hashing** yang sangat sederhana yang hanya akan menjumlahkan **character codes** dari setiap karakter dalam **key** dan kemudian mengembalikan hasil **sum modulo** dari ukuran **hash table**.

Ini bukan **hash function** terbaik karena dapat menyebabkan **collisions**, yang terjadi ketika dua **key** yang berbeda mendapatkan **hash** yang sama. Saya hanya tidak ingin membuat ini terlalu tingkat lanjut sehingga sulit dipahami oleh siapa pun, termasuk saya sendiri.

```js
  _hash(key, max) {
    let hash = 0;

    for (let i = 0; i < key.length; i++) {
      hash += key.charCodeAt(i);
    }

    return hash % max;
  }
```

Fungsi ini menerima sebuah **key**, yang akan menjadi **key** yang kita lewatkan ke dalam fungsi `set` saat kita membuatnya. Fungsi ini juga menerima sebuah `max`, yang akan menjadi ukuran dari **hash table**.

Saya akan mulai dengan menginisialisasi variabel `hash` ke 0. Kemudian saya akan melakukan **loop** melalui setiap karakter dalam **key** dan menambahkan **character code** ke dalam `hash`. Setiap karakter memiliki **character code**. Anda dapat mendapatkan **character code** dari sebuah karakter dengan menggunakan method `charCodeAt()`. Saya akan menambahkan **character code** ke dalam `hash` setiap kali melalui **loop**.

Kemudian saya akan mengembalikan `hash` **modulo** `max`, yang merupakan ukuran dari **hash table**. Alasan untuk ini adalah untuk memastikan bahwa **hash** berada dalam rentang **hash table**. Dengan menggunakan operator **modulo**, kita dapat memastikannya karena hasilnya akan selalu kurang dari `max`.

Saya menambahkan garis bawah (`_`) di awal nama fungsi karena ini adalah **private function**. Fungsi ini tidak dimaksudkan untuk dipanggil di luar class.

---

## 🖨️ Method `printTable`

Kita akan membuat method yang sangat sederhana yang hanya mencatat (**logs**) tabel tersebut. Anda mungkin tidak ingin melakukan ini dalam aplikasi nyata, tetapi ini akan berguna bagi kita untuk melihat apa yang sedang terjadi.

```js
  printTable() {
    console.log(this.storage);
  }
}
```

Jika Anda membuat instance `HashTable` baru dan memanggil method `printTable()`, Anda akan melihat array kosong. Masukkan ini di file eksekusi Anda atau di bawah definisi class:

```js
const ht = new HashTable();
ht.printTable(); // []
```

---

## 📥 Method `set`

Mari kita buat sebuah method untuk menambahkan **key-value pair** ke dalam **hash table**. Method ini akan menerima sebuah **key** dan sebuah **value**. Kita akan menggunakan fungsi `_hash()` untuk mendapatkan **index** tempat kita akan menyimpan **key-value pair** tersebut.

```js
 set(key, value) {
    const index = this._hash(key, this.limit);

    if (this.storage[index] === undefined) {
      this.storage[index] = [[key, value]];
    } else {
      let inserted = false;

      for (let i = 0; i < this.storage[index].length; i++) {
        if (this.storage[index][i][0] === key) {
          this.storage[index][i][1] = value;
          inserted = true;
        }
      }

      if (inserted === false) {
        this.storage[index].push([key, value]);
      }
    }
  }
```

Method ini akan menerima sebuah **key** dan sebuah **value**.

Pertama, kita mendapatkan **index** dengan melewatkan **key** dan **limit** ke fungsi `_hash()`.

Selanjutnya, kita melakukan sedikit penanganan **collision**. Alih-alih hanya menyimpan **key-value pair**, kita pertama-tama memeriksa apakah sudah ada sesuatu yang tersimpan di **index** tersebut. Jika tidak ada apa-apa di sana, kita simpan saja **key-value pair** dalam sebuah array pada **index** tersebut. Jika tidak kosong, kita akan melakukan **loop** melalui array pada **index** tersebut dan memeriksa apakah **key** sudah ada. Jika ya, kita akan memperbarui (**update**) **value**-nya. Jika tidak, kita akan melakukan **push** **key-value pair** ke dalam array.

Mari kita uji. Tambahkan ini ke file eksekusi Anda:

```js
const ht = new HashTable(8);
ht.set('john', '555-234-3544');
ht.set('james', '555-384-5523');
ht.set('jack', '555-384-9933');
ht.set('jill', '555-390-0034');
ht.printTable();
```

Anda seharusnya melihat sesuatu seperti ini:

```js
[
  [ [ 'james', '555-384-5523' ] ],
  [ [ 'jack', '555-384-9933' ] ],
  <1 empty item>,
  [ [ 'jill', '555-390-0034' ] ],
  <3 empty items>,
  [ [ 'john', '555-234-3544' ] ]
]
```

Ingat gambar ini?

![hash table](../../assets/images/hash-table.png)

Ini terlihat sangat mirip dengan apa yang telah kita lakukan di sini. Kita memiliki array dengan 8 item. Kita memiliki 4 item dalam array dan 4 item kosong. Item dalam array juga berupa array. Masing-masing array tersebut memiliki **key-value pair** di dalamnya. **Key** adalah nama dan **value** adalah nomor telepon.

---

## 🔍 Method `get`

Sekarang mari kita buat method untuk mendapatkan **value** dari **hash table**. Method ini akan menerima sebuah **key** dan mengembalikan **value**-nya.

```js
   get(key) {
    const index = this._hash(key, this.limit);

    if (this.storage[index] === undefined) {
      return undefined;
    } else {
      for (let i = 0; i < this.storage[index].length; i++) {
        if (this.storage[index][i][0] === key) {
          return this.storage[index][i][1];
        }
      }
    }
  }
```

Pertama, kita mendapatkan **index** dengan melewatkan **key** dan **limit** ke fungsi `_hash()`. Kemudian kita memeriksa apakah **index** tersebut kosong. Jika ya, kita akan mengembalikan `undefined`. Jika tidak kosong, kita akan melakukan **loop** melalui array pada **index** tersebut dan memeriksa apakah **key** ada. Jika ada, kita akan mengembalikan **value**-nya.

Mari kita uji. Tambahkan ini ke file eksekusi Anda:

```js
const ht = new HashTable(8);
ht.set('john', '555-234-3544');
ht.set('james', '555-384-5523');
ht.set('jack', '555-384-9933');
ht.set('jill', '555-390-0034');
console.log(ht.get('jill')); // 555-390-0034
console.log(ht.get('jack')); // 555-384-9933
console.log(ht.get('james')); // 555-384-5523
console.log(ht.get('john')); // 555-234-3544
```

Anda seharusnya mendapatkan hasil berikut:

```js
555 - 390 - 0034;
555 - 384 - 9933;
555 - 384 - 5523;
555 - 234 - 3544;
```

---

## 🗑️ Method `remove`

Sekarang mari kita buat method untuk menghapus **key-value pair** dari **hash table**. Method ini akan menerima sebuah **key** dan menghapus **key-value pair** tersebut.

```js
  remove(key) {
    const index = this._hash(key, this.limit);

    if (this.storage[index]) {
      if (
        this.storage[index].length === 1 &&
        this.storage[index][0][0] === key
      ) {
        delete this.storage[index];
      } else {
        for (let i = 0; i < this.storage[index].length; i++) {
          if (this.storage[index][i][0] === key) {
            delete this.storage[index][i];
          }
        }
      }
    }
  }
```

Pertama, kita mendapatkan **index** dengan melewatkan **key** dan **limit** ke fungsi `_hash()`.

Kemudian kita memeriksa apakah **bucket** tersebut ada.

Lalu kita memeriksa jika **key** cocok dengan **key** pada **index** dan hanya ada satu item dalam **bucket**, hapus **bucket** tersebut, jika tidak, lakukan **loop** melalui **bucket** dan hapus item yang cocok dengan **key**.

Anda seharusnya mendapatkan hasil seperti berikut:

```js
[
  [ [ 'james', '555-384-5523' ] ],
  <1 empty item>,
  [ [ 'jill', '555-390-0034' ] ],
  <3 empty items>
]
```

---

## 📋 Method `getValues`

Sekarang mari kita buat sebuah method untuk mendapatkan semua **values** dari **hash table**. Method ini akan mengembalikan sebuah array dari semua **values**.

```js
 getValues() {
    const values = [];

    for (let i = 0; i < this.storage.length; i++) {
      if (this.storage[i]) {
        for (let j = 0; j < this.storage[i].length; j++) {
          values.push(this.storage[i][j][1]);
        }
      }
    }
    
    return values;
  }
```

Mari kita uji. Tambahkan ini ke file eksekusi Anda:

```js
console.log(ht.getValues()); // [ '555-234-3544', '555-384-5523', '555-384-9933', '555-390-0034' ]
```

---

## 🧪 Test Cases

Berikut adalah pengujian **Jest** yang seharusnya lulus jika Anda telah melakukan semuanya dengan benar. Anda tidak harus memahami ini, cukup jalankan dan pastikan hasilnya lulus.

```js
const HashTable = require('./HashTable');

describe('HashTable', () => {
  let hashTable;

  beforeEach(() => {
    hashTable = new HashTable();
  });

  test('Set and get a key-value pair', () => {
    hashTable.set('firstName', 'John');
    expect(hashTable.get('firstName')).toBe('John');
  });

  test('Set and get multiple key-value pairs', () => {
    hashTable.set('firstName', 'John');
    hashTable.set('lastName', 'Smith');
    hashTable.set('age', 30);

    expect(hashTable.get('firstName')).toBe('John');
    expect(hashTable.get('lastName')).toBe('Smith');
    expect(hashTable.get('age')).toBe(30);
  });

  test('Get a value for a non-existent key', () => {
    expect(hashTable.get('city')).toBeUndefined();
  });

  test('Remove a key-value pair', () => {
    hashTable.set('firstName', 'John');
    hashTable.remove('firstName');

    expect(hashTable.get('firstName')).toBeUndefined();
  });

  test('Remove a non-existent key-value pair', () => {
    hashTable.set('firstName', 'John');
    hashTable.remove('lastName');

    expect(hashTable.get('firstName')).toBe('John');
  });

  test('Print the contents of the hash table', () => {
    const consoleSpy = jest.spyOn(console, 'log');
    hashTable.set('firstName', 'John');
    hashTable.set('lastName', 'Smith');
    hashTable.set('age', 30);

    hashTable.printTable();
    expect(consoleSpy).toHaveBeenCalledWith(expect.any(Array));

    consoleSpy.mockRestore();
  });

  test('Get all values from the hash table', () => {
    hashTable.set('firstName', 'John');
    hashTable.set('lastName', 'Smith');
    hashTable.set('age', 30);

    const values = hashTable.getValues();

    expect(values).toEqual(expect.arrayContaining(['John', 'Smith', 30]));
  });
});
```

---

## 🏁 Kesimpulan

Selesai! Kita telah membuat **hash table** kita sendiri. Sekarang kita dapat menambahkan, mengambil, dan menghapus **key-value pairs** dari **hash table** kita. Kita juga dapat mencetak isi **hash table** untuk melihat tampilannya.

Selanjutnya kita akan melakukan beberapa tantangan menggunakan class ini.
