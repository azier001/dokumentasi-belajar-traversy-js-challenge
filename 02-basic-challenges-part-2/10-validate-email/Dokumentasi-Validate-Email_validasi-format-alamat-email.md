# 📧 Dokumentasi: Validate Email Function

> **Catatan pribadi** dari tutorial JavaScript — Challenge: Validasi Email Address

---

## 📋 Daftar Isi

- 🔍 [Pengenalan Challenge](#pengenalan)
- 🎯 [Apa yang Mau Dibuat?](#apa-yang-dibuat)
- ✨ [Solusi 1: Pakai Regular Expression](#solusi-regex)
- 🔧 [Solusi 2: Tanpa Regular Expression](#solusi-manual)
- 🧪 [Testing](#testing)
- 💡 [Kesimpulan](#kesimpulan)

---

<a name="pengenalan"></a>
## 🔍 Pengenalan

Challenge ini adalah membuat **fungsi `validateEmail`** — sesuatu yang sering banget dipakai di dunia nyata. Fungsinya sederhana: terima satu string, lalu kembalikan `true` kalau itu email yang valid, atau `false` kalau tidak.

Untuk keperluan challenge ini, email dianggap valid kalau mengandung:
- Simbol **`@`** (at)
- Tanda titik **`.`** (period/dot)

---

<a name="apa-yang-dibuat"></a>
## 🎯 Apa yang Mau Dibuat?

```js
validateEmail('john@gmail.com');  // ✅ true
validateEmail('johngmail');       // ❌ false
```

Fungsinya akan dicek apakah string yang masuk punya format email yang benar. Ada **dua cara** untuk menyelesaikannya — dengan *regular expression* dan tanpa.

---

<a name="solusi-regex"></a>
## ✨ Solusi 1: Pakai Regular Expression

Regular expression (disingkat *regex* atau *RegEx*) adalah cara singkat untuk mencocokkan pola teks. Sangat powerful, tapi memang agak susah diingat — dan itu wajar! Bahkan yang sudah berpengalaman pun sering googling atau tanya ChatGPT untuk mendapatkan regex yang tepat.

Untuk mendapat regex yang bagus untuk format email, kamu bisa tanya langsung ke ChatGPT: *"give me a regex for an email address for my JavaScript code"*.

### Kode

```js
function validateEmail(email) {
  // Regex ini mendeskripsikan format email yang valid
  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

  // Method .test() akan mengembalikan true/false
  return emailRegex.test(email);
}
```

### Penjelasan Regex-nya

| Bagian | Artinya |
|---|---|
| `^` | Mulai dari awal string |
| `[A-Za-z0-9._%+-]+` | Karakter-karakter sebelum `@` (huruf, angka, titik, dll) |
| `@` | Harus ada simbol @ |
| `[A-Za-z0-9.-]+` | Nama domain (misal: `gmail`) |
| `\.` | Harus ada titik (di-*escape* pakai `\`) |
| `[A-Za-z]{2,}` | Ekstensi domain minimal 2 huruf (`.com`, `.io`, dll) |
| `$` | Sampai akhir string |

> 💡 **Method `.test()`** digunakan untuk mencocokkan string dengan regex. Hasilnya langsung `true` atau `false`.

---

<a name="solusi-manual"></a>
## 🔧 Solusi 2: Tanpa Regular Expression

Kalau belum familiar dengan regex, kamu bisa lakukan pengecekan secara manual langkah demi langkah.

### Langkah-langkahnya:

1. **Cek ada `@` atau tidak**
2. **Pisah email jadi dua bagian** (sebelum dan sesudah `@`)
3. **Cek panjang masing-masing bagian**
4. **Cek ekstensi domain** (misal `.com`, `.io`) minimal 2 karakter

### Kode

```js
function validateEmail(email) {

  // 1️⃣ Cek apakah ada simbol @
  // indexOf() mengembalikan -1 kalau karakter tidak ditemukan
  if (email.indexOf('@') === -1) {
    return false;
  }

  // 2️⃣ Pisah email menjadi local part dan domain
  // Misal: 'brad@gmail.com' → ['brad', 'gmail.com']
  const [localPart, domain] = email.split('@');

  // 3️⃣ Cek panjang minimum
  // Local part tidak boleh kosong, domain minimal 3 karakter (x.xx)
  if (localPart.length === 0 || domain.length < 3) {
    return false;
  }

  // 4️⃣ Cek ekstensi domain
  // Pisah domain pada titik → ['gmail', 'com']
  const domainExtension = domain.split('.');

  // Harus ada minimal 2 bagian, dan ekstensinya minimal 2 karakter
  if (
    domainExtension.length < 2 ||
    domainExtension[domainExtension.length - 1].length < 2
  ) {
    return false;
  }

  // Kalau semua cek lolos → email valid! ✅
  return true;
}
```

### Cara Kerja `.split()`

Method `.split()` memecah string menjadi array berdasarkan pemisah yang kamu tentukan.

```js
'brad@gmail.com'.split('@');
// Hasilnya → ['brad', 'gmail.com']

'gmail.com'.split('.');
// Hasilnya → ['gmail', 'com']
```

Dengan **array destructuring**, kita bisa langsung menamakan hasilnya:

```js
const [localPart, domain] = 'brad@gmail.com'.split('@');
// localPart → 'brad'
// domain    → 'gmail.com'
```

> 💡 **Kenapa ambil index terakhir?** Menggunakan `domainExtension[domainExtension.length - 1]` lebih aman karena ada domain dengan subdomain seperti `mail.company.co.id` yang punya lebih dari 2 bagian.

---

<a name="testing"></a>
## 🧪 Testing

File test menggunakan **Jest** untuk memastikan fungsi berjalan dengan benar:

```js
test('Valid Email Addresses', () => {
  expect(validateEmail('john@example.com')).toBe(true);
  expect(validateEmail('jane.doe@domain.org')).toBe(true);
});

test('Invalid Email Addresses', () => {
  expect(validateEmail('invalid-email')).toBe(false);  // tidak ada @
  expect(validateEmail('@domain.com')).toBe(false);    // local part kosong
  expect(validateEmail('user@domain')).toBe(false);    // tidak ada ekstensi
});
```

Jalankan test dengan perintah:

```bash
# rename fungsi di file kode dulu ke "validateEmail" lalu:
npm test
```

Kalau semua test ✅ hijau, berarti fungsinya sudah benar!

---

<a name="kesimpulan"></a>
## 💡 Kesimpulan

| | Solusi 1 (Regex) | Solusi 2 (Manual) |
|---|---|---|
| **Panjang kode** | Lebih pendek | Lebih panjang |
| **Keterbacaan** | Sulit dibaca | Mudah dipahami |
| **Fleksibilitas** | Butuh ganti regex | Bisa edit per kondisi |
| **Rekomendasi untuk** | Yang sudah paham regex | Pemula / debugging lebih mudah |

Keduanya valid dan lolos test! Pilih mana yang paling nyaman buat kamu. Kalau baru mulai belajar, **Solusi 2** lebih enak untuk dipahami alurnya. Kalau sudah terbiasa, **Solusi 1** jauh lebih ringkas.

---

*📝 Dokumentasi ini dibuat berdasarkan video tutorial JavaScript: Challenge Validate Email*