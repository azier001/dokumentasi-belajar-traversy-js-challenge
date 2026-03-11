# 🧩 Tantangan: Apakah Semua Karakter Unik?

> Sebuah tantangan pemrograman untuk memeriksa apakah semua karakter dalam sebuah string bersifat **unik** — tidak ada karakter yang berulang.

---

## 📋 Instruksi

Tulislah sebuah fungsi bernama `areAllCharactersUnique` yang menerima sebuah string dan mengembalikan `true` atau `false` tergantung pada apakah **semua karakter dalam string tersebut unik** (yaitu, tidak ada karakter yang berulang).

---

## ✍️ Function Signature

```js
/**
 * Mengembalikan true jika semua karakter dalam string bersifat unik.
 * @param {string} str - String yang akan diperiksa.
 * @returns {boolean} - Apakah semua karakter dalam string bersifat unik.
 */
function areAllCharactersUnique(str: string): boolean;
```

---

## 💡 Contoh Penggunaan

```js
areAllCharactersUnique('abcdefg');  // true
areAllCharactersUnique('abcdefgA'); // true
areAllCharactersUnique('programming'); // false
areAllCharactersUnique('');  // true
areAllCharactersUnique('a'); // true
```

---

## ⚠️ Batasan

- Fungsi ini harus **case sensitive**, sehingga `a` dan `A` dianggap sebagai karakter yang **berbeda**
- String **kosong** harus mengembalikan `true` secara default

---

## 🔍 Petunjuk

- Kamu dapat menggunakan `for loop` untuk melakukan iterasi pada string dan memeriksa apakah karakter saat ini sudah ada di dalam `set` atau `object`.
- `for...of` bisa digunakan sebagai alternatif yang lebih ringkas karena string di JavaScript bersifat **iterable**.
- Kamu juga bisa memanfaatkan sifat `Set` yang **otomatis menghapus duplikat** untuk solusi yang lebih singkat.

---

## ✅ Solusi

<details>
  <summary>Klik untuk Solusi 1</summary>

Menggunakan `Set`:

```js
function areAllCharactersUnique(str) {
  const charSet = new Set();

  for (let i = 0; i < str.length; i++) {
    const char = str[i];

    if (charSet.has(char)) {
      return false;
    }

    charSet.add(char);
  }

  return true;
}
```

### 🧠 Penjelasan

- Inisialisasi sebuah `Set` baru untuk melacak karakter-karakter yang sudah kita temui sejauh ini.
- Lakukan iterasi pada string dan periksa apakah karakter saat ini sudah ada di dalam `set`. Jika **sudah ada**, kita kembalikan `false` karena berarti kita pernah melihat karakter tersebut sebelumnya. Jika **belum ada**, kita tambahkan karakter tersebut ke dalam `set`.
- Jika kita berhasil melewati seluruh string tanpa mengembalikan `false`, kita kembalikan `true` karena berarti kita tidak pernah melihat karakter yang sama lebih dari sekali.

</details>

<details>
  <summary>Klik untuk Solusi 2</summary>

Menggunakan sebuah object:

```js
function areAllCharactersUnique(str) {
  const charCount = {};

  for (let i = 0; i < str.length; i++) {
    const char = str[i];

    if (charCount[char]) {
      return false;
    }
    
    charCount[char] = true;
  }

  return true;
}
```

### 🧠 Penjelasan

Solusi ini serupa, hanya saja kita menggunakan sebuah **object** sebagai pengganti `Set` untuk melacak karakter-karakter yang sudah kita temui sejauh ini.

Kemudian kita melakukan iterasi pada string dan memeriksa apakah karakter saat ini sudah ada di dalam object. Jika **sudah ada**, kita kembalikan `false` karena berarti kita pernah melihat karakter tersebut sebelumnya. Jika **belum ada**, kita tambahkan karakter tersebut ke dalam object.

Jika kita berhasil melewati seluruh string tanpa mengembalikan `false`, kita kembalikan `true` karena berarti kita tidak pernah melihat karakter yang sama lebih dari sekali.

</details>

<details>
  <summary>Klik untuk Solusi 3</summary>

Menggunakan `for...of` dengan `Set`:

```js
function areAllCharactersUnique(str) {
  const charSet = new Set();

  for (const char of str) {
    if (charSet.has(char)) {
      return false;
    }
    charSet.add(char);
  }

  return true;
}
```

### 🧠 Penjelasan

Solusi ini sama seperti Solusi 1, namun menggunakan `for...of` yang lebih **clean dan readable**. Karena string di JavaScript bersifat **iterable**, kita bisa langsung iterasi karakter per karakter tanpa perlu menggunakan index `str[i]`.

</details>

<details>
  <summary>Klik untuk Solusi 4</summary>

Menggunakan `for...of` dengan object:

```js
function areAllCharactersUnique(str) {
  const charCount = {};

  for (const char of str) {
    if (charCount[char]) {
      return false;
    }
    charCount[char] = true;
  }

  return true;
}
```

### 🧠 Penjelasan

Solusi ini sama seperti Solusi 2, namun mengganti `for` biasa dengan `for...of`. Hasilnya kode lebih ringkas karena tidak perlu mengelola index secara manual — cukup iterasi langsung pada karakternya.

</details>

<details>
  <summary>Klik untuk Solusi 5</summary>

Menggunakan `new Set(str)` + perbandingan `size`:

```js
const areAllCharactersUnique = (str) => {
  const charSet = new Set(str);

  return charSet.size === str.length;
};
```

### 🧠 Penjelasan

Ini solusi yang paling **singkat dan elegan**. Triknya memanfaatkan sifat `Set` yang otomatis menghapus duplikat:

- Jika semua karakter unik → `charSet.size` **sama dengan** `str.length` → `true`
- Jika ada duplikat → `charSet.size` **lebih kecil dari** `str.length` → `false`

> ⚠️ **Trade-off:** Solusi ini selalu membangun `Set` secara lengkap sebelum melakukan pengecekan, berbeda dengan solusi `for` loop yang bisa **early return** begitu menemukan duplikat pertama. Untuk string yang sangat panjang dengan duplikat di awal, solusi loop bisa lebih efisien.

</details>

---

## 🧪 Test Cases

```js
test('Karakter Unik dalam Sebuah String', () => {
  expect(areAllCharactersUnique('abcdefg')).toBe(true);
  expect(areAllCharactersUnique('abcdefgA')).toBe(true);
  expect(areAllCharactersUnique('programming')).toBe(false);
  expect(areAllCharactersUnique('')).toBe(true);
  expect(areAllCharactersUnique('a')).toBe(true);
});
```