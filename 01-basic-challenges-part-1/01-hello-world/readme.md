# 🧩 Challenge: Hello World — Sample Challenge

> Ini adalah challenge latihan untuk menunjukkan cara kerja sistem, cara pengujian, dan lain-lain.

---

## 📋 Instruksi

Tulis sebuah fungsi bernama `helloWorld` yang mengembalikan string `'Hello World!'`.

---

### ✍️ Function Signature

```js
/**
 * Mengembalikan string yang berisi 'Hello World!'.
 * @returns {string} - String 'Hello World!'.
 */
function helloWorld(): string;
```

---

### 💡 Contoh Penggunaan

```js
helloWorld() // 'Hello World!'
```

---

### ⚠️ Constraints

Berikut adalah batasan yang berlaku. Batasan ini akan bervariasi tergantung pada challenge-nya.

- Fungsi **harus** mengembalikan sebuah `string`

---

### 🔍 Hints

Berikut beberapa petunjuk yang bisa kamu gunakan — atau tidak, terserah kamu!

---

## ✅ Solusi

<details>
  <summary>👆 Klik untuk melihat solusi</summary>

```js
function helloWorld() {
  return 'Hello World!';
}
```

### 📖 Penjelasan

Penjelasan solusi akan ditulis di sini. Panjang dan kedalaman penjelasan akan bervariasi tergantung pada challenge-nya.

</details>

---

### 🧪 Test Cases

Jest test sudah disertakan di dalam file course. Kamu hanya perlu menjalankan perintah `npm test`. Terkadang manual test juga akan disertakan di sini.

```js
test("Mengembalikan 'Hello, World!' sebagai string", () => {
  const result = helloWorld();
  expect(result).toBe('Hello World!');
});
```
