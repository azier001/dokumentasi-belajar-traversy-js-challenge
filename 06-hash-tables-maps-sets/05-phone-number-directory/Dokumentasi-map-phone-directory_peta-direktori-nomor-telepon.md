# 📞 Phone Number Directory — Catatan Belajar Pribadi

> Dokumentasi ini dibuat dari video tutorial + kode praktik.
> Ditulis santai, step-by-step, biar gampang dipahami kalau dibaca ulang nanti.

---

## 📚 Daftar Isi

- 🎯 [Pengenalan Challenge](#pengenalan)
- 🗂️ [Struktur File](#struktur-file)
- 🔍 [Memahami Soalnya](#memahami-soal)
- 🏗️ [Membangun Fungsinya Step by Step](#membangun-fungsi)
- 📄 [Kode Lengkap dengan Komentar](#kode-lengkap)
- ▶️ [Cara Menjalankan & Mencoba Output](#cara-menjalankan)
- 🧪 [Test Cases](#test-cases)

---

<a name="pengenalan"></a>
## 🎯 Pengenalan Challenge

Challenge ini tergolong **mudah**, tapi bagus banget buat latihan pakai `Map` secara nyata.

Tugasnya: buat fungsi `phoneNumberDirectory` yang menerima array berisi nama dan nomor telepon, lalu mengembalikan hasilnya dalam bentuk `Map`.

---

<a name="struktur-file"></a>
## 🗂️ Struktur File

Ada tiga file yang dipakai di challenge ini:

| File | Fungsi |
|------|--------|
| `phone-number-directory.js` | Tempat nulis solusi fungsinya |
| `phone-number-directory-run.js` | File buat coba-coba jalanin fungsinya secara manual |
| `phone-number-directory.test.js` | File test otomatis pakai Jest |

---

<a name="memahami-soal"></a>
## 🔍 Memahami Soalnya

### Input-nya apa?

Fungsi ini menerima sebuah **array of strings**. Tiap string punya format seperti ini:

```
"NamaOrang:NomorTelepon"
```

Contohnya:

```js
const phoneNumbers = [
  'John:123-456-7890',
  'Jane:987-654-3210',
  'Joe:555-555-5555',
];
```

### Output-nya apa?

Fungsi ini harus mengembalikan sebuah **`Map`** di mana:
- **Key** = nama orang (misalnya `'John'`)
- **Value** = nomor teleponnya (misalnya `'123-456-7890'`)

```js
// Contoh output:
Map { 'John' => '123-456-7890', 'Jane' => '987-654-3210', 'Joe' => '555-555-5555' }
```

### Petunjuk dari soal

> Gunakan method `split()` untuk memisahkan nama dan nomor telepon dari tiap elemen array, sebelum dimasukkan ke Map.

---

<a name="membangun-fungsi"></a>
## 🏗️ Membangun Fungsinya Step by Step

### Langkah 1 — Buat fungsi dan terima parameternya

```js
function phoneNumberDirectory(phoneNumbers) {
```

Parameter `phoneNumbers` adalah array yang berisi string-string seperti `'John:123-456-7890'`.

---

### Langkah 2 — Buat Map kosong dulu

```js
  const directory = new Map();
```

`Map` ini nanti akan jadi "buku telepon" kita. Awalnya kosong, nanti kita isi satu per satu.

---

### Langkah 3 — Loop tiap entri di array

```js
  for (const entry of phoneNumbers) {
```

Gunakan `for...of` untuk iterasi tiap string di dalam array. Tiap putaran, `entry` berisi satu string seperti `'John:123-456-7890'`.

---

### Langkah 4 — Pisahkan nama dan nomor telepon

```js
    const [name, phoneNumber] = entry.split(':');
```

Di sini ada dua hal yang terjadi sekaligus:

1. **`entry.split(':')`** — Memotong string berdasarkan karakter titik dua `:`
   - `'John:123-456-7890'` → menjadi `['John', '123-456-7890']`

2. **`const [name, phoneNumber] = ...`** — Ini namanya **destructuring assignment**
   - Elemen pertama (`'John'`) langsung masuk ke variabel `name`
   - Elemen kedua (`'123-456-7890'`) langsung masuk ke variabel `phoneNumber`

---

### Langkah 5 — Masukkan ke Map

```js
    directory.set(name, phoneNumber);
```

Method **`set(key, value)`** digunakan untuk menambahkan data ke Map.
- `name` jadi key-nya
- `phoneNumber` jadi value-nya

---

### Langkah 6 — Kembalikan hasilnya

```js
  return directory;
```

Setelah semua entri diproses, kembalikan `directory` yang sudah terisi.

---

<a name="kode-lengkap"></a>
## 📄 Kode Lengkap dengan Komentar

```js
function phoneNumberDirectory(phoneNumbers) {
  // Buat Map kosong sebagai "buku telepon"
  const directory = new Map();

  // Loop tiap entri di array, misalnya: 'John:123-456-7890'
  for (const entry of phoneNumbers) {
    // Pisahkan nama dan nomor berdasarkan karakter ':'
    // lalu langsung destructure ke dua variabel
    const [name, phoneNumber] = entry.split(':');

    // Tambahkan ke Map: nama sebagai key, nomor sebagai value
    directory.set(name, phoneNumber);
  }

  // Kembalikan Map yang sudah terisi
  return directory;
}

module.exports = phoneNumberDirectory;
```

---

<a name="cara-menjalankan"></a>
## ▶️ Cara Menjalankan & Mencoba Output

File `phone-number-directory-run.js` dipakai buat coba-coba fungsinya secara manual:

```js
const phoneNumberDirectory = require('./phone-number-directory');

const phoneNumbers = [
  'John:123-456-7890',
  'Jane:987-654-3210',
  'Joe:555-555-5555',
];

const result = phoneNumberDirectory(phoneNumbers);

// Coba ambil nomor satu orang pakai .get()
console.log(result.get('John'));
// Output: 123-456-7890
```

### 💡 Beberapa cara eksplorasi output

Bisa ganti bagian `console.log`-nya untuk eksperimen:

```js
// Ambil nomor Joe
console.log(result.get('Joe'));
// Output: 555-555-5555

// Log seluruh Map sekaligus
console.log(result);
// Output: Map { 'John' => '123-456-7890', 'Jane' => '987-654-3210', 'Joe' => '555-555-5555' }
```

---

<a name="test-cases"></a>
## 🧪 Test Cases

File test-nya mengecek apakah fungsi kita menghasilkan output yang benar untuk tiap nama:

```js
const phoneNumberDirectory = require('./phone-number-directory');

test('Building a phone number directory from an array of phone numbers', () => {
  const phoneNumbers = [
    'John:123-456-7890',
    'Jane:987-654-3210',
    'Joe:555-555-5555',
  ];

  const result = phoneNumberDirectory(phoneNumbers);

  // Cek apakah tiap nama mengembalikan nomor yang benar
  expect(result.get('John')).toBe('123-456-7890');
  expect(result.get('Jane')).toBe('987-654-3210');
  expect(result.get('Joe')).toBe('555-555-5555');
});
```

Jalankan test dengan perintah:

```bash
npx jest phone-number-directory
```

---

> **Catatan:** Challenge ini adalah latihan yang bagus untuk memahami penggunaan `Map` secara praktis — terutama bagaimana menyimpan pasangan key-value dari data mentah berupa string. Challenge berikutnya akan membahas **anagrams**. 🚀
