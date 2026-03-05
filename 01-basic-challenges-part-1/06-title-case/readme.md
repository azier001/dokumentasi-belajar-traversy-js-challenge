# 🏆 Tantangan: Title Case

> **Terjemahan dokumentasi teknis** — Semua istilah teknis, nama fungsi, perintah CLI, code block, parameter, dan keyword pemrograman tetap dalam **English**.

---

## 📋 Instruksi

Tulislah sebuah fungsi bernama `titleCase` yang menerima sebuah string dan mengembalikan string tersebut dengan **huruf pertama setiap kata dikapitalisasi**.

---

## ✍️ Function Signature

```js
/**
 * Mengembalikan string dengan huruf pertama setiap kata dikapitalisasi.
 * @param {string} str - String yang akan dikapitalisasi.
 * @returns {string} - String dengan huruf pertama setiap kata dikapitalisasi.
 */
function titleCase(str: string): string;
```

---

## 💡 Contoh Penggunaan

```js
titleCase("I'm a little tea pot"); // I'm A Little Tea Pot
titleCase('sHoRt AnD sToUt');      // Short And Stout
titleCase('HERE IS MY HANDLE HERE IS MY SPOUT'); // Here Is My Handle Here Is My Spout
```

---

## 🚧 Batasan

- Kamu boleh mengasumsikan bahwa setiap kata **hanya terdiri dari huruf dan spasi**

---

## 🔍 Petunjuk

*(Coba selesaikan sendiri terlebih dahulu sebelum melihat solusi di bawah!)*

---

## ✅ Solusi

<details>
  <summary>👆 Klik untuk Solusi 1</summary>

```js
function titleCase(str) {
  const words = str.toLowerCase().split(' ');

  for (let i = 0; i < words.length; i++) {
    words[i] = words[i][0].toUpperCase() + words[i].slice(1);
  }

  return words.join(' ');
}
```

### 🧠 Penjelasan

- **Pecah string** menjadi array kata-kata dan ubah semuanya menjadi lowercase.
- **Iterasi** melalui array dan kapitalisasi huruf pertama setiap kata menggunakan index `0` dari kata tersebut, lalu gabungkan dengan sisa kata menggunakan `slice(1)`.
- **Gabungkan** kembali array menjadi string dan kembalikan hasilnya.

</details>

---

<details>
  <summary>👆 Klik untuk Solusi 2</summary>

```js
function titleCase(str) {
  return str.replace(/\b\w/g, (match) => match.toUpperCase());
}
```

### 🧠 Penjelasan

Pada contoh ini, kita menggunakan method `replace` untuk **menemukan huruf pertama setiap kata** dan menggantinya dengan versi huruf kapitalnya.

Regex `/\b\w/g` cocok dengan huruf pertama dari setiap kata:

- `\b` — mencocokkan **word boundary** (batas kata)
- `\w` — mencocokkan **huruf pertama** dari setiap kata
- Flag `g` — digunakan untuk **mengganti semua kemunculan** regex dalam string

Argumen kedua adalah **callback function** yang mengembalikan versi huruf kapital dari huruf yang cocok.

</details>

---

<details>
  <summary>👆 Klik untuk Solusi 3</summary>

```js
function titleCase(str) {
  let result = '';

  for (let i = 0; i < str.length; i++) {
    if (i === 0 || str[i - 1] === ' ') {
      result += str[i].toUpperCase();
    } else {
      result += str[i].toLowerCase();
    }
  }

  return result;
}
```

### 🧠 Penjelasan

Pendekatan **character-by-character** — paling low-level di antara semua solusi:

- **Iterasi karakter per karakter** dari string asli.
- Jika karakter berada di **posisi pertama** (`i === 0`) atau karakter sebelumnya adalah **spasi** (`str[i - 1] === ' '`), maka ubah ke uppercase.
- Selain itu, ubah ke lowercase.
- Hasilnya **dibangun satu karakter per karakter** ke dalam variabel `result`.

</details>

---

<details>
  <summary>👆 Klik untuk Solusi 4</summary>

```js
const titleCase = (str) => {
  return str.replace(/\w+/g, (word) => word[0].toUpperCase() + word.slice(1));
};
```

### 🧠 Penjelasan

Mirip dengan Solusi 2, namun regex yang digunakan berbeda:

- Regex `/\w+/g` mencocokkan **seluruh kata** (satu atau lebih karakter `\w`), bukan hanya huruf pertamanya.
- Callback function menerima **keseluruhan kata**, lalu secara manual mengkapitalisasi huruf pertama dengan `word[0].toUpperCase()` dan menggabungkannya dengan sisa kata menggunakan `slice(1)`.

**Perbedaan utama vs Solusi 2:** Solusi 2 hanya menarget 1 karakter (huruf pertama), sedangkan solusi ini menarget seluruh kata lalu transformasi dilakukan di dalam callback.

</details>

---

<details>
  <summary>👆 Klik untuk Solusi 5</summary>

```js
function titleCase(str) {
  return str
    .split(' ')
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(' ');
}
```

### 🧠 Penjelasan

Pendekatan **functional** yang paling idiomatic di JavaScript modern:

- **`split(' ')`** — memecah string menjadi array kata-kata.
- **`.map()`** — mengiterasi setiap kata dan mengkapitalisasi huruf pertamanya.
- **`.join(' ')`** — menggabungkan kembali array menjadi string.

Keunggulannya adalah kode yang **bersih, ringkas, dan mudah dibaca** tanpa perlu variabel tambahan atau loop eksplisit.

</details>

---

## 🧪 Test Cases

```js
test('Converting string to title case', () => {
  expect(titleCase('hello world')).toBe('Hello World');
  expect(titleCase('javascript programming')).toBe('Javascript Programming');
  expect(titleCase('openai chatbot')).toBe('Openai Chatbot');
});
```