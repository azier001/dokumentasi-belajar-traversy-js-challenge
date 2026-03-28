# 🔄 Reverse String dengan Rekursi

> 📝 *Dokumentasi pribadi — Catatan belajar dari video tutorial JavaScript Recursion*

---

## 📚 Daftar Isi

- 🔍 [Apa itu Rekursi (Kilasan)?](#apa-itu-rekursi)
- 🎯 [Tantangan: Reverse String](#tantangan)
- 🧩 [Cara Kerjanya](#cara-kerjanya)
- 🔬 [Memahami `substr`](#memahami-substr)
- 💻 [Kode Lengkap](#kode-lengkap)
- ⚡ [Versi Singkat (Arrow Function)](#versi-singkat)
- 🪜 [Visualisasi Step-by-Step](#visualisasi)
- ✅ [Test Cases](#test-cases)

---

<a name="apa-itu-rekursi"></a>
## 🔍 Apa itu Rekursi (Kilasan)?

Rekursi adalah sebuah **fungsi yang memanggil dirinya sendiri** sampai kondisi tertentu terpenuhi (*base case*).

Proses rekursi ada dua fase:
1. **Menyelam ke bawah** — fungsi terus memanggil dirinya sendiri
2. **Naik kembali (unwind)** — setelah base case tercapai, nilai-nilai dikembalikan dalam **urutan terbalik**

> 💡 **Kunci penting:** Saat *unwind*, nilai dikembalikan dalam urutan yang berlawanan dari urutan pemanggilan. Inilah yang kita manfaatkan untuk membalik string!

---

<a name="tantangan"></a>
## 🎯 Tantangan: Reverse String

**Tugasnya sederhana:** buat fungsi `reverseString` yang menerima sebuah string dan mengembalikan versi terbaliknya — tapi **wajib menggunakan rekursi**.

Contoh yang diharapkan:

| Input | Output |
|-------|--------|
| `'hello'` | `'olleh'` |
| `'world'` | `'dlrow'` |
| `''` | `''` |
| `'racecar'` | `'racecar'` |

---

<a name="cara-kerjanya"></a>
## 🧩 Cara Kerjanya

Logika dasarnya ada dua langkah:

1. **Base case:** kalau string kosong (`''`), langsung return string kosong → rekursi berhenti di sini
2. **Recursive case:** panggil fungsi lagi dengan string yang sudah dihilangkan karakter pertamanya, lalu **tempel karakter pertama di bagian paling belakang**

Ibaratnya kamu mengupas string dari depan satu per satu, lalu saat "naik" kembali, karakter-karakter itu ditempel dari belakang.

---

<a name="memahami-substr"></a>
## 🔬 Memahami `substr`

Sebelum masuk ke kode utama, penting untuk paham method `substr`:

```javascript
// substr(startIndex) → mengambil string mulai dari index tertentu sampai akhir
'hello'.substr(1)  // → 'ello'  (mulai dari index 1, yaitu 'e')
'hello'.substr(2)  // → 'llo'   (mulai dari index 2, yaitu 'l')

// substr(startIndex, length) → bisa juga dibatasi panjangnya
'hello'.substr(1, 3)  // → 'ell'  (mulai index 1, ambil 3 karakter)
```

Dan untuk mengambil karakter di posisi tertentu:

```javascript
// charAt(index) → mengambil satu karakter di posisi tertentu
'hello'.charAt(0)  // → 'h'  (karakter pertama)
'hello'.charAt(1)  // → 'e'  (karakter kedua)
```

Di solusi kita, `substr(1)` dipakai untuk "memotong" karakter pertama setiap kali fungsi dipanggil ulang, sehingga string makin mengecil:

```
'hello' → 'ello' → 'llo' → 'lo' → 'o' → ''
```

---

<a name="kode-lengkap"></a>
## 💻 Kode Lengkap

Berikut solusi lengkap dengan `function` biasa:

```javascript
// reverse-string-recursion.js

function reverseString(str) {
  // 🛑 Base case: kalau string sudah kosong, berhenti dan return ''
  if (str === '') {
    return '';
  } else {
    // 🔁 Recursive case:
    // - Panggil reverseString lagi dengan str tanpa karakter pertama (substr(1))
    // - Setelah fungsi kembali, tempel karakter pertama (charAt(0)) di bagian AKHIR
    return reverseString(str.substr(1)) + str.charAt(0);
  }
}

module.exports = reverseString;
```

Dan file untuk menjalankannya:

```javascript
// reverse-string-recursion-run.js

const reverseString = require('./reverse-string-recursion');

const result = reverseString('hello');
console.log(result); // → 'olleh'
```

---

<a name="versi-singkat"></a>
## ⚡ Versi Singkat (Arrow Function)

Kalau sudah paham logikanya, bisa dipadatkan jadi satu baris dengan arrow function dan ternary operator:

```javascript
// Versi arrow function — lebih ringkas, logika sama persis
const reverseString = (str) =>
  str === '' ? '' : reverseString(str.substr(1)) + str.charAt(0);
```

Dibaca seperti ini:
- Kalau `str` kosong → return `''`
- Kalau tidak → panggil `reverseString` lagi dengan `str.substr(1)`, lalu tambahkan `str.charAt(0)` di akhir

---

<a name="visualisasi"></a>
## 🪜 Visualisasi Step-by-Step

Mari kita ikuti jejak rekursi untuk input `'hello'`:

### ⬇️ Fase Turun (Pemanggilan)

```
reverseString('hello')
  └─ reverseString('ello') + 'h'
       └─ reverseString('llo') + 'e'
            └─ reverseString('lo') + 'l'
                 └─ reverseString('o') + 'l'
                      └─ reverseString('') + 'o'
                           └─ return ''  ← 🛑 BASE CASE
```

### ⬆️ Fase Naik (Unwind & Penggabungan)

```
''          ← dari base case
'' + 'o'    → 'o'
'o' + 'l'   → 'ol'
'ol' + 'l'  → 'oll'
'oll' + 'e' → 'olle'
'olle' + 'h'→ 'olleh'  ✅
```

> 🎉 String `'hello'` berhasil dibalik menjadi `'olleh'`!

---

<a name="test-cases"></a>
## ✅ Test Cases

File test menggunakan Jest:

```javascript
// reverse-string-recursion.test.js

const reverseString = require('./reverse-string-recursion');

test('Reversing a string', () => {
  expect(reverseString('Hello')).toBe('olleH');       // ✅
  expect(reverseString('JavaScript')).toBe('tpircSavaJ'); // ✅
  expect(reverseString('12345')).toBe('54321');        // ✅
});
```

Jalankan test dengan:
```bash
npm test
```

---

> 🚀 **Selanjutnya:** Fibonacci Sequence — juga diselesaikan dengan rekursi!