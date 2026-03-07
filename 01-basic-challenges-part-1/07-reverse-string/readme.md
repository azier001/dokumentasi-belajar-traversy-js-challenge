# 🔄 Tantangan: Reverse String

> **Dokumentasi tantangan pemrograman** untuk membalik urutan karakter dalam sebuah string — cocok untuk melatih pemahaman **loop** dan **built-in methods** dalam JavaScript.

---

## 📋 Instruksi

Tulis sebuah fungsi bernama `reverseString` yang menerima sebuah string dan mengembalikan **kebalikan (reverse)** dari string tersebut. Pada bagian ini, kita berfokus pada penggunaan **loop** tanpa menggunakan built-in methods — coba selesaikan dengan cara itu terlebih dahulu. Jika mengalami kesulitan, kamu selalu bisa menggunakan built-in methods sebagai alternatif.

---

## ✍️ Function Signature

```js
/**
 * Mengembalikan kebalikan dari sebuah string.
 * @param {string} str - String yang akan dibalik.
 * @returns {string} - Kebalikan dari string tersebut.
 */
function reverseString(str: string): string;
```

---

## 💡 Contoh Penggunaan

```js
reverseString('hello') // 'olleh'
reverseString('world') // 'dlrow'
reverseString('')      // ''
```

---

## ⚠️ Batasan

- String input hanya akan mengandung **huruf kecil** dan **spasi**

---

## 🗝️ Petunjuk

- Kamu bisa menyelesaikannya **tanpa built-in methods** sama sekali, cukup gunakan `for loop`.
- Kamu juga bisa menggunakan kombinasi method `split`, `reverse`, dan `join` untuk menyelesaikan masalah ini.

---

## ✅ Solusi

<details>
  <summary>Klik untuk Solusi 1</summary>

Solusi ini menggunakan **`for` loop** untuk membalik string.

```js
function reverseString(str) {
  let reversed = '';

  for (let i = str.length - 1; i >= 0; i--) {
    reversed += str[i];
  }

  return reversed;
}
```

### 🔍 Penjelasan

- Buat sebuah variabel bernama `reversed` dan set nilainya menjadi string kosong.
- Buat sebuah `for loop` yang dimulai dari **index terakhir** dari `str` dan dikurangi 1 setiap iterasi hingga mencapai `0`.
- Tambahkan karakter pada index saat ini ke variabel `reversed`.
- Kembalikan variabel `reversed`.

</details>

<details>
  <summary>Klik untuk Solusi 2</summary>

Solusi ini menggunakan **built-in methods** untuk membalik string.

```js
function reverseString(str) {
  return str.split('').reverse().join('');
}
```

### 🔍 Penjelasan

Kita membuat fungsi bernama `reverseString` yang menerima sebuah string bernama `str`, lalu mengembalikan hasil dari **perantaian (chaining)** method `split`, `reverse`, dan `join` pada `str`.

- **`split`** — Mengubah string menjadi array. Kita memasukkan string kosong sebagai argumen agar string dipecah menjadi array karakter per karakter. `(["h", "e", "l", "l", "o"])`

- **`reverse`** — Membalik urutan elemen dalam array. `(["o", "l", "l", "e", "h"])`

- **`join`** — Menggabungkan array kembali menjadi sebuah string. Kita memasukkan string kosong sebagai argumen agar karakter-karakter digabung tanpa pemisah. `('olleh')`

</details>

---

## 🧪 Test Cases

```js
test('Membalik sebuah string', () => {
  expect(reverseString('Hello')).toBe('olleH');
  expect(reverseString('JavaScript')).toBe('tpircSavaJ');
  expect(reverseString('12345')).toBe('54321');
});
```