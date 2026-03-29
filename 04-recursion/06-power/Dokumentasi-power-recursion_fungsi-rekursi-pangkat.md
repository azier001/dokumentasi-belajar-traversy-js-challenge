# ⚡ Challenge: Fungsi `power` — Rekursi

## 📋 Daftar Isi

- 🎯 [Pengenalan](#pengenalan)
- 🧩 [Apa yang Harus Dibuat?](#apa-yang-harus-dibuat)
- 📌 [Contoh Input & Output](#contoh-input--output)
- 🔒 [Constraints](#constraints)
- 🤔 [3 Pertanyaan Inti Rekursi](#3-pertanyaan-inti-rekursi)
- 💡 [Konsep Kunci: Base Case](#konsep-kunci-base-case)
- 🔄 [Cara Kerja Rekursi](#cara-kerja-rekursi)
- 📊 [Visualisasi Call Stack](#visualisasi-call-stack)
- 🛠️ [Solusi Tanpa Rekursi (Loop Biasa)](#solusi-tanpa-rekursi-loop-biasa)
- ✨ [Solusi dengan Rekursi](#solusi-dengan-rekursi)
- 🧪 [Test Cases](#test-cases)

---

<a name="pengenalan"></a>
## 🎯 Pengenalan

Challenge ini adalah latihan **rekursi** — teknik di mana sebuah fungsi memanggil dirinya sendiri berulang kali sampai mencapai kondisi berhenti (yang disebut **base case**).

> 💬 Jangan panik kalau rekursi masih terasa membingungkan. Ini memang salah satu topik yang **paling susah** dipelajari *dan* diajarkan. Santai dulu, ikuti langkah per langkah!

---

<a name="apa-yang-harus-dibuat"></a>
## 🧩 Apa yang Harus Dibuat?

Buat sebuah fungsi bernama `power` yang menerima dua parameter:

| Parameter | Tipe | Keterangan |
|-----------|------|------------|
| `base` | number | Bilangan yang akan dipangkatkan |
| `exponent` | number | Nilai pangkatnya |

Fungsi ini harus **mengembalikan hasil** dari `base` dipangkat `exponent`.

```js
/**
 * Mengembalikan hasil dari base dipangkat exponent.
 * @param {number} base - Bilangan dasarnya.
 * @param {number} exponent - Pangkatnya.
 * @returns {number}
 */
function power(base, exponent) { ... }
```

---

<a name="contoh-input--output"></a>
## 📌 Contoh Input & Output

```js
power(2, 3) // → 8   karena 2 × 2 × 2 = 8
power(5, 2) // → 25  karena 5 × 5 = 25
power(3, 4) // → 81  karena 3 × 3 × 3 × 3 = 81
```

---

<a name="constraints"></a>
## 🔒 Constraints

- `base` dan `exponent` **selalu berupa bilangan bulat positif**

---

<a name="3-pertanyaan-inti-rekursi"></a>
## 🤔 3 Pertanyaan Inti Rekursi

Sebelum nulis kode rekursi apapun, ada framework sederhana yang bisa selalu dipakai sebagai titik awal berpikir. Cukup jawab 3 pertanyaan ini, dan struktur fungsinya akan terbentuk sendiri.

> 💡 **Kenapa 3 pertanyaan ini penting?** Karena setiap fungsi rekursif — apapun topiknya — selalu punya tiga hal: titik mulai, arah gerak, dan kondisi berhenti. Kalau ketiga ini sudah jelas, nulis kodenya jadi jauh lebih mudah. Framework ini bisa kamu pakai ulang untuk challenge rekursi lain di masa depan.

Diterapkan ke fungsi `power`:

| Pertanyaan | Jawaban |
|---|---|
| 🚀 Mulai dari mana? | Exponent yang di-pass ke fungsi (`exponent`) |
| ➡️ Bergerak ke mana? | Ke bawah — `exponent - 1` setiap langkah |
| 🛑 Berhenti kapan? | Saat `exponent === 0` (base case sudah tercapai) |

Dari tabel di atas, kita sudah bisa "membaca" struktur kodenya sebelum menulisnya:

- **Mulai dari `exponent`** → parameter fungsi kita adalah `base` dan `exponent`
- **Bergerak ke `exponent - 1`** → recursive call-nya adalah `power(base, exponent - 1)`
- **Berhenti saat `exponent === 0`** → base case-nya adalah `if (exponent === 0) return 1`

---

<a name="konsep-kunci-base-case"></a>
## 💡 Konsep Kunci: Base Case

Sebelum nulis rekursi, kita perlu tahu kapan fungsi harus **berhenti**. Titik berhenti ini disebut **base case**.

Untuk fungsi `power`, base case-nya adalah:

> **Bilangan apapun yang dipangkatkan 0, hasilnya selalu 1.**

```
2⁰ = 1
5⁰ = 1
100⁰ = 1
```

Jadi kalau `exponent === 0`, langsung `return 1`. Selesai, tidak perlu rekursi lagi!

---

<a name="cara-kerja-rekursi"></a>
## 🔄 Cara Kerja Rekursi

Ide dasarnya: **pecah masalah besar menjadi masalah yang lebih kecil.**

Misalnya `power(2, 3)` itu sama dengan:

```
2 × power(2, 2)
       ↓
   2 × power(2, 1)
          ↓
      2 × power(2, 0)
             ↓
           = 1  ← BASE CASE!
```

Jadi setiap pemanggilan rekursif, kita **kurangi exponent-nya sebesar 1**, sampai akhirnya exponent mencapai 0 (base case).

---

<a name="visualisasi-call-stack"></a>
## 📊 Visualisasi Call Stack

Mari kita ikuti secara detail apa yang terjadi saat `power(2, 5)` dipanggil. Visualisasi ini dibagi dua fase.

---

### 📉 Fase 1 — Turun: Membangun Tumpukan

Setiap kali fungsi memanggil dirinya sendiri, satu **frame baru** ditambahkan ke atas tumpukan (call stack). Bayangkan seperti menumpuk piring — yang paling baru selalu di atas.

```
Panggilan pertama masuk:
┌─────────────────────────────┐
│  power(2, 5)                │ ← belum selesai, nunggu power(2,4)
│  return 2 × power(2, 4)     │
└─────────────────────────────┘

Frame kedua ditumpuk di atas:
┌─────────────────────────────┐
│  power(2, 4)                │ ← belum selesai, nunggu power(2,3)
│  return 2 × power(2, 3)     │
├─────────────────────────────┤
│  power(2, 5)                │
│  return 2 × power(2, 4)     │
└─────────────────────────────┘

Frame ketiga:
┌─────────────────────────────┐
│  power(2, 3)                │ ← belum selesai, nunggu power(2,2)
│  return 2 × power(2, 2)     │
├─────────────────────────────┤
│  power(2, 4)                │
│  return 2 × power(2, 3)     │
├─────────────────────────────┤
│  power(2, 5)                │
│  return 2 × power(2, 4)     │
└─────────────────────────────┘

Frame keempat:
┌─────────────────────────────┐
│  power(2, 2)                │ ← belum selesai, nunggu power(2,1)
│  return 2 × power(2, 1)     │
├─────────────────────────────┤
│  power(2, 3)                │
│  return 2 × power(2, 2)     │
├─────────────────────────────┤
│  power(2, 4)                │
│  return 2 × power(2, 3)     │
├─────────────────────────────┤
│  power(2, 5)                │
│  return 2 × power(2, 4)     │
└─────────────────────────────┘

Frame kelima:
┌─────────────────────────────┐
│  power(2, 1)                │ ← belum selesai, nunggu power(2,0)
│  return 2 × power(2, 0)     │
├─────────────────────────────┤
│  power(2, 2)                │
│  return 2 × power(2, 1)     │
├─────────────────────────────┤
│  power(2, 3)                │
│  return 2 × power(2, 2)     │
├─────────────────────────────┤
│  power(2, 4)                │
│  return 2 × power(2, 3)     │
├─────────────────────────────┤
│  power(2, 5)                │
│  return 2 × power(2, 4)     │
└─────────────────────────────┘

Frame terakhir — BASE CASE tercapai! 🛑
┌─────────────────────────────┐
│  power(2, 0)                │ ← exponent === 0, return 1 ✅
│  return 1                   │
├─────────────────────────────┤
│  power(2, 1)                │
│  return 2 × power(2, 0)     │
├─────────────────────────────┤
│  power(2, 2)                │
│  return 2 × power(2, 1)     │
├─────────────────────────────┤
│  power(2, 3)                │
│  return 2 × power(2, 2)     │
├─────────────────────────────┤
│  power(2, 4)                │
│  return 2 × power(2, 3)     │
├─────────────────────────────┤
│  power(2, 5)                │
│  return 2 × power(2, 4)     │
└─────────────────────────────┘
```

> ⚠️ Perhatikan: semua frame di bawahnya **masih menunggu** — mereka belum bisa selesai karena butuh nilai dari frame di atasnya.

---

### 📈 Fase 2 — Naik: Unwinding & Mengalirkan Nilai

Setelah base case mengembalikan `1`, nilai itu "mengalir turun" melewati setiap frame yang menunggu. Frame paling atas selesai duluan, lalu dikeluarkan dari tumpukan satu per satu.

```
power(2, 0) selesai → return 1
Dikeluarkan dari stack, nilainya dikirim ke bawah:
┌─────────────────────────────────────┐
│  power(2, 1)                        │
│  return 2 × 1 = 2  ✅               │ ← dapat nilai 1 dari power(2,0)
├─────────────────────────────────────┤
│  power(2, 2)  [menunggu nilai 2]    │
├─────────────────────────────────────┤
│  power(2, 3)  [menunggu nilai 4]    │
├─────────────────────────────────────┤
│  power(2, 4)  [menunggu nilai 8]    │
├─────────────────────────────────────┤
│  power(2, 5)  [menunggu nilai 16]   │
└─────────────────────────────────────┘

power(2, 1) selesai → return 2
┌─────────────────────────────────────┐
│  power(2, 2)                        │
│  return 2 × 2 = 4  ✅               │ ← dapat nilai 2 dari power(2,1)
├─────────────────────────────────────┤
│  power(2, 3)  [menunggu nilai 4]    │
├─────────────────────────────────────┤
│  power(2, 4)  [menunggu nilai 8]    │
├─────────────────────────────────────┤
│  power(2, 5)  [menunggu nilai 16]   │
└─────────────────────────────────────┘

power(2, 2) selesai → return 4
┌─────────────────────────────────────┐
│  power(2, 3)                        │
│  return 2 × 4 = 8  ✅               │ ← dapat nilai 4 dari power(2,2)
├─────────────────────────────────────┤
│  power(2, 4)  [menunggu nilai 8]    │
├─────────────────────────────────────┤
│  power(2, 5)  [menunggu nilai 16]   │
└─────────────────────────────────────┘

power(2, 3) selesai → return 8
┌─────────────────────────────────────┐
│  power(2, 4)                        │
│  return 2 × 8 = 16  ✅              │ ← dapat nilai 8 dari power(2,3)
├─────────────────────────────────────┤
│  power(2, 5)  [menunggu nilai 16]   │
└─────────────────────────────────────┘

power(2, 4) selesai → return 16
┌─────────────────────────────────────┐
│  power(2, 5)                        │
│  return 2 × 16 = 32  ✅             │ ← dapat nilai 16 dari power(2,4)
└─────────────────────────────────────┘

Stack kosong. Jawaban akhir: 32 🎉
```

---

### 🧮 Ringkasan Alur Nilai

Kalau mau lihat gambaran keseluruhannya dalam satu tempat:

```
TURUN (membangun stack)           NAIK (unwinding)
───────────────────────           ──────────────────────
power(2, 5)              →        2 × 16  =  32  ✅
  power(2, 4)            →        2 × 8   =  16
    power(2, 3)          →        2 × 4   =  8
      power(2, 2)        →        2 × 2   =  4
        power(2, 1)      →        2 × 1   =  2
          power(2, 0)    →        return 1  🛑 BASE CASE
```

> 🎯 Baca dari **bawah ke atas** untuk memahami fase naik: nilai `1` lahir di paling bawah, lalu dikalikan `2` berulang kali sampai ke paling atas.

---

<a name="solusi-tanpa-rekursi-loop-biasa"></a>
## 🛠️ Solusi Tanpa Rekursi (Loop Biasa)

Sebelum pakai rekursi, ini versi yang lebih mudah dipahami dulu — pakai `for` loop biasa:

```js
// Versi tanpa rekursi
function power(base, exponent) {
  // Mulai dari 1, karena perkalian identitas = 1
  let result = 1;

  // Kalikan base sebanyak exponent kali
  for (let i = 0; i < exponent; i++) {
    result *= base;
  }

  return result;
}
```

> 🗒️ Versi ini lebih mudah dibaca, tapi di challenge ini kita diminta pakai **rekursi**.

---

<a name="solusi-dengan-rekursi"></a>
## ✨ Solusi dengan Rekursi

```js
function power(base, exponent) {
  // 🛑 Base case: pangkat 0 selalu = 1
  if (exponent === 0) {
    return 1;
  }

  // 🔁 Recursive case: base × hasil dari pangkat yang lebih kecil
  return base * power(base, exponent - 1);
}
```

Logikanya simpel:
- Kalau `exponent` sudah **0** → kembalikan `1`
- Kalau belum → kalikan `base` dengan hasil `power(base, exponent - 1)`

---

<a name="test-cases"></a>
## 🧪 Test Cases

File `power.test.js` untuk memverifikasi fungsi berjalan benar:

```js
const power = require('./power');

test('Calculate Power of Base to Exponent', () => {
  expect(power(2, 3)).toEqual(8);   // 2³ = 8
  expect(power(5, 2)).toEqual(25);  // 5² = 25
  expect(power(3, 4)).toEqual(81);  // 3⁴ = 81
});
```

Jalankan test dengan:

```bash
npm test
```

Kalau semua ✅ hijau, berarti fungsinya sudah benar!

---

> 💬 **Catatan pribadi:** Rekursi itu memang susah di awal. Yang penting pahami dua hal dulu: **base case** (kapan berhenti) dan **recursive case** (bagaimana masalah diperkecil). Kalau dua itu sudah jelas, sisanya tinggal ikutin polanya!