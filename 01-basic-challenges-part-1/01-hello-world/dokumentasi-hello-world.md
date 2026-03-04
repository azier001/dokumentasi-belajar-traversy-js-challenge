# 📝 Dokumentasi Pribadi: Hello World Challenge

> Catatan belajar dari video tutorial JavaScript — Challenge #1

---

## 🗂️ Daftar Isi

- 🔍 [Pengenalan](#pengenalan)
- 🎯 [Tujuan Challenge](#tujuan-challenge)
- ✍️ [Cara Menulis Solusi](#cara-menulis-solusi)
- ▶️ [Cara Menjalankan Kode](#cara-menjalankan-kode)
- 🧪 [Cara Menjalankan Test](#cara-menjalankan-test)
- 📁 [Struktur File](#struktur-file)

---

<a name="pengenalan"></a>
## 🔍 Pengenalan

Challenge pertama ini sengaja dibuat **sangat sederhana**. Tujuannya bukan untuk menguji kemampuan coding, tapi untuk membiasakan diri dengan:

- Di mana harus menulis solusi
- Bagaimana cara menjalankan kode
- Bagaimana cara menjalankan test

Anggap saja ini sebagai "orientasi" sebelum masuk ke challenge yang lebih serius.

---

<a name="tujuan-challenge"></a>
## 🎯 Tujuan Challenge

Tulis sebuah fungsi bernama `helloWorld` yang **mengembalikan string** `'Hello World!'`.

```js
// Tidak ada argumen yang dibutuhkan
// Cukup kembalikan string-nya langsung

function helloWorld() {
  // tulis solusimu di sini
}
```

**Contoh hasil yang diharapkan:**

```js
helloWorld() // → 'Hello World!'
```

---

<a name="cara-menulis-solusi"></a>
## ✍️ Cara Menulis Solusi

Solusi ditulis di file `hello-world.js`. Isinya cukup satu fungsi sederhana:

```js
// hello-world.js

function helloWorld() {
  return 'Hello World!';
}

module.exports = helloWorld;
```

> 💡 Perhatikan `module.exports` — ini penting agar fungsinya bisa dipakai di file lain (seperti file test atau run).

---

<a name="cara-menjalankan-kode"></a>
## ▶️ Cara Menjalankan Kode

Ada file terpisah bernama `hello-world-run.js` untuk mencoba kode secara manual sebelum di-test. File ini sudah otomatis mengimpor fungsinya dan menjalankannya.

```js
// hello-world-run.js

function helloWorld() {
  return 'Hello World!';
}

module.exports = helloWorld;
```

Jalankan lewat **code runner** di editor, dan kamu akan melihat output:

```
Hello World!
```

> 💡 File run ini tidak selalu dipakai di setiap challenge, tapi berguna kalau mau `console.log` sesuatu untuk debugging.

---

<a name="cara-menjalankan-test"></a>
## 🧪 Cara Menjalankan Test

### Langkah 1 — Rename file test

File test awalnya bernama `hello-world-test.js` (dengan tanda `-test`). Rename dulu menjadi `hello-world.test.js`.

```
hello-world-test.js  →  hello-world.test.js
```

> 💡 Setelah di-rename, ikonnya akan berubah di editor karena editor tahu ini adalah file Jest.

### Langkah 2 — Jalankan test

Buka terminal, lalu jalankan:

```bash
npm test
```

### Hasil yang diharapkan

```
✓ Returning 'Hello, World!' as a string

Tests: 1 passed, 1 total
```

### Isi file test-nya

```js
// hello-world.test.js

const helloWorld = require('./hello-world');

test("Returning 'Hello, World!' as a string", () => {
  const result = helloWorld();
  expect(result).toBe('Hello World!');
});
```

> 💡 File test ini **sudah disediakan** — kamu tidak perlu menulis sendiri. Tugasmu hanya menulis solusi di `hello-world.js`, lalu jalankan `npm test` untuk mengecek apakah solusimu benar.

---

<a name="struktur-file"></a>
## 📁 Struktur File

| File | Fungsi |
|------|--------|
| `hello-world.js` | ✏️ Tempat menulis solusi |
| `hello-world-run.js` | ▶️ Untuk mencoba kode manual |
| `hello-world.test.js` | 🧪 File test otomatis (Jest) |

---

> ✅ **Kesimpulan:** Challenge ini sangat simpel, tapi penting untuk memahami alurnya — tulis solusi → jalankan run file (opsional) → rename test file → `npm test`. Alur ini akan terus dipakai di challenge-challenge berikutnya!