# 🌐 Challenge: Validasi Alamat IPv4

> 📝 **Catatan pribadi** — dokumentasi ini dibuat berdasarkan video tutorial tentang membuat fungsi validasi alamat IP versi 4.

---

## 📋 Daftar Isi

- 🔍 [Apa itu IPv4?](#apa-itu-ipv4)
- 🎯 [Apa yang Akan Kita Buat?](#apa-yang-akan-kita-buat)
- ✅ [Aturan Valid vs Tidak Valid](#aturan-valid-vs-tidak-valid)
- 🏗️ [Langkah 1 — Pecah String dengan `split()`](#langkah-1--pecah-string-dengan-split)
- 🔢 [Langkah 2 — Cek Jumlah Oktet](#langkah-2--cek-jumlah-oktet)
- 🔁 [Langkah 3 — Cek Setiap Oktet dengan `every()`](#langkah-3--cek-setiap-oktet-dengan-every)
- ⚠️ [Trik Khusus — Mencegah Leading Zero](#trik-khusus--mencegah-leading-zero)
- 🧩 [Kode Lengkap](#kode-lengkap)
- 💡 [Alternatif Solusi](#alternatif-solusi)
- 🧪 [Test Cases](#test-cases)

---

<a name="apa-itu-ipv4"></a>
## 🔍 Apa itu IPv4?

**IPv4** (IP version 4) adalah format alamat jaringan yang terdiri dari **4 bagian angka** yang dipisahkan oleh titik. Setiap bagian disebut **oktet**.

```
122 . 164 . 23 . 21
 ↑      ↑    ↑   ↑
oktet1  2    3   4
```

Masing-masing oktet harus berupa angka antara **0 sampai 255**.

---

<a name="apa-yang-akan-kita-buat"></a>
## 🎯 Apa yang Akan Kita Buat?

Kita akan membuat fungsi bernama `isValidIPv4` yang:

- Menerima sebuah **string** sebagai input
- Mengembalikan **`true`** kalau string itu adalah IPv4 yang valid
- Mengembalikan **`false`** kalau tidak valid

```js
isValidIPv4('122.164.23.21');  // → true
isValidIPv4('122.164.23.21.33');  // → false
```

---

<a name="aturan-valid-vs-tidak-valid"></a>
## ✅ Aturan Valid vs Tidak Valid

| Input | Hasil | Alasan |
|-------|-------|--------|
| `'1.2.3.4'` | ✅ `true` | 4 oktet, semua antara 0–255 |
| `'123.45.67.89'` | ✅ `true` | 4 oktet, semua valid |
| `'1.2.3'` | ❌ `false` | Hanya 3 oktet |
| `'1.2.3.4.5'` | ❌ `false` | Ada 5 oktet |
| `'123.456.78.90'` | ❌ `false` | 456 > 255 |
| `'123.045.067.089'` | ❌ `false` | Ada **leading zero** (angka diawali 0) |

---

<a name="langkah-1--pecah-string-dengan-split"></a>
## 🏗️ Langkah 1 — Pecah String dengan `split()`

Pertama, kita pecah string input menjadi array menggunakan **titik (`.`)** sebagai pemisah.

```js
const octets = input.split('.');
```

Contohnya:

```js
'122.164.23.21'.split('.')
// → ['122', '164', '23', '21']
```

Sekarang kita punya array berisi 4 string, masing-masing mewakili satu oktet.

---

<a name="langkah-2--cek-jumlah-oktet"></a>
## 🔢 Langkah 2 — Cek Jumlah Oktet

Setelah dipecah, kita cek apakah hasilnya **tepat 4 bagian**. Kalau tidak, langsung kembalikan `false`.

```js
if (octets.length !== 4) {
  return false;
}
```

> 💡 `length` adalah properti array yang memberitahu berapa banyak item di dalamnya.

---

<a name="langkah-3--cek-setiap-oktet-dengan-every"></a>
## 🔁 Langkah 3 — Cek Setiap Oktet dengan `every()`

Setelah kita tahu ada 4 oktet, kita perlu memastikan **semua** oktet bernilai antara 0 dan 255.

Di sinilah kita pakai method **`every()`**. Cara kerjanya: dia mengecek setiap item di array, dan hanya mengembalikan `true` jika **semua item** memenuhi syarat.

```js
return octets.every((octet) => {
  const num = parseInt(octet); // ubah string '122' jadi angka 122
  return num >= 0 && num <= 255;
});
```

> 💡 Beda `every()` vs `some()`:
> - **`every()`** → semua item harus `true` baru hasilnya `true`
> - **`some()`** → cukup satu item yang `true`, hasilnya sudah `true`

---

<a name="trik-khusus--mencegah-leading-zero"></a>
## ⚠️ Trik Khusus — Mencegah Leading Zero

Ada satu aturan lagi: angka seperti `'045'` atau `'089'` dianggap **tidak valid** meski nilainya masih di bawah 255.

Masalahnya: kalau kita cuma pakai `parseInt('045')`, hasilnya adalah `45` — dan 45 itu lolos cek 0–255. Jadi kita butuh cara lain!

**Solusinya:** bandingkan string aslinya dengan hasil konversi balik ke string:

```js
octet === num.toString()
// '045' === (45).toString()  →  '045' === '45'  →  false ✅
// '45'  === (45).toString()  →  '45'  === '45'  →  true ✅
```

Kalau ada leading zero, konversi balik akan menghapusnya, sehingga kedua string tidak akan sama → otomatis `false`.

---

<a name="kode-lengkap"></a>
## 🧩 Kode Lengkap

Ini adalah versi final setelah menggabungkan semua langkah di atas:

```js
const isValidIPv4 = (input) => {
  // 1️⃣ Pecah string berdasarkan titik
  const octets = input.split('.');

  // 2️⃣ Pastikan tepat 4 oktet
  if (octets.length !== 4) {
    return false;
  }

  // 3️⃣ Cek setiap oktet: harus angka 0–255 dan tidak boleh ada leading zero
  return octets.every((octet) => {
    const num = parseInt(octet);
    return num >= 0 && num <= 255 && octet === num.toString();
  });
};

module.exports = isValidIPv4;
```

---

<a name="alternatif-solusi"></a>
## 💡 Alternatif Solusi

Solusi ini menggunakan pendekatan yang sedikit berbeda — lebih **eksplisit** dan **aman** untuk edge cases tertentu.

```js
const isValidIPv4 = (str) => {
  const formatted = str.split('.');

  if (formatted.length !== 4) return false;

  const isValid = formatted.every((number) => {
    // 1️⃣ Cek leading zero secara langsung
    if (number[0] === '0' && number.length > 1) return false;

    // 2️⃣ Pastikan isinya murni angka dulu sebelum dicek nilainya
    if (/^\d+$/.test(number)) {
      return Number(number) >= 0 && Number(number) <= 255;
    }

    // 3️⃣ Kalau bukan angka murni, langsung false
    return false;
  });

  return isValid;
};
```

### 🔍 Apa bedanya dengan solusi dari video?

| Aspek | Solusi Video | Alternatif Ini |
|-------|-------------|----------------|
| Cek leading zero | `octet === num.toString()` | `number[0] === '0' && number.length > 1` |
| Validasi karakter | ❌ tidak ada | ✅ pakai regex `^\d+$` |
| Input `'12abc'` | ⚠️ lolos! (`parseInt` baca `12`) | ✅ ditolak |
| Input `''` (kosong) | ⚠️ bisa bermasalah | ✅ ditolak |
| Keterbacaan | Lebih ringkas | Lebih eksplisit |

> 💬 **Intinya:** solusi alternatif ini lebih *defensive* — dia memastikan setiap oktet benar-benar berisi angka murni sebelum mengecek nilainya, sehingga lebih aman dari input yang tidak terduga.

---

<a name="test-cases"></a>
## 🧪 Test Cases

Berikut test yang dijalankan untuk memvalidasi fungsi ini:

```js
test('Checking Valid IPv4 Addresses', () => {
  expect(isValidIPv4('1.2.3.4')).toBe(true);         // ✅ valid
  expect(isValidIPv4('123.45.67.89')).toBe(true);    // ✅ valid
  expect(isValidIPv4('1.2.3')).toBe(false);          // ❌ kurang oktet
  expect(isValidIPv4('1.2.3.4.5')).toBe(false);      // ❌ terlalu banyak oktet
  expect(isValidIPv4('123.456.78.90')).toBe(false);  // ❌ 456 > 255
  expect(isValidIPv4('123.045.067.089')).toBe(false);// ❌ leading zero
});
```

> 🎉 Semua test **passed**!

---

*Dibuat dari video tutorial — challenge: Valid IPv4 Addresses*