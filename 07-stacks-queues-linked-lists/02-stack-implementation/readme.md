# 🏗️ Implementasi Stack

> Sekarang setelah kita memahami secara mendasar cara kerja **stack**, kita akan mengimplementasikannya dalam **JavaScript**. Kita akan membuat **Class** `Stack` yang memiliki **method** seperti `push`, `pop`, dan `peek`.

---

## 🧱 Class Stack & Constructor

Mari kita mulai dengan membuat **class** bernama `Stack`. Di dalam **constructor**, kita akan membuat properti bernama `maxSize` dan mengaturnya ke `100`. Ini adalah jumlah maksimum elemen yang dapat berada di dalam **stack**. Kita juga akan membuat properti bernama `stack` dan mengaturnya ke sebuah **empty array**. Di sinilah kita akan menyimpan elemen-elemen dalam **stack**. Terakhir, kita akan membuat properti bernama `top` dan mengaturnya ke `-1`. Ini adalah **index** dari elemen teratas dalam **stack**. Kita menggunakan `-1` karena **stack** masih kosong. Elemen pertama akan berada pada **index 0**.

```js
class Stack {
  constructor() {
    this.maxSize = 100;
    this.stack = [];
    this.top = -1;
  }
}
```

---

## ⬆️ Method `push`

Buat **method** `push` untuk menambahkan data ke **stack**. **Method** ini akan menerima sebuah `value` (elemen). Pertama, periksa apakah **stack** sudah penuh. Jika iya, kembalikan `false`. Tambahkan **top index** sebanyak `1`. Atur elemen pada **top index** dari **stack** ke `value` tersebut. Kembalikan `true`.

```js
 push(value) {
    if (this.isFull()) {
      return false;
    }

    this.top++;
    this.stack[this.top] = value;

    return true;
  }
```

---

## 📏 Method `isFull`

Tentu saja kita perlu menambahkan **method** untuk memeriksa apakah **stack** sudah penuh. **Method** ini akan mengembalikan `true` jika **top index** sama dengan `maxSize` dikurangi `1`. Jika tidak, akan mengembalikan `false`.

```js
isFull() {
    return this.top === this.maxSize - 1;
  }
```

Mari kita tambahkan juga **method** untuk memeriksa apakah **stack** kosong. **Method** ini akan mengembalikan `true` jika **top index** sama dengan `-1`. Jika tidak, akan mengembalikan `false`.

```js
isEmpty() {
    return this.top === -1;
  }
```

Sekarang kita bisa mencobanya sedikit. Di dalam file **run**, buat **instance** baru dari **class** `Stack`. Jalankan `push` pada beberapa elemen ke **stack**. Kemudian, cetak **stack** ke **console**.

```js
const stack = new Stack();

stack.push(1);
stack.push(2);
stack.push(3);

console.log(stack);
```

Anda seharusnya melihat hasil seperti ini:

```js
Stack {
  maxSize: 100,
  stack: [ 1, 2, 3 ],
  top: 2
}
```

---

## ⬇️ Method `pop`

Sekarang mari kita buat **method** `pop`. Ini akan menghapus elemen teratas dari **stack**. Penting untuk diketahui bahwa `pop` dan hampir semua **method** dari struktur data apa pun dapat diimplementasikan dengan banyak cara. Terkadang data yang sebenarnya tidak akan dihapus dari **array** (`this.stack`), tetapi hanya mengikuti apa yang ada di bagian **top** dari **stack**. Saya ingin data yang sebenarnya dihapus, jadi saya akan menggunakan **built-in method** `pop` pada **array**.

Pertama, periksa apakah **stack** kosong. Jika iya, kembalikan `null`. Kemudian kurangi `top` sebanyak `1` dan kembalikan hasil dari `this.stack.pop()`.

```js
pop() {
    if (this.isEmpty()) {
      return null;
    }

    this.top--;

    return this.stack.pop();
  }
```

---

## 👁️ Method `peek`

Terakhir, mari kita buat **method** `peek`. Ini akan mengembalikan elemen teratas dari **stack**. Pertama, periksa apakah **stack** kosong. Jika iya, kembalikan `null`. Kembalikan elemen yang berada pada **top index** dari **stack**.

```js
peek() {
    if (this.isEmpty()) {
      return null;
    }
    
    return this.stack[this.top];
  }
```

Sekarang mari kita uji lebih lanjut.

```js
const stack = new Stack();

stack.push(1);
stack.push(2);
stack.push(3);

console.log(stack);

console.log(stack.pop());
console.peek();
console.log(stack.pop());
console.peek();
console.log(stack.pop());
```
