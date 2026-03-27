# 🌀 Rekursi: Memahami Unwinding & Call Stack

> **Catatan pribadi** · Pemula-friendly · Berdasarkan video tutorial

---

## 📋 Daftar Isi

- 🔁 [Rekap Dasar Rekursi](#rekap-dasar-rekursi)
- 📦 [Apa Itu Call Stack?](#apa-itu-call-stack)
- ➕ [Contoh: fungsi `sumUpTo`](#contoh-fungsi-sumupto)
- 🎬 [Proses Eksekusi Step-by-Step](#proses-eksekusi-step-by-step)
- 🔍 [Melihat Unwinding Lewat Log](#melihat-unwinding-lewat-log)
- ⚠️ [Jangan Lupa: Base Case & Decrement](#jangan-lupa-base-case--decrement)
- 🧪 [Kode Lengkap + Test](#kode-lengkap--test)

---

<a name="rekap-dasar-rekursi"></a>
## 🔁 Rekap Dasar Rekursi

Sebelumnya kita sudah tahu bahwa rekursi adalah ketika **sebuah fungsi memanggil dirinya sendiri** sampai suatu kondisi (disebut *base case*) terpenuhi.

Tapi ada satu hal penting yang belum dibahas: **apa yang terjadi setelah base case tercapai?**

Jawabannya adalah → fungsi mulai **"unwinding"** (mengurai balik), dan nilai-nilai mulai dikembalikan (*returned*) satu per satu — dalam **urutan terbalik** dari pemanggilan awalnya.

---

<a name="apa-itu-call-stack"></a>
## 📦 Apa Itu Call Stack?

Saat rekursi berjalan, setiap pemanggilan fungsi ditaruh di sebuah struktur data bernama **call stack**.

Stack bekerja dengan prinsip **LIFO** — *Last In, First Out*:

```
📥 Yang terakhir masuk → yang pertama keluar
```

Analoginya seperti tumpukan piring:

| Urutan masuk | Yang diambil pertama |
|---|---|
| Piring A (paling bawah) | Piring C (paling atas) |
| Piring B | Piring B |
| Piring C (paling atas) | Piring A (terakhir) |

> 💡 Nanti kita akan belajar lebih dalam tentang stack, bahkan membuat implementasinya sendiri menggunakan JavaScript class. Untuk sekarang, cukup pahami konsep dasarnya dulu.

---

<a name="contoh-fungsi-sumupto"></a>
## ➕ Contoh: fungsi `sumUpTo`

Kita bikin fungsi yang menjumlahkan semua bilangan bulat positif dari `1` sampai `n`.

Misalnya:
- `sumUpTo(3)` → `1 + 2 + 3` = **6**
- `sumUpTo(5)` → `1 + 2 + 3 + 4 + 5` = **15**

```js
function sumUpTo(n) {
  // 🛑 Base case: kalau n sudah 1, kembalikan 1 langsung
  if (n === 1) {
    return 1;
  }

  // 🔄 Recursive case: n ditambah hasil dari sumUpTo(n - 1)
  return n + sumUpTo(n - 1);
}
```

Perhatikan baris terakhir: kita memanggil `sumUpTo(n - 1)`, bukan `sumUpTo(n)`. Ini penting! Kalau kita pakai `n` tanpa dikurangi, fungsi akan berjalan **selamanya** karena `n` tidak pernah berubah dan base case tidak pernah tercapai.

---

<a name="proses-eksekusi-step-by-step"></a>
## 🎬 Proses Eksekusi Step-by-Step

Mari kita ikuti `sumUpTo(5)` dari awal sampai selesai.

### 🏗️ Fase 1 — Menumpuk ke Stack

```
sumUpTo(5) dipanggil → masuk stack
  ↳ sumUpTo(4) dipanggil → masuk stack
      ↳ sumUpTo(3) dipanggil → masuk stack
          ↳ sumUpTo(2) dipanggil → masuk stack
              ↳ sumUpTo(1) dipanggil → masuk stack ✅ BASE CASE!
```

Stack saat ini (dari bawah ke atas):

```
┌──────────────┐  ← paling atas (pertama keluar)
│ sumUpTo(1)   │
├──────────────┤
│ sumUpTo(2)   │
├──────────────┤
│ sumUpTo(3)   │
├──────────────┤
│ sumUpTo(4)   │
├──────────────┤
│ sumUpTo(5)   │  ← paling bawah (terakhir keluar)
└──────────────┘
```

### 🧹 Fase 2 — Unwinding (mengurai balik)

Setelah `sumUpTo(1)` mengembalikan `1`, stack mulai dikupas dari atas:

```
sumUpTo(1) → returns 1
sumUpTo(2) → returns 1 + 2 = 3
sumUpTo(3) → returns 1 + 2 + 3 = 6
sumUpTo(4) → returns 1 + 2 + 3 + 4 = 10
sumUpTo(5) → returns 1 + 2 + 3 + 4 + 5 = 15 🎉
```

> 💡 Perhatikan: kita mulai dari `5` tapi nilai pertama yang *dikembalikan* adalah `1`. Itulah mengapa disebut "urutan terbalik".

---

<a name="melihat-unwinding-lewat-log"></a>
## 🔍 Melihat Unwinding Lewat Log

Supaya lebih jelas, kita bisa tambahkan `console.log` untuk memantau apa yang terjadi di setiap tahap:

```js
function sumUpTo(n) {
  if (n === 1) {
    console.log(`sumUpTo(${n}) returns 1`);
    return 1;
  }

  console.log(`sumUpTo(${n}) calls sumUpTo(${n - 1}) + ${n}`);
  const result = n + sumUpTo(n - 1);
  console.log(`sumUpTo(${n}) returns ${result}`);
  return result;
}
```

Output saat `sumUpTo(5)` dijalankan:

```
sumUpTo(5) calls sumUpTo(4) + 5
sumUpTo(4) calls sumUpTo(3) + 4
sumUpTo(3) calls sumUpTo(2) + 3
sumUpTo(2) calls sumUpTo(1) + 2
sumUpTo(1) returns 1          ← base case tercapai, mulai unwind!
sumUpTo(2) returns 3
sumUpTo(3) returns 6
sumUpTo(4) returns 10
sumUpTo(5) returns 15
```

Kelihatan kan? Di bagian atas kita *memanggil* fungsi secara berurutan 5→4→3→2→1, lalu di bagian bawah nilainya *dikembalikan* secara terbalik 1→2→3→4→5.

---

<a name="jangan-lupa-base-case--decrement"></a>
## ⚠️ Jangan Lupa: Base Case & Decrement

Dua hal yang **wajib ada** di setiap fungsi rekursif:

| # | Hal | Kenapa penting |
|---|---|---|
| 1 | **Base case** (`if n === 1`) | Supaya rekursi berhenti dan tidak jalan selamanya |
| 2 | **Decrement** (`n - 1`) | Supaya `n` terus mengecil dan akhirnya mencapai base case |

Kalau salah satu hilang → **infinite loop** 💀

---

<a name="kode-lengkap--test"></a>
## 🧪 Kode Lengkap + Test

### `sum-up-to.js`

```js
function sumUpTo(n) {
  // Base case - ketika n adalah 1, kembalikan 1
  if (n === 1) {
    return 1;
  }

  // Recursive case - kembalikan n ditambah sumUpTo(n - 1)
  return n + sumUpTo(n - 1);
}

module.exports = sumUpTo;
```

### `sum-up-to-run.js`

```js
const sumUpTo = require('./sum-up-to');

const result = sumUpTo(6);
console.log(result); // Output: 21
```

### `sum-up-to.test.js`

```js
const sumUpTo = require('./sum-up-to.js');

test('Summing up positive integers', () => {
  expect(sumUpTo(5)).toBe(15);   // 1+2+3+4+5
  expect(sumUpTo(10)).toBe(55);  // 1+2+...+10
  expect(sumUpTo(1)).toBe(1);    // base case
  expect(sumUpTo(0)).toBe(0);    // edge case
});
```

---

> **📌 Takeaway utama:** Rekursi tidak langsung mengembalikan nilai saat dipanggil — ia menumpuk dulu di call stack, baru setelah base case tercapai mulai unwind dan mengembalikan nilai dari bawah ke atas (urutan terbalik). Konsep ini sangat penting untuk challenge berikutnya: **reverse string secara rekursif!**